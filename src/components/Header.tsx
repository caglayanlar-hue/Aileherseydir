import React, { useState } from 'react';
import { Home, Coffee, BookOpen, MessageCircle, CheckSquare, Users, Menu, X, Sparkles } from 'lucide-react';

export type TabKey = 'home' | 'daily' | 'book' | 'meeting' | 'chat' | 'tasks';

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  memberCount: number;
  onOpenMembersModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  memberCount,
  onOpenMembersModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean }[] = [
    { key: 'home', label: 'Ana Sayfa', icon: Home },
    { key: 'daily', label: 'Oyun & Etkinlik', icon: Sparkles },
    { key: 'book', label: 'Kitap Rehberi', icon: BookOpen },
    { key: 'chat', label: 'İletişim Köşesi', icon: MessageCircle },
    { key: 'tasks', label: 'Görevler', icon: CheckSquare },
    { key: 'meeting', label: 'Aile Toplantısı', icon: Coffee, highlight: true },
  ];

  const handleSelectTab = (key: TabKey) => {
    onTabChange(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center transition-colors group-hover:bg-amber-500/20">
              <Coffee className="w-5 h-5 text-amber-700" />
            </div>
            <span className="font-serif font-bold text-xl sm:text-2xl text-slate-800 tracking-tight">
              Aile Bağları
            </span>
          </button>

          {/* Zone 2: 4-6 Nav links with 1-2 word labels */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Ana Gezinti">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              if (item.highlight) {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleSelectTab(item.key)}
                    className={`ml-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSelectTab(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-amber-800 bg-amber-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenMembersModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              title="Aile Üyelerini Görüntüle ve Düzenle"
            >
              <Users className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Aile:</span>
              <span className="font-semibold text-amber-800 tabular-nums">{memberCount} Kişi</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl px-4 pt-2 pb-5 space-y-1 animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelectTab(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? item.highlight
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive && !item.highlight ? 'text-amber-600' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Haftalık
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
