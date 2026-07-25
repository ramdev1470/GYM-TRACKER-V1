import { useState, useMemo } from 'react'
import { useWorkouts } from '../hooks/useWorkouts'
import { EXERCISES } from '../data/exercises'
import { Trash2, ChevronDown, Calendar } from 'lucide-react'

function exName(id){ return EXERCISES.find(e=>e.id===id)?.name||id }

export default function History(){
  const { workouts, deleteWorkout } = useWorkouts()
  const [open,setOpen]=useState({})
  const [month,setMonth]=useState(()=>{ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}` })

  const byDate = useMemo(()=>{
    const m={}
    for (const w of workouts){ const k=w.date.slice(0,10); (m[k]=m[k]||[]).push(w) }
    return m
  },[workouts])

  const daysInMonth = (()=>{ const [y,mm]=month.split('-').map(Number); const first=new Date(y,mm-1,1); const last=new Date(y,mm,0); const arr=[]; const startPad=first.getDay(); for(let i=0;i<startPad;i++) arr.push(null); for(let d=1; d<=last.getDate(); d++) arr.push(`${month}-${String(d).padStart(2,'0')}`); return arr })()

  return (
    <div className="space-y-5 max-w-[760px] mx-auto">
      <h1 className="text-[24px] font-bold">History</h1>

      <div className="rounded-[18px] bg-[#111113] border border-[#1e1e23] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-zinc-500"/>
          <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="bg-[#1e1e23] border border-[#26262c] rounded-lg px-2 py-1 text-sm"/>
          <span className="text-xs text-zinc-500 ml-auto">{Object.keys(byDate).length} days trained</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-[10px] text-zinc-600 mb-1">{['S','M','T','W','T','F','S'].map(d=><span key={d+d} className="text-center py-1">{d}</span>)}</div>
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((date,i)=> date===null ? <div key={'pad-'+i}/> : (
            <div key={date} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs border ${byDate[date] ? 'bg-[#ff4d11]/15 border-[#ff4d11]/30 text-[#ff8a33]' : 'bg-[#1a1a1e] border-[#1e1e23] text-zinc-500'}`}>
              <span className="mono text-[11px]">{date.slice(-2)}</span>{byDate[date] && <span className="w-1 h-1 rounded-full bg-[#ff4d11] mt-0.5"/>}
            </div>
          ))}
        </div>
      </div>

      {workouts.length===0 ? <p className="text-center text-sm text-zinc-500 py-12">No workouts logged yet</p> : (
        <div className="space-y-3">
          {workouts.map(w=>{
            const isOpen=!!open[w.id]
            const volume=(w.exercises||[]).reduce((a,ex)=>a+ex.sets.filter(s=>s.completed).reduce((x,s)=>x+(s.weight||0)*(s.reps||0),0),0)
            const sets=(w.exercises||[]).reduce((a,ex)=>a+(ex.sets?.filter(s=>s.completed).length||0),0)
            return (
              <div key={w.id} className="rounded-[16px] bg-[#111113] border border-[#1e1e23] overflow-hidden">
                <button onClick={()=>setOpen(o=>({...o,[w.id]:!isOpen}))} className="w-full flex items-center justify-between px-4 py-3 text-left">
                  <div><p className="font-medium text-sm">{w.name||'Workout'}</p><p className="text-xs text-zinc-500 mt-0.5">{new Date(w.date).toLocaleString()} • {sets} sets • {(volume/1000).toFixed(1)}k kg</p></div>
                  <ChevronDown className={`w-4 h-4 text-zinc-600 transition ${isOpen?'rotate-180':''}`}/>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2 border-t border-[#1e1e23] pt-3">
                    {(w.exercises||[]).map((ex,i)=><div key={i} className="text-xs"><span className="font-medium text-zinc-300">{exName(ex.exerciseId)}</span><span className="text-zinc-500"> — {ex.sets.filter(s=>s.completed).map(s=>`${s.weight}kg × ${s.reps}`).join(', ')||'no completed sets'}</span></div>)}
                    <div className="flex justify-end pt-2"><button onClick={()=>{ if(confirm('Delete this workout?')) deleteWorkout(w.id)}} className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400"><Trash2 className="w-3 h-3"/>Delete</button></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}