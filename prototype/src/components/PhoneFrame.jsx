import React from 'react';
import { Wifi, Battery, Zap, Laptop } from 'lucide-react';

export default function PhoneFrame({ children, onOpenOfficeKit, isMonsterMode, setIsMonsterMode }) {
  return (
    <div className="h-screen w-screen bg-neutral-950 flex flex-col items-center justify-center p-0 sm:p-3 text-white font-sans overflow-hidden">
      {/* Desktop Header Bar (Hidden on physical mobile devices) */}
      <header className="hidden sm:flex w-full max-w-[390px] mb-2 items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-iqoo-yellow flex items-center justify-center text-black font-black text-xs tracking-tighter">
            R
          </div>
          <h1 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
            Reliq <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-iqoo-yellow/10 text-iqoo-yellow border border-iqoo-yellow/30">iQOO 12</span>
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setIsMonsterMode(!isMonsterMode)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
              isMonsterMode 
                ? 'bg-iqoo-orange text-white border-iqoo-orange shadow-md shadow-iqoo-orange/30' 
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            <Zap className={`w-3 h-3 ${isMonsterMode ? 'fill-current animate-bounce' : ''}`} />
            <span>{isMonsterMode ? 'Monster NPU' : 'Standard'}</span>
          </button>

          <button 
            onClick={onOpenOfficeKit}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[10px] font-medium text-white border border-neutral-700 transition"
          >
            <Laptop className="w-3 h-3 text-iqoo-yellow" />
            <span>Vivo Kit</span>
          </button>
        </div>
      </header>

      {/* Universal Adaptive Chassis: Edge-to-Edge on Mobile, Styled Frame on Desktop */}
      <div className="relative w-full sm:max-w-[370px] h-full sm:h-[calc(100vh-65px)] sm:max-h-[740px] bg-black sm:rounded-[38px] rounded-none sm:border-[7px] border-0 border-neutral-800 sm:shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col sm:ring-1 sm:ring-white/10 shrink-0">
        
        {/* Punch Hole Camera (Visible on desktop mockup) */}
        <div className="hidden sm:flex absolute top-1.5 left-1/2 -translate-x-1/2 z-50 items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 ring-1 ring-blue-900/50"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 px-5 pt-1.5 flex items-center justify-between text-[10px] font-semibold text-neutral-300 z-40 bg-gradient-to-b from-black/80 to-transparent select-none shrink-0">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="text-[8px] px-1 py-0.2 rounded bg-neutral-800 text-iqoo-yellow font-mono font-bold">120Hz</span>
            <span className="text-[9px] font-bold">5G</span>
            <Wifi className="w-2.5 h-2.5" />
            <div className="flex items-center gap-0.5">
              <Battery className="w-3.5 h-3.5 fill-white" />
              <span className="text-[9px]">100%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950 min-h-0">
          {children}
        </div>

        {/* Bottom Gesture Bar */}
        <div className="h-4 bg-neutral-950 flex items-center justify-center z-40 shrink-0">
          <div className="w-28 h-1 rounded-full bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
}