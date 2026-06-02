// sw.js — Daily Yoga service worker
// Strategy: network-first for app shell, cache-first for CDN assets
// ElevenLabs API calls are never cached

const CACHE_APP = 'yoga-app-v2';
const CACHE_CDN = 'yoga-cdn-v2';

const BASE = '/daily-yoga';

const APP_SHELL = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/app/yoga-app.css',
  BASE + '/app/yoga-app.jsx',
  BASE + '/app/yoga-data.js',
  BASE + '/app/elevenlabs.js',
  BASE + '/app/instructor.jsx',
  BASE + '/app/pose-scene.jsx',
  BASE + '/app/yoga-script.js',
  BASE + '/app/yoga-kling.js',
  BASE + '/tweaks-panel.jsx',
  BASE + '/manifest.webmanifest',
];

const CDN_ORIGINS = [
  'unpkg.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
];

const NEVER_CACHE_ORIGINS = [
  'api.elevenlabs.io',
];

function isCDN(url) {
  return CDN_ORIGINS.some(o => url.hostname.includes(o));
}

function isNeverCache(url) {
  return NEVER_CACHE_ORIGINS.some(o => url.hostname.includes(o));
}

function isAppShell(url) {
  return url.origin === self.location.origin;
}

// ── Install: pre-cache app shell ────────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_APP).then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: prune old caches ───────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  const valid = new Set([CACHE_APP, CACHE_CDN]);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter(k => !valid.has(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: route by strategy ─────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept non-GET or ElevenLabs API calls
  if (event.request.method !== 'GET' || isNeverCache(url)) {
    return; // fall through to network
  }

  if (isCDN(url)) {
    // Cache-first for CDN resources (fonts, React, Babel)
    event.respondWith(cacheFirst(event.request, CACHE_CDN));
    return;
  }

  if (isAppShell(url)) {
    // Network-first for same-origin app code
    event.respondWith(networkFirst(event.request, CACHE_APP));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Offline fallback — return cached index.html for navigation requests
    if (request.mode === 'navigate') {
      return cache.match(BASE + '/index.html');
    }
    throw new Error('Network unavailable and no cache for: ' + request.url);
  }
}
