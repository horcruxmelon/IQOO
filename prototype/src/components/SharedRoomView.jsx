import React, { useState } from 'react';
import { Users, UploadCloud, Sparkles, UserCheck, Image, ShieldAlert, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SharedRoomView({ roomPhotos, onDumpPhotos, onSelectPhoto, onOpenBlurDups }) {
  const [isScanning, setIsScanning] = useState(false);
  const roomCode = 'IQOO-779';

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
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border border-neutral-800 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-iqoo-yellow/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Live Shared Room</span>
          </div>
          <span className="text-xs font-mono font-bold bg-neutral-800/80 px-2 py-0.5 rounded text-iqoo-yellow border border-neutral-700">
            {roomCode}
          </span>
        </div>

        <h2 className="text-base font-bold text-white">Goa Weekend Trip 2026</h2>
        <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-neutral-400" />
          <span>4 Friends Connected | Zero Cloud Data Used (P2P)</span>
        </p>

        <div className="mt-3 flex gap-2">
          <button 
            onClick={handleSimulateDump}
            disabled={isScanning}
            className="flex-1 py-2 px-3 rounded-xl bg-iqoo-yellow text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-yellow-400 transition shadow-md active:scale-95 disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isScanning ? 'Syncing & Matching Face...' : 'Dump 3 Friend Photos'}</span>
          </button>
        </div>
      </div>

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-lg bg-iqoo-yellow/20 text-iqoo-yellow">
              <Sparkles className="w-3.5 h-3.5 fill-iqoo-yellow" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              You are In This Too <span className="text-iqoo-yellow">({photosWithUser.length})</span>
            </h3>
          </div>
          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-emerald-400" /> FaceNet Matched
          </span>
        </div>

        <p className="text-[11px] text-neutral-400 leading-tight">
          Candids & portraits of <strong>YOU</strong> captured by friends phones, automatically separated:
        </p>

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
                <span>{photo.userMatchConfidence}% YOU</span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 text-left">
                <p className="text-[11px] font-bold text-white truncate leading-none">By {photo.contributor}</p>
                <p className="text-[9px] text-neutral-300 truncate mt-0.5">{photo.location}</p>
              </div>
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
              <img src={photo.url} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-1.5 left-2 right-2">
                <p className="text-[10px] font-medium text-white truncate">{photo.contributor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}