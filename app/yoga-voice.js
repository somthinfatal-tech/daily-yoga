// yoga-voice.js — Hand-crafted voice-over scripts for every pose and prep slide.
// Keys: "<dayN>-<slide.nm>-<slide.sd||'B'>"   (e.g. "1-Savasana-B", "1-Supine Hip Flexor Release-R")
// Used in yoga-app.jsx: window.YOGA_VOICE[key] || fallback

(function () {
  'use strict';

  const V = {

    // ── DAY 1 · BREATH & FOUNDATION ─────────────────────────────────────────

    '1-prep-1': 'Lie on your back with knees bent, feet flat hip-width apart. Close your eyes and let your body settle into the mat. Scan from head to toe — simply notice where you are holding tension, without trying to change anything yet.',

    '1-Supine Diaphragmatic Breath-B':
      'Place one hand on your belly and one on your chest. As you inhale for four counts, let the belly rise first. Exhale for four counts, belly softens down. Keep the chest hand relatively still. This is your breathing home base for today.',

    '1-Lateral Rib Breathing-B':
      'Wrap both hands around the sides of your lower ribs. On each inhale, breathe sideways — try to push your hands apart. On the exhale, feel the ribs draw back in. Let this lateral breath create space between the thoracic vertebrae.',

    '1-Supine Knee Rocks-B':
      'Feet flat, knees bent. Let both knees drift a few centimetres to the right — only as far as feels comfortable — then back to centre, then a few centimetres to the left. Keep it small and gentle. Move with the breath.',

    '1-Pelvic Clock — Gentle Tilt-B':
      'Imagine a clock face on your lower belly. Tip the tailbone gently toward twelve o\'clock — a small posterior tilt. Then toward six o\'clock — a small anterior tilt. Find the midpoint. That balanced midpoint is neutral. Repeat slowly, six times.',

    '1-Supine Neck Release-B':
      'You can extend the legs long now. Gently nod the chin toward the chest — just two centimetres, not a full lift. Hold for three breaths, feeling a gentle lengthening at the base of the neck. Release, then repeat four times.',

    '1-Supine Hip Flexor Release-L':
      'Left side. Draw your left knee toward your chest and clasp behind the thigh — not the shin. Let the right leg extend long. Breathe into the back of the left hip. After six breaths, you\'ll switch sides.',

    '1-Supine Hip Flexor Release-R':
      'Right side now. Extend the left leg long and draw the right knee toward the chest. Keep the pelvis level — the right hip shouldn\'t hike up. Breathe into the back of the right hip and SI region. Notice any difference from the left side.',

    '1-Glute Bridge — Static Hold-B':
      'Feet flat, hip-width. On your exhale, press the feet down and lift the hips to a straight line from knees to shoulders. No hyperextension in the low back. Squeeze the glutes and breathe here for five counts, then lower slowly. Twice more.',

    '1-Supported Child\'s Pose-B':
      'Roll to your left side and press to seated. Big toes together, knees wide. Walk the hands forward and rest the forehead down. Arms long. Let the back ribs expand with each breath. The whole spine decompresses here.',

    '1-Savasana-B':
      'Come onto your back, legs extended, feet falling naturally open. Arms about thirty centimetres from your sides, palms up. Close your eyes and release all control of the breath. Let the mat hold every part of you. Simply be still.',

    // ── DAY 2 · GENTLE MOBILITY ──────────────────────────────────────────────

    '2-prep-1': 'Find a comfortable seated position — cross-legged or on a chair. Rest your hands on your thighs. Close your eyes and observe the natural rhythm of your breath for five cycles. Notice the small pause between inhale and exhale. That quiet space is where this practice begins.',

    '2-Seated Neck Side Bend-L':
      'Left side. Drop your right ear toward your right shoulder — let gravity do the work, no forcing. Feel the left side of the neck open. Press the left hand gently into the left thigh for a little extra length. Stay for four breaths.',

    '2-Seated Neck Side Bend-R':
      'Right side now. Left ear toward the left shoulder. Right hand gently pressing into the right thigh. Feel the right cervical-thoracic region lengthen. Four breaths, then return slowly to centre.',

    '2-Shoulder Circles-B':
      'Hands to shoulders, elbows forward. Draw large, slow circles with the elbows — forward, up, back, down. Let the movement come from the thoracic spine and shoulder girdle, not the neck. Six circles forward, then six the other way.',

    '2-Seated Thoracic Rotation-L':
      'Left side. Lace your fingers behind your head and sit tall. On each exhale, rotate the upper body to the right — let the elbow lead, not the head. Only as far as feels comfortable in the upper back. Return on the inhale. Five repetitions.',

    '2-Seated Thoracic Rotation-R':
      'Right side. From centre, rotate to the left. Hips stay grounded and facing forward. Feel the rotation at the mid and upper back. If one side feels stiffer, work gently within that range. Five repetitions.',

    '2-Thread the Needle — Quadruped-L':
      'Left side. Hands and knees, wrists under shoulders, neutral low back. Thread your right arm under the left, lowering the right shoulder and cheek toward the mat. Four breaths, breathing into the right upper back.',

    '2-Thread the Needle — Quadruped-R':
      'Right side. Return to neutral, then thread the left arm under the right. Left shoulder and cheek lower toward the mat. Four breaths. Notice if the right shoulder or upper thoracic feels tighter on this side.',

    '2-Low Lunge — Left Leg Forward-L':
      'Left side. Step the left foot between your hands and lower the right knee to the mat. Tuck the right toes. Let the right hip flexor lengthen with each breath. Hands on the left thigh. On each exhale, ease a little deeper. Six breaths.',

    '2-Low Lunge — Right Leg Forward-R':
      'Right side. Step the right foot forward. Left knee lowers to the mat. Press the right hip forward and down on each exhale, keeping it square. Feel the left hip flexor open. Six breaths.',

    '2-Supine Figure-4 Stretch-L':
      'Left side. Cross the left ankle over the right thigh, just above the knee. Flex the left foot. You can stay here or gently draw both legs in. Eight breaths, softening into the left outer hip.',

    '2-Supine Figure-4 Stretch-R':
      'Right side. Right ankle over the left thigh. Keep the right foot strongly flexed — this protects the SI-joint. Draw the legs in gently, around fifty percent. Eight breaths. Notice the difference in depth compared to the left.',

    '2-Legs up the Wall — Modified-B':
      'Sit sideways near a wall, then swing both legs up as you lower your back. Keep a small natural curve in the lumbar — a thin blanket under the sacrum if needed. Arms open at your sides. Stay here for three minutes, breathing into the belly.',

    '2-Savasana-B':
      'Lower your legs and extend them on the mat. Feet fall open. Arms resting gently at your sides, palms up. Let the practice settle — like water soaking slowly into soil. Stay for three minutes.',

    // ── DAY 3 · CORE & STABILITY ─────────────────────────────────────────────

    '3-prep-1': 'Lie on your back, knees bent, feet flat. Breathe in for four counts, out for six counts. On each exhale, draw the lower abdomen gently in and up — just twenty percent effort, not a full brace. This is the core engagement pattern we\'ll use throughout today\'s session.',

    '3-Dead Bug — Arm Only-B':
      'On your back, knees at ninety degrees above your hips, arms pointing to the ceiling. Engage the deep core — just twenty percent effort. On your exhale, lower one arm slowly overhead. Only as far as the back stays neutral. Return, then alternate. Five per side.',

    '3-Dead Bug — Leg Extension-B':
      'Table-top position, knees over hips. Core gently engaged. On your exhale, extend one leg long — heel hovering five centimetres above the mat. Only lower as far as the lumbar stays still. Return and switch. Five per leg.',

    '3-Clamshell-L':
      'Left side. Lie on your left side, hips stacked, knees bent to forty-five degrees. Keeping the feet together, lift the top knee toward the ceiling. Hold two seconds at the top, then lower with control. Don\'t let the top hip roll back. Twelve repetitions.',

    '3-Clamshell-R':
      'Right side. Roll over, stack the hips. Lift the left knee. Two seconds at the top, lower with control. Twelve reps. Notice if one side fatigues more quickly — that\'s useful information about your hip stability.',

    '3-Glute Bridge with March-B':
      'Bridge up and hold. From the bridge, slowly lift one foot five centimetres — just a hover. Keep the pelvis perfectly level. Lower, then the other foot. The hips should not dip to either side. Five marches per side.',

    '3-Bird Dog — Right Arm-R':
      'Right side. Hands and knees, wrists under shoulders. Core gently engaged. On your exhale, extend the right arm straight forward, thumb up. No torso rotation. Hold three seconds, return with control. Eight repetitions.',

    '3-Bird Dog — Left Arm-L':
      'Left side. Left arm extends forward now. No rotation. Three-second hold, return with control. Eight reps. Notice whether one side creates more challenge at the low back — this reveals stabiliser asymmetries.',

    '3-Bird Dog — Full Contralateral-B':
      'Extend the right arm and left leg simultaneously. Imagine balancing a glass of water on your low back. Four-second hold. Return with control, then left arm and right leg. Six per side. This is the full stabilisation challenge.',

    '3-Cat-Cow — Gentle Version-B':
      'Wrists under shoulders, knees under hips. On the inhale, let the belly drop and the tailbone lift slightly — cow. On the exhale, round the mid-back gently toward the ceiling — cat. Move through a comfortable range. Very small amplitude at the top of the spine. Eight slow cycles.',

    '3-Child\'s Pose — Active Hold-B':
      'From quadruped, sit back toward the heels. Knees wide, big toes together. Arms extend forward, palms down. Press gently into the hands to elongate the spine. Breathe into the back ribs. Six slow breaths.',

    '3-Savasana-B':
      'Roll to your left side and ease onto your back. Extend your legs. Let the arms rest open. Release all engagement in the deep core — no holding, no effort. The body integrates this neuromuscular work during stillness. Three to four minutes.',

    // ── DAY 4 · HIP & PELVIS ─────────────────────────────────────────────────

    '4-prep-1': 'Lie on your back, knees bent. Place both hands on the pelvis — heels of the hands on the hip bones, fingers pointing down. Notice whether one side feels higher or more forward. No corrections yet — just observe. Five full breaths.',

    '4-Supine Psoas Release-L':
      'Left side. Extend the left leg long and place a rolled blanket or block under the left thigh for support. Bend the right knee, foot flat. Let the weight of the thigh pressing into the support slowly release the psoas. Breathe naturally for four to five minutes.',

    '4-Supine Psoas Release-R':
      'Right side. Right leg long on support, left knee bent. Notice whether the release creates any sensation at the right SI-joint — this is normal, that tissue is benefiting. Stay for four minutes and breathe naturally.',

    '4-Reclined Pigeon — Left-L':
      'Left side. Cross the left ankle over the right thigh, above the knee. Flex the left foot. Either stay here, or gently draw both legs toward you, holding behind the right thigh. Soften into the left outer hip on each exhale. Ten deep breaths.',

    '4-Reclined Pigeon — Right-R':
      'Right side. Right ankle over the left thigh. Strongly flex the right foot to protect the knee and SI-joint. Draw the legs in at fifty to seventy percent — not maximum. Breathe into the right outer hip. Ten breaths.',

    '4-Windshield Wipers — Supine-B':
      'Feet wide on the mat, knees bent. Let both knees fall slowly to the right, then slowly to the left — like a windshield wiper. Keep it controlled and breath-linked. The hips rotate gently in both directions. Ten passes each side.',

    '4-Supine Butterfly-B':
      'Soles of the feet together, knees falling open. Rest your hands on the inner thighs — no pressing, just the gentle weight of the hands. Let gravity do the opening. Eight breaths, softening a little more with each exhale.',

    '4-Standing Hip Hinge-B':
      'Standing, feet hip-width, knees softly bent. Push the hips back as the chest lowers toward forty-five degrees. Keep the spine in neutral throughout — no rounding. Drive the hips forward to return. Think of closing a car door with your hips. Ten slow repetitions.',

    '4-Standing Tree — Left Leg-L':
      'Left side. Stand on the left foot. Right foot on the inner left calf, not the knee. Find a focal point ahead. Engage the left glute gently. Hands at heart centre or out to the sides. Eight breaths.',

    '4-Standing Tree — Right Leg-R':
      'Right side. Stand on the right foot. Left foot on the inner right calf. Engage the right glute. Notice any instability in the right hip or SI region — this is load-testing. Hold the wall if needed. Eight breaths.',

    '4-Supine Pelvic Rest-B':
      'Lie on your back, legs extending long. A rolled blanket under the knees if that helps. One hand on the belly, one on the chest. Let the entire pelvis and low back sink into the mat. Release all pelvic holding. Three minutes.',

    '4-Savasana-B':
      'Remove the knee support. Let the legs extend naturally. The hips and pelvis have worked today. Allow that tissue to settle and integrate. Complete rest for three minutes.',

    // ── DAY 5 · THORACIC OPENING ──────────────────────────────────────────────

    '5-prep-1': 'Sit comfortably and bring awareness to the space between your shoulder blades, then up to the base of the neck. On the inhale, imagine the ribcage expanding three hundred sixty degrees — front, sides, and back. On the exhale, soften. Five cycles. Today we work gently in the upper thoracic zone.',

    '5-Foam Roller Thoracic Extension-B':
      'Place the foam roller at T4 to T5 — below the upper thoracic, never above it. Support your head with hands laced behind. On your exhale, allow a gentle extension over the roller. Three breaths, then slide one segment lower. Repeat down to T8. Do not roll above T3.',

    '5-Seated Thoracic Extension-B':
      'Rolled towel across the upper-mid back at T4 to T5. Lace your hands behind the head. Lean back gently, looking toward the ceiling. Four breaths per position, then move the towel one notch lower. Repeat.',

    '5-Doorway Chest Stretch-R':
      'Right side. Stand in a doorway and place the right forearm on the frame at ninety degrees. Step the right foot forward until you feel the right chest and front shoulder open. Keep the neck long. Six breaths.',

    '5-Doorway Chest Stretch-L':
      'Left side now. Left forearm on the frame. Step the left foot forward. Open across the left chest and shoulder. Six breaths. Notice any asymmetry between the two sides — this reflects habitual posture patterns.',

    '5-Eagle Arms — Seated-B':
      'Cross the right arm under the left at the elbows. Bring the palms or backs of hands together. Lift the elbows to shoulder height. Feel the space between the shoulder blades spread open. Five breaths, then cross the other way.',

    '5-Prone Cobra — Low-B':
      'Lie face down, arms alongside the body, palms down. On your exhale, gently lift the head and chest five to eight centimetres — leading with the sternum, not the chin. Squeeze the shoulder blades lightly. Three breaths at the top, then lower with control. Six repetitions.',

    '5-Prone Y-Raise-B':
      'Still face down. Arms in a Y above the head, thumbs pointing up. On your exhale, lift both arms three to five centimetres — no momentum. Hold two seconds, then lower. Eight repetitions. This activates the lower trapezius, which supports the whole thoracic spine.',

    '5-Seated Side Bend — Left-L':
      'Left side. Sit tall and extend the left arm overhead. Side-bend to the right — reach the left arm long as you go. Feel the left side ribs and lateral thoracic lengthen. Five breaths, then return to centre slowly.',

    '5-Seated Side Bend — Right-R':
      'Right side. Right arm overhead. Side-bend to the left. Feel the right lateral ribs and right thoracic region lengthen. Five breaths, then return.',

    '5-Supported Backbend over Bolster-B':
      'Lie back over a rolled blanket at T4 to T6. Legs extended, arms open to your sides, palms up. No effort at all — completely release. Let gravity gently open the thoracic spine. Three to four minutes.',

    '5-Savasana-B':
      'Remove the bolster and lie flat. Notice how the thoracic spine contacts the mat now — perhaps more contact points, more openness. Rest here for three minutes and let the new range settle into the body.',

    // ── DAY 6 · BALANCE & FLOW ────────────────────────────────────────────────

    '6-prep-1': 'Stand in mountain pose, feet hip-width, arms at your sides. Close your eyes. Feel the four corners of each foot on the ground. Distribute your weight evenly. Five breaths here. Today we move through sequences — stay connected to steady breath and calm awareness.',

    '6-Mountain Pose with Breath-B':
      'Feel the ground beneath your feet. Stack the pelvis, ribcage, and skull. Chin level, arms alongside the body. On each inhale, grow taller through the crown. On each exhale, root deeper through the feet. Eight breaths.',

    '6-Standing Balance — Left Leg-L':
      'Left side. Shift your weight to the left foot and lift the right foot just two centimetres off the floor. Fix your gaze on one steady point. Left knee softly bent. Hold for ten breaths. If you feel stable, close the eyes for three breaths.',

    '6-Standing Balance — Right Leg-R':
      'Right side. Weight shifts to the right foot, left foot hovering. Notice if this side feels less stable — this is the SI-joint and glute medius pattern. Ten breaths. Eyes closed for three if you\'re steady.',

    '6-Sun Salutation A — Modified-B':
      'Three slow rounds. Mountain, arms overhead on the inhale, forward fold with soft knees on the exhale, half-lift on the inhale, step back to low plank on the knees, low cobra, child\'s pose, walk the feet in, mountain. One breath per movement. Slow and steady.',

    '6-Warrior II — Left Side-L':
      'Left side. Step the left foot forward, right foot turns out. Front knee tracks over the ankle. Arms extend long and parallel to the floor. Gaze softly over the left hand. Pelvis level and neutral. Five breaths.',

    '6-Warrior II — Right Side-R':
      'Right side. Right foot forward, left foot turns out. Arms wide, gaze over the right hand. Notice whether the right hip or SI region feels asymmetrically loaded. Five breaths.',

    '6-Seated Forward Fold — Gentle-B':
      'Legs extended, feet gently flexed. Hinge forward from the hips — not the low back — and let the hands rest wherever they reach. Keep the spine as long as possible. A small curve in the low back is natural here. Six breaths.',

    '6-Seated Spinal Twist — Left-L':
      'Left side. Bend the right knee, foot outside the left thigh. Twist to the right — left elbow against the right knee, right hand resting behind you. Rotate from the thoracic spine, not the lumbar. Gaze over the right shoulder. Five breaths.',

    '6-Seated Spinal Twist — Right-R':
      'Right side. Left knee bent, foot outside the right thigh. Twist to the left. Right elbow to left knee. Rotate from T4 upward, keeping the lumbar neutral. Five breaths.',

    '6-Reclined Bound Angle-B':
      'Soles of the feet together, knees falling open. A folded blanket under each outer thigh if needed. Arms open. Close your eyes. No effort — simply surrender into this shape. Three minutes of deep, relaxed breathing.',

    '6-Savasana-B':
      'Extend your legs. Full body savasana for three minutes. After flowing movement, the nervous system benefits from a longer, deeper rest. Let the residue of motion settle into stillness.',

    // ── DAY 7 · DEEP RESTORATION ─────────────────────────────────────────────

    '7-prep-1': 'Today is complete rest and restoration. Set up your space with extra props — blankets, cushions, pillows. Dim the lights if you can. Lie on your back with knees supported. Close your eyes and let the week\'s practice settle. You have moved, stabilised, and opened. Today you simply receive. Eight slow breaths before we begin.',

    '7-Supported Fish Pose-B':
      'Lie back over a bolster placed lengthwise along the spine — starting at T4, not the upper thoracic. Let the head rest on a thin pillow. Arms open to forty-five degrees. Release completely. Feel the chest and thoracic spine gently opening with each breath. Four minutes.',

    '7-Reclined Spinal Twist — Left-L':
      'Left side. Draw both knees to the chest, then let them fall to the right. Right hand rests on the outer left thigh. Left arm extends at shoulder height. Turn the head gently to the left. Breathe into the left side ribs and the space alongside the spine. Four minutes.',

    '7-Reclined Spinal Twist — Right-R':
      'Right side. Knees fall to the left. Left hand on the outer right thigh. Right arm extends to the right. Head turns gently right. Breathe into any sensation at the right SI-joint with acceptance — notice it, and breathe through it. Four minutes.',

    '7-Dragon Pose — Left-L':
      'Left side. Step the left foot forward into a low lunge, and lower as deeply as is comfortable — elbows toward the floor or onto blocks. Right knee and shin on the mat. Four minutes. Breathe into the right hip flexor and left outer hip. Let the tissues release at their own pace.',

    '7-Dragon Pose — Right-R':
      'Right side. Step the right foot forward. Left knee to the mat. Four minutes. The right hip flexor and surrounding fascia slowly release. Notice any asymmetry compared to the left — that contrast is information.',

    '7-Sleeping Swan — Left-L':
      'Left side. Bring the left knee behind the left wrist, left ankle behind the right wrist. Fold forward, arms extending or stacked under the forehead. Five minutes. This is the deepest hip opener of the week. Breathe and allow.',

    '7-Sleeping Swan — Right-R':
      'Right side. Right knee behind the right wrist. Fold forward. Five minutes. The right outer hip, piriformis, and fascia around the SI-joint all soften in this long hold. Any tenderness here is information, not failure. Breathe and stay.',

    '7-4-7-8 Pranayama-B':
      'Lie on your back or sit comfortably. One hand on the belly. Inhale for four counts. Hold for seven. Exhale slowly for eight. This breath pattern signals the nervous system to slow down. Eight complete cycles. Let it become effortless.',

    '7-Extended Savasana-B':
      'Lie on your back, legs extended, feet falling open. Arms away from the body, palms facing up. An eye pillow if you have one. Let the breath return to its own uncontrolled rhythm. You have moved through all seven days — the body and spine have been tended to with care. Rest completely for eight minutes. There is nothing left to do. Nothing.',

  };

  window.YOGA_VOICE = V;
})();
