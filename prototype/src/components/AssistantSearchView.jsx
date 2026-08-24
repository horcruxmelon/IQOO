import React, { useState } from 'react';
import { Search, MapPin, Calendar, FileText, X, Sparkles } from 'lucide-react';
import { MOCK_ROOM_PHOTOS } from '../data/mockData';

const SUGGESTIONS = [
  { label: "Goa beach trip", icon: MapPin },
  { label: "Photos with Me", icon: Sparkles },
  { label: "Wi-Fi password screenshot", icon: FileText },
  { label: "August 2026 memories", icon: Calendar },
];

export default function AssistantSearchView({ onSelectPhoto }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = (q) => {
    const term = q.toLowerCase();
    const filtered = MOCK_ROOM_PHOTOS.filter(p =>
      p.location?.toLowerCase().includes(term) ||
      p.tags?.some(t => t.toLowerCase().includes(term)) ||
      p.ocrText?.toLowerCase().includes(term) ||
      p.contributor?.toLowerCase().includes(term) ||
      p.timestamp?.toLowerCase().includes(term) ||
      ((term.includes("me") || term.includes("you")) && p.containsUser)
    );
    setResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2.5">
        <Search className="w-4 h-4 text-iqoo-yellow" />
        <div>
          <h2 className="text-sm font-bold">Ask Assistant</h2>
          <p className="text-[10px] text-neutral-400">Timeline + Location + On-Image OCR Text Search</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && runSearch(query)}
          placeholder={'Try: "Goa trip" or "Wi-Fi password"'}
          className="w-full bg-neutral-900 border border-neutral-800 focus:border-iqoo-yellow rounded-2xl px-4 py-3 pr-20 text-sm text-white placeholder:text-neutral-500 outline-none transition"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); setHasSearched(false); }}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => runSearch(query)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-iqoo-yellow text-black hover:bg-yellow-400 transition"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {!hasSearched && (
        <div className="space-y-2">
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Suggested Searches</span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => { setQuery(s.label); runSearch(s.label); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-iqoo-yellow/50 text-xs text-neutral-300 hover:text-white transition"
              >
                <s.icon className="w-3 h-3 text-iqoo-yellow" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 mt-2">
            <p className="text-[11px] font-bold text-neutral-300">How the AI Search Engine Works:</p>
            <div className="space-y-1.5 text-[10px] text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-iqoo-yellow shrink-0 mt-0.5" />
                <span><strong className="text-white">Location:</strong> EXIF GPS + Manual Location Tags</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-3 h-3 text-iqoo-yellow shrink-0 mt-0.5" />
                <span><strong className="text-white">Timeline:</strong> EXIF Date/Time + Room Timestamps</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-3 h-3 text-iqoo-yellow shrink-0 mt-0.5" />
                <span><strong className="text-white">OCR:</strong> ML Kit offline text scan to FTS5 Room DB index</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-3 h-3 text-iqoo-yellow shrink-0 mt-0.5" />
                <span><strong className="text-white">Face:</strong> FaceNet embedding match for Me queries</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300">
              {results.length > 0 ? `Results for "${query}"` : `No results for "${query}"`}
            </span>
            <span className="text-[10px] text-iqoo-yellow font-semibold">12ms on NPU</span>
          </div>

          {results.length === 0 ? (
            <div className="p-6 flex flex-col items-center text-center space-y-2 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <Search className="w-8 h-8 text-neutral-700" />
              <p className="text-sm text-neutral-400">No photos matched your query.</p>
              <p className="text-[11px] text-neutral-500">Try: Goa, beach, PAN card, Wi-Fi</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {results.map(photo => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="relative h-36 rounded-xl overflow-hidden border border-neutral-800 group cursor-pointer hover:border-iqoo-yellow/50 transition"
                >
                  <img src={photo.url} alt="Result" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {photo.containsUser && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-iqoo-yellow text-black text-[9px] font-extrabold">
                      YOU
                    </div>
                  )}

                  <div className="absolute bottom-1.5 left-2 right-2 space-y-0.5">
                    <p className="text-[10px] font-bold text-white truncate">{photo.location}</p>
                    {photo.ocrText && (
                      <p className="text-[9px] text-iqoo-yellow truncate font-mono">"{photo.ocrText}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}