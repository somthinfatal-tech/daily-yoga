// yoga-voice.js — Complete voice-over scripts with timing and rep counts.
// Every script is a full walkthrough: someone with eyes closed can follow it entirely.
// Keys: "<dayN>-<slide.nm>-<slide.sd||'B'>"  or  "<dayN>-prep-<si>"

(function () {
  'use strict';

  const V = {

    // ── DAY 1 · BREATH & FOUNDATION ─────────────────────────────────────────

    '1-prep-1':
      'Lie on your back, knees bent, feet hip-width. Close your eyes. One minute to simply let the body settle into the mat — feel each point of contact release: the back of the skull, the shoulder blades, the sacrum, the heels. Scan down from crown to feet, noticing without needing to change anything.',

    '1-Supine Diaphragmatic Breath-B':
      'One hand on the belly, one on the chest. Two minutes here, around ten slow cycles. Inhale for four counts — let the belly rise first, the chest stays relatively still. Exhale for four counts — belly softens back down. Come back to this rhythm each time the mind drifts. This is your breathing home base for the whole session.',

    '1-Lateral Rib Breathing-B':
      'Wrap both hands around the sides of the lower ribs. Ninety seconds, around seven or eight cycles. On each inhale, try to breathe sideways — widen the hands apart as the ribs expand laterally. On the exhale, feel them draw back in. Let each breath reach into the spaces between the thoracic vertebrae.',

    '1-Supine Knee Rocks-B':
      'Feet flat, knees bent. Ninety seconds, ten slow passes. On the exhale, let both knees drift a few centimetres to the right — only as far as feels easy. Inhale back to centre. Then exhale left. Keep it small, keep it slow. The pelvis rolls gently with each pass. Move as if you have all the time in the world.',

    '1-Pelvic Clock — Gentle Tilt-B':
      'Imagine a clock face on the lower belly. Ninety seconds, six full cycles. On the exhale, tip the tailbone toward twelve o\'clock — a tiny rounding. Then toward six — a small arch. Find the midpoint where nothing needs to change. That balanced place is neutral. Explore it slowly with the breath.',

    '1-Supine Neck Release-B':
      'Legs can extend long. Ninety seconds, four repetitions. Gently nod the chin toward the chest — just two centimetres, the smallest yes. Hold for three full breaths, feeling a quiet lengthening at the cervical-thoracic junction. Release completely, then repeat. Each one a little more spacious than the last.',

    '1-Supine Hip Flexor Release-L':
      'Left side. Let the left knee soften toward the chest and clasp behind the thigh — behind, not below the knee. The right leg extends long. Six full breaths here, about a minute and forty seconds. With each exhale, feel the back of the left hip release a little more. When the timer ends you\'ll move to the right side.',

    '1-Supine Hip Flexor Release-R':
      'Right side now. Left leg extends long. Draw the right knee toward the chest, clasping behind the thigh. Let the pelvis stay heavy and even — the right hip doesn\'t need to hike up. Six full breaths, a minute and forty seconds. On each exhale, let the back of the right hip and SI region soften. Notice any difference between the two sides.',

    '1-Glute Bridge — Static Hold-B':
      'Feet flat, hip-width. Two and a half minutes, three holds. On the exhale, root the feet down and lift the hips slowly — a straight line from knees to shoulders, no further. The low back stays long, not compressed. Squeeze the glutes gently and breathe here for five full counts, then lower slowly on an exhale. Rest for two breaths, then lift again. Three times total.',

    '1-Supported Child\'s Pose-B':
      'Roll to the left and press to seated. Big toes together, knees wide. Walk the hands forward and let the forehead rest down. Arms long. Two full minutes here. On each inhale the back ribs widen. On each exhale the spine decompresses a little more. Let yourself be held completely by this shape.',

    '1-Savasana-B':
      'Come onto your back. Legs extend and feet fall naturally open. Arms about thirty centimetres from your sides, palms up. Close your eyes. Four minutes here. Release all control of the breath — let it find its own rhythm. The mat holds every part of you. Nothing left to do.',


    // ── DAY 2 · GENTLE MOBILITY ──────────────────────────────────────────────

    '2-prep-1':
      'Come to a comfortable seat. Rest the hands on the thighs, close the eyes. One minute here. Observe the natural rhythm of the breath for five full cycles — don\'t shape it, just notice it. Between each inhale and exhale there\'s a small pause. See if you can find it. That quiet space is where today\'s practice begins.',

    '2-Seated Neck Side Bend-L':
      'Left side. Let the right ear drift toward the right shoulder — gravity alone, no forcing. Left hand rests on the left thigh with a little weight for gentle traction. Hold for four full breaths. Feel the left side of the neck lengthen from the skull down to the shoulder blade. Take your time returning to centre.',

    '2-Seated Neck Side Bend-R':
      'Right side now. Left ear toward the left shoulder. Right hand resting on the right thigh. Four full breaths. Feel the right cervical-thoracic region lengthen — the space between the base of the skull and the shoulder blades slowly opening. Then return slowly to centre.',

    '2-Shoulder Circles-B':
      'Fingertips to shoulders, elbows forward. Two minutes, six circles each way. Draw large, unhurried circles — forward, up, back, down. Let the movement originate in the thoracic spine and shoulder girdle, not the neck. Six full circles forward, then reverse for six more. Let the upper back warm between rounds.',

    '2-Seated Thoracic Rotation-L':
      'Left side. Lace the fingers behind the head and sit tall. On each exhale, rotate the upper body to the right — let the elbow lead, not the head. Return on the inhale. Five repetitions, about a minute and forty seconds. Only as far as feels comfortable at the upper back. The lumbar stays quiet throughout.',

    '2-Seated Thoracic Rotation-R':
      'Right side. From centre, rotate to the left now. Hips grounded and facing forward. Five repetitions. Feel the rotation at the mid and upper thoracic — not the low back. If one side feels stiffer, work within that range. No forcing symmetry.',

    '2-Thread the Needle — Quadruped-L':
      'Left side. Hands and knees, wrists under shoulders, neutral low back. Thread the right arm underneath the left — right shoulder and cheek ease toward the mat. Hold here for four full breaths, just under two minutes. Let the upper thoracic open with each exhale.',

    '2-Thread the Needle — Quadruped-R':
      'Right side. Return to neutral, then thread the left arm under the right. Left shoulder and cheek ease toward the mat. Four breaths, just under two minutes. Notice whether the right shoulder or upper back feels tighter — most people have a clearer side.',

    '2-Low Lunge — Left Leg Forward-L':
      'Left side. Step the left foot between the hands and lower the right knee to the mat. Tuck the right toes. Hands rest on the left thigh. Six full breaths, two minutes. On each exhale, the right hip flexor slowly gives a little more. Let the body\'s weight do the work — no forcing.',

    '2-Low Lunge — Right Leg Forward-R':
      'Right side. Right foot forward, left knee down. Six full breaths, two minutes. Press the right hip gently forward on each exhale, keeping it square. Feel the left hip flexor open gradually with each breath.',

    '2-Supine Figure-4 Stretch-L':
      'Left side. Cross the left ankle above the right thigh, foot flexed. Either stay here or gently draw both legs closer. Eight full breaths, just under two minutes. On each exhale, soften into the left outer hip. No goal — just presence.',

    '2-Supine Figure-4 Stretch-R':
      'Right side. Right ankle over the left thigh — keep that right foot strongly flexed, it protects the SI-joint. Draw the legs in gently, around fifty percent. Eight breaths, just under two minutes. Notice any difference in depth compared to the left.',

    '2-Legs up the Wall — Modified-B':
      'Sit sideways near the wall and swing the legs up as you lower your back. A thin blanket under the sacrum if the lumbar lifts. Arms open at your sides. Three full minutes here. Let the breath soften into the belly. The body is completely supported — nowhere to go, nothing to do.',

    '2-Savasana-B':
      'Bring the legs down and extend them along the mat. Feet fall open. Arms rest easy, palms up. Three minutes. Let the practice settle — like water slowly finding its level. Release everything.',


    // ── DAY 3 · CORE & STABILITY ─────────────────────────────────────────────

    '3-prep-1':
      'On your back, knees bent, feet flat. One minute of preparation. Breathe in for four counts, out for six. On each exhale, draw the lower abdomen gently in and up — just twenty percent effort. Not a brace. A quiet, subtle drawing in. This is the thread that runs through everything today.',

    '3-Dead Bug — Arm Only-B':
      'Knees over hips at ninety degrees, arms reaching up. Core quietly engaged. Two and a half minutes, five per side. On the exhale, lower one arm slowly toward the floor — only as far as the low back stays still. Inhale it back. Alternate sides. The spine is the anchor. Everything else moves around it.',

    '3-Dead Bug — Leg Extension-B':
      'Table-top, knees over hips. Core gently present. Two and a half minutes, five per leg. On the exhale, extend one leg long — heel hovering five centimetres above the mat. The lumbar doesn\'t move. Return with control and switch. Slow and deliberate every time.',

    '3-Clamshell-L':
      'Left side lying, hips stacked, knees at forty-five degrees. Keeping the feet together, lift the top knee toward the ceiling — two seconds at the top, lower with control. Don\'t let the top hip roll back. Twelve repetitions, just under two minutes. Feel the outer hip working.',

    '3-Clamshell-R':
      'Roll to the right side now. Left knee lifts, two seconds at the top, lower with control. Twelve reps. Notice whether one side fatigues faster — that asymmetry tells you something useful about your hip stability.',

    '3-Glute Bridge with March-B':
      'Bridge up and hold steady. From here, lift one foot five centimetres — just a hover. The pelvis stays perfectly level, no dipping. Lower, then the other foot. Five marches per side, ten total, just over two minutes. The challenge is the stillness of the bridge throughout.',

    '3-Bird Dog — Right Arm-R':
      'Right side. On the exhale, reach the right arm long — thumb up, palm inward. No torso rotation at all. Three-second hold at full extension, then return with control. Eight repetitions, a minute and forty seconds. Think of the arm and the opposite hip working in quiet opposition.',

    '3-Bird Dog — Left Arm-L':
      'Left side. Left arm extends forward now — no rotation. Three-second hold, return with control. Eight reps. Notice if one side challenges the low back more. This reveals stabiliser asymmetries worth knowing about.',

    '3-Bird Dog — Full Contralateral-B':
      'Right arm and left leg extend simultaneously — four-second hold. Return slowly, then left arm and right leg. Six per side, twelve total, just under three minutes. Imagine a glass of water balanced on the low back. Don\'t let it spill.',

    '3-Cat-Cow — Gentle Version-B':
      'On the inhale, let the belly drop and the tailbone lift gently — cow. On the exhale, round the mid-back toward the ceiling — cat. Eight slow cycles, two minutes. Keep the amplitude comfortable. Very small movement at the top of the spine. Let the breath drive the movement, not the other way around.',

    '3-Child\'s Pose — Active Hold-B':
      'Sit toward the heels, knees wide, big toes together. Arms extend forward, pressing gently into the mat. Six full breaths, ninety seconds. On each inhale the back ribs widen. On each exhale, soften a little further into the mat. Let the spine be completely long.',

    '3-Savasana-B':
      'Roll to the left and ease onto your back. Legs extend, arms rest open. Three and a half minutes. Allow the deep core to release completely — no holding, no effort. The body integrates this neuromuscular work during stillness. Simply be.',


    // ── DAY 4 · HIP & PELVIS ─────────────────────────────────────────────────

    '4-prep-1':
      'On your back, knees bent. One minute. Place both hands on the pelvis — heels of the hands on the hip bones, fingers pointing down. Notice — is one side higher? More forward? Nothing to change yet. Just observe with curiosity. Five full breaths.',

    '4-Supine Psoas Release-L':
      'Left side. Extend the left leg long and place a rolled blanket or block under the left thigh for support. Right knee bent, foot flat. Let the weight of the thigh press into the support — the psoas releases passively over the next two and a half minutes. There\'s nothing to do but breathe and wait. Let each exhale be a little longer.',

    '4-Supine Psoas Release-R':
      'Right side. Right leg long on the support, left knee bent. Two and a half minutes. Notice whether the right side creates any sensation at the SI-joint — this is normal, that tissue is releasing. Let the breath be easy and unhurried. No effort, just time.',

    '4-Reclined Pigeon — Left-L':
      'Left side. Left ankle over the right thigh, above the knee, foot flexed. Either stay here or gently draw both legs in, holding behind the right thigh. Ten full breaths, about two minutes. On each exhale, let the left outer hip release. No goal — just soft, steady presence.',

    '4-Reclined Pigeon — Right-R':
      'Right side. Right ankle over the left thigh — strongly flex that right foot, it protects the knee and SI-joint. Draw the legs in gently, around fifty to seventy percent. Ten full breaths, about two minutes. Notice whether this side differs from the left.',

    '4-Windshield Wipers — Supine-B':
      'Feet wide on the mat, knees bent. Ten passes each side, two minutes. Let both knees fall slowly to the right on the exhale, return to centre on the inhale, then fall left. Completely breath-led. Like a slow, unhurried windshield wiper. The hips rotate freely.',

    '4-Supine Butterfly-B':
      'Soles together, knees falling open. Hands rest on the inner thighs — their weight alone is enough, no pressing. Eight full breaths, two minutes. Let gravity do this gradually. On each exhale, see if the hips soften just a little more on their own.',

    '4-Standing Hip Hinge-B':
      'Feet hip-width, knees softly bent. Ten slow repetitions, two minutes. Push the hips back as the chest lowers toward forty-five degrees — no further. Spine long and neutral throughout, no rounding. Drive the hips forward to return. Think of it as a hinge at the hip sockets, not a bend at the waist.',

    '4-Standing Tree — Left Leg-L':
      'Left side. Weight shifts to the left foot. Right foot rests on the inner left calf — not the knee. Find one steady point to gaze at. Left glute engages gently — not a grip, just a subtle lift. Eight full breaths, a minute and forty seconds. Let the standing foot root down into the earth.',

    '4-Standing Tree — Right Leg-R':
      'Right side. Stand on the right foot. Left foot on the inner right calf. Eight breaths. Notice if this side feels less steady — the glute medius and SI-joint pattern often shows up here. Hold the wall if needed. That\'s not a compromise, it\'s good training.',

    '4-Supine Pelvic Rest-B':
      'On your back, legs extending long. A rolled blanket under the knees if that helps. One hand on the belly, one on the chest. Three full minutes. Let the pelvis become completely heavy. Release any last holding in the low back and the pelvic floor. Nothing to correct.',

    '4-Savasana-B':
      'Remove any supports. Let the legs extend naturally. The hips and pelvis have done good work today. Three minutes of complete rest. Allow everything to settle and integrate — no doing, no correcting.',


    // ── DAY 5 · THORACIC OPENING ─────────────────────────────────────────────

    '5-prep-1':
      'Come to a comfortable seat. One minute. Bring awareness to the space between the shoulder blades — then slowly up to the base of the skull. On each inhale, imagine the ribcage expanding in every direction: front, sides, and back. On each exhale, soften completely. Five slow cycles. Today we work gently in the upper thoracic zone.',

    '5-Foam Roller Thoracic Extension-B':
      'Roller at T4 to T5 — below the upper thoracic, never above it. Hands laced behind the head, supporting its weight. On the exhale, allow a gentle extension over the roller — let gravity assist. Three breaths per segment, then slide one notch lower. Three minutes to work down to T8. Do not roll above T3.',

    '5-Seated Thoracic Extension-B':
      'Rolled towel at T4 to T5. Hands laced behind the head. Lean back gently, letting the thoracic open over the support. Look softly at the ceiling. Four breaths per position, then move the towel one notch lower. Two minutes total, three positions. Let each one settle before moving on.',

    '5-Doorway Chest Stretch-R':
      'Right side. Right forearm on the door frame at ninety degrees. Step the right foot forward — slowly — until the right chest and front shoulder open. Six full breaths, a minute and forty seconds. Keep the neck long. On each exhale, let the opening deepen just a little.',

    '5-Doorway Chest Stretch-L':
      'Left side now. Left forearm on the frame, left foot steps forward. Six full breaths. Let the left chest and shoulder open. Notice any asymmetry between the two sides — it often reflects habitual posture patterns we carry without knowing.',

    '5-Eagle Arms — Seated-B':
      'Right arm under the left at the elbows. Palms or backs of hands together. Lift the elbows to shoulder height. Feel the space between the shoulder blades spread open. Five full breaths on this side, then cross the other way for five more. Two minutes total. This counters everything we\'ve opened in the doorway.',

    '5-Prone Cobra — Low-B':
      'Face down, arms alongside the body, palms down. Six repetitions, two and a half minutes. On the exhale, the sternum lifts five to eight centimetres — chest leads, not the chin. Shoulder blades draw gently together. Three breaths at the top, then lower with control. Rest for one breath between reps.',

    '5-Prone Y-Raise-B':
      'Arms in a Y above the head, thumbs pointing up. Eight repetitions, two minutes. On the exhale, lift both arms a few centimetres off the mat — no momentum, just intention. Two-second hold at the top, then lower with control. This wakes up the lower trapezius — the quiet, underused support of the entire upper back.',

    '5-Seated Side Bend — Left-L':
      'Left side. Left arm lifts overhead. Side-bend to the right, reaching the left arm long as you go. Five full breaths, ninety seconds. Feel the left lateral ribs and the left side of the thoracic lengthen from hip to fingertip. Return slowly to centre.',

    '5-Seated Side Bend — Right-R':
      'Right side. Right arm overhead. Side-bend to the left. Five breaths, ninety seconds. Let the right side lengthen from hip to fingertip. Return slowly.',

    '5-Supported Backbend over Bolster-B':
      'Lie over the bolster at T4 to T6. Legs extend, arms open at your sides, palms up. Three and a half minutes. Release completely — no effort anywhere. Let gravity and the support do all the work. The thoracic spine opens passively, in its own time.',

    '5-Savasana-B':
      'Remove the bolster and lie flat. Three minutes. Notice how the thoracic spine meets the mat now — perhaps more points of contact, more ease. Let the new range settle into the body\'s resting pattern. Simply observe.',


    // ── DAY 6 · BALANCE & FLOW ────────────────────────────────────────────────

    '6-prep-1':
      'Stand in mountain pose, feet hip-width, arms at your sides. One minute. Close your eyes. Feel all four corners of each foot — inner heel, outer heel, base of the big toe, base of the little toe. Weight even and balanced. Five full breaths. Today we move through sequences. Stay close to the breath.',

    '6-Mountain Pose with Breath-B':
      'Feel the earth beneath you. Stack the pelvis, ribcage, and skull. Chin level. Eight full breaths, about eighty seconds. On each inhale, grow taller through the crown. On each exhale, root deeper through the soles. Let the body remember how to simply stand.',

    '6-Standing Balance — Left Leg-L':
      'Left side. Weight shifts to the left foot. Right foot lifts just two centimetres off the floor. Fix the gaze on one steady point. Left knee softly bent. Ten full breaths, a minute and forty seconds. If you feel stable, let the eyes close for the final three counts.',

    '6-Standing Balance — Right Leg-R':
      'Right side. Weight onto the right foot. Left foot hovering two centimetres. Ten full breaths. Notice whether this side feels less steady than the left — that difference is often the SI-joint and glute medius pattern. Eyes closed for the last three if the ground feels solid.',

    '6-Sun Salutation A — Modified-B':
      'Three slow rounds, three and a half minutes. Mountain — inhale arms overhead — exhale forward fold with soft knees — inhale half-lift — exhale step back to low plank on the knees — inhale low cobra — exhale child\'s pose — walk the feet in — inhale mountain. One breath, one movement. Let the sequence become a moving meditation.',

    '6-Warrior II — Left Side-L':
      'Left side. Left foot steps forward, right foot turns ninety degrees. Front knee tracks over the ankle. Arms extend long and wide. Gaze softly over the left hand. Five full breaths, a minute and forty seconds. The pelvis stays level. Feel the strength and steadiness of this shape.',

    '6-Warrior II — Right Side-R':
      'Right side. Right foot forward, left foot turns ninety degrees. Arms wide, gaze over the right hand. Five full breaths. Notice whether the right hip or SI region feels asymmetrically loaded. Stay curious rather than cautious.',

    '6-Seated Forward Fold — Gentle-B':
      'Legs extended, feet gently flexed. Hinge from the hips — not the low back — and let the hands find whatever is reachable: thighs, shins, or feet. Keep the spine as long as possible. Six full breaths, just under two minutes. On each exhale, release a little more. A slight curve in the lumbar is completely natural here.',

    '6-Seated Spinal Twist — Left-L':
      'Left side. Right knee bends, foot outside the left thigh. Left elbow against the right knee, right hand behind you. Rotate from the thoracic spine — the lumbar stays quiet. Gaze over the right shoulder. Five full breaths, a minute and forty seconds.',

    '6-Seated Spinal Twist — Right-R':
      'Right side. Left knee bends, foot outside the right thigh. Right elbow to left knee. Rotate from T4 upward — the lumbar stays neutral. Five breaths.',

    '6-Reclined Bound Angle-B':
      'Soles of the feet together, knees falling open. A folded blanket under each outer thigh if that helps. Arms open. Three full minutes. Close the eyes. No effort — simply allow this shape. Let the breath be long and uncontrolled.',

    '6-Savasana-B':
      'Extend the legs. Three minutes of complete savasana. After a flowing practice, the nervous system benefits from a longer rest. Let the residue of movement settle completely into stillness.',


    // ── DAY 7 · DEEP RESTORATION ─────────────────────────────────────────────

    '7-prep-1':
      'Today is restoration. Set your space with extra comfort — blankets, cushions, a pillow for the head. Lie on your back, knees supported. Ninety seconds here. You have moved through six days — the body has been strengthened, opened, and stabilised. Today you simply receive. Eight slow breaths before we begin.',

    '7-Supported Fish Pose-B':
      'Bolster lengthwise along the spine, starting at T4 — not higher. Head on a thin pillow. Arms open to forty-five degrees, palms up. Four full minutes. Release completely. The chest and thoracic spine open with each breath — no effort required. Simply be present in this shape.',

    '7-Reclined Spinal Twist — Left-L':
      'Left side. Both knees draw to the chest, then fall to the right. Right hand rests lightly on the outer left thigh. Left arm extends at shoulder height. Head turns gently left. Four full minutes. Breathe into the left side ribs, into the space alongside the spine. Let each exhale deepen the release.',

    '7-Reclined Spinal Twist — Right-R':
      'Right side. Knees fall to the left. Left hand on the outer right thigh. Right arm extends at shoulder height. Head turns right. Four full minutes. Breathe into any sensation at the right SI-joint with curiosity rather than concern — it\'s releasing, not breaking.',

    '7-Dragon Pose — Left-L':
      'Left side. Left foot forward into a low lunge — as deep as feels right today. Right knee and shin on the mat. Elbows toward the floor or onto blocks if needed. Four full minutes. The right hip flexor and the fascia around it slowly, persistently release. Let the breath be your anchor through the intensity.',

    '7-Dragon Pose — Right-R':
      'Right side. Right foot forward. Four minutes. Notice any difference compared to the left — asymmetry is completely normal, it\'s information. The right hip flexor has its own story. Breathe and stay.',

    '7-Sleeping Swan — Left-L':
      'Left side. Left knee behind the left wrist, ankle behind the right wrist. Fold forward — arms extending long, or stacked under the forehead. Five full minutes. This is the deepest hip opener of the week. There is nowhere to go, nothing to achieve. Breathe and allow.',

    '7-Sleeping Swan — Right-R':
      'Right side. Right knee behind the right wrist. Fold forward. Five full minutes. The right outer hip, the piriformis, and the fascia around the SI-joint all soften in this long hold. Any tenderness here is information, not failure. Breathe and stay.',

    '7-4-7-8 Pranayama-B':
      'Lie back or sit comfortably. One hand on the belly. Eight complete cycles over the next four and a half minutes. Inhale for four counts. Hold for seven. Exhale slowly for eight. This pattern tells the nervous system it is safe to slow down. Let it become effortless — or as effortless as it can be.',

    '7-Extended Savasana-B':
      'Lie on your back, legs extended, feet falling open. Arms resting away from the body, palms up. An eye pillow if you have one. Eight full minutes. Let the breath return to its own unguided rhythm. You have moved through all seven days — the body and the spine have been tended to with care, with patience, with intelligence. Rest here. There is nothing left to do. Nothing at all.',

  };

  window.YOGA_VOICE = V;
})();
