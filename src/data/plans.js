export const PLANS = [
  {
    id: 'ppl',
    name: 'Push / Pull / Legs',
    level: 'Intermediate',
    days: 6,
    description: 'Classic 6-day split targeting push, pull, and legs twice a week.',
    schedule: [
      { day: 'Day 1 — Push', exercises: ['bench-press','overhead-press','incline-db-press','lateral-raise','cable-pushdown','cable-crossover'] },
      { day: 'Day 2 — Pull', exercises: ['deadlift','pull-up','barbell-row','cable-row','face-pull','barbell-curl'] },
      { day: 'Day 3 — Legs', exercises: ['squat','roman-deadlift','leg-press','bulgarian-split','leg-curl','calf-raise'] },
      { day: 'Day 4 — Push', exercises: ['incline-bench','overhead-press','dips','arnold-press','skull-crusher','lateral-raise'] },
      { day: 'Day 5 — Pull', exercises: ['barbell-row','lat-pulldown','t-bar-row','hammer-curl','preacher-curl','face-pull'] },
      { day: 'Day 6 — Legs', exercises: ['front-squat','hip-thrust','leg-extension','leg-curl','calf-raise','plank'] },
    ]
  },
  {
    id: 'upper-lower',
    name: 'Upper / Lower',
    level: 'Beginner',
    days: 4,
    description: 'Balanced 4-day program alternating upper and lower body.',
    schedule: [
      { day: 'Day 1 — Upper', exercises: ['bench-press','barbell-row','overhead-press','lat-pulldown','cable-pushdown','barbell-curl'] },
      { day: 'Day 2 — Lower', exercises: ['squat','roman-deadlift','leg-press','leg-curl','calf-raise','plank'] },
      { day: 'Day 3 — Upper', exercises: ['incline-bench','pull-up','arnold-press','cable-row','skull-crusher','hammer-curl'] },
      { day: 'Day 4 — Lower', exercises: ['front-squat','hip-thrust','bulgarian-split','leg-extension','calf-raise','hanging-leg-raise'] },
    ]
  },
  {
    id: 'fullbody-3x',
    name: 'Full Body 3x',
    level: 'Beginner',
    days: 3,
    description: 'Full-body sessions three times a week — great for beginners or time-crunched lifters.',
    schedule: [
      { day: 'Day A', exercises: ['squat','bench-press','barbell-row','overhead-press','plank'] },
      { day: 'Day B', exercises: ['deadlift','incline-bench','lat-pulldown','bulgarian-split','cable-pushdown'] },
      { day: 'Day C', exercises: ['front-squat','overhead-press','cable-row','hip-thrust','barbell-curl'] },
    ]
  },
  {
    id: 'bro-split',
    name: 'Bro Split',
    level: 'Advanced',
    days: 5,
    description: 'One muscle group per day with high volume — for dedicated lifters.',
    schedule: [
      { day: 'Monday — Chest', exercises: ['bench-press','incline-bench','dumbbell-fly','cable-crossover','push-up'] },
      { day: 'Tuesday — Back', exercises: ['deadlift','pull-up','barbell-row','lat-pulldown','cable-row','face-pull'] },
      { day: 'Wednesday — Legs', exercises: ['squat','roman-deadlift','leg-press','bulgarian-split','leg-extension','calf-raise'] },
      { day: 'Thursday — Shoulders', exercises: ['overhead-press','lateral-raise','arnold-press','reverse-fly','upright-row'] },
      { day: 'Friday — Arms', exercises: ['barbell-curl','hammer-curl','preacher-curl','triceps-dip','skull-crusher','cable-pushdown'] },
    ]
  },
]