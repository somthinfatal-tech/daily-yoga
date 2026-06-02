// Main Yoga App — receives theme config, renders home + session.
// Three instances are mounted in the canvas with different themes.

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ---------- helpers ----------
const fmt = (s) => {
  s = Math.max(0, Math.round(s));
  const m = Math.floor(s / 60);
  const sc = s % 60;
  return m + ':' + (sc < 10 ? '0' : '') + sc;
};
const todayDayIndex = () => {
  // Mon=0 ... Sun=6 — matches data ordering
  const d = new Date().getDay(); // 0=Sun..6=Sat
  return d === 0 ? 6 : d - 1;
};
const todayKey = () => {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
};

// ---------- WebAudio ambient ----------
function useAmbient(enabled, accentHue) {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (nodesRef.current) {
        try { nodesRef.current.gain.gain.linearRampToValueAtTime(0.0001, nodesRef.current.ctx.currentTime + 0.6); } catch (e) {}
        setTimeout(() => {
          try { nodesRef.current.ctx.close(); } catch (e) {}
          nodesRef.current = null;
        }, 800);
      }
      return;
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      gain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      filter.Q.value = 1.2;
      filter.connect(gain);

      // Two slowly detuned oscillators + a third for a fifth above
      const baseFreqs = [110, 110.5, 165]; // A2, A2 slightly detuned, E3
      const oscs = baseFreqs.map((f) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        o.connect(filter);
        o.start();
        return o;
      });

      // Slow filter sweep
      let lfo = ctx.createOscillator();
      let lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05;
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();

      nodesRef.current = { ctx, gain, oscs, filter, lfo };
    } catch (e) {
      console.warn('Audio init failed', e);
    }
    return () => {
      if (nodesRef.current) {
        try { nodesRef.current.gain.gain.linearRampToValueAtTime(0.0001, nodesRef.current.ctx.currentTime + 0.3); } catch (e) {}
        setTimeout(() => {
          try { nodesRef.current.ctx.close(); } catch (e) {}
          nodesRef.current = null;
        }, 500);
      }
    };
  }, [enabled]);
}

// ---------- TTS ----------
// Picks the best available voice once and reuses it. Soothing tuning:
// slower rate, slightly lower pitch, short breath between sentences.
const __voicePref = { voice: null, ready: false };
function __pickSoothingVoice() {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;

  // Score each voice. Higher = better.
  const score = (v) => {
    let s = 0;
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    // English only
    if (!/^en[-_]/.test(v.lang)) return -1;
    // Quality tier markers
    if (/(neural|premium|enhanced|natural|online|wavenet|studio|polyglot)/i.test(name)) s += 60;
    if (/(siri|samantha|ava|serena|moira|karen|tessa|fiona|nicky|allison|susan|ellen)/i.test(name)) s += 30;
    if (/(google|microsoft).*?(natural|neural|online|aria|jenny|sonia|libby|nova|ava)/i.test(name)) s += 50;
    // Female-coded voices tend to read soothing instruction copy better
    if (/(samantha|ava|serena|karen|moira|tessa|fiona|nicky|allison|susan|ellen|aria|jenny|sonia|libby|nova|emma|amy|joanna|salli|ivy|kendra|kimberly|olivia|nora)/i.test(name)) s += 8;
    // Locale preferences: en-US then en-GB then en-AU
    if (lang === 'en-us') s += 10;
    else if (lang === 'en-gb') s += 6;
    else if (lang === 'en-au') s += 4;
    else if (lang.startsWith('en')) s += 2;
    // Penalise novelty / non-soothing voices
    if (/(albert|alex jr|bahh|bells|boing|bubbles|cellos|deranged|hysterical|junior|trinoids|whisper|zarvox|bad news|good news)/i.test(name)) s -= 200;
    return s;
  };
  let best = null, bestScore = -Infinity;
  for (const v of voices) {
    const sc = score(v);
    if (sc > bestScore) { bestScore = sc; best = v; }
  }
  return bestScore > 0 ? best : null;
}
function __ensureVoiceReady() {
  if (!window.speechSynthesis) return;
  if (__voicePref.ready) return;
  const v = __pickSoothingVoice();
  if (v) { __voicePref.voice = v; __voicePref.ready = true; return; }
  // Voices load asynchronously on some browsers — listen once.
  if (!__voicePref._listening) {
    __voicePref._listening = true;
    window.speechSynthesis.onvoiceschanged = () => {
      const v2 = __pickSoothingVoice();
      if (v2) { __voicePref.voice = v2; __voicePref.ready = true; }
    };
  }
}
// Split text into short clauses so we can insert tiny breaths and naturally pace the read.
function __chunkForBreath(text) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?\u2026])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}
function speak(text, opts = {}) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    __ensureVoiceReady();
    const chunks = __chunkForBreath(text);
    const baseRate = opts.rate ?? 0.82;    // slower than default for calm cadence
    const basePitch = opts.pitch ?? 0.88;  // slightly lower for warmth
    const volume = opts.volume ?? 0.85;

    chunks.forEach((chunk, i) => {
      // Per-sentence rate variation — tiny, keeps it human, not robotic
      const wobble = (i % 3 === 0) ? 0 : (i % 3 === 1 ? -0.03 : 0.02);
      const u = new SpeechSynthesisUtterance(chunk);
      u.rate = baseRate + wobble;
      u.pitch = basePitch;
      u.volume = volume;
      if (__voicePref.voice) u.voice = __voicePref.voice;
      // A small breath between sentences
      window.speechSynthesis.speak(u);
    });
  } catch (e) {}
}
function stopSpeak() {
  if (window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}
// Warm up voices ASAP so the first session start doesn't fall back to a robotic default.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  try { window.speechSynthesis.getVoices(); } catch (e) {}
  __ensureVoiceReady();
}

// Wrapper that prefers ElevenLabs when configured, falls back to browser TTS.
function speakSmart(text) {
  if (window.ElevenLabs && window.ElevenLabs.isConfigured && window.ElevenLabs.isConfigured()) {
    try {
      window.ElevenLabs.speak(text);
      return;
    } catch (e) { /* fall through */ }
  }
  speak(text);
}
function stopSpeakSmart() {
  try { if (window.ElevenLabs && window.ElevenLabs.stop) window.ElevenLabs.stop(); } catch (e) {}
  stopSpeak();
}

// ---------- Per-day accent ----------
function dayAccent(day, theme) {
  const h = day.hue;
  if (theme.colorMode === 'mono-warm') return 'oklch(0.78 0.13 55)';
  if (theme.colorMode === 'mono-cool') return 'oklch(0.78 0.12 220)';
  if (theme.colorMode === 'mono-violet') return 'oklch(0.74 0.13 290)';
  if (theme.colorMode === 'mono-sage') return 'oklch(0.78 0.10 150)';
  // per-day default
  return `oklch(0.76 0.11 ${h})`;
}
function dayAccentSoft(day, theme) {
  const h = day.hue;
  if (theme.colorMode === 'mono-warm') return 'oklch(0.55 0.10 55)';
  if (theme.colorMode === 'mono-cool') return 'oklch(0.55 0.10 220)';
  if (theme.colorMode === 'mono-violet') return 'oklch(0.50 0.10 290)';
  if (theme.colorMode === 'mono-sage') return 'oklch(0.55 0.08 150)';
  return `oklch(0.50 0.10 ${h})`;
}

// ---------- Breathing orb ----------
function BreathingOrb({ accent, paused, pattern = '4-4' }) {
  // pattern '4-4' = inhale 4 / exhale 4; '4-7-8' = inhale 4 / hold 7 / exhale 8
  const [phase, setPhase] = useState('inhale');
  const [tNorm, setTNorm] = useState(0);
  const rafRef = useRef();
  const startRef = useRef(performance.now());
  const total = pattern === '4-7-8' ? 19 : 8;

  useEffect(() => {
    let cancelled = false;
    if (paused) return;
    startRef.current = performance.now();
    const tick = (now) => {
      if (cancelled || paused) return;
      const t = ((now - startRef.current) / 1000) % total;
      if (pattern === '4-7-8') {
        if (t < 4) { setPhase('inhale'); setTNorm(t / 4); }
        else if (t < 11) { setPhase('hold'); setTNorm(1); }
        else { setPhase('exhale'); setTNorm(1 - (t - 11) / 8); }
      } else {
        if (t < 4) { setPhase('inhale'); setTNorm(t / 4); }
        else { setPhase('exhale'); setTNorm(1 - (t - 4) / 4); }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(rafRef.current); };
  }, [paused, pattern]);

  const scale = 0.55 + tNorm * 0.65;
  return (
    <div className="orb-wrap">
      <div className="orb-rings">
        <div className="orb-ring" style={{ borderColor: accent, transform: `scale(${scale * 1.4})`, opacity: 0.2 }} />
        <div className="orb-ring" style={{ borderColor: accent, transform: `scale(${scale * 1.2})`, opacity: 0.4 }} />
      </div>
      <div className="orb-core" style={{
        background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
        transform: `scale(${scale})`,
        opacity: 0.4 + tNorm * 0.5
      }} />
      <div className="orb-label">{phase}</div>
    </div>
  );
}

// ---------- Timer (3 styles) ----------
function Timer({ remaining, total, accent, style }) {
  const pct = total > 0 ? remaining / total : 0;
  if (style === 'bar') {
    return (
      <div className="timer-bar-wrap">
        <div className="timer-bar-track">
          <div className="timer-bar-fill" style={{ width: (pct * 100) + '%', background: accent }} />
        </div>
        <div className="timer-bar-digs">{fmt(remaining)}</div>
      </div>
    );
  }
  if (style === 'numbers') {
    return (
      <div className="timer-nums" style={{ color: accent }}>
        {fmt(remaining)}
        <div className="timer-nums-sub">remaining</div>
      </div>
    );
  }
  // ring (default)
  const r = 40;
  const circ = 2 * Math.PI * r;
  return (
    <div className="timer-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} className="ring-track" />
        <circle cx="50" cy="50" r={r}
          className="ring-arc"
          stroke={accent}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="ring-digs">{fmt(remaining)}</div>
    </div>
  );
}

// ---------- Home screen ----------
// `order` is an array of 7 day indices (into program). Drag-to-reorder swaps positions.
// `onReorder(newOrder)` and `onShuffle()` mutate the parent state.
// We use pointer events with a long-press threshold so taps still navigate.
function HomeScreen({ program, theme, streak, order, onStart, onSettings, onReorder, onShuffle }) {
  const todayIdx = todayDayIndex();
  const gridRef = React.useRef(null);
  const [dragSlot, setDragSlot] = React.useState(null);    // grid slot being dragged
  const [overSlot, setOverSlot] = React.useState(null);    // current hover target
  const [dragPos, setDragPos] = React.useState(null);      // {x,y} of pointer
  const [dragGhostSize, setDragGhostSize] = React.useState({ w: 0, h: 0 });
  const pressTimer = React.useRef(null);
  const startPos = React.useRef(null);

  const cancelPress = () => {
    if (pressTimer.current) { clearTimeout(pressTimer.current); pressTimer.current = null; }
  };

  const findSlotFromPoint = (x, y) => {
    if (!gridRef.current) return null;
    const cards = gridRef.current.querySelectorAll('[data-slot]');
    for (const c of cards) {
      const r = c.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        return parseInt(c.dataset.slot, 10);
      }
    }
    return null;
  };

  const onPointerDown = (slot, e) => {
    if (e.button && e.button !== 0) return;
    startPos.current = { x: e.clientX, y: e.clientY, slot };
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    setDragGhostSize({ w: rect.width, h: rect.height });
    cancelPress();
    pressTimer.current = setTimeout(() => {
      try { e.currentTarget && e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      setDragSlot(slot);
      setDragPos({ x: e.clientX, y: e.clientY });
      if (navigator.vibrate) navigator.vibrate(8);
    }, 280);
  };
  const onPointerMove = (e) => {
    if (dragSlot === null) {
      // If pointer moves >8px before press fires, treat as scroll and cancel
      if (startPos.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        if (dx * dx + dy * dy > 64) cancelPress();
      }
      return;
    }
    e.preventDefault();
    setDragPos({ x: e.clientX, y: e.clientY });
    const slot = findSlotFromPoint(e.clientX, e.clientY);
    setOverSlot(slot);
  };
  const onPointerUp = (e) => {
    cancelPress();
    if (dragSlot !== null && overSlot !== null && overSlot !== dragSlot) {
      const next = order.slice();
      const v = next[dragSlot];
      next.splice(dragSlot, 1);
      next.splice(overSlot, 0, v);
      onReorder(next);
    }
    setDragSlot(null);
    setOverSlot(null);
    setDragPos(null);
    startPos.current = null;
  };

  const draggedDay = dragSlot !== null ? program[order[dragSlot]] : null;
  const draggedAccent = draggedDay ? dayAccent(draggedDay, theme) : null;

  return (
    <div className="home"
         onPointerMove={onPointerMove}
         onPointerUp={onPointerUp}
         onPointerCancel={onPointerUp}>
      <div className="home-top">
        <div className="home-eyebrow">DAILY YOGA · ADAPTIVE</div>
        <div className="home-top-right">
          <div className="streak-pill">
            <div className="streak-flame">●</div>
            <div className="streak-text">{streak.count} day streak</div>
          </div>
          <button className="home-gear" onClick={onShuffle} aria-label="Shuffle days" title="Shuffle days">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5"/>
              <path d="M21 3l-7 7"/>
              <path d="M3 21l7-7"/>
              <path d="M16 21h5v-5"/>
              <path d="M21 21l-7-7"/>
              <path d="M3 3l7 7"/>
            </svg>
          </button>
          <button className="home-gear" onClick={onSettings} aria-label="Settings">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M19.14 12.94a7.5 7.5 0 000-1.88l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96a7.4 7.4 0 00-1.63-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 00-.6.22L2.66 8.84a.5.5 0 00.12.64l2.03 1.58a7.5 7.5 0 000 1.88L2.78 14.52a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.6.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54a.5.5 0 00.5.42h3.84a.5.5 0 00.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96a.5.5 0 00.6-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="home-greet">
        <div className="home-greet-1">This week · hold &amp; drag to reorder</div>
        <div className="home-greet-2">{theme.greeting || 'Move with breath.'}</div>
      </div>

      <div className="week-grid" ref={gridRef}>
        {order.map((dayIdx, slot) => {
          const d = program[dayIdx];
          const isToday = slot === todayIdx;
          const done = streak.daysDone.includes(dayIdx);
          const accent = dayAccent(d, theme);
          const isDragging = dragSlot === slot;
          const isOver = dragSlot !== null && overSlot === slot && overSlot !== dragSlot;
          // Weekday label by SLOT position (not by day's original name)
          const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          return (
            <button
              key={slot}
              data-slot={slot}
              className={`day-card ${isToday ? 'today' : ''} ${done ? 'done' : ''} ${isDragging ? 'dragging' : ''} ${isOver ? 'drop-target' : ''}`}
              onPointerDown={(e) => onPointerDown(slot, e)}
              onClick={(e) => { if (dragSlot === null) onStart(dayIdx); }}
              style={{ '--acc': accent, touchAction: 'pan-y' }}
            >
              <div className="dc-row1">
                <div className="dc-short">{weekdayLabels[slot]}</div>
                {isToday && <div className="dc-today">TODAY</div>}
                {done && <div className="dc-check">✓</div>}
              </div>
              <div className="dc-num">{slot + 1}</div>
              <div className="dc-focus">{d.focus}</div>
              <div className="dc-dur">{d.totalMin} min · {d.slides.filter(s => s.t === 'pose').length} poses</div>
            </button>
          );
        })}
      </div>

      {/* Drag ghost — follows the pointer */}
      {dragSlot !== null && dragPos && draggedDay && (
        <div className="drag-ghost" style={{
          left: dragPos.x - dragGhostSize.w / 2,
          top: dragPos.y - dragGhostSize.h / 2,
          width: dragGhostSize.w,
          height: dragGhostSize.h,
          '--acc': draggedAccent
        }}>
          <div className="dc-row1">
            <div className="dc-short">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][overSlot ?? dragSlot]}</div>
          </div>
          <div className="dc-num">{(overSlot ?? dragSlot) + 1}</div>
          <div className="dc-focus">{draggedDay.focus}</div>
          <div className="dc-dur">{draggedDay.totalMin} min</div>
        </div>
      )}

      <div className="home-bottom">
        <div className="hb-row">
          <div className="hb-stat">
            <div className="hb-stat-num">{streak.totalSessions}</div>
            <div className="hb-stat-lab">sessions</div>
          </div>
          <div className="hb-stat">
            <div className="hb-stat-num">{streak.totalMin}</div>
            <div className="hb-stat-lab">minutes</div>
          </div>
          <div className="hb-stat">
            <div className="hb-stat-num">{streak.bestStreak}</div>
            <div className="hb-stat-lab">best streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Session player ----------
function SessionPlayer({ program, dayIdx, theme, resumeFrom, onExit, onComplete, voiceOn, soundOn, prefs }) {
  const day = program[dayIdx];
  const accent = dayAccent(day, theme);
  const accentSoft = dayAccentSoft(day, theme);

  const [si, setSi] = useState(resumeFrom?.si ?? 0);
  const [tl, setTl] = useState(0);
  const [tt, setTt] = useState(0);
  const [paused, setPaused] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true); // tap-to-resume overlay on first load
  const ivRef = useRef(null);
  const slide = day.slides[si];

  // Resume guard
  const resumed = useRef(false);
  useEffect(() => {
    if (!resumed.current && resumeFrom && resumeFrom.si > 0) {
      resumed.current = true;
      setSi(resumeFrom.si);
    }
  }, []);

  // Slide change effect: reset timer, speak if voice on
  useEffect(() => {
    if (!slide) return;
    setTt(slide.d || 0);
    setTl(slide.d || 0);
    if (voiceOn && slide.t === 'pose') {
      // Keep it short — just the pose name + first cue. Avoids cramming the hold time.
      const sideText = slide.sd === 'R' ? 'Right side. ' : slide.sd === 'L' ? 'Left side. ' : '';
      const firstCue = (slide.ins.split('.').slice(0, 2).join('.') + '.').trim();
      const text = sideText + slide.nm + '. ' + firstCue;
      setTimeout(() => speakSmart(text), 350);
    } else if (voiceOn && slide.t === 'seg') {
      setTimeout(() => speakSmart(slide.title + '.' + (slide.sub ? ' ' + slide.sub + '.' : '')), 350);
    } else if (voiceOn && slide.t === 'prep') {
      setTimeout(() => speakSmart('Before we begin. ' + slide.title + '.'), 350);
    } else if (voiceOn && slide.t === 'intro') {
      setTimeout(() => speakSmart('Day ' + day.n + '. ' + day.focus + '.'), 350);
    } else if (voiceOn && slide.t === 'end') {
      setTimeout(() => speakSmart('Session complete. Well done.'), 350);
    } else {
      stopSpeakSmart();
    }
    return () => stopSpeakSmart();
  }, [si, voiceOn, day.n]);

  // Tick
  useEffect(() => {
    if (paused) return;
    if (!slide || slide.t === 'end' || (slide.d || 0) === 0) return;
    ivRef.current = setInterval(() => {
      setTl(prev => {
        if (prev <= 1) {
          clearInterval(ivRef.current);
          ivRef.current = null;
          if (theme.autoAdvance !== false) {
            setTimeout(() => {
              setSi(s => {
                if (s < day.slides.length - 1) return s + 1;
                return s;
              });
            }, 50);
          } else {
            setPaused(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ivRef.current);
  }, [paused, si, day, theme.autoAdvance]);

  // Auto-complete when reaching end slide
  useEffect(() => {
    if (slide?.t === 'end') {
      onComplete?.(dayIdx);
    }
  }, [si]);

  // Persist progress
  useEffect(() => {
    if (slide?.t !== 'end') {
      window.localStorage.setItem('yoga.' + theme.id + '.resume', JSON.stringify({ dayIdx, si }));
    } else {
      window.localStorage.removeItem('yoga.' + theme.id + '.resume');
    }
  }, [si, dayIdx, theme.id]);

  useAmbient(soundOn, day.hue);

  const handleNext = () => {
    if (si < day.slides.length - 1) setSi(si + 1);
  };
  const handlePrev = () => {
    if (si > 0) setSi(si - 1);
  };
  const handleTogglePause = () => {
    setPaused(p => !p);
    setShowOverlay(false);
  };
  const handleStartFromOverlay = () => {
    setPaused(false);
    setShowOverlay(false);
  };

  // Slide chrome
  const total = day.slides.length;
  const progress = ((si + 1) / total) * 100;

  return (
    <div className="session" style={{ '--acc': accent, '--acc-soft': accentSoft, '--hue': day.hue }}>
      {/* Cinematic backdrop scene */}
      <PoseScene pose={slide.t === 'pose' ? slide : null} accent={accent} hue={day.hue} paused={paused} />
      <div className="session-vignette" />

      {/* Breathing aura + instructor figure — centerpiece for pose slides */}
      {slide.t === 'pose' && (
        <div className="instructor-stage">
          <div className="instructor-wrap">
            <BreathAura accent={accent} paused={paused} breathing={!!slide.br} />
            {theme.showPoseImage !== false && (
              <div className="instructor-fig-overlay">
                <InstructorFigure
                  pose={slide}
                  accent={accent}
                  paused={paused}
                  breathing={!!slide.br}
                  side={slide.sd}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top chrome */}
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Back">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <div className="session-title">
          <div className="st-day">Day {day.n} · {day.day}</div>
          <div className="st-focus">{day.focus}</div>
        </div>
        <div className="session-counter">{si + 1}<span className="stc-sep">/</span>{total}</div>
      </div>
      <div className="session-progress">
        <div className="session-progress-fill" style={{ width: progress + '%', background: accent }} />
      </div>

      {/* Slide content */}
      <div className={`session-body ${slide.t === 'pose' ? 'body-pose' : ''}`}>
        {slide.t === 'intro' && (
          <div className="slide slide-intro">
            <div className="si-eyebrow">{day.day} · DAY {day.n}</div>
            <div className="si-num" style={{ color: accent }}>{String(day.n).padStart(2, '0')}</div>
            <div className="si-focus">{day.focus}</div>
            <div className="si-meta">{day.totalMin} min · {day.slides.filter(s => s.t === 'pose').length} poses</div>
          </div>
        )}
        {slide.t === 'prep' && (
          <div className="slide slide-prep">
            <div className="sp-label">PREPARATION</div>
            <div className="sp-title">{slide.title}</div>
            <div className="sp-body">
              {slide.ins.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}
        {slide.t === 'seg' && (
          <div className="slide slide-seg">
            <div className="ss-line" style={{ background: accent }} />
            <div className="ss-label">SEGMENT</div>
            <div className="ss-title">{slide.title}</div>
            {slide.sub && <div className="ss-sub">{slide.sub}</div>}
          </div>
        )}
        {slide.t === 'pose' && (
          <div className="slide slide-pose">
            <div className="pose-info">
              {slide.sd && (
                <div className={`pose-side pose-side-${slide.sd}`}>
                  {slide.sd === 'R' ? 'RIGHT SIDE' : slide.sd === 'L' ? 'LEFT SIDE' : 'BOTH SIDES'}
                </div>
              )}
              <div className="pose-nm">{slide.nm}</div>
              {slide.sub && <div className="pose-sub">{slide.sub}</div>}
              <div className="pose-ins">{slide.ins}</div>
              {slide.rp && <div className="pose-rp">{slide.rp}</div>}
              {slide.w && theme.showWarnings !== false && prefs.showWarnings !== false && (
                <div className="pose-warn">{slide.w}</div>
              )}
            </div>
          </div>
        )}
        {slide.t === 'end' && (
          <div className="slide slide-end">
            <div className="se-mark" style={{ color: accent }}>✦</div>
            <div className="se-title">Session Complete</div>
            <div className="se-day">Day {day.n} · {day.focus}</div>
            <div className="se-body">Well done. Rest, hydrate, and notice how your body feels.</div>
            <button className="se-btn" onClick={onExit} style={{ background: accent }}>
              Back to week
            </button>
          </div>
        )}
      </div>

      {/* Timer + controls */}
      {slide.t !== 'end' && slide.d > 0 && (
        <div className="session-foot">
          <Timer remaining={tl} total={tt} accent={accent} style={theme.timerStyle || prefs.timerStyle || 'ring'} />
          {slide.rp && slide.t === 'pose' && (
            <div className="session-rep">{slide.rp}</div>
          )}
          <div className="session-ctrls">
            <button className="ctrl-btn" onClick={handlePrev} disabled={si === 0} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button className="ctrl-btn ctrl-main" onClick={handleTogglePause} style={{ background: paused ? accent : 'rgba(255,255,255,0.10)' }} aria-label={paused ? 'Play' : 'Pause'}>
              {paused ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
              )}
            </button>
            <button className="ctrl-btn" onClick={handleNext} disabled={si === total - 1} aria-label="Next">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>
            </button>
          </div>
        </div>
      )}
      {slide.t === 'end' && null}

      {/* Tap-to-start overlay on first load / after resume */}
      {showOverlay && slide.t !== 'end' && (
        <div className="session-overlay" onClick={handleStartFromOverlay}>
          <div className="overlay-card">
            <div className="overlay-tap" style={{ borderColor: accent }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill={accent}><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div className="overlay-text">{resumeFrom && resumeFrom.si > 0 ? 'Resume session' : 'Tap to begin'}</div>
            {resumeFrom && resumeFrom.si > 0 && (
              <div className="overlay-sub">From pose {resumeFrom.si + 1} of {total}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Top-level App ----------
function YogaApp({ theme }) {
  const program = window.YOGA_PROGRAM;
  const [screen, setScreen] = useState('home'); // home | session
  const [dayIdx, setDayIdx] = useState(todayDayIndex());
  const [resume, setResume] = useState(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVideoTools, setShowVideoTools] = useState(false);
  const [scriptDayIdx, setScriptDayIdx] = useState(null); // null | 0..6 — which day's export to show
  const [scriptKind, setScriptKind] = useState('vo');      // 'vo' | 'kling'
  const openExport = (kind, i) => { setScriptKind(kind); setScriptDayIdx(i); pushLayer(); };
  const [prefs, setPrefs] = useState(() => {
    try {
      const raw = window.localStorage.getItem('yoga.' + theme.id + '.prefs');
      return raw ? JSON.parse(raw) : { timerStyle: 'ring', showWarnings: true };
    } catch (e) { return { timerStyle: 'ring', showWarnings: true }; }
  });

  // Streak state
  const [streak, setStreak] = useState(() => {
    try {
      const raw = window.localStorage.getItem('yoga.' + theme.id + '.streak');
      return raw ? JSON.parse(raw) : { count: 0, bestStreak: 0, totalSessions: 0, totalMin: 0, daysDone: [], lastDate: null };
    } catch (e) { return { count: 0, bestStreak: 0, totalSessions: 0, totalMin: 0, daysDone: [], lastDate: null }; }
  });

  // Order: array of 7 day-indices into program (which day plays on Mon, Tue, ...).
  // Default = identity. Persisted.
  const [order, setOrder] = useState(() => {
    try {
      const raw = window.localStorage.getItem('yoga.' + theme.id + '.order');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === 7 && arr.every(n => Number.isInteger(n) && n >= 0 && n < 7)) {
          // sanity check: all unique
          if (new Set(arr).size === 7) return arr;
        }
      }
    } catch (e) {}
    return [0, 1, 2, 3, 4, 5, 6];
  });
  useEffect(() => {
    try { window.localStorage.setItem('yoga.' + theme.id + '.order', JSON.stringify(order)); } catch (e) {}
  }, [order]);

  const shuffleOrder = () => {
    const next = order.slice();
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setOrder(next);
  };

  // Check resume on home mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('yoga.' + theme.id + '.resume');
      if (raw) {
        const r = JSON.parse(raw);
        setResume(r);
      }
    } catch (e) {}
  }, []);

  // Save prefs
  useEffect(() => {
    try { window.localStorage.setItem('yoga.' + theme.id + '.prefs', JSON.stringify(prefs)); } catch (e) {}
  }, [prefs]);

  // Save streak
  useEffect(() => {
    try { window.localStorage.setItem('yoga.' + theme.id + '.streak', JSON.stringify(streak)); } catch (e) {}
  }, [streak]);

  const handleStart = (i) => {
    setDayIdx(i);
    setScreen('session');
    pushLayer();
  };
  const handleExit = () => {
    // Route through history so the Android back button and this button agree.
    if (hasLayerRef.current) { window.history.back(); }
    else { setScreen('home'); stopSpeakSmart(); }
  };
  const handleComplete = (i) => {
    setStreak(s => {
      const tk = todayKey();
      if (s.lastDate === tk && s.daysDone.includes(i)) return s;
      const newDaysDone = s.daysDone.includes(i) ? s.daysDone : [...s.daysDone, i];
      const yesterdayKey = (() => {
        const d = new Date(); d.setDate(d.getDate() - 1);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      })();
      const newCount = s.lastDate === tk ? s.count : (s.lastDate === yesterdayKey ? s.count + 1 : 1);
      return {
        ...s,
        count: newCount,
        bestStreak: Math.max(s.bestStreak, newCount),
        totalSessions: s.totalSessions + 1,
        totalMin: s.totalMin + program[i].totalMin,
        daysDone: newDaysDone,
        lastDate: tk
      };
    });
    window.localStorage.removeItem('yoga.' + theme.id + '.resume');
    setResume(null);
  };

  // ---- Android back-button bridge ----
  // Each opened layer (session, settings, export sheet) pushes a history entry;
  // the hardware/gesture Back button pops it and we close the topmost layer
  // instead of leaving the app.
  const layerRef = useRef({ screen, showSettings, scriptDayIdx });
  useEffect(() => { layerRef.current = { screen, showSettings, scriptDayIdx }; }, [screen, showSettings, scriptDayIdx]);
  const hasLayerRef = useRef(false);
  useEffect(() => {
    hasLayerRef.current = (screen === 'session') || showSettings || (scriptDayIdx !== null);
  }, [screen, showSettings, scriptDayIdx]);

  const pushLayer = () => { try { window.history.pushState({ yoga: Date.now() }, ''); } catch (e) {} };

  useEffect(() => {
    const onPop = () => {
      const L = layerRef.current;
      if (L.scriptDayIdx !== null) { setScriptDayIdx(null); return; }
      if (L.showSettings) { setShowSettings(false); return; }
      if (L.screen === 'session') { setScreen('home'); stopSpeakSmart(); return; }
      // nothing open → let the navigation proceed (exits the app)
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const openSettings = () => { setShowSettings(true); pushLayer(); };
  const closeTopLayer = () => { if (hasLayerRef.current) window.history.back(); };

  return (
    <div className={`yoga-app theme-${theme.id} font-${theme.fontPreset || 'plex'}`} style={theme.cssVars}>
      {/* Status bar (decorative) */}
      <div className="status-bar">
        <div className="sb-time">{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\sAM|\sPM/, '')}</div>
        <div className="sb-right">
          <span className="sb-cell">●●●●</span>
          <span className="sb-wifi">●</span>
          <span className="sb-batt">98%</span>
        </div>
      </div>

      {screen === 'home' && (
        <HomeScreen
          program={program}
          theme={theme}
          streak={streak}
          order={order}
          onStart={handleStart}
          onSettings={openSettings}
          onReorder={setOrder}
          onShuffle={shuffleOrder}
        />
      )}
      {screen === 'session' && (
        <SessionPlayer
          program={program}
          dayIdx={dayIdx}
          theme={theme}
          resumeFrom={resume && resume.dayIdx === dayIdx ? resume : null}
          onExit={handleExit}
          onComplete={handleComplete}
          voiceOn={voiceOn}
          soundOn={soundOn}
          prefs={prefs}
        />
      )}

      {/* Floating audio toggles — only visible inside a session */}
      {screen === 'session' && (
        <div className="audio-toggles">
          <button
            className={`audio-tog ${voiceOn ? 'on' : ''}`}
            onClick={() => setVoiceOn(v => !v)}
            title={voiceOn ? 'Voice guidance on' : 'Voice guidance off'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z"/>
            </svg>
            <span>Voice</span>
          </button>
          <button
            className={`audio-tog ${soundOn ? 'on' : ''}`}
            onClick={() => setSoundOn(v => !v)}
            title={soundOn ? 'Ambient sound on' : 'Ambient sound off'}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z"/>
            </svg>
            <span>Sound</span>
          </button>
          <button
            className="audio-tog audio-tog-icon"
            onClick={openSettings}
            title="Settings"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M19.14 12.94a7.5 7.5 0 000-1.88l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96a7.4 7.4 0 00-1.63-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 00-.6.22L2.66 8.84a.5.5 0 00.12.64l2.03 1.58a7.5 7.5 0 000 1.88L2.78 14.52a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.6.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54a.5.5 0 00.5.42h3.84a.5.5 0 00.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96a.5.5 0 00.6-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Settings sheet */}
      {showSettings && (
        <div className="settings-sheet" onClick={(e) => { if (e.target.classList.contains('settings-sheet')) closeTopLayer(); }}>
          <div className="settings-card">
            <div className="settings-head">
              <div className="settings-title">Settings</div>
              <button className="settings-close" onClick={closeTopLayer}>×</button>
            </div>
            <div className="settings-row">
              <div className="settings-lab">Show medical notes</div>
              <button className={`seg-toggle ${prefs.showWarnings ? 'on' : ''}`}
                onClick={() => setPrefs(p => ({ ...p, showWarnings: !p.showWarnings }))}>
                <div className="seg-knob" />
              </button>
            </div>
            <div className="settings-row settings-row-stack">
              <div className="settings-lab">AI voice (ElevenLabs)</div>
              <ElevenSettings />
            </div>
            <div className="settings-row settings-row-stack">
              <button className="settings-disclosure" onClick={() => setShowVideoTools(v => !v)}>
                <div>
                  <div className="settings-lab">Make AI videos</div>
                  <div className="settings-hint settings-hint-inline">Optional — export scripts &amp; shot lists for Synthesia, HeyGen, Kling.</div>
                </div>
                <svg className={`disc-chev ${showVideoTools ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {showVideoTools && (
                <div className="settings-disclosure-body">
                  <div className="settings-sublab">Voice-over scripts</div>
                  <div className="settings-hint">For Synthesia, HeyGen, Hedra — paste in your AI presenter.</div>
                  <div className="settings-script-grid">
                    {program.map((d, i) => (
                      <button key={i} className="settings-script-btn" onClick={() => openExport('vo', i)}>
                        <span className="ssb-num">{d.n}</span>
                        <span className="ssb-focus">{d.focus}</span>
                      </button>
                    ))}
                  </div>
                  <div className="settings-sublab" style={{ marginTop: '14px' }}>AI video shot list (Kling 3.0)</div>
                  <div className="settings-hint">Per-pose prompts + locked character card + stitch plan.</div>
                  <div className="settings-script-grid">
                    {program.map((d, i) => (
                      <button key={i} className="settings-script-btn" onClick={() => openExport('kling', i)}>
                        <span className="ssb-num">{d.n}</span>
                        <span className="ssb-focus">{d.focus}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="settings-row settings-row-stack">
              <div className="settings-lab">Reset progress</div>
              <button className="settings-danger" onClick={() => {
                if (confirm('Reset streak and progress?')) {
                  setStreak({ count: 0, bestStreak: 0, totalSessions: 0, totalMin: 0, daysDone: [], lastDate: null });
                  window.localStorage.removeItem('yoga.' + theme.id + '.resume');
                  setResume(null);
                }
              }}>Reset</button>
            </div>
          </div>
        </div>
      )}
      {/* Export preview (voice-over or Kling shot list) */}
      {scriptDayIdx !== null && (
        <ScriptSheet
          {...buildExport(scriptKind, program[scriptDayIdx])}
          onClose={closeTopLayer}
        />
      )}
    </div>
  );
}

// ---------- ElevenLabs settings panel ----------
const ELEVEN_PRESETS = [
  { name: 'Rachel',    id: '21m00Tcm4TlvDq8ikWAM', desc: 'Calm American narrator' },
  { name: 'Bella',     id: 'EXAVITQu4vr4xnSDxMaL', desc: 'Soft, warm, slightly breathy' },
  { name: 'Charlotte', id: 'XB0fDUnXU5powFXDhCwa', desc: 'British, measured, soothing' },
  { name: 'Lily',      id: 'pFZP5JQG7iQjIQuC4Bku', desc: 'Gentle, conversational' },
  { name: 'Serena',    id: 'pMsXgVXv3BLzUgSXRplE', desc: 'Warm, low-pitched, meditative' },
  { name: 'Matilda',   id: 'XrExE9yKIg1WjnnlVkGX', desc: 'Bright, friendly, soft' }
];

function ElevenSettings() {
  const E = window.ElevenLabs;
  const [cfg, setCfg] = React.useState(() => E ? E.getConfig() : { apiKey: '', voiceId: '', modelId: 'eleven_multilingual_v2' });
  const [status, setStatus] = React.useState(null); // null | 'testing' | 'ok' | 'error'
  const [statusMsg, setStatusMsg] = React.useState('');
  const [showKey, setShowKey] = React.useState(false);
  const [previewing, setPreviewing] = React.useState(false);
  const [myVoices, setMyVoices] = React.useState(null); // null | [] | [{voice_id,name,...}]
  const [loadingVoices, setLoadingVoices] = React.useState(false);

  // Auto-load account voices whenever the panel opens (if key already saved).
  // Prevents the preset library list showing on re-open and confusing users.
  React.useEffect(() => {
    if (cfg.apiKey) loadVoices(cfg.apiKey);
  }, []);

  const update = (patch) => {
    const next = { ...cfg, ...patch };
    setCfg(next);
    E && E.setConfig(patch);
  };

  const loadVoices = async (key) => {
    const useKey = key || cfg.apiKey;
    if (!useKey) return;
    setLoadingVoices(true);
    try {
      const voices = await E.listVoices(useKey);
      setMyVoices(voices);
      // If current voice isn't in the available list, default to the first one.
      if (voices.length && !voices.some(v => v.voice_id === cfg.voiceId)) {
        update({ voiceId: voices[0].voice_id });
      }
    } catch (e) {
      setMyVoices([]);
      setStatus('error');
      setStatusMsg('Could not load voices: ' + (e.message || e));
    }
    setLoadingVoices(false);
  };

  const testKey = async () => {
    if (!cfg.apiKey) { setStatus('error'); setStatusMsg('Paste your API key first.'); return; }
    setStatus('testing'); setStatusMsg('');
    const r = await E.testKey(cfg.apiKey);
    if (r.ok) {
      setStatus('ok');
      const sub = r.subscription || {};
      const used = sub.character_count ?? 0;
      const limit = sub.character_limit ?? 0;
      const tier = sub.tier || 'free';
      setStatusMsg(`Connected (${tier}). ${used.toLocaleString()} / ${limit.toLocaleString()} chars used.`);
      loadVoices(cfg.apiKey); // auto-load the voices this account can use
    } else {
      setStatus('error');
      setStatusMsg(r.err || 'Connection failed');
    }
  };
  const preview = async () => {
    if (!E.isConfigured()) { setStatus('error'); setStatusMsg('Set a key and voice first.'); return; }
    setPreviewing(true);
    setStatus(null);
    E.onError = (err) => {
      setStatus('error');
      let msg = err.message || String(err);
      if (/paid_plan_required|payment_required/i.test(msg)) {
        msg = 'This voice needs a paid plan. Pick one of your own voices below (tap “Load my voices”), or add this voice to your VoiceLab on elevenlabs.io.';
      }
      setStatusMsg(msg);
      setPreviewing(false);
    };
    try {
      E.speak('Right side. Reclined figure four. Cross the right ankle over the left knee. Breathe into the outer right hip.');
    } catch (e) {}
    setTimeout(() => setPreviewing(false), 6000);
  };
  const clearCache = async () => {
    await E.clearCache();
    setStatusMsg('Cache cleared.');
    setStatus('ok');
    setTimeout(() => setStatusMsg(''), 2000);
  };

  // Which voices to show: account voices if loaded, else the curated presets.
  const showAccountVoices = Array.isArray(myVoices);

  return (
    <div className="el-wrap">
      <div className="el-field">
        <label className="el-lab">API key</label>
        <div className="el-key-row">
          <input
            className="el-input"
            type={showKey ? 'text' : 'password'}
            value={cfg.apiKey}
            placeholder="sk_..."
            onChange={(e) => update({ apiKey: e.target.value.trim() })}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="el-mini" onClick={() => setShowKey(s => !s)}>{showKey ? 'hide' : 'show'}</button>
          <button className="el-mini el-mini-test" onClick={testKey}>test</button>
        </div>
        <div className="el-note">Stored in this browser only. Never sent anywhere except elevenlabs.io.</div>
      </div>

      <div className="el-field">
        <div className="el-lab-row">
          <label className="el-lab">Voice</label>
          <button className="el-mini" onClick={() => loadVoices()} disabled={!cfg.apiKey || loadingVoices}>
            {loadingVoices ? 'loading…' : 'load my voices'}
          </button>
        </div>

        {showAccountVoices ? (
          myVoices.length ? (
            <div className="el-presets">
              {myVoices.map(v => (
                <button
                  key={v.voice_id}
                  className={`el-preset ${cfg.voiceId === v.voice_id ? 'active' : ''}`}
                  onClick={() => update({ voiceId: v.voice_id })}
                  title={v.voice_id}
                >
                  <span className="el-preset-name">{v.name}</span>
                  <span className="el-preset-desc">{(v.labels && (v.labels.description || v.labels.accent)) || v.category || 'voice'}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="el-note">No voices found on this account. Add one in VoiceLab at elevenlabs.io, or paste a voice ID below.</div>
          )
        ) : (
          <React.Fragment>
            <div className="el-presets">
              {ELEVEN_PRESETS.map(v => (
                <button
                  key={v.id}
                  className={`el-preset ${cfg.voiceId === v.id ? 'active' : ''}`}
                  onClick={() => update({ voiceId: v.id })}
                  title={v.desc}
                >
                  <span className="el-preset-name">{v.name}</span>
                  <span className="el-preset-desc">{v.desc}</span>
                </button>
              ))}
            </div>
            <div className="el-note">These are library voices — free accounts must tap “load my voices” above and pick one you own instead.</div>
          </React.Fragment>
        )}

        <input
          className="el-input el-input-mono"
          type="text"
          value={cfg.voiceId && cfg.voiceId.startsWith('sk_') ? '' : cfg.voiceId}
          placeholder="or paste a custom voice ID"
          onChange={(e) => {
            const v = e.target.value.trim();
            if (v.startsWith('sk_')) {
              update({ apiKey: v });
              setStatus('error');
              setStatusMsg('That looks like an API key — moved it to the API key field above.');
            } else {
              update({ voiceId: v });
            }
          }}
          spellCheck={false}
        />
      </div>

      <div className="el-field">
        <label className="el-lab">Model</label>
        <div className="settings-seg">
          {[
            { id: 'eleven_multilingual_v2', label: 'multilingual v2' },
            { id: 'eleven_turbo_v2_5',     label: 'turbo v2.5' },
            { id: 'eleven_flash_v2_5',     label: 'flash' }
          ].map(m => (
            <button key={m.id}
              className={`seg-btn ${cfg.modelId === m.id ? 'active' : ''}`}
              onClick={() => update({ modelId: m.id })}>{m.label}</button>
          ))}
        </div>
        <div className="el-note">Multilingual v2 sounds best. Turbo is faster and cheaper. Flash is fastest.</div>
      </div>

      <div className="el-actions">
        <button className="el-btn primary" onClick={preview} disabled={!E.isConfigured() || previewing}>
          {previewing ? 'Playing…' : 'Preview voice'}
        </button>
        <button className="el-btn" onClick={clearCache}>Clear audio cache</button>
      </div>

      {status && (
        <div className={`el-status el-status-${status}`}>
          {status === 'testing' ? 'Testing…' : statusMsg}
        </div>
      )}
    </div>
  );
}

// ---------- Script / export preview sheet (generic) ----------
function ScriptSheet({ eyebrow, title, subtitle, content, filename, hint, onClose }) {
  const [copied, setCopied] = useState(false);
  const taRef = React.useRef(null);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else if (taRef.current) {
        taRef.current.select();
        document.execCommand('copy');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      if (taRef.current) taRef.current.select();
    }
  };
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="script-sheet" onClick={(e) => { if (e.target.classList.contains('script-sheet')) onClose(); }}>
      <div className="script-card">
        <div className="script-head">
          <div>
            <div className="script-eyebrow">{eyebrow}</div>
            <div className="script-title">{title}</div>
            <div className="script-stats">{subtitle}</div>
          </div>
          <button className="settings-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <textarea ref={taRef} className="script-body" value={content} readOnly spellCheck={false} />
        <div className="script-foot">
          <button className="script-btn primary" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button className="script-btn" onClick={handleDownload}>Download .txt</button>
        </div>
        <div className="script-hint">{hint}</div>
      </div>
    </div>
  );
}

// Build the props for whichever export the user opened.
function buildExport(kind, day) {
  if (kind === 'kling') {
    const content = window.YogaKling.generateKling(day);
    const stats = window.YogaKling.klingStats(content, day);
    return {
      eyebrow: 'KLING 3.0 · AI VIDEO SHOT LIST',
      title: `Day ${day.n} · ${day.focus}`,
      subtitle: `${stats.clips} clips · ~${stats.minutes} min finished video`,
      content,
      filename: `kling-day-${day.n}-${day.focus.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`,
      hint: 'Lock the CHARACTER in Kling Elements first so the instructor is identical in every clip, then generate each clip and stitch in CapCut/DaVinci with the Day’s voice-over.'
    };
  }
  // voice-over (default)
  const content = window.YogaScript.generateScript(day);
  const stats = window.YogaScript.scriptStats(content);
  const map = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10,
                eleven:11, twelve:12, thirteen:13, fourteen:14, fifteen:15, sixteen:16, seventeen:17,
                eighteen:18, nineteen:19, twenty:20, thirty:30, forty:40, fifty:50, sixty:60,
                seventy:70, eighty:80, ninety:90 };
  const holdSec = (content.match(/\[(hold|pause) ([a-z\-]+) seconds?\]/g) || []).reduce((sum, m) => {
    const w = m.match(/\[(?:hold|pause) ([a-z\-]+)/)[1];
    if (map[w]) return sum + map[w];
    const parts = w.split('-');
    if (parts.length === 2 && map[parts[0]] && map[parts[1]]) return sum + map[parts[0]] + map[parts[1]];
    return sum;
  }, 0);
  const totalMin = Math.round((Math.round(stats.words / 150 * 60) + holdSec) / 60);
  return {
    eyebrow: 'VOICE-OVER SCRIPT',
    title: `Day ${day.n} · ${day.focus}`,
    subtitle: `${stats.words} words · about ${totalMin} min narration`,
    content,
    filename: `yoga-day-${day.n}-${day.focus.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`,
    hint: 'Paste into Synthesia / HeyGen / Hedra. The [hold X seconds] markers tell the AI presenter to pause silently while you hold the pose.'
  };
}

window.YogaApp = YogaApp;
