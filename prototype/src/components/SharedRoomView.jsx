import React, { useState } from 'react';
import { Users, UploadCloud, Sparkles, Image, ShieldAlert, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const MEMBER_COLORS = {
  Aarav: 'bg-blue-500',
  Priya: 'bg-pink-500',
  Vikram: 'bg-purple-500',
  Rohan: 'bg-iqoo-yellow text-black',
};

function MemberTag({ contributor }) {
  const firstName = contributor?.split(' ')[0] ?? '?';
  const color = MEMBER_COLORS[firstName] ?? 'bg-neutral-700';
  return (
    <div className={`absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full ring-2 ring-black/50 flex items-center justify-center text-[9px] font-extrabold ${color}`}>
      {firstName.charAt(0)}
    </div>
  );
}

export default function SharedRoomView({ roomPhotos, onDumpPhotos, onSelectPhoto, onOpenBlurDups }) {
  const [isScanning, setIsScanning] = useState(false);
  const spaceCode = 'IQOO-779';

  const photosWithUser = roomPhotos.filter(p => p.containsUser && !p.isDuplicate);
  const otherPhotos = roomPhotos.filter(p => !p.containsUser && !p.isBlurry && !p.isDuplicate);
  const blurAndDupsCount = roomPhotos.filter(p => p.isBlurry || p.isDuplicate).length;

  const handleSimulateDump = () => {
    setIsScanning(true);
    setTimeout(() => {
      onDumpPhotos();
      setIsScanning(false);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-3 text-white">
      {roomPhotos.length <= 5 ? (
        /* Full card — shown before dump */
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-800 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-iqoo-yellow/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-white">Goa Weekend Trip 2026</h2>
            <span className="text-xs font-mono font-bold bg-neutral-800/80 px-2 py-0.5 rounded text-iqoo-yellow border border-neutral-700">
              {spaceCode}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span>4 Friends Connected</span>
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSimulateDump}
              disabled={isScanning}
              className="flex-1 py-2 px-3 rounded-xl bg-iqoo-yellow text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-yellow-400 transition shadow-md active:scale-95 disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isScanning ? 'Syncing...' : 'Dump 3 Friend Photos'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Compact bar — shown after dump */
        <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-iqoo-yellow" />
            <span className="text-xs font-bold text-white">Goa Weekend Trip 2026</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-iqoo-yellow border border-neutral-700">
            {spaceCode} · 4 friends
          </span>
        </div>
      )}

      {blurAndDupsCount > 0 && (
        <div 
          onClick={onOpenBlurDups}
          className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-200 font-medium">
              <strong>{blurAndDupsCount} photos</strong> flagged as Blurry / Duplicates
            </span>
          </div>
          <span className="text-[11px] text-amber-400 font-bold flex items-center">
            Clean <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-lg bg-iqoo-yellow/20 text-iqoo-yellow">
            <Sparkles className="w-3.5 h-3.5 fill-iqoo-yellow" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Your Photos <span className="text-iqoo-yellow">({photosWithUser.length})</span>
          </h3>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {photosWithUser.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="relative shrink-0 w-36 h-48 rounded-2xl overflow-hidden border border-iqoo-yellow/40 group cursor-pointer hover:border-iqoo-yellow transition shadow-lg shadow-iqoo-yellow/10"
            >
              <img src={photo.url} alt="You" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-iqoo-yellow text-black text-[9px] font-extrabold flex items-center gap-0.5 shadow">
                <Sparkles className="w-2.5 h-2.5 fill-black" />
                <span>YOU</span>
              </div>

              <div className="absolute bottom-2 left-2 right-8 text-left">
                <p className="text-[9px] text-neutral-300 truncate mt-0.5">{photo.location}</p>
              </div>
              <MemberTag contributor={photo.contributor} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-neutral-400" />
            <span>Other Group & Scenery Shots ({otherPhotos.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {otherPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="relative h-32 rounded-xl overflow-hidden border border-neutral-800 group cursor-pointer hover:border-neutral-600 transition"
            >
              <img src={photo.url} alt="Shared" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <MemberTag contributor={photo.contributor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}