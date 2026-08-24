import React from 'react';
import { ArrowLeft, Trash2, ShieldAlert, Copy } from 'lucide-react';

export default function BlurDuplicateView({ photos, onCleanAll, onBack }) {
  const blurryPhotos = photos.filter(p => p.isBlurry);
  const duplicatePhotos = photos.filter(p => p.isDuplicate);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-bold tracking-tight">AI Storage Cleaner</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-400">Total Flagged Items</span>
          <span className="text-xs font-bold text-amber-400">{blurryPhotos.length + duplicatePhotos.length} Photos</span>
        </div>

        <button
          onClick={onCleanAll}
          className="mt-3 w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-red-600/20 active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clean All & Free 38 MB</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Blurry / Shaky Shots ({blurryPhotos.length})
          </h3>
        </div>

        {blurryPhotos.length === 0 ? (
          <p className="text-xs text-neutral-500 italic p-3 bg-neutral-900/50 rounded-xl">No blurry photos found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {blurryPhotos.map(p => (
              <div key={p.id} className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                <img src={p.url} alt="Blurry" className="w-full h-28 object-cover opacity-75" />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-500/90 text-[9px] font-bold text-white">
                  Blurry
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <Copy className="w-4 h-4 text-iqoo-yellow" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Identical Duplicates ({duplicatePhotos.length})
          </h3>
        </div>

        {duplicatePhotos.length === 0 ? (
          <p className="text-xs text-neutral-500 italic p-3 bg-neutral-900/50 rounded-xl">No duplicate photos detected.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {duplicatePhotos.map(p => (
              <div key={p.id} className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
                <img src={p.url} alt="Duplicate" className="w-full h-28 object-cover" />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-500/90 text-[9px] font-bold text-white">
                  Duplicate
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}