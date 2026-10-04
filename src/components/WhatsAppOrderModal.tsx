import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Settings2 } from 'lucide-react';
import { InvitationItem } from '../types';
import { TEMPLATES } from '../data/catalog';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem?: InvitationItem | null;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedItem,
}) => {
  // Admin phone number for WhatsApp direct validation
  const [adminPhone, setAdminPhone] = useState(() => {
    return localStorage.getItem('sekarsiti_admin_phone') || '6281234567890';
  });
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Form states
  const [coupleName, setCoupleName] = useState('Bagas & Nirmala');
  const [eventDate, setEventDate] = useState('2026-10-24');
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('Ruang Rasa');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preselectedItem) {
      setSelectedTemplateTitle(preselectedItem.title);
    } else {
      setSelectedTemplateTitle(TEMPLATES[0].title);
    }
  }, [preselectedItem, isOpen]);

  if (!isOpen) return null;

  // Build warm, understated WhatsApp message
  const generatedMessage = `Halo sekarsiti, saya ingin memesan template undangan:

• Pilihan Desain: ${selectedTemplateTitle} (Rp49.000)
• Nama Pasangan: ${coupleName || '-'}
• Rencana Tanggal Acara: ${eventDate || '-'}
• Catatan: ${notes || 'Mohon panduan untuk pengisian data dan langkah selanjutnya.'}

Terima kasih.`;

  const waUrl = `https://wa.me/${adminPhone.replace(/\D/g, '')}?text=${encodeURIComponent(generatedMessage)}`;

  const handleSavePhone = () => {
    localStorage.setItem('sekarsiti_admin_phone', adminPhone);
    setIsEditingPhone(false);
  };

  const handleSendOrder = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2E28]/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF8F3] rounded-2xl shadow-xl overflow-hidden border border-[#EBE6DD] my-auto text-[#2C2E28]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#414A35] text-[#F7F5EF] flex items-start justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-sans font-semibold tracking-widest text-[#E3DFD5] uppercase">
              sekarsiti · Pemesanan Langsung
            </span>
            <h3 className="text-2xl font-serif font-normal text-[#F7F5EF]">
              Pilih Desain &amp; Hubungi Kami
            </h3>
            <p className="text-xs text-[#E3DFD5] font-light">
              Lengkapi data singkat berikut untuk langsung tersambung via WhatsApp.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E3DFD5] hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-left max-h-[70vh] overflow-y-auto">
          
          {/* Admin phone configurator for business validation testing */}
          <div className="p-3 bg-white rounded-xl border border-[#EBE6DD] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#7A8B74]">Tujuan WhatsApp:</span>
              {isEditingPhone ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    placeholder="Contoh: 6281234567890"
                    className="p-1 px-2 text-xs border border-[#EBE6DD] rounded font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleSavePhone}
                    className="px-2.5 py-1 bg-[#414A35] text-white rounded text-[11px] font-medium"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <span className="font-mono font-medium text-[#414A35]">
                  +{adminPhone}
                </span>
              )}
            </div>

            {!isEditingPhone && (
              <button
                onClick={() => setIsEditingPhone(true)}
                className="flex items-center gap-1 text-[11px] text-[#7A8B74] hover:text-[#414A35] underline cursor-pointer"
              >
                <Settings2 className="w-3 h-3" />
                <span>Ganti Nomor</span>
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#414A35] mb-1">
                Pilihan Template
              </label>
              <select
                value={selectedTemplateTitle}
                onChange={(e) => setSelectedTemplateTitle(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#EBE6DD] bg-white text-[#2C2E28] focus:outline-none focus:border-[#414A35]"
              >
                {TEMPLATES.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title} — {item.styleLabel} (Rp49.000)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#414A35] mb-1">
                  Nama Pasangan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bagas & Nirmala"
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#EBE6DD] bg-white text-[#2C2E28] focus:outline-none focus:border-[#414A35]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#414A35] mb-1">
                  Rencana Tanggal Acara
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#EBE6DD] bg-white text-[#2C2E28] focus:outline-none focus:border-[#414A35]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#414A35] mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Misal: Perlu tambahan peta lokasi khusus atau 2 rekening bank..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#EBE6DD] bg-white text-[#2C2E28] focus:outline-none focus:border-[#414A35] resize-none"
              />
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-medium text-[#7A8B74]">
              Pratinjau Pesan WhatsApp:
            </span>
            <div className="p-3 bg-white border border-[#EBE6DD] rounded-xl font-mono text-[11px] text-[#414A35] whitespace-pre-wrap leading-relaxed">
              {generatedMessage}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#EBE6DD] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#7A8B74] font-light">
            Sekali bayar Rp49.000 · Tanpa biaya tersembunyi
          </span>

          <button
            onClick={handleSendOrder}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-[#414A35] hover:bg-[#343B2A] text-[#F7F5EF] text-xs sm:text-sm font-medium rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#F7F5EF]" />
            <span>Kirim Pesanan ke WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
