import React from 'react';

export const BrandStory: React.FC = () => {
  return (
    <section id="tentang" className="py-24 sm:py-32 bg-[#F7F5EF] border-t border-[#EBE6DD]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Small intimate botanical/stationery photograph */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="w-56 sm:w-64 rounded-2xl overflow-hidden border border-[#EBE6DD] bg-white shadow-sm">
              <img
                src="/src/assets/images/brand_story_botanical_1790831303860.jpg"
                alt="Detail kertas buatan tangan dan ranting zaitun sekarsiti"
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Quiet Story Content */}
          <div className="md:col-span-7 space-y-5 text-left">
            <p className="text-xs font-sans font-semibold tracking-widest text-[#414A35]/70 uppercase">
              TENTANG SEKARSITI
            </p>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#2C2E28] leading-[1.25] text-balance">
              Setiap cerita punya gayanya sendiri.
            </h2>
            
            <p className="text-base sm:text-lg text-[#55594F] font-light leading-relaxed">
              Sekarsiti menghadirkan koleksi undangan digital dengan beragam desain dan harga yang bersahabat. Kami ingin membantu setiap pasangan menemukan undangan yang sesuai dengan selera, kebutuhan, dan anggaran mereka.
            </p>

            <p className="text-sm sm:text-base text-[#7A8B74] font-serif italic leading-relaxed">
              Karena setiap perayaan memiliki cerita dan pilihan yang berbeda.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
