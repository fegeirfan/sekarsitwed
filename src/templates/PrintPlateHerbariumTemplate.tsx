import React, { useState, useEffect } from 'react';
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
  QrCode,
  Instagram,
  Heart,
  Sparkles,
  Play,
  Pause,
  Maximize2,
  Grid,
  Film,
  Layers
} from 'lucide-react';

import { ClientInvitationData } from '../types/clientInvitation';

interface PrintPlateHerbariumTemplateProps {
  onBackToLanding: () => void;
  onOrderViaWhatsApp: () => void;
  customData?: ClientInvitationData;
}

// Section definitions for live sync & navigation
const SECTIONS = [
  { id: 'hero-video', label: 'Pembuka', number: '01' },
  { id: 'couple', label: 'Mempelai & Keluarga', number: '02' },
  { id: 'quote', label: 'Doa Pembuka', number: '03' },
  { id: 'spotlight-1', label: 'Momen', number: '04' },
  { id: 'datetime', label: 'Waktu & Tempat', number: '05' },
  { id: 'story', label: 'Kisah Kami', number: '06' },
  { id: 'gallery', label: 'Galeri Momen', number: '07' },
  { id: 'gift', label: 'Tanda Kasih', number: '08' },
  { id: 'guestbook', label: 'Buku Tamu', number: '09' },
  { id: 'rsvp', label: 'Konfirmasi RSVP', number: '10' },
  { id: 'closing', label: 'Penutup', number: '11' }
];

export const PrintPlateHerbariumTemplate: React.FC<PrintPlateHerbariumTemplateProps> = ({
  onBackToLanding,
  onOrderViaWhatsApp,
  customData,
}) => {
  // Extract custom client values or fallback to default
  const brideName = customData?.brideName || 'Kirana';
  const groomName = customData?.groomName || 'Adhitya';
  const brideFullName = customData?.brideFullName || 'Kirana Ayu Lestari, S.Ds.';
  const groomFullName = customData?.groomFullName || 'Adhitya Nugraha, B.Eng.';
  const brideParents = customData?.brideParents || 'Putri pertama dari Bapak Hendra Wijaya & Ibu Sinta Maharani';
  const groomParents = customData?.groomParents || 'Putra kedua dari Bapak Suryanto Nugraha & Ibu Ratna Dewi';
  const brideInstagram = customData?.brideInstagram || '@kiranaayuu';
  const groomInstagram = customData?.groomInstagram || '@adhityanugraha';
  const eventDateFormatted = customData?.eventDateFormatted || 'Minggu, 14 Februari 2027';
  const countdownIsoDate = customData?.countdownIsoDate || '2027-02-14T08:00:00+07:00';
  const akadTime = customData?.akadTime || '08.00 – 09.30 WIB';
  const akadVenue = customData?.akadVenue || 'Ruang Bimasena, Aryaduta Hotel';
  const resepsiTime = customData?.resepsiTime || '11.00 – 14.00 WIB';
  const resepsiVenue = customData?.resepsiVenue || 'Grand Ballroom, Aryaduta Hotel';
  const city = customData?.city || 'Jakarta Selatan';
  const quoteText = customData?.quoteText || 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, serta menjadikan di antara kamu rasa kasih dan sayang.';
  const quoteSource = customData?.quoteSource || 'QS. AR-RUM : 21';
  const bankName = customData?.bankName || 'BANK CENTRAL ASIA (BCA)';
  const accountNumber = customData?.accountNumber || '8271 0293 84';
  const accountHolder = customData?.accountHolder || 'a.n. Kirana Ayu Lestari';
  const songTitle = customData?.songTitle || 'Until I Found You';

  // Opening state: isOpened triggers smooth reveal, isCoverDismissed removes gate
  const [isOpened, setIsOpened] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  // Bank copy toast & QRIS modal
  const [copiedBank, setCopiedBank] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);

  // Background Audio Simulation State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAudioToast, setShowAudioToast] = useState(false);

  // Guest Name personalization (reads from URL query ?to= or default)
  const [guestName, setGuestName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to') || 'Bpk. Hendra Wijaya & Keluarga';
  });
  const [isEditingGuest, setIsEditingGuest] = useState(false);

  // Lightbox Photo Modal state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Gallery image assets (Custom or Default)
  const galleryImages = (customData?.mediaSlots?.galleryImages && customData.mediaSlots.galleryImages.length > 0)
    ? customData.mediaSlots.galleryImages
    : [
        '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
        '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg',
        '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg',
        '/src/assets/images/art_deco_venue_details_1790840351864.jpg'
      ];

  const heroImage = customData?.mediaSlots?.heroImage || galleryImages[0];
  const bridePortrait = customData?.mediaSlots?.bridePortrait || galleryImages[1];
  const groomPortrait = customData?.mediaSlots?.groomPortrait || '/src/assets/images/editorial_groom_portrait_1790915490996.jpg';

  // Curatorial photos for Left Exhibition Companion (Rich 18+ High-Fidelity Plates)
  const defaultCompanionPlates = [
    { 
      src: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg', 
      plate: '01', 
      title: `${brideName} & ${groomName}`, 
      meta: 'Dokumentasi 35mm · Sanur Paviliun',
      spec: 'Summilux 50mm · f/2.0 · ISO 100'
    },
    { 
      src: '/src/assets/images/wedding_bride_veil_1790901501919.jpg', 
      plate: '02', 
      title: 'Pesona Sutra & Veil Pengantin', 
      meta: 'Gaun Adat Modern · Studio Sekarsiti',
      spec: 'Noctilux 75mm · f/1.4 · ISO 160'
    },
    { 
      src: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg', 
      plate: '03', 
      title: 'Sang Mempelai Pria (The Groom)', 
      meta: 'Setelan Wol Noir · Ruang Tenang',
      spec: 'Elmarit 28mm · f/2.8 · ISO 200'
    },
    { 
      src: '/src/assets/images/editorial_venue_rings_1790838653826.jpg', 
      plate: '04', 
      title: 'Dua Cincin & Meja Travertine', 
      meta: 'Ikrar Abadi · Emas Kuning 18 Karat',
      spec: 'Macro-Elmar 90mm · f/4.0 · ISO 100'
    },
    { 
      src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', 
      plate: '05', 
      title: 'Rangkaian Bunga & Janji Suci', 
      meta: 'Peony Putih & Daun Eukaliptus',
      spec: 'Summicron 35mm · f/2.0 · ISO 250'
    },
    { 
      src: '/src/assets/images/wedding_dance_lights_1790901533590.jpg', 
      plate: '06', 
      title: 'Langkah Pertama di Bawah Lampu', 
      meta: 'Malam Resepsi Aryaduta Ballroom',
      spec: 'Voigtländer 35mm · f/1.2 · ISO 800'
    },
    { 
      src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', 
      plate: '07', 
      title: 'Sepatu Sutra & Anting Antik', 
      meta: 'Detail Busana Pernikahan Klasik',
      spec: 'Summilux 50mm · f/2.4 · ISO 125'
    },
    { 
      src: '/src/assets/images/wedding_ring_exchange_1790833922500.jpg', 
      plate: '08', 
      title: 'Momen Ijab & Janji Sehidup Semati', 
      meta: 'Sakralitas Akad · Keheningan Khidmat',
      spec: 'Summilux 50mm · f/1.8 · ISO 320'
    },
    { 
      src: '/src/assets/images/wedding_bride_portrait_1790833939171.jpg', 
      plate: '09', 
      title: 'Anggun Bersahaja Sang Pengantin', 
      meta: 'Rias Kebaya Gading Tradisi',
      spec: 'Apo-Summicron 75mm · f/2.0 · ISO 160'
    },
    { 
      src: '/src/assets/images/wedding_couple_portrait_1790833906470.jpg', 
      plate: '10', 
      title: 'Kemesraan Hangat Dua Jiwa', 
      meta: 'Tatapan Penuh Harapan Masa Depan',
      spec: 'Summicron 35mm · f/2.8 · ISO 200'
    },
    { 
      src: '/src/assets/images/wedding_table_botanical_1790833955186.jpg', 
      plate: '11', 
      title: 'Jamuan Meja Botanical & Lilin', 
      meta: 'Nuansa Perjamuan Hangat Kerabat',
      spec: 'Elmarit 24mm · f/3.5 · ISO 400'
    },
    { 
      src: '/src/assets/images/wax_seal_gold_monogram_1790915522548.jpg', 
      plate: '12', 
      title: 'Segel Lilin Monogram Emas Sekarsiti', 
      meta: 'Stempel Lilin Archival Pengesahan',
      spec: 'Macro 60mm · f/5.6 · ISO 100'
    },
    { 
      src: '/src/assets/images/film_vintage_couple_1791034007642.jpg', 
      plate: '13', 
      title: 'Nostalgia Analog 35mm Klise Klasik', 
      meta: 'Sesi Foto Hangat Lensa Manual',
      spec: 'Carl Zeiss 50mm · f/1.4 · ISO 400'
    },
    { 
      src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg', 
      plate: '14', 
      title: 'Resepsi Malam Zamrud & Onyx Mewah', 
      meta: 'Elegansi Gemerlap Ballroom Malam Hari',
      spec: 'Summilux 35mm · f/1.4 · ISO 640'
    },
    { 
      src: '/src/assets/images/art_deco_venue_details_1790840351864.jpg', 
      plate: '15', 
      title: 'Kemilau Cahaya Lilin & Meja Jamuan', 
      meta: 'Sentuhan Kemewahan Ornamen Emas',
      spec: 'Noctilux 50mm · f/1.2 · ISO 320'
    },
    { 
      src: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg', 
      plate: '16', 
      title: 'Teduh Alam & Senja Terbuka', 
      meta: 'Potret Pasangan Berlatar Dedaunan Sage',
      spec: 'Summicron 50mm · f/2.0 · ISO 200'
    },
    { 
      src: '/src/assets/images/botanical_estate_venue_1790919022237.jpg', 
      plate: '17', 
      title: 'Lanskap Paviliun Griya Warisan Heritage', 
      meta: 'Arsitektur Kayu Jati & Kolam Tenang',
      spec: 'Super-Elmar 21mm · f/3.4 · ISO 100'
    },
    { 
      src: '/src/assets/images/brand_story_botanical_1790831303860.jpg', 
      plate: '18', 
      title: 'Monograf Kertas Seni Serat Tangan', 
      meta: 'Tekstur Kertas Berserat Kapas Alami',
      spec: 'Macro-Elmar 90mm · f/4.0 · ISO 100'
    }
  ];

  // Combine default museum plates with any client uploaded images
  const customGalleryPlates = (customData?.mediaSlots?.galleryImages || [])
    .filter(url => !defaultCompanionPlates.some(p => p.src === url))
    .map((url, i) => ({
      src: url,
      plate: String(defaultCompanionPlates.length + i + 1).padStart(2, '0'),
      title: `Foto Klien Terpilih #${i + 1}`,
      meta: 'Dokumentasi Klien · Kurasi Khusus',
      spec: 'Archival Print · High-Resolution'
    }));

  const leftCompanionPhotos = [...defaultCompanionPlates, ...customGalleryPlates];

  // Left Panel Curatorial & Spotlight States (Expanded with 3 modes)
  const [leftPanelTab, setLeftPanelTab] = useState<'curated' | 'contact' | 'filmreel'>('curated');
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [isSpotlightPlaying, setIsSpotlightPlaying] = useState(true);
  const [spotlightProgress, setSpotlightProgress] = useState(0);

  // Spotlight autoplay timer with progress bar
  useEffect(() => {
    if (!isSpotlightPlaying) return;

    const intervalTime = 4200;
    const stepTime = 60;
    const increment = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setSpotlightProgress(prev => {
        if (prev >= 100) {
          setSpotlightIdx(idx => (idx + 1) % leftCompanionPhotos.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isSpotlightPlaying, leftCompanionPhotos.length]);

  const handleSpotlightNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpotlightIdx(idx => (idx + 1) % leftCompanionPhotos.length);
    setSpotlightProgress(0);
  };

  const handleSpotlightPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpotlightIdx(idx => (idx - 1 + leftCompanionPhotos.length) % leftCompanionPhotos.length);
    setSpotlightProgress(0);
  };

  const toggleSpotlightPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpotlightPlaying(prev => !prev);
  };

  // Active section tracking & Smooth Continuous Scroll Progress
  const [activeSectionId, setActiveSectionId] = useState('hero-video');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: '136',
    hours: '09',
    mins: '24',
    secs: '45'
  });

  useEffect(() => {
    const target = new Date(countdownIsoDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        mins: String(m).padStart(2, '0'),
        secs: String(s).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevSlide = () => {
    setCarouselIndex(prev => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex(prev => Math.min(galleryImages.length - 1, prev + 1));
  };

  // Guestbook state
  const [wishes, setWishes] = useState([
    {
      name: 'Raditya & Vanya',
      message: 'Selamat berbahagia Kirana & Adhitya! Kiranya kasih senantiasa menguatkan langkah kalian berdua hingga hari tua nanti.',
      time: '1 jam yang lalu'
    },
    {
      name: 'Salsabila Putri',
      message: 'MasyaAllah, selamat menempuh hidup baru Kirana & Mas Adhit! Semoga sakinah mawaddah warahmah selalu.',
      time: '3 jam yang lalu'
    },
    {
      name: 'Dimas Wicaksono',
      message: 'Selamat kawan! Doa terbaik untuk babak baru perjalanan kalian berdua.',
      time: '6 jam yang lalu'
    }
  ]);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestMsgInput, setGuestMsgInput] = useState('');

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim() || !guestMsgInput.trim()) return;
    setWishes(prev => [
      {
        name: guestNameInput.trim(),
        message: guestMsgInput.trim(),
        time: 'Baru saja'
      },
      ...prev
    ]);
    setGuestNameInput('');
    setGuestMsgInput('');
  };

  // RSVP Form state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState('hadir');
  const [rsvpCount, setRsvpCount] = useState('2');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => setRsvpSuccess(false), 6000);
  };

  // Open invitation handler - Smooth cinematic fade
  const handleOpenInvitation = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsPlayingAudio(true);
    setShowAudioToast(true);
    setTimeout(() => setShowAudioToast(false), 4000);
    
    setIsOpened(true);
    setTimeout(() => {
      setIsCoverDismissed(true);
    }, 850);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\s+/g, ''));
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    setShowAudioToast(true);
    setTimeout(() => setShowAudioToast(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(brideName)}+%26+${encodeURIComponent(groomName)}&dates=20270214T010000Z/20270214T070000Z&details=Undangan+Pernikahan+${encodeURIComponent(brideFullName)}+%26+${encodeURIComponent(groomFullName)}.+Akad+${encodeURIComponent(akadTime)},+Resepsi+${encodeURIComponent(resepsiTime)}.&location=${encodeURIComponent(resepsiVenue)},+${encodeURIComponent(city)}`;

  // Story milestones data for Section 6 (Our Journey)
  const storyMilestones = [
    {
      year: '2019',
      date: 'Agustus 2019',
      chapter: 'BABAK 01',
      title: 'Titik Temu di Kota Kembang',
      location: 'Bandung · Sudut Baca Kampus',
      image: '/src/assets/images/film_vintage_couple_1791034007642.jpg',
      quote: '“Pertemuan pertama yang tak disengaja di ruang baca kampus...”',
      story: 'Dipertemukan dalam lingkaran perkuliahan di Bandung. Dari obrolan hangat tentang arsitektur, karya desain, dan secangkir kopi di sudut kota, kisah kami perlahan menemukan jalannya. Tak ada yang tergesa, semua mengalir bersahaja dan apa adanya.'
    },
    {
      year: '2021',
      date: 'November 2021',
      chapter: 'BABAK 02',
      title: 'Saling Menguatkan Cita',
      location: 'Jakarta & Denpasar · Meniti Karir',
      image: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
      quote: '“Menemukan ketenangan di tengah riuhnya langkah awal...”',
      story: 'Menghadapi fase awal dunia kerja dan kesibukan yang sesekali memisahkan jarak, kami belajar arti saling percaya dan mendengarkan. Setiap perbincangan malam menjadi tempat pulang ternyaman di tengah riuhnya dunia luar.'
    },
    {
      year: '2023',
      date: 'Desember 2023',
      chapter: 'BABAK 03',
      title: 'Satu Niat di Hadapan Keluarga',
      location: 'Jakarta Selatan · Ikrar Pertunangan',
      image: '/src/assets/images/editorial_venue_rings_1790838653826.jpg',
      quote: '“Di hadapan kedua keluarga besar, doa-doa mulai berpadu...”',
      story: 'Di hadapan kedua orang tua dan keluarga besar yang kami muliakan, sebuah cincin melingkar sebagai tanda kesungguhan hati. Sebuah komitmen tulus untuk melangkah ke jenjang yang lebih tinggi dan saling menyempurnakan seumur hidup.'
    },
    {
      year: '2027',
      date: 'Februari 2027',
      chapter: 'BABAK 04',
      title: 'Menyatukan Dua Jiwa',
      location: 'Grand Ballroom Aryaduta · Janji Suci',
      image: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
      quote: '“Awal dari pelayaran panjang yang dibangun di atas cinta dan iman.”',
      story: 'Kini, dengan penuh rasa syukur dan memohon ridho Allah SWT, kami melangkah menuju gerbang pernikahan suci. Menyatukan dua keluarga, melayari samudra kehidupan bersama dalam sakinah, mawaddah, dan rahmah.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#111110] text-[#242321] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#C5A880]/30 selection:text-[#111110]">
      
      {/* ============================================================
          TOP DEMO CONTROL BAR (Sticky Navigation for Sekarsiti)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#161514]/95 backdrop-blur-md border-b border-[#2A2926] text-[#FAF7F2] px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sekarsiti</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[#EFE9DF]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span className="font-['Fraunces',serif] text-sm text-[#FAF7F2] tracking-wide">
            Seri Editorial Modern · Kirana &amp; Adhitya
          </span>
        </div>

        <button
          onClick={onOrderViaWhatsApp}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C5A880] hover:bg-[#b8986c] text-[#111110] font-semibold rounded-full shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain Ini</span>
        </button>
      </header>

      {/* Floating Audio Disk Player (Mobile) */}
      {isOpened && (
        <div className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center gap-3">
          {showAudioToast && (
            <div className="flex items-center gap-2 py-1.5 px-3.5 bg-[#161514]/95 backdrop-blur-md border border-[#2A2926] text-[#FAF7F2] rounded-full text-xs shadow-xl animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span>{isPlayingAudio ? 'Until I Found You (Violin Solo)' : 'Musik dijeda'}</span>
            </div>
          )}

          <button
            onClick={toggleAudio}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
              isPlayingAudio 
                ? 'bg-[#C5A880] text-[#111110]' 
                : 'bg-[#1C1B19] text-[#FAF7F2]/60 hover:text-[#FAF7F2] border border-[#2A2926]'
            }`}
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            aria-label="Kontrol musik latar"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* ============================================================
          DESKTOP DUAL SIDE PANELS (Clean Editorial Broadsheet Aesthetic)
          Open whitespace, NO rounded border box frames ("frame kotak")!
          ============================================================ */}
      
      {/* Custom Styles for Left Panel Animations */}
      <style>{`
        @keyframes goldGleamSweep {
          0% { transform: translateX(-150%) rotate(25deg); opacity: 0; }
          40% { opacity: 0.7; }
          100% { transform: translateX(250%) rotate(25deg); opacity: 0; }
        }
        @keyframes slowSpinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes kenBurnsZoom {
          0% { transform: scale(1.0); }
          50% { transform: scale(1.09) translate(-1%, -1%); }
          100% { transform: scale(1.0); }
        }
        @keyframes filmstripPan {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes eq1 {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        @keyframes eq2 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
        @keyframes eq3 {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }
        .animate-gold-gleam {
          animation: goldGleamSweep 4s ease-in-out infinite;
        }
        .animate-seal-spin {
          animation: slowSpinClockwise 28s linear infinite;
        }
        .animate-seal-spin:hover {
          animation-play-state: paused;
        }
        .animate-ken-burns {
          animation: kenBurnsZoom 10s ease-in-out infinite alternate;
        }
        .animate-sound-1 {
          animation: eq1 0.75s ease-in-out infinite;
        }
        .animate-sound-2 {
          animation: eq2 0.6s ease-in-out infinite;
        }
        .animate-sound-3 {
          animation: eq3 0.85s ease-in-out infinite;
        }
      `}</style>

      {/* 1. LEFT PANEL: Luxurious Curatorial Monograph & Film Archive */}
      <aside 
        className="hidden lg:flex flex-col fixed top-0 bottom-0 left-0 w-[clamp(280px,28vw,410px)] bg-[#121110] border-r border-[#262420] z-10 pt-16 px-6 sm:px-7 pb-6 overflow-hidden"
      >
        {/* Curatorial Masthead - Refined Editorial Typography without SVG Clutter */}
        <div className="pb-3 border-b border-[#262420] mb-3.5 shrink-0 space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#C5A880] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse shadow-[0_0_8px_#C5A880]" />
              <span>VOL. 01 · MONOGRAF SEKARSITI</span>
            </span>
            <span className="text-[9px] font-mono uppercase bg-[#C5A880]/15 text-[#DFC084] border border-[#C5A880]/30 px-2 py-0.5 rounded-full font-bold">
              EDISI ARSIP
            </span>
          </div>

          <h2 className="font-['Fraunces',serif] text-xl text-[#FAF7F2] font-normal tracking-tight flex items-baseline gap-2">
            <span>{brideName}</span>
            <span className="italic font-serif text-[#C5A880] text-base">&amp;</span>
            <span>{groomName}</span>
          </h2>

          <div className="flex items-center justify-between text-xs text-[#8A857D] font-light">
            <span>Arsip Visual 35mm · {leftCompanionPhotos.length} Plates Terkurasi</span>
            <span className="font-mono text-[10px] text-[#C5A880] tracking-wider">KODAK PORTRA 400</span>
          </div>

          {/* Mode Switcher Tabs - Clean Typography, No SVG clutter */}
          <div className="pt-2 flex items-center gap-1 border-t border-[#262420]/80">
            <button
              type="button"
              onClick={() => setLeftPanelTab('curated')}
              className={`flex-1 py-1.5 px-2 rounded-md text-[10.5px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                leftPanelTab === 'curated'
                  ? 'bg-[#22201D] text-[#DFC084] font-bold shadow-xs border border-[#C5A880]/40'
                  : 'text-[#8A857D] hover:text-[#FAF7F2] hover:bg-[#1A1918]'
              }`}
            >
              <span className="text-[#C5A880] font-serif italic text-xs">§</span>
              <span>Kuratorial ({leftCompanionPhotos.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setLeftPanelTab('contact')}
              className={`flex-1 py-1.5 px-2 rounded-md text-[10.5px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                leftPanelTab === 'contact'
                  ? 'bg-[#22201D] text-[#DFC084] font-bold shadow-xs border border-[#C5A880]/40'
                  : 'text-[#8A857D] hover:text-[#FAF7F2] hover:bg-[#1A1918]'
              }`}
            >
              <span className="text-[#C5A880] font-mono text-[9px] font-bold">35㎜</span>
              <span>Klise Proof</span>
            </button>

            <button
              type="button"
              onClick={() => setLeftPanelTab('filmreel')}
              className={`flex-1 py-1.5 px-2 rounded-md text-[10.5px] font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                leftPanelTab === 'filmreel'
                  ? 'bg-[#22201D] text-[#DFC084] font-bold shadow-xs border border-[#C5A880]/40'
                  : 'text-[#8A857D] hover:text-[#FAF7F2] hover:bg-[#1A1918]'
              }`}
            >
              <span className="text-[#C5A880] font-mono text-[10px]">▶</span>
              <span>Reel Sinema</span>
            </button>
          </div>
        </div>

        {/* Featured Spotlight Hero Reel (Auto-advancing with Ken Burns zoom & Golden Shimmer) */}
        {leftCompanionPhotos.length > 0 && (
          <div className="mb-4 shrink-0 bg-[#1A1918] border border-[#2E2C28] rounded-lg p-3 text-left relative overflow-hidden group shadow-lg">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#C5A880]/20 to-transparent animate-gold-gleam" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-wider uppercase font-mono text-[#C5A880] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
                <span>SPOTLIGHT · PLATE {leftCompanionPhotos[spotlightIdx].plate} / {String(leftCompanionPhotos.length).padStart(2, '0')}</span>
              </span>

              {/* Spotlight controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleSpotlightPrev}
                  className="p-1 rounded text-[#8A857D] hover:text-[#FAF7F2] hover:bg-black/40 transition-colors cursor-pointer"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggleSpotlightPlay}
                  className="p-1 rounded text-[#C5A880] hover:text-white hover:bg-black/40 transition-colors cursor-pointer"
                  title={isSpotlightPlaying ? 'Jeda Slideshow' : 'Putar Slideshow'}
                >
                  {isSpotlightPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={handleSpotlightNext}
                  className="p-1 rounded text-[#8A857D] hover:text-[#FAF7F2] hover:bg-black/40 transition-colors cursor-pointer"
                  title="Foto Berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Spotlight Image Container with Ken Burns motion */}
            <div 
              onClick={() => setSelectedPhoto(leftCompanionPhotos[spotlightIdx].src)}
              className="relative aspect-[16/10] overflow-hidden bg-black rounded cursor-pointer group/img"
            >
              <img 
                key={spotlightIdx}
                src={leftCompanionPhotos[spotlightIdx].src} 
                alt={leftCompanionPhotos[spotlightIdx].title}
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] transition-all duration-700 ease-out group-hover/img:scale-110 group-hover/img:brightness-105 animate-ken-burns"
              />

              {/* Hover inspection badge */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs backdrop-blur-2xs">
                <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-medium tracking-wider text-[11px]">PERBESAR FOTO</span>
              </div>

              {/* Top spec tag */}
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-[#EFE9DF]/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                <span className="truncate max-w-[170px]">{leftCompanionPhotos[spotlightIdx].title}</span>
                <span className="text-[#DFC084]">{leftCompanionPhotos[spotlightIdx].spec || '35MM'}</span>
              </div>
            </div>

            {/* Animated Golden Progress Bar */}
            <div className="w-full bg-[#262420] h-0.5 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#C5A880] to-[#E5CCA8] h-full transition-all duration-75"
                style={{ width: `${spotlightProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Feed Area */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-none">
          
          {/* TAB 1: KURATORIAL VERTICAL ROLL (Expanded 18+ Museum Plates) */}
          {leftPanelTab === 'curated' && (
            <div className="space-y-6 pt-1">
              {leftCompanionPhotos.map((item, idx) => (
                <article 
                  key={idx}
                  onClick={() => setSelectedPhoto(item.src)}
                  className="group cursor-pointer space-y-2 text-left transition-all duration-300 hover:translate-x-1"
                >
                  {/* Plate Header Bar */}
                  <div className="flex items-center justify-between text-[10px] tracking-wider text-[#C5A880] font-mono border-b border-[#22211F] pb-1">
                    <span className="font-bold flex items-center gap-1">
                      <span className="text-[#66625B]">№</span>
                      <span>PLATE {item.plate}</span>
                    </span>
                    <span className="text-[#78746D]">{item.spec}</span>
                  </div>

                  {/* Photo Frame with subtle lighting & hover zoom */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1918] border border-[#22211F] group-hover:border-[#C5A880]/60 transition-colors duration-500 shadow-md">
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.04] group-hover:scale-108 group-hover:brightness-105 transition-all duration-700"
                    />

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-[#DFC084] flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>Inspeksi Arsip</span>
                      </span>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="space-y-0.5">
                    <h3 className="font-['Fraunces',serif] text-sm text-[#FAF7F2] font-normal group-hover:text-[#DFC084] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8A857D] font-light leading-relaxed">
                      {item.meta}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* TAB 2: KLISE 35MM CONTACT SHEET PROOF */}
          {leftPanelTab === 'contact' && (
            <div className="space-y-3 pt-1">
              <div className="p-2 bg-[#1C1B19] border border-[#2E2C28] rounded text-[10px] font-mono text-[#99948B] flex items-center justify-between">
                <span>PROOF SHEET · 35MM KODAK PORTRA</span>
                <span className="text-[#C5A880]">ROLL #{leftCompanionPhotos.length}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {leftCompanionPhotos.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedPhoto(item.src)}
                    className="group cursor-pointer bg-[#0D0D0C] p-1.5 border border-[#22211F] hover:border-[#C5A880] transition-colors space-y-1 text-left relative"
                  >
                    {/* Sprocket hole visual indicators top and bottom */}
                    <div className="flex items-center justify-between text-[7px] font-mono text-[#66625B]">
                      <span>{item.plate}A</span>
                      <span>KODAK 400</span>
                    </div>

                    <div className="relative aspect-[3/2] overflow-hidden bg-black">
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.1] group-hover:scale-108 group-hover:brightness-105 transition-all duration-500"
                      />
                    </div>

                    <p className="font-mono text-[9px] text-[#A8A39A] truncate group-hover:text-[#DFC084]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REEL SINEMA CONTINUOUS STRIP */}
          {leftPanelTab === 'filmreel' && (
            <div className="space-y-4 pt-1 text-left">
              <div className="p-2 bg-[#1C1B19] border border-[#2E2C28] rounded text-[10px] font-mono text-[#99948B] flex items-center justify-between">
                <span>REEL SINEMATIK BERKELANJUTAN</span>
                <span className="text-[#DFC084]">35MM MOTION</span>
              </div>

              <div className="space-y-3">
                {leftCompanionPhotos.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhoto(item.src)}
                    className="group cursor-pointer bg-[#0B0B0A] border border-[#262420] rounded p-2 transition-all duration-300 hover:border-[#C5A880]"
                  >
                    <div className="flex items-center justify-between pb-1 text-[8px] font-mono text-[#78746D]">
                      <span>SCENE {item.plate} · TAKE 01</span>
                      <span className="text-[#C5A880]">00:0{idx + 1}:24</span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-black rounded-xs">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-106 group-hover:brightness-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <p className="text-[10.5px] font-['Fraunces',serif] text-white truncate">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Colophon & Live Audio Sync Status */}
        <div className="mt-3 pt-3 border-t border-[#22211F] shrink-0 flex items-center justify-between text-left">
          
          {/* Audio Equalizer status */}
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-0.5 h-3.5">
              <span className={`w-0.5 bg-[#C5A880] rounded-full ${isPlayingAudio ? 'animate-sound-1' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#C5A880] rounded-full ${isPlayingAudio ? 'animate-sound-2' : 'h-2'}`} />
              <span className={`w-0.5 bg-[#C5A880] rounded-full ${isPlayingAudio ? 'animate-sound-3' : 'h-1.5'}`} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] font-mono tracking-wider uppercase text-[#C5A880]">
                {isPlayingAudio ? 'AUDIO SYNC AKTIF' : 'AUDIO DIJEDA'}
              </p>
              <p className="text-[8px] text-[#66625B] font-mono">
                35MM STEREO TAPE
              </p>
            </div>
          </div>

          {/* Rotating Wax Seal Monogram Badge */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden p-0.5 bg-[#C5A880]/30 shadow-md">
              <img 
                src="/src/assets/images/wax_seal_gold_monogram_1790915522548.jpg" 
                alt="Segel Lilin" 
                className="w-full h-full object-cover rounded-full filter contrast-[1.1] animate-seal-spin"
              />
            </div>
            <span className="text-[9px] font-mono text-[#8A857D] uppercase tracking-wider">
              2027
            </span>
          </div>

        </div>
      </aside>

      {/* 2. RIGHT PANEL: Curatorial Reading Index & Audio (Zero Box Frames) */}
      <aside 
        className="hidden lg:flex flex-col fixed top-0 bottom-0 right-0 w-[clamp(260px,26vw,380px)] bg-[#141413] border-l border-[#22211F] z-10 pt-16 px-8 pb-8 overflow-hidden"
      >
        {/* Curatorial Navigation Header */}
        <div className="pb-4 border-b border-[#22211F] mb-6 shrink-0 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-medium">
              DAFTAR BABAK
            </p>
            <p className="font-['Fraunces',serif] text-lg text-[#FAF7F2] mt-0.5">
              Indeks Undangan
            </p>
          </div>
          <span className="text-xs font-mono text-[#8A857D] tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Clean Typographic Index List - No Border Pills */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-6 scrollbar-none">
          {SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full group flex items-center justify-between py-1.5 text-left transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-[#C5A880] font-medium' 
                    : 'text-[#8A857D] hover:text-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-mono ${isActive ? 'text-[#C5A880]' : 'text-[#55524D]'}`}>
                    {sec.number}
                  </span>
                  <span className="text-sm font-['Fraunces',serif] tracking-wide">
                    {sec.label}
                  </span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Minimal Audio & Date Bar - Open Typographic Layout */}
        <div className="shrink-0 pt-4 border-t border-[#22211F] space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] tracking-wider uppercase text-[#C5A880] font-medium">
                MUSIK LATAR
              </p>
              <p className="text-xs text-[#FAF7F2]">
                Until I Found You
              </p>
              <p className="text-[11px] text-[#8A857D]">
                Stephen Sanchez (Violin Solo)
              </p>
            </div>

            <button
              onClick={toggleAudio}
              className="w-9 h-9 rounded-full bg-[#1C1B19] hover:bg-[#252422] text-[#C5A880] flex items-center justify-center transition-colors cursor-pointer border border-[#2A2926]"
              title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#8A857D] pt-1">
            <span>Minggu, 14 Februari 2027</span>
            <span className="font-mono text-[#C5A880]">H-{timeLeft.days} HARI</span>
          </div>
        </div>
      </aside>

      {/* ============================================================
          SAMPUL / GERBANG PEMBUKA (True Full-Bleed Editorial Magazine Cover)
          NO FLOATING BOX FRAMES! Full viewport immersion, pure typography,
          and bespoke stationery refinement.
          ============================================================ */}
      {!isCoverDismissed && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col justify-between items-center px-6 py-10 sm:py-16 bg-[#111110] text-[#FAF7F2] transition-all duration-700 ease-out ${
            isOpened ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Ambient Vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.22] blur-sm pointer-events-none"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111110] via-[#111110]/80 to-[#111110] pointer-events-none" />

          {/* Top Editorial Masthead (Border-free) */}
          <div className="relative z-10 w-full max-w-md mx-auto text-center space-y-1">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C5A880] font-medium">
              SEKARSITI · EDISI EDITORIAL 2027
            </p>
            <p className="text-xs text-[#8A857D] font-light tracking-widest uppercase">
              UNDANGAN PERNIKAHAN RESMI
            </p>
          </div>

          {/* Center Typographic Focal Point - Grand & Serene */}
          <div className="relative z-10 w-full max-w-lg mx-auto text-center space-y-6 my-auto py-8">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C5A880] font-light">
                THE WEDDING CELEBRATION OF
              </p>
              <h1 className="font-['Fraunces',serif] text-5xl sm:text-6xl text-[#FAF7F2] font-normal tracking-tight leading-tight">
                {brideName} <span className="italic font-serif text-[#C5A880]">&amp;</span> {groomName}
              </h1>
              <p className="text-sm text-[#A8A39A] font-light tracking-wide max-w-sm mx-auto">
                {eventDateFormatted} · {city}
              </p>
            </div>

            {/* Guest Recipient - Flowing Line on Linen, NO Box Frame */}
            <div className="max-w-sm mx-auto pt-6 pb-2 text-center space-y-1.5 border-t border-[#C5A880]/20">
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                <span>KEPADA YTH. TAMU KEHORMATAN</span>
                <button
                  type="button"
                  onClick={() => setIsEditingGuest(!isEditingGuest)}
                  className="text-[#8A857D] hover:text-[#C5A880] transition-colors cursor-pointer"
                  title="Ubah Nama Tamu"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>

              <div>
                {isEditingGuest ? (
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    onBlur={() => setIsEditingGuest(false)}
                    autoFocus
                    placeholder="Nama Tamu..."
                    className="w-full text-center text-lg font-['Fraunces',serif] text-[#FAF7F2] bg-transparent border-b border-[#C5A880] pb-1 focus:outline-none"
                  />
                ) : (
                  <p className="text-lg sm:text-xl font-['Fraunces',serif] text-[#FAF7F2] font-medium">
                    {guestName}
                  </p>
                )}
                <p className="text-[11px] text-[#8A857D] italic font-light pt-0.5">
                  Mohon maaf apabila ada kesalahan penulisan nama &amp; gelar
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Tactile Wax Seal & Open Action (Zero Box Frames) */}
          <div className="relative z-10 w-full max-w-md mx-auto text-center space-y-3 pb-2">
            <button
              onClick={handleOpenInvitation}
              className="group inline-flex flex-col items-center gap-2.5 cursor-pointer transition-transform hover:scale-103 active:scale-95"
            >
              {/* Monogram Seal */}
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl p-0.5 bg-[#C5A880]/40">
                <img 
                  src="/src/assets/images/wax_seal_gold_monogram_1790915522548.jpg" 
                  alt="Segel Lilin Emas" 
                  className="w-full h-full object-cover rounded-full filter contrast-[1.08]"
                />
              </div>

              <span className="text-xs tracking-[0.25em] uppercase text-[#FAF7F2] font-medium border-b border-[#C5A880]/50 pb-0.5 group-hover:border-[#C5A880] transition-colors">
                Buka Undangan
              </span>
            </button>

            <p className="text-[10px] text-[#66625B] font-light">
              Alunan musik akan otomatis diputar
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          CENTRAL STAGE (Mobile & Reading Column: Warm Architectural Paper)
          Open whitespace, NO rounded border box frames ("frame kotak")!
          ============================================================ */}
      <div className="relative z-20 max-w-[520px] mx-auto bg-[#FAF7F2] shadow-[0_0_100px_rgba(0,0,0,0.8)] min-h-screen pt-12">
        
        {/* ============================================================
            SECTION 1: VIDEO HERO
            ============================================================ */}
        <section 
          id="hero-video"
          className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden bg-[#141413]"
        >
          {/* Parallax Video Background */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(1.12)`,
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
              <source src="/videos/wedding-cinematic.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/30 to-[#141413]/70 pointer-events-none" />

          {/* Center Floating Text */}
          <div className="relative z-10 w-full max-w-sm mx-auto p-6 text-center text-[#FAF7F2] space-y-4">
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#C5A880] font-semibold">
              THE WEDDING OF
            </p>

            <h1 className="font-['Fraunces',serif] text-4xl sm:text-5xl text-[#FAF7F2] font-normal tracking-tight leading-tight">
              Kirana &amp; Adhitya
            </h1>

            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]" />
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/90 font-light tracking-[0.25em] uppercase">
              14 · FEBRUARI · 2027
            </p>

            <div className="pt-10 flex flex-col items-center gap-1.5 text-[#C5A880] text-[10px] tracking-widest uppercase animate-pulse">
              <span>Gulir ke Bawah</span>
              <span className="text-sm animate-bounce">↓</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: PROFIL MEMPELAI & KELUARGA (Open Editorial Diptych)
            NO border frames, NO crop brackets, NO white card boxes!
            ============================================================ */}
        <section 
          id="couple"
          className="relative py-20 px-6 sm:px-10 bg-[#FAF7F2] text-[#141413] border-b border-[#EAE4DC]"
        >
          {/* Curatorial Header */}
          <div className="text-center space-y-2 mb-16">
            <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#C5A880]">
              BAB 02 · MEMPELAI &amp; KELUARGA
            </p>
            <h2 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              Kami yang Berbahagia
            </h2>
            <p className="font-['Fraunces',serif] italic text-xs text-[#7A756D]">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="text-xs text-[#5C5954] leading-relaxed font-light max-w-sm mx-auto pt-1">
              Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, teriring rasa syukur atas karunia cinta yang bersemi, kami bermaksud melangsungkan janji suci pernikahan kami:
            </p>
          </div>

          {/* Diptych Showcase - Clean, Open Photos */}
          <div className="space-y-16 max-w-sm mx-auto">
            
            {/* 1. MEMPELAI WANITA */}
            <div className="text-center space-y-4">
              <div 
                onClick={() => setSelectedPhoto(bridePortrait)}
                className="w-48 sm:w-56 aspect-[3/4] mx-auto overflow-hidden cursor-pointer group"
              >
                <img 
                  src={bridePortrait} 
                  alt={brideFullName} 
                  className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-103 transition-transform duration-700"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono">
                  THE BRIDE
                </p>
                <h3 className="font-['Fraunces',serif] text-2xl text-[#141413] font-normal">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#7A756D] font-light max-w-xs mx-auto">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <div className="pt-1">
                    <a 
                      href={`https://instagram.com/${brideInstagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#7A756D] hover:text-[#C5A880] transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{brideInstagram}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Typographic Separator */}
            <div className="flex items-center justify-center gap-4 py-2">
              <span className="h-[1px] w-16 bg-[#C5A880]/30" />
              <span className="font-['Fraunces',serif] italic text-2xl text-[#C5A880]">&amp;</span>
              <span className="h-[1px] w-16 bg-[#C5A880]/30" />
            </div>

            {/* 2. MEMPELAI PRIA */}
            <div className="text-center space-y-4">
              <div 
                onClick={() => setSelectedPhoto(groomPortrait)}
                className="w-48 sm:w-56 aspect-[3/4] mx-auto overflow-hidden cursor-pointer group"
              >
                <img 
                  src={groomPortrait} 
                  alt={groomFullName} 
                  className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-103 transition-transform duration-700"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-mono">
                  THE GROOM
                </p>
                <h3 className="font-['Fraunces',serif] text-2xl text-[#141413] font-normal">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#7A756D] font-light max-w-xs mx-auto">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <div className="pt-1">
                    <a 
                      href={`https://instagram.com/${groomInstagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#7A756D] hover:text-[#C5A880] transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{groomInstagram}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Simple Typographic Calendar Action (No Card Box) */}
          <div className="mt-16 text-center space-y-2">
            <p className="text-xs text-[#7A756D]">
              {eventDateFormatted} · {resepsiVenue}, {city}
            </p>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#141413] hover:text-[#C5A880] border-b border-[#141413] pb-0.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Simpan Tanggal ke Google Calendar</span>
            </a>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: OPENING QUOTE (Pure Open Text, NO Box Frame)
            ============================================================ */}
        <section id="quote" className="py-20 px-6 sm:px-10 bg-[#FAF7F2] border-b border-[#EAE4DC] text-center">
          <div className="max-w-md mx-auto space-y-4">
            <p className="font-['Fraunces',serif] italic text-lg sm:text-xl leading-relaxed text-[#242321]">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, serta menjadikan di antara kamu rasa kasih dan sayang.&rdquo;
            </p>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto opacity-60" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              QS. AR-RUM : 21
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: SPOTLIGHT 1
            ============================================================ */}
        <section id="spotlight-1" className="relative min-h-[60vh] flex items-end overflow-hidden">
          <img 
            src={galleryImages[1]} 
            alt="Spotlight wedding detail" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/30 to-transparent" />
          <div className="relative z-10 w-full p-8 text-center text-[#FAF7F2]">
            <p className="font-['Fraunces',serif] italic text-lg sm:text-xl leading-relaxed max-w-sm mx-auto">
              &ldquo;Setiap langkah kecil, perlahan membawa kami pulang ke pelukan yang sama.&rdquo;
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: WAKTU & TEMPAT (Editorial Itinerary, NO Box Frames)
            ============================================================ */}
        <section id="datetime" className="py-20 px-6 sm:px-10 bg-[#161514] text-[#FAF7F2] text-center border-b border-[#22211F]">
          <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C5A880] mb-2">
            SAVE THE DATE
          </p>
          <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#FAF7F2] mb-2">
            {eventDateFormatted}
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-sm mx-auto mb-10 leading-relaxed font-light">
            {resepsiVenue}, {city}
          </p>

          {/* Countdown - Open Typographic Metrics (NO Border Boxes) */}
          <div className="flex justify-center items-center gap-6 sm:gap-8 mb-12 border-y border-[#262522] py-6 max-w-md mx-auto">
            <div>
              <span className="block font-['Fraunces',serif] text-3xl sm:text-4xl text-[#C5A880] tabular-nums font-light">{timeLeft.days}</span>
              <small className="text-[10px] tracking-widest uppercase text-[#8A857D]">Hari</small>
            </div>
            <span className="text-[#3A3834] font-light">/</span>
            <div>
              <span className="block font-['Fraunces',serif] text-3xl sm:text-4xl text-[#C5A880] tabular-nums font-light">{timeLeft.hours}</span>
              <small className="text-[10px] tracking-widest uppercase text-[#8A857D]">Jam</small>
            </div>
            <span className="text-[#3A3834] font-light">/</span>
            <div>
              <span className="block font-['Fraunces',serif] text-3xl sm:text-4xl text-[#C5A880] tabular-nums font-light">{timeLeft.mins}</span>
              <small className="text-[10px] tracking-widest uppercase text-[#8A857D]">Menit</small>
            </div>
            <span className="text-[#3A3834] font-light">/</span>
            <div>
              <span className="block font-['Fraunces',serif] text-3xl sm:text-4xl text-[#C5A880] tabular-nums font-light">{timeLeft.secs}</span>
              <small className="text-[10px] tracking-widest uppercase text-[#8A857D]">Detik</small>
            </div>
          </div>

          {/* Itinerary Schedule - Clean List (NO Border Cards) */}
          <div className="max-w-sm mx-auto text-left space-y-6 mb-10 divide-y divide-[#262522]">
            <div className="pt-2 space-y-1">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C5A880] font-mono">
                <span>01 · AKAD NIKAH</span>
                <span className="text-[#8A857D]">KELUARGA INTI</span>
              </div>
              <p className="font-['Fraunces',serif] text-2xl text-[#FAF7F2]">
                {akadTime}
              </p>
              <p className="text-xs text-[#FAF7F2]/65">
                {akadVenue}
              </p>
            </div>

            <div className="pt-5 space-y-1">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C5A880] font-mono">
                <span>02 · RESEPSI PERNIKAHAN</span>
                <span className="text-[#8A857D]">TAMU UNDANGAN</span>
              </div>
              <p className="font-['Fraunces',serif] text-2xl text-[#FAF7F2]">
                {resepsiTime}
              </p>
              <p className="text-xs text-[#FAF7F2]/65">
                {resepsiVenue}
              </p>
            </div>
          </div>

          {/* Calendar & Maps Links */}
          <div className="flex items-center justify-center gap-6 max-w-xs mx-auto text-xs">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan Kalender</span>
            </a>

            <span className="text-[#3A3834]">·</span>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: OUR JOURNEY (Flowing Editorial Photo-Essay)
            NO CARD BOXES! Pure storytelling with open photography & prose.
            ============================================================ */}
        <section id="story" className="py-20 px-6 sm:px-10 bg-[#FAF7F2] border-b border-[#EAE4DC]">
          
          {/* Header */}
          <div className="text-center max-w-sm mx-auto mb-16 space-y-2">
            <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#C5A880]">
              BAB 06 · OUR JOURNEY
            </p>
            <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#141413] font-normal tracking-tight">
              Kisah Kasih yang Bertumbuh
            </h3>
            <p className="font-['Fraunces',serif] italic text-xs text-[#7A756D] leading-relaxed">
              &ldquo;Setiap babak memiliki baitnya sendiri, mengalir perlahan hingga berlabuh pada satu nama.&rdquo;
            </p>
          </div>

          {/* Flowing Chapters - Clean, Open Layout */}
          <div className="space-y-16 max-w-md mx-auto">
            {storyMilestones.map((milestone, idx) => (
              <article key={idx} className="space-y-4">
                
                {/* Open Photo */}
                <div 
                  onClick={() => setSelectedPhoto(milestone.image)}
                  className="relative aspect-[16/10] overflow-hidden bg-[#EAE4DC] cursor-pointer group"
                >
                  <img 
                    src={milestone.image} 
                    alt={milestone.title} 
                    className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                {/* Narrative Details */}
                <div className="space-y-2 text-left pt-1">
                  <div className="flex items-center justify-between text-[10px] tracking-wider uppercase font-mono text-[#C5A880]">
                    <span>{milestone.chapter} · {milestone.date}</span>
                    <span className="text-[#8A857D]">{milestone.location}</span>
                  </div>

                  <h4 className="font-['Fraunces',serif] text-2xl text-[#141413] font-normal leading-snug">
                    {milestone.title}
                  </h4>

                  <p className="font-['Fraunces',serif] italic text-xs text-[#7A756D]">
                    {milestone.quote}
                  </p>

                  <p className="text-xs text-[#5C5954] leading-relaxed font-light pt-1">
                    {milestone.story}
                  </p>
                </div>

                {idx < storyMilestones.length - 1 && (
                  <div className="pt-8 flex justify-center">
                    <span className="w-12 h-[1px] bg-[#C5A880]/30" />
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Interlude Pull Quote */}
          <div className="mt-16 text-center space-y-2 max-w-sm mx-auto">
            <Heart className="w-4 h-4 text-[#C5A880] mx-auto opacity-70" />
            <p className="font-['Fraunces',serif] italic text-sm text-[#242321] leading-relaxed">
              &ldquo;Cinta sejati tidak dibangun dari tatapan yang saling mencari, melainkan dua hati yang melangkah menatap arah yang sama.&rdquo;
            </p>
          </div>

        </section>

        {/* ============================================================
            SECTION 7: GALERI (Open Carousel)
            ============================================================ */}
        <section id="gallery" className="py-20 bg-[#161514] text-[#FAF7F2] border-b border-[#22211F]">
          <div className="text-center max-w-xs mx-auto mb-10 px-6">
            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C5A880] mb-2">
              CAPTURED MOMENTS
            </p>
            <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#FAF7F2]">
              Galeri Momen
            </h3>
          </div>

          {/* Carousel Viewport - Open framing */}
          <div className="relative px-6">
            <div 
              onClick={() => setSelectedPhoto(galleryImages[carouselIndex])}
              className="relative aspect-[3/4] max-w-[340px] mx-auto overflow-hidden cursor-pointer group shadow-xl"
            >
              <img 
                src={galleryImages[carouselIndex]} 
                alt={`Momen pernikahan ${carouselIndex + 1}`} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103"
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-6 mt-6">
              <button
                type="button"
                onClick={prevSlide}
                disabled={carouselIndex === 0}
                className="text-[#FAF7F2]/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs uppercase tracking-widest flex items-center gap-1 font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>SEBELUMNYA</span>
              </button>

              <span className="text-xs font-mono text-[#C5A880] tracking-widest">
                0{carouselIndex + 1} / 0{galleryImages.length}
              </span>

              <button
                type="button"
                onClick={nextSlide}
                disabled={carouselIndex === galleryImages.length - 1}
                className="text-[#FAF7F2]/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs uppercase tracking-widest flex items-center gap-1 font-mono"
              >
                <span>SELANJUTNYA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8: TANDA KASIH (Open Stationery Layout, NO Box Frame)
            ============================================================ */}
        <section id="gift" className="py-20 px-6 sm:px-10 bg-[#FAF7F2] text-center border-b border-[#EAE4DC]">
          <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C5A880] mb-2">
            WEDDING GIFT
          </p>
          <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#141413] mb-4">
            Tanda Kasih
          </h3>

          <div className="max-w-sm mx-auto space-y-6">
            <p className="text-xs text-[#5C5954] leading-relaxed">
              Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda berkenan memberikan tanda kasih, dapat disalurkan melalui rekening berikut:
            </p>

            <div className="py-4 border-y border-[#EAE4DC] space-y-1">
              <p className="text-[10px] text-[#C5A880] font-semibold uppercase tracking-widest">
                {bankName}
              </p>
              <p className="text-2xl font-mono font-normal text-[#141413] tracking-wider">
                {accountNumber}
              </p>
              <p className="text-xs text-[#5C5954]">
                {accountHolder}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-1">
              <button
                onClick={handleCopyAccount}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] hover:text-[#C5A880] border-b border-[#141413] pb-0.5 transition-colors cursor-pointer"
              >
                {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
                <span>{copiedBank ? 'Tersalin ke Clipboard' : 'Salin Rekening'}</span>
              </button>

              <span className="text-[#C5A880]">·</span>

              <button
                onClick={() => setShowQrisModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] hover:text-[#C5A880] border-b border-[#141413] pb-0.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Tampilkan QRIS</span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9: GUESTBOOK (Ledger Registry Format, NO Card Boxes)
            ============================================================ */}
        <section id="guestbook" className="py-20 px-6 sm:px-10 bg-[#161514] text-[#FAF7F2] border-b border-[#22211F]">
          <div className="text-center max-w-xs mx-auto mb-10">
            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C5A880] mb-2">
              PRAYERS &amp; WISHES
            </p>
            <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#FAF7F2]">
              Ucapan &amp; Doa Restu
            </h3>
          </div>

          {/* Wishes List - Clean Ledger Lines */}
          <div className="max-w-md mx-auto mb-10 divide-y divide-[#262522]">
            {wishes.map((w, idx) => (
              <div key={idx} className="py-4 text-left space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Fraunces',serif] text-sm text-[#C5A880]">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-[#66625B] font-mono">
                    {w.time}
                  </span>
                </div>
                <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-light">
                  {w.message}
                </p>
              </div>
            ))}
          </div>

          {/* Clean Form */}
          <form onSubmit={handleGuestbookSubmit} className="max-w-md mx-auto space-y-4 text-left">
            <input
              type="text"
              placeholder="Nama Anda"
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              className="w-full bg-transparent border-b border-[#3A3834] text-[#FAF7F2] py-2 text-xs focus:outline-none focus:border-[#C5A880] placeholder:text-[#66625B]"
              required
            />
            <textarea
              placeholder="Tulis ucapan dan doa hangat..."
              value={guestMsgInput}
              onChange={(e) => setGuestMsgInput(e.target.value)}
              rows={2}
              className="w-full bg-transparent border-b border-[#3A3834] text-[#FAF7F2] py-2 text-xs focus:outline-none focus:border-[#C5A880] resize-none placeholder:text-[#66625B]"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#C5A880] hover:bg-[#b8986c] text-[#111110] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              Kirim Ucapan
            </button>
          </form>
        </section>

        {/* ============================================================
            SECTION 10: RSVP (Clean Form, NO Box Frame)
            ============================================================ */}
        <section id="rsvp" className="py-20 px-6 sm:px-10 bg-[#FAF7F2] text-center border-b border-[#EAE4DC]">
          <div className="text-center max-w-xs mx-auto mb-10">
            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-[#C5A880] mb-2">
              CONFIRMATION
            </p>
            <h3 className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#141413]">
              Konfirmasi Kehadiran
            </h3>
          </div>

          {rsvpSuccess && (
            <div className="max-w-sm mx-auto mb-6 p-3 text-emerald-800 text-xs font-medium border-b border-emerald-300">
              ✓ Terima kasih! Konfirmasi kehadiran Anda telah tersimpan dengan baik.
            </div>
          )}

          <form onSubmit={handleRsvpSubmit} className="max-w-sm mx-auto space-y-6 text-left">
            <div>
              <label className="block text-[11px] font-medium text-[#7A756D] uppercase tracking-wider mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Anda"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="w-full bg-transparent border-b border-[#C5A880]/40 text-[#141413] py-2 text-xs focus:outline-none focus:border-[#141413]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#7A756D] uppercase tracking-wider mb-1">Status Kehadiran</label>
              <select
                value={rsvpAttendance}
                onChange={(e) => setRsvpAttendance(e.target.value)}
                className="w-full bg-transparent border-b border-[#C5A880]/40 text-[#141413] py-2 text-xs focus:outline-none focus:border-[#141413]"
                required
              >
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Dapat Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#7A756D] uppercase tracking-wider mb-1">Jumlah Tamu</label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Jumlah tamu"
                value={rsvpCount}
                onChange={(e) => setRsvpCount(e.target.value)}
                className="w-full bg-transparent border-b border-[#C5A880]/40 text-[#141413] py-2 text-xs focus:outline-none focus:border-[#141413]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#141413] hover:bg-[#2B2927] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              Kirim Konfirmasi
            </button>
          </form>
        </section>

        {/* ============================================================
            SECTION 11: CLOSING
            ============================================================ */}
        <section id="closing" className="relative min-h-[60vh] flex items-center justify-center text-center p-8 overflow-hidden bg-[#141413]">
          <img 
            src={galleryImages[0]} 
            alt="Closing background" 
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-[#141413]/75" />

          <div className="relative z-10 text-[#FAF7F2] space-y-4 max-w-sm">
            <div className="w-8 h-[1px] bg-[#C5A880] mx-auto opacity-70 mb-2" />
            <div className="font-['Fraunces',serif] text-3xl sm:text-4xl text-[#C5A880]">
              Kirana &amp; Adhitya
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[#FAF7F2]/80 font-light">
              Terima kasih telah menjadi bagian dari perjalanan kami. Kehadiran dan doa restu Anda adalah hadiah terindah bagi babak baru kehidupan kami.
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#FAF7F2]/40 pt-4 font-mono">
              DIBUAT DENGAN CINTA · 2027
            </p>
          </div>
        </section>

      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Perbesar galeri"
            className="max-w-full max-h-[88vh] object-contain shadow-2xl"
          />
        </div>
      )}

      {/* QRIS Modal */}
      {showQrisModal && (
        <div 
          onClick={() => setShowQrisModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 max-w-xs w-full text-center space-y-4 text-[#141413] shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-['Fraunces',serif] text-base text-[#141413]">QRIS Tanda Kasih</span>
              <button onClick={() => setShowQrisModal(false)} className="text-stone-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 flex items-center justify-center">
              <QrCode className="w-40 h-40 text-stone-800" />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-stone-900">Kirana &amp; Adhitya</p>
              <p className="text-[10px] text-stone-500">Scan via BCA, Mandiri, GoPay, OVO, Dana</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
