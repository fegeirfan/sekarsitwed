import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/catalog';

export const HowItWorks: React.FC = () => {
  return (
    <section id="cara-kerja" className="py-24 sm:py-32 bg-[#FAF8F3] border-t border-[#EBE6DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 text-left">
          <p className="text-xs font-sans font-semibold tracking-widest text-[#414A35]/70 uppercase">
            CARA KERJA
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal text-[#2C2E28] leading-[1.2] text-balance">
            Undanganmu, dengan caramu.
          </h2>
          <p className="text-base text-[#55594F] font-light leading-relaxed">
            Pilih desain, lengkapi informasi acara, dan siapkan undangan untuk dibagikan. Semua dimulai dari template yang kamu sukai.
          </p>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="space-y-5 text-left">
              {/* Step Number with delicate hairline rule */}
              <div className="flex items-center gap-4">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-[#7A8B74] tabular-nums">
                  {step.number}
                </span>
                <div className="h-[1px] flex-1 bg-[#E0DACF]" />
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#2C2E28]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#55594F] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
