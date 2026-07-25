export const MUSCLE_GROUPS = ['All','Chest','Back','Legs','Shoulders','Arms','Core','Full Body']

export const EXERCISES = [
  // Chest
  { id:'bench-press', name:'Bench Press', group:'Chest', equipment:'Barbell', instructions:'Lie flat, grip bar slightly wider than shoulders, press up.' },
  { id:'incline-bench', name:'Incline Bench Press', group:'Chest', equipment:'Barbell', instructions:'Incline bench 30-45°, press barbell to upper chest.' },
  { id:'dumbbell-fly', name:'Dumbbell Fly', group:'Chest', equipment:'Dumbbell', instructions:'Lie flat, arms slightly bent, bring dumbbells together over chest.' },
  { id:'push-up', name:'Push-Up', group:'Chest', equipment:'Bodyweight', instructions:'High plank, lower chest to floor, push back up.' },
  { id:'cable-crossover', name:'Cable Crossover', group:'Chest', equipment:'Cable', instructions:'High pulleys, step forward, bring handles together in front.' },
  { id:'dips', name:'Chest Dips', group:'Chest', equipment:'Bodyweight', instructions:'Lean forward on bars, lower body, press back up.' },
  { id:'incline-db-press', name:'Incline Dumbbell Press', group:'Chest', equipment:'Dumbbell', instructions:'Incline bench, press dumbbells from shoulders to above.' },

  // Back
  { id:'deadlift', name:'Deadlift', group:'Back', equipment:'Barbell', instructions:'Feet mid-bar, hinge hips back, pull bar with straight back.' },
  { id:'pull-up', name:'Pull-Up', group:'Back', equipment:'Bodyweight', instructions:'Hang from bar, pull chin over bar, lower controlled.' },
  { id:'barbell-row', name:'Barbell Row', group:'Back', equipment:'Barbell', instructions:'Hinge forward ~45°, row bar to lower ribs.' },
  { id:'lat-pulldown', name:'Lat Pulldown', group:'Back', equipment:'Machine', instructions:'Sit, pull bar to upper chest, squeeze lats.' },
  { id:'cable-row', name:'Seated Cable Row', group:'Back', equipment:'Cable', instructions:'Sit, pull handle to torso, squeeze shoulder blades.' },
  { id:'t-bar-row', name:'T-Bar Row', group:'Back', equipment:'Machine', instructions:'Straddle T-bar, row handle to chest.' },
  { id:'face-pull', name:'Face Pull', group:'Back', equipment:'Cable', instructions:'Rope high, pull to forehead, externally rotate.' },

  // Legs
  { id:'squat', name:'Back Squat', group:'Legs', equipment:'Barbell', instructions:'Bar on traps, sit back and down, break parallel.' },
  { id:'front-squat', name:'Front Squat', group:'Legs', equipment:'Barbell', instructions:'Bar front-racked, elbows high, squat deep.' },
  { id:'roman-deadlift', name:'Romanian Deadlift', group:'Legs', equipment:'Barbell', instructions:'Slight knee bend, hinge hips back, bar close to legs.' },
  { id:'leg-press', name:'Leg Press', group:'Legs', equipment:'Machine', instructions:'Feet shoulder-width on platform, press without locking knees fully.' },
  { id:'bulgarian-split', name:'Bulgarian Split Squat', group:'Legs', equipment:'Dumbbell', instructions:'Rear foot elevated, lunge down, drive up via front leg.' },
  { id:'leg-extension', name:'Leg Extension', group:'Legs', equipment:'Machine', instructions:'Extend knees against pad, squeeze quads at top.' },
  { id:'leg-curl', name:'Leg Curl', group:'Legs', equipment:'Machine', instructions:'Curl heels toward glutes against resistance.' },
  { id:'calf-raise', name:'Calf Raise', group:'Legs', equipment:'Machine', instructions:'Rise onto toes, squeeze calves at top.' },
  { id:'hip-thrust', name:'Hip Thrust', group:'Legs', equipment:'Barbell', instructions:'Upper back on bench, thrust hips driving through heels.' },

  // Shoulders
  { id:'overhead-press', name:'Overhead Press', group:'Shoulders', equipment:'Barbell', instructions:'Press bar from shoulders to overhead, no back arch.' },
  { id:'lateral-raise', name:'Lateral Raise', group:'Shoulders', equipment:'Dumbbell', instructions:'Raise dumbbells to sides to shoulder height.' },
  { id:'arnold-press', name:'Arnold Press', group:'Shoulders', equipment:'Dumbbell', instructions:'Rotate and press dumbbells overhead from front of shoulders.' },
  { id:'reverse-fly', name:'Reverse Fly', group:'Shoulders', equipment:'Dumbbell', instructions:'Bend forward, raise dumbbells laterally squeezing rear delts.' },
  { id:'upright-row', name:'Upright Row', group:'Shoulders', equipment:'Barbell', instructions:'Pull bar to chin, elbows high, keep close to body.' },

  // Arms
  { id:'barbell-curl', name:'Barbell Curl', group:'Arms', equipment:'Barbell', instructions:'Elbows at sides, curl bar to shoulders.' },
  { id:'hammer-curl', name:'Hammer Curl', group:'Arms', equipment:'Dumbbell', instructions:'Neutral grip, curl dumbbells keeping elbows tucked.' },
  { id:'preacher-curl', name:'Preacher Curl', group:'Arms', equipment:'Dumbbell', instructions:'Arm over preacher pad, curl with strict form.' },
  { id:'triceps-dip', name:'Triceps Dip', group:'Arms', equipment:'Bodyweight', instructions:'On bench/bars, lower by bending elbows, press up.' },
  { id:'skull-crusher', name:'Skull Crusher', group:'Arms', equipment:'Barbell', instructions:'Lie back, extend arms then bend elbows toward forehead.' },
  { id:'cable-pushdown', name:'Cable Pushdown', group:'Arms', equipment:'Cable', instructions:'Elbows by sides, push handle down extending triceps.' },
  { id:'concentration-curl', name:'Concentration Curl', group:'Arms', equipment:'Dumbbell', instructions:'Seated, elbow on inner thigh, curl dumbbell without swinging.' },

  // Core
  { id:'plank', name:'Plank', group:'Core', equipment:'Bodyweight', instructions:'Forearm plank, brace abs, hold straight line.' },
  { id:'hanging-leg-raise', name:'Hanging Leg Raise', group:'Core', equipment:'Bodyweight', instructions:'Hang from bar, raise legs to 90° or higher.' },
  { id:'russian-twist', name:'Russian Twist', group:'Core', equipment:'Dumbbell', instructions:'Sit leaned back, rotate torso side to side.' },
  { id:'cable-crunch', name:'Cable Crunch', group:'Core', equipment:'Cable', instructions:'Kneel, cable behind head, crunch torso down.' },
  { id:'ab-wheel', name:'Ab Wheel Rollout', group:'Core', equipment:'Other', instructions:'Kneel, roll wheel out keeping core tight, roll back.' },
  { id:'dead-bug', name:'Dead Bug', group:'Core', equipment:'Bodyweight', instructions:'On back, lower opposite arm/leg slowly, return.' },

  // Full Body
  { id:'burpee', name:'Burpee', group:'Full Body', equipment:'Bodyweight', instructions:'Squat to plank to jump back up.' },
  { id:'kettlebell-swing', name:'Kettlebell Swing', group:'Full Body', equipment:'Kettlebell', instructions:'Hinge hips, swing kettlebell to chest height via hip drive.' },
  { id:'thruster', name:'Thruster', group:'Full Body', equipment:'Dumbbell', instructions:'Front squat then overhead press in one motion.' },
  { id:'farmer-carry', name:'Farmer Carry', group:'Full Body', equipment:'Dumbbell', instructions:'Heavy dumbbells at sides, walk upright bracing core.' },
]