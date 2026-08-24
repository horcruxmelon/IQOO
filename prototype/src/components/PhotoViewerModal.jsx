import React, { useState } from 'react';
import { ArrowLeft, Heart, Palette, Share2, MapPin, Clock, ShieldAlert, Sparkles } from 'lucide-react';

export default function PhotoViewerModal({ photo, onClose, onGoToStyle }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black to-transparent absolute top-0 left-0 right-0 z-10">
        <button onClick={onClose} className="p-2 rounded-full bg-black/50 border border-white/20 text-white">
          <ArrowLeft className="w-4 h-4" />
        </button>

        {photo.containsUser && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-iqoo-yellow text-black text-[10px] font-extrabold">
            <Sparkles className="w-3 h-3 fill-black" />
            <span>Matched — YOU</span>
          </div>
        )}
        <div className="w-8" />
      </div>

      <img src={photo.url} alt="Viewed" className="w-full flex-1 object-cover" />

      <div className="bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-6 pt-10 space-y-3">
        <div className="flex flex-wrap gap-1">
          {photo.tags?.map(tag => (
            <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              tag === "You" ? "bg-iqoo-yellow/20 text-iqoo-yellow border-iqoo-yellow/40" : "bg-white/10 text-white border-white/20"
            }`}>{tag}</span>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-white flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-iqoo-yellow" /> {photo.location}
          </p>
          <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3 h-3" /> {photo.timestamp}{photo.contributor ? ` | By ${photo.contributor}` : ''}
          </p>
        </div>

        {photo.ocrText && (
          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-neutral-400">OCR Text Detected:</p>
              <p className="text-[11px] font-mono text-amber-200">{photo.ocrText}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition border ${
              liked ? "bg-red-500/20 border-red-500/50 text-red-400" : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span>{liked ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={onGoToStyle}
            className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold bg-iqoo-yellow text-black border border-iqoo-yellow transition hover:bg-yellow-400 active:scale-95"
          >
            <Palette className="w-4 h-4" />
            <span>Stylize</span>
          </button>

          <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}