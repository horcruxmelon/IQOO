import React from 'react';
import { Wifi, Battery, Zap, Laptop } from 'lucide-react';

export default function PhoneFrame({ children, onOpenOfficeKit, isMonsterMode, setIsMonsterMode }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-2 sm:p-6 text-white font-sans">
      <header className="w-full max-w-4xl mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-iqoo-yellow flex items-center justify-center text-black font-black text-lg tracking-tighter">
            iQ
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
              PrivaSync AI <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-iqoo-yellow/10 text-iqoo-yellow border border-iqoo-yellow/30">iQOO 12 Edition</span>
            </h1>
            <p className="text-xs text-neutral-400">On-Device Zero-Cloud AI Gallery & Shared Instant Space</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMonsterMode(!isMonsterMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isMonsterMode 
                ? 'bg-iqoo-orange text-white border-iqoo-orange shadow-lg shadow-iqoo-orange/30' 
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isMonsterMode ? 'fill-current animate-bounce' : ''}`} />
            <span>Monster NPU: {isMonsterMode ? 'Active (120 FPS)' : 'Standard'}</span>
          </button>

          <button 
            onClick={onOpenOfficeKit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white border border-neutral-700 transition"
          >
            <Laptop className="w-3.5 h-3.5 text-iqoo-yellow" />
            <span className="hidden sm:inline">Vivo Office Kit</span>
          </button>
        </div>
      </header>

      <div className="relative w-full max-w-[390px] h-[820px] bg-black rounded-[48px] border-[10px] border-neutral-800 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ring-1 ring-white/10">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-black border border-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 ring-1 ring-blue-900/50"></div>
          </div>
        </div>

        <div className="h-9 px-6 pt-2 flex items-center justify-between text-[11px] font-semibold text-neutral-300 z-40 bg-gradient-to-b from-black/80 to-transparent select-none">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="text-[9px] px-1 py-0.2 rounded bg-neutral-800 text-iqoo-yellow font-mono font-bold">120Hz</span>
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <Battery className="w-4 h-4 fill-white" />
              <span className="text-[10px]">100%</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
          {children}
        </div>

        <div className="h-5 bg-neutral-950 flex items-center justify-center z-40">
          <div className="w-32 h-1 rounded-full bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
}