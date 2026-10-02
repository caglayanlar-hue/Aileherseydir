import React, { useState, useEffect } from 'react';
import { Story } from '../../types';
import {
  BookOpen,
  Bookmark,
  MessageSquare,
  HelpCircle,
  Save,
  Check,
  User,
  Heart,
  Eye,
  Sparkles,
} from 'lucide-react';
import { BookCoverArt } from '../BookCoverArt';

interface BookGuideTabProps {
  stories: Story[];
}

export const BookGuideTab: React.FC<BookGuideTabProps> = ({ stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_story_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const currentStory = stories[selectedStoryIndex] || stories[0];

  const handleNoteChange = (text: string) => {
    const updated = { ...notes, [currentStory.id]: text };
    setNotes(updated);
  };

  const saveNotes = () => {
    try {
      localStorage.setItem('aile_baglari_story_notes', JSON.stringify(notes));
      setSavedStatus(currentStory.id);
      setTimeout(() => setSavedStatus(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Genç Yazarların Kaleminden</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
            "Aile Dediğin" Sohbet & Okuma Rehberi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Hikayeleri basılı kitabınızdan okuyun; buradaki gündem ve derinleştirici sorularla ailece sohbet edin.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCoverModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Eye className="w-4 h-4 text-purple-600" />
          <span>Kitap Kapağını İncele</span>
        </button>
      </div>

      {/* Main Grid: TOC + Reading Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* TOC Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden sticky top-24">
            <div className="bg-purple-50/70 px-5 py-4 border-b border-purple-100 flex items-center justify-between">
              <h3 className="font-serif font-bold text-purple-950 text-base flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-purple-600" />
                <span>İçindekiler</span>
              </h3>
              <span className="text-xs text-purple-700 font-medium">{stories.length} Başlık</span>
            </div>

            <div className="p-2 space-y-1">
              {stories.map((story, idx) => {
                const isSelected = idx === selectedStoryIndex;
                const hasNote = Boolean(notes[story.id]);

                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setSelectedStoryIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 text-purple-950 font-semibold border-purple-200 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-purple-200/80 text-purple-900'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {idx === 0 ? '§' : idx}
                    </span>

                    <div className="min-w-0 flex-grow">
                      <div className="text-sm truncate font-medium">{story.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center justify-between">
                        <span className="truncate">{story.author}</span>
                        {hasNote && (
                          <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded ml-1">
                            Not var
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reading & Discussion Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          <div className="bg-[#FFFDF9] rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-12 relative overflow-hidden">
            {/* Story Header */}
            <div className="text-center mb-8 pb-6 border-b border-amber-100">
              <span className="text-xs uppercase tracking-widest text-purple-700 font-semibold mb-2 block">
                {selectedStoryIndex === 0 ? 'Kitaba Giriş' : `Öykü #${selectedStoryIndex}`}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                {currentStory.title}
              </h2>

              <div className="inline-flex items-center gap-2 text-slate-500 text-sm mt-3 italic font-serif">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Yazar: {currentStory.author}</span>
              </div>
            </div>

            {/* Story Prompt / Editorial HTML Content */}
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-serif text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: currentStory.content }}
            />

            {/* Aile Sohbeti Gündemi (Teal Banner) */}
            {currentStory.chatTopic && (
              <div className="mt-8 rounded-2xl bg-teal-50/80 border border-teal-200/70 p-6 shadow-xs">
                <h4 className="font-bold text-teal-950 text-base flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span>Aile Sohbeti Odak Teması</span>
                </h4>
                <p className="text-teal-900 text-base leading-relaxed">
                  {currentStory.chatTopic}
                </p>
              </div>
            )}

            {/* Reflection Questions ("Üzerine Düşünelim") */}
            {currentStory.questions && currentStory.questions.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="rounded-2xl bg-purple-50/60 border border-purple-100 p-6 sm:p-8">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-purple-950">
                        Üzerine Birlikte Düşünelim
                      </h4>
                      <p className="text-xs sm:text-sm text-purple-800/80">
                        Hikayeyi okuduktan sonra bu soruları aile meclisinde sırayla herkese yöneltin.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {currentStory.questions.map((q, idx) => (
                      <li
                        key={idx}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100/80 shadow-xs flex items-start gap-4"
                      >
                        <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                          {q}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Family Thought Notes */}
                  <div className="mt-6 pt-5 border-t border-purple-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">
                      Ailenin Bu Hikayeden Çıkardığı Ortak Fikirler & Notlar
                    </label>
                    <textarea
                      rows={3}
                      value={notes[currentStory.id] || ''}
                      onChange={(e) => handleNoteChange(e.target.value)}
                      placeholder="Sohbet esnasında aldığınız kararları veya aklınızda kalan güzel cümleleri buraya kaydedebilirsiniz..."
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-slate-800 text-sm resize-none"
                    />
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs text-purple-700/80">
                        Notlarınız tarayıcınızda saklanır ve dilediğinizde inceleyebilirsiniz.
                      </span>
                      <button
                        type="button"
                        onClick={saveNotes}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        {savedStatus === currentStory.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Kaydedildi</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>Notu Kaydet</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book Cover Modal */}
      {showCoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative border border-amber-100 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">
              "Aile Dediğin" Kitap Kapağı
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Öğretmen Hümeyra Ekmen ve öğrencilerinin emeğiyle hazırlanan özel eser.
            </p>

            <div className="flex justify-center mb-6">
              <BookCoverArt size="lg" />
            </div>

            <button
              type="button"
              onClick={() => setShowCoverModal(false)}
              className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
            >
              Kapat ve Okumaya Devam Et
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
