import React, { useState } from 'react';
import { MeetingRecord } from '../../types';
import {
  Coffee,
  Calendar,
  PenTool,
  Save,
  FileText,
  Trash2,
  Users,
  CheckCircle,
  FileDown,
  Printer,
  Sparkles,
  Heart,
} from 'lucide-react';
import { CustomModal } from '../CustomModal';

interface MeetingTabProps {
  members: string[];
  meetings: MeetingRecord[];
  onSaveMeeting: (record: Omit<MeetingRecord, 'id' | 'createdAt'>) => void;
  onDeleteMeeting: (id: string) => void;
}

export const MeetingTab: React.FC<MeetingTabProps> = ({
  members,
  meetings,
  onSaveMeeting,
  onDeleteMeeting,
}) => {
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [date, setDate] = useState(getTodayDateString());
  const [reporter, setReporter] = useState(members[0] || '');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>(members);
  const [issues, setIssues] = useState('');
  const [decisions, setDecisions] = useState('');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    type: 'info' | 'confirm' | 'success';
    onConfirm: () => void;
  }>({
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {},
  });

  const toggleAttendee = (name: string) => {
    if (selectedAttendees.includes(name)) {
      setSelectedAttendees(selectedAttendees.filter((a) => a !== name));
    } else {
      setSelectedAttendees([...selectedAttendees, name]);
    }
  };

  const handleSave = () => {
    if (!date || !reporter || !issues.trim() || !decisions.trim()) {
      setModalConfig({
        title: 'Eksik Bilgi',
        message: 'Lütfen toplantı tarihi, raportör, gündem ve alınan kararlar alanlarının tamamını doldurunuz.',
        type: 'info',
        onConfirm: () => setModalOpen(false),
      });
      setModalOpen(true);
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    onSaveMeeting({
      date,
      formattedDate,
      reporter,
      attendees: selectedAttendees.length > 0 ? selectedAttendees : members,
      issues: issues.trim(),
      decisions: decisions.trim(),
    });

    // Reset form
    setIssues('');
    setDecisions('');

    setModalConfig({
      title: 'Tutanak Kaydedildi',
      message: 'Haftalık aile toplantısı kararları başarıyla kaydedildi. Tebrikler!',
      type: 'success',
      onConfirm: () => setModalOpen(false),
    });
    setModalOpen(true);
  };

  const confirmDelete = (id: string, meetingDate: string) => {
    setModalConfig({
      title: 'Toplantı Tutanağını Sil',
      message: `${meetingDate} tarihli aile toplantısı tutanağını silmek istediğinize emin misiniz?`,
      type: 'confirm',
      onConfirm: () => {
        onDeleteMeeting(id);
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  // Export to Word Document (.doc format compatible with Word, LibreOffice, Docs)
  const exportToWord = (record: MeetingRecord) => {
    const attendeesStr = record.attendees && record.attendees.length > 0
      ? record.attendees.join(', ')
      : 'Tüm Aile Üyeleri';

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Haftalık Aile Toplantısı Tutanağı - ${record.formattedDate}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; margin: 40px; color: #1e293b; }
          h1 { color: #b45309; text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .meta-table td { padding: 8px 12px; border: 1px solid #e2e8f0; font-size: 14px; }
          .section-title { color: #92400e; font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 8px; border-left: 4px solid #f59e0b; padding-left: 8px; }
          .box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
          .decisions-box { background-color: #fefce8; border: 1px solid #fef08a; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #713f12; }
          .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: right; font-style: italic; }
        </style>
      </head>
      <body>
        <h1>Haftalık Aile Toplantısı Tutanağı</h1>
        <table class="meta-table">
          <tr>
            <td><strong>Toplantı Tarihi:</strong></td>
            <td>${record.formattedDate}</td>
            <td><strong>Raportör (Yazan):</strong></td>
            <td>${record.reporter}</td>
          </tr>
          <tr>
            <td><strong>Katılımcılar:</strong></td>
            <td colspan="3">${attendeesStr}</td>
          </tr>
        </table>

        <div class="section-title">Gündem: Aile İçi Sorunlar, Duygular & İhtiyaçlar</div>
        <div class="box">${record.issues.replace(/\n/g, '<br>')}</div>

        <div class="section-title">Alınan Kararlar & Mutabakata Varılan Çözümler</div>
        <div class="decisions-box">${record.decisions.replace(/\n/g, '<br>')}</div>

        <div class="footer">
          Aile Bağları Platformu - "Aile Dediğin" Aile Meclisi Tutanağı
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aile_Toplantisi_${record.formattedDate.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = (record: MeetingRecord) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Aile Toplantısı - ${record.formattedDate}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
            h1 { color: #b45309; text-align: center; }
            .info { border-bottom: 1px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 24px; }
            .section { margin-bottom: 24px; }
            h2 { color: #78350f; font-size: 16px; border-left: 4px solid #f59e0b; padding-left: 8px; }
            p { background: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>Haftalık Aile Toplantısı Tutanağı</h1>
          <div class="info">
            <p style="background: none; padding: 0;"><strong>Tarih:</strong> ${record.formattedDate} | <strong>Raportör:</strong> ${record.reporter}</p>
          </div>
          <div class="section">
            <h2>Gündem: Aile İçi Sorunlar & İhtiyaçlar</h2>
            <p>${record.issues}</p>
          </div>
          <div class="section">
            <h2>Alınan Kararlar & Çözümler</h2>
            <p>${record.decisions}</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Tea & Cookie Warm Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 p-6 sm:p-8 border border-amber-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
            <Coffee className="w-4 h-4 text-amber-600" />
            <span>Haftalık Aile Meclisi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            Haftalık Aile Toplantısı
          </h2>
          <p className="text-amber-900/80 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Çayınızı, ıhlamurunuzu ve kurabiyenizi hazırlayın; bu hafta neleri iyi yaptık,
            hangi konularda zorlandık ve birbirimize nasıl destek olabiliriz birlikte konuşalım.
          </p>
        </div>

        {/* Tea & Cookie Aesthetic Visual Badge */}
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xs px-5 py-3 rounded-2xl border border-amber-200 shadow-xs shrink-0">
          <div className="text-center">
            <span className="text-2xl">☕</span>
            <span className="block text-[11px] font-semibold text-amber-900 mt-0.5">Sıcak Çay</span>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="text-center">
            <span className="text-2xl">🍪</span>
            <span className="block text-[11px] font-semibold text-amber-900 mt-0.5">Kurabiye</span>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="text-center">
            <span className="text-2xl">🤝</span>
            <span className="block text-[11px] font-semibold text-amber-900 mt-0.5">Mutabakat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Meeting Form (2 cols) + Past Meetings History (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="bg-amber-600 text-white px-6 py-4 font-semibold text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-200" />
              <span>Yeni Toplantı Tutanak Formu</span>
            </div>
            <span className="text-xs text-amber-100 font-normal">
              Demokratik ve Saygılı İletişim
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6 flex-grow bg-[#FCFAF7]/50">
            {/* Row 1: Date & Reporter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Toplantı Tarihi</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-amber-600" />
                  <span>Raportör (Notları Tutan)</span>
                </label>
                <select
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                >
                  {members.length === 0 ? (
                    <option value="">Aile üyesi ekleyin...</option>
                  ) : (
                    members.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Row 2: Attendees Multi-select chips */}
            {members.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>Toplantıya Katılanlar</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => {
                    const isAttending = selectedAttendees.includes(member);
                    return (
                      <button
                        key={member}
                        type="button"
                        onClick={() => toggleAttendee(member)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          isAttending
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isAttending ? '✓ ' : '+ '}
                        {member}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Row 3: Issues / Needs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gündem: Aile İçi Sorunlar, Duygular & İhtiyaçlar</span>
                </label>
                <span className="text-[11px] text-amber-700 font-medium">
                  İpucu: "Ben Dili" kullanarak yazınız
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Bu hafta evde neleri daha iyi yönetebilirdik? Hangi konularda kırgınlık veya yorgunluk yaşadık?
              </p>
              <textarea
                rows={4}
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Örn: Akşamları sofrayı tek başıma toplamak zorunda kaldığımda yoruluyor ve desteğe ihtiyaç duyuyorum..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none shadow-xs"
              />
            </div>

            {/* Row 4: Decisions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Alınan Kararlar & Mutabakata Varılan Çözümler</span>
                </label>
                <span className="text-[11px] text-slate-400">Herkesin onayladığı ortak kararlar</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Konuşulan sorunları çözmek için hangi somut adımları atacağız?
              </p>
              <textarea
                rows={4}
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                placeholder="Örn: Yemekten sonra tabakları herkes kendisi tezgaha kaldıracak, kurutulan bulaşıkları sırayla yerleştireceğiz..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none shadow-xs"
              />
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Toplantı Tutanaklarını Kaydet</span>
            </button>
          </div>
        </div>

        {/* Meeting History Column */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[740px]">
          <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-800 text-sm">Geçmiş Toplantılar</h3>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full tabular-nums">
              {meetings.length} Toplantı
            </span>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-grow bg-slate-50/40">
            {meetings.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm italic px-4">
                Henüz kaydedilmiş bir aile toplantısı tutanağı yok. Sıcak çayınızı alın ve ilk toplantınızı başlatın!
              </div>
            ) : (
              meetings.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3 relative group"
                >
                  {/* Top Bar of Record */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="font-serif font-bold text-amber-900 text-sm">
                        {rec.formattedDate}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Raportör: <span className="font-medium text-slate-700">{rec.reporter}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Word Export Button */}
                      <button
                        type="button"
                        onClick={() => exportToWord(rec)}
                        title="Word (.doc) Belgesi Olarak İndir"
                        className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Çıktı Al</span>
                      </button>

                      {/* Print Button */}
                      <button
                        type="button"
                        onClick={() => handlePrint(rec)}
                        title="Yazdır / Önizle"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => confirmDelete(rec.id, rec.formattedDate)}
                        title="Tutanağı Sil"
                        className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Issues */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Gündem & Sorunlar:
                    </span>
                    <p className="text-xs text-slate-700 bg-slate-50 rounded-xl p-2.5 leading-relaxed whitespace-pre-line border border-slate-100">
                      {rec.issues}
                    </p>
                  </div>

                  {/* Decisions */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                      Alınan Kararlar:
                    </span>
                    <p className="text-xs text-amber-950 bg-amber-50/80 rounded-xl p-2.5 leading-relaxed whitespace-pre-line border border-amber-100/60 font-medium">
                      {rec.decisions}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={modalOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};
