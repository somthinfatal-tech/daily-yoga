// yoga-data.js — 7-day adaptive yoga program
// Spinal profile: T1-T3 thoracic sensitivity, L1-L2 disc protection, right SI-joint
// Each day ~29-30 min | totalSec = sum of slide .d values

(function () {
  'use strict';

  // ── Shared cue library ──────────────────────────────────────────────────────

  const CUE = {
    // Breath reminders
    breathe: 'Breathe naturally throughout. Let the breath lead the movement.',
    longBreath: 'Take slow, full breaths. Inhale through the nose, exhale through the mouth.',
    ribBreath: 'Direct the breath into the sides of your ribs — lateral thoracic expansion.',
    bellyBreath: 'Soften the belly on the inhale. Let the abdomen rise naturally.',

    // Spine safe-guards
    lumbarNeutral: 'Maintain a neutral lumbar curve — avoid flattening or over-arching the low back.',
    coreHold: 'Gently draw the lower abdomen in and up — just 20% effort. Hold that throughout.',
    noPosteriorTilt: 'Avoid tucking the pelvis or rounding the lumbar spine.',
    thoracicCare: 'Move only within comfortable range in the upper back. Never force thoracic rotation.',
    siCare: 'For right SI-joint comfort, keep the pelvis level and avoid loading the right leg asymmetrically.',
    siSymmetric: 'Keep weight even across both sitting bones to protect the right SI-joint.',

    // Transitions
    rollToSide: 'To come up: roll to your left side, pause, then press to seated with your hands.',
    fromSupine: 'Bend both knees, feet flat. Press into the floor and roll slowly to your left side.',
    toHands: 'Place hands shoulder-width apart, fingers spread. Press evenly through all knuckles.',
    toStanding: 'Roll onto your left side, press to seated, then to standing — avoid leading with the right hip.',
  };

  // ── Day builder helper ──────────────────────────────────────────────────────

  function sumSec(slides) {
    return slides.reduce((s, sl) => s + (sl.d || 0), 0);
  }

  function day(n, dayName, short, focus, hue, slides) {
    const total = sumSec(slides);
    return {
      n, day: dayName, short, focus, hue,
      totalSec: total,
      totalMin: Math.round(total / 60),
      slides,
    };
  }

  // ── Day 1: Breath & Foundation ──────────────────────────────────────────────

  const day1 = day(1, 'Monday', 'Mon', 'Breath & Foundation', 220, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Ground & Arrive', d: 60,
      ins: 'Lie on your back with knees bent, feet flat hip-width apart. Close your eyes. Let the weight of your body settle into the mat. Scan from head to toe — notice where you are holding tension, and simply observe without changing anything yet.' },

    // ── Block 1: Breath Awareness ──
    { t: 'seg', title: 'Block 1 — Breath Awareness', sub: '4-4 diaphragmatic breathing', d: 20 },

    { t: 'pose', nm: 'Supine Diaphragmatic Breath', sub: '4-count inhale, 4-count exhale',
      sd: 'B', cat: 'supine',
      ins: 'Place one hand on your belly, one on your chest. Inhale for 4 counts, feeling the belly rise first. Exhale for 4 counts, belly falls. Keep the chest hand relatively still. This is your home base for today.',
      d: 120, br: true,
      rp: 'Hand on chest, hand on belly. Belly rises on inhale, falls on exhale.',
      w: 'If the low back feels strained, place a folded blanket under your knees.' },

    { t: 'pose', nm: 'Lateral Rib Breathing', sub: 'Thoracic expansion awareness',
      sd: 'B', cat: 'supine',
      ins: 'Wrap both hands around the sides of your lower ribs. Inhale and try to push your hands apart sideways — breathe into the flanks. Exhale and feel the ribs draw back in. This lateral breath supports the thoracic spine gently.',
      d: 90, br: true,
      rp: 'Hands on lower ribs. Breathe sideways — ribs expand laterally.',
      w: 'T1-T3: avoid forcing any upper chest lift. Keep the collarbone soft.' },

    // ── Block 2: Spinal Awakening ──
    { t: 'seg', title: 'Block 2 — Spinal Awakening', sub: 'Gentle neural and fascial warm-up', d: 20 },

    { t: 'pose', nm: 'Supine Knee Rocks', sub: 'Lumbar micro-mobilisation',
      sd: 'B', cat: 'supine',
      ins: 'Knees bent, feet flat. Let both knees fall a few centimetres to the right — only as far as comfortable — then back to centre, then a few centimetres to the left. This is tiny: 3 to 5 cm each way. The pelvis rolls slightly. Move with the breath.',
      d: 90,
      rp: 'Tiny lateral rock of both knees. Feet stay flat on the mat.',
      w: 'Right SI-joint: if you feel discomfort on the right, keep the range even smaller and pause any time.' },

    { t: 'pose', nm: 'Pelvic Clock — Gentle Tilt', sub: 'Lumbar neutral finding',
      sd: 'B', cat: 'supine',
      ins: 'Imagine a clock face on your lower belly. Tilt your pelvis so your tailbone tips toward 12 o\'clock — a tiny posterior tilt. Then tip toward 6 o\'clock — a tiny anterior tilt. Find the midpoint: neutral. That midpoint is home. Repeat 6 times, moving slowly.',
      d: 90,
      rp: 'Micro-tilt posterior and anterior. Find neutral centre.',
      w: 'L1-L2: keep this genuinely small. No more than 1 cm of movement at the low back.' },

    { t: 'pose', nm: 'Supine Neck Release', sub: 'Upper thoracic and cervical decompression',
      sd: 'B', cat: 'supine',
      ins: 'Still on your back, legs extended. Gently nod your chin toward your chest — not a full crunch, just 2 cm. Hold 3 breaths, then release. Repeat 4 times. You are creating gentle traction on the cervical-thoracic junction.',
      d: 90,
      rp: 'Tiny chin nod. 2 cm maximum. Hold 3 breaths then release.',
      w: 'T1-T3: if this creates pins-and-needles in the arms, stop and rest.' },

    // ── Block 3: Lower Body Activation ──
    { t: 'seg', title: 'Block 3 — Lower Body Activation', sub: 'Hips and glutes with neutral spine', d: 20 },

    { t: 'pose', nm: 'Supine Hip Flexor Release', sub: 'Knee to chest, single leg',
      sd: 'L', cat: 'supine',
      ins: 'Bend the left knee toward your chest, clasping behind the thigh — not the shin. Let the right leg extend long on the mat. Hold and breathe into the back of the left hip. After 6 breaths, switch sides.',
      d: 100,
      rp: 'Clasp behind the thigh. Opposite leg extended. Breathe into the hip.',
      w: 'L1-L2: do not pull the knee past a 90° angle. Keep the lumbar spine in neutral — do not flatten it to the mat.' },

    { t: 'pose', nm: 'Supine Hip Flexor Release', sub: 'Knee to chest, single leg',
      sd: 'R', cat: 'supine',
      ins: 'Now left leg extends. Bend the right knee toward your chest, clasping behind the thigh. Keep the pelvis level — the right hip should not hike up. Breathe into the back of the right hip and right SI region. Notice any asymmetry.',
      d: 100,
      rp: 'Right knee to chest. Clasp behind the thigh. Pelvis stays level.',
      w: 'Right SI-joint: avoid pulling the knee across the midline. Keep it in line with the right hip socket.' },

    { t: 'pose', nm: 'Glute Bridge — Static Hold', sub: 'Posterior chain activation',
      sd: 'B', cat: 'supine',
      ins: 'Feet flat, hip-width. Inhale. On the exhale, press the feet down and lift the hips to a straight line from knees to shoulders — do not hyperextend the low back. Squeeze the glutes. Hold for 5 breaths, then lower slowly on an exhale. Repeat twice.',
      d: 150,
      rp: 'Feet hip-width. Lift hips to neutral — not past. Squeeze glutes. 5-breath hold.',
      w: 'L1-L2: stop the lift the moment the lumbar starts to arch. Lower back to mat on exhale, do not drop.' },

    // ── Block 4: Restorative Close ──
    { t: 'seg', title: 'Block 4 — Restorative Close', sub: 'Integration and Savasana', d: 20 },

    { t: 'pose', nm: 'Supported Child\'s Pose', sub: 'Spinal decompression',
      sd: 'B', cat: 'supine',
      ins: 'Roll to your left side and press to seated. Bring your big toes together, knees wide. Walk hands forward and rest the forehead on the mat or a block. Arms long. Breathe into the back of the ribs. This decompresses the entire spine.',
      d: 120,
      rp: 'Big toes together, knees wide. Forehead down. Breathe into the back body.',
      w: 'If the right hip is uncomfortable in this position, place a rolled blanket between the thighs and calves.' },

    { t: 'pose', nm: 'Savasana', sub: 'Full integration',
      sd: 'B', cat: 'supine',
      ins: 'Come down onto your back. Legs extended, feet falling naturally outward. Arms 30 cm from the body, palms up. Close your eyes. Let the mat fully support you. Release any remaining control of the breath. Simply be here for the next few minutes.',
      d: 240, br: false,
      rp: 'Complete stillness. No corrections needed.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 2: Gentle Mobility ──────────────────────────────────────────────────

  const day2 = day(2, 'Tuesday', 'Tue', 'Gentle Mobility', 150, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Settle & Soften', d: 60,
      ins: 'Begin seated in a comfortable cross-legged position or on a chair. Rest your hands on your thighs. Close your eyes and observe the natural rhythm of your breath for 5 cycles. Notice the pause between inhale and exhale — that space is where mobility work begins.' },

    // ── Block 1: Seated Neck & Shoulder ──
    { t: 'seg', title: 'Block 1 — Neck & Shoulder', sub: 'Cervical and T1-T3 decompression', d: 20 },

    { t: 'pose', nm: 'Seated Neck Side Bend', sub: 'Left and right — cervical release',
      sd: 'L', cat: 'seated',
      ins: 'Sit tall. Drop your right ear toward your right shoulder — no forcing, just gravity and breath. Feel the stretch along the left side of the neck. Hold 4 breaths. Press the left hand gently into the left thigh for gentle traction. Then switch sides.',
      d: 100,
      rp: 'Ear toward shoulder. Opposite hand presses into thigh. 4 breaths each side.',
      w: 'T1-T3: if you feel tingling or numbness in the arm, return to neutral and do a smaller range.' },

    { t: 'pose', nm: 'Seated Neck Side Bend', sub: 'Right side',
      sd: 'R', cat: 'seated',
      ins: 'Drop the left ear toward the left shoulder. Hold 4 breaths. The right hand presses gently into the right thigh. Feel the lengthening through the right cervical-thoracic region. Come back slowly to neutral.',
      d: 100,
      rp: 'Left ear toward left shoulder. Right hand on thigh. 4 breaths.',
      w: 'T1-T3: keep the upper body still — only the head moves.' },

    { t: 'pose', nm: 'Shoulder Circles', sub: 'Thoracic mobilisation via shoulder girdle',
      sd: 'B', cat: 'seated',
      ins: 'Hands on shoulders, elbows pointing forward. Draw large slow circles with the elbows — forward, up, back, down. The movement happens in the thoracic spine and shoulder girdle, not the neck. 6 circles forward, then 6 backward. Breathe throughout.',
      d: 120,
      rp: 'Hands on shoulders. Large elbow circles. 6 each direction.',
      w: 'T1-T3: if circles cause pain at T1-T3, make them smaller — move only what is comfortable.' },

    // ── Block 2: Thoracic Rotation ──
    { t: 'seg', title: 'Block 2 — Thoracic Rotation', sub: 'Upper spine mobility, protected range', d: 20 },

    { t: 'pose', nm: 'Seated Thoracic Rotation', sub: 'Hands behind head — gentle twist',
      sd: 'L', cat: 'seated',
      ins: 'Lace fingers behind the head. Sit tall and lengthen through the crown. On an exhale, rotate the upper body to the right — lead with the elbow, not the head. Rotate only as far as comfortable at the T1-T3 level. Return to centre on an inhale. 5 repetitions each side.',
      d: 100,
      rp: 'Hands laced behind head. Rotate torso only. 5 reps each side.',
      w: 'T1-T3: stop well before the edge. No sharp sensations. Range is individual — 20° may be your full range today.' },

    { t: 'pose', nm: 'Seated Thoracic Rotation', sub: 'Right side',
      sd: 'R', cat: 'seated',
      ins: 'From centre, rotate to the left. Keep the hips facing forward and grounded. Feel the rotation at the mid and upper back. If you notice one side is significantly stiffer, note it and work gently within that range — do not force symmetry.',
      d: 100,
      rp: 'Hips grounded. Rotate left. 5 reps.',
      w: 'Asymmetry is normal — honour the body\'s natural variability today.' },

    { t: 'pose', nm: 'Thread the Needle — Quadruped', sub: 'Thoracic rotation with support',
      sd: 'L', cat: 'quadruped',
      ins: 'Come to hands and knees: wrists under shoulders, knees under hips. Maintain a neutral lumbar spine throughout. Thread the right arm under the left arm, lowering the right shoulder and cheek toward the mat. Hold 4 breaths. Press back to neutral.',
      d: 110,
      rp: 'Wrists under shoulders. Thread right arm under. Right cheek toward mat. 4 breaths.',
      w: 'L1-L2: do not let the low back sag or round during this pose. Keep the lumbar neutral throughout.' },

    { t: 'pose', nm: 'Thread the Needle — Quadruped', sub: 'Left arm threads',
      sd: 'R', cat: 'quadruped',
      ins: 'Return to neutral quadruped. Thread the left arm under the right, lowering the left shoulder and cheek toward the mat. Hold 4 breaths. Notice whether the right shoulder or thoracic region feels tighter. Return to neutral.',
      d: 110,
      rp: 'Thread left arm under right. Left cheek toward mat. 4 breaths.',
      w: 'T1-T3: if one side creates discomfort at the upper thoracic spine, come out and use a smaller range.' },

    // ── Block 3: Hip Mobility ──
    { t: 'seg', title: 'Block 3 — Hip Mobility', sub: 'Pelvis and hip flexor release', d: 20 },

    { t: 'pose', nm: 'Low Lunge — Left Leg Forward', sub: 'Hip flexor and psoas stretch',
      sd: 'L', cat: 'standing',
      ins: 'From hands and knees, step the left foot between the hands. Lower the right knee to the mat (place a folded blanket if needed). Tuck the right toes under. Lengthen through the right hip flexor. Hands on the left thigh. Hold 6 breaths, pressing gently forward on the exhale.',
      d: 120,
      rp: 'Left foot forward. Right knee down. Hips sinking forward and down. 6 breaths.',
      w: 'Right SI-joint: keep the pelvis square — do not let the right hip open out. Engage the right glute gently.' },

    { t: 'pose', nm: 'Low Lunge — Right Leg Forward', sub: 'Right hip flexor release',
      sd: 'R', cat: 'standing',
      ins: 'Step the right foot between the hands. Lower the left knee to the mat. Tuck left toes. Press the right hip forward and down on each exhale. Keep the right hip in line with the right knee — no lateral drift. Hold 6 breaths.',
      d: 120,
      rp: 'Right foot forward. Left knee down. Right hip square. 6 breaths.',
      w: 'Right SI-joint: watch for the right pelvis hiking up or rotating. Keep it level with the left.' },

    { t: 'pose', nm: 'Supine Figure-4 Stretch', sub: 'External hip rotator release',
      sd: 'L', cat: 'supine',
      ins: 'Lie on your back. Cross the left ankle over the right thigh just above the knee. Keep the left foot flexed. Either stay here breathing into the left hip, or draw both legs in gently. Hold 8 breaths.',
      d: 110,
      rp: 'Ankle crossed above knee. Foot flexed. Breathe into outer hip. 8 breaths.',
      w: null },

    { t: 'pose', nm: 'Supine Figure-4 Stretch', sub: 'Right side — SI-joint caution',
      sd: 'R', cat: 'supine',
      ins: 'Cross the right ankle over the left thigh. Keep the right foot flexed strongly — this protects the right SI-joint. If drawing the legs in, stop at 50% effort. Hold 8 breaths. Notice any asymmetry in depth.',
      d: 110,
      rp: 'Right ankle over left thigh. Foot strongly flexed. Gentle draw-in. 8 breaths.',
      w: 'Right SI-joint: if you feel clicking or sharp sensation in the right SI region, stay at a shallower depth or just breathe with the leg still.' },

    // ── Block 4: Close ──
    { t: 'seg', title: 'Block 4 — Integration', sub: 'Settling the nervous system', d: 20 },

    { t: 'pose', nm: 'Legs up the Wall — Modified', sub: 'Venous return and lumbar release',
      sd: 'B', cat: 'supine',
      ins: 'Sit sideways near a wall, then swing both legs up as you lower your back. Keep a small natural curve in the lumbar spine — place a thin folded blanket under the sacrum if needed. Arms rest open at the sides. Hold for 3 minutes. Breathe into the belly.',
      d: 180, br: true,
      rp: 'Legs up wall. Sacrum supported. Belly breathing. 3 minutes.',
      w: 'L1-L2: if the low back presses hard into the floor with this position, place a thin blanket under the sacrum or move a little away from the wall.' },

    { t: 'pose', nm: 'Savasana', sub: 'Complete rest',
      sd: 'B', cat: 'supine',
      ins: 'Lower your legs and extend them on the mat. Let your feet fall open. Arms 30 cm from body, palms up. Surrender the weight of every limb into the earth. Let the practice settle into the body like water soaking into soil. Stay for 3 minutes.',
      d: 180, br: false,
      rp: 'Full body release. No effort. 3 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 3: Core & Stability ─────────────────────────────────────────────────

  const day3 = day(3, 'Wednesday', 'Wed', 'Core & Stability', 280, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Activation Prep', d: 60,
      ins: 'Lie on your back, knees bent, feet flat. Breathe in through the nose for 4 counts, out through the mouth for 6 counts. On each exhale, draw the lower abdomen gently in and up — just 20% of your maximum contraction. This is the core engagement pattern we\'ll use throughout today\'s practice.' },

    // ── Block 1: Transverse Abdominis Activation ──
    { t: 'seg', title: 'Block 1 — Deep Core Activation', sub: 'Transverse abdominis and multifidus', d: 20 },

    { t: 'pose', nm: 'Dead Bug — Arm Only', sub: 'Lumbar stability at L1-L2',
      sd: 'B', cat: 'supine',
      ins: 'Lie on your back, knees bent to 90°, shins parallel to the floor, arms pointing toward the ceiling. Engage the deep core (20%). On an exhale, lower the right arm slowly toward the floor overhead — only as far as the back stays neutral. Inhale to return. Alternate sides. 5 per side.',
      d: 150,
      rp: 'Arms up. Core engaged. Lower one arm only. 5 per side.',
      w: 'L1-L2: the moment the low back arches away from the mat, stop the arm and bring it back. The range is small — this is correct.' },

    { t: 'pose', nm: 'Dead Bug — Leg Extension', sub: 'Advanced lumbar stabilisation',
      sd: 'B', cat: 'supine',
      ins: 'Table-top position (knees over hips, 90°). Core engaged. On exhale, extend the right leg long toward the floor — heel 5 cm above the mat. Inhale to return. Only lower as far as the lumbar stays neutral. 5 per leg.',
      d: 150,
      rp: 'One leg extends, heel hovers. Core stable. 5 per leg.',
      w: 'L1-L2: this is a challenging test. If the back arches even 2 cm off the mat, stop at a higher point. Progress gradually over weeks.' },

    // ── Block 2: Glute and Hip Stabilisers ──
    { t: 'seg', title: 'Block 2 — Glute & Hip Stabilisers', sub: 'SI-joint support musculature', d: 20 },

    { t: 'pose', nm: 'Clamshell', sub: 'Gluteus medius activation — left',
      sd: 'L', cat: 'side',
      ins: 'Lie on your left side. Stack the hips, knees bent to 45°. Keeping the feet together, lift the right knee toward the ceiling like a clamshell opening. Hold 2 seconds at top. Lower with control. Do not let the top hip roll backward. 12 repetitions.',
      d: 100,
      rp: 'Feet together. Knee lifts. Hips stacked. 12 reps.',
      w: 'Right SI-joint: you are working the stabilisers that support the SI. Expect mild glute burning — that is correct.' },

    { t: 'pose', nm: 'Clamshell', sub: 'Left glute — right side lying',
      sd: 'R', cat: 'side',
      ins: 'Roll to your right side. Stack the hips. Lift the left knee. Hold 2 seconds at top, lower with control. Do not rotate the pelvis. 12 repetitions. Note whether the left or right side fatigues faster — that information is useful for future sessions.',
      d: 100,
      rp: 'Right side lying. Left knee lifts. 12 reps.',
      w: null },

    { t: 'pose', nm: 'Glute Bridge with March', sub: 'Single-leg pelvic stability',
      sd: 'B', cat: 'supine',
      ins: 'Bridge up and hold. From the bridge position, slowly lift the right foot 5 cm off the mat — just a hovering lift. Keep the pelvis perfectly level. Lower. Then left foot. The pelvis should not dip to either side. 5 marches per side.',
      d: 140,
      rp: 'Hold bridge. Alternate feet hover 5 cm. Pelvis stays level. 5 per side.',
      w: 'Right SI-joint: if the pelvis drops on the right side when the right leg lifts, reduce the lift further or skip the lift and just hold the bridge with full bilateral load.' },

    // ── Block 3: Quadruped Stability ──
    { t: 'seg', title: 'Block 3 — Quadruped Stability', sub: 'Bird-dog progression', d: 20 },

    { t: 'pose', nm: 'Bird Dog — Right Arm', sub: 'Anti-rotation core stability',
      sd: 'R', cat: 'quadruped',
      ins: 'Hands and knees: wrists under shoulders, knees under hips. Engage the core. On exhale, extend the right arm straight forward — palm faces inward, thumb up. Do not rotate the torso. Hold 3 seconds, return. 8 repetitions.',
      d: 100,
      rp: 'Right arm extends forward. No torso rotation. 3-second hold. 8 reps.',
      w: 'L1-L2: if the low back dips or the pelvis tilts, stop and re-engage the core before continuing.' },

    { t: 'pose', nm: 'Bird Dog — Left Arm', sub: 'Opposite side',
      sd: 'L', cat: 'quadruped',
      ins: 'Left arm extends forward. No rotation. Hold 3 seconds, return with control. 8 repetitions. Notice whether one side creates more lumbar challenge — this reveals stabiliser asymmetries.',
      d: 100,
      rp: 'Left arm extends. Hold 3 seconds. 8 reps.',
      w: null },

    { t: 'pose', nm: 'Bird Dog — Full Contralateral', sub: 'Arm and leg extended',
      sd: 'B', cat: 'quadruped',
      ins: 'Extend the right arm and left leg simultaneously. Keep the spine perfectly level — imagine balancing a glass of water on your low back. Hold 4 seconds. Return with control. Then left arm, right leg. 6 per side. This is a full stabilisation challenge.',
      d: 160,
      rp: 'Opposite arm and leg extend. Spine level. 4-second hold. 6 per side.',
      w: 'L1-L2 and SI-joint: if the pelvis rotates or the low back sags, drop back to single-arm or single-leg variations. Progress is not linear.' },

    // ── Block 4: Active Rest ──
    { t: 'seg', title: 'Block 4 — Active Recovery', sub: 'Gentle counter-stretch', d: 20 },

    { t: 'pose', nm: 'Cat-Cow — Gentle Version', sub: 'Spinal articulation',
      sd: 'B', cat: 'quadruped',
      ins: 'Wrists under shoulders, knees under hips. On inhale: let the belly drop, tailbone lifts slightly — cow. On exhale: round the mid-back toward the ceiling gently — cat. Move only through a comfortable range. T1-T3 region: very small amplitude at the top of the spine. 8 slow cycles.',
      d: 120,
      rp: 'Inhale = belly drops (cow). Exhale = mid-back rounds (cat). 8 cycles.',
      w: 'T1-T3: the upper spine mobility should be minimal. Most of the movement comes from the mid and low thoracic area. Do not force flexion at T1-T3.' },

    { t: 'pose', nm: 'Child\'s Pose — Active Hold', sub: 'Post-core recovery',
      sd: 'B', cat: 'supine',
      ins: 'From quadruped, sit back toward the heels. Knees wide, big toes together. Extend arms forward, palms down. Press into the hands gently to elongate the spine. Breathe into the back ribs. Hold 6 slow breaths.',
      d: 90,
      rp: 'Knees wide. Sit toward heels. Arms long. Breathe into the back. 6 breaths.',
      w: null },

    { t: 'pose', nm: 'Savasana', sub: 'Core integration rest',
      sd: 'B', cat: 'supine',
      ins: 'Roll to your left side and press to supine. Extend the legs. Let the arms rest open. Allow the deep core to fully release — no holding, no effort. The body integrates the neuromuscular work during rest. Stay 3 to 4 minutes.',
      d: 220, br: false,
      rp: 'Complete release. Let the core soften. 3-4 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 4: Hip & Pelvis ─────────────────────────────────────────────────────

  const day4 = day(4, 'Thursday', 'Thu', 'Hip & Pelvis', 30, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Pelvis Check-in', d: 60,
      ins: 'Lie on your back, knees bent, feet flat. Place both hands on the pelvis — fingers pointing down, heels of the hands on the hip bones. Notice whether the pelvis feels level or whether one side feels higher or more forward. No corrections yet — just observe. Take 5 full breaths.' },

    // ── Block 1: Psoas and Hip Flexor ──
    { t: 'seg', title: 'Block 1 — Psoas & Hip Flexors', sub: 'Long lines of the anterior hip', d: 20 },

    { t: 'pose', nm: 'Supine Psoas Release', sub: 'Left leg long, right knee bent',
      sd: 'L', cat: 'supine',
      ins: 'Lie on your back. Extend the left leg long. Bend the right knee, foot flat. Place a rolled blanket or block under the left thigh. The weight of the left thigh pressing into the support creates a gentle psoas release over 4 to 5 minutes. Breathe naturally.',
      d: 140,
      rp: 'Left leg long with support under thigh. Right knee bent. Passive hold. Breathe.',
      w: 'L1-L2: if you feel the low back arching away from the mat with the leg extended, place the blanket support slightly higher under the thigh.' },

    { t: 'pose', nm: 'Supine Psoas Release', sub: 'Right leg long — SI caution',
      sd: 'R', cat: 'supine',
      ins: 'Switch: left knee bent, right leg extended with support under the right thigh. Notice whether the right psoas release creates any sensation at the right SI-joint. If it does, it is normal — that region is benefiting from the release. Stay 4 minutes.',
      d: 140,
      rp: 'Right leg long on support. Left knee bent. Passive psoas release. 4 minutes.',
      w: 'Right SI-joint: a gentle ache or warmth in the right SI region is expected and appropriate. Sharp pain means stop.' },

    // ── Block 2: Hip External Rotators ──
    { t: 'seg', title: 'Block 2 — External Hip Rotators', sub: 'Piriformis and deep rotators', d: 20 },

    { t: 'pose', nm: 'Reclined Pigeon — Left', sub: 'Figure-4 deep rotator release',
      sd: 'L', cat: 'supine',
      ins: 'Cross the left ankle over the right thigh. Flex the left foot. Draw both legs toward the chest, holding behind the right thigh. Feel the stretch in the left outer hip and glute. Hold 10 deep breaths. Soften on each exhale.',
      d: 130,
      rp: 'Left ankle over right thigh. Flex left foot. Draw both legs in. 10 breaths.',
      w: null },

    { t: 'pose', nm: 'Reclined Pigeon — Right', sub: 'Right SI-joint region caution',
      sd: 'R', cat: 'supine',
      ins: 'Cross the right ankle over the left thigh. Strongly flex the right foot to protect the right knee and SI-joint. Draw the left leg in — keep the range at 50% to 70% of maximum. Notice any sensation at the right SI-joint and back off if sharp. 10 breaths.',
      d: 130,
      rp: 'Right ankle over left thigh. Strongly flex right foot. 50-70% depth. 10 breaths.',
      w: 'Right SI-joint: this is your most critical pose today. Strong foot flexion and conservative depth are the two most important cues.' },

    // ── Block 3: Hip Internal Rotation & Adductors ──
    { t: 'seg', title: 'Block 3 — Internal Rotation & Adductors', sub: 'Balance the hip capsule', d: 20 },

    { t: 'pose', nm: 'Windshield Wipers — Supine', sub: 'Hip internal and external rotation',
      sd: 'B', cat: 'supine',
      ins: 'Lie on back, knees bent, feet wide (wider than hip-width). Let both knees fall to the right — internal rotation on the left, external on the right. Then to the left. Keep it slow and controlled, like a windshield wiper. 10 passes each side. Move with the breath.',
      d: 120,
      rp: 'Feet wide. Knees fall side to side. 10 passes.',
      w: 'Right SI-joint: if the knees falling to the left creates discomfort in the right SI, reduce the range or pause.' },

    { t: 'pose', nm: 'Supine Butterfly', sub: 'Adductor and inner groin release',
      sd: 'B', cat: 'supine',
      ins: 'Feet together, knees falling outward. Place your hands on the inner thighs — not pushing down, just the gentle weight of the hands. Hold 8 breaths. Let gravity do the work. No pressing or forcing the knees toward the floor.',
      d: 120,
      rp: 'Soles together. Knees drop. Hand weight only — no pressing. 8 breaths.',
      w: 'Right SI-joint: if the right inner thigh or SI area aches, place a folded blanket under the right knee for support.' },

    // ── Block 4: Hip Flexion Strength ──
    { t: 'seg', title: 'Block 4 — Functional Hip Strength', sub: 'Standing balance and glute activation', d: 20 },

    { t: 'pose', nm: 'Standing Hip Hinge', sub: 'Posterior chain loading',
      sd: 'B', cat: 'standing',
      ins: 'Stand with feet hip-width. Soft bend in the knees. Hinge at the hips — push the hips back as the chest lowers toward 45°. Keep the spine in neutral — no rounding. Drive the hips forward to return. Think of closing a car door with the hips. 10 slow reps.',
      d: 120,
      rp: 'Hinge at hips. Chest to 45°. Spine neutral. Drive hips forward to return. 10 reps.',
      w: 'L1-L2: do not go below 45° hinge angle today. The lumbar discs are loaded in full flexion under load — stay shallow.' },

    { t: 'pose', nm: 'Standing Tree — Left Leg', sub: 'Hip stabilisation, balance challenge',
      sd: 'L', cat: 'standing',
      ins: 'Stand on the left leg. Place the right foot on the inner left calf (not the knee). Find a focal point ahead. Engage the left glute gently. Hands at heart centre or out to the sides. Hold 8 breaths.',
      d: 100,
      rp: 'Right foot on left calf. Left glute engaged. Steady gaze. 8 breaths.',
      w: null },

    { t: 'pose', nm: 'Standing Tree — Right Leg', sub: 'Right SI-joint load awareness',
      sd: 'R', cat: 'standing',
      ins: 'Stand on the right leg. Left foot on the inner right calf. Engage the right glute. Notice if the right SI region feels challenged — this is load-testing. If you feel instability or pain, hold the wall instead. Hold 8 breaths.',
      d: 100,
      rp: 'Left foot on right calf. Right glute engaged. Hold 8 breaths or use wall for support.',
      w: 'Right SI-joint: single-leg stance on the right directly loads the right SI. This is therapeutic if comfortable, but use support if not.' },

    // ── Block 5: Cool Down ──
    { t: 'seg', title: 'Block 5 — Restore', sub: 'Hip and pelvis integration', d: 20 },

    { t: 'pose', nm: 'Supine Pelvic Rest', sub: 'Posterior chain release',
      sd: 'B', cat: 'supine',
      ins: 'Lie on your back, legs extended. Place a rolled blanket under the knees. Let the entire pelvis and lumbar region sink into the mat. One hand on the belly, one on the chest. Breathe and let go of all pelvic holding. 3 minutes.',
      d: 180, br: true,
      rp: 'Legs extended over blanket support. Pelvis fully released. 3 minutes.',
      w: null },

    { t: 'pose', nm: 'Savasana', sub: 'Hip and pelvis integration',
      sd: 'B', cat: 'supine',
      ins: 'Remove the blanket support. Let the legs extend naturally. Full body savasana — 3 minutes. The hips and pelvis have worked today. Allow that tissue to settle and integrate.',
      d: 180, br: false,
      rp: 'Complete rest. 3 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 5: Thoracic Opening ─────────────────────────────────────────────────

  const day5 = day(5, 'Friday', 'Fri', 'Thoracic Opening', 180, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Upper Body Scan', d: 60,
      ins: 'Sit comfortably. Bring awareness to the space between your shoulder blades, then up to the base of your neck. On the inhale, imagine the ribcage expanding 360 degrees — front, sides, and the back. On the exhale, let it soften. 5 cycles. Today we work gently in the T1-T3 zone.' },

    // ── Block 1: Thoracic Mobilisation ──
    { t: 'seg', title: 'Block 1 — Thoracic Mobilisation', sub: 'T1-T3 gentle range, foam roller optional', d: 20 },

    { t: 'pose', nm: 'Foam Roller Thoracic Extension', sub: 'T4-T8 extension — NOT T1-T3',
      sd: 'B', cat: 'supine',
      ins: 'Place a foam roller perpendicular to the spine at T4 to T5 level (below T1-T3). Support the head with hands laced behind. On an exhale, allow a gentle extension over the roller. Hold 3 breaths. Slide the roller ONE segment down. Repeat down to T8. DO NOT roll above T3.',
      d: 180,
      rp: 'Roller at T4-T8 only. Support the head. 3 breaths per segment. Move down only.',
      w: 'T1-T3: the roller must stay below T3. If you feel the sensitive T1-T3 area engaging, you have gone too high — move down.' },

    { t: 'pose', nm: 'Seated Thoracic Extension', sub: 'Chair-back support — T4-T8',
      sd: 'B', cat: 'seated',
      ins: 'Sit facing forward on a chair (no roller available alternative). Place a rolled towel across the upper-mid back at T4-T5. Lean back gently over the towel. Hands laced behind the head. Look at the ceiling. 4 breaths. Re-position the towel one notch lower and repeat.',
      d: 120,
      rp: 'Rolled towel at T4-T5. Lean back. 4 breaths per position.',
      w: 'T1-T3: same rule — stay below T3. This is an alternative if no roller is available.' },

    // ── Block 2: Shoulder and Pectoral Opening ──
    { t: 'seg', title: 'Block 2 — Shoulder & Pectoral Opening', sub: 'Counter-posture for forward head', d: 20 },

    { t: 'pose', nm: 'Doorway Chest Stretch', sub: 'Right chest opening',
      sd: 'R', cat: 'standing',
      ins: 'Stand in a doorway. Place the right forearm on the door frame at 90°. Step forward gently with the right foot until you feel a stretch across the right chest and front of the shoulder. Hold 6 breaths. Keep the neck long and ears over shoulders.',
      d: 100,
      rp: 'Forearm on frame at 90°. Step forward. Chest opens. 6 breaths.',
      w: 'T1-T3: if you feel sensation at T1-T3 during this stretch, reduce the forward step.' },

    { t: 'pose', nm: 'Doorway Chest Stretch', sub: 'Left chest opening',
      sd: 'L', cat: 'standing',
      ins: 'Left forearm on the door frame at 90°. Step forward with the left foot. Open across the left chest and shoulder. 6 breaths. Notice asymmetry between left and right — this reveals habitual posture patterns.',
      d: 100,
      rp: 'Left forearm on frame. Step forward. 6 breaths.',
      w: null },

    { t: 'pose', nm: 'Eagle Arms — Seated', sub: 'Rhomboid and posterior shoulder release',
      sd: 'B', cat: 'seated',
      ins: 'Cross the right arm under the left at the elbows. Try to bring palms together or backs of hands together. Lift the elbows to shoulder height. Feel the space between the shoulder blades spread. Hold 5 breaths. Then cross left under right. This is the counter-pose to chest opening.',
      d: 120,
      rp: 'Elbow cross. Lift to shoulder height. Feel shoulder blades spread. 5 breaths each.',
      w: 'T1-T3: if the cross-arm position creates discomfort at T1-T3, stay with the arms just crossed at the wrists without the full bind.' },

    // ── Block 3: Prone Thoracic Strengthening ──
    { t: 'seg', title: 'Block 3 — Thoracic Extensor Strengthening', sub: 'Prone back extension', d: 20 },

    { t: 'pose', nm: 'Prone Cobra — Low', sub: 'Erector spinae and rhomboid activation',
      sd: 'B', cat: 'supine',
      ins: 'Lie face down. Arms alongside the body, palms down. On an exhale, gently lift the head and chest 5 to 8 cm off the mat — leading with the sternum, not the chin. Squeeze the shoulder blades gently. Hold 3 breaths. Lower with control. 6 reps.',
      d: 140,
      rp: 'Face down. Arms alongside body. Chest lifts 5-8 cm. Squeeze shoulder blades. 6 reps.',
      w: 'T1-T3: if the lift causes pain at T1-T3, reduce to 3 cm or simply hover — any activation is therapeutic.' },

    { t: 'pose', nm: 'Prone Y-Raise', sub: 'Lower trapezius and thoracic stability',
      sd: 'B', cat: 'supine',
      ins: 'Face down. Arms in a Y shape above the head, thumbs up. Engage the shoulder blades. On exhale, lift both arms 3 to 5 cm off the mat — do not use momentum. Hold 2 seconds. Lower. 8 reps. This activates the lower trapezius, an often-underactive stabiliser of T1-T3.',
      d: 120,
      rp: 'Arms in Y. Thumbs up. Arms lift 3-5 cm. 2-second hold. 8 reps.',
      w: 'T1-T3: if you feel compression at T1-T3 during the lift, place a thin towel under the upper chest for support.' },

    // ── Block 4: Lateral and Rotation Work ──
    { t: 'seg', title: 'Block 4 — Lateral Stretch & Integration', sub: 'Side body and counter-rotation', d: 20 },

    { t: 'pose', nm: 'Seated Side Bend — Left', sub: 'Lateral thoracic and rib release',
      sd: 'L', cat: 'seated',
      ins: 'Sit tall. Extend the left arm overhead. Side-bend to the right — leading with the left arm reaching long. Feel the left side ribs and lateral thoracic spine lengthen. Hold 5 breaths. Come back slowly to centre.',
      d: 90,
      rp: 'Left arm overhead. Side-bend right. Left side lengthens. 5 breaths.',
      w: null },

    { t: 'pose', nm: 'Seated Side Bend — Right', sub: 'Right lateral thoracic release',
      sd: 'R', cat: 'seated',
      ins: 'Right arm overhead. Side-bend to the left. Feel the right lateral ribs and right thoracic region lengthen. Hold 5 breaths. Return slowly.',
      d: 90,
      rp: 'Right arm overhead. Side-bend left. Right side lengthens. 5 breaths.',
      w: null },

    { t: 'pose', nm: 'Supported Backbend over Bolster', sub: 'Passive thoracic opening',
      sd: 'B', cat: 'supine',
      ins: 'Lie over a rolled blanket or bolster placed horizontally at T4-T6. Legs extended. Arms open to the sides at shoulder height, palms up. Relax completely — no active effort. Let gravity gently open the thoracic spine over the support. Hold 3 to 4 minutes. Breathe naturally.',
      d: 220, br: true,
      rp: 'Bolster at T4-T6. Arms open. Passive opening. 3-4 minutes.',
      w: 'T1-T3: if the bolster feels too intense at T1-T3, move it lower to T6-T7.' },

    { t: 'pose', nm: 'Savasana', sub: 'Thoracic integration',
      sd: 'B', cat: 'supine',
      ins: 'Remove the bolster. Lie flat. Notice how the thoracic spine now contacts the mat — there may be more contact points, more openness. Rest here for 3 minutes, letting the new range integrate into the resting pattern.',
      d: 180, br: false,
      rp: 'Flat. Thoracic resting on mat. Observe the new contact. 3 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 6: Balance & Flow ───────────────────────────────────────────────────

  const day6 = day(6, 'Saturday', 'Sat', 'Balance & Flow', 60, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Grounded Presence', d: 60,
      ins: 'Stand in mountain pose — feet hip-width, arms at sides. Close your eyes. Feel the four corners of your feet on the ground: inner heel, outer heel, ball of big toe, ball of little toe. Distribute the weight evenly. Take 5 breaths here. Today we move through sequences with awareness and steady breath.' },

    // ── Block 1: Standing Foundation ──
    { t: 'seg', title: 'Block 1 — Standing Foundation', sub: 'Balance and proprioception', d: 20 },

    { t: 'pose', nm: 'Mountain Pose with Breath', sub: 'Spinal stack and grounding',
      sd: 'B', cat: 'standing',
      ins: 'Feel the ground under your feet. Engage the legs lightly — not gripping. Stack the pelvis, ribcage, and skull. Chin level. Arms alongside the body. On each inhale, grow taller through the crown. On each exhale, root deeper through the feet. 8 breaths.',
      d: 80,
      rp: 'Four corners of feet grounded. Tall spine. Breathe into length. 8 breaths.',
      w: null },

    { t: 'pose', nm: 'Standing Balance — Left Leg', sub: 'Single-leg proprioception',
      sd: 'L', cat: 'standing',
      ins: 'Shift weight to the left foot. Lift the right foot just 2 cm off the floor. Gaze at a point ahead. Left knee softly bent. Hold for 10 breaths. Progress: if stable, close the eyes for 3 breaths. Then open. Lower the right foot.',
      d: 100,
      rp: 'Weight on left foot. Right foot 2 cm above floor. 10 breaths. Eyes closed: 3 breaths.',
      w: 'Use a wall nearby if needed — touching it lightly counts as using support, not a failure.' },

    { t: 'pose', nm: 'Standing Balance — Right Leg', sub: 'Right SI-joint load assessment',
      sd: 'R', cat: 'standing',
      ins: 'Shift weight to the right foot. Lift the left foot 2 cm off the floor. Notice whether the right side feels less stable than the left — this is the SI-joint and glute medius pattern. 10 breaths. Eyes closed 3 breaths if stable. Lower with control.',
      d: 100,
      rp: 'Weight on right foot. Left foot 2 cm above floor. 10 breaths.',
      w: 'Right SI-joint: single-leg stance on the right is a valid therapeutic assessment. Use the wall freely if needed.' },

    // ── Block 2: Gentle Flow Sequence ──
    { t: 'seg', title: 'Block 2 — Gentle Flow', sub: 'Breath-linked movement', d: 20 },

    { t: 'pose', nm: 'Sun Salutation A — Modified', sub: 'Low-impact version, 3 rounds',
      sd: 'B', cat: 'standing',
      ins: 'Modified sequence: Mountain → Arms overhead (inhale) → Forward fold with soft knees (exhale) → Half-lift (inhale) → Step back to low plank on knees (exhale) → Low cobra (inhale) → Child\'s pose (exhale) → Walk feet to hands → Mountain (inhale). Each movement links to one breath. 3 slow rounds.',
      d: 210,
      rp: '3 rounds. One breath per movement. Soft knees. Low cobra only.',
      w: 'L1-L2: use a very low cobra — chest lifts only 5-8 cm. T1-T3: cobra is safe here as we are not going into full extension.' },

    { t: 'pose', nm: 'Warrior II — Left Side', sub: 'Hip strength and stability',
      sd: 'L', cat: 'standing',
      ins: 'Step the left foot forward, right foot turns 90°. Front knee tracks over the front ankle. Arms extend parallel to the floor. Gaze over the left hand. Hold 5 breaths. Keep the pelvis facing the long side of the mat — level and neutral.',
      d: 100,
      rp: 'Left knee over ankle. Arms wide. Gaze over left hand. Pelvis level. 5 breaths.',
      w: null },

    { t: 'pose', nm: 'Warrior II — Right Side', sub: 'Right SI monitoring',
      sd: 'R', cat: 'standing',
      ins: 'Right foot forward, left foot 90°. Front knee tracks over the ankle. Arms wide. Gaze over the right hand. Hold 5 breaths. Notice whether the right side feels asymmetrically loaded — especially in the right hip and SI region.',
      d: 100,
      rp: 'Right knee over right ankle. Arms wide. Pelvis level. 5 breaths.',
      w: 'Right SI-joint: if the right hip feels unstable or painful in Warrior II right side, shorten the stance width.' },

    // ── Block 3: Floor Flow ──
    { t: 'seg', title: 'Block 3 — Floor Flow', sub: 'Grounded sequence', d: 20 },

    { t: 'pose', nm: 'Seated Forward Fold — Gentle', sub: 'Hamstring and lumbar lengthening',
      sd: 'B', cat: 'seated',
      ins: 'Sit with legs extended. Flex the feet. On an exhale, hinge at the hips — not the lumbar spine — and lean forward. Hands rest on the thighs, shins, or feet. Back stays as long as possible — a slight curve in the low back is natural. Hold 6 breaths.',
      d: 110,
      rp: 'Hinge at hips. Long spine. Hold whatever is comfortable — thighs, shins, or feet. 6 breaths.',
      w: 'L1-L2: avoid a full lumbar rounding. Place a folded blanket under the sitting bones if needed to help the pelvis tilt forward.' },

    { t: 'pose', nm: 'Seated Spinal Twist — Left', sub: 'Thoracic rotation with lumbar support',
      sd: 'L', cat: 'seated',
      ins: 'Sit tall, legs extended. Bend the right knee, place the right foot outside the left thigh. Twist to the right: left elbow against the right knee, right hand behind you. Rotate from the thoracic spine — NOT the lumbar. Gaze behind the right shoulder. 5 breaths.',
      d: 100,
      rp: 'Right knee bent and crossed. Twist right from the thoracic spine. 5 breaths.',
      w: 'L1-L2: the lumbar spine should not twist. Only the thoracic region rotates. Imagine the low back staying still while only the upper body turns.' },

    { t: 'pose', nm: 'Seated Spinal Twist — Right', sub: 'Left thoracic rotation',
      sd: 'R', cat: 'seated',
      ins: 'Bend the left knee, foot outside the right thigh. Twist to the left: right elbow to left knee. Gaze behind the left shoulder. Rotate from T4 upward — keep the lumbar neutral. 5 breaths.',
      d: 100,
      rp: 'Left knee bent and crossed. Twist left. Thoracic only. 5 breaths.',
      w: 'T1-T3: keep the rotation gentle at the top of the thoracic spine.' },

    // ── Block 4: Rest ──
    { t: 'seg', title: 'Block 4 — Restorative Close', sub: 'Transition to stillness', d: 20 },

    { t: 'pose', nm: 'Reclined Bound Angle', sub: 'Passive hip and groin opening',
      sd: 'B', cat: 'supine',
      ins: 'Lie on your back. Soles of the feet together, knees falling open. Place a folded blanket under each outer thigh for support. Arms open. Close your eyes. No effort — just surrender into this shape. Hold 3 minutes with deep relaxed breathing.',
      d: 180, br: true,
      rp: 'Soles together. Blankets under knees. Passive opening. 3 minutes.',
      w: 'Right SI-joint: if the right inner thigh aches, add an extra blanket under the right knee.' },

    { t: 'pose', nm: 'Savasana', sub: 'Full integration after flow',
      sd: 'B', cat: 'supine',
      ins: 'Extend the legs. Full body savasana — 3 minutes. After a flowing practice, the nervous system benefits from a longer rest. Let the residue of movement settle into stillness.',
      d: 180, br: false,
      rp: 'Complete rest. 3 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Day 7: Deep Restoration ─────────────────────────────────────────────────

  const day7 = day(7, 'Sunday', 'Sun', 'Deep Restoration', 330, [
    { t: 'intro', d: 8 },

    { t: 'prep', title: 'Arrival Ritual', d: 90,
      ins: 'Today is complete rest and restoration. Set up your space with extra props — blankets, cushions, or pillows. Dim the lights if possible. Lie on your back with knees supported. Close your eyes and let the week\'s practice settle. You have moved, stabilised, and opened. Today you simply receive. Take 8 slow breaths before we begin.' },

    // ── Block 1: Long Passive Holds ──
    { t: 'seg', title: 'Block 1 — Long Passive Holds', sub: 'Yin-inspired tissue release, 3-5 min each', d: 20 },

    { t: 'pose', nm: 'Supported Fish Pose', sub: 'Passive thoracic and heart opening',
      sd: 'B', cat: 'supine',
      ins: 'Place a bolster or two rolled blankets lengthwise along your spine — starting at T4, not higher. Let your head rest on a thin pillow. Arms open to 45°. Feel the gentle opening of the chest and thoracic spine. Let go of all effort. Hold 4 minutes.',
      d: 240, br: true,
      rp: 'Bolster along spine from T4. Head supported. Arms open. 4 minutes.',
      w: 'T1-T3: the bolster must start at T4 or lower. If any part feels like it is pressing directly on T1-T3, re-position it lower.' },

    { t: 'pose', nm: 'Reclined Spinal Twist — Left', sub: 'Long hold, thoracic release',
      sd: 'L', cat: 'supine',
      ins: 'Lie on your back. Draw both knees to the chest. Let the knees fall to the right. Right hand rests on the outer left thigh. Left arm extends to the left at shoulder height. Turn your head to the left gently. Hold 4 minutes. Breathe into the left side ribs.',
      d: 240, br: true,
      rp: 'Knees to right. Left arm extends. Head left. 4 minutes.',
      w: 'L1-L2: avoid pressing the knees toward the floor. Let gravity do the work with zero force.' },

    { t: 'pose', nm: 'Reclined Spinal Twist — Right', sub: 'Long hold — SI-joint right',
      sd: 'R', cat: 'supine',
      ins: 'Knees to the left. Left hand rests on the outer right thigh. Right arm extends to the right at shoulder height. Head turns right gently. Hold 4 minutes. The right SI-joint will feel this — breathe into any sensation with acceptance rather than resistance.',
      d: 240, br: true,
      rp: 'Knees to left. Right arm extends. Head right. 4 minutes.',
      w: 'Right SI-joint: if this position creates sharp sensation at the right SI, place a folded blanket between the knees for support or reduce the rotation range.' },

    // ── Block 2: Hip and Pelvis Yin ──
    { t: 'seg', title: 'Block 2 — Hip & Pelvis Yin', sub: 'Long passive hip holds', d: 20 },

    { t: 'pose', nm: 'Dragon Pose — Left', sub: 'Deep hip flexor yin',
      sd: 'L', cat: 'standing',
      ins: 'From kneeling, step the left foot forward into a low lunge. Lower into the lowest comfortable position — elbows to the floor or on blocks. Right knee and shin on the mat. Hold 4 minutes. Breathe into the right hip flexor and left outer hip. The discomfort is the medicine.',
      d: 240, br: true,
      rp: 'Left foot forward. Low lunge. Elbows toward floor. 4 minutes.',
      w: 'L1-L2: if the lumbar rounds in this position, prop elbows higher. The low back should stay in neutral throughout.' },

    { t: 'pose', nm: 'Dragon Pose — Right', sub: 'Right hip flexor yin — SI awareness',
      sd: 'R', cat: 'standing',
      ins: 'Step the right foot forward. Left knee to mat. Lower toward the floor — 4 minutes. The right hip flexor and surrounding fascia release. The right SI region will feel this as related tissue is released. Notice any asymmetry compared to the left side.',
      d: 240, br: true,
      rp: 'Right foot forward. Low lunge. 4 minutes.',
      w: 'Right SI-joint: keep the right knee tracking over the right ankle throughout to protect the SI-joint from rotational stress.' },

    { t: 'pose', nm: 'Sleeping Swan — Left', sub: 'Pigeon yin — deep hip rotator',
      sd: 'L', cat: 'supine',
      ins: 'From downward dog or table-top, bring the left knee to the floor behind the left wrist. Left ankle behind the right wrist. Fold forward, arms extended or stacked under the forehead. Hold 5 minutes. This is the deepest hip opener of the week. Breathe and release.',
      d: 300, br: true,
      rp: 'Left knee behind left wrist. Fold forward. 5 minutes.',
      w: 'L1-L2: if there is strong lumbar sensation, place a blanket under the left hip to elevate it. This reduces the lumbar load significantly.' },

    { t: 'pose', nm: 'Sleeping Swan — Right', sub: 'Right side — SI-joint focus',
      sd: 'R', cat: 'supine',
      ins: 'Right knee behind right wrist. Right ankle behind left wrist. Fold forward. 5 minutes. The right outer hip, piriformis, and fascia around the right SI-joint all benefit from this long hold. The right side may feel tighter or more tender — that is information, not failure.',
      d: 300, br: true,
      rp: 'Right knee behind right wrist. Fold forward. 5 minutes.',
      w: 'Right SI-joint: use a blanket under the right hip if there is any sharp pain at the right SI. The goal is a sustained, tolerable stretch — never sharp.' },

    // ── Block 3: Pranayama and Final Rest ──
    { t: 'seg', title: 'Block 3 — Pranayama & Final Rest', sub: '4-7-8 breath and extended Savasana', d: 20 },

    { t: 'pose', nm: '4-7-8 Pranayama', sub: 'Nervous system down-regulation',
      sd: 'B', cat: 'supine',
      ins: 'Lie on your back or sit comfortably. Place one hand on the belly. Inhale for 4 counts. Hold for 7 counts. Exhale slowly for 8 counts. This pattern activates the parasympathetic nervous system. 8 complete cycles. Let the breath become effortless.',
      d: 270, br: true,
      rp: 'Inhale 4. Hold 7. Exhale 8. 8 complete cycles.',
      w: 'If 7-count hold causes dizziness, reduce to 4-4-6 until comfortable.' },

    { t: 'pose', nm: 'Extended Savasana', sub: 'Complete restoration — 8 minutes',
      sd: 'B', cat: 'supine',
      ins: 'Lie on your back. Legs extended, feet falling open. Arms away from the body, palms facing up. An eye pillow if available. Let the breath return to its natural uncontrolled rhythm. You have practised all 7 days — the body and spine have been tended to with care. Rest completely for 8 minutes. There is nothing left to do.',
      d: 480, br: false,
      rp: 'Nothing. Complete rest. 8 minutes.',
      w: null },

    { t: 'end', d: 0 },
  ]);

  // ── Export ──────────────────────────────────────────────────────────────────

  window.YOGA_PROGRAM = [day1, day2, day3, day4, day5, day6, day7];

})();
