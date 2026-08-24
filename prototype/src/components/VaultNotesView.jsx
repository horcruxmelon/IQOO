import React, { useState } from 'react';
import { Lock, Fingerprint, ShieldCheck, FileText, Copy, Check, Sparkles } from 'lucide-react';

export default function VaultNotesView({ vaultItems, onOpenOfficeKit }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState('vault');
  const [copiedId, setCopiedId] = useState(null);

  const handleFingerprintAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsUnlocked(true);
    }, 700);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isUnlocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center text-white space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-iqoo-yellow shadow-2xl">
          <Lock className="w-8 h-8 text-iqoo-yellow" />
        </div>

        <h2 className="text-base font-bold text-white">Vault</h2>

        <button
          onClick={handleFingerprintAuth}
          disabled={isAuthenticating}
          className="relative group p-5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-iqoo-yellow transition active:scale-95 flex items-center justify-center cursor-pointer shadow-lg"
        >
          <Fingerprint className={`w-12 h-12 ${isAuthenticating ? 'text-iqoo-yellow animate-pulse' : 'text-neutral-400 group-hover:text-iqoo-yellow'}`} />
          {isAuthenticating && (
            <span className="absolute inset-0 rounded-full border-2 border-iqoo-yellow animate-ping"></span>
          )}
        </button>

        <p className="text-[11px] text-neutral-500 font-mono">
          {isAuthenticating ? 'Verifying...' : 'Tap to unlock'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 py-3 space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vault</span>
          </h2>
        </div>
        <button 
          onClick={() => setIsUnlocked(false)}
          className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock</span>
        </button>
      </div>

      <div className="flex p-1 rounded-xl bg-neutral-900 border border-neutral-800">
        <button 
          onClick={() => setActiveTab('vault')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'vault' ? 'bg-iqoo-yellow text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted IDs ({vaultItems.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'notes' ? 'bg-iqoo-yellow text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Extracted Notes</span>
        </button>
      </div>

      {activeTab === 'vault' && (
        <div className="space-y-3">
          <div className="space-y-2.5">
            {vaultItems.map(item => (
              <div key={item.id} className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {item.type}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono">{item.encryptedHash}</span>
                </div>

                <div className="relative h-28 rounded-xl overflow-hidden border border-neutral-800">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-iqoo-yellow">
                      {item.ocrData.idNumber || item.ocrData.ssid}
                    </span>
                    <button 
                      onClick={() => handleCopy(item.ocrData.idNumber || item.ocrData.password, item.id)}
                      className="px-2 py-1 rounded bg-black/70 hover:bg-black text-[10px] text-white flex items-center gap-1 border border-neutral-700"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-iqoo-yellow" />
                <span>credentials_vault.txt</span>
              </h3>
              <span className="text-[9px] text-neutral-500">Auto-Generated</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                  <span>[AADHAAR CARD]</span>
                  <button onClick={() => handleCopy("XXXX XXXX 8921", "aadhaar")} className="hover:text-white text-iqoo-yellow">
                    {copiedId === "aadhaar" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-white font-semibold">UID: XXXX XXXX 8921</p>
              </div>

              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                  <span>[PAN CARD]</span>
                  <button onClick={() => handleCopy("ABCDE1234F", "pan")} className="hover:text-white text-iqoo-yellow">
                    {copiedId === "pan" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-white font-semibold">PAN: ABCDE1234F</p>
              </div>

              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                  <span>[WI-FI CREDENTIALS]</span>
                  <button onClick={() => handleCopy("SuperSecretPassword#2026", "wifi")} className="hover:text-white text-iqoo-yellow">
                    {copiedId === "wifi" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-white font-semibold">SSID: iQOO_HyperNet_5G</p>
                <p className="text-iqoo-yellow text-[10px]">Password: SuperSecretPassword#2026</p>
              </div>
            </div>

            <button 
              onClick={onOpenOfficeKit}
              className="w-full py-2 rounded-xl border border-iqoo-yellow/30 text-iqoo-yellow text-xs font-bold hover:bg-iqoo-yellow/10 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sync to PC via Vivo Office Kit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}