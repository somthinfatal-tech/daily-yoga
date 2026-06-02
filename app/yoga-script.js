// yoga-script.js — Voice-over script generator
// Exports: window.YogaScript = { generateScript(day), scriptStats(content) }

(function () {
  'use strict';

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatDuration(sec) {
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }

  function holdMarker(sec) {
    return `[hold ${sec} seconds]`;
  }

  function slideIntro(dayObj) {
    return [
      `# ${dayObj.day.toUpperCase()} — Day ${dayObj.n} of 7`,
      `# Focus: ${dayObj.focus}`,
      `# Duration: ~${dayObj.totalMin} minutes`,
      `# Program: Daily Yoga — Adaptive Practice`,
      ``,
    ].join('\n');
  }

  function scriptForSlide(slide, idx, dayObj) {
    const lines = [];
    const num = String(idx + 1).padStart(2, '0');

    switch (slide.t) {
      case 'intro': {
        lines.push(`## [${num}] INTRO — ${dayObj.day}, Day ${dayObj.n}`);
        lines.push('');
        lines.push(`Welcome to Day ${dayObj.n} of your Daily Yoga practice.`);
        lines.push(`Today's focus is ${dayObj.focus}.`);
        lines.push(`This session is approximately ${dayObj.totalMin} minutes.`);
        lines.push(`Find a quiet space, gather any props you may need, and let's begin.`);
        lines.push('');
        lines.push(holdMarker(slide.d || 8));
        break;
      }

      case 'prep': {
        lines.push(`## [${num}] PREPARATION — ${slide.title || 'Prepare'}`);
        lines.push('');
        if (slide.ins) {
          lines.push(slide.ins);
          lines.push('');
        }
        lines.push(`Take your time to settle in.`);
        lines.push(holdMarker(Math.max(0, (slide.d || 60) - 10)));
        lines.push(`When you're ready, we'll move into the first block.`);
        break;
      }

      case 'seg': {
        lines.push(`## [${num}] TRANSITION — ${slide.title || 'Next Block'}`);
        if (slide.sub) lines.push(`### ${slide.sub}`);
        lines.push('');
        lines.push(`Coming up: ${slide.title}.`);
        if (slide.sub) lines.push(`${slide.sub}.`);
        lines.push(holdMarker(slide.d || 20));
        break;
      }

      case 'pose': {
        const sideLabel = slide.sd === 'L' ? 'Left side' : slide.sd === 'R' ? 'Right side' : '';
        const poseTitle = sideLabel
          ? `${slide.nm} — ${sideLabel}`
          : slide.nm;

        lines.push(`## [${num}] ${poseTitle.toUpperCase()}`);
        if (slide.sub) lines.push(`### ${slide.sub}`);
        lines.push('');

        // Entry instruction
        if (slide.ins) {
          lines.push(slide.ins);
          lines.push('');
        }

        // Reminder cue
        if (slide.rp) {
          lines.push(`Remember: ${slide.rp}`);
          lines.push('');
        }

        // Warning / modification
        if (slide.w) {
          lines.push(`MODIFICATION: ${slide.w}`);
          lines.push('');
        }

        // Breathing prompt
        if (slide.br) {
          lines.push(`Continue with slow, even breaths throughout.`);
          lines.push('');
        }

        // Timed hold
        const holdSec = Math.max(0, (slide.d || 60) - 15);
        lines.push(holdMarker(holdSec));

        // Exit cue
        lines.push('');
        if (slide.sd === 'L' && slide.cat !== 'supine' && slide.cat !== 'seated') {
          lines.push(`When you're ready, release the pose. Prepare to transition to the right side.`);
        } else if (slide.sd === 'R') {
          lines.push(`Gently release. Return to a neutral position.`);
        } else {
          lines.push(`When ready, slowly release and return to neutral.`);
        }
        break;
      }

      case 'end': {
        lines.push(`## [${num}] CLOSING`);
        lines.push('');
        lines.push(`Excellent practice today.`);
        lines.push(`You have completed Day ${dayObj.n} — ${dayObj.focus}.`);
        lines.push(`Take a moment to acknowledge the work you've done for your body.`);
        lines.push(`Rest well, and we'll see you for Day ${dayObj.n < 7 ? dayObj.n + 1 : 1} next time.`);
        break;
      }
    }

    return lines.join('\n');
  }

  function generateScript(dayObj) {
    if (!dayObj || !Array.isArray(dayObj.slides)) return '';

    const sections = [slideIntro(dayObj)];

    dayObj.slides.forEach((slide, idx) => {
      sections.push(scriptForSlide(slide, idx, dayObj));
      sections.push(''); // blank line between sections
    });

    sections.push(`---`);
    sections.push(`End of Day ${dayObj.n} script. Total duration: ~${dayObj.totalMin} minutes.`);

    return sections.join('\n');
  }

  function scriptStats(content) {
    if (!content) return { words: 0, lines: 0, holds: 0, holdSec: 0 };

    const lines = content.split('\n');
    const words = content.replace(/\[hold \d+ seconds\]/g, '').split(/\s+/).filter(Boolean).length;

    const holdMatches = content.match(/\[hold (\d+) seconds\]/g) || [];
    let holdSec = 0;
    holdMatches.forEach(m => {
      const n = parseInt(m.match(/\d+/)[0], 10);
      holdSec += n;
    });

    return {
      words,
      lines: lines.length,
      holds: holdMatches.length,
      holdSec,
      holdMin: Math.round(holdSec / 60),
    };
  }

  window.YogaScript = { generateScript, scriptStats };

})();
