import React from 'react';

export default function NavMenu({ features, activeTab, onSelect, onClose }) {
  return (
    <>
      <div className="absolute inset-0 z-40" onClick={onClose} />
      <div className="absolute top-11 right-3 z-50 w-52 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden">
        {features.map(f => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-3 text-left border-b border-neutral-800/70 last:border-0 transition ${
              activeTab === f.id ? 'bg-neutral-800/80' : 'hover:bg-neutral-800/50'
            }`}
          >
            <span className={`p-1.5 rounded-lg ${activeTab === f.id ? 'bg-iqoo-yellow text-black' : 'bg-neutral-800 text-iqoo-yellow'}`}>
              <f.Icon className="w-3.5 h-3.5" />
            </span>
            <span>
              <p className="text-xs font-bold text-white leading-none">{f.label}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5 leading-none">{f.sub}</p>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
