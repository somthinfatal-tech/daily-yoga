// Pose scene — abstract animated cinematic visualization per pose category.
// Built from primitives only (circles, capsules, lines). The "feel" comes from
// motion, blur, gradients — not from depicting yoga poses literally.
const { useRef, useEffect, useState, useMemo } = React;

// Per-category abstract figure. Subtle, breath-synced.
function PoseFigure({ cat, isBreath, accent }) {
  // Build a stylized figure from primitives.
  // Each category gets a distinct silhouette in the same visual vocabulary.
  const a = accent || '#9fd0c4';
  if (cat === 'supine') {
    // Horizontal capsule with a circle (head) — body lying down
    return (
      <g>
        <ellipse cx="60" cy="60" rx="42" ry="9" fill={a} opacity="0.85"/>
        <circle cx="22" cy="60" r="7" fill={a}/>
      </g>
    );
  }
  if (cat === 'standing') {
    return (
      <g>
        <rect x="55" y="18" width="10" height="58" rx="5" fill={a} opacity="0.9"/>
        <circle cx="60" cy="14" r="7" fill={a}/>
      </g>
    );
  }
  if (cat === 'seated') {
    return (
      <g>
        <rect x="55" y="28" width="10" height="34" rx="5" fill={a} opacity="0.9"/>
        <rect x="55" y="58" width="30" height="9" rx="4" fill={a} opacity="0.7"/>
        <circle cx="60" cy="22" r="6.5" fill={a}/>
      </g>
    );
  }
  if (cat === 'quadruped') {
    // Arch shape — table top
    return (
      <g>
        <path d="M28 64 Q60 38 92 64" stroke={a} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.85"/>
        <circle cx="22" cy="66" r="6" fill={a}/>
      </g>
    );
  }
  if (cat === 'side') {
    // Angled capsule
    return (
      <g transform="rotate(-12 60 60)">
        <ellipse cx="60" cy="60" rx="38" ry="9" fill={a} opacity="0.85"/>
        <circle cx="24" cy="60" r="7" fill={a}/>
      </g>
    );
  }
  // default — single orb
  return <circle cx="60" cy="60" r="12" fill={a} opacity="0.9"/>;
}

// Cinematic scene: gradient backdrop, slow rotating glow, breath pulse, abstract figure overlay.
// Gives "AI video" feel without actually being video.
function PoseScene({ pose, accent, hue, playing, paused }) {
  const cat = pose?.cat || 'default';
  const isBreath = !!pose?.br;
  // Drift offsets — random per pose but stable
  const seed = useMemo(() => Math.floor(Math.random() * 1000), [pose?.nm, pose?.sd]);

  return (
    <div className="scene" style={{ '--scene-hue': hue, '--scene-accent': accent }}>
      {/* Layered gradient backdrop */}
      <div className="scene-bg" />
      {/* Rotating ambient orb */}
      <div className={`scene-orb scene-orb-1 ${paused ? 'paused' : ''}`} style={{ animationDelay: `-${seed * 0.1}s` }} />
      <div className={`scene-orb scene-orb-2 ${paused ? 'paused' : ''}`} style={{ animationDelay: `-${seed * 0.07}s` }} />
      <div className={`scene-orb scene-orb-3 ${paused ? 'paused' : ''}`} style={{ animationDelay: `-${seed * 0.13}s` }} />
      {/* Grain overlay */}
      <div className="scene-grain" />
      {/* Center figure */}
      <div className={`scene-figure ${isBreath ? 'breath' : ''} ${paused ? 'paused' : ''}`}>
        <svg viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id={`figGrad-${seed}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.95"/>
              <stop offset="100%" stopColor={accent} stopOpacity="0.5"/>
            </radialGradient>
            <filter id={`fglow-${seed}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4"/>
            </filter>
          </defs>
          <g filter={`url(#fglow-${seed})`}>
            <PoseFigure cat={cat} accent={`url(#figGrad-${seed})`} />
          </g>
          <PoseFigure cat={cat} accent={accent} />
        </svg>
      </div>
      {/* Subtle horizon line */}
      <div className="scene-horizon" />
    </div>
  );
}

window.PoseScene = PoseScene;
