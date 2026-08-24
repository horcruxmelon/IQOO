import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import GalleryView from './components/GalleryView';
import NavMenu from './components/NavMenu';
import SharedRoomView from './components/SharedRoomView';
import BlurDuplicateView from './components/BlurDuplicateView';
import VaultNotesView from './components/VaultNotesView';
import StyleTransferView from './components/StyleTransferView';
import MemoriesView from './components/MemoriesView';
import AssistantSearchView from './components/AssistantSearchView';
import PhotoViewerModal from './components/PhotoViewerModal';
import OfficeKitPanel from './components/OfficeKitPanel';
import { MOCK_ROOM_PHOTOS, MOCK_VAULT_ITEMS } from './data/mockData';
import { Users, Shield, Palette, Sparkles, Search, Zap, Grid3x3, ChevronLeft } from 'lucide-react';

const FEATURES = [
  { id: 'shared', label: 'Shared Space', sub: 'Group albums', Icon: Users },
  { id: 'vault', label: 'Vault', sub: 'Encrypted IDs & notes', Icon: Shield },
  { id: 'style', label: 'Reimagine', sub: 'On-device style AI', Icon: Palette },
  { id: 'memories', label: 'Memories', sub: 'Auto-curated flashbacks', Icon: Sparkles },
  { id: 'search', label: 'Ask', sub: 'Search your photos', Icon: Search },
];

const FEATURES_BY_ID = Object.fromEntries(FEATURES.map(f => [f.id, f]));

export default function App() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [menuOpen, setMenuOpen] = useState(false);
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

  const goToFeature = (id) => {
    setActiveTab(id);
    setShowBlurDups(false);
    setMenuOpen(false);
  };

  const currentFeature = FEATURES_BY_ID[activeTab];

  return (
    <PhoneFrame
      onOpenOfficeKit={() => setShowOfficeKit(true)}
      isMonsterMode={isMonsterMode}
      setIsMonsterMode={setIsMonsterMode}
    >
      {/* App Bar */}
      <div className="px-4 pt-1.5 pb-2 flex items-center justify-between shrink-0 bg-neutral-950 relative">
        <div className="flex items-center gap-2 min-w-0">
          {currentFeature ? (
            <button
              onClick={() => goToFeature('gallery')}
              aria-label="Back to Library"
              className="p-1 -ml-1 rounded-lg text-neutral-400 hover:text-white transition shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-iqoo-yellow flex items-center justify-center text-black font-black text-sm shrink-0">
              R
            </div>
          )}
          <h1 className="text-base font-extrabold text-white tracking-tight leading-none truncate">
            {currentFeature ? currentFeature.label : 'Library'}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isMonsterMode && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-iqoo-orange/20 border border-iqoo-orange/40 text-[9px] font-bold text-iqoo-orange">
              <Zap className="w-2.5 h-2.5 fill-iqoo-orange" />
              <span>NPU</span>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
            className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-iqoo-yellow transition"
          >
            <Grid3x3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {menuOpen && (
          <NavMenu
            features={FEATURES}
            activeTab={activeTab}
            onSelect={goToFeature}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {activeTab === "gallery" && (
          <GalleryView onSelectPhoto={handleSelectPhoto} />
        )}

        {activeTab === "shared" && !showBlurDups && (
          <SharedRoomView
            roomPhotos={roomPhotos}
            onDumpPhotos={handleDumpPhotos}
            onSelectPhoto={handleSelectPhoto}
            onOpenBlurDups={() => setShowBlurDups(true)}
          />
        )}

        {activeTab === "shared" && showBlurDups && (
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
          <AssistantSearchView onSelectPhoto={handleSelectPhoto} onGoToVault={() => goToFeature('vault')} />
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
