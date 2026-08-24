import React, { useState } from 'react';
import { Search, MapPin, Calendar, FileText, X, Sparkles, Fingerprint, ShieldCheck, Copy, Check } from 'lucide-react';
import { MOCK_ROOM_PHOTOS, MOCK_VAULT_ITEMS } from '../data/mockData';

const SUGGESTIONS = [
  { label: "Goa beach trip", icon: MapPin },
  { label: "Photos with Me", icon: Sparkles },
  { label: "Wi-Fi password screenshot", icon: FileText },
  { label: "August 2026 memories", icon: Calendar },
];

const matchesQuery = (haystack, term) => {
  const words = term.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = haystack.toLowerCase();
  return words.some(w => hay.includes(w));
};

export default function AssistantSearchView({ onSelectPhoto }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [vaultResults, setVaultResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [unlockingId, setUnlockingId] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  const runSearch = (q) => {
    const term = q.trim();
    if (!term) return;

    const filteredPhotos = MOCK_ROOM_PHOTOS.filter(p => {
      const haystack = [p.location, p.tags?.join(' '), p.ocrText, p.contributor, p.timestamp, p.containsUser ? 'me you' : '']
        .filter(Boolean).join(' ');
      return matchesQuery(haystack, term);
    });

    const filteredVault = MOCK_VAULT_ITEMS.filter(v => {
      const haystack = [v.title, v.type, v.ocrData?.ssid].filter(Boolean).join(' ');
      return matchesQuery(haystack, term);
    });

    setResults(filteredPhotos);
    setVaultResults(filteredVault);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setVaultResults([]);
    setHasSearched(false);
    setUnlockingId(null);
    setUnlockedIds(new Set());
  };

  const handleUnlock = (id) => {
    setUnlockingId(id);
    setTimeout(() => {
      setUnlockingId(null);
      setUnlockedIds(prev => new Set(prev).add(id));
    }, 700);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalResults = results.length + vaultResults.length;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2.5">
        <Search className="w-4 h-4 text-iqoo-yellow" />
        <h2 className="text-sm font-bold">Ask</h2>
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
            onClick={clearSearch}
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
        </div>
      )}

      {hasSearched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300">
              {totalResults > 0 ? `Results for "${query}"` : `No results for "${query}"`}
            </span>
          </div>

          {totalResults === 0 ? (
            <div className="p-6 flex flex-col items-center text-center space-y-2 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <Search className="w-8 h-8 text-neutral-700" />
              <p className="text-sm text-neutral-400">No photos matched your query.</p>
              <p className="text-[11px] text-neutral-500">Try: Goa, beach, PAN card, Wi-Fi</p>
            </div>
          ) : (
            <>
              {vaultResults.length > 0 && (
                <div className="space-y-2">
                  {vaultResults.map(item => {
                    const isUnlocked = unlockedIds.has(item.id);
                    const isUnlocking = unlockingId === item.id;
                    const secret = item.ocrData.password || item.ocrData.idNumber;
                    return (
                      <div key={item.id} className="p-3 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{item.title}</span>
                          </span>
                          <span className="text-[9px] text-neutral-500 font-mono">{item.encryptedHash}</span>
                        </div>

                        {!isUnlocked ? (
                          <button
                            onClick={() => handleUnlock(item.id)}
                            disabled={isUnlocking}
                            className="w-full py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-300 hover:border-iqoo-yellow/50 transition disabled:opacity-70"
                          >
                            <Fingerprint className={`w-4 h-4 text-iqoo-yellow ${isUnlocking ? 'animate-pulse' : ''}`} />
                            <span>{isUnlocking ? 'Verifying fingerprint...' : 'Tap to authenticate & reveal'}</span>
                          </button>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              {item.ocrData.ssid && (
                                <p className="text-[10px] text-neutral-500 truncate">{item.ocrData.ssid}</p>
                              )}
                              <p className="text-[12px] font-mono font-bold text-iqoo-yellow truncate">{secret}</p>
                            </div>
                            <button
                              onClick={() => handleCopy(secret, item.id)}
                              className="shrink-0 px-2 py-1 rounded bg-black/70 hover:bg-black text-[10px] text-white flex items-center gap-1 border border-neutral-700"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {results.length > 0 && (
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
