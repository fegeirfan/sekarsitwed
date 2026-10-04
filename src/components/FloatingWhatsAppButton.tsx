import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  onOpenOrderModal: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ onOpenOrderModal }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 sm:right-7 z-40 flex items-end gap-2.5">
      {/* Small floating tooltip pill with close button */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 bg-white text-[#414A35] rounded-full shadow-md border border-[#EBE6DD] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B74] animate-pulse" />
          <span className="font-light text-[11px]">Ada pertanyaan? Hubungi kami</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#8E9385] hover:text-[#414A35] ml-1 cursor-pointer"
            aria-label="Tutup pesan"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main floating circle button in deep olive */}
      <button
        onClick={onOpenOrderModal}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-[#414A35] hover:bg-[#343B2A] text-[#F7F5EF] rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Hubungi via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-[#F7F5EF] transition-transform" />
      </button>
    </div>
  );
};
