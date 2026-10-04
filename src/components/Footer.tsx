import React from 'react';

interface FooterProps {
  onContactWhatsApp: () => void;
  onOpenAdmin?: () => void;
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactWhatsApp, onOpenAdmin, onOpenPortal }) => {
  return (
    <footer className="bg-[#F7F5EF] text-[#55594F] py-14 sm:py-20 border-t border-[#EBE6DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Brand Wordmark & Short Brand Line */}
          <div className="space-y-2 text-left">
            <span className="text-2xl font-serif font-normal tracking-tight text-[#414A35]">
              sekarsiti
            </span>
            <p className="text-xs sm:text-sm text-[#7A8B74] font-light max-w-sm">
              Undangan digital terkurasi untuk hari yang berarti.
            </p>
          </div>

          {/* Navigation & Contact Links */}
          <div className="flex flex-wrap items-center gap-7 sm:gap-10 text-xs sm:text-sm font-medium text-[#414A35]">
            <a href="#koleksi" className="hover:text-[#2C2E28] transition-colors">
              Koleksi
            </a>
            <a href="#cara-kerja" className="hover:text-[#2C2E28] transition-colors">
              Cara Kerja
            </a>
            <a href="#tentang" className="hover:text-[#2C2E28] transition-colors">
              Tentang
            </a>
            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="hover:text-[#2C2E28] text-stone-700 transition-colors cursor-pointer"
              >
                Portal Mempelai
              </button>
            )}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#2C2E28] text-[#C5A880] transition-colors cursor-pointer"
              >
                Studio Admin
              </button>
            )}
            <button
              onClick={onContactWhatsApp}
              className="hover:text-[#2C2E28] transition-colors cursor-pointer"
            >
              WhatsApp
            </button>
          </div>

        </div>

        {/* Quiet Bottom Line */}
        <div className="pt-8 border-t border-[#EBE6DD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9385] font-light gap-3">
          <p>© {new Date().getFullYear()} sekarsiti. Hak cipta dilindungi.</p>
          <p>Dibuat dengan tenang di Indonesia.</p>
        </div>

      </div>
    </footer>
  );
};
