import React from 'react';
import { Wifi, Battery, Zap, Laptop } from 'lucide-react';

export default function PhoneFrame({ children, onOpenOfficeKit, isMonsterMode, setIsMonsterMode }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 py-8 text-white font-sans">
      {/* Desktop Header */}
      <header className="w-full max-w-md mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-iqoo-yellow flex items-center justify-center text-black font-black text-sm tracking-tighter">
            R
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              Reliq <span className="text-[10px] px-2 py-0.5 rounded-full bg-iqoo-yellow/10 text-iqoo-yellow border border-iqoo-yellow/30">iQOO 12 Edition</span>
            </h1>
            <p className="text-xs text-neutral-400">On-Device Zero-Cloud AI Gallery</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMonsterMode(!isMonsterMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isMonsterMode 
                ? 'bg-iqoo-orange text-white border-iqoo-orange shadow-lg shadow-iqoo-orange/20' 
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isMonsterMode ? 'fill-current animate-bounce' : ''}`} />
            <span>Monster NPU: {isMonsterMode ? 'Active' : 'Off'}</span>
          </button>

          <button 
            onClick={onOpenOfficeKit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white border border-neutral-700 transition"
          >
            <Laptop className="w-3.5 h-3.5 text-iqoo-yellow" />
            <span>Vivo Office Kit</span>
          </button>
        </div>
      </header>

      {/* Phone Frame - Original 820px Mockup */}
      <div className="relative w-full max-w-[390px] h-[820px] bg-black rounded-[48px] border-[10px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10 shrink-0">
        
        {/* Punch Hole */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
          <div className="w-4 h-4 rounded-full bg-black border border-neutral-800"></div>
        </div>

        {/* Status Bar */}
        <div className="h-9 px-6 pt-2 flex items-center justify-between text-[11px] font-semibold text-neutral-300 z-40 bg-gradient-to-b from-black/80 to-transparent select-none shrink-0">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span className="text-[9px] px-1 py-0.5 rounded bg-neutral-800 text-iqoo-yellow font-mono font-bold">120Hz</span>
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3 h-3" />
            <div className="flex items-center gap-0.5">
              <Battery className="w-4 h-4 fill-white" />
              <span className="text-[10px]">100%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950 min-h-0">
          {children}
        </div>

        {/* Bottom Gesture Bar */}
        <div className="h-5 bg-black flex items-center justify-center z-40 shrink-0">
          <div className="w-32 h-1 rounded-full bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
}