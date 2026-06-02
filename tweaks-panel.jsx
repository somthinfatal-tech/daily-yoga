// tweaks-panel.jsx — Dev tweaks panel
// Exports: window.useTweaks, window.TweaksPanel

(function () {
  'use strict';

  const { useState, useEffect, useCallback, createContext, useContext } = React;

  const STORAGE_KEY = 'yoga_tweaks';

  const DEFAULTS = {
    colorMode: 'mono-cool',
    fontPreset: 'plex',
    timerStyle: 'bar',
    autoAdvance: true,
    showWarnings: true,
    ambientVolume: 'soft',
    voiceSpeed: 'normal',
    showPoseImage: true,
    debugMode: false,
  };

  function loadTweaks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...DEFAULTS };
      return { ...DEFAULTS, ...JSON.parse(stored) };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function saveTweaks(t) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch { /* quota */ }
  }

  // ── Hook ──────────────────────────────────────────────────────────────────

  function useTweaks() {
    const [tweaks, setTweaksState] = useState(loadTweaks);

    const setTweaks = useCallback((update) => {
      setTweaksState(prev => {
        const next = typeof update === 'function' ? update(prev) : { ...prev, ...update };
        saveTweaks(next);
        return next;
      });
    }, []);

    const resetTweaks = useCallback(() => {
      saveTweaks(DEFAULTS);
      setTweaksState({ ...DEFAULTS });
    }, []);

    return [tweaks, setTweaks, resetTweaks];
  }

  // ── Sub-components ────────────────────────────────────────────────────────

  function TweakSection({ title, children }) {
    return React.createElement('div', { className: 'tk-section' },
      React.createElement('div', { className: 'tk-section-title' }, title),
      children
    );
  }

  function TweakRadio({ label, optKey, options, tweaks, setTweaks }) {
    return React.createElement('div', { className: 'tk-row' },
      React.createElement('span', { className: 'tk-label' }, label),
      React.createElement('div', { className: 'tk-radios' },
        options.map(({ value, label: optLabel }) =>
          React.createElement('button', {
            key: value,
            className: `tk-radio ${tweaks[optKey] === value ? 'active' : ''}`,
            onClick: () => setTweaks({ [optKey]: value }),
          }, optLabel)
        )
      )
    );
  }

  function TweakToggle({ label, optKey, tweaks, setTweaks }) {
    return React.createElement('div', { className: 'tk-row' },
      React.createElement('span', { className: 'tk-label' }, label),
      React.createElement('button', {
        className: `tk-toggle ${tweaks[optKey] ? 'on' : 'off'}`,
        onClick: () => setTweaks({ [optKey]: !tweaks[optKey] }),
        'aria-pressed': tweaks[optKey],
      },
        React.createElement('span', { className: 'tk-toggle-knob' })
      )
    );
  }

  // ── Panel ─────────────────────────────────────────────────────────────────

  function TweaksPanel({ tweaks, setTweaks, resetTweaks }) {
    const [open, setOpen] = useState(false);

    // Keyboard shortcut: Alt+T
    useEffect(() => {
      const handler = (e) => {
        if (e.altKey && e.key === 't') setOpen(o => !o);
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, []);

    if (!open) {
      return React.createElement('button', {
        className: 'tk-fab',
        onClick: () => setOpen(true),
        title: 'Tweaks (Alt+T)',
        'aria-label': 'Open tweaks panel',
      }, '⚙');
    }

    return React.createElement('div', { className: 'tk-panel' },
      React.createElement('div', { className: 'tk-header' },
        React.createElement('span', { className: 'tk-title' }, 'Dev Tweaks'),
        React.createElement('button', {
          className: 'tk-close',
          onClick: () => setOpen(false),
          'aria-label': 'Close tweaks panel',
        }, '×')
      ),

      React.createElement(TweakSection, { title: 'Appearance' },
        React.createElement(TweakRadio, {
          label: 'Color mode', optKey: 'colorMode', tweaks, setTweaks,
          options: [
            { value: 'mono-cool',   label: 'Cool' },
            { value: 'mono-warm',   label: 'Warm' },
            { value: 'mono-violet', label: 'Violet' },
            { value: 'mono-sage',   label: 'Sage' },
          ],
        }),
        React.createElement(TweakRadio, {
          label: 'Font', optKey: 'fontPreset', tweaks, setTweaks,
          options: [
            { value: 'plex', label: 'Plex' },
            { value: 'system', label: 'System' },
          ],
        })
      ),

      React.createElement(TweakSection, { title: 'Timer' },
        React.createElement(TweakRadio, {
          label: 'Style', optKey: 'timerStyle', tweaks, setTweaks,
          options: [
            { value: 'bar', label: 'Bar' },
            { value: 'ring', label: 'Ring' },
            { value: 'numbers', label: '00:00' },
          ],
        })
      ),

      React.createElement(TweakSection, { title: 'Audio' },
        React.createElement(TweakRadio, {
          label: 'Ambient', optKey: 'ambientVolume', tweaks, setTweaks,
          options: [
            { value: 'off', label: 'Off' },
            { value: 'soft', label: 'Soft' },
            { value: 'full', label: 'Full' },
          ],
        }),
        React.createElement(TweakRadio, {
          label: 'Voice speed', optKey: 'voiceSpeed', tweaks, setTweaks,
          options: [
            { value: 'slow', label: 'Slow' },
            { value: 'normal', label: 'Normal' },
            { value: 'fast', label: 'Fast' },
          ],
        })
      ),

      React.createElement(TweakSection, { title: 'Behaviour' },
        React.createElement(TweakToggle, {
          label: 'Auto-advance', optKey: 'autoAdvance', tweaks, setTweaks,
        }),
        React.createElement(TweakToggle, {
          label: 'Show warnings', optKey: 'showWarnings', tweaks, setTweaks,
        }),
        React.createElement(TweakToggle, {
          label: 'Show pose image', optKey: 'showPoseImage', tweaks, setTweaks,
        }),
        React.createElement(TweakToggle, {
          label: 'Debug mode', optKey: 'debugMode', tweaks, setTweaks,
        })
      ),

      React.createElement('button', {
        className: 'tk-reset',
        onClick: resetTweaks,
      }, 'Reset to defaults'),

      React.createElement('div', { className: 'tk-hint' }, 'Alt+T to toggle')
    );
  }

  // ── Styles (injected) ─────────────────────────────────────────────────────

  const CSS = `
.tk-fab {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.5);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.tk-fab:hover { opacity: 1; background: rgba(255,255,255,0.14); }

.tk-panel {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  width: 260px;
  background: oklch(0.13 0.006 270);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.8);
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}
.tk-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.tk-title { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.tk-close { background: none; border: none; color: rgba(255,255,255,0.4); font-size: 18px; cursor: pointer; padding: 0 2px; line-height: 1; }
.tk-close:hover { color: rgba(255,255,255,0.8); }

.tk-section { margin-bottom: 12px; }
.tk-section-title { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 8px; }

.tk-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.tk-label { color: rgba(255,255,255,0.6); }

.tk-radios { display: flex; gap: 4px; }
.tk-radio {
  padding: 3px 8px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.12);
  background: none;
  color: rgba(255,255,255,0.4);
  font-family: inherit;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.15s;
}
.tk-radio.active { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.25); }
.tk-radio:hover:not(.active) { color: rgba(255,255,255,0.7); }

.tk-toggle {
  position: relative;
  width: 32px;
  height: 18px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.tk-toggle.on { background: oklch(0.76 0.11 220); }
.tk-toggle.off { background: rgba(255,255,255,0.1); }
.tk-toggle-knob {
  position: absolute;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  transition: left 0.2s;
}
.tk-toggle.on .tk-toggle-knob { left: 16px; }
.tk-toggle.off .tk-toggle-knob { left: 2px; }

.tk-reset {
  width: 100%;
  margin-top: 8px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.1);
  background: none;
  color: rgba(255,255,255,0.35);
  font-family: inherit;
  font-size: 10px;
  cursor: pointer;
}
.tk-reset:hover { color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.05); }
.tk-hint { text-align: center; margin-top: 8px; font-size: 9px; color: rgba(255,255,255,0.2); }
`;

  if (!document.getElementById('tk-styles')) {
    const style = document.createElement('style');
    style.id = 'tk-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ── Export ────────────────────────────────────────────────────────────────
  window.useTweaks = useTweaks;
  window.TweaksPanel = TweaksPanel;
  window.TweakSection = TweakSection;
  window.TweakRadio = TweakRadio;
  window.TweakToggle = TweakToggle;
  window.TWEAK_DEFAULTS = DEFAULTS;

})();
