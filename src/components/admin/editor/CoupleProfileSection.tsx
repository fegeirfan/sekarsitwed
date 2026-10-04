import React from 'react';
import { ClientInvitationData } from '../../../types/clientInvitation';
import { Heart, Instagram } from 'lucide-react';

interface CoupleProfileSectionProps {
  formData: ClientInvitationData;
  onChange: (field: keyof ClientInvitationData, value: any) => void;
}

export const CoupleProfileSection: React.FC<CoupleProfileSectionProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="max-w-2xl text-left space-y-6">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#C5A880]" />
          <span>Profil Kedua Mempelai &amp; Keluarga</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Informasi nama panggilan, nama lengkap bergelar, silsilah keluarga, dan akun media sosial.
        </p>
      </div>

      {/* Mempelai Wanita */}
      <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
            MEMPELAI WANITA (THE BRIDE)
          </span>
          <span className="text-[10px] text-stone-400">Pihak Pengantin Putri</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Panggilan *
            </label>
            <input
              type="text"
              value={formData.brideName}
              onChange={(e) => onChange('brideName', e.target.value)}
              placeholder="Contoh: Kirana"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Lengkap &amp; Gelar Resmi *
            </label>
            <input
              type="text"
              value={formData.brideFullName}
              onChange={(e) => onChange('brideFullName', e.target.value)}
              placeholder="Contoh: Kirana Ayu Lestari, S.Ds."
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Keterangan Orang Tua Mempelai Wanita
            </label>
            <input
              type="text"
              value={formData.brideParents}
              onChange={(e) => onChange('brideParents', e.target.value)}
              placeholder="Contoh: Putri pertama Bapak Hendra Wijaya & Ibu Sinta Maharani"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Instagram className="w-3 h-3 text-stone-400" />
              <span>Username Instagram</span>
            </label>
            <input
              type="text"
              value={formData.brideInstagram || ''}
              onChange={(e) => onChange('brideInstagram', e.target.value)}
              placeholder="@kiranaayuu"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>
      </div>

      {/* Mempelai Pria */}
      <div className="p-4 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
            MEMPELAI PRIA (THE GROOM)
          </span>
          <span className="text-[10px] text-stone-400">Pihak Pengantin Putra</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Panggilan *
            </label>
            <input
              type="text"
              value={formData.groomName}
              onChange={(e) => onChange('groomName', e.target.value)}
              placeholder="Contoh: Adhitya"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Nama Lengkap &amp; Gelar Resmi *
            </label>
            <input
              type="text"
              value={formData.groomFullName}
              onChange={(e) => onChange('groomFullName', e.target.value)}
              placeholder="Contoh: Adhitya Nugraha, B.Eng."
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Keterangan Orang Tua Mempelai Pria
            </label>
            <input
              type="text"
              value={formData.groomParents}
              onChange={(e) => onChange('groomParents', e.target.value)}
              placeholder="Contoh: Putra kedua Bapak Suryanto Nugraha & Ibu Ratna Dewi"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Instagram className="w-3 h-3 text-stone-400" />
              <span>Username Instagram</span>
            </label>
            <input
              type="text"
              value={formData.groomInstagram || ''}
              onChange={(e) => onChange('groomInstagram', e.target.value)}
              placeholder="@adhityanugraha"
              className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
