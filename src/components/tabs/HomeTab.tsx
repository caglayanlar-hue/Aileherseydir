import React, { useState } from 'react';
import { TabKey } from '../Header';
import { Activity, MeetingRecord, TaskItem } from '../../types';
import {
  Heart,
  RotateCw,
  Copy,
  Check,
  Puzzle,
  Coffee,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Users,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { BookCoverArt } from '../BookCoverArt';

interface HomeTabProps {
  onNavigate: (tab: TabKey) => void;
  loveWords: string[];
  members: string[];
  todayActivity: Activity;
  meetings: MeetingRecord[];
  tasks: TaskItem[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigate,
  loveWords,
  members,
  todayActivity,
  meetings,
  tasks,
}) => {
  const [currentLoveIndex, setCurrentLoveIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const nextLoveWord = () => {
    setCurrentLoveIndex((prev) => (prev + 1) % loveWords.length);
    setIsCopied(false);
  };

  const handleCopyWord = () => {
    navigator.clipboard.writeText(loveWords[currentLoveIndex]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const completedTasksCount = tasks.filter((t) => t.done).length;
  const latestMeeting = meetings.length > 0 ? meetings[0] : null;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#FFF9F2] to-[#FBF4EB] p-8 sm:p-12 border border-amber-900/10 shadow-xs">
        {/* Subtle decorative background shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide uppercase mb-6">
            <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>Sevgiyle Büyüyen Yuva</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight leading-tight mb-5">
            Ailemiz,{' '}
            <span className="text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2">
              En Büyük Hazinemiz
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Modern zamanın hızına inat, birbirimize daha sıkı sarılmak, iletişimimizi güçlendirmek ve
            dijital kopukluktan uzaklaşarak "biz olma" duygusunu yaşatmak için tasarlandı.
          </p>

          {/* Günün Sevgi Sözcüğü Box */}
          <div className="mt-8 text-left max-w-2xl mx-auto rounded-2xl bg-white/90 backdrop-blur-xs p-6 border border-amber-100 shadow-sm relative group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Günün Sevgi & Nezaket Sözcüğü
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleCopyWord}
                      className="p-1.5 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Sözcüğü kopyala"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={nextLoveWord}
                      className="p-1.5 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Başka bir sözcük"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-slate-800 leading-snug">
                  "{loveWords[currentLoveIndex]}"
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Bugün bu cümleyi bir aile üyenize göz teması kurarak söylemeyi deneyin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Family Snapshot Strip */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Members */}
          <div className="flex items-center gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Kayıtlı Aile Üyeleri</div>
              <div className="text-sm font-semibold text-slate-800 truncate">
                {members.length > 0 ? members.join(', ') : 'Henüz üye eklenmedi'}
              </div>
            </div>
          </div>

          {/* Today Activity */}
          <div className="flex items-center gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 font-medium">Bugünün Önerisi ({todayActivity.day})</div>
              <div className="text-sm font-semibold text-slate-800 truncate">
                {todayActivity.title}
              </div>
            </div>
          </div>

          {/* Tasks & Meeting */}
          <div className="flex items-center gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Görevler & Toplantı</div>
              <div className="text-sm font-semibold text-slate-800 tabular-nums">
                {completedTasksCount}/{tasks.length} Görev Tamamlandı · {meetings.length} Toplantı
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4 Dashboard Cards */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">
            Aile Etkileşim Alanları
          </h2>
          <span className="text-xs text-slate-500">Seçerek hemen başlayın</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Activities */}
          <button
            type="button"
            onClick={() => onNavigate('daily')}
            className="group text-left bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Puzzle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-600 transition-colors">
                Oyun & Etkinlikler
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Her güne özel, ailenizle kaliteli zaman geçirmenizi sağlayacak eğlenceli ve öğretici aktiviteler.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-orange-600">
              <span>Etkinlikleri Keşfet</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Card 2: Family Meeting */}
          <button
            type="button"
            onClick={() => onNavigate('meeting')}
            className="group text-left bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-amber-700 transition-colors">
                Aile Toplantısı
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Çay ve kurabiye eşliğinde haftalık değerlendirme yapın, sorunları konuşup kararları tutanağa bağlayın.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-700">
              <span>Toplantıyı Başlat</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Card 3: Book Guide */}
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className="group text-left bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-purple-700 transition-colors">
                "Aile Dediğin" Rehberi
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Öğrencilerin kaleminden çıkan hikayeleri okuyup hazırlanan sorularla derin ve samimi sohbetler başlatın.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-700">
              <span>Hikayeleri İncele</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Card 4: Communication Corner */}
          <button
            type="button"
            onClick={() => onNavigate('chat')}
            className="group text-left bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                İletişim Köşesi
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Anlaşmazlıkları suçlayıcı "Sen Dili" yerine yapıcı "Ben Dili" ile konuşmayı interaktif araçla öğrenin.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
              <span>Cümle Kurucuya Git</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </section>

      {/* Featured Book Showcase Section */}
      <section className="bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-amber-50/70 rounded-3xl p-8 sm:p-10 border border-amber-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="shrink-0">
            <BookCoverArt size="sm" />
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
              Tavsiye Edilen Kaynak Kitap
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-3">
              "Aile Dediğin": Genç Yazarların Kaleminden
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              Öğretmen Hümeyra Ekmen öncülüğünde öğrenciler tarafından yazılan öyküler; ailedeki vefa,
              zaman yönetimi, kökler ve sevginin değerini hatırlatıyor. Kitabınızı elinize alıp portalımızdaki
              sohbet sorularıyla birleştirin.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors shadow-xs flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Öykü & Sohbet Rehberine Git</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('daily')}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 font-medium text-sm transition-colors"
              >
                Günün Etkinliğini Oyna
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
