import React, { useState } from 'react';
import { Palette, Sparkles, Cpu, Download, Wand2 } from 'lucide-react';
import { MOCK_STYLE_PRESETS } from '../data/mockData';

export default function StyleTransferView({ isMonsterMode }) {
  const [selectedPreset, setSelectedPreset] = useState(MOCK_STYLE_PRESETS[0]);
  const [selectedPhoto, setSelectedPhoto] = useState("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80");
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePhotos = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80"
  ];

  const handleApplyStyle = (preset) => {
    setSelectedPreset(preset);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, isMonsterMode ? 280 : 650);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <h2 className="text-sm font-bold flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-iqoo-yellow" />
          <span>Reimagine</span>
        </h2>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-emerald-400">
          <Cpu className="w-3 h-3 text-iqoo-orange" />
          <span>On-Device</span>
        </div>
      </div>

      <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
        <img 
          src={selectedPhoto} 
          alt="Original" 
          className="w-full h-full object-cover transition-all duration-300"
          style={{
            filter: selectedPreset ? selectedPreset.filterCss : 'none',
            opacity: isProcessing ? 0.4 : 1
          }}
        />

        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
            <Wand2 className="w-8 h-8 text-iqoo-yellow animate-spin" />
            <span className="text-xs font-bold text-white mt-2">Generating art on-device...</span>
          </div>
        )}

        <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-semibold text-white backdrop-blur-md">
          {selectedPreset ? selectedPreset.name : 'Original'}
        </div>

        <button className="absolute bottom-2 right-2.5 p-1.5 rounded-full bg-iqoo-yellow text-black shadow-lg hover:scale-105 active:scale-95 transition">
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] text-neutral-400">Pick Photo:</span>
        <div className="flex gap-2">
          {samplePhotos.map((url, idx) => (
            <img 
              key={idx}
              src={url} 
              alt="sample" 
              onClick={() => setSelectedPhoto(url)}
              className={`w-14 h-14 rounded-xl object-cover cursor-pointer border-2 transition ${
                selectedPhoto === url ? 'border-iqoo-yellow scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Style Presets</span>

        <div className="grid grid-cols-2 gap-2">
          {MOCK_STYLE_PRESETS.map((preset) => (
            <div 
              key={preset.id}
              onClick={() => handleApplyStyle(preset)}
              className={`p-2.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                selectedPreset.id === preset.id 
                  ? 'bg-neutral-900 border-iqoo-yellow shadow-lg shadow-iqoo-yellow/10 ring-1 ring-iqoo-yellow' 
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white">{preset.name}</span>
                {selectedPreset.id === preset.id && <Sparkles className="w-3 h-3 text-iqoo-yellow fill-iqoo-yellow" />}
              </div>
              <p className="text-[10px] text-neutral-400 line-clamp-1">{preset.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}