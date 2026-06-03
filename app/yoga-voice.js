// yoga-voice.js — Hand-crafted voice-over scripts.
// Blend: gentle instructor + mindful/meditative + clinical but kind.
// Keys: "<dayN>-<slide.nm>-<slide.sd||'B'>"  or  "<dayN>-prep-<si>"

(function () {
  'use strict';

  const V = {

    // ── DAY 1 · BREATH & FOUNDATION ─────────────────────────────────────────

    '1-prep-1':
      'Lie on your back, knees bent, feet hip-width. Close your eyes. Let the weight of the body settle into the mat — feel each point of contact release a little more. Scan slowly from the crown down to the feet, simply noticing. No need to change anything yet.',

    '1-Supine Diaphragmatic Breath-B':
      'One hand on the belly, one on the chest. As you inhale, let the belly rise first — the chest stays relatively still. Exhale slowly, belly softens down. Four counts in, four counts out. There\'s nothing to achieve here — just come back to this rhythm each time the mind drifts.',

    '1-Lateral Rib Breathing-B':
      'Wrap both hands around the sides of the lower ribs. On each inhale, try to breathe sideways — widen the hands apart as the ribs expand. On the exhale, feel them draw back in. Let each breath find its way into the spaces between the thoracic vertebrae.',

    '1-Supine Knee Rocks-B':
      'Feet flat, knees bent. On the exhale, let both knees drift a few centimetres to the right — only as far as feels easy. Inhale back to centre. Then exhale left. Small and slow. The pelvis rolls gently with each pass. Move as if you have all the time in the world.',

    '1-Pelvic Clock — Gentle Tilt-B':
      'Imagine a clock face resting on the lower belly. On the exhale, tip the tailbone toward twelve o\'clock — a tiny rounding. Then toward six — a small arch. Find the midpoint where nothing needs to change. That balanced place is neutral. Explore it six slow times.',

    '1-Supine Neck Release-B':
      'Legs can extend long now. Gently nod the chin toward the chest — just two centimetres, the smallest yes. Hold for three breaths, feeling a quiet lengthening at the cervical-thoracic junction. Release completely. Four times through.',

    '1-Supine Hip Flexor Release-L':
      'Left side. Let the left knee soften toward the chest and clasp behind the thigh. The right leg extends long along the mat. With each exhale, feel the back of the left hip slowly release. After six breaths you\'ll move to the other side.',

    '1-Supine Hip Flexor Release-R':
      'Right side now. Left leg extends long. Draw the right knee toward the chest, clasping behind the thigh. Let the pelvis stay heavy and even — the right hip doesn\'t need to hike up. On each exhale, let the back of the right hip and SI region release a little more. Notice any difference between the two sides.',

    '1-Glute Bridge — Static Hold-B':
      'Feet flat, hip-width. On the exhale, root the feet down and lift the hips slowly — a straight line from knees to shoulders, no further. The low back stays long, not compressed. Squeeze the glutes gently and breathe here for five counts, then lower with control. Twice more.',

    '1-Supported Child\'s Pose-B':
      'Roll to the left and press to seated. Big toes together, knees wide. Walk the hands forward and let the forehead rest down. Arms long, shoulders releasing. On each inhale the back ribs widen. On each exhale the spine decompresses a little more. Simply be here.',

    '1-Savasana-B':
      'Come onto your back. Legs extend and feet fall naturally open. Arms about thirty centimetres from your sides, palms up. Close your eyes and release all control of the breath — let it find its own rhythm. The mat holds every part of you. Nothing left to do.',


    // ── DAY 2 · GENTLE MOBILITY ──────────────────────────────────────────────

    '2-prep-1':
      'Come to a comfortable seat. Rest the hands on the thighs and let the eyes close. Observe the natural rhythm of the breath for five full cycles — don\'t shape it, just notice it. Between each inhale and exhale there\'s a small pause. See if you can sense it. That quiet space is where today\'s practice begins.',

    '2-Seated Neck Side Bend-L':
      'Left side. Let the right ear drift toward the right shoulder — gravity alone, no forcing. Feel the left side of the neck open slowly. The left hand rests on the left thigh with a little weight, creating gentle traction. Four breaths, then return slowly to centre.',

    '2-Seated Neck Side Bend-R':
      'Right side now. Left ear toward the left shoulder. Right hand resting on the right thigh. Feel the right cervical-thoracic region lengthen — from the base of the skull down toward the shoulder blades. Four breaths, then return.',

    '2-Shoulder Circles-B':
      'Fingertips to shoulders, elbows forward. Draw large, unhurried circles — forward, up, back, down. Let the movement originate in the thoracic spine and shoulder girdle rather than the neck. Six circles one way, then six the other. Let the upper back warm and loosen.',

    '2-Seated Thoracic Rotation-L':
      'Left side. Lace the fingers behind the head and sit tall. On each exhale, rotate the upper body to the right — let the elbow lead, not the head. Only as far as feels comfortable in the upper back. Return on the inhale. Five times. The lumbar stays quiet throughout.',

    '2-Seated Thoracic Rotation-R':
      'Right side. From centre, rotate to the left. Hips grounded and facing forward. Feel the rotation happening in the mid and upper thoracic — not the low back. If one side feels stiffer, simply work within that range. Five repetitions.',

    '2-Thread the Needle — Quadruped-L':
      'Left side. From hands and knees, neutral low back, thread the right arm underneath the left. The right shoulder and cheek lower toward the mat. Four breaths, letting the upper thoracic region open with each exhale.',

    '2-Thread the Needle — Quadruped-R':
      'Right side. Return to neutral and thread the left arm under the right. Left shoulder and cheek ease toward the mat. Four breaths. Notice whether the right shoulder or upper thoracic feels tighter — most people have a clearer side.',

    '2-Low Lunge — Left Leg Forward-L':
      'Left side. Step the left foot between the hands and lower the right knee to the mat. Tuck the right toes. Hands rest on the left thigh. On each exhale, the right hip flexor releases a little more. Let the body\'s weight do the work — no forcing. Six breaths.',

    '2-Low Lunge — Right Leg Forward-R':
      'Right side. Right foot forward, left knee down. Press the right hip gently forward on each exhale, keeping it square. Feel the left hip flexor open. Six breaths.',

    '2-Supine Figure-4 Stretch-L':
      'Left side. Cross the left ankle above the right thigh and flex the left foot. You can stay here, or gently draw both legs closer. Eight breaths, softening into the left outer hip on each exhale.',

    '2-Supine Figure-4 Stretch-R':
      'Right side. Right ankle over the left thigh. Keep that right foot strongly flexed — it protects the knee and the SI-joint. Draw the legs in gently, around fifty percent. Eight breaths. Notice any difference in depth compared to the left.',

    '2-Legs up the Wall — Modified-B':
      'Sit sideways near the wall, then swing the legs up as you lower your back. A thin blanket under the sacrum if the lumbar lifts. Arms open at your sides. Let the breath soften into the belly. The body is completely supported here. Stay for three minutes.',

    '2-Savasana-B':
      'Bring the legs down and extend them along the mat. Feet fall open. Arms rest easy, palms up. The body has moved well today. Let the practice settle — like water slowly finding its level. Three minutes of complete release.',


    // ── DAY 3 · CORE & STABILITY ─────────────────────────────────────────────

    '3-prep-1':
      'On your back, knees bent. Breathe in for four counts, out for six. On each exhale, draw the lower abdomen gently in and up — just twenty percent effort. Not a brace, not a grip. A quiet, subtle drawing in. This is the thread that runs through everything today.',

    '3-Dead Bug — Arm Only-B':
      'Knees over hips at ninety degrees, arms reaching up. Core quietly engaged. On the exhale, lower one arm slowly toward the floor — only as far as the low back stays still. Inhale it back. Alternate sides. Five per side. The spine is the anchor. Everything else moves around it.',

    '3-Dead Bug — Leg Extension-B':
      'Table-top position, knees over hips. Core gently present. On the exhale, extend one leg long — heel hovering five centimetres above the mat. The lumbar doesn\'t move. Return with control and switch. Five per leg. Slow and deliberate.',

    '3-Clamshell-L':
      'Left side lying, hips stacked, knees at forty-five degrees. Keeping the feet together, lift the top knee toward the ceiling. Two seconds at the top, then lower with control. Don\'t let the top hip roll back. Twelve repetitions. Feel the outer hip doing its work.',

    '3-Clamshell-R':
      'Roll to the right side now. Left knee lifts, two seconds, lower with control. Twelve reps. Notice whether one side fatigues faster — that asymmetry is useful information about your hip stability.',

    '3-Glute Bridge with March-B':
      'Bridge up and hold. From here, lift one foot five centimetres — just a hover. The pelvis stays perfectly level, it doesn\'t dip to either side. Lower, then the other foot. Five marches per side. The challenge is the stillness of the bridge.',

    '3-Bird Dog — Right Arm-R':
      'Right side. On the exhale, reach the right arm long — thumb up, palm inward. No torso rotation. Three-second hold, then return with control. Eight repetitions. Think of the arm and the opposite hip working in quiet opposition.',

    '3-Bird Dog — Left Arm-L':
      'Left side. Left arm extends forward now. No rotation. Three seconds, return. Eight reps. Notice if one side challenges the low back more — this reveals stabiliser asymmetries worth knowing.',

    '3-Bird Dog — Full Contralateral-B':
      'Right arm and left leg extend simultaneously. Imagine a glass of water balanced on the low back — don\'t let it spill. Four-second hold, return with control. Then left arm and right leg. Six per side. This is the full stability challenge.',

    '3-Cat-Cow — Gentle Version-B':
      'On the inhale, let the belly drop and the tailbone lift gently — cow. On the exhale, round the mid-back toward the ceiling — cat. Let the movement stay within a comfortable range, keeping the amplitude very small at the top of the spine. Eight slow cycles. Let the breath drive the movement.',

    '3-Child\'s Pose — Active Hold-B':
      'Sit toward the heels, knees wide, big toes together. Arms extend forward, pressing gently into the mat to elongate the spine. On each inhale the back ribs expand. On each exhale, soften a little further. Six slow breaths here.',

    '3-Savasana-B':
      'Roll to the left and ease onto your back. Legs extend, arms rest open. Allow the deep core to release completely — no holding, no effort. The body integrates this neuromuscular work during stillness. Three to four minutes.',


    // ── DAY 4 · HIP & PELVIS ─────────────────────────────────────────────────

    '4-prep-1':
      'On your back, knees bent. Place both hands on the pelvis — heels of the hands on the hip bones. Take a moment to notice — is one side higher, or more forward? Nothing to change yet. Just observe with curiosity. Five full breaths.',

    '4-Supine Psoas Release-L':
      'Left side. Extend the left leg long and place a rolled blanket or block under the left thigh. Right knee bent, foot flat. Let the weight of the thigh press into the support. The psoas releases passively over time — there\'s nothing to do but breathe and wait. Four to five minutes.',

    '4-Supine Psoas Release-R':
      'Right side. Right leg long on the support, left knee bent. Notice whether the right side creates any sensation at the SI-joint — this is normal, that tissue is benefiting from the release. Stay for four minutes and let the breath be easy.',

    '4-Reclined Pigeon — Left-L':
      'Left side. Left ankle over the right thigh, above the knee, foot flexed. Either stay here or gently draw both legs in. On each exhale, let the left outer hip release. Ten breaths. There\'s no goal here — just soft, steady presence.',

    '4-Reclined Pigeon — Right-R':
      'Right side. Right ankle over the left thigh. Strongly flex the right foot — this protects the knee and the SI-joint. Draw in gently, around fifty to seventy percent. Notice whether this side differs from the left. Ten breaths.',

    '4-Windshield Wipers — Supine-B':
      'Feet wide on the mat, knees bent. Let both knees fall slowly to the right on the exhale, return to centre on the inhale, then fall to the left. Completely breath-led. Like a slow, unhurried windshield wiper. Ten passes each side.',

    '4-Supine Butterfly-B':
      'Soles together, knees falling open. Hands rest on the inner thighs — their gentle weight is enough. No pressing. Let gravity do this slowly, over time. Eight breaths. On each exhale, see if the hips soften just a little more on their own.',

    '4-Standing Hip Hinge-B':
      'Feet hip-width, knees softly bent. Push the hips back as the chest lowers toward forty-five degrees — no further. The spine stays long and neutral throughout, not rounded. Drive the hips forward to return. Think of it as a hinge at the hip sockets. Ten slow repetitions.',

    '4-Standing Tree — Left Leg-L':
      'Left side. Weight shifts to the left foot. Right foot rests on the inner left calf. Find one steady point to gaze at. The left glute engages gently — not a grip, just a subtle lift. Eight breaths. Let the standing foot root down into the earth.',

    '4-Standing Tree — Right Leg-R':
      'Right side. Stand on the right foot. Left foot on the inner right calf. Notice if the right side feels less steady — the glute medius and SI-joint pattern often shows up here. Hold the wall if needed. Eight breaths.',

    '4-Supine Pelvic Rest-B':
      'On your back, legs extending long. A rolled blanket under the knees if that helps. One hand on the belly, one on the chest. Let the pelvis become completely heavy. Release any last holding in the low back and the pelvic floor. Three minutes.',

    '4-Savasana-B':
      'Remove any supports. Legs extend naturally. The hips and pelvis have done good work today. Allow everything to settle and integrate. Complete rest for three minutes — no doing, no correcting.',


    // ── DAY 5 · THORACIC OPENING ─────────────────────────────────────────────

    '5-prep-1':
      'Come to a comfortable seat. Bring awareness to the space between the shoulder blades — and then slowly up to the base of the skull. On each inhale, imagine the ribcage expanding in every direction: front, sides, and back. On each exhale, soften completely. Five cycles. Today we work gently in the upper thoracic zone.',

    '5-Foam Roller Thoracic Extension-B':
      'Roller at T4 to T5 — below the upper thoracic, never above it. Hands laced behind the head, supporting its weight. On the exhale, allow a gentle extension over the roller — gravity assists. Three breaths, then slide one segment down. Repeat down to T8. Do not roll above T3.',

    '5-Seated Thoracic Extension-B':
      'Rolled towel at T4 to T5. Hands laced behind the head. Lean back gently, letting the thoracic open over the support. Gaze softly at the ceiling. Four breaths, then re-position the towel one notch lower. Let each position settle before you move on.',

    '5-Doorway Chest Stretch-R':
      'Right side. Right forearm on the door frame at ninety degrees. Step the right foot forward — slowly — until the right chest and front shoulder open. The neck stays long. Six breaths. On each exhale, let the opening deepen a little.',

    '5-Doorway Chest Stretch-L':
      'Left side now. Left forearm on the frame, left foot steps forward. Let the left chest and shoulder open. Six breaths. Notice any asymmetry between the two sides — it often reflects habitual posture patterns we carry without knowing.',

    '5-Eagle Arms — Seated-B':
      'Right arm under the left at the elbows. Palms or backs of hands together. Lift the elbows to shoulder height. Feel the space between the shoulder blades spread and open. Five breaths, then cross the other way. This counters everything we\'ve opened in the doorway.',

    '5-Prone Cobra — Low-B':
      'Face down, arms alongside the body, palms down. On the exhale, the sternum lifts five to eight centimetres — the chest leads, not the chin. Shoulder blades draw gently together. Three breaths at the top, then lower with control. Six repetitions.',

    '5-Prone Y-Raise-B':
      'Still face down. Arms in a Y above the head, thumbs up. On the exhale, lift both arms a few centimetres — no momentum, just intention. Hold two seconds, then lower. Eight reps. This wakes up the lower trapezius — the quiet, underused support of the entire upper back.',

    '5-Seated Side Bend — Left-L':
      'Left side. Left arm lifts overhead. Side-bend to the right, reaching the left arm long as you go. Feel the left lateral ribs and the left side of the thoracic spine lengthen. Five breaths. Return slowly to centre.',

    '5-Seated Side Bend — Right-R':
      'Right side. Right arm overhead. Side-bend to the left. Let the right side lengthen from the hip to the fingertip. Five breaths, then return.',

    '5-Supported Backbend over Bolster-B':
      'Lie over the bolster at T4 to T6. Legs extend, arms open at your sides, palms up. Release completely — no effort anywhere. Let gravity and the support do all the work. The thoracic spine opens passively, in its own time. Three to four minutes.',

    '5-Savasana-B':
      'Remove the bolster and lie flat. Notice how the thoracic spine meets the mat now — perhaps more contact, more ease. Rest here for three minutes and let the new range settle into the body\'s resting pattern.',


    // ── DAY 6 · BALANCE & FLOW ────────────────────────────────────────────────

    '6-prep-1':
      'Stand in mountain pose, feet hip-width, arms at your sides. Close your eyes. Feel all four corners of each foot — inner heel, outer heel, base of the big toe, base of the little toe. Weight even and balanced. Five breaths. Today we move through sequences. Stay connected to the breath.',

    '6-Mountain Pose with Breath-B':
      'Feel the earth beneath you. Stack the pelvis, ribcage, and skull. Chin level, arms alongside the body. On each inhale, grow taller through the crown. On each exhale, root deeper through the soles of the feet. Eight breaths. Let the body remember how to simply stand.',

    '6-Standing Balance — Left Leg-L':
      'Left side. Shift your weight onto the left foot and lift the right foot just two centimetres off the floor. Fix the gaze on one steady point. Left knee softly bent. Hold for ten breaths. If you feel stable, let the eyes close for three counts.',

    '6-Standing Balance — Right Leg-R':
      'Right side. Weight onto the right foot. Left foot hovering two centimetres. Notice whether this side feels less steady than the left — that difference is often the SI-joint and glute medius pattern. Ten breaths. Eyes closed for three if the ground feels solid.',

    '6-Sun Salutation A — Modified-B':
      'Three slow rounds. Mountain — arms overhead on the inhale — forward fold with soft knees on the exhale — half-lift on the inhale — step back to low plank on the knees — low cobra — child\'s pose — walk the feet in — mountain. One breath, one movement. Unhurried. Let the sequence become a moving meditation.',

    '6-Warrior II — Left Side-L':
      'Left side. Left foot steps forward, right foot turns ninety degrees. Front knee tracks over the ankle. Arms extend long and wide. Gaze softly over the left hand. The pelvis stays level and neutral. Five breaths. Feel the strength and steadiness of this shape.',

    '6-Warrior II — Right Side-R':
      'Right side. Right foot forward, left foot turns. Arms wide, gaze over the right hand. Notice whether the right hip or SI region feels asymmetrically loaded. Stay curious rather than cautious. Five breaths.',

    '6-Seated Forward Fold — Gentle-B':
      'Legs extended, feet gently flexed. Hinge from the hips — not the low back — and let the hands rest wherever they reach comfortably. Keep the spine as long as possible. A slight curve in the lumbar is natural here. Six breaths. On each exhale, let go a little more.',

    '6-Seated Spinal Twist — Left-L':
      'Left side. Right knee bends, foot outside the left thigh. Left elbow against the right knee, right hand behind you. Rotate from the thoracic spine — the lumbar stays quiet. Gaze over the right shoulder. Five breaths.',

    '6-Seated Spinal Twist — Right-R':
      'Right side. Left knee bends, foot outside the right thigh. Right elbow to left knee. Rotate from T4 upward, the lumbar neutral. Five breaths.',

    '6-Reclined Bound Angle-B':
      'Soles of the feet together, knees falling open. A folded blanket under each outer thigh if that helps. Arms open. Close the eyes. No effort — simply allow this shape. Three minutes of deep, uncontrolled breathing.',

    '6-Savasana-B':
      'Extend the legs. Full body savasana. After a flowing practice, the nervous system benefits from a longer, deeper rest. Three minutes. Let the residue of movement settle completely into stillness.',


    // ── DAY 7 · DEEP RESTORATION ─────────────────────────────────────────────

    '7-prep-1':
      'Today is restoration. Set your space with extra comfort — blankets, cushions, a pillow for the head. Lie on your back, knees supported. Close your eyes. You have moved through six days of practice — the body has been strengthened, opened, and stabilised. Today you simply receive. Let eight slow breaths arrive before we begin.',

    '7-Supported Fish Pose-B':
      'Bolster lengthwise along the spine, starting at T4 — not higher. Head on a thin pillow. Arms open to forty-five degrees, palms up. Release completely. The chest and thoracic spine open with each breath — no effort required, just presence. Four minutes.',

    '7-Reclined Spinal Twist — Left-L':
      'Left side. Both knees draw to the chest, then fall to the right. Right hand rests lightly on the outer left thigh. Left arm extends at shoulder height. Head turns gently left. Breathe into the left side ribs, into the space alongside the spine. Four minutes.',

    '7-Reclined Spinal Twist — Right-R':
      'Right side. Knees fall to the left. Left hand on the outer right thigh. Right arm extends. Head turns right. Breathe into any sensation at the right SI-joint with curiosity rather than concern — it\'s releasing. Four minutes.',

    '7-Dragon Pose — Left-L':
      'Left side. Left foot forward, low lunge — as deep as feels right for today. Right knee and shin on the mat. Elbows toward the floor or onto blocks. Four minutes. The right hip flexor and the fascia around it slowly, persistently release. Let the breath be your anchor.',

    '7-Dragon Pose — Right-R':
      'Right side. Right foot forward. Four minutes. Notice any difference compared to the left — asymmetry is normal, it\'s information. The right hip flexor has its own story. Breathe and stay.',

    '7-Sleeping Swan — Left-L':
      'Left side. Left knee behind the left wrist, ankle behind the right wrist. Fold forward — arms extending long or stacked under the forehead. Five minutes. This is the deepest hip opener of the week. There is nowhere to go, nothing to achieve. Breathe and allow.',

    '7-Sleeping Swan — Right-R':
      'Right side. Right knee behind the right wrist. Fold forward. Five minutes. The right outer hip, the piriformis, and the fascia around the SI-joint all soften in this long hold. Any tenderness here is information, not failure. Breathe and stay.',

    '7-4-7-8 Pranayama-B':
      'Lie back or sit comfortably. One hand on the belly. Inhale for four counts. Hold for seven. Exhale slowly for eight. This pattern tells the nervous system it is safe to slow down. Eight complete cycles. Let the breath become effortless — or as effortless as it can be.',

    '7-Extended Savasana-B':
      'Lie on your back, legs extended, feet falling open. Arms resting away from the body, palms up. An eye pillow if you have one. Let the breath return to its own unguided rhythm. You have moved through all seven days — the body and the spine have been tended to with care, with patience, with intelligence. Rest here for eight minutes. There is nothing left to do. Nothing at all.',

  };

  window.YOGA_VOICE = V;
})();
