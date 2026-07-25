import { useState, useMemo } from 'react'
import { useWorkouts } from '../hooks/useWorkouts'
import { EXERCISES } from '../data/exercises'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Search } from 'lucide-react'

function nameFor(id){ return EXERCISES.find(e=>e.id===id)?.name||id }

export default function Progress(){
  const { workouts, stats, exerciseHistory, weeklyVolume } = useWorkouts()
  const [tab,setTab]=useState('overview')
  const [q,setQ]=useState('')
  const [selected,setSelected]=useState(null)

  const filteredEx = EXERCISES.filter(e=> !q || e.name.toLowerCase().includes(q.toLowerCase())).slice(0,40)
  const points = useMemo(()=> selected ? exerciseHistory(selected) : [], [selected, exerciseHistory])

  const perWorkout = workouts.slice(0,20).reverse().map(w=>{
    const vol=(w.exercises||[]).reduce((a,ex)=>a+ex.sets.reduce((x,s)=>x+(s.weight||0)*(s.reps||0),0),0)
    return { name: (w.name||'Wk').slice(0,10), volume: vol, date: w.date.slice(5,10) }
  })

  return (
    <div className="space-y-5">
      <h1 className="text-[24px] font-bold">Progress</h1>

      <div className="flex gap-2 p-1 rounded-full bg-[#111113] border border-[#1e1e23] w-fit">
        {[
          {id:'overview',label:'Overview'},
          {id:'exercise',label:'Exercise'},
          {id:'volume',label:'Volume'},
          {id:'prs',label:'PRs'},
        ].map(t=> <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${tab===t.id?'bg-white text-black':'text-zinc-500 hover:text-zinc-200'}`}>{t.label}</button>)}
      </div>

      {tab==='overview' && (
        <div className="space-y-4">
          <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] p-4">
            <h3 className="text-sm font-semibold mb-4">Weekly Volume (last 14 weeks)</h3>
            <div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyVolume}><CartesianGrid strokeDasharray="3 3" stroke="#1e1e23"/><XAxis dataKey="date" tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#1a1a1e', border:'1px solid #2a2a30', borderRadius:12, fontSize:12}}/><Bar dataKey="volume" fill="#ff4d11" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
          </div>
          <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] p-4">
            <h3 className="text-sm font-semibold mb-4">Volume per Workout (recent 20)</h3>
            <div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={perWorkout}><CartesianGrid strokeDasharray="3 3" stroke="#1e1e23"/><XAxis dataKey="date" tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#1a1a1e', border:'1px solid #2a2a30', borderRadius:12, fontSize:12}}/><Line type="monotone" dataKey="volume" stroke="#ff4d11" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div>
          </div>
        </div>
      )}

      {tab==='exercise' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-[#111113] border border-[#1e1e23]"><Search className="w-4 h-4 text-zinc-600"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search exercise…" className="flex-1 bg-transparent outline-none text-sm"/></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredEx.map(e=> <button key={e.id} onClick={()=>setSelected(e.id)} className={`text-left px-3 py-2.5 rounded-xl border text-xs transition ${selected===e.id?'bg-[#ff4d11] border-[#ff4d11] text-white':'bg-[#111113] border-[#1e1e23] text-zinc-400 hover:text-zinc-200'}`}>{e.name}<span className="ml-2 opacity-60">{e.group}</span></button>)}
          </div>
          {selected ? (
            points.length===0 ? <p className="text-sm text-zinc-500 text-center py-8">No data yet for {nameFor(selected)} — log sets first.</p> : (
              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] p-4">
                  <h3 className="text-sm font-semibold mb-2">{nameFor(selected)} — Max Weight Over Time</h3>
                  <div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={points}><CartesianGrid strokeDasharray="3 3" stroke="#1e1e23"/><XAxis dataKey="date" tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#1a1a1e', border:'1px solid #2a2a30', borderRadius:12, fontSize:12}}/><Line type="monotone" dataKey="weight" stroke="#ff4d11" strokeWidth={2} dot={{r:3, stroke:'#ff4d11'}}/></LineChart></ResponsiveContainer></div>
                </div>
                <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] p-4">
                  <h3 className="text-sm font-semibold mb-2">Volume Over Time</h3>
                  <div className="h-[200px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={points}><CartesianGrid strokeDasharray="3 3" stroke="#1e1e23"/><XAxis dataKey="date" tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#1a1a1e', border:'1px solid #2a2a30', borderRadius:12, fontSize:12}}/><Bar dataKey="volume" fill="#a1a1aa" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
                </div>
              </div>
            )
          ) : <p className="text-sm text-zinc-500 text-center py-4">Pick an exercise above</p>}
        </div>
      )}

      {tab==='volume' && (
        <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] p-4">
          <h3 className="text-sm font-semibold mb-4">Volume Trend</h3>
          <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyVolume}><CartesianGrid strokeDasharray="3 3" stroke="#1e1e23"/><XAxis dataKey="date" tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10, fill:'#6b7280'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#1a1a1e', border:'1px solid #2a2a30', borderRadius:12, fontSize:12}}/><Bar dataKey="volume" fill="#ff4d11" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div>
        </div>
      )}

      {tab==='prs' && (
        <div className="rounded-[18px] border border-[#1e1e23] bg-[#111113] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e1e23] flex items-center justify-between"><h3 className="font-semibold text-sm">Personal Records</h3><span className="text-xs text-zinc-500">{stats.prs.length} PRs</span></div>
          {stats.prs.length===0 ? <p className="p-8 text-center text-sm text-zinc-500">Complete sets to track PRs</p> : (
            <div className="divide-y divide-[#1e1e23]">
              {stats.prs.map(pr=>(
                <div key={pr.exerciseId} className="flex items-center justify-between px-5 py-3.5">
                  <div><p className="text-sm font-medium">{nameFor(pr.exerciseId)}</p><p className="text-[11px] text-zinc-500 mt-0.5">{new Date(pr.date).toLocaleDateString()}</p></div>
                  <div className="text-right"><p className="mono text-sm font-bold">{pr.weight} kg</p><p className="text-[11px] text-zinc-500">× {pr.reps} reps</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}