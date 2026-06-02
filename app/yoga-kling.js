// yoga-kling.js — Kling 3.0 shot list generator
// Exports: window.YogaKling = { generateKling(day), klingStats(content, day) }

(function () {
  'use strict';

  // Camera movement vocabulary
  const CAM = {
    overhead: 'overhead top-down',
    wideStatic: 'wide static establishing',
    pushIn: 'slow push-in',
    pullBack: 'slow pull-back',
    lowAngle: 'low-angle hero',
    closeBreath: 'extreme close-up chest breathing',
    closeFace: 'close-up face — eyes closed',
    closeFeet: 'close-up feet and floor contact',
    closeHands: 'close-up hands',
    sideLong: 'long side profile',
    orbiting: '45° orbiting orbit',
    dutchTilt: 'slight dutch tilt — 8°',
    aerialDrift: 'aerial slow drift, 30m altitude',
    rackFocus: 'rack focus foreground to subject',
  };

  // Cinematic look for each pose category
  const LOOK = {
    supine: 'shallow DoF, 85mm equivalent, warm diffused light from 45° above',
    standing: 'wide 35mm, side rim light, studio floor reflection',
    seated: 'medium 50mm, soft window light from left, negative fill right',
    quadruped: '24mm wide, low floor angle, hands and feet in frame',
    side: 'side-profile 85mm, single spotlight, deep shadow',
  };

  // Shot duration buckets
  function shotDuration(pose) {
    const d = pose.d || 60;
    if (d >= 240) return '5–6s';
    if (d >= 120) return '4–5s';
    if (d >= 60) return '3–4s';
    return '2–3s';
  }

  // Build a shot description for a pose slide
  function poseShot(slide, dayObj, shotIndex) {
    const cat = slide.cat || 'supine';
    const look = LOOK[cat] || LOOK.supine;
    const dur = shotDuration(slide);
    const side = slide.sd === 'L' ? ' — left side' : slide.sd === 'R' ? ' — right side' : '';

    // Pick camera move based on shot variety
    const moves = Object.values(CAM);
    const cam = moves[shotIndex % moves.length];

    const lines = [];
    lines.push(`### CLIP ${String(shotIndex).padStart(2, '0')} — ${slide.nm}${side}`);
    lines.push(`Duration: ${dur}`);
    lines.push(`Camera: ${cam}`);
    lines.push(`Lens/Look: ${look}`);
    lines.push(`Pose category: ${cat}`);
    lines.push(`Subject: practitioner in ${slide.nm}, ${cat} position`);

    if (slide.sub) lines.push(`Action note: ${slide.sub}`);

    // Ambient details based on day hue
    const hue = dayObj.hue || 220;
    const ambientDesc = hueToAmbient(hue);
    lines.push(`Ambient: ${ambientDesc}`);

    if (slide.br) {
      lines.push(`Breath FX: subtle rib-cage expansion visible — lateral thoracic rise, 4-4 rhythm`);
    }

    lines.push('');
    return lines.join('\n');
  }

  function hueToAmbient(hue) {
    if (hue >= 200 && hue < 260) return 'cool blue-indigo dawn light, mist on floor, minimal grain';
    if (hue >= 100 && hue < 200) return 'soft sage-green light, morning dew, plant shadows';
    if (hue >= 260 && hue < 320) return 'deep violet hour, candle-warm edges, fog haze';
    if (hue >= 0 && hue < 60) return 'golden hour amber, long shadows, warm dust haze';
    if (hue >= 60 && hue < 100) return 'warm ochre noon light, open sky, hard rim';
    if (hue >= 320) return 'rose-pink sunset, dreamy soft focus, lens flare at edge';
    return 'neutral studio light, subtle texture, timeless';
  }

  // Generate intro/transition/end shots
  function segShot(slide, dayObj, shotIndex) {
    const lines = [];
    lines.push(`### CLIP ${String(shotIndex).padStart(2, '0')} — TRANSITION: ${slide.title || slide.t}`);
    lines.push(`Duration: 2–3s`);
    lines.push(`Camera: ${CAM.aerialDrift}`);
    lines.push(`Lens/Look: ultra-wide 18mm, environment establishing, ${hueToAmbient(dayObj.hue || 220)}`);
    lines.push(`Action: title card fade-in over environment — "${slide.title || ''}" — text in IBM Plex Serif, white`);
    if (slide.sub) lines.push(`Sub: "${slide.sub}"`);
    lines.push('');
    return lines.join('\n');
  }

  function introShot(dayObj, shotIndex) {
    const lines = [];
    lines.push(`### CLIP ${String(shotIndex).padStart(2, '0')} — INTRO: Day ${dayObj.n}`);
    lines.push(`Duration: 8–10s`);
    lines.push(`Camera: ${CAM.aerialDrift} transitioning to ${CAM.pushIn}`);
    lines.push(`Lens/Look: anamorphic 2.39:1, lens flare, ${hueToAmbient(dayObj.hue || 220)}`);
    lines.push(`Action: slow drift over practice space, descend toward lone mat, fade up title`);
    lines.push(`Title card: "Day ${dayObj.n} — ${dayObj.focus}" — IBM Plex Serif Light, fade in at 2s`);
    lines.push('');
    return lines.join('\n');
  }

  function endShot(dayObj, shotIndex) {
    const lines = [];
    lines.push(`### CLIP ${String(shotIndex).padStart(2, '0')} — CLOSING: Day ${dayObj.n}`);
    lines.push(`Duration: 5–6s`);
    lines.push(`Camera: ${CAM.pullBack} then fade to black`);
    lines.push(`Lens/Look: 50mm, soft vignette, ${hueToAmbient(dayObj.hue || 220)}`);
    lines.push(`Action: practitioner at rest in savasana, camera pulls back slowly, fade to black`);
    lines.push(`Title card: "Day ${dayObj.n} complete." — IBM Plex Mono, opacity 0→1→0`);
    lines.push('');
    return lines.join('\n');
  }

  function generateKling(dayObj) {
    if (!dayObj || !Array.isArray(dayObj.slides)) return '';

    const sections = [];
    sections.push(`# KLING 3.0 SHOT LIST`);
    sections.push(`# Day ${dayObj.n} — ${dayObj.day}: ${dayObj.focus}`);
    sections.push(`# Accent hue: ${dayObj.hue} | Ambient: ${hueToAmbient(dayObj.hue)}`);
    sections.push(`# Total duration: ~${dayObj.totalMin} minutes`);
    sections.push('');
    sections.push(`## PRODUCTION NOTES`);
    sections.push(`- Model: Kling 3.0 (5s clips at 24fps)`);
    sections.push(`- Aspect ratio: 9:16 for mobile, 16:9 for export`);
    sections.push(`- Style: cinematic yoga documentary — NOT stock footage aesthetic`);
    sections.push(`- Subject: practitioner of indeterminate gender, natural athletic build, mature adult`);
    sections.push(`- Wardrobe: dark minimal — black or deep navy practice wear`);
    sections.push(`- Space: minimal studio or natural wood floor, single accent wall, no clutter`);
    sections.push(`- Negative prompt: stock photo look, bright gym, neon, crowd, mirror reflections, text overlays`);
    sections.push('');
    sections.push(`---`);
    sections.push('');

    let shotIndex = 1;

    dayObj.slides.forEach((slide) => {
      switch (slide.t) {
        case 'intro':
          sections.push(introShot(dayObj, shotIndex++));
          break;
        case 'prep':
        case 'seg':
          sections.push(segShot(slide, dayObj, shotIndex++));
          break;
        case 'pose':
          sections.push(poseShot(slide, dayObj, shotIndex++));
          break;
        case 'end':
          sections.push(endShot(dayObj, shotIndex++));
          break;
      }
    });

    sections.push(`---`);
    sections.push(`Total clips: ${shotIndex - 1}`);
    sections.push(`Estimated render time at 5s/clip: ~${Math.ceil((shotIndex - 1) * 5 / 60)} min output`);

    return sections.join('\n');
  }

  function klingStats(content, dayObj) {
    if (!content) return { clips: 0, minutes: 0 };

    const clipMatches = content.match(/### CLIP \d+/g) || [];
    const clips = clipMatches.length;

    // Count durations: "5–6s" → use max
    let totalSec = 0;
    const durMatches = content.match(/Duration: (\d+)[–-](\d+)s/g) || [];
    durMatches.forEach(m => {
      const nums = m.match(/\d+/g);
      if (nums && nums.length >= 2) totalSec += parseInt(nums[1], 10);
    });

    return {
      clips,
      minutes: Math.round(totalSec / 60),
      totalSec,
    };
  }

  window.YogaKling = { generateKling, klingStats };

})();
