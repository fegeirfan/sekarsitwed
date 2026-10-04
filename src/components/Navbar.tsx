import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onSelectTemplateCTA: () => void;
  onOpenAdmin?: () => void;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTemplateCTA, onOpenAdmin, onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#EBE6DD] transition-all">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Wordmark: sekarsiti, set in elegant lowercase serif typography */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-[#414A35] hover:opacity-85 transition-opacity"
        >
          sekarsiti
        </a>

        {/* Navigation: Koleksi, Cara Kerja, Tentang, Admin, Portal */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#414A35]/80">
          <a href="#koleksi" className="hover:text-[#414A35] transition-colors">
            Koleksi
          </a>
          <a href="#cara-kerja" className="hover:text-[#414A35] transition-colors">
            Cara Kerja
          </a>
          <a href="#tentang" className="hover:text-[#414A35] transition-colors">
            Tentang
          </a>
          {onOpenPortal && (
            <button
              onClick={onOpenPortal}
              className="text-xs uppercase tracking-wider text-stone-700 hover:text-[#414A35] font-semibold border-b border-stone-300 pb-0.5 transition-colors cursor-pointer"
            >
              Portal Mempelai
            </button>
          )}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#414A35] font-semibold border-b border-[#C5A880]/50 pb-0.5 transition-colors cursor-pointer"
            >
              Studio Admin
            </button>
          )}
        </nav>

        {/* Primary button: "Pilih Template" */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSelectTemplateCTA}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-medium text-[#F7F5EF] bg-[#414A35] hover:bg-[#343B2A] active:scale-[0.98] rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            Pilih Template
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#414A35] hover:text-[#2C2E28] md:hidden rounded-lg focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EBE6DD] bg-[#F7F5EF] px-6 py-5 space-y-3">
          <a
            href="#koleksi"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#414A35] py-1"
          >
            Koleksi
          </a>
          <a
            href="#cara-kerja"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#414A35] py-1"
          >
            Cara Kerja
          </a>
          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#414A35] py-1"
          >
            Tentang
          </a>
          {onOpenPortal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="block text-left text-sm font-semibold text-[#414A35] py-1"
            >
              Portal Mempelai
            </button>
          )}
          {onOpenAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="block text-left text-sm font-semibold text-[#C5A880] py-1"
            >
              Studio Admin &amp; Undangan Klien
            </button>
          )}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectTemplateCTA();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-medium text-[#F7F5EF] bg-[#414A35] rounded-full"
            >
              Pilih Template
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
