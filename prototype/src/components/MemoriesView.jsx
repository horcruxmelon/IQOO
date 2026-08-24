import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Calendar, Play } from 'lucide-react';
import { MOCK_MEMORIES } from '../data/mockData';

export default function MemoriesView() {
  const [activeMemory, setActiveMemory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activeMemory) return;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          const nextSlide = currentSlide + 1;
          if (nextSlide < activeMemory.slides.length) {
            setCurrentSlide(nextSlide);
            return 0;
          } else {
            clearInterval(timer);
            setActiveMemory(null);
            setCurrentSlide(0);
            return 100;
          }
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [activeMemory, currentSlide]);

  if (activeMemory) {
    return (
      <div className="flex-1 relative flex flex-col overflow-hidden bg-black">
        <img
          src={activeMemory.slides[currentSlide]}
          alt="Memory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>

        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {activeMemory.slides.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: idx < currentSlide ? "100%" : idx === currentSlide ? `${progress}%` : "0%" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-7 left-4 right-4 z-10 mt-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-iqoo-yellow fill-iqoo-yellow" />
            <span className="text-xs font-bold text-white drop-shadow">{activeMemory.title}</span>
          </div>
          <p className="text-[10px] text-white/70 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {activeMemory.location}
          </p>
        </div>

        <button
          onClick={() => { setActiveMemory(null); setCurrentSlide(0); setProgress(0); }}
          className="absolute top-7 right-4 z-20 px-2.5 py-1 rounded-full bg-black/50 text-white text-[11px] font-bold border border-white/20"
        >
          Skip
        </button>

        <div className="absolute inset-0 flex z-10">
          <div className="flex-1" onClick={() => setCurrentSlide(s => Math.max(0, s - 1))} />
          <div className="flex-1" onClick={() => {
            const next = currentSlide + 1;
            if (next < activeMemory.slides.length) {
              setCurrentSlide(next);
              setProgress(0);
            } else {
              setActiveMemory(null);
              setCurrentSlide(0);
              setProgress(0);
            }
          }} />
        </div>

        <div className="absolute bottom-10 left-4 right-4 z-10">
          <p className="text-sm font-bold text-white drop-shadow">{activeMemory.title}</p>
          <p className="text-xs text-white/70 mt-1">{activeMemory.date} | {activeMemory.photoCount} photos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2.5">
        <Sparkles className="w-4 h-4 text-iqoo-yellow fill-iqoo-yellow" />
        <h2 className="text-sm font-bold">Memories</h2>
      </div>

      <div className="space-y-3">
        {MOCK_MEMORIES.map(mem => (
          <div
            key={mem.id}
            onClick={() => { setActiveMemory(mem); setCurrentSlide(0); setProgress(0); }}
            className="relative w-full h-44 rounded-2xl overflow-hidden border border-neutral-800 cursor-pointer group shadow-xl"
          >
            <img src={mem.cover} alt={mem.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-iqoo-yellow fill-iqoo-yellow" />
                <span className="text-xs font-extrabold text-white">{mem.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-neutral-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {mem.location} |
                  <Calendar className="w-3 h-3" /> {mem.date}
                </p>
                <span className="text-[10px] font-bold text-iqoo-yellow">{mem.photoCount} Photos</span>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-iqoo-yellow group-hover:border-transparent transition">
              <Play className="w-5 h-5 fill-white text-white group-hover:fill-black group-hover:text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}