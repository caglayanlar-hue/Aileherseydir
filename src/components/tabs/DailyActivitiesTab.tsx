import React, { useState } from 'react';
import { Activity } from '../../types';
import {
  Sparkles,
  Dices,
  CheckCircle2,
  Clock,
  Lightbulb,
  HeartHandshake,
  Drama,
  Utensils,
  MapPin,
  Image,
  Film,
  BookOpen,
  Calendar,
  Check,
} from 'lucide-react';

interface DailyActivitiesTabProps {
  activities: Activity[];
  completedActivityIds: string[];
  onToggleComplete: (activityId: string) => void;
}

export const DailyActivitiesTab: React.FC<DailyActivitiesTabProps> = ({
  activities,
  completedActivityIds,
  onToggleComplete,
}) => {
  // Determine today index (0 = Pazartesi, ..., 6 = Pazar)
  const getTodayIndex = () => {
    const day = new Date().getDay(); // 0 is Sunday
    return day === 0 ? 6 : day - 1;
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(getTodayIndex());
  const [showCelebration, setShowCelebration] = useState(false);

  const currentActivity = activities[selectedIndex] || activities[0];
  const isCompleted = completedActivityIds.includes(currentActivity.id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Drama':
        return Drama;
      case 'Sparkles':
        return Sparkles;
      case 'Utensils':
        return Utensils;
      case 'MapPin':
        return MapPin;
      case 'Image':
        return Image;
      case 'Film':
        return Film;
      case 'BookOpen':
        return BookOpen;
      default:
        return Sparkles;
    }
  };

  const IconComponent = getIcon(currentActivity.iconName);

  const handleRandomSelect = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * activities.length);
    } while (nextIndex === selectedIndex && activities.length > 1);
    setSelectedIndex(nextIndex);
    setShowCelebration(false);
  };

  const handleToggle = () => {
    const nextState = !isCompleted;
    onToggleComplete(currentActivity.id);
    if (nextState) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>Haftalık Aile Dinamikleri</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
          Etkinlikler ve Aile Oyunları
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Birlikte gülmek, iletişim kurmak, ekranlardan uzaklaşıp unutulmaz anılar biriktirmek için tasarlandı.
        </p>
      </div>

      {/* Main Grid: Activity Viewer + Weekly Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity View (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Top Bar of Card */}
            <div className="bg-gradient-to-r from-orange-50/70 to-amber-50/50 px-6 sm:px-8 py-4 border-b border-orange-100/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-orange-950 text-sm sm:text-base">
                  {currentActivity.day} Etkinliği
                </span>
                {selectedIndex === getTodayIndex() && (
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100/90 px-2 py-0.5 rounded-md">
                    Bugün
                  </span>
                )}
              </div>

              {/* Clean unboxed metadata */}
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-medium text-slate-700">{currentActivity.category}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentActivity.duration}
                </span>
                {isCompleted && (
                  <>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Tamamlandı
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-100/70 text-orange-700 flex items-center justify-center shrink-0 shadow-xs">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 leading-snug">
                    {currentActivity.title}
                  </h3>
                  <p className="text-slate-600 text-base mt-2 leading-relaxed">
                    {currentActivity.desc}
                  </p>
                </div>
              </div>

              {/* Rules / How to play */}
              <div className="rounded-2xl bg-slate-50/80 p-5 sm:p-6 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Nasıl Oynanır & Uygulama Adımları</span>
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {currentActivity.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefit Box */}
              <div className="rounded-2xl bg-blue-50/60 p-5 border border-blue-100/80 flex items-start gap-3.5">
                <HeartHandshake className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-950">
                  <strong className="block font-semibold mb-0.5">Neden Faydalı?</strong>
                  <span className="text-blue-900/80 leading-relaxed">
                    {currentActivity.benefit}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-slate-50/80 px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleRandomSelect}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-700 text-sm font-medium transition-colors"
              >
                <Dices className="w-4 h-4" />
                <span>Rastgele Bir Etkinlik Seç</span>
              </button>

              <button
                type="button"
                onClick={handleToggle}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Tamamlandı (Geri Al)' : 'Tamamladık!'}</span>
              </button>
            </div>
          </div>

          {/* Celebration Banner */}
          {showCelebration && (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 border border-emerald-200 text-center animate-fade-in shadow-xs">
              <div className="text-3xl mb-2">🎉 👨‍👩‍👧‍👦 🌟</div>
              <h4 className="text-lg font-bold text-emerald-950">Tebrikler, Harika Vakit Geçirdiniz!</h4>
              <p className="text-emerald-800 text-sm mt-1 max-w-lg mx-auto">
                Birlikte geçirdiğiniz bu değerli anlar, ailenizin sevgi ve güven bağlarını daha da güçlendiriyor.
              </p>
            </div>
          )}
        </div>

        {/* Weekly Schedule Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden sticky top-24">
            <div className="bg-slate-50/90 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Haftalık Etkinlik Planı</h3>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                {completedActivityIds.length}/7 Tamamlandı
              </span>
            </div>

            <div className="p-3 space-y-1.5 max-h-[600px] overflow-y-auto">
              {activities.map((act, idx) => {
                const isSelected = idx === selectedIndex;
                const done = completedActivityIds.includes(act.id);
                const isToday = idx === getTodayIndex();
                const Icon = getIcon(act.iconName);

                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      setSelectedIndex(idx);
                      setShowCelebration(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50/80 border-orange-200 shadow-xs'
                        : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-orange-200/80 text-orange-900'
                          : done
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {done ? <Check className="w-4 h-4" /> : act.day.substring(0, 3)}
                    </div>

                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm font-semibold truncate ${
                            isSelected ? 'text-orange-950' : 'text-slate-800'
                          }`}
                        >
                          {act.title}
                        </span>
                        {isToday && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0">
                            Bugün
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {act.category} · {act.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
