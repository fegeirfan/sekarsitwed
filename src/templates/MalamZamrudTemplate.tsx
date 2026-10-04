import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Copy, 
  Check, 
  MapPin, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  VolumeX,
  Calendar,
  X,
  Edit2,
  Sparkles,
  QrCode
} from 'lucide-react';
import { ClientInvitationData } from '../types/clientInvitation';
import { 
  useCountdown, 
  useGuestRecipient, 
  useAudioController, 
  useClipboardCopy, 
  useGuestbook, 
  useRsvpForm 
} from '../hooks/useInvitationCore';

interface MalamZamrudTemplateProps {
  onBackToLanding: () => void;
  onOrderViaWhatsApp: () => void;
  customData?: ClientInvitationData;
}

// Section definitions for live sync & navigation
const SECTIONS = [
  { id: 'hero-video', label: 'Pembuka', number: '01' },
  { id: 'couple', label: 'Mempelai & Keluarga', number: '02' },
  { id: 'salam', label: 'Salam Pembuka', number: '03' },
  { id: 'datetime', label: 'Waktu & Jadwal', number: '04' },
  { id: 'lokasi', label: 'Lokasi Acara', number: '05' },
  { id: 'spotlight-1', label: 'Momen Senja', number: '06' },
  { id: 'turut', label: 'Turut Mengundang', number: '07' },
  { id: 'our-story', label: 'Kisah Kami', number: '08' },
  { id: 'dresscode', label: 'Ketentuan Busana', number: '09' },
  { id: 'spotlight-2', label: 'Janji Suci', number: '10' },
  { id: 'gallery', label: 'Galeri Momen', number: '11' },
  { id: 'gift', label: 'Tanda Kasih', number: '12' },
  { id: 'guestbook', label: 'Ucapan & Doa', number: '13' },
  { id: 'rsvp', label: 'RSVP', number: '14' },
  { id: 'closing', label: 'Penutup', number: '15' }
];

export const MalamZamrudTemplate: React.FC<MalamZamrudTemplateProps> = ({
  onBackToLanding,
  onOrderViaWhatsApp,
  customData,
}) => {
  // Extract custom client data or elegant fallbacks
  const brideName = customData?.brideName || 'Kirana';
  const brideFullName = customData?.brideFullName || 'Kirana Ayu Lestari, S.Ds.';
  const brideParents = customData?.brideParents || 'Putri pertama dari Bapak Hendra Wijaya & Ibu Sinta Maharani';
  const brideInstagram = customData?.brideInstagram || '@kiranaayuu';

  const groomName = customData?.groomName || 'Adhitya';
  const groomFullName = customData?.groomFullName || 'Adhitya Nugraha, B.Eng.';
  const groomParents = customData?.groomParents || 'Putra kedua dari Bapak Suryanto Nugraha & Ibu Ratna Dewi';
  const groomInstagram = customData?.groomInstagram || '@adhityanugraha';

  const eventDateFormatted = customData?.eventDateFormatted || 'Minggu, 14 Februari 2027';
  const countdownIsoDate = customData?.countdownIsoDate || '2027-02-14T08:00:00+07:00';
  const akadTime = customData?.akadTime || '08.00 – 09.30 WIB';
  const akadVenue = customData?.akadVenue || 'Ruang Bimasena, Aryaduta Hotel';
  const resepsiTime = customData?.resepsiTime || '11.00 – 14.00 WIB';
  const resepsiVenue = customData?.resepsiVenue || 'Grand Ballroom, Aryaduta Hotel';
  const city = customData?.city || 'Jakarta Selatan';
  const mapsUrl = customData?.mapsUrl || 'https://maps.google.com';

  const bankName = customData?.bankName || 'BCA';
  const accountNumber = customData?.accountNumber || '1234567890';
  const accountHolder = customData?.accountHolder || 'Kirana Ayu Lestari';
  const songTitle = customData?.songTitle || 'Until I Found You - Stephen Sanchez';

  // Opening state: isOpeningFlap controls 3D flap fold, isOpened lifts envelope, isCoverDismissed removes gate
  const [isOpeningFlap, setIsOpeningFlap] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  // Bank copy toast & QRIS modal
  const [showQrisModal, setShowQrisModal] = useState(false);

  // Modular Hooks: Guest personalization, Audio, Clipboard, Countdown, Guestbook, RSVP
  const { guestName, setGuestName, isEditingGuest, setIsEditingGuest } = useGuestRecipient('Bpk. Hendra Wijaya & Keluarga');
  const { isPlayingAudio, showAudioToast, toggleAudio, startAudio } = useAudioController(songTitle);
  const { copyText, isCopied } = useClipboardCopy(2500);
  const timeLeft = useCountdown(countdownIsoDate);

  const initialWishes = customData?.guestbookEntries && customData.guestbookEntries.length > 0
    ? customData.guestbookEntries
    : [
        {
          name: 'Salsabila Putri',
          message: 'Selamat menempuh hidup baru Kirana & Adhitya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Malam yang sungguh anggun dan berkesan. 🤍',
          time: '1 jam yang lalu'
        },
        {
          name: 'Dimas & Nadia',
          message: 'Selamat berbahagia sahabatku! Berkah senantiasa menyertai babak baru kalian.',
          time: '4 jam yang lalu'
        }
      ];

  const {
    wishes,
    nameInput: guestNameInput,
    setNameInput: setGuestNameInput,
    messageInput: guestMsgInput,
    setMessageInput: setGuestMsgInput,
    submitWish: handleGuestbookSubmit
  } = useGuestbook(initialWishes);

  const {
    rsvpName,
    setRsvpName,
    attendance: rsvpAttendance,
    setAttendance: setRsvpAttendance,
    guestCount: rsvpCount,
    setGuestCount: setRsvpCount,
    isSuccess: rsvpSuccess,
    submitRsvp: handleRsvpSubmit
  } = useRsvpForm();

  // Lightbox Photo Modal state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Gallery image assets (Diverse Authentic Wedding Photography - No web product mockups)
  const galleryImages = customData?.mediaSlots?.galleryImages && customData.mediaSlots.galleryImages.length > 0
    ? customData.mediaSlots.galleryImages
    : [
        '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
        '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
        '/src/assets/images/art_deco_venue_details_1790840351864.jpg',
        '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
      ];

  const heroImage = customData?.mediaSlots?.heroImage || galleryImages[0];
  const bridePortrait = customData?.mediaSlots?.bridePortrait || galleryImages[1];
  const groomPortrait = customData?.mediaSlots?.groomPortrait || galleryImages[0];
  const quoteText = customData?.quoteText || 'Bunga melati tumbuh berseri, mekar indah di taman hati. Dua insan berjanji sehidup semati, menyatu dalam ikatan suci.';
  const quoteSource = customData?.quoteSource || 'Syair Kasih Klasik';
  const secondaryBankName = customData?.secondaryBankName;
  const secondaryAccountNumber = customData?.secondaryAccountNumber;
  const secondaryAccountHolder = customData?.secondaryAccountHolder;
  const qrisImageUrl = customData?.qrisImageUrl || customData?.mediaSlots?.qrisImageUrl;

  // Continuous Filmstrip Photos for Left (Portraits & Moments) and Right (Details & Atmosphere)
  const leftFilmstripPhotos = [
    { src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg', tag: 'KIRANA & ADHITYA · 01', caption: 'Mempelai Berbahagia' },
    { src: '/src/assets/images/wedding_bride_veil_1790901501919.jpg', tag: 'THE BRIDE · 02', caption: 'Anggun Dalam Balutan Gaun' },
    { src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', tag: 'HOLY VOWS · 03', caption: 'Janji Suci & Buket Bunga Peony' },
    { src: '/src/assets/images/wedding_dance_lights_1790901533590.jpg', tag: 'FIRST DANCE · 04', caption: 'Tarian Pertama di Bawah Cahaya' },
    { src: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg', tag: 'ROMANTIC MOMENT · 05', caption: 'Langkah Awal Bersama' },
    { src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg', tag: 'FOREVER AFTER · 06', caption: 'Cinta Seumur Hidup' },
  ];

  const rightFilmstripPhotos = [
    { src: '/src/assets/images/art_deco_venue_details_1790840351864.jpg', tag: 'BALLROOM · 01', caption: 'Kemilau Lilin & Meja Jamuan' },
    { src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', tag: 'DETAILS · 02', caption: 'Sepatu Sutra & Perhiasan Emas' },
    { src: '/src/assets/images/editorial_venue_rings_1790838653826.jpg', tag: 'RINGS · 03', caption: 'Cincin Emas di Atas Travertine' },
    { src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', tag: 'BLOOMS · 04', caption: 'Rangkaian Mawar & Daun Eukaliptus' },
    { src: '/src/assets/images/art_deco_venue_details_1790840351864.jpg', tag: 'EVENING GLOW · 05', caption: 'Suasana Temaram Resepsi' },
    { src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', tag: 'PROMISE · 06', caption: 'Buku Janji & Momen Khidmat' },
  ];

  // Active section tracking & Smooth Continuous Scroll Progress
  const [activeSectionId, setActiveSectionId] = useState('hero-video');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const leftStripRef = useRef<HTMLDivElement>(null);
  const rightStripRef = useRef<HTMLDivElement>(null);
  const [stripTravel, setStripTravel] = useState({ left: 1400, right: 1400 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
      }
    };

    const updateMeasurements = () => {
      const vh = window.innerHeight;
      if (leftStripRef.current) {
        const h = leftStripRef.current.scrollHeight;
        setStripTravel(prev => ({ ...prev, left: Math.max(0, h - vh + 120) }));
      }
      if (rightStripRef.current) {
        const h = rightStripRef.current.scrollHeight;
        setStripTravel(prev => ({ ...prev, right: Math.max(0, h - vh + 120) }));
      }
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMeasurements);
    setTimeout(updateMeasurements, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeasurements);
    };
  }, [isOpened]);

  // Section Observer for active indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });
        if (bestEntry) {
          const entryTarget = bestEntry as IntersectionObserverEntry;
          setActiveSectionId(entryTarget.target.id);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -15% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpened]);

  const leftTranslateY = -(scrollProgress * stripTravel.left);
  const rightTranslateY = -(scrollProgress * stripTravel.right);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevSlide = () => {
    setCarouselIndex(prev => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex(prev => Math.min(galleryImages.length - 1, prev + 1));
  };

  // Open invitation handler (Envelope flap folds open, revealing inner Section 1 letter)
  const handleOpenInvitation = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsOpeningFlap(true);
    startAudio();

    // Lift envelope after 3D flap unfolds
    setTimeout(() => {
      setIsOpened(true);
    }, 450);

    // Dismiss envelope gate after smooth sequence
    setTimeout(() => {
      setIsCoverDismissed(true);
    }, 1250);
  };

  const handleCopyAccount = () => {
    copyText(accountNumber, 'bank');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(brideName)}+%26+${encodeURIComponent(groomName)}+(Malam+Zamrud)&dates=20270214T010000Z/20270214T070000Z&details=Undangan+Pernikahan+${encodeURIComponent(brideFullName)}+%26+${encodeURIComponent(groomFullName)}.+Akad+${encodeURIComponent(akadTime)},+Resepsi+${encodeURIComponent(resepsiTime)}.&location=${encodeURIComponent(resepsiVenue)}`;

  return (
    <div className="relative min-h-screen bg-[#0B0D10] text-[#181512] font-['Manrope',sans-serif] selection:bg-[#C6A356]/30 selection:text-[#0B0D10]">
      
      {/* ============================================================
          TOP DEMO CONTROL BAR (Sticky Navigation for Sekarsiti)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#12151A]/95 backdrop-blur-md border-b border-[#C6A356]/30 text-[#FBF3E4] px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-[#C6A356] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sekarsiti</span>
        </button>

        <div className="hidden sm:flex items-center gap-2.5 text-[#EDE3C8]/85">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E4438] ring-2 ring-[#C6A356] animate-pulse" />
          <span className="font-['Marcellus',serif] text-sm text-[#FBF3E4] tracking-wide">
            Template: Malam Zamrud (Art Deco Evening)
          </span>
        </div>

        <button
          onClick={onOrderViaWhatsApp}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C6A356] hover:bg-[#b59247] text-[#0B0D10] font-semibold rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain Ini</span>
        </button>
      </header>

      {/* Floating Audio Disk Player (Only visible after opening) */}
      {isOpened && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {showAudioToast && (
            <div className="hidden sm:flex items-center gap-2 py-1.5 px-3.5 bg-[#12151A]/90 backdrop-blur-md border border-[#C6A356]/40 text-[#FBF3E4] rounded-full text-xs shadow-xl animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A356] animate-pulse" />
              <span>{isPlayingAudio ? 'Musik: Midnight Waltz (Gatsby Strings)' : 'Musik dijeda'}</span>
            </div>
          )}

          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full border border-[#C6A356]/70 flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              isPlayingAudio 
                ? 'bg-[#12151A] text-[#C6A356] ring-4 ring-[#C6A356]/20' 
                : 'bg-[#12151A]/80 text-[#FBF3E4]/50 hover:text-[#FBF3E4]'
            }`}
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            aria-label="Kontrol musik latar"
          >
            {isPlayingAudio ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      )}

      {/* ============================================================
          DESKTOP DUAL SIDE PANELS (Art Deco Layout: Left Wide, Right Narrow)
          Continuous Editorial Filmstrip - Zero Flicker
          ============================================================ */}
      
      {/* 1. LEFT PANEL (Wide Column) — Portrait & Ambiance */}
      <aside 
        className="hidden lg:block fixed top-0 bottom-0 left-0 w-[calc(100vw-480px-clamp(140px,13vw,240px))] overflow-hidden bg-[#0B0D10] border-r border-[#C6A356]/30 z-10"
      >
        <div 
          ref={leftStripRef}
          className="p-6 space-y-7 will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(0, ${leftTranslateY}px, 0)` }}
        >
          {leftFilmstripPhotos.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedPhoto(item.src)}
              className="group relative rounded-2xl overflow-hidden border border-[#C6A356]/30 bg-[#12151A] cursor-pointer shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            >
              <img 
                src={item.src} 
                alt={item.caption} 
                className="w-full aspect-[3/4] object-cover filter brightness-[0.80] contrast-[1.08] group-hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/95 via-[#0B0D10]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[9px] tracking-[0.28em] uppercase text-[#C6A356] font-semibold block">
                  {item.tag}
                </span>
                <p className="font-['Marcellus',serif] text-sm text-[#FBF3E4] font-normal mt-0.5 truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Top & Bottom Vignettes */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0B0D10] via-[#0B0D10]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/90 to-transparent pointer-events-none z-10" />

        {/* Left Art Deco Bottom Badge */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none p-3.5 rounded-xl bg-[#12151A]/90 backdrop-blur-md border border-[#C6A356]/35 shadow-xl">
          <p className="text-[8px] tracking-[0.35em] uppercase text-[#C6A356] font-semibold">
            MALAM ZAMRUD · ART DECO
          </p>
          <p className="font-['Marcellus',serif] text-xs text-[#FBF3E4]">
            Kirana Ayu &amp; Adhitya Nugraha
          </p>
        </div>
      </aside>

      {/* 2. RIGHT PANEL (Narrow Column) — Detail Strip & Section Navigator */}
      <aside 
        className="hidden lg:block fixed top-0 bottom-0 right-0 w-[clamp(140px,13vw,240px)] overflow-hidden bg-[#0B0D10] border-l border-[#C6A356]/30 z-10"
      >
        <div 
          ref={rightStripRef}
          className="p-3.5 space-y-5 will-change-transform transition-transform duration-100 ease-out"
          style={{ transform: `translate3d(0, ${rightTranslateY}px, 0)` }}
        >
          {rightFilmstripPhotos.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedPhoto(item.src)}
              className="group relative rounded-xl overflow-hidden border border-[#C6A356]/25 bg-[#12151A] cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <img 
                src={item.src} 
                alt={item.caption} 
                className="w-full aspect-[3/4] object-cover filter brightness-[0.78] contrast-[1.08] group-hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/95 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#C6A356] font-semibold block truncate">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top & Bottom Vignettes */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0B0D10] via-[#0B0D10]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/90 to-transparent pointer-events-none z-10" />

        {/* Floating Quick Section Navigator on Right Panel */}
        <div className="absolute top-16 right-3 z-20 flex flex-col items-end gap-1 p-2.5 rounded-xl bg-[#12151A]/90 backdrop-blur-md border border-[#C6A356]/30 shadow-xl">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#C6A356] font-semibold mb-0.5">
            Navigasi
          </span>
          {SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group flex items-center gap-1.5 py-0.5 text-right transition-all cursor-pointer"
                title={sec.label}
              >
                <span className={`text-[8px] tracking-wider transition-all hidden sm:inline ${
                  isActive 
                    ? 'text-[#C6A356] font-medium opacity-100' 
                    : 'text-[#EDE3C8]/40 opacity-0 group-hover:opacity-100'
                }`}>
                  {sec.label}
                </span>
                <span className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-4 bg-[#C6A356]' 
                    : 'w-1 bg-[#EDE3C8]/30 group-hover:bg-[#EDE3C8]/60'
                }`} />
              </button>
            );
          })}
        </div>
      </aside>

      {/* ============================================================
          SAMPUL / AMPLOP GERBANG PEMBUKA (Art Deco 3D Luxury Envelope)
          Tampil pertama kali saat tamu menerima undangan.
          Saat "Buka Undangan" diklik:
          1. Flap amplop melipat ke atas secara 3D (3D fold open)
          2. Segel medali emas Art Deco memancarkan kilau dan terlepas
          3. Amplop meluncur menyingkap kartu undangan resmi Section 1
          ============================================================ */}
      {!isCoverDismissed && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0D10] overflow-hidden transition-all duration-1000 ease-in-out ${
            isOpened ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Cover background with luxury vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.40] scale-105"
            style={{ backgroundImage: `url(${galleryImages[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/95 via-[#0B0D10]/80 to-[#0B0D10]/90" />

          {/* The Art Deco Envelope Pocket Body */}
          <div className="relative z-10 w-full max-w-[420px] mx-auto rounded-3xl bg-[#12151A] border-2 border-[#C6A356]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Top 3D Envelope Flap (Geometric Art Deco Chevron that folds open upward) */}
            <div 
              className={`relative z-20 origin-top transition-transform duration-700 ease-in-out ${
                isOpeningFlap ? '[transform:rotateX(-175deg)]' : '[transform:rotateX(0deg)]'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Flap Outer Graphic */}
              <div className="relative bg-gradient-to-b from-[#1C222B] to-[#12151A] pt-6 pb-8 px-6 border-b border-[#C6A356]/40 shadow-md text-center">
                <p className="uppercase tracking-[0.35em] text-[9px] font-semibold text-[#C6A356]">
                  UNDANGAN PERNIKAHAN RESMI
                </p>
                
                {/* Flap downward pointer peak */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#12151A] border-r border-b border-[#C6A356]/40 rotate-45" />
              </div>
            </div>

            {/* Inner Envelope Content / Card Pocket Area */}
            <div className="relative p-6 sm:p-8 text-center text-[#FBF3E4] space-y-6">
              
              {/* Monogram & Title */}
              <div className="space-y-1 pt-1">
                <h1 className="font-['Marcellus',serif] text-3xl sm:text-4xl text-[#FBF3E4] font-normal tracking-tight">
                  {brideName} &amp; {groomName}
                </h1>
                <p className="font-['Marcellus',serif] italic text-xs text-[#EDE3C8]/85 max-w-xs mx-auto leading-relaxed">
                  Dengan penuh sukacita, kami mengundang Anda menjadi saksi janji suci di malam yang istimewa.
                </p>
              </div>

              {/* Bottom Medallion Ray Button */}
              <div className="pt-2">
                <button
                  onClick={handleOpenInvitation}
                  disabled={isOpeningFlap}
                  className="group relative inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-[#C6A356] hover:bg-[#d6b467] text-[#0B0D10] shadow-[0_10px_35px_rgba(198,163,86,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-semibold text-xs tracking-wider uppercase"
                >
                  <span>Buka Undangan</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          CENTRAL STAGE (Mobile-simulated 480px Column)
          Art Deco Evening Warm Ivory (#EDE3C8)
          ============================================================ */}
      <div className="relative z-20 max-w-[480px] mx-auto bg-[#EDE3C8] shadow-[0_0_80px_rgba(0,0,0,0.7)] overflow-hidden min-h-screen pt-12">
        
        {/* ============================================================
            SECTION 1: VIDEO HERO & NAMA MEMPELAI (DENGAN EFEK PARALAKS)
            Background video cinematic nuansa ballroom malam dengan efek paralaks,
            hanya menampilkan nama kedua mempelai secara minimalis & anggun.
            ============================================================ */}
        <section 
          id="hero-video"
          className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden bg-[#0B0D10]"
        >
          {/* Parallax Video Background */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * 0.32}px, 0) scale(1.15)`,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={galleryImages[0]}
              className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.10]"
            >
              <source src="/videos/wedding-evening.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Vignette Gradients for Luxury Art Deco Onyx & Emerald Ambiance */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/25 to-[#0B0D10]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0D10]/20 to-[#0B0D10]/80 pointer-events-none" />

          {/* Center Floating Text (Only Names & Pure Minimalist Elegance with subtle Parallax) */}
          <div 
            className="relative z-10 w-full max-w-sm mx-auto p-6 text-center text-[#FBF3E4] space-y-4 will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
            }}
          >
            {/* Art Deco Sunburst Header */}
            <div className="flex justify-center mb-1">
              <svg className="w-16 h-8 text-[#C6A356]" viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M36 36 L36 4"/><path d="M36 36 L20 8"/><path d="M36 36 L52 8"/><path d="M36 36 L8 20"/><path d="M36 36 L64 20"/>
              </svg>
            </div>

            <p className="text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#C6A356] font-semibold">
              THE WEDDING OF
            </p>

            <h1 className="font-['Marcellus',serif] text-4xl sm:text-5xl text-[#FBF3E4] font-normal tracking-tight drop-shadow-xl leading-tight">
              {brideName} &amp; {groomName}
            </h1>

            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C6A356]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A356]" />
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C6A356]" />
            </div>

            <p className="font-['Marcellus',serif] text-xs sm:text-sm text-[#EDE3C8]/90 tracking-[0.25em] uppercase">
              {eventDateFormatted}
            </p>

            {/* Scroll Indicator */}
            <div className="pt-10 flex flex-col items-center gap-1.5 text-[#C6A356] text-[10px] tracking-widest uppercase animate-pulse">
              <span>Gulir ke Bawah</span>
              <span className="text-sm animate-bounce">↓</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROFIL MEMPELAI & KELUARGA BESAR */}
        <section 
          id="couple"
          className="relative min-h-[92vh] flex flex-col justify-center items-center text-center p-6 sm:p-8 bg-[#EDE3C8] text-[#181512] overflow-hidden"
        >
          {/* Main Art Deco Parchment Card */}
          <div className="relative w-full max-w-sm mx-auto p-6 sm:p-8 bg-[#FBF3E4] border-2 border-[#C6A356] shadow-2xl space-y-6">
            
            {/* Golden corner accents */}
            <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2 border-[#C6A356]" />
            <div className="absolute top-[-2px] right-[-2px] w-4 h-4 border-t-2 border-r-2 border-[#C6A356]" />
            <div className="absolute bottom-[-2px] left-[-2px] w-4 h-4 border-b-2 border-l-2 border-[#C6A356]" />
            <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2 border-[#C6A356]" />

            {/* Art Deco Sunburst Arch Header */}
            <div className="text-center space-y-2">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#1E4438] font-bold">
                KAMI YANG BERBAHAGIA
              </p>
              <h2 className="font-['Marcellus',serif] text-2xl sm:text-3xl text-[#181512]">
                Mempelai &amp; Keluarga
              </h2>
              <p className="font-['Marcellus',serif] italic text-xs text-[#8C4A36] font-medium">
                Assalamu’alaikum Warahmatullahi Wabarakatuh
              </p>
              <p className="text-xs text-[#181512]/85 leading-relaxed font-light max-w-xs mx-auto">
                Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam hari bahagia pernikahan kami:
              </p>
            </div>

            {/* Direct Couple & Parents Presentation (Tanpa pengulangan nama sebelumnya) */}
            <div className="space-y-6 pt-2">
              
              {/* 1. MEMPELAI WANITA */}
              <div className="space-y-3.5 bg-[#EDE3C8]/50 p-5 rounded-2xl border border-[#C6A356]/40 shadow-xs text-center">
                {/* Bridal Portrait in Oval Brass Frame */}
                <div 
                  onClick={() => setSelectedPhoto(bridePortrait)}
                  className="w-32 h-40 mx-auto rounded-full overflow-hidden border-2 border-[#C6A356] shadow-lg p-1 bg-white cursor-pointer group"
                >
                  <img 
                    src={bridePortrait} 
                    alt={brideFullName} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#1E4438] font-bold block mb-0.5">
                    Mempelai Wanita
                  </span>
                  <h3 className="font-['Marcellus',serif] text-2xl text-[#181512]">
                    {brideFullName}
                  </h3>
                </div>

                {/* Parents Info Directly Under Name */}
                <div className="pt-2.5 border-t border-[#C6A356]/30 space-y-0.5">
                  <p className="text-[10px] tracking-wider uppercase text-[#8C4A36] font-semibold">
                    Keluarga Mempelai Wanita:
                  </p>
                  <p className="text-xs text-[#181512] font-medium leading-relaxed">
                    {brideParents}
                  </p>
                </div>

                {brideInstagram && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#EDE3C8]/80 text-[10px] text-[#1E4438] font-medium border border-[#C6A356]/30">
                      <span>{brideInstagram}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* ART DECO AMPERSAND DIVIDER */}
              <div className="flex items-center justify-center gap-4 py-0.5">
                <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#C6A356]" />
                <span className="font-['Marcellus',serif] italic text-2xl text-[#C6A356] font-normal">&amp;</span>
                <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#C6A356]" />
              </div>

              {/* 2. MEMPELAI PRIA */}
              <div className="space-y-3.5 bg-[#EDE3C8]/50 p-5 rounded-2xl border border-[#C6A356]/40 shadow-xs text-center">
                {/* Groom Portrait in Oval Brass Frame */}
                <div 
                  onClick={() => setSelectedPhoto(groomPortrait)}
                  className="w-32 h-40 mx-auto rounded-full overflow-hidden border-2 border-[#C6A356] shadow-lg p-1 bg-white cursor-pointer group"
                >
                  <img 
                    src={groomPortrait} 
                    alt={groomFullName} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#1E4438] font-bold block mb-0.5">
                    Mempelai Pria
                  </span>
                  <h3 className="font-['Marcellus',serif] text-2xl text-[#181512]">
                    {groomFullName}
                  </h3>
                </div>

                {/* Parents Info Directly Under Name */}
                <div className="pt-2.5 border-t border-[#C6A356]/30 space-y-0.5">
                  <p className="text-[10px] tracking-wider uppercase text-[#8C4A36] font-semibold">
                    Keluarga Mempelai Pria:
                  </p>
                  <p className="text-xs text-[#181512] font-medium leading-relaxed">
                    {groomParents}
                  </p>
                </div>

                {groomInstagram && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#EDE3C8]/80 text-[10px] text-[#1E4438] font-medium border border-[#C6A356]/30">
                      <span>{groomInstagram}</span>
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Glance Date & Venue Badge */}
            <div className="py-2.5 px-4 bg-[#EDE3C8]/70 border border-[#C6A356]/40 rounded-lg text-center">
              <p className="text-xs font-semibold text-[#181512]">{eventDateFormatted}</p>
              <p className="text-[11px] text-[#1E4438] font-medium">{resepsiVenue} · {city}</p>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-1 text-[#8C4A36] text-[10px] uppercase tracking-widest pt-1">
              <span>Lanjut ke Rangkaian Acara</span>
              <span className="text-sm animate-bounce">↓</span>
            </div>

          </div>
        </section>

        {/* SECTION 2: SALAM PEMBUKA (Pantun Melati & Kipas Art Deco) */}
        <section id="salam" className="py-20 px-6 sm:px-8 text-center bg-[#EDE3C8] border-b border-[#C6A356]/30">
          <div className="flex justify-center mb-6">
            <svg className="w-20 h-10 text-[#C6A356]" viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M36 36 L36 4"/><path d="M36 36 L20 8"/><path d="M36 36 L52 8"/><path d="M36 36 L8 20"/><path d="M36 36 L64 20"/>
            </svg>
          </div>
          <p className="font-['Marcellus',serif] italic text-base sm:text-lg leading-relaxed text-[#181512] max-w-sm mx-auto">
            &ldquo;{quoteText}&rdquo;
          </p>
          {quoteSource && (
            <p className="text-[10px] tracking-widest uppercase text-[#8C4A36] font-semibold mt-3">
              — {quoteSource}
            </p>
          )}
        </section>

        {/* SECTION 3: WAKTU & TEMPAT (Onyx & Brass Countdown) */}
        <section id="datetime" className="py-20 px-6 sm:px-8 bg-[#12151A] text-[#FBF3E4] text-center">
          <p className="uppercase tracking-[0.34em] text-[10px] font-semibold text-[#C6A356] mb-2">
            SIMPAN TANGGALNYA
          </p>
          <h3 className="font-['Marcellus',serif] text-3xl text-[#FBF3E4] mb-2">
            Sabtu, 14 Februari 2027
          </h3>
          <p className="text-xs text-[#EDE3C8]/80 max-w-xs mx-auto mb-10 leading-relaxed font-light">
            Malam resepsi bernuansa elegan di bawah kilau lampu temaram
          </p>

          {/* Countdown Boxes */}
          <div className="flex justify-center gap-2.5 sm:gap-3 mb-10">
            <div className="min-w-[62px] py-3 px-2 border border-[#C6A356]/40 bg-[#0B0D10]/80">
              <span className="block font-['Marcellus',serif] text-2xl text-[#C6A356] tabular-nums">{timeLeft.days}</span>
              <small className="text-[9px] tracking-widest uppercase text-[#FBF3E4]/60">Hari</small>
            </div>
            <div className="min-w-[62px] py-3 px-2 border border-[#C6A356]/40 bg-[#0B0D10]/80">
              <span className="block font-['Marcellus',serif] text-2xl text-[#C6A356] tabular-nums">{timeLeft.hours}</span>
              <small className="text-[9px] tracking-widest uppercase text-[#FBF3E4]/60">Jam</small>
            </div>
            <div className="min-w-[62px] py-3 px-2 border border-[#C6A356]/40 bg-[#0B0D10]/80">
              <span className="block font-['Marcellus',serif] text-2xl text-[#C6A356] tabular-nums">{timeLeft.mins}</span>
              <small className="text-[9px] tracking-widest uppercase text-[#FBF3E4]/60">Menit</small>
            </div>
            <div className="min-w-[62px] py-3 px-2 border border-[#C6A356]/40 bg-[#0B0D10]/80">
              <span className="block font-['Marcellus',serif] text-2xl text-[#C6A356] tabular-nums">{timeLeft.secs}</span>
              <small className="text-[9px] tracking-widest uppercase text-[#FBF3E4]/60">Detik</small>
            </div>
          </div>

          {/* Schedule Cards */}
          <div className="grid gap-4 max-w-xs mx-auto text-left mb-8">
            <div className="border border-[#C6A356]/35 p-5 bg-[#0B0D10]/50">
              <p className="text-[10px] tracking-widest uppercase text-[#C6A356] font-semibold mb-1">Akad Nikah</p>
              <p className="font-['Marcellus',serif] text-xl text-[#FBF3E4]">{akadTime}</p>
              <p className="text-xs text-[#EDE3C8]/60 mt-1">{akadVenue}</p>
            </div>

            <div className="border border-[#C6A356]/35 p-5 bg-[#0B0D10]/50">
              <p className="text-[10px] tracking-widest uppercase text-[#C6A356] font-semibold mb-1">Resepsi</p>
              <p className="font-['Marcellus',serif] text-xl text-[#FBF3E4]">{resepsiTime}</p>
              <p className="text-xs text-[#EDE3C8]/60 mt-1">{resepsiVenue}</p>
            </div>
          </div>

          {/* Calendar Button */}
          <div className="pt-2">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C6A356] hover:bg-[#b59247] text-[#0B0D10] text-xs font-semibold rounded-full shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan ke Google Calendar</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: LOKASI & PETA */}
        <section id="lokasi" className="relative min-h-[64vh] flex items-end overflow-hidden">
          <img 
            src={galleryImages[1]} 
            alt={resepsiVenue} 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/40 to-transparent" />
          
          <div className="relative z-10 w-full p-8 text-center text-[#FBF3E4] space-y-3">
            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C6A356]">
              LOKASI ACARA
            </p>
            <h4 className="font-['Marcellus',serif] text-2xl text-[#FBF3E4]">
              {resepsiVenue}
            </h4>
            <p className="text-xs text-[#EDE3C8]/85 max-w-xs mx-auto leading-relaxed">
              {city}
            </p>
            <div className="pt-3">
              <a 
                href={mapsUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#C6A356] hover:bg-[#C6A356]/20 text-[#FBF3E4] px-6 py-2.5 text-xs tracking-widest uppercase rounded-full transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C6A356]" />
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#EDE3C8]/60" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5: SPOTLIGHT 1 */}
        <section id="spotlight-1" className="relative min-h-[68vh] flex items-end overflow-hidden">
          <img 
            src={galleryImages[0]} 
            alt="Spotlight 1" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/35 to-transparent" />
          <div className="relative z-10 w-full p-8 text-center text-[#FBF3E4]">
            <p className="font-['Marcellus',serif] italic text-lg sm:text-xl leading-relaxed max-w-xs mx-auto">
              &ldquo;Di bawah lampu temaram, dua bayangan menjadi satu.&rdquo;
            </p>
          </div>
        </section>

        {/* SECTION 6: TURUT MENGUNDANG */}
        <section id="turut" className="py-16 px-6 sm:px-8 bg-[#1E4438] text-[#FBF3E4] text-center">
          <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C6A356] mb-3">
            TURUT MENGUNDANG
          </p>
          <p className="text-xs sm:text-sm leading-relaxed max-w-xs mx-auto font-light text-[#FBF3E4]/90">
            Keluarga Besar Wijaya &amp; Keluarga Besar Nugraha turut mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan doa restu.
          </p>
        </section>

        {/* SECTION 8: KISAH KAMI (Our Story Timeline) */}
        <section id="our-story" className="py-20 px-6 sm:px-8 bg-[#EDE3C8]">
          <h3 className="font-['Marcellus',serif] text-3xl text-center text-[#181512] mb-12">
            Kisah Cinta Kami
          </h3>

          <div className="relative max-w-xs mx-auto pl-6 border-l border-[#8C4A36]/40 space-y-10 text-left">
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8C4A36]" />
              <span className="text-[10px] tracking-widest uppercase text-[#1E4438] block mb-1 font-semibold">
                Agustus 2019
              </span>
              <h4 className="font-['Marcellus',serif] text-lg text-[#181512] mb-1">
                Pertemuan Pertama
              </h4>
              <p className="text-xs text-[#181512]/85 leading-relaxed">
                Bertemu tanpa sengaja di sebuah acara kampus, dan sejak itu percakapan tak pernah berhenti.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8C4A36]" />
              <span className="text-[10px] tracking-widest uppercase text-[#1E4438] block mb-1 font-semibold">
                Desember 2022
              </span>
              <h4 className="font-['Marcellus',serif] text-lg text-[#181512] mb-1">
                Lamaran
              </h4>
              <p className="text-xs text-[#181512]/85 leading-relaxed">
                Di depan keluarga besar, sebuah janji sederhana disampaikan dan diterima dengan haru.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8C4A36]" />
              <span className="text-[10px] tracking-widest uppercase text-[#1E4438] block mb-1 font-semibold">
                Februari 2027
              </span>
              <h4 className="font-['Marcellus',serif] text-lg text-[#181512] mb-1">
                Hari Bahagia
              </h4>
              <p className="text-xs text-[#181512]/85 leading-relaxed">
                Babak baru dimulai — dua keluarga menjadi satu, disaksikan orang-orang tercinta.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9: DRESS CODE (Ketentuan Busana & Swatches) */}
        <section id="dresscode" className="py-20 px-6 sm:px-8 bg-[#12151A] text-[#FBF3E4] text-center">
          <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C6A356] mb-2">
            KETENTUAN BUSANA
          </p>
          <h3 className="font-['Marcellus',serif] text-3xl text-[#FBF3E4] mb-3">
            Art Deco Evening Attire
          </h3>
          <p className="text-xs text-[#EDE3C8]/85 leading-relaxed max-w-xs mx-auto mb-8 font-light">
            Kami mengundang Anda mengenakan busana bernuansa zamrud, kuningan, atau bata tua — agar keakraban malam itu semakin hangat dalam bingkai warna yang senada.
          </p>

          <div className="flex justify-center gap-5 sm:gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <i className="w-10 h-10 rounded-full border border-[#FBF3E4]/30 block shadow-md" style={{ background: '#1E4438' }} />
              <span className="text-[10px] tracking-wider uppercase text-[#C6A356]">Zamrud</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <i className="w-10 h-10 rounded-full border border-[#FBF3E4]/30 block shadow-md" style={{ background: '#C6A356' }} />
              <span className="text-[10px] tracking-wider uppercase text-[#C6A356]">Kuningan</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <i className="w-10 h-10 rounded-full border border-[#FBF3E4]/30 block shadow-md" style={{ background: '#8C4A36' }} />
              <span className="text-[10px] tracking-wider uppercase text-[#C6A356]">Bata Tua</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <i className="w-10 h-10 rounded-full border border-[#FBF3E4]/30 block shadow-md" style={{ background: '#EDE3C8' }} />
              <span className="text-[10px] tracking-wider uppercase text-[#C6A356]">Gading</span>
            </div>
          </div>
        </section>

        {/* SECTION 10: SPOTLIGHT 2 */}
        <section id="spotlight-2" className="relative min-h-[64vh] flex items-end overflow-hidden">
          <img 
            src={galleryImages[2]} 
            alt="Spotlight 2" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/35 to-transparent" />
          <div className="relative z-10 w-full p-8 text-center text-[#FBF3E4]">
            <p className="font-['Marcellus',serif] italic text-lg sm:text-xl leading-relaxed max-w-xs mx-auto">
              &ldquo;Dua hati yang memilih untuk terus melangkah bersama.&rdquo;
            </p>
          </div>
        </section>

        {/* SECTION 11: GALERI (Photo Carousel) */}
        <section id="gallery" className="py-20 bg-[#EDE3C8]">
          <h3 className="font-['Marcellus',serif] text-3xl text-center text-[#181512] mb-8">
            Galeri Momen
          </h3>

          <div className="relative px-6">
            <div 
              onClick={() => setSelectedPhoto(galleryImages[carouselIndex])}
              className="relative aspect-3/4 max-w-[320px] mx-auto overflow-hidden border border-[#8C4A36]/40 shadow-2xl cursor-pointer group bg-[#12151A]"
            >
              <img 
                src={galleryImages[carouselIndex]} 
                alt={`Galeri foto ${carouselIndex + 1}`} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs text-[#FBF3E4] bg-[#0B0D10]/80 px-4 py-1.5 rounded-full border border-[#C6A356]/40">
                  Perbesar Foto
                </span>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                type="button"
                onClick={prevSlide}
                disabled={carouselIndex === 0}
                className="w-10 h-10 rounded-full border border-[#8C4A36]/60 flex items-center justify-center text-[#8C4A36] hover:bg-[#8C4A36]/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs text-[#8C4A36] font-['Marcellus',serif]">
                {carouselIndex + 1} / {galleryImages.length}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                disabled={carouselIndex === galleryImages.length - 1}
                className="w-10 h-10 rounded-full border border-[#8C4A36]/60 flex items-center justify-center text-[#8C4A36] hover:bg-[#8C4A36]/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 12: TANDA KASIH */}
        <section id="gift" className="py-20 px-6 sm:px-8 bg-[#EDE3C8] text-center border-t border-[#C6A356]/20">
          <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C6A356] mb-2">
            TANDA KASIH
          </p>
          <h3 className="font-['Marcellus',serif] text-3xl text-[#181512] mb-6">
            Amplop Digital
          </h3>

          <div className="relative max-w-sm mx-auto border border-[#C6A356] p-7 bg-[#FBF3E4] space-y-6 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6A356] to-transparent" />
            
            <p className="text-xs text-[#181512] leading-relaxed">
              Doa restu Anda adalah karunia yang paling berarti bagi kami. Namun jika ingin memberi tanda kasih, kami dengan hormat menerima melalui:
            </p>

            <div className="p-4 bg-[#EDE3C8]/70 border border-[#C6A356]/40 rounded text-left space-y-1.5">
              <span className="text-[10px] text-[#1E4438] font-bold block uppercase tracking-wider">{bankName}</span>
              <p className="text-base font-mono font-bold text-[#181512]">{accountNumber}</p>
              <p className="text-xs text-[#181512]">a.n. {accountHolder}</p>
            </div>

            {secondaryAccountNumber && (
              <div className="p-4 bg-[#EDE3C8]/70 border border-[#C6A356]/40 rounded text-left space-y-1.5">
                <span className="text-[10px] text-[#1E4438] font-bold block uppercase tracking-wider">{secondaryBankName || 'Bank Cadangan'}</span>
                <p className="text-base font-mono font-bold text-[#181512]">{secondaryAccountNumber}</p>
                <p className="text-xs text-[#181512]">a.n. {secondaryAccountHolder || accountHolder}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleCopyAccount}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#C6A356] hover:bg-[#b59247] text-[#0B0D10] text-xs font-semibold rounded uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                {isCopied('bank') ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Rekening Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQrisModal(true)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 bg-[#EDE3C8] hover:bg-[#ded1b3] border border-[#C6A356] text-[#181512] text-xs font-semibold rounded transition-colors cursor-pointer"
                title="Tampilkan QRIS"
              >
                <QrCode className="w-4 h-4 text-[#C6A356]" />
                <span className="hidden sm:inline">QRIS</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 13: GUESTBOOK (Ucapan & Doa) */}
        <section id="guestbook" className="py-20 px-6 sm:px-8 bg-[#12151A] text-[#FBF3E4]">
          <h3 className="font-['Marcellus',serif] text-3xl text-center text-[#FBF3E4] mb-8">
            Ucapan &amp; Doa
          </h3>

          {/* Wishes List */}
          <div className="max-w-sm mx-auto mb-8 max-h-64 overflow-y-auto space-y-3 pr-1">
            {wishes.map((w, idx) => (
              <div key={idx} className="border border-[#C6A356]/30 p-4 bg-[#0B0D10]/60 text-left">
                <span className="font-['Marcellus',serif] text-sm text-[#C6A356] block mb-1">
                  {w.name}
                </span>
                <p className="text-xs text-[#FBF3E4]/90 leading-relaxed font-light mb-1">
                  {w.message}
                </p>
                <span className="text-[9px] text-[#EDE3C8]/40 block text-right">
                  {w.time}
                </span>
              </div>
            ))}
          </div>

          {/* Guestbook Form */}
          <form onSubmit={handleGuestbookSubmit} className="max-w-sm mx-auto space-y-3 text-left">
            <input
              type="text"
              placeholder="Nama Anda"
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              className="w-full bg-transparent border border-[#FBF3E4]/40 text-[#FBF3E4] p-3 text-xs rounded focus:outline-none focus:border-[#C6A356]"
              required
            />
            <textarea
              placeholder="Tulis ucapan & doa untuk kedua mempelai"
              value={guestMsgInput}
              onChange={(e) => setGuestMsgInput(e.target.value)}
              rows={3}
              className="w-full bg-transparent border border-[#FBF3E4]/40 text-[#FBF3E4] p-3 text-xs rounded focus:outline-none focus:border-[#C6A356] resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#C6A356] hover:bg-[#b59247] text-[#0B0D10] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-md"
            >
              Kirim Ucapan
            </button>
          </form>
        </section>

        {/* SECTION 14: RSVP */}
        <section id="rsvp" className="py-20 px-6 sm:px-8 bg-[#EDE3C8] text-center">
          <h3 className="font-['Marcellus',serif] text-3xl text-[#181512] mb-6">
            Konfirmasi Kehadiran
          </h3>

          {rsvpSuccess && (
            <div className="max-w-sm mx-auto mb-4 p-3 bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs">
              ✓ Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.
            </div>
          )}

          <form onSubmit={handleRsvpSubmit} className="max-w-sm mx-auto space-y-3.5 text-left bg-[#FBF3E4] p-6 border border-[#C6A356]/40 shadow-xs">
            <div>
              <label className="block text-xs font-medium text-[#181512] mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Anda"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="w-full bg-transparent border border-[#1E4438]/40 text-[#181512] p-2.5 text-xs rounded focus:outline-none focus:border-[#1E4438]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#181512] mb-1">Kehadiran</label>
              <select
                value={rsvpAttendance}
                onChange={(e) => setRsvpAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                className="w-full bg-transparent border border-[#1E4438]/40 text-[#181512] p-2.5 text-xs rounded focus:outline-none focus:border-[#1E4438]"
                required
              >
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#181512] mb-1">Jumlah Tamu</label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Jumlah tamu"
                value={rsvpCount}
                onChange={(e) => setRsvpCount(e.target.value)}
                className="w-full bg-transparent border border-[#1E4438]/40 text-[#181512] p-2.5 text-xs rounded focus:outline-none focus:border-[#1E4438]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E4438] hover:bg-[#15332a] text-[#FBF3E4] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer mt-2"
            >
              Kirim Konfirmasi
            </button>
          </form>
        </section>

        {/* SECTION 15: PENUTUP */}
        <section id="closing" className="relative min-h-[78vh] flex items-center justify-center text-center p-8 overflow-hidden bg-[#0B0D10]">
          <img 
            src={galleryImages[0]} 
            alt="Closing background" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-[#0B0D10]/80" />

          <div className="relative z-10 text-[#FBF3E4] space-y-4 max-w-xs">
            <div className="flex justify-center mb-2">
              <svg className="w-16 h-8 text-[#C6A356]" viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M36 0 L36 32"/><path d="M36 0 L20 28"/><path d="M36 0 L52 28"/><path d="M36 0 L8 16"/><path d="M36 0 L64 16"/>
              </svg>
            </div>
            
            <p className="text-xs sm:text-sm leading-relaxed text-[#EDE3C8]/90 font-light">
              Terima kasih telah menjadi bagian dari kisah kami. Kehadiran dan doa Anda adalah hadiah yang paling kami hargai.
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#FBF3E4]/40 pt-4">
              DIBUAT DENGAN CINTA — 2027
            </p>

            <div className="pt-6">
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#C6A356]/60 text-[#C6A356] hover:bg-[#C6A356]/20 rounded-full text-xs font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Katalog Sekarsiti</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedPhoto}
            alt="Perbesar galeri"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* QRIS Modal */}
      {showQrisModal && (
        <div 
          onClick={() => setShowQrisModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#EDE3C8] rounded-2xl p-6 max-w-xs w-full text-center space-y-4 text-[#181512] shadow-2xl border border-[#C6A356]"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#C6A356]/30">
              <span className="font-['Marcellus',serif] text-base text-[#181512]">QRIS Tanda Kasih</span>
              <button onClick={() => setShowQrisModal(false)} className="text-[#181512]/60 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white border border-[#C6A356]/30 rounded-xl flex items-center justify-center min-h-[170px]">
              {qrisImageUrl ? (
                <img src={qrisImageUrl} alt="QRIS Tanda Kasih" className="max-w-[200px] max-h-[200px] object-contain rounded" />
              ) : (
                <QrCode className="w-40 h-40 text-stone-900" />
              )}
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-stone-900">{brideName} &amp; {groomName}</p>
              <p className="text-[10px] text-stone-600">Scan via BCA, Mandiri, GoPay, OVO, Dana</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
