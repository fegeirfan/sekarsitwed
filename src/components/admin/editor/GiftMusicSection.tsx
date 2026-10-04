import React from 'react';
import { ClientInvitationData } from '../../../types/clientInvitation';
import { CreditCard, Music, Quote } from 'lucide-react';

interface GiftMusicSectionProps {
  formData: ClientInvitationData;
  onChange: (field: keyof ClientInvitationData, value: any) => void;
}

export const GiftMusicSection: React.FC<GiftMusicSectionProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="max-w-2xl text-left space-y-5">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#C5A880]" />
          <span>Tanda Kasih (Amplop Digital) &amp; Musik Latar</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Atur rekening penerimaan tanda kasih dan lagu instrumen pengiring undangan.
        </p>
      </div>

      {/* Primary Bank */}
      <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block">
          REKENING BANK UTAMA
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Bank
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => onChange('bankName', e.target.value)}
              placeholder="BCA"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nomor Rekening
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => onChange('accountNumber', e.target.value)}
              placeholder="8271029384"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Atas Nama Pemilik
            </label>
            <input
              type="text"
              value={formData.accountHolder}
              onChange={(e) => onChange('accountHolder', e.target.value)}
              placeholder="Kirana Ayu Lestari"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Secondary Bank (Optional) */}
      <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
          REKENING BANK KEDUA (OPSIONAL)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Bank Kedua
            </label>
            <input
              type="text"
              value={formData.secondaryBankName || ''}
              onChange={(e) => onChange('secondaryBankName', e.target.value)}
              placeholder="Mandiri"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nomor Rekening Kedua
            </label>
            <input
              type="text"
              value={formData.secondaryAccountNumber || ''}
              onChange={(e) => onChange('secondaryAccountNumber', e.target.value)}
              placeholder="140001928374"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Atas Nama Pemilik Kedua
            </label>
            <input
              type="text"
              value={formData.secondaryAccountHolder || ''}
              onChange={(e) => onChange('secondaryAccountHolder', e.target.value)}
              placeholder="Adhitya Nugraha"
              className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Song & Quote */}
      <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Judul Lagu Latar (Audio Player)</span>
          </label>
          <input
            type="text"
            value={formData.songTitle}
            onChange={(e) => onChange('songTitle', e.target.value)}
            placeholder="Until I Found You - Stephen Sanchez (Violin Solo)"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Teks Kutipan Suci / Syair Doa</span>
          </label>
          <textarea
            rows={3}
            value={formData.quoteText}
            onChange={(e) => onChange('quoteText', e.target.value)}
            placeholder="Tuliskan ayat suci atau bait doa pembuka..."
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Sumber Kutipan
          </label>
          <input
            type="text"
            value={formData.quoteSource}
            onChange={(e) => onChange('quoteSource', e.target.value)}
            placeholder="Contoh: QS. Ar-Rum : 21"
            className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
