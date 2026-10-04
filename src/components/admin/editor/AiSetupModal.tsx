import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, Loader2, FileText, AlertCircle } from 'lucide-react';
import { parseInvitationWithAi, ParsedInvitationAiResult } from '../../../services/aiSetupAssistant';

interface AiSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyParsedData: (data: ParsedInvitationAiResult) => void;
}

export const AiSetupModal: React.FC<AiSetupModalProps> = ({
  isOpen,
  onClose,
  onApplyParsedData
}) => {
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResult, setParsedResult] = useState<ParsedInvitationAiResult | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const sampleChat = `Halo Sekarsiti Studio, saya mau pesan undangan pernikahan.

Data kami:
- Mempelai Wanita: Kirana Ayu Lestari, S.Ds. (Putri pertama Bapak Hendra Wijaya & Ibu Sinta Maharani) - Panggilan: Kirana
- Mempelai Pria: Adhitya Nugraha, B.Eng. (Putra kedua Bapak Suryanto Nugraha & Ibu Ratna Dewi) - Panggilan: Adhitya
- Tanggal Acara: Minggu, 14 Februari 2027
- Akad Nikah: 08.00 - 09.30 WIB di Ruang Bimasena, Aryaduta Hotel
- Resepsi Pernikahan: 11.00 - 14.00 WIB di Grand Ballroom, Aryaduta Hotel, Jakarta Selatan
- Tanda Kasih: Rekening BCA 8271029384 a.n Kirana Ayu Lestari
- Pilihan Musik: Until I Found You - Stephen Sanchez`;

  const handleInsertSample = () => {
    setRawText(sampleChat);
    setParsedResult(null);
    setErrorMsg('');
  };

  const handleExtract = async () => {
    if (!rawText.trim()) {
      setErrorMsg('Silakan tempelkan teks pesan atau obrolan klien terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setStatusMessage('');

    try {
      const res = await parseInvitationWithAi(rawText);
      if (res.success && res.data) {
        setParsedResult(res.data);
        setStatusMessage(res.message || 'Berhasil mengekstrak data.');
      } else {
        setErrorMsg('Tidak dapat mengekstrak data dari teks yang diberikan.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Terjadi kesalahan saat memproses dengan AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (parsedResult) {
      onApplyParsedData(parsedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                ✨ AI Quick Setup (Salin Chat Klien)
              </h3>
              <p className="text-[11px] text-stone-500">
                Alat bantu otomatis untuk mengekstrak data mentah obrolan klien ke formulir.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!parsedResult ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Tempelkan Pesan WhatsApp / Catatan Klien:</span>
                </label>
                <button
                  type="button"
                  onClick={handleInsertSample}
                  className="text-[11px] text-[#C5A880] hover:underline font-medium"
                >
                  Gunakan Contoh Teks Chat
                </button>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={7}
                placeholder="Tempel teks obrolan WhatsApp atau brief dari calon pengantin di sini..."
                className="w-full p-3.5 rounded-xl border border-stone-200 font-mono text-xs focus:ring-2 focus:ring-[#C5A880]/50 outline-none bg-stone-50/50 resize-y leading-relaxed"
              />

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-500 space-y-1">
                <span className="font-bold text-stone-700 block">💡 Tips Penggunaan:</span>
                <p>
                  Sistem AI akan secara otomatis memisahkan nama panggilan, nama lengkap, gelar, orang tua, jam akad, jam resepsi, rekening bank, hingga merekomendasikan template yang paling pas.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{statusMessage} Silakan tinjau hasil ekstraksi di bawah:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Nama Singkat</span>
                  <p className="font-bold text-stone-900">{parsedResult.clientName || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Tanggal Acara</span>
                  <p className="font-bold text-stone-900">{parsedResult.eventDateFormatted || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Mempelai Wanita</span>
                  <p className="text-stone-800 font-medium">{parsedResult.brideFullName || parsedResult.brideName || '-'}</p>
                  <p className="text-[10px] text-stone-500">{parsedResult.brideParents || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Mempelai Pria</span>
                  <p className="text-stone-800 font-medium">{parsedResult.groomFullName || parsedResult.groomName || '-'}</p>
                  <p className="text-[10px] text-stone-500">{parsedResult.groomParents || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Akad Nikah</span>
                  <p className="text-stone-800 font-medium">{parsedResult.akadTime || '-'}</p>
                  <p className="text-[10px] text-stone-500">{parsedResult.akadVenue || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Resepsi</span>
                  <p className="text-stone-800 font-medium">{parsedResult.resepsiTime || '-'}</p>
                  <p className="text-[10px] text-stone-500">{parsedResult.resepsiVenue || '-'}, {parsedResult.city || ''}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Tanda Kasih Bank</span>
                  <p className="text-stone-800 font-medium">{parsedResult.bankName || 'BCA'} - {parsedResult.accountNumber || '-'}</p>
                  <p className="text-[10px] text-stone-500">a.n {parsedResult.accountHolder || '-'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Rekomendasi Desain</span>
                  <span className="inline-block bg-[#141413] text-[#C5A880] text-[10px] font-bold px-2 py-0.5 rounded">
                    Template: {parsedResult.recommendedTemplate || 'ruang-rasa'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setParsedResult(null)}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline block text-center"
              >
                ← Ekstrak Ulang Teks Lain
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 transition-colors"
          >
            Batal
          </button>

          {!parsedResult ? (
            <button
              type="button"
              onClick={handleExtract}
              disabled={isLoading || !rawText.trim()}
              className="bg-[#141413] hover:bg-[#2C2E28] disabled:opacity-50 text-[#FAF8F3] px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A880]" />
                  <span>Sedang Mengekstrak...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Ekstrak dengan AI</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              className="bg-[#C5A880] hover:bg-[#B39369] text-[#141413] px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Terapkan ke Form Undangan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
