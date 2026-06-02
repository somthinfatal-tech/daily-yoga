// Animated instructor — an articulated, faceless line-art figure that poses,
// breathes, and transitions smoothly between asanas. Forward-kinematics rig.
//
// Angle convention: degrees, 0 = up, 90 = right, 180 = down, 270 = left.
// All poses share the same flat key set so we can lerp between any two.

const { useRef, useEffect, useState } = React;

// Bone lengths (in the 200x200 viewBox)
const SEG = {
  SP: 40,   // pelvis -> chest
  NK: 24,   // chest -> head center
  UA: 23,   // shoulder -> elbow
  FA: 21,   // elbow -> wrist
  TH: 33,   // hip -> knee
  SH: 31,   // knee -> ankle
  headR: 10,
  shoulderHalf: 14,
  hipHalf: 10
};

function pt(parent, angleDeg, len) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: parent.x + len * Math.sin(a), y: parent.y - len * Math.cos(a) };
}
function rot(p, origin, deg) {
  if (!deg) return p;
  const a = (deg * Math.PI) / 180;
  const dx = p.x - origin.x, dy = p.y - origin.y;
  return {
    x: origin.x + dx * Math.cos(a) - dy * Math.sin(a),
    y: origin.y + dx * Math.sin(a) + dy * Math.cos(a)
  };
}

// ---- Pose library. Each is a flat angle set. ----
const BASE = {
  rootX: 100, rootY: 118, rotG: 0,
  spine: 0, neck: 0,
  armLU: 202, armLF: 202, armRU: 158, armRF: 158,
  legLT: 184, legLS: 184, legRT: 176, legRS: 176
};
const mk = (o) => ({ ...BASE, ...o });

const POSES = {
  MOUNTAIN: mk({}),
  STANDING_ARMS: mk({ armLU: 210, armLF: 240, armRU: 150, armRF: 120 }),
  WARRIOR2: mk({
    rootY: 122,
    armRU: 90, armRF: 90, armLU: 270, armLF: 270,
    legRT: 146, legRS: 189, legLT: 216, legLS: 216
  }),
  TREE: mk({
    legLT: 184, legLS: 184,
    legRT: 150, legRS: 72,
    armLU: 208, armLF: 250, armRU: 152, armRF: 110
  }),
  LOWLUNGE: mk({
    rootY: 128, spine: 7, neck: 4,
    legRT: 150, legRS: 192,
    legLT: 213, legLS: 244,
    armLU: 184, armLF: 184, armRU: 176, armRF: 176
  }),
  SEATED: mk({
    rootY: 116, spine: -5, neck: -2,
    armLU: 230, armLF: 285, armRU: 130, armRF: 75,
    legLT: 238, legLS: 298, legRT: 122, legRS: 62
  }),
  QUADRUPED: mk({
    rootX: 80, rootY: 98,
    spine: 92, neck: 92,
    armLU: 178, armLF: 178, armRU: 182, armRF: 182,
    legLT: 178, legLS: 178, legRT: 182, legRS: 182
  }),
  CATCOW: mk({
    rootX: 80, rootY: 102,
    spine: 102, neck: 122,
    armLU: 178, armLF: 178, armRU: 182, armRF: 182,
    legLT: 176, legLS: 176, legRT: 184, legRS: 184
  }),
  BRIDGE: mk({
    rootX: 100, rootY: 100,
    spine: 214, neck: 214,
    armLU: 250, armLF: 250, armRU: 250, armRF: 250,
    legLT: 150, legLS: 206, legRT: 150, legRS: 206
  }),
  SUPINE: mk({
    rootX: 120, rootY: 134,
    spine: 270, neck: 270,
    armLU: 256, armLF: 256, armRU: 284, armRF: 284,
    legLT: 34, legLS: 330, legRT: 28, legRS: 326
  }),
  KNEE_TO_CHEST: mk({
    rootX: 120, rootY: 134,
    spine: 270, neck: 270,
    armLU: 300, armLF: 320, armRU: 284, armRF: 300,
    legLT: 18, legLS: 92, legRT: 286, legRS: 286
  }),
  FIGURE4: mk({
    rootX: 120, rootY: 134,
    spine: 270, neck: 270,
    armLU: 300, armLF: 318, armRU: 280, armRF: 300,
    legLT: 22, legLS: 332, legRT: 350, legRS: 300
  }),
  SIDE: mk({
    rootX: 120, rootY: 132,
    spine: 272, neck: 272,
    armLU: 268, armLF: 300, armRU: 270, armRF: 302,
    legLT: 40, legLS: 340, legRT: 46, legRS: 346
  }),
  SAVASANA: mk({
    rootX: 116, rootY: 136,
    spine: 270, neck: 270,
    armLU: 250, armLF: 250, armRU: 292, armRF: 292,
    legLT: 96, legLS: 96, legRT: 84, legRS: 84
  })
};

// Choose the pose shape for a given data slide.
function poseKeyFor(pose) {
  if (!pose) return 'MOUNTAIN';
  const n = (pose.nm || '').toLowerCase();
  const c = pose.cat || '';
  if (/savasana/.test(n)) return 'SAVASANA';
  if (/figure-4|figure 4/.test(n)) return 'FIGURE4';
  if (/knee-to-chest|knee to chest/.test(n)) return 'KNEE_TO_CHEST';
  if (/bridge/.test(n)) return 'BRIDGE';
  if (/cat-cow|cat cow/.test(n)) return 'CATCOW';
  if (/thread the needle|bird-dog|bird dog|neutral spine|finding neutral/.test(n)) return 'QUADRUPED';
  if (/warrior/.test(n)) return 'WARRIOR2';
  if (/tree/.test(n)) return 'TREE';
  if (/lunge/.test(n)) return 'LOWLUNGE';
  if (/mountain/.test(n)) return 'MOUNTAIN';
  if (/clam|side/.test(n)) return 'SIDE';
  if (/chest opener|shoulder|side bend/.test(n) && c === 'seated') return 'SEATED';
  switch (c) {
    case 'supine': return 'SUPINE';
    case 'standing': return /breath|opener|abduction/.test(n) ? 'STANDING_ARMS' : 'MOUNTAIN';
    case 'seated': return 'SEATED';
    case 'quadruped': return 'QUADRUPED';
    case 'side': return 'SIDE';
    default: return 'SUPINE';
  }
}

const LINEAR_KEYS = ['rootX', 'rootY', 'rotG'];
const ANGLE_KEYS = ['spine', 'neck', 'armLU', 'armLF', 'armRU', 'armRF', 'legLT', 'legLS', 'legRT', 'legRS'];
const ALL_KEYS = [...LINEAR_KEYS, ...ANGLE_KEYS];

function lerp(a, b, f) { return a + (b - a) * f; }
function lerpPt(A, B, f) { return { x: A.x + (B.x - A.x) * f, y: A.y + (B.y - A.y) * f }; }
function lerpAngle(c, t, f) {
  let d = ((t - c + 540) % 360) - 180;
  return c + d * f;
}

function computePoints(a, breath) {
  const root = { x: a.rootX, y: a.rootY };
  const pelvis = root;
  const chest = pt(pelvis, a.spine, SEG.SP * (1 + 0.03 * breath));
  const head = pt(chest, a.neck, SEG.NK);
  const bun = pt(head, a.neck, SEG.headR + 5);
  const shoulderL = pt(chest, a.spine - 90, SEG.shoulderHalf);
  const shoulderR = pt(chest, a.spine + 90, SEG.shoulderHalf);
  const elbowL = pt(shoulderL, a.armLU, SEG.UA);
  const wristL = pt(elbowL, a.armLF, SEG.FA);
  const elbowR = pt(shoulderR, a.armRU, SEG.UA);
  const wristR = pt(elbowR, a.armRF, SEG.FA);
  const hipL = pt(pelvis, a.spine - 90, SEG.hipHalf);
  const hipR = pt(pelvis, a.spine + 90, SEG.hipHalf);
  const kneeL = pt(hipL, a.legLT, SEG.TH);
  const ankleL = pt(kneeL, a.legLS, SEG.SH);
  const kneeR = pt(hipR, a.legRT, SEG.TH);
  const ankleR = pt(kneeR, a.legRS, SEG.SH);

  let all = { pelvis, chest, head, bun, shoulderL, shoulderR, elbowL, wristL, elbowR, wristR, hipL, hipR, kneeL, ankleL, kneeR, ankleR };
  if (a.rotG) {
    for (const k in all) all[k] = rot(all[k], root, a.rotG);
  }
  return all;
}

function InstructorFigure({ pose, accent, paused, breathing, side }) {
  const targetKey = poseKeyFor(pose);
  const cur = useRef({ ...POSES[targetKey] });
  const target = useRef({ ...POSES[targetKey] });
  const [, force] = useState(0);
  const rafRef = useRef();
  const startRef = useRef(null);
  const pausedRef = useRef(paused);
  const settledRef = useRef(false);
  const t0 = useRef(performance.now());

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    target.current = { ...POSES[targetKey] };
  }, [targetKey]);

  useEffect(() => {
    let cancelled = false;
    let last = 0;
    const FPS = 26;                 // throttle: gentle motion doesn't need 60fps
    const minDelta = 1000 / FPS;
    const tick = (now) => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame(tick);
      if (now - last < minDelta) return;
      last = now;

      const c = cur.current, t = target.current;
      let maxd = 0;
      for (const k of LINEAR_KEYS) { const nv = lerp(c[k], t[k], 0.16); maxd = Math.max(maxd, Math.abs(nv - c[k])); c[k] = nv; }
      for (const k of ANGLE_KEYS) { const nv = lerpAngle(c[k], t[k], 0.16); maxd = Math.max(maxd, Math.abs(nv - c[k])); c[k] = nv; }

      // When paused AND the pose has settled, stop re-rendering to save battery.
      if (pausedRef.current && maxd < 0.05) {
        force(n => (n + 1) % 1000000); // one last paint at rest
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        settledRef.current = true;
        return;
      }
      force(n => (n + 1) % 1000000);
    };
    const start = () => {
      if (rafRef.current == null) {
        settledRef.current = false;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    startRef.current = start;
    start();
    return () => { cancelled = true; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Restart the loop whenever the pose changes or playback resumes.
  useEffect(() => {
    if (startRef.current) startRef.current();
  }, [targetKey, paused]);

  // Breathing + idle sway
  const now = performance.now();
  const tsec = (now - t0.current) / 1000;
  const breathPeriod = breathing ? 8 : 11;
  const breath = paused ? 0.5 : (0.5 + 0.5 * Math.sin((tsec / breathPeriod) * Math.PI * 2));
  const sway = paused ? 0 : Math.sin((tsec / 5) * Math.PI * 2) * 0.6;

  const a = { ...cur.current };
  a.rootY += sway;
  const P = computePoints(a, breath);

  const aL = (accent || '#b9a6e8');
  const dim = 'rgba(255,255,255,0.20)';

  // Which side is "active" → brighter. side: 'R'|'L'|'B'|undefined
  const leftActive = side === 'L' || side === 'B' || !side;
  const rightActive = side === 'R' || side === 'B' || !side;

  // Tapered capsule between two joints (rounded ends, variable radius).
  const cap = (A, rA, B, rB) => {
    const dx = B.x - A.x, dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 0.001;
    const ux = dx / len, uy = dy / len;
    const nx = -uy, ny = ux;
    const p1 = { x: A.x + nx * rA, y: A.y + ny * rA };
    const p2 = { x: B.x + nx * rB, y: B.y + ny * rB };
    const p3 = { x: B.x - nx * rB, y: B.y - ny * rB };
    const p4 = { x: A.x - nx * rA, y: A.y - ny * rA };
    return `M${p1.x} ${p1.y} L${p2.x} ${p2.y} A${rB} ${rB} 0 0 1 ${p3.x} ${p3.y} L${p4.x} ${p4.y} A${rA} ${rA} 0 0 1 ${p1.x} ${p1.y} Z`;
  };

  // Smooth torso mass: shoulders → waist → hips, slight curve in at the waist.
  const torsoPath = () => {
    const sL = P.shoulderL, sR = P.shoulderR, hL = P.hipL, hR = P.hipR;
    const waistL = { x: lerpPt(sL, hL, 0.5).x, y: lerpPt(sL, hL, 0.5).y };
    const waistR = { x: lerpPt(sR, hR, 0.5).x, y: lerpPt(sR, hR, 0.5).y };
    // pull waist slightly toward the spine center
    const ctr = { x: (P.chest.x + P.pelvis.x) / 2, y: (P.chest.y + P.pelvis.y) / 2 };
    const wl = { x: lerpPt(waistL, ctr, 0.18).x, y: lerpPt(waistL, ctr, 0.18).y };
    const wr = { x: lerpPt(waistR, ctr, 0.18).x, y: lerpPt(waistR, ctr, 0.18).y };
    return `M${sL.x} ${sL.y} Q${wl.x} ${wl.y} ${hL.x} ${hL.y} `
      + `Q${P.pelvis.x} ${P.pelvis.y} ${hR.x} ${hR.y} `
      + `Q${wr.x} ${wr.y} ${sR.x} ${sR.y} `
      + `Q${P.chest.x} ${P.chest.y} ${sL.x} ${sL.y} Z`;
  };

  const path = (d, active, key) => (
    <path key={key} d={d} fill={active ? 'url(#figBody)' : dim} />
  );

  // hand / foot endpoints (small rounded caps already from capsule)
  return (
    <svg className="instructor-svg" viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="figGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="figBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={aL} stopOpacity="1" />
          <stop offset="100%" stopColor={aL} stopOpacity="0.74" />
        </linearGradient>
        <radialGradient id="figHead" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="38%" stopColor={aL} stopOpacity="1" />
          <stop offset="100%" stopColor={aL} stopOpacity="0.72" />
        </radialGradient>
      </defs>

      {/* soft floor */}
      <ellipse cx="100" cy="173" rx="76" ry="6.5" fill={aL} opacity="0.07" />
      <line x1="24" y1="173" x2="176" y2="173" stroke={aL} strokeWidth="1" opacity="0.13" />

      <g filter="url(#figGlow)" opacity="0.97">
        {/* legs (behind torso) */}
        {path(cap(P.hipL, 6.6, P.kneeL, 5.4), leftActive, 'lLT')}
        {path(cap(P.kneeL, 5.4, P.ankleL, 3.6), leftActive, 'lLS')}
        {path(cap(P.hipR, 6.6, P.kneeR, 5.4), rightActive, 'lRT')}
        {path(cap(P.kneeR, 5.4, P.ankleR, 3.6), rightActive, 'lRS')}
        {/* feet */}
        <circle cx={P.ankleL.x} cy={P.ankleL.y} r="3.7" fill={leftActive ? aL : dim} />
        <circle cx={P.ankleR.x} cy={P.ankleR.y} r="3.7" fill={rightActive ? aL : dim} />

        {/* arms */}
        {path(cap(P.shoulderL, 5.4, P.elbowL, 4.4), leftActive, 'aLU')}
        {path(cap(P.elbowL, 4.4, P.wristL, 3.0), leftActive, 'aLF')}
        {path(cap(P.shoulderR, 5.4, P.elbowR, 4.4), rightActive, 'aRU')}
        {path(cap(P.elbowR, 4.4, P.wristR, 3.0), rightActive, 'aRF')}
        {/* hands */}
        <circle cx={P.wristL.x} cy={P.wristL.y} r="3.2" fill={leftActive ? aL : dim} />
        <circle cx={P.wristR.x} cy={P.wristR.y} r="3.2" fill={rightActive ? aL : dim} />

        {/* joint caps — fill the seams where tapered segments meet */}
        <circle cx={P.elbowL.x} cy={P.elbowL.y} r="4.4" fill={leftActive ? aL : dim} />
        <circle cx={P.elbowR.x} cy={P.elbowR.y} r="4.4" fill={rightActive ? aL : dim} />
        <circle cx={P.kneeL.x} cy={P.kneeL.y} r="5.4" fill={leftActive ? aL : dim} />
        <circle cx={P.kneeR.x} cy={P.kneeR.y} r="5.4" fill={rightActive ? aL : dim} />
        <circle cx={P.shoulderL.x} cy={P.shoulderL.y} r="5.2" fill={leftActive ? aL : dim} />
        <circle cx={P.shoulderR.x} cy={P.shoulderR.y} r="5.2" fill={rightActive ? aL : dim} />
        <circle cx={P.hipL.x} cy={P.hipL.y} r="6.0" fill="url(#figBody)" />
        <circle cx={P.hipR.x} cy={P.hipR.y} r="6.0" fill="url(#figBody)" />

        {/* torso mass */}
        <path d={torsoPath()} fill="url(#figBody)" />
        {/* pelvis + chest rounding to fill any gaps */}
        <path d={cap(P.pelvis, SEG.hipHalf + 1.5, P.chest, SEG.shoulderHalf - 1)} fill="url(#figBody)" />

        {/* neck */}
        <path d={cap(P.chest, 4.2, P.head, 3.4)} fill="url(#figBody)" />
        {/* hair bun + head */}
        <circle cx={P.bun.x} cy={P.bun.y} r={SEG.headR * 0.62} fill={aL} opacity="0.9" />
        <circle cx={P.head.x} cy={P.head.y} r={SEG.headR} fill="url(#figHead)" />
      </g>
    </svg>
  );
}

window.InstructorFigure = InstructorFigure;
window.poseKeyFor = poseKeyFor;

// ---------------------------------------------------------------------------
// BreathAura — calm cinematic centerpiece (pure-CSS breathing, never "broken")
// An expanding/contracting aura of concentric rings + a soft glowing core.
// ---------------------------------------------------------------------------
function BreathAura({ accent, paused, breathing }) {
  return (
    <div className={`breath-aura ${paused ? 'paused' : ''} ${breathing ? 'is-breath' : ''}`} style={{ '--acc': accent }}>
      <div className="ba-ring ba-r1" />
      <div className="ba-ring ba-r2" />
      <div className="ba-ring ba-r3" />
      <div className="ba-glow" />
      <div className="ba-core" />
      {breathing ? (
        <div className="ba-labels">
          <span className="ba-label ba-in">Inhale</span>
          <span className="ba-label ba-out">Exhale</span>
        </div>
      ) : null}
    </div>
  );
}
window.BreathAura = BreathAura;
