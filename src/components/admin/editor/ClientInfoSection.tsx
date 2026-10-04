import React from 'react';
import { ClientInvitationData, OrderStatus } from '../../../types/clientInvitation';
import { UserCheck, Hash, Phone, Mail, Link as LinkIcon } from 'lucide-react';

interface ClientInfoSectionProps {
  formData: ClientInvitationData;
  onChange: (field: keyof ClientInvitationData, value: any) => void;
}

export const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="max-w-2xl text-left space-y-5">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Informasi Pemesan &amp; Status Pengerjaan</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Kelola rincian data kontak klien pemesan dan pantau tahapan pengerjaan desain undangan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Client Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Nama Pasangan / Judul Klien *
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => {
              const val = e.target.value;
              onChange('clientName', val);
              // auto generate clean slug if slug hasn't been customized heavily
              const autoSlug = val
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
              onChange('slug', autoSlug || 'undangan-klien');
            }}
            placeholder="Contoh: Kirana & Adhitya"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Status Undangan *
          </label>
          <select
            value={formData.status}
            onChange={(e) => onChange('status', e.target.value as OrderStatus)}
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          >
            <option value="pending">Draf Baru (Pending)</option>
            <option value="in_progress">Dalam Proses Desain</option>
            <option value="review">Review Klien</option>
            <option value="published">Siap Publikasi (Published)</option>
          </select>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <LinkIcon className="w-3 h-3 text-stone-400" />
            <span>URL Slug Identifikasi</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            placeholder="kirana-adhitya"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <Phone className="w-3 h-3 text-stone-400" />
            <span>Nomor WhatsApp Klien</span>
          </label>
          <input
            type="tel"
            value={formData.clientPhone}
            onChange={(e) => onChange('clientPhone', e.target.value)}
            placeholder="081234567890"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <Mail className="w-3 h-3 text-stone-400" />
            <span>Email Klien (Opsional)</span>
          </label>
          <input
            type="email"
            value={formData.clientEmail || ''}
            onChange={(e) => onChange('clientEmail', e.target.value)}
            placeholder="klien@gmail.com"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>
    </div>
  );
};
