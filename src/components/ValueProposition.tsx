import React from 'react';
import { Sparkles, Tag, Smartphone } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  return (
    <section className="border-y border-[#EBE6DD] bg-[#FAF8F3] py-8 sm:py-9">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start text-left md:text-center">
          
          {/* Item 1 */}
          <div className="flex items-start md:items-center md:flex-col gap-3.5 md:gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBE6DD]/60 flex items-center justify-center shrink-0 text-[#414A35]">
              <Sparkles className="w-4 h-4 text-[#7A8B74] stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-sans font-medium text-[#414A35]">
                Desain pilihan
              </p>
              <p className="text-xs text-[#6B6F63] font-light mt-0.5">
                Beragam gaya untuk berbagai selera.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start md:items-center md:flex-col gap-3.5 md:gap-2 md:border-x md:border-[#EBE6DD] md:px-4">
            <div className="w-8 h-8 rounded-full bg-[#EBE6DD]/60 flex items-center justify-center shrink-0 text-[#414A35]">
              <Tag className="w-4 h-4 text-[#7A8B74] stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-sans font-medium text-[#414A35]">
                Harga bersahabat
              </p>
              <p className="text-xs text-[#6B6F63] font-light mt-0.5">
                Pilihan undangan digital dengan harga yang jelas.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start md:items-center md:flex-col gap-3.5 md:gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBE6DD]/60 flex items-center justify-center shrink-0 text-[#414A35]">
              <Smartphone className="w-4 h-4 text-[#7A8B74] stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-sans font-medium text-[#414A35]">
                Praktis digunakan
              </p>
              <p className="text-xs text-[#6B6F63] font-light mt-0.5">
                Sesuaikan detail dan bagikan undangan secara digital.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

