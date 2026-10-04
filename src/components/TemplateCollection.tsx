import React, { useState } from 'react';
import { ArrowUpRight, Eye, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { InvitationItem } from '../types';
import { TEMPLATES } from '../data/catalog';

interface TemplateCollectionProps {
  onPreviewTemplate: (item: InvitationItem) => void;
  onOrderViaWhatsApp: (item: InvitationItem) => void;
  onOpenDedicatedDemo: (templateId: string) => void;
}

export const TemplateCollection: React.FC<TemplateCollectionProps> = ({
  onPreviewTemplate,
  onOrderViaWhatsApp,
  onOpenDedicatedDemo,
}) => {
  const [showAll, setShowAll] = useState(false);

  // The primary 5 templates converted with interactive demos
  const primaryTemplates = TEMPLATES.slice(0, 5);
  // Additional curated designs revealed upon clicking "Lihat semua desain"
  const displayedTemplates = showAll ? TEMPLATES : primaryTemplates;

  return (
    <section id="koleksi" className="py-24 sm:py-32 bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-xl space-y-4 text-left">
          <p className="text-xs font-sans font-semibold tracking-widest text-[#414A35]/70 uppercase">
            KOLEKSI TEMPLATE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#2C2E28] leading-[1.2] text-balance">
            Temukan desain favoritmu.
          </h2>
          <p className="text-base text-[#55594F] font-light leading-relaxed">
            Dari seri editorial modern, kemewahan Art Deco, sage minimalis, buku jurnal vintage, hingga rol film sinematik retro — pilih yang paling mencerminkan kisah cintamu.
          </p>
        </div>

        {/* Balanced Grid of Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedTemplates.map((template) => (
            <article
              key={template.id}
              className={`group flex flex-col justify-between bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md ${
                template.hasDedicatedDemo
                  ? 'border-[#BD9A5F]/80 ring-1 ring-[#BD9A5F]/30'
                  : 'border-[#EBE6DD] hover:border-[#D1C9BC]'
              }`}
            >
              
              {/* Product Preview Image */}
              <div 
                onClick={() => {
                  if (template.hasDedicatedDemo) {
                    onOpenDedicatedDemo(template.id);
                  } else {
                    onPreviewTemplate(template);
                  }
                }}
                className="relative aspect-4/3 overflow-hidden bg-[#EFECE4] cursor-pointer"
              >
                <img
                  src={template.image}
                  alt={`Template undangan digital ${template.title} oleh sekarsiti`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />


                {/* Subtle overlay hint */}
                <div className="absolute inset-0 bg-[#2C2E28]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#414A35] text-xs font-medium shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{template.hasDedicatedDemo ? 'Buka Demo Halaman Penuh' : 'Lihat demo'}</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs text-[#7A8B74]">
                    <span className="font-sans tracking-wide">{template.styleLabel}</span>
                    <span className="font-serif italic">{template.completionTime}</span>
                  </div>

                  <h3 
                    onClick={() => {
                      if (template.hasDedicatedDemo) {
                        onOpenDedicatedDemo(template.id);
                      } else {
                        onPreviewTemplate(template);
                      }
                    }}
                    className="text-2xl font-serif font-normal text-[#2C2E28] group-hover:text-[#414A35] transition-colors cursor-pointer"
                  >
                    {template.title}
                  </h3>

                  <p className="text-xs text-[#6B6F63] font-light leading-relaxed line-clamp-2">
                    {template.description}
                  </p>

                </div>

                {/* Pricing & Interactive Action Links */}
                <div className="pt-4 border-t border-[#F2EFE8] flex items-center justify-between">
                  <span className="text-sm font-serif font-medium text-[#414A35]">
                    Mulai Rp49.000
                  </span>

                  <div className="flex items-center gap-2">
                    {template.hasDedicatedDemo ? (
                      <button
                        onClick={() => onOpenDedicatedDemo(template.id)}
                        className="inline-flex items-center gap-1 text-xs text-[#1B2A22] font-semibold py-1 px-3 rounded-full bg-[#EBE6DD] hover:bg-[#ded6c9] transition-colors cursor-pointer"
                        title="Buka halaman demo React utuh"
                      >
                        <span>Demo Web</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#7A8B74]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onPreviewTemplate(template)}
                        className="inline-flex items-center gap-1 text-xs text-[#55594F] hover:text-[#414A35] font-medium py-1 px-2.5 rounded-full hover:bg-[#F7F5EF] transition-colors cursor-pointer"
                      >
                        <span>Lihat detail</span>
                        <ArrowUpRight className="w-3 h-3 text-[#7A8B74]" />
                      </button>
                    )}

                    <button
                      onClick={() => onOrderViaWhatsApp(template)}
                      className="inline-flex items-center justify-center p-2 rounded-full bg-[#414A35] hover:bg-[#323929] text-[#F7F5EF] transition-all cursor-pointer"
                      title="Pesan template ini via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </article>
          ))}
        </div>

        {/* Secondary Link: "Lihat semua desain" */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[#414A35] hover:text-[#2C2E28] border-b border-[#414A35]/30 hover:border-[#414A35] pb-0.5 transition-all cursor-pointer"
          >
            <span>{showAll ? 'Tampilkan desain pilihan saja' : 'Lihat semua desain'}</span>
            {showAll ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#7A8B74]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#7A8B74]" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
