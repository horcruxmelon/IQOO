import React from 'react';
import { X, Laptop, Smartphone, Zap, FileText, ArrowRight } from 'lucide-react';

export default function OfficeKitPanel({ onClose }) {
  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-end pb-0 text-white">
      <div className="w-full bg-neutral-900 border-t border-neutral-800 rounded-t-3xl p-5 space-y-4">
        <div className="w-12 h-1 rounded-full bg-neutral-700 mx-auto mb-1" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-iqoo-yellow/20">
              <Laptop className="w-4 h-4 text-iqoo-yellow" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Vivo Office Kit</h3>
              <p className="text-[10px] text-neutral-400">Cross-Device Sync & Handoff</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-iqoo-yellow" />
            <ArrowRight className="w-4 h-4 text-neutral-500" />
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-bold text-emerald-400">Connected</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: FileText, label: "Send Credentials to PC", sub: "credentials_vault.txt to Desktop", color: "text-iqoo-yellow" },
            { icon: Zap, label: "Mirror Gallery to PC Screen", sub: "Full-resolution handoff", color: "text-emerald-400" },
            { icon: FileText, label: "Copy Aadhaar ID to Clipboard", sub: "XXXX XXXX 8921", color: "text-blue-400" },
            { icon: Laptop, label: "Open Album in Browser", sub: "localhost:7777/room", color: "text-purple-400" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-600 active:scale-95 transition"
            >
              <item.icon className={`w-4 h-4 ${item.color} mb-2`} />
              <p className="text-[11px] font-bold text-white leading-tight">{item.label}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5 truncate">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}