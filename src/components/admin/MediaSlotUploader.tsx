import React, { useRef } from 'react';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import { MediaSlotDefinition } from '../../admin/templateRegistry';

// Library of high-res authentic wedding photos ready for quick pick
const ASSET_LIBRARY = [
  { label: 'Potret Mempelai Berdua (Editorial)', src: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg' },
  { label: 'Mempelai Wanita Gaun Sutra & Veil', src: '/src/assets/images/wedding_bride_veil_1790901501919.jpg' },
  { label: 'Mempelai Pria Jas Hitam Klasik', src: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg' },
  { label: 'Sepasang Cincin Emas di Meja Travertine', src: '/src/assets/images/editorial_venue_rings_1790838653826.jpg' },
  { label: 'Buket Mawar Putih & Buku Sumpah', src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg' },
  { label: 'Tarian Pertama di Bawah Cahaya Lampu', src: '/src/assets/images/wedding_dance_lights_1790901533590.jpg' },
  { label: 'Sepatu Pengantin & Perhiasan Antik', src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg' },
  { label: 'Pasangan Analog 35mm Vintage', src: '/src/assets/images/film_vintage_couple_1791034007642.jpg' },
  { label: 'Pasangan Outdoor Sage Botanical', src: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg' },
  { label: 'Resepsi Onyx Emerald Art Deco', src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg' },
  { label: 'Segel Lilin Emas Monogram KA', src: '/src/assets/images/wax_seal_gold_monogram_1790915522548.jpg' },
];

interface MediaSlotUploaderProps {
  slot: MediaSlotDefinition;
  value: string | string[] | undefined;
  onChange: (newValue: string | string[]) => void;
}

export const MediaSlotUploader: React.FC<MediaSlotUploaderProps> = ({
  slot,
  value,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Single vs Multiple
  const isMultiple = Boolean(slot.isMultiple);
  const currentImages: string[] = isMultiple 
    ? (Array.isArray(value) ? value : (value ? [value] : []))
    : (typeof value === 'string' && value ? [value] : []);

  // Handle local device file upload via FileReader (data URL)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (!result) return;

        if (isMultiple) {
          onChange([...currentImages, result]);
        } else {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectFromLibrary = (src: string) => {
    if (isMultiple) {
      onChange([...currentImages, src]);
    } else {
      onChange(src);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (isMultiple) {
      const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
      onChange(updated);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-3 p-4 bg-[#F8F7F4] border border-[#E8E4DD] rounded-xl text-left">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#181816] tracking-wide flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{slot.label}</span>
          </p>
          <p className="text-[11px] text-[#78756E] mt-0.5">
            {slot.description}
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-white border border-[#E8E4DD] px-2 py-0.5 rounded text-[#78756E]">
          Rasio: {slot.aspectRatio}
        </span>
      </div>

      {/* Render Current Uploaded / Selected Images */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {currentImages.map((src, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-[#E8E4DD] shadow-2xs"
            >
              <img 
                src={src} 
                alt={`${slot.label} ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors opacity-90 group-hover:opacity-100 cursor-pointer"
                title="Hapus foto ini"
              >
                <X className="w-3 h-3" />
              </button>
              <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/80 bg-black/60 px-1.5 rounded">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Action Controls: Upload from device OR Pick from curated library */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#EAE6DE]">
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          multiple={isMultiple}
          onChange={handleFileChange}
          className="hidden" 
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white hover:bg-neutral-50 border border-[#D5D0C6] text-[#242321] rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Unggah File dari Komputer</span>
        </button>

        {/* Quick Pick Dropdown from Library */}
        <div className="relative group">
          <button
            type="button"
            className="inline-flex items-center gap-1 py-1.5 px-3 bg-white hover:bg-neutral-50 border border-[#D5D0C6] text-[#605C55] rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pilih dari Galeri Sekarsiti</span>
          </button>

          <div className="hidden group-hover:block absolute left-0 bottom-full mb-1 z-30 w-72 max-h-56 overflow-y-auto bg-white border border-[#E5E0D8] rounded-xl shadow-xl p-2 space-y-1">
            <p className="text-[10px] font-semibold text-[#8C867C] px-2 py-1 uppercase tracking-wider">
              Pustaka Foto Pre-wedding Sekarsiti
            </p>
            {ASSET_LIBRARY.map((asset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectFromLibrary(asset.src)}
                className="w-full flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#FAF7F2] text-left transition-colors cursor-pointer text-xs"
              >
                <img src={asset.src} alt={asset.label} className="w-9 h-9 object-cover rounded shrink-0 border border-[#E5E0D8]" />
                <span className="text-[11px] text-[#242321] truncate">{asset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {isMultiple && (
          <span className="text-[10px] text-[#8C867C] ml-auto font-mono">
            {currentImages.length} foto terpilih (Bebas Tambah)
          </span>
        )}
      </div>
    </div>
  );
};
