import React from 'react';
import { TemplateId } from '../../../types/clientInvitation';
import { TEMPLATE_REGISTRY } from '../../../admin/templateRegistry';
import { Check, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplateId: TemplateId;
  onSelect: (templateId: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelect
}) => {
  return (
    <div className="space-y-4 text-left">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span>Pilih Desain Basis Undangan Klien</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Setiap template memiliki struktur visual, palet warna, tipografi, dan slot media yang telah dioptimalkan secara spesifik.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(TEMPLATE_REGISTRY) as TemplateId[]).map((tId) => {
          const item = TEMPLATE_REGISTRY[tId];
          const isSelected = selectedTemplateId === tId;

          return (
            <div
              key={tId}
              onClick={() => onSelect(tId)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#C5A880] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C5A880]/30' 
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-200 relative group">
                  <img 
                    src={item.coverThumbnail} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#141413] text-[#C5A880] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3 text-[#C5A880]" />
                      <span>Dipilih</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A880]">
                      {item.styleLabel}
                    </span>
                    <span className="font-mono text-[9px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                      ID: {tId}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Template features chips */}
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex flex-wrap gap-1 text-[10px] text-stone-600">
                {item.hasFilmstrip && (
                  <span className="bg-stone-100 px-2 py-0.5 rounded">35mm Filmstrip</span>
                )}
                {item.hasDresscode && (
                  <span className="bg-stone-100 px-2 py-0.5 rounded">Dresscode Swatch</span>
                )}
                {item.hasStoryChapters && (
                  <span className="bg-stone-100 px-2 py-0.5 rounded">Story Timeline</span>
                )}
                {item.hasWaxSeal && (
                  <span className="bg-stone-100 px-2 py-0.5 rounded">Segel Lilin Monogram</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
