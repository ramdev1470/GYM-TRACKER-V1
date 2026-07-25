import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '../data/plans'
import { EXERCISES } from '../data/exercises'
import { ChevronDown, Play, Clock } from 'lucide-react'

function exName(id){ return EXERCISES.find(e=>e.id===id)?.name||id }

export default function Plans(){
  const [open,setOpen]=useState({})
  const nav=useNavigate()

  const startPlan=(plan, dayIndex)=>{
    const day = plan.schedule[dayIndex]
    nav('/log', { state: { name: `${plan.name} - ${day.day}`, exercises: day.exercises } })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[24px] font-bold">Workout Plans</h1>
        <p className="text-zinc-500 text-sm mt-1">Pre-built programs — tap Start to load into logger</p>
      </div>

      <div className="grid gap-4">
        {PLANS.map(plan=>(
          <div key={plan.id} className="rounded-[18px] border border-[#1e1e23] bg-[#111113] overflow-hidden">
            <button onClick={()=>setOpen(o=>({...o,[plan.id]:!o[plan.id]}))} className="w-full flex items-center justify-between p-5 text-left">
              <div>
                <div className="flex items-center gap-2"><h2 className="font-bold">{plan.name}</h2><span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e1e23] text-zinc-400 uppercase tracking-widest">{plan.level}</span></div>
                <p className="text-xs text-zinc-500 mt-1">{plan.description}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-600"><Clock className="w-3 h-3"/>{plan.days} days</div>
              </div>
              <ChevronDown className={`w-5 h-5 text-zinc-600 shrink-0 transition ${open[plan.id]?'rotate-180':''}`}/>
            </button>

            {open[plan.id] && (
              <div className="px-3 pb-4 space-y-3">
                {plan.schedule.map((day,di)=>(
                  <div key={di} className="rounded-[14px] bg-[#1a1a1e] border border-[#222227] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">{day.day}</p>
                      <button onClick={()=>startPlan(plan,di)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff4d11] text-white text-xs font-semibold"><Play className="w-3 h-3"/>Start</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {day.exercises.map(id=> <span key={id} className="text-[11px] px-2 py-1 rounded-full bg-[#222227] text-zinc-400">{exName(id)}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}