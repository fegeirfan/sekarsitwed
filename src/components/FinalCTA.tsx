import React from 'react';

interface FinalCTAProps {
  onExploreCollection: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreCollection }) => {
  return (
    <section className="bg-[#414A35] text-[#F7F5EF] py-24 sm:py-36 px-6 sm:px-8 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="space-y-4">
          <p className="text-xs font-sans font-semibold tracking-widest text-[#E3DFD5]/80 uppercase">
            KOLEKSI SEKARSITI
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal leading-[1.2] text-[#F7F5EF] text-balance">
            Desain yang kamu suka, untuk hari istimewa.
          </h2>
          <p className="text-base sm:text-lg text-[#E3DFD5] font-light leading-relaxed">
            Temukan undangan digital yang sesuai dengan gayamu.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onExploreCollection}
            className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 text-sm font-medium text-[#414A35] bg-[#F7F5EF] hover:bg-[#FAF8F3] active:scale-[0.98] rounded-full transition-all cursor-pointer shadow-sm"
          >
            <span>Lihat koleksi ↗</span>
          </button>
        </div>

      </div>
    </section>
  );
};
