// ElevenLabs TTS client + IndexedDB audio cache.
// Public API (attached to window.ElevenLabs):
//   setConfig({apiKey, voiceId, modelId})       — set credentials
//   getConfig()                                  — read current config
//   speak(text)                                  — play through speakers; caches blob
//   stop()                                       — stop any current audio
//   isConfigured()                               — boolean

(function () {
  const DB_NAME = 'yoga-tts';
  const STORE = 'clips';
  const DB_VERSION = 1;
  let dbPromise = null;
  let currentAudio = null;
  let playQueue = [];
  let isPlaying = false;

  // Config kept in localStorage so it survives reloads.
  const LS_KEY = 'yoga.eleven.config';
  function readConfig() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return { apiKey: '', voiceId: '21m00Tcm4TlvDq8ikWAM', modelId: 'eleven_multilingual_v2' };
      return Object.assign(
        { apiKey: '', voiceId: '21m00Tcm4TlvDq8ikWAM', modelId: 'eleven_multilingual_v2' },
        JSON.parse(raw)
      );
    } catch (e) {
      return { apiKey: '', voiceId: '21m00Tcm4TlvDq8ikWAM', modelId: 'eleven_multilingual_v2' };
    }
  }
  function writeConfig(cfg) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(cfg)); } catch (e) {}
  }
  let CONFIG = readConfig();

  // Self-heal: if an API key got stored in the voiceId slot (common paste mistake),
  // move it to apiKey and restore a default voice.
  (function migrate() {
    if (CONFIG.voiceId && CONFIG.voiceId.startsWith('sk_')) {
      if (!CONFIG.apiKey) CONFIG.apiKey = CONFIG.voiceId;
      CONFIG.voiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel
      writeConfig(CONFIG);
    }
  })();

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('No IndexedDB'));
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    return dbPromise;
  }
  async function dbGet(key) {
    try {
      const db = await openDB();
      return new Promise((res, rej) => {
        const tx = db.transaction(STORE, 'readonly');
        const st = tx.objectStore(STORE);
        const r = st.get(key);
        r.onsuccess = () => res(r.result || null);
        r.onerror = () => rej(r.error);
      });
    } catch (e) { return null; }
  }
  async function dbPut(key, val) {
    try {
      const db = await openDB();
      return new Promise((res, rej) => {
        const tx = db.transaction(STORE, 'readwrite');
        const st = tx.objectStore(STORE);
        const r = st.put(val, key);
        r.onsuccess = () => res();
        r.onerror = () => rej(r.error);
      });
    } catch (e) {}
  }

  // SHA-256 → hex; used as the cache key for (voiceId + modelId + text).
  async function hashKey(text) {
    const k = CONFIG.voiceId + '|' + CONFIG.modelId + '|' + text;
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
      const enc = new TextEncoder().encode(k);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // tiny non-crypto fallback hash
    let h = 0;
    for (let i = 0; i < k.length; i++) h = ((h << 5) - h + k.charCodeAt(i)) | 0;
    return 'h' + Math.abs(h).toString(36);
  }

  async function fetchFromEleven(text) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${CONFIG.voiceId}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': CONFIG.apiKey,
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: CONFIG.modelId,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.20,
          use_speaker_boost: true
        }
      })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error('ElevenLabs ' + res.status + ': ' + errText.slice(0, 200));
    }
    return res.blob();
  }

  async function getOrFetch(text) {
    const key = await hashKey(text);
    let blob = await dbGet(key);
    if (!blob) {
      blob = await fetchFromEleven(text);
      dbPut(key, blob); // fire-and-forget
    }
    return blob;
  }

  function playBlob(blob) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(blob);
      const a = new Audio(url);
      a.preload = 'auto';
      currentAudio = a;
      a.onended = () => { URL.revokeObjectURL(url); res(); };
      a.onerror = (e) => { URL.revokeObjectURL(url); rej(new Error('audio playback failed')); };
      a.play().catch(rej);
    });
  }

  async function processQueue() {
    if (isPlaying) return;
    isPlaying = true;
    while (playQueue.length) {
      const text = playQueue.shift();
      try {
        const blob = await getOrFetch(text);
        if (playQueue._cancelled) break;
        await playBlob(blob);
      } catch (e) {
        // Surface the error to the console; caller can decide to fall back.
        console.warn('[eleven]', e.message || e);
        if (window.ElevenLabs.onError) window.ElevenLabs.onError(e);
        break;
      }
    }
    isPlaying = false;
  }

  function stop() {
    playQueue.length = 0;
    playQueue._cancelled = true;
    setTimeout(() => { playQueue._cancelled = false; }, 50);
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (e) {}
      currentAudio = null;
    }
    isPlaying = false;
  }

  function speak(text) {
    if (!CONFIG.apiKey || !CONFIG.voiceId) {
      const e = new Error('not configured');
      e.code = 'not_configured';
      throw e;
    }
    stop();
    playQueue.push(text);
    setTimeout(processQueue, 30);
  }

  function isConfigured() {
    return !!(CONFIG.apiKey && CONFIG.voiceId);
  }
  function setConfig(patch) {
    CONFIG = Object.assign({}, CONFIG, patch);
    writeConfig(CONFIG);
  }
  function getConfig() { return { ...CONFIG }; }

  async function testKey(apiKey) {
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
        headers: { 'xi-api-key': apiKey }
      });
      if (!res.ok) return { ok: false, err: 'HTTP ' + res.status };
      const j = await res.json();
      return { ok: true, subscription: j };
    } catch (e) {
      return { ok: false, err: e.message || 'fetch failed' };
    }
  }

  async function listVoices(apiKey) {
    const res = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': apiKey }
    });
    if (!res.ok) throw new Error('voices ' + res.status);
    const j = await res.json();
    return j.voices || [];
  }

  async function clearCache() {
    try {
      const db = await openDB();
      return new Promise((res) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = () => res();
      });
    } catch (e) {}
  }

  window.ElevenLabs = {
    setConfig, getConfig, speak, stop, isConfigured,
    testKey, listVoices, clearCache
  };
})();
