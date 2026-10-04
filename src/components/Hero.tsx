import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onExploreHowItWorks,
}) => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden bg-[#F7F5EF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow */}
            <p className="text-xs sm:text-[13px] font-sans font-semibold tracking-widest text-[#414A35]/70 uppercase">
              UNDANGAN DIGITAL · TEMPLATE PILIHAN
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-serif font-normal text-[#2C2E28] leading-[1.12] tracking-tight text-balance">
              Untuk hari yang punya cerita.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#55594F] leading-relaxed max-w-lg font-sans font-light">
              Koleksi undangan digital dengan desain yang menarik, mudah disesuaikan, dan harga yang bersahabat. Temukan tampilan yang paling sesuai untuk hari istimewamu.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Primary CTA */}
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-1.5 px-7 py-3.5 text-sm font-medium text-[#F7F5EF] bg-[#414A35] hover:bg-[#323929] rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              >
                <span>Jelajahi koleksi ↗</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onExploreHowItWorks}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-medium text-[#414A35] hover:text-[#2C2E28] hover:bg-[#EBE6DD]/60 rounded-full transition-colors cursor-pointer"
              >
                <span>Cara pemesanan →</span>
              </button>
            </div>
          </div>

          {/* Right Visual Composition Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              
              {/* Main Stationery Photograph */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#EBE6DD] bg-white">
                <img
                  src="/src/assets/images/hero_invitation_showcase_1790827045499.jpg"
                  alt="Komposisi stationery undangan pernikahan sekarsiti dengan pita sutra dan segel lilin"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-4/3 sm:aspect-16/11 object-cover"
                />
              </div>

              {/* Overlapping secondary stationery card with delicate botanical detail */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-52 rounded-xl overflow-hidden shadow-md border border-[#EBE6DD] bg-white p-2.5 transition-transform hover:-translate-y-1">
                <img
                  src="/src/assets/images/template_sore_teduh_1790831280150.jpg"
                  alt="Detail tekstur kertas dan bayangan daun zaitun"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="pt-2 px-1 text-left">
                  <p className="text-[11px] font-serif text-[#2C2E28]">Seri Alam &amp; Kertas</p>
                  <p className="text-[10px] text-[#7A8B74]">Tekstur hangat &amp; natural</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
