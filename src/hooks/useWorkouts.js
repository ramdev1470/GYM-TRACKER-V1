import { useState, useEffect, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'gymflow-workouts-v1'

function loadWorkouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function useWorkouts() {
  const [workouts, setWorkouts] = useState(() => loadWorkouts())

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts)) } catch {}
  }, [workouts])

  const addWorkout = useCallback((w) => {
    const entry = { id: Date.now().toString(36)+Math.random().toString(36).slice(2), date: new Date().toISOString(), ...w }
    setWorkouts(prev => [entry, ...prev])
    return entry
  }, [])

  const deleteWorkout = useCallback((id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }, [])

  const stats = useMemo(() => {
    const now = new Date()
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0,0,0,0)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    let weekCount = 0, monthCount = 0, weekVolume = 0
    const prMap = {}
    for (const w of workouts) {
      const d = new Date(w.date)
      if (d >= startOfWeek) { weekCount++; for (const ex of w.exercises||[]) for (const s of ex.sets||[]) weekVolume += (s.weight||0)*(s.reps||0) }
      if (d >= startOfMonth) monthCount++
      for (const ex of w.exercises||[]) for (const s of ex.sets||[]) {
        if (!s.completed) continue
        const cur = prMap[ex.exerciseId]
        if (!cur || (s.weight||0) > cur.weight) prMap[ex.exerciseId] = { exerciseId: ex.exerciseId, weight: s.weight||0, reps: s.reps||0, date: w.date }
      }
    }
    return { total: workouts.length, week: weekCount, month: monthCount, weekVolume, prs: Object.values(prMap).sort((a,b)=>b.weight-a.weight) }
  }, [workouts])

  const exerciseHistory = useCallback((exerciseId) => {
    const points = []
    for (const w of [...workouts].reverse()) {
      for (const ex of w.exercises||[]) if (ex.exerciseId===exerciseId) {
        for (const s of ex.sets||[]) if (s.completed) points.push({ date: w.date.slice(0,10), weight: s.weight||0, reps: s.reps||0, volume: (s.weight||0)*(s.reps||0) })
      }
    }
    return points
  }, [workouts])

  const weeklyVolume = useMemo(() => {
    const map = {}
    for (let i=13;i>=0;i--) {
      const d=new Date(); d.setDate(d.getDate()-i*7); d.setHours(0,0,0,0)
      const key=d.toISOString().slice(0,10)
      map[key]=0
    }
    const keys=Object.keys(map).sort()
    for (const w of workouts) {
      const dt=new Date(w.date); dt.setHours(0,0,0,0)
      const k=keys.find(key=>{const kd=new Date(key); kd.setHours(0,0,0,0); const next=new Date(kd); next.setDate(next.getDate()+7); return dt>=kd && dt<next})
      if (k) { let vol=0; for (const ex of w.exercises||[]) for (const s of ex.sets||[]) vol+=(s.weight||0)*(s.reps||0); map[k]+=vol }
    }
    return Object.entries(map).map(([date,volume])=>({date:date.slice(5),volume}))
  }, [workouts])

  return { workouts, addWorkout, deleteWorkout, stats, exerciseHistory, weeklyVolume }
}