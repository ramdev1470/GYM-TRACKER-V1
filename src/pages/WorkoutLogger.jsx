import { useState } from 'react'
import { useWorkouts } from '../hooks/useWorkouts'
import { EXERCISES } from '../data/exercises'
import RestTimer from '../components/RestTimer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Plus, Trash2, Check, Timer, Search, Save, Clock, Dumbbell } from 'lucide-react'

function exName(id){ return EXERCISES.find(e=>e.id===id)?.name||id }

export default function WorkoutLogger(){
  const { addWorkout } = useWorkouts()
  const nav = useNavigate()
  const location = useLocation()
  const initialExercises = location.state?.exercises?.map(id=>({ exerciseId:id, sets:[{weight:0,reps:8,completed:false}] })) || []

  const [name,setName]=useState(location.state?.name||'')
  const [exercises,setExercises]=useState(initialExercises)
  const [showPicker,setShowPicker]=useState(false)
  const [q,setQ]=useState('')
  const [timerSec,setTimerSec]=useState(0)
  const [showTimer,setShowTimer]=useState(false)
  const [startTime] = useState(()=>Date.now())

  const filtered = EXERCISES.filter(e=>{
    const s=q.toLowerCase()
    return e.name.toLowerCase().includes(s)|| e.group.toLowerCase().includes(s)
  }).slice(0,30)

  const addExercise=(id)=>{ setExercises(prev=>[...prev,{exerciseId:id, sets:[{weight:0,reps:8,completed:false}]}]); setShowPicker(false); setQ('') }
  const updateSet=(ei,si,field,val)=> setExercises(prev=>prev.map((ex,i)=> i!==ei?ex:{...ex, sets: ex.sets.map((s,j)=> j!==si? s : {...s,[field]:field==='completed'?val: Number(val)||0})}))
  const addSet=(ei)=> setExercises(prev=>prev.map((ex,i)=> i!==ei?ex:{...ex, sets:[...ex.sets,{weight:ex.sets[ex.sets.length-1]?.weight||0,reps:ex.sets[ex.sets.length-1]?.reps||8,completed:false}]}))
  const removeSet=(ei,si)=> setExercises(prev=>prev.map((ex,i)=> i!==ei?ex:{...ex, sets: ex.sets.filter((_,j)=>j!==si)}))
  const removeExercise=(ei)=> setExercises(prev=>prev.filter((_,i)=>i!==ei))
  const toggleComplete=(ei,si)=>{ const will = !exercises[ei].sets[si].completed; updateSet(ei,si,'completed',will); if(will){ setTimerSec(60); setShowTimer(true) } }
  const totalSets = exercises.reduce((a,ex)=>a+(ex.sets?.filter(s=>s.completed).length||0),0)
  const totalVolume = exercises.reduce((a,ex)=> a + ex.sets.filter(s=>s.completed).reduce((x,s)=>x+(s.weight||0)*(s.reps||0),0),0)

  const save=()=>{
    const valid = exercises.filter(ex=>ex.sets.some(s=>s.completed))
    if(valid.length===0){ alert('Complete at least one set'); return }
    const duration = Math.round((Date.now()-startTime)/1000)
    addWorkout({ name: name || `Workout ${new Date().toLocaleDateString()}`, exercises, duration })
    nav('/')
  }

  return (
    <div className="space-y-4 max-w-[760px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold">Workout Logger</h1>
        <div className="flex items-center gap-2 text-xs text-zinc-500"><Clock className="w-3.5 h-3.5"/>{Math.floor((Date.now()-startTime)/60000)} min</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Workout name (e.g., Push Day)" className="flex-1 h-11 px-4 rounded-xl bg-[#111113] border border-[#1e1e23] text-sm outline-none focus:border-[#ff4d11]/50 focus:ring-1 focus:ring-[#ff4d11]/20"/>
        <button onClick={save} className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff4d11] text-white text-sm font-semibold"><Save className="w-4 h-4"/>Finish</button>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span className="px-2.5 py-1 rounded-full bg-[#1e1e23] text-zinc-400 mono">{totalSets} sets done</span>
        <span className="px-2.5 py-1 rounded-full bg-[#1e1e23] text-zinc-400 mono">{(totalVolume/1000).toFixed(1)}k kg volume</span>
        <button onClick={()=>setShowTimer(true)} className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1e23] hover:bg-[#25252b] text-zinc-300"><Timer className="w-3.5 h-3.5"/>Timer</button>
      </div>

      <div className="space-y-3">
        {exercises.map((ex,ei)=>(
          <div key={ei} className="rounded-[18px] border border-[#1e1e23] bg-[#111113] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e23]">
              <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#1e1e23] flex items-center justify-center"><Dumbbell className="w-3.5 h-3.5 text-zinc-500"/></div><span className="font-semibold text-sm">{exName(ex.exerciseId)}</span></div>
              <button onClick={()=>removeExercise(ei)} className="text-zinc-600 hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
            </div>
            <div className="px-4 py-2">
              <div className="grid grid-cols-[36px_1fr_1fr_52px] gap-2 text-[11px] uppercase tracking-widest text-zinc-600 font-semibold py-2"><span>#</span><span>Kg</span><span>Reps</span><span className="text-center">Done</span></div>
              {ex.sets.map((s,si)=>(
                <div key={si} className={`grid grid-cols-[36px_1fr_1fr_52px] gap-2 items-center py-2 ${s.completed?'opacity-70':''}`}>
                  <span className="mono text-xs text-zinc-500">{si+1}</span>
                  <input type="number" value={s.weight} onChange={e=>updateSet(ei,si,'weight',e.target.value)} className="h-9 w-full px-2 rounded-lg bg-[#1a1a1e] border border-[#26262c] text-sm mono focus:border-[#ff4d11]/40 outline-none"/>
                  <input type="number" value={s.reps} onChange={e=>updateSet(ei,si,'reps',e.target.value)} className="h-9 w-full px-2 rounded-lg bg-[#1a1a1e] border border-[#26262c] text-sm mono focus:border-[#ff4d11]/40 outline-none"/>
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={()=>toggleComplete(ei,si)} className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${s.completed?'bg-[#ff4d11] border-[#ff4d11] text-white':'border-[#26262c] text-zinc-500 hover:text-white'}`}><Check className="w-4 h-4"/></button>
                    {ex.sets.length>1 && <button onClick={()=>removeSet(ei,si)} className="w-6 h-6 text-zinc-600 hover:text-red-400">×</button>}
                  </div>
                </div>
              ))}
              <button onClick={()=>addSet(ei)} className="mt-2 w-full h-9 rounded-xl bg-[#1a1a1e] border border-dashed border-[#26262c] text-xs font-medium text-zinc-400 hover:text-zinc-200">+ Add set</button>
            </div>
          </div>
        ))}

        <button onClick={()=>setShowPicker(true)} className="w-full h-[52px] rounded-[16px] border-2 border-dashed border-[#26262c] hover:border-[#ff4d11]/50 flex items-center justify-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-200"><Plus className="w-4 h-4"/>Add exercise</button>
      </div>

      {showPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="w-full sm:max-w-[520px] max-h-[85vh] rounded-t-[24px] sm:rounded-[20px] bg-[#141417] border border-[#26262c] overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-[#1e1e23] flex items-center justify-between"><h3 className="font-semibold">Add Exercise</h3><button onClick={()=>setShowPicker(false)} className="w-7 h-7 rounded-full bg-[#1e1e23] text-zinc-400 flex items-center justify-center">✕</button></div>
            <div className="p-3"><div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-[#1e1e23] border border-[#26262c]"><Search className="w-4 h-4 text-zinc-500"/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search exercises…" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
            <div className="flex-1 overflow-auto divide-y divide-[#1e1e23]">
              {filtered.map(e=><button key={e.id} onClick={()=>addExercise(e.id)} className="w-full text-left px-5 py-3 hover:bg-[#1a1a1e] flex items-center justify-between"><span><span className="text-sm font-medium">{e.name}</span><span className="text-[11px] text-zinc-500 ml-2">{e.group} • {e.equipment}</span></span><Plus className="w-4 h-4 text-zinc-500"/></button>)}
            </div>
          </div>
        </div>
      )}

      {showTimer && <RestTimer autoStart={timerSec||60} onClose={()=>setShowTimer(false)}/>}
    </div>
  )
}