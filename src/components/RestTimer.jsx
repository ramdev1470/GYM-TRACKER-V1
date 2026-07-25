import { useEffect, useState, useRef } from 'react'
import { Timer, Play, Pause, RotateCcw, X } from 'lucide-react'

const PRESETS = [30,60,90,120,180]

export default function RestTimer({ onClose, autoStart=0 }){
  const [total,setTotal] = useState(autoStart||60)
  const [left,setLeft] = useState(autoStart||60)
  const [running,setRunning] = useState(!!autoStart)
  const ref = useRef(null)

  useEffect(()=>{ if(autoStart){ setTotal(autoStart); setLeft(autoStart); setRunning(true) } },[autoStart])

  useEffect(()=>{
    if(!running) return
    ref.current = setInterval(()=>{
      setLeft(l=>{
        if(l<=1){ clearInterval(ref.current); setRunning(false); try{ new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==').play() }catch{}; return 0 }
        return l-1
      })
    },1000)
    return ()=>clearInterval(ref.current)
  },[running])

  const pct = total ? ((total-left)/total)*100 : 0
  const mm = String(Math.floor(left/60)).padStart(2,'0')
  const ss = String(left%60).padStart(2,'0')
  const done = left===0

  return (
    <div className="fixed bottom-0 inset-x-0 lg:left-[240px] z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[440px] m-3 rounded-[20px] bg-[#1a1a1e] border border-[#2a2a30] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium"><Timer className="w-4 h-4"/>Rest Timer</div>
          {onClose && <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#26262c] flex items-center justify-center text-zinc-400 hover:text-white"><X className="w-4 h-4"/></button>}
        </div>

        <div className="flex flex-col items-center py-3">
          <div className="relative w-[140px] h-[140px]">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#26262c" strokeWidth="8"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke={done?'#22c55e':'#ff4d11'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2*Math.PI*54}`} strokeDashoffset={`${2*Math.PI*54*(1-pct/100)}`} className="transition-all duration-500"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`mono text-[32px] font-bold ${done?'text-green-400':''}`}>{mm}:{ss}</span>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest">{done?'Done!': running ? 'Resting' : 'Paused'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button onClick={()=>setRunning(r=>!r)} className="w-12 h-12 rounded-full bg-[#ff4d11] text-white flex items-center justify-center">{running?<Pause className="w-5 h-5"/>:<Play className="w-5 h-5 ml-0.5"/>}</button>
            <button onClick={()=>{ setLeft(total); setRunning(false) }} className="w-10 h-10 rounded-full bg-[#26262c] text-zinc-300 flex items-center justify-center"><RotateCcw className="w-4 h-4"/></button>
          </div>

          <div className="flex gap-1.5 mt-4">
            {PRESETS.map(p=><button key={p} onClick={()=>{ setTotal(p); setLeft(p); setRunning(true) }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${total===p ? 'bg-[#ff4d11] text-white border-[#ff4d11]' : 'bg-[#26262c] text-zinc-400 border-[#2a2a30] hover:text-zinc-200'}`}>{p<60?`${p}s`: `${Math.floor(p/60)}m`}</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}