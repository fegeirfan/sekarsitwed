import React from 'react';
import { ClientInvitationData } from '../../../types/clientInvitation';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';

interface EventScheduleSectionProps {
  formData: ClientInvitationData;
  onChange: (field: keyof ClientInvitationData, value: any) => void;
}

export const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="max-w-2xl text-left space-y-5">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          <span>Waktu, Lokasi &amp; Rangkaian Acara</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Jadwal pelaksanaan prosesi akad, resepsi, serta integrasi titik lokasi Google Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Event Date Formatted */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Tanggal Perayaan (Teks Kalender) *
          </label>
          <input
            type="text"
            value={formData.eventDateFormatted}
            onChange={(e) => onChange('eventDateFormatted', e.target.value)}
            placeholder="Contoh: Minggu, 14 Februari 2027"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            required
          />
        </div>

        {/* Countdown ISO */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>Target Countdown (ISO Date &amp; Jam) *</span>
          </label>
          <input
            type="datetime-local"
            value={formData.countdownIsoDate.slice(0, 16)}
            onChange={(e) => onChange('countdownIsoDate', e.target.value)}
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
            required
          />
        </div>

        {/* Akad Time */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Waktu Akad / Pemberkatan
          </label>
          <input
            type="text"
            value={formData.akadTime}
            onChange={(e) => onChange('akadTime', e.target.value)}
            placeholder="08.00 – 09.30 WIB"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Akad Venue */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Tempat / Ruangan Akad
          </label>
          <input
            type="text"
            value={formData.akadVenue}
            onChange={(e) => onChange('akadVenue', e.target.value)}
            placeholder="Ruang Bimasena, Aryaduta Hotel"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Resepsi Time */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Waktu Resepsi Pernikahan
          </label>
          <input
            type="text"
            value={formData.resepsiTime}
            onChange={(e) => onChange('resepsiTime', e.target.value)}
            placeholder="11.00 – 14.00 WIB"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Resepsi Venue */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Tempat / Gedung Resepsi
          </label>
          <input
            type="text"
            value={formData.resepsiVenue}
            onChange={(e) => onChange('resepsiVenue', e.target.value)}
            placeholder="Grand Ballroom, Aryaduta Hotel"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-stone-400" />
            <span>Kota / Wilayah Acara</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Jakarta Selatan"
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Maps URL */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>Tautan Navigasi Google Maps</span>
            </span>
            {formData.mapsUrl && (
              <a
                href={formData.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#C5A880] hover:underline flex items-center gap-0.5"
              >
                <span>Uji Tautan</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </label>
          <input
            type="url"
            value={formData.mapsUrl}
            onChange={(e) => onChange('mapsUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>
    </div>
  );
};
