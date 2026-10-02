import React, { useState } from 'react';
import { PRESET_CONFLICT_SCENARIOS } from '../../data/defaultData';
import {
  MessageCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  Heart,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

export const CommunicationTab: React.FC = () => {
  const [behavior, setBehavior] = useState('');
  const [feeling, setFeeling] = useState('');
  const [request, setRequest] = useState('');
  const [generatedSentence, setGeneratedSentence] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const feelingsList = [
    'üzülüyorum',
    'kırılıyorum',
    'kızıyorum / öfkeleniyorum',
    'değersiz hissediyorum',
    'kaygılanıyorum ve tedirgin oluyorum',
    'yalnız ve desteksiz kalmış hissediyorum',
    'çok yorulduğumu hissediyorum',
  ];

  const handleGenerate = () => {
    if (!behavior.trim() || !feeling || !request.trim()) {
      return;
    }

    const trimmedBehavior = behavior.trim();
    const cleanBehavior =
      trimmedBehavior.charAt(0).toLowerCase() + trimmedBehavior.slice(1);

    const sentence = `Sen ${cleanBehavior}, ben ${feeling}. ${request.trim()}`;
    setGeneratedSentence(sentence);
  };

  const handleCopy = () => {
    if (!generatedSentence) return;
    navigator.clipboard.writeText(generatedSentence);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const applyScenario = (sc: typeof PRESET_CONFLICT_SCENARIOS[0]) => {
    setBehavior(sc.behavior);
    setFeeling(sc.feeling);
    setRequest(sc.request);
    const cleanBehavior = sc.behavior.charAt(0).toLowerCase() + sc.behavior.slice(1);
    setGeneratedSentence(`Sen ${cleanBehavior}, ben ${sc.feeling}. ${sc.request}`);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
          <MessageCircle className="w-4 h-4 text-blue-600" />
          <span>Şefkatli ve Yapıcı Diyalog</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
          İletişim Köşesi: "Ben Dili" Rehberi
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
          Aile içinde anlaşmazlıklar gayet doğaldır. Önemli olan sorunları suçlayarak ("Sen Dili") değil,
          kendi duygu ve ihtiyaçlarımızı ifade ederek ("Ben Dili") konuşabilmektir.
        </p>
      </div>

      {/* Theory & Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sen Dili Box */}
        <div className="rounded-3xl bg-rose-50/60 border border-rose-200/80 p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-rose-950 text-base flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Sen Dili (Suçlayıcı & Yıkıcı)</span>
            </h3>
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
              Kaçınılmalı
            </span>
          </div>

          <p className="text-rose-900/80 text-sm mb-4 leading-relaxed">
            Karşı tarafın kişiliğine saldırır, savunma refleksini tetikler ve kapıları kapatır.
          </p>

          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">
                Örnek 1:
              </div>
              <p className="font-serif italic text-slate-800 text-sm">
                "Beni hiç dinlemiyorsun, sürekli telefonuna bakıyorsun! Çok duyarsızsın."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs">
              <div className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">
                Örnek 2:
              </div>
              <p className="font-serif italic text-slate-800 text-sm">
                "Odanı hep ahır gibi bırakıyorsun, evin bütün yükünü bana yıkıyorsun!"
              </p>
            </div>
          </div>
        </div>

        {/* Ben Dili Box */}
        <div className="rounded-3xl bg-emerald-50/60 border border-emerald-200/80 p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Ben Dili (Duygu Odaklı & Çözüm Üreten)</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Önerilen
            </span>
          </div>

          <p className="text-emerald-900/80 text-sm mb-4 leading-relaxed">
            Kişiyi değil davranışı ve o davranışın sizde uyandırdığı duyguyu ifade eder; empati kurdurur.
          </p>

          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                Dönüşüm 1:
              </div>
              <p className="font-serif italic text-slate-800 text-sm">
                "Ben konuşurken ekrana baktığında beni önemsemediğini hissediyor ve üzülüyorum. Lütfen 5 dakika göz teması kurabilir miyiz?"
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                Dönüşüm 2:
              </div>
              <p className="font-serif italic text-slate-800 text-sm">
                "Eşyaların uzun süre salonda kaldığında yoruluyor ve evin düzenini tek başıma sırtlamış hissediyorum. Birlikte toparlayalım mı?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Conflict Scenarios */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-sm">
            Günlük Aile Çatışma Senaryolarından Öğrenin
          </h3>
          <span className="text-xs text-slate-400">(Tıklayarak formüle yükleyin)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_CONFLICT_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => applyScenario(sc)}
              className="text-left p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 mb-1">
                {sc.title}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                "{sc.behavior.substring(0, 50)}..."
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-2">
                Dönüştür <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Ben Dili Generator Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-serif font-bold text-xl text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>İnteraktif "Ben Dili" Cümle Kurucu</span>
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            İçinizdeki kırgınlığı veya isteği suçlamaya dönüştürmeden, 3 adımda doğru formülle ifade edin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Behavior */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-xs mr-1.5">
                1
              </span>
              Davranış: (Ne oldu?)
            </label>
            <input
              type="text"
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              placeholder="Örn: Odaya kapıyı çalmadan girdiğinde..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Gözlemlediğiniz somut durumu yazın.
            </span>
          </div>

          {/* Step 2: Feeling */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-xs mr-1.5">
                2
              </span>
              Duygu: (Ne hissettin?)
            </label>
            <select
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Bir duygu seçiniz...
              </option>
              {feelingsList.map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Davranışın sizde yarattığı etkiyi seçin.
            </span>
          </div>

          {/* Step 3: Request */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 inline-flex items-center justify-center text-xs mr-1.5">
                3
              </span>
              İstek: (Ne istiyorsun?)
            </label>
            <input
              type="text"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Örn: Lütfen kapıyı tıklatıp girer misin?"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Yapıcı, kibar bir ricada bulunun.
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!behavior || !feeling || !request}
          onClick={handleGenerate}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            behavior && feeling && request
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>İfademi Oluştur</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Generated Output */}
        {generatedSentence && (
          <div className="rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-50/70 p-6 border border-blue-200/80 animate-fade-in shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-blue-600" />
                Önerilen İletişim Cümlesi:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>

            <p className="font-serif italic text-slate-900 text-lg sm:text-xl leading-relaxed">
              "{generatedSentence}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
