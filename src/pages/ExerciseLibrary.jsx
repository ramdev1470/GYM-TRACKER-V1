import { useState } from 'react'
import { EXERCISES, MUSCLE_GROUPS } from '../data/exercises'
import { Search } from 'lucide-react'

export default function ExerciseLibrary(){
  const [group,setGroup]=useState('All')
  const [q,setQ]=useState('')
  const filtered = EXERCISES.filter(e=>{
    if(group!=='All' && e.group!==group) return false
    if(!q) return true
    const s=q.toLowerCase()
    return e.name.toLowerCase().includes(s) || e.equipment.toLowerCase().includes(s)
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[24px] font-bold">Exercise Library</h1>
        <p className="text-zinc-500 text-sm mt-1">{EXERCISES.length} exercises</p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 h-11 px-3 rounded-xl bg-[#111113] border border-[#1e1e23]"><Search className="w-4 h-4 text-zinc-600"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="flex-1 bg-transparent outline-none text-sm"/></div>
      </div>

      <div className="flex gap-2 overflow-auto pb-1">
        {MUSCLE_GROUPS.map(g=> <button key={g} onClick={()=>setGroup(g)} className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition ${group===g?'bg-white text-black border-white':'bg-[#111113] border-[#1e1e23] text-zinc-400 hover:text-zinc-200'}`}>{g}</button>)}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map(e=>(
          <div key={e.id} className="rounded-[16px] bg-[#111113] border border-[#1e1e23] p-4 hover:border-[#2a2a30] transition">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{e.name}</p>
                <div className="flex gap-1.5 mt-2"><span className="text-[10px] px-2 py-1 rounded-full bg-[#1e1e23] text-zinc-400 uppercase tracking-widest">{e.group}</span><span className="text-[10px] px-2 py-1 rounded-full bg-[#1e1e23] text-zinc-500">{e.equipment}</span></div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#1e1e23] flex items-center justify-center text-[11px] mono text-zinc-500">{e.group.slice(0,2)}</div>
            </div>
            <p className="text-xs text-zinc-500 mt-3 leading-relaxed">{e.instructions}</p>
          </div>
        ))}
      </div>
      {filtered.length===0 && <p className="text-center text-sm text-zinc-500 py-10">No matches</p>}
    </div>
  )
}