import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Dumbbell, LayoutDashboard, ClipboardList, Library, History, TrendingUp, Zap } from 'lucide-react'

const NAV = [
  { to:'/', label:'Dashboard', icon: LayoutDashboard },
  { to:'/log', label:'Workout', icon: ClipboardList },
  { to:'/plans', label:'Plans', icon: Zap },
  { to:'/exercises', label:'Exercises', icon: Library },
  { to:'/history', label:'History', icon: History },
  { to:'/progress', label:'Progress', icon: TrendingUp },
]

export default function Layout(){
  const loc = useLocation()
  const isLog = loc.pathname === '/log'
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[240px] flex-col border-r border-[#1e1e23] bg-[#0f0f10] z-20">
        <div className="flex items-center gap-2.5 px-6 h-[64px] border-b border-[#1e1e23]">
          <div className="w-8 h-8 rounded-lg bg-[#ff4d11] flex items-center justify-center"><Dumbbell className="w-4 h-4 text-white"/></div>
          <span className="font-bold tracking-tight text-[18px]">GymFlow</span>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#ff4d11]/20 text-[#ff6a33] mono font-bold">v1</span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({to,label,icon:Icon})=>{
            const active = to==='/' ? loc.pathname==='/' : loc.pathname.startsWith(to)
            return <NavLink key={to} to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition ${active?'bg-white text-black':'text-zinc-400 hover:bg-[#1c1c20] hover:text-zinc-100'}`}><Icon className="w-[18px] h-[18px]"/>{label}</NavLink>
          })}
        </nav>
        <div className="p-4 border-t border-[#1e1e23]">
          <div className="rounded-xl bg-gradient-to-br from-[#ff4d11] to-[#ff8a00] p-4">
            <p className="text-[13px] font-bold text-black/80">Stay consistent</p>
            <p className="text-[12px] text-black/60 mt-1">Log every set — progress is built over weeks.</p>
          </div>
        </div>
      </aside>

      {/* Top bar mobile */}
      <div className="lg:hidden sticky top-0 z-20 flex items-center gap-2 px-4 h-[56px] bg-[#0f0f10] border-b border-[#1e1e23]">
        <div className="w-7 h-7 rounded-lg bg-[#ff4d11] flex items-center justify-center"><Dumbbell className="w-3.5 h-3.5 text-white"/></div>
        <span className="font-bold">GymFlow</span>
      </div>

      {/* Main */}
      <main className={`lg:ml-[240px] ${isLog?'pb-0 lg:pb-0':'pb-[72px] lg:pb-0'} min-h-screen`}>
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-6">
          <Outlet/>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around bg-[#0f0f10]/95 backdrop-blur border-t border-[#1e1e23] px-2 py-1.5">
        {NAV.map(({to,label,icon:Icon})=>{
          const active = to==='/' ? loc.pathname==='/' : loc.pathname.startsWith(to)
          return <NavLink key={to} to={to} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-[10px] font-medium ${active?'text-[#ff4d11]':'text-zinc-500'}`}><Icon className="w-[20px] h-[20px]"/>{label.split(' ')[0]}</NavLink>
        })}
      </nav>
    </div>
  )
}