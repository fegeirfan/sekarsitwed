import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Copy, 
  Check, 
  Heart, 
  Send, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { InvitationItem } from '../types';

interface MobilePreviewModalProps {
  item: InvitationItem | null;
  allItems: InvitationItem[];
  onClose: () => void;
  onOrderViaWhatsApp: (item: InvitationItem) => void;
  onSelectAnotherItem: (item: InvitationItem) => void;
}

export const MobilePreviewModal: React.FC<MobilePreviewModalProps> = ({
  item,
  allItems,
  onClose,
  onOrderViaWhatsApp,
  onSelectAnotherItem,
}) => {
  const [isOpenInvitation, setIsOpenInvitation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [guestName, setGuestName] = useState('Bpk. Hendra & Keluarga');
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // RSVP simulation state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'ragu' | 'tidak'>('hadir');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [wishes, setWishes] = useState([
    {
      name: 'Raka & Dian',
      status: 'Hadir',
      message: 'Selamat untuk kalian berdua! Semoga menjadi keluarga yang sakinah dan selalu diberkahi kebahagiaan.',
      time: '1 jam lalu'
    },
    {
      name: 'dr. Farah Amanda',
      status: 'Hadir',
      message: 'Doa terbaik untuk hari bahagia kalian.',
      time: '3 jam lalu'
    }
  ]);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 11,
    minutes: 24,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAccount = () => {
    if (!item) return;
    navigator.clipboard.writeText(item.demoData.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    setWishes(prev => [
      {
        name: rsvpName,
        status: rsvpStatus === 'hadir' ? 'Hadir' : rsvpStatus === 'ragu' ? 'Masih Ragu' : 'Berhalangan',
        message: rsvpMessage,
        time: 'Baru saja'
      },
      ...prev
    ]);
    setRsvpSubmitted(true);
    setRsvpName('');
    setRsvpMessage('');
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2E28]/70 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F3] text-[#2C2E28] rounded-2xl shadow-2xl overflow-hidden border border-[#EBE6DD] my-auto flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-white text-[#414A35] transition-colors border border-[#EBE6DD] shadow-sm"
          aria-label="Tutup preview"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Desktop Template Information & Switcher */}
        <div className="hidden md:flex flex-col justify-between w-80 lg:w-88 p-8 border-r border-[#EBE6DD] bg-[#F7F5EF] overflow-y-auto text-left">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#7A8B74]">
                Pratinjau Langsung
              </span>
              <h3 className="text-3xl font-serif font-normal text-[#2C2E28]">
                {item.title}
              </h3>
              <p className="text-xs text-[#55594F] font-light">
                {item.styleLabel} · {item.completionTime}
              </p>
            </div>

            <p className="text-xs text-[#55594F] font-light leading-relaxed">
              {item.description}
            </p>

            {/* Template Features checklist */}
            <div className="p-4 rounded-xl bg-white border border-[#EBE6DD] space-y-2 text-xs">
              <p className="font-medium text-[#414A35]">Fitur yang disertakan:</p>
              <ul className="space-y-1.5 text-[#55594F] font-light">
                {item.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B74]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Template Switcher */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-medium text-[#414A35] block">
                Ganti Desain:
              </label>
              <select
                value={item.id}
                onChange={(e) => {
                  const target = allItems.find(i => i.id === e.target.value);
                  if (target) {
                    onSelectAnotherItem(target);
                    setIsOpenInvitation(false);
                  }
                }}
                className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#EBE6DD] text-[#2C2E28] focus:outline-none focus:border-[#414A35] cursor-pointer"
              >
                {allItems.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.title} ({i.styleLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EBE6DD] space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#7A8B74]">Harga:</span>
              <span className="text-lg font-serif font-medium text-[#414A35]">
                Mulai Rp{item.price.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={() => onOrderViaWhatsApp(item)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#414A35] hover:bg-[#323929] text-[#F7F5EF] text-xs font-medium rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#FAF8F3]" />
              <span>Pesan Desain Ini via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Right Side: Smartphone Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#EFECE4] overflow-y-auto">
          
          {/* Smartphone Frame Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[350px] h-[580px] sm:h-[620px] rounded-[38px] border-[7px] border-[#2C2E28] shadow-xl bg-[#F7F5EF] text-[#2C2E28] overflow-hidden flex flex-col">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-[#2C2E28] rounded-full z-30" />

            {/* Audio Toggle Floating Pill */}
            {isOpenInvitation && (
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="absolute top-7 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow text-[#414A35] border border-[#EBE6DD] text-xs flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
              >
                {isPlayingAudio ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#414A35] animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#8E9385]" />
                )}
              </button>
            )}

            {/* SCREEN 1: COVER SCREEN */}
            {!isOpenInvitation ? (
              <div className="relative flex-1 flex flex-col items-center justify-between p-6 text-center bg-gradient-to-b from-[#F7F5EF] via-[#FAF8F3] to-[#EFECE4] z-10 overflow-hidden">
                
                {/* Background Subtle Artwork */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img
                    src={item.image}
                    alt="Background preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 pt-10 space-y-2">
                  <p className="text-[11px] font-sans font-medium tracking-widest text-[#7A8B74] uppercase">
                    Pernikahan
                  </p>
                  <h2 className="text-3xl font-serif font-normal text-[#2C2E28] leading-tight">
                    {item.demoData.groomName.split(' ')[0]} &amp; {item.demoData.brideName.split(' ')[0]}
                  </h2>
                  <p className="text-xs text-[#55594F] font-light">
                    {item.demoData.eventDate}
                  </p>
                </div>

                {/* Personal Guest Name & Wax Seal Open Button */}
                <div className="relative z-10 w-full space-y-4 my-auto py-3">
                  <div className="p-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EBE6DD] text-left">
                    <p className="text-[10px] text-[#7A8B74] uppercase tracking-wider">Kepada Yth:</p>
                    <div className="flex items-center justify-between mt-1">
                      {isEditingGuest ? (
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          onBlur={() => setIsEditingGuest(false)}
                          autoFocus
                          className="text-xs font-serif font-medium text-[#2C2E28] bg-[#F7F5EF] border border-[#EBE6DD] rounded px-1.5 py-0.5 w-full focus:outline-none"
                        />
                      ) : (
                        <p className="text-xs font-serif font-medium text-[#2C2E28] truncate">
                          {guestName}
                        </p>
                      )}
                      <button
                        onClick={() => setIsEditingGuest(!isEditingGuest)}
                        className="text-[10px] text-[#414A35] font-medium ml-2 underline shrink-0 cursor-pointer"
                      >
                        {isEditingGuest ? 'Simpan' : 'Ganti'}
                      </button>
                    </div>
                  </div>

                  {/* Wax Seal Open Invitation Button */}
                  <button
                    onClick={() => {
                      setIsOpenInvitation(true);
                      setIsPlayingAudio(true);
                    }}
                    className="mx-auto flex items-center justify-center gap-2 py-3 px-6 bg-[#414A35] hover:bg-[#343B2A] text-[#F7F5EF] rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#C8A8A1]" />
                    <span className="text-xs font-medium tracking-wide">Buka Undangan</span>
                  </button>
                </div>

                <div className="relative z-10 text-[10px] text-[#8E9385] pb-2 font-light">
                  Sentuh tombol untuk membuka simulasi
                </div>
              </div>
            ) : (
              /* SCREEN 2: SCROLLABLE INVITATION BODY */
              <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 text-center text-[#2C2E28]">
                
                {/* Header Names */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-[#7A8B74]">
                    Walimatul &apos;Ursy
                  </span>
                  <h3 className="text-2xl font-serif font-normal text-[#2C2E28]">
                    {item.demoData.groomName.split(' ')[0]} &amp; {item.demoData.brideName.split(' ')[0]}
                  </h3>
                  <p className="text-[11px] text-[#55594F] font-light italic max-w-xs mx-auto px-3">
                    {item.demoData.loveQuote}
                  </p>
                </div>

                {/* Music Indicator */}
                <div className="p-2.5 rounded-lg bg-white border border-[#EBE6DD] text-left flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B74] animate-pulse shrink-0" />
                    <span className="text-[#55594F] truncate font-light">{item.demoData.songTitle}</span>
                  </div>
                  <span className="text-[9px] text-[#8E9385] shrink-0">Musik latar</span>
                </div>

                {/* Countdown Timer */}
                <div className="p-3.5 rounded-xl bg-white border border-[#EBE6DD] space-y-2">
                  <p className="text-[11px] font-serif text-[#414A35]">Menuju Hari Bahagia</p>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-[#FAF8F3] p-1.5 rounded-lg border border-[#EBE6DD]">
                      <span className="block text-base font-serif text-[#2C2E28] tabular-nums">{timeLeft.days}</span>
                      <span className="text-[9px] text-[#7A8B74]">Hari</span>
                    </div>
                    <div className="bg-[#FAF8F3] p-1.5 rounded-lg border border-[#EBE6DD]">
                      <span className="block text-base font-serif text-[#2C2E28] tabular-nums">{timeLeft.hours}</span>
                      <span className="text-[9px] text-[#7A8B74]">Jam</span>
                    </div>
                    <div className="bg-[#FAF8F3] p-1.5 rounded-lg border border-[#EBE6DD]">
                      <span className="block text-base font-serif text-[#2C2E28] tabular-nums">{timeLeft.minutes}</span>
                      <span className="text-[9px] text-[#7A8B74]">Menit</span>
                    </div>
                    <div className="bg-[#FAF8F3] p-1.5 rounded-lg border border-[#EBE6DD]">
                      <span className="block text-base font-serif text-[#2C2E28] tabular-nums">{timeLeft.seconds}</span>
                      <span className="text-[9px] text-[#7A8B74]">Detik</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Card */}
                <div className="p-4 rounded-xl bg-white border border-[#EBE6DD] text-left space-y-3">
                  <div>
                    <h4 className="font-serif text-sm font-normal text-[#2C2E28]">Akad &amp; Resepsi</h4>
                    <p className="text-[11px] text-[#55594F] mt-0.5">{item.demoData.eventDate}</p>
                  </div>
                  <p className="text-[11px] text-[#55594F] flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7A8B74] shrink-0 mt-0.5" />
                    <span>{item.demoData.location}, {item.demoData.city}</span>
                  </p>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(item.demoData.location + ' ' + item.demoData.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#414A35] font-medium underline"
                  >
                    <span>Buka Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#7A8B74]" />
                  </a>
                </div>

                {/* Digital Gift / Tanda Kasih */}
                <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#EBE6DD] text-left space-y-2">
                  <h4 className="text-xs font-serif font-normal text-[#414A35]">Tanda Kasih</h4>
                  <p className="text-[11px] text-[#55594F] font-light leading-relaxed">
                    Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital:
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#EBE6DD] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#7A8B74]">{item.demoData.bankName}</p>
                      <p className="text-xs font-mono font-medium text-[#2C2E28]">{item.demoData.accountNumber}</p>
                      <p className="text-[10px] text-[#55594F]">a/n {item.demoData.accountHolder}</p>
                    </div>
                    <button
                      onClick={handleCopyAccount}
                      className="flex items-center gap-1 text-[11px] py-1 px-2.5 bg-[#FAF8F3] hover:bg-[#F2EFE8] text-[#414A35] rounded border border-[#EBE6DD] cursor-pointer"
                    >
                      {copiedBank ? (
                        <>
                          <Check className="w-3 h-3 text-[#7A8B74]" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#7A8B74]" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* RSVP Simulation */}
                <div className="p-4 rounded-xl bg-white border border-[#EBE6DD] text-left space-y-3">
                  <h4 className="text-xs font-serif font-normal text-[#2C2E28]">
                    Konfirmasi Kehadiran &amp; Doa Restu
                  </h4>

                  {rsvpSubmitted && (
                    <div className="p-2 bg-[#F2F6F0] border border-[#D5E2D2] rounded text-[11px] text-[#414A35]">
                      Terima kasih, doa kalian telah dicatat.
                    </div>
                  )}

                  <form onSubmit={handleRsvpSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Nama lengkap"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-[#EBE6DD] bg-[#FAF8F3] focus:outline-none"
                      required
                    />

                    <div className="grid grid-cols-3 gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setRsvpStatus('hadir')}
                        className={`text-[10px] py-1 px-2 rounded border cursor-pointer ${rsvpStatus === 'hadir' ? 'bg-[#414A35] text-white border-[#414A35]' : 'bg-[#FAF8F3] text-[#55594F] border-[#EBE6DD]'}`}
                      >
                        Hadir
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpStatus('ragu')}
                        className={`text-[10px] py-1 px-2 rounded border cursor-pointer ${rsvpStatus === 'ragu' ? 'bg-[#7A8B74] text-white border-[#7A8B74]' : 'bg-[#FAF8F3] text-[#55594F] border-[#EBE6DD]'}`}
                      >
                        Ragu
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpStatus('tidak')}
                        className={`text-[10px] py-1 px-2 rounded border cursor-pointer ${rsvpStatus === 'tidak' ? 'bg-[#55594F] text-white border-[#55594F]' : 'bg-[#FAF8F3] text-[#55594F] border-[#EBE6DD]'}`}
                      >
                        Berhalangan
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Tuliskan doa restu..."
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-[#EBE6DD] bg-[#FAF8F3] focus:outline-none resize-none"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#414A35] text-[#F7F5EF] text-xs font-medium rounded-full cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-[#FAF8F3]" />
                      <span>Kirim Ucapan</span>
                    </button>
                  </form>

                  {/* Wishes list */}
                  <div className="pt-2 border-t border-[#F2EFE8] space-y-2">
                    <p className="text-[10px] text-[#7A8B74] font-medium">Ucapan Terbaru ({wishes.length})</p>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {wishes.map((w, idx) => (
                        <div key={idx} className="p-2 rounded bg-[#FAF8F3] border border-[#EBE6DD] text-[11px] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-[#2C2E28]">{w.name}</span>
                            <span className="text-[9px] text-[#7A8B74]">{w.status}</span>
                          </div>
                          <p className="text-[#55594F] font-light">{w.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back to cover link */}
                <div className="pt-1">
                  <button
                    onClick={() => setIsOpenInvitation(false)}
                    className="text-[11px] text-[#7A8B74] hover:text-[#414A35] underline"
                  >
                    &larr; Kembali ke tampilan cover
                  </button>
                </div>

              </div>
            )}

            {/* Bottom In-Device CTA */}
            <div className="p-3 bg-white border-t border-[#EBE6DD] flex items-center justify-between z-20">
              <span className="text-xs font-serif text-[#414A35] truncate max-w-[120px]">
                {item.title}
              </span>
              <button
                onClick={() => onOrderViaWhatsApp(item)}
                className="flex items-center gap-1.5 py-1.5 px-3 bg-[#414A35] hover:bg-[#343B2A] text-[#F7F5EF] text-[11px] font-medium rounded-full transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pilih Template Ini</span>
              </button>
            </div>

          </div>

          {/* Quick Mobile Fallback CTA */}
          <div className="mt-3 text-center md:hidden">
            <button
              onClick={() => onOrderViaWhatsApp(item)}
              className="py-2 px-5 bg-[#414A35] text-[#F7F5EF] text-xs font-medium rounded-full shadow"
            >
              Pesan Template Ini via WhatsApp
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
