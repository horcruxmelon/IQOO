import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import SharedRoomView from './components/SharedRoomView';
import BlurDuplicateView from './components/BlurDuplicateView';
import VaultNotesView from './components/VaultNotesView';
import StyleTransferView from './components/StyleTransferView';
import MemoriesView from './components/MemoriesView';
import AssistantSearchView from './components/AssistantSearchView';
import PhotoViewerModal from './components/PhotoViewerModal';
import OfficeKitPanel from './components/OfficeKitPanel';
import { MOCK_ROOM_PHOTOS, MOCK_VAULT_ITEMS } from './data/mockData';
import { Users, Shield, Palette, Sparkles, Search, Zap, SlidersHorizontal } from 'lucide-react';

const TABS = [
  { id: 'room', label: 'Room', Icon: Users },
  { id: 'vault', label: 'Vault', Icon: Shield },
  { id: 'style', label: 'Style AI', Icon: Palette },
  { id: 'memories', label: 'Memories', Icon: Sparkles },
  { id: 'search', label: 'Assistant', Icon: Search },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('room');
  const [roomPhotos, setRoomPhotos] = useState(MOCK_ROOM_PHOTOS.slice(0, 5));
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showBlurDups, setShowBlurDups] = useState(false);
  const [showOfficeKit, setShowOfficeKit] = useState(false);
  const [isMonsterMode, setIsMonsterMode] = useState(false);

  const handleDumpPhotos = () => {
    setRoomPhotos(MOCK_ROOM_PHOTOS);
  };

  const handleCleanAll = () => {
    setRoomPhotos(prev => prev.filter(p => !p.isBlurry && !p.isDuplicate));
    setShowBlurDups(false);
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleGoToStyle = () => {
    setSelectedPhoto(null);
    setActiveTab('style');
  };

  return (
    <PhoneFrame
      onOpenOfficeKit={() => setShowOfficeKit(true)}
      isMonsterMode={isMonsterMode}
      setIsMonsterMode={setIsMonsterMode}
    >
      {/* App Bar */}
      <div className="px-4 pt-1.5 pb-2 flex items-center justify-between shrink-0 bg-neutral-950">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-iqoo-yellow flex items-center justify-center text-black font-black text-sm">
            iQ
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-tight leading-none">PrivaSync AI</h1>
            <p className="text-[9px] text-neutral-500 leading-none mt-0.5">On-Device Zero-Cloud Gallery</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isMonsterMode && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-iqoo-orange/20 border border-iqoo-orange/40 text-[9px] font-bold text-iqoo-orange">
              <Zap className="w-2.5 h-2.5 fill-iqoo-orange" />
              <span>NPU</span>
            </div>
          )}
          <button
            onClick={() => setShowOfficeKit(true)}
            className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-iqoo-yellow transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex px-3 pb-1 gap-1 shrink-0 overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowBlurDups(false); }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition border ${
              activeTab === tab.id
                ? "bg-iqoo-yellow text-black border-transparent shadow"
                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
            }`}
          >
            <tab.Icon className="w-3 h-3" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {activeTab === "room" && !showBlurDups && (
          <SharedRoomView
            roomPhotos={roomPhotos}
            onDumpPhotos={handleDumpPhotos}
            onSelectPhoto={handleSelectPhoto}
            onOpenBlurDups={() => setShowBlurDups(true)}
          />
        )}

        {activeTab === "room" && showBlurDups && (
          <BlurDuplicateView
            photos={roomPhotos}
            onCleanAll={handleCleanAll}
            onBack={() => setShowBlurDups(false)}
          />
        )}

        {activeTab === "vault" && (
          <VaultNotesView
            vaultItems={MOCK_VAULT_ITEMS}
            onOpenOfficeKit={() => setShowOfficeKit(true)}
          />
        )}

        {activeTab === "style" && (
          <StyleTransferView isMonsterMode={isMonsterMode} />
        )}

        {activeTab === "memories" && (
          <MemoriesView />
        )}

        {activeTab === "search" && (
          <AssistantSearchView onSelectPhoto={handleSelectPhoto} />
        )}

        {selectedPhoto && (
          <PhotoViewerModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onGoToStyle={handleGoToStyle}
          />
        )}

        {showOfficeKit && (
          <OfficeKitPanel onClose={() => setShowOfficeKit(false)} />
        )}
      </div>
    </PhoneFrame>
  );
}