import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowRight, Quote, Clock, Users, Heart } from 'lucide-react';
import { BookCoverArt } from './BookCoverArt';

interface WelcomeModalProps {
  isOpen: boolean;
  members: string[];
  onAddMember: (name: string) => void;
  onRemoveMember: (name: string) => void;
  onStart: () => void;
  onClose?: () => void;
  isInitialOnboarding?: boolean;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  members,
  onAddMember,
  onRemoveMember,
  onStart,
  onClose,
  isInitialOnboarding = true,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      setTimeString(now.toLocaleDateString('tr-TR', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleAdd = () => {
    const trimmed = nameInput.trim();
    if (trimmed && !members.includes(trimmed)) {
      onAddMember(trimmed);
      setNameInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FAF7F2]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-100 relative">
        {/* Close button if opened from settings */}
        {!isInitialOnboarding && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 rounded-full shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Left Side: Quote & Book Cover Art */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#FFF8F0] via-[#FAF3EA] to-[#F3E8DC] p-8 sm:p-10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-amber-100 relative">
          <div className="absolute top-6 left-6 text-amber-200/80 pointer-events-none">
            <Quote className="w-12 h-12" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 mb-8 relative z-10 leading-snug max-w-sm">
            "Aile, insanın ruhunu ısıtan en eski ocaktır."
          </h2>

          <div className="relative mb-4">
            <BookCoverArt size="md" />
          </div>

          <p className="text-xs text-amber-800/80 font-medium">
            Öğrencilerin Kaleminden "Aile Dediğin" Hikaye & Sohbet Rehberi
          </p>
        </div>

        {/* Right Side: Setup & Members */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          {/* Live Clock */}
          <div className="flex items-center justify-center gap-2 text-amber-800 bg-amber-50/80 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium mb-6 border border-amber-100">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{timeString}</span>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-amber-600 font-semibold text-xs tracking-wider uppercase mb-2">
              <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Aile Meclisi Kurulumu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800">
              {isInitialOnboarding ? 'Hoş Geldiniz' : 'Aile Üyelerini Düzenle'}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2 leading-relaxed">
              Aile toplantı tutanakları, görev dağılımları ve ortak etkinlikler için lütfen aile üyelerini ekleyin.
            </p>
          </div>

          {/* Member Input */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Örn: Anne, Baba, Kerem, Zeynep..."
                className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50 focus:bg-white text-slate-800 text-sm transition-all"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 rounded-xl font-medium transition-colors shadow-xs flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick suggested roles */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-slate-400 self-center mr-1">Hızlı ekle:</span>
              {['Anne', 'Baba', 'Çocuk', 'Dede', 'Nine'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    if (!members.includes(role)) onAddMember(role);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 transition-colors"
                >
                  +{role}
                </button>
              ))}
            </div>

            {/* Members List */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 min-h-[110px] max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Users className="w-3.5 h-3.5" />
                  Kayıtlı Aile Üyeleri ({members.length})
                </span>
                {members.length === 0 && (
                  <span className="text-amber-600">En az 1 kişi ekleyin</span>
                )}
              </div>

              {members.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 italic">
                  Henüz kimse eklenmedi. Yukarıdaki alandan ekleyebilirsiniz.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => (
                    <div
                      key={member}
                      className="bg-white text-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-sm font-medium border border-slate-200/80 shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{member}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveMember(member)}
                        className="text-slate-400 hover:text-rose-600 transition-colors ml-1"
                        aria-label={`${member} üyesini sil`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            disabled={members.length === 0}
            onClick={onStart}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              members.length > 0
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{isInitialOnboarding ? 'Portala Giriş Yap' : 'Değişiklikleri Kaydet'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
