import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  ExternalLink, 
  Users, 
  User, 
  Download, 
  Share2, 
  Sparkles 
} from 'lucide-react';
import { ClientInvitationData } from '../../types/clientInvitation';
import { AdminStore } from '../../admin/adminStore';

interface GuestLinkModalProps {
  invitation: ClientInvitationData;
  onClose: () => void;
}

export const GuestLinkModal: React.FC<GuestLinkModalProps> = ({
  invitation,
  onClose
}) => {
  const [activeMode, setActiveMode] = useState<'single' | 'batch'>('single');

  // Single Guest Mode state
  const [guestNameInput, setGuestNameInput] = useState('Bpk. Hendra Wijaya & Keluarga');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Batch Mode state
  const [batchNamesText, setBatchNamesText] = useState(
    'Bpk. Hendra Wijaya & Keluarga\nIbu Siti Aminah & Suami\ndr. Danang Triputra\nKeluarga Besar Alm. H. Abdullah\nSahabat Kuliah Angkatan 2020'
  );
  const [copiedBatchAll, setCopiedBatchAll] = useState(false);
  const [copiedRowIdx, setCopiedRowIdx] = useState<number | null>(null);

  // Single generation
  const singleLink = AdminStore.generateShareLink(invitation, guestNameInput.trim());
  const singleMessage = AdminStore.generateWhatsAppMessage(invitation, guestNameInput.trim());

  // Batch generation
  const guestNamesList = batchNamesText
    .split('\n')
    .map(n => n.trim())
    .filter(Boolean);

  const batchResults = AdminStore.generateBatchLinks(invitation, guestNamesList);

  const handleCopySingleLink = () => {
    navigator.clipboard.writeText(singleLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySingleMessage = () => {
    navigator.clipboard.writeText(singleMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleOpenSingleWhatsApp = () => {
    const encoded = encodeURIComponent(singleMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopyBatchRow = (link: string, idx: number) => {
    navigator.clipboard.writeText(link);
    setCopiedRowIdx(idx);
    setTimeout(() => setCopiedRowIdx(null), 1800);
  };

  const handleCopyAllBatchText = () => {
    const combined = batchResults
      .map((item, i) => `--- [Tamu #${i + 1}: ${item.guestName}] ---\n${item.message}\n`)
      .join('\n');
    navigator.clipboard.writeText(combined);
    setCopiedBatchAll(true);
    setTimeout(() => setCopiedBatchAll(false), 2500);
  };

  const handleDownloadBatchCsv = () => {
    const headers = ['No', 'Nama Tamu', 'Tautan Undangan Khusus', 'Pesan WhatsApp'];
    const rows = batchResults.map((item, i) => [
      i + 1,
      `"${item.guestName.replace(/"/g, '""')}"`,
      `"${item.link}"`,
      `"${item.message.replace(/"/g, '""').replace(/\n/g, '\\n')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daftar_tautan_tamu_${invitation.slug || invitation.id}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5E0D8] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]">
          <div className="text-left">
            <h3 className="text-sm font-bold text-[#141413] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#C5A880]" />
              <span>Generator Tautan Undangan WhatsApp</span>
            </h3>
            <p className="text-xs text-[#7A756D] mt-0.5">
              Klien: <span className="font-semibold text-[#141413]">{invitation.clientName}</span> · ID: <span className="font-mono">{invitation.id}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50/70 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveMode('single')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeMode === 'single'
                ? 'border-[#C5A880] text-[#141413] font-bold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Tamu Tunggal (1 Orang)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('batch')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeMode === 'batch'
                ? 'border-[#C5A880] text-[#141413] font-bold bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Generator Massal / Batch ({guestNamesList.length} Tamu)</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-xs">
          
          {/* MODE 1: SINGLE GUEST */}
          {activeMode === 'single' && (
            <div className="space-y-4">
              {/* Guest Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#141413]">
                  Nama Tamu yang Dituju (Personalisasi URL ?to=)
                </label>
                <input 
                  type="text" 
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Bpk. Ahmad Dahlan & Keluarga"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5D0C6] rounded-xl text-xs text-[#141413] focus:outline-none focus:border-[#C5A880]"
                />
                <p className="text-[11px] text-[#7A756D]">
                  Nama tamu ini akan dicetak otomatis pada amplop sampul dan sambutan hangat undangan klien.
                </p>
              </div>

              {/* Generated URL Result */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#141413]">
                  Tautan Undangan Khusus
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={singleLink}
                    className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopySingleLink}
                    className="px-3.5 py-2.5 bg-[#141413] hover:bg-stone-800 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin' : 'Salin URL'}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Text Preview Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Pratinjau Pesan WhatsApp Otomatis
                  </label>
                  <button
                    type="button"
                    onClick={handleCopySingleMessage}
                    className="text-[11px] text-[#C5A880] hover:text-[#9A7D55] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedMessage ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMessage ? 'Teks Tersalin!' : 'Salin Format Teks'}</span>
                  </button>
                </div>

                <textarea 
                  readOnly
                  rows={6}
                  value={singleMessage}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl text-xs text-[#242321] leading-relaxed font-sans resize-none select-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleOpenSingleWhatsApp}
                  className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim via WhatsApp Web / App</span>
                </button>

                <a
                  href={singleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Tautan</span>
                </a>
              </div>
            </div>
          )}

          {/* MODE 2: BATCH GUEST GENERATOR */}
          {activeMode === 'batch' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-1">
                <span className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Generator Undangan Massal (Sekali Banyak)</span>
                </span>
                <p className="text-[11px] text-stone-600">
                  Tempel daftar nama tamu di bawah (satu baris per nama). Sistem akan menghasilkan tautan personalisasi unik untuk setiap tamu dan memungkinkan Anda mengunduh spreadsheet CSV untuk disebar tim WO/pengantin.
                </p>
              </div>

              {/* Input Area */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Tempel Daftar Nama Tamu (1 Nama Per Baris):
                </label>
                <textarea
                  rows={4}
                  value={batchNamesText}
                  onChange={(e) => setBatchNamesText(e.target.value)}
                  placeholder="Budi Santoso & Istri&#10;dr. Amanda Putri&#10;Keluarga Pak RT 05"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-sans text-stone-900 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-xs font-medium text-stone-600">
                  Total Terdeteksi: <strong className="text-stone-900">{batchResults.length} tamu</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAllBatchText}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedBatchAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBatchAll ? 'Semua Teks Tersalin!' : 'Salin Semua Teks WA'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBatchCsv}
                    className="px-3.5 py-1.5 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor CSV / Excel</span>
                  </button>
                </div>
              </div>

              {/* Generated Links Preview List */}
              <div className="border border-stone-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7F2] border-b border-stone-200 text-[10px] uppercase font-semibold text-stone-600">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Nama Tamu</th>
                      <th className="py-2.5 px-3">Tautan Personal (?to=)</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-normal">
                    {batchResults.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="py-2 px-3 font-mono text-stone-400 text-[10px]">
                          #{idx + 1}
                        </td>
                        <td className="py-2 px-3 font-semibold text-stone-900">
                          {item.guestName}
                        </td>
                        <td className="py-2 px-3 font-mono text-[10px] text-stone-500 truncate max-w-[200px]">
                          {item.link}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopyBatchRow(item.link, idx)}
                              className="p-1.5 rounded bg-stone-100 hover:bg-[#C5A880] hover:text-black text-stone-600 transition-colors cursor-pointer"
                              title="Salin Tautan"
                            >
                              {copiedRowIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>

                            <a
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(item.message)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
                              title="Kirim ke WhatsApp"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
