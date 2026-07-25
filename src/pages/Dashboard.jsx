import { Link } from 'react-router-dom'
import { useWorkouts } from '../hooks/useWorkouts'
import { EXERCISES } from '../data/exercises'
import { Flame, CalendarDays, BarChart3, Trophy, Dumbbell, ArrowRight, Plus } from 'lucide-react'

function nameFor(id){ return EXERCISES.find(e=>e.id===id)?.name || id }

export default function Dashboard(){
  const { workouts, stats } = useWorkouts()
  const recent = workouts.slice(0,4)

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Your training at a glance</p>
        </div>
        <Link to="/log" className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff4d11] text-white text-sm font-semibold hover:bg-[#ff5e2a] transition"><Plus className="w-4 h-4"/>New Workout</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card icon={Flame} label="Total Workouts" value={stats.total} sub={`${stats.month} this month`} accent/>
        <Card icon={CalendarDays} label="This Week" value={stats.week} sub="sessions"/>
        <Card icon={BarChart3} label="Weekly Volume" value={`${(stats.weekVolume/1000).toFixed(1)}k`} sub="kg total"/>
        <Card icon={Trophy} label="PRs" value={stats.prs.length} sub="records"/>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e23]">
            <h2 className="font-semibold">Recent Workouts</h2>
            <Link to="/history" className="text-xs text-zinc-500 hover:text-zinc-200 flex items-center gap-1">View all <ArrowRight className="w-3 h-3"/></Link>
          </div>
          {recent.length===0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#1e1e23] flex items-center justify-center mb-3"><Dumbbell className="w-5 h-5 text-zinc-500"/></div>
              <p className="text-sm text-zinc-500">No workouts yet</p>
              <Link to="/log" className="inline-flex mt-3 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold">Start your first workout</Link>
            </div>
          ) : (
            <div className="divide-y divide-[#1e1e23]">
              {recent.map(w=>(
                <div key={w.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#151519]">
                  <div>
                    <p className="font-medium text-sm">{w.name||'Workout'}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{new Date(w.date).toLocaleDateString()} • {(w.exercises||[]).length} exercises • {Math.round((w.duration||0)/60)} min</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#1e1e23] text-zinc-400 mono">{(w.exercises||[]).reduce((acc,ex)=>acc+(ex.sets?.filter(s=>s.completed).length||0),0)} sets</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e1e23] flex items-center justify-between">
            <h2 className="font-semibold">Top PRs</h2>
            <Link to="/progress" className="text-xs text-zinc-500 hover:text-zinc-200 flex items-center gap-1">Progress <ArrowRight className="w-3 h-3"/></Link>
          </div>
          {stats.prs.length===0 ? <p className="p-8 text-center text-sm text-zinc-500">Log sets to see PRs</p> : (
            <div className="divide-y divide-[#1e1e23]">
              {stats.prs.slice(0,5).map(pr=>(
                <div key={pr.exerciseId} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm truncate">{nameFor(pr.exerciseId)}</span>
                  <span className="mono text-sm font-bold">{pr.weight} kg × {pr.reps}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Link to="/log" className="sm:hidden flex items-center justify-center gap-2 h-[52px] rounded-full bg-[#ff4d11] text-white font-semibold"><Plus className="w-5 h-5"/>New Workout</Link>
    </div>
  )
}

function Card({icon:Icon,label,value,sub,accent}){
  return (
    <div className={`rounded-[18px] border border-[#1e1e23] p-4 ${accent?'bg-gradient-to-br from-[#1a1a1e] to-[#151519]': 'bg-[#111113]'}`}>
      <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-widest font-semibold"><Icon className="w-3.5 h-3.5"/>{label}</div>
      <div className="mt-2 flex items-baseline gap-2"><span className="text-[28px] font-extrabold mono leading-none">{value}</span><span className="text-xs text-zinc-500">{sub}</span></div>
    </div>
  )
}