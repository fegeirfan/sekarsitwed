import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  X, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Sparkles,
  Instagram,
  BookOpen
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

interface JurnalDuaHatiTemplateProps {
  onBackToLanding: () => void;
  onOrderViaWhatsApp: () => void;
  customData?: ClientInvitationData;
}

// Stage sections configuration for left and right desktop side panels
const SECTION_ORDER = [
  'cover', 'couple', 'moment-1', 'datetime', 'lokasi', 'turut',
  'our-story', 'moment-2', 'dresscode', 'moment-3', 'gallery', 'gift', 'guestbook', 'rsvp', 'closing'
];

const SECTION_PHOTOS: Record<string, string> = {
  cover: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
  couple: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg',
  'moment-1': '/src/assets/images/wedding_couple_portrait_1790833906470.jpg',
  datetime: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
  lokasi: '/src/assets/images/art_deco_venue_details_1790840351864.jpg',
  turut: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
  'our-story': '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
  'moment-2': '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
  dresscode: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
  'moment-3': '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
  gallery: '/src/assets/images/editorial_venue_rings_1790838653826.jpg',
  gift: '/src/assets/images/wedding_table_botanical_1790833955186.jpg',
  guestbook: '/src/assets/images/wedding_ring_exchange_1790833922500.jpg',
  rsvp: '/src/assets/images/wedding_bride_portrait_1790833939171.jpg',
  closing: '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
};

const GALLERY_PHOTOS = [
  { src: '/src/assets/images/wedding_bride_veil_1790901501919.jpg', alt: 'Veil & Senyuman Lembut' },
  { src: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg', alt: 'Potret Mempelai Pria' },
  { src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', alt: 'Janji Suci & Buket Bunga' },
  { src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', alt: 'Perhiasan & Detail Busana' },
  { src: '/src/assets/images/editorial_venue_rings_1790838653826.jpg', alt: 'Sepasang Cincin Pernikahan' },
  { src: '/src/assets/images/wedding_table_botanical_1790833955186.jpg', alt: 'Dekorasi Meja Jamuan' },
  { src: '/src/assets/images/wedding_dance_lights_1790901533590.jpg', alt: 'Tarian Pertama di Bawah Gemerlap' },
  { src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg', alt: 'Momen Bahagia Bersama' }
];

export const JurnalDuaHatiTemplate: React.FC<JurnalDuaHatiTemplateProps> = ({
  onBackToLanding,
  onOrderViaWhatsApp,
  customData,
}) => {
  // Extract custom client values or fallbacks
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
  const accountNumber = customData?.accountNumber || '8271029384';
  const accountHolder = customData?.accountHolder || 'Kirana Ayu Lestari';
  const songTitle = customData?.songTitle || 'Until I Found You - Stephen Sanchez';

  const galleryPhotos = (customData?.mediaSlots?.galleryImages && customData.mediaSlots.galleryImages.length > 0)
    ? customData.mediaSlots.galleryImages.map((src, i) => ({ src, alt: `Lembar Polaroid #${i + 1}` }))
    : GALLERY_PHOTOS;

  // 3D Journal Cover swing open state
  const [isCoverOpening, setIsCoverOpening] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  // Modular hooks: guest recipient, audio, clipboard, countdown, guestbook, rsvp
  const { guestName: guestRecipient } = useGuestRecipient('Bapak / Ibu / Saudara / i');
  const { isPlayingAudio, showAudioToast, toggleAudio, startAudio } = useAudioController(songTitle);
  const { copyText, isCopied } = useClipboardCopy(2500);
  const countdownRaw = useCountdown(countdownIsoDate);
  const countdown = { days: countdownRaw.days, hours: countdownRaw.hours, mins: countdownRaw.mins, secs: countdownRaw.secs };

  const initialWishes = customData?.guestbookEntries && customData.guestbookEntries.length > 0
    ? customData.guestbookEntries
    : [
        {
          name: 'Salsabila Putri',
          message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah senantiasa. 🤍'
        },
        {
          name: 'Bima & Ratih',
          message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Turut berbahagia untuk Kirana & Adhitya!'
        },
        {
          name: 'Dimas Ardianto',
          message: 'Selamat mengarungi bahtera rumah tangga, semoga senantiasa dipenuhi cinta, kedamaian, dan keberkahan.'
        }
      ];

  const {
    wishes,
    nameInput: guestName,
    setNameInput: setGuestName,
    messageInput: guestMessage,
    setMessageInput: setGuestMessage,
    submitWish: handleAddWish
  } = useGuestbook(initialWishes);

  const {
    rsvpName,
    setRsvpName,
    attendance: rsvpAttendance,
    setAttendance: setRsvpAttendance,
    guestCount: rsvpCount,
    setGuestCount: setRsvpCount,
    isSuccess: rsvpSubmitted,
    submitRsvp: handleRsvpSubmit
  } = useRsvpForm();

  // Lightbox Modal state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Carousel state
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Side panels active section tracking
  const [activeSectionId, setActiveSectionId] = useState('cover');
  const [scrollParallax, setScrollParallax] = useState(0);

  // Strict Body Scroll Lock when cover is active:
  useEffect(() => {
    if (!isCoverDismissed) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isCoverDismissed]);

  // 2. Parallax and side panels sync
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const s = Math.max(-50, Math.min(50, scrollY * 0.04));
      setScrollParallax(s);

      // Section intersection detection
      const vh = window.innerHeight;
      let bestSection = 'couple';
      SECTION_ORDER.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh / 2 && rect.bottom > vh / 2) {
            bestSection = id;
          }
        }
      });
      setActiveSectionId(bestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Scroll Reveal Observer with Staggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isCoverDismissed]);

  // Open 3D Journal Cover Handler
  const handleOpenCover = () => {
    setIsCoverOpening(true);
    startAudio();

    // After 3D swing completes, unlock scroll and position at top of central stage
    setTimeout(() => {
      setIsCoverDismissed(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1200);
  };

  const handleCopyAccount = () => {
    copyText(accountNumber, 'jurnal-bank');
  };

  // Carousel controls
  const handlePrevSlide = () => {
    setCarouselIdx(prev => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIdx(prev => Math.min(GALLERY_PHOTOS.length - 1, prev + 1));
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(brideName)}+%26+${encodeURIComponent(groomName)}&dates=20270214T010000Z/20270214T070000Z&details=Undangan+Pernikahan+${encodeURIComponent(brideFullName)}+%26+${encodeURIComponent(groomFullName)}.+Akad+${encodeURIComponent(akadTime)},+Resepsi+${encodeURIComponent(resepsiTime)}.&location=${encodeURIComponent(resepsiVenue)}`;

  // Left & Right mirror photo calculation
  const curIndex = SECTION_ORDER.indexOf(activeSectionId);
  const leftPhoto = SECTION_PHOTOS[activeSectionId] || SECTION_PHOTOS.couple;
  const nextSectionId = SECTION_ORDER[(curIndex + 1) % SECTION_ORDER.length];
  const rightPhoto = SECTION_PHOTOS[nextSectionId] || SECTION_PHOTOS['moment-1'];

  return (
    <div className="jurnal-dua-hati-wrapper relative min-h-screen bg-[#1F1D19] text-[#1F1D19] font-['Newsreader',Georgia,serif] selection:bg-[#D8C9A3]/40 selection:text-[#1F1D19]">
      
      {/* ============================================================
          ORGANIC STYLESHEET WITH BESPOKE FLUID ANIMATIONS
          Strict Color & Shadow Discipline: Warm ink/paper tones, NO black text shadows
          ============================================================ */}
      <style>{`
        .jurnal-dua-hati-wrapper {
          --paper: #EDE9DB;
          --paper-warm: #F4EFE6;
          --ink: #1F1D19;
          --ink-muted: #4B463E;
          --olive: #55653F;
          --olive-light: #7E9261;
          --navy: #263548;
          --navy-deep: #1A2533;
          --sand: #D8C9A3;
          --sand-gold: #CDB98B;
          --cream: #F8F5EC;
          --font-display: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;
          --font-body: 'Newsreader', Georgia, serif;
          --stage-w: 480px;
          --right-w: clamp(140px, 13vw, 240px);
          --ease-book: cubic-bezier(.65, .02, .25, 1);
          --ease-smooth: cubic-bezier(.16, 1, .3, 1);
          --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .2 0 0 0 0 .17 0 0 0 0 .1 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .jurnal-dua-hati-wrapper h1,
        .jurnal-dua-hati-wrapper h2,
        .jurnal-dua-hati-wrapper h3,
        .jurnal-dua-hati-wrapper h4 {
          font-family: var(--font-display);
          margin: 0;
          font-weight: 700;
          letter-spacing: -.02em;
          line-height: 1.1;
        }

        .lead { 
          font-style: italic; 
          margin-bottom: .9rem; 
          opacity: .9; 
          color: inherit;
        }
        .section-title { 
          font-size: 1.75rem; 
          margin-bottom: 1.5rem; 
        }

        /* -------------------------------------------------------------
           BESPOKE ANIMATIONS
           ------------------------------------------------------------- */
        @keyframes waxSealPulse {
          0%, 100% {
            transform: scale(1) translateY(0);
            box-shadow: 0 10px 24px -6px rgba(31, 29, 25, 0.35);
          }
          50% {
            transform: scale(1.03) translateY(-3px);
            box-shadow: 0 16px 32px -8px rgba(216, 201, 163, 0.5);
          }
        }

        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes goldShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes timelinePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(85, 101, 63, 0.5);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(85, 101, 63, 0);
          }
        }

        .anim-wax-pulse {
          animation: waxSealPulse 3.5s ease-in-out infinite;
        }

        .anim-spin-record {
          animation: vinylSpin 8s linear infinite;
        }

        /* Desktop Dual Side Panels */
        .side-panel {
          display: none;
          position: fixed;
          top: 0;
          bottom: 0;
          overflow: hidden;
          background: var(--ink);
          z-index: 1;
        }
        .side-panel--left {
          left: 0;
          width: calc(100vw - var(--stage-w) - var(--right-w));
          border-right: 1px solid rgba(216, 201, 163, .25);
        }
        .side-panel--right {
          right: 0;
          width: var(--right-w);
          border-left: 1px solid rgba(216, 201, 163, .25);
        }
        .side-panel__layer {
          position: absolute;
          inset: -12% -6%;
          background-position: center;
          background-size: cover;
          opacity: 1;
          transition: background-image 1s var(--ease-smooth), transform 0.25s ease-out;
          filter: grayscale(.1) brightness(.88);
        }
        .side-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(rgba(31, 29, 25, .5), rgba(31, 29, 25, .08) 30%, rgba(31, 29, 25, .08) 70%, rgba(31, 29, 25, .55));
        }

        /* Central Stage Container */
        .stage {
          position: relative;
          z-index: 2;
          background: var(--paper);
        }
        .section {
          position: relative;
          overflow: hidden;
        }

        /* Staggered Scroll-Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .85s var(--ease-smooth), transform .85s var(--ease-smooth);
          will-change: opacity, transform;
        }
        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: .12s; }
        .reveal-delay-2 { transition-delay: .24s; }
        .reveal-delay-3 { transition-delay: .36s; }

        /* ============================================================
           3D JOURNAL COVER SWING (LIPAT BUKA BUKU REALISTIS)
           Locks scroll until user clicks "Buka Undangan"
           ============================================================ */
        .gate-shade,
        .section--cover {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .gate-shade {
          z-index: 29;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(31, 29, 25, .65), transparent 70%);
          transition: opacity 1.2s ease;
        }
        .gate-shade.is-opening { opacity: 0; }

        .section--cover {
          z-index: 30;
          display: flex;
          flex-direction: column;
          background: var(--navy) var(--grain);
          color: var(--cream);
          transform: perspective(1900px) rotateY(0deg);
          transform-origin: left center;
          backface-visibility: hidden;
          will-change: transform;
          transition: transform 1.25s var(--ease-book);
          box-shadow: 0 16px 50px -12px rgba(31, 29, 25, .4);
        }
        .section--cover.is-opening {
          transform: perspective(1900px) rotateY(-108deg) scale(0.97);
        }
        .section--cover::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(31, 29, 25, .35), rgba(31, 29, 25, 0) 30%, rgba(31, 29, 25, .3));
          pointer-events: none;
        }
        /* Leather Spine Stitching Detail */
        .section--cover::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 18px;
          background: linear-gradient(90deg, rgba(15, 14, 12, .65), rgba(248, 245, 236, .12) 55%, rgba(15, 14, 12, .35));
          border-right: 1px dashed rgba(216, 201, 163, .45);
          pointer-events: none;
        }

        .cover-photo-frame {
          position: absolute;
          inset: 32px 32px 145px 48px;
          width: calc(100% - 80px);
          height: calc(100% - 177px);
          border: 6px solid var(--cream);
          box-shadow: 0 12px 30px -10px rgba(31, 29, 25, .3);
          z-index: 0;
          overflow: hidden;
        }
        .cover-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(.95);
        }
        .cover-top {
          position: absolute;
          top: 50px;
          left: 64px;
          right: 48px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--cream);
          font-style: italic;
          opacity: .95;
          font-size: .95rem;
        }
        .cover-top-tag {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          padding: .3rem .8rem;
          background: rgba(31, 29, 25, .6);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(216, 201, 163, .35);
          border-radius: 2px;
          font-style: normal;
          font-family: var(--font-display);
          font-size: .75rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .cover-mid {
          position: absolute;
          left: 48px;
          right: 32px;
          bottom: 145px;
          padding: 0;
          display: block;
          z-index: 2;
        }
        .cover-mid::before {
          content: "";
          position: absolute;
          inset: -1.2rem 0 -2.4rem 0;
          background: var(--paper) var(--grain);
          box-shadow: 0 10px 24px -8px rgba(31, 29, 25, .25);
          transform: rotate(-1.2deg);
          margin: 0 1rem;
          border-radius: 2px;
          border: 1px solid rgba(85, 101, 63, .15);
        }
        .cover-headline,
        .cover-subtitle {
          position: relative;
          color: var(--ink);
          margin-left: 2.2rem;
          margin-right: 2.2rem;
        }
        .cover-headline {
          font-size: clamp(1.85rem, 7.5vw, 2.3rem);
          margin-bottom: .4rem;
          margin-top: 0;
        }
        .cover-subtitle {
          font-size: .92rem;
          opacity: .88;
          margin-bottom: 0;
          line-height: 1.45;
        }
        .cover-bottom {
          position: absolute;
          left: 48px;
          right: 32px;
          bottom: 34px;
          padding: 0;
          text-align: center;
          z-index: 2;
        }
        .open-btn {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          background: var(--cream);
          color: var(--ink);
          border: 1px solid var(--sand);
          padding: .9rem 2.2rem;
          box-shadow: 0 8px 22px -6px rgba(31, 29, 25, .3);
          border-radius: 2px;
          font: 600 .95rem var(--font-display);
          letter-spacing: .02em;
          cursor: pointer;
          transition: background .3s, transform .2s, box-shadow .3s;
        }
        .open-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(31, 29, 25, .35);
        }

        /* ============================================================
           SECTION 1: MEMPELAI & SILSILAH KELUARGA (PASTIKAN TIDAK KOSONG)
           Desain buku jurnal dengan kartu ex-libris tamu & potret lengkap
           ============================================================ */
        .section--couple {
          min-height: 100vh;
          min-height: 100svh;
          background: var(--paper) var(--grain);
          display: flex;
          flex-direction: column;
        }
        .couple-photo-frame {
          position: relative;
          height: 48vh;
          height: 48svh;
          min-height: 300px;
        }
        .couple-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .couple-photo-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 50%, rgba(31, 29, 25, .35));
        }
        .couple-body {
          position: relative;
          margin: -2.8rem 1rem 0;
          padding: 2.2rem 1.6rem 2.8rem;
          background: var(--paper-warm) var(--grain);
          box-shadow: 0 12px 28px -12px rgba(31, 29, 25, .18);
          border-radius: 2px;
          border: 1px solid rgba(216, 201, 163, .4);
        }
        .couple-names h2 { 
          font-size: clamp(2rem, 8.5vw, 2.5rem); 
        }
        .couple-names .amp {
          display: block;
          font: italic 400 1.6rem/1 var(--font-body);
          color: var(--olive);
          margin: .35rem 0;
        }
        .parents {
          margin-top: 1.4rem;
          max-width: 24em;
          line-height: 1.75;
          border-left: 2px solid var(--sand);
          padding-left: 1rem;
          color: var(--ink-muted);
        }
        .parents strong { 
          font-weight: 600; 
          color: var(--ink); 
        }

        /* Full Bleed Moments */
        .section--moment,
        .section--lokasi,
        .section--closing {
          display: flex;
          align-items: flex-end;
          background: var(--navy);
          color: var(--cream);
          position: relative;
        }
        .moment-bg,
        .lokasi-bg,
        .closing-bg {
          position: absolute;
          left: 0;
          top: -10%;
          width: 100%;
          height: 120%;
          object-fit: cover;
          will-change: transform;
        }
        .section--moment {
          height: 72vh;
          height: 72svh;
          min-height: 380px;
        }
        .section--moment::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(31, 29, 25, 0) 35%, rgba(31, 29, 25, .82));
        }
        .moment-caption,
        .lokasi-content,
        .closing-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 1.8rem 2.5rem;
        }
        .moment-caption h3 {
          font-size: clamp(2.2rem, 9.5vw, 2.85rem);
        }
        .moment-caption::before {
          content: "";
          display: block;
          width: 44px;
          height: 3px;
          background: var(--sand);
          margin-bottom: 1rem;
        }

        /* Waktu & Hitung Mundur */
        .section--datetime {
          padding: 4.5rem 1.8rem;
          background: var(--navy) var(--grain);
          color: var(--cream);
        }
        .dt-date {
          font: 700 clamp(1.95rem, 8.2vw, 2.45rem)/1.05 var(--font-display);
          letter-spacing: -.02em;
          max-width: 9.5em;
          margin-bottom: 2rem;
          border-bottom: 3px solid var(--sand);
          padding-bottom: 1.2rem;
        }
        .countdown {
          display: flex;
          margin-bottom: 2.4rem;
          border-block: 1px solid rgba(216, 201, 163, .35);
        }
        .countdown div {
          flex: 1;
          padding: 1rem 0 1rem .9rem;
          border-left: 1px solid rgba(216, 201, 163, .25);
        }
        .countdown div:first-child { border-left: 0; padding-left: 0; }
        .countdown span {
          display: block;
          font: 600 2.3rem/1 var(--font-display);
          color: var(--sand);
          font-variant-numeric: tabular-nums;
        }
        .countdown small { font-style: italic; opacity: .8; color: var(--cream); }
        .schedule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
        .schedule-card {
          border-left: 3px solid var(--olive-light);
          padding-left: 1rem;
        }
        .schedule-card .label { font-style: italic; color: var(--sand); font-size: .95rem; }
        .schedule-card .value { font: 600 1.15rem/1.3 var(--font-display); }

        /* Lokasi */
        .section--lokasi {
          min-height: 72vh;
          min-height: 72svh;
        }
        .section--lokasi::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(31, 29, 25, 0) 25%, rgba(31, 29, 25, .92));
        }
        .lokasi-content h3 { font-size: 1.9rem; margin-bottom: .7rem; }
        .lokasi-address { max-width: 22em; margin-bottom: 1.3rem; opacity: .94; }
        .maps-btn {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: var(--cream);
          color: var(--ink);
          padding: .95rem 1.6rem;
          font: 600 .95rem var(--font-display);
          text-decoration: none;
          border-radius: 2px;
          transition: opacity .3s, transform .2s;
        }
        .maps-btn:hover { opacity: .95; transform: translateY(-1px); }

        /* Turut Mengundang */
        .section--turut {
          padding: 4.2rem 1.8rem;
          background: var(--olive) var(--grain);
          color: var(--cream);
        }
        .turut-text { font-size: 1.25rem; line-height: 1.7; max-width: 23em; opacity: .96; }

        /* Story Notebook Lined Timeline */
        .section--story {
          padding: 4.5rem 1.8rem;
          background: var(--paper) var(--grain);
        }
        .story-timeline {
          border-left: 2px solid var(--olive);
          padding-left: 1.5rem;
          margin-left: .3rem;
          background: repeating-linear-gradient(transparent 0 31px, rgba(85, 101, 63, .12) 31px 32px);
        }
        .story-item { position: relative; padding-bottom: 2.2rem; }
        .story-item:last-child { padding-bottom: 0; }
        .story-item::before {
          content: "";
          position: absolute;
          left: calc(-1.5rem - 6px);
          top: .55rem;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--paper);
          border: 2px solid var(--olive);
          animation: timelinePulse 3s ease-in-out infinite;
        }
        .story-item .story-date { display: block; font-style: italic; color: var(--olive); font-size: .95rem; font-weight: 500; }
        .story-item .story-title {
          display: block;
          font: 700 1.25rem/1.2 var(--font-display);
          margin: .1rem 0 .3rem;
          color: var(--ink);
        }
        .story-item p { max-width: 24em; opacity: .88; color: var(--ink-muted); }

        /* Dresscode */
        .section--dresscode {
          padding: 4.2rem 1.8rem;
          background: var(--navy) var(--grain);
          color: var(--cream);
        }
        .dresscode-note { max-width: 23em; margin-bottom: 1.8rem; opacity: .94; }
        .swatches { display: flex; gap: 1.2rem; flex-wrap: wrap; }
        .swatch { display: flex; flex-direction: column; gap: .4rem; }
        .swatch i {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(248, 245, 236, .45);
          box-shadow: 0 4px 10px rgba(31, 29, 25, 0.2);
        }
        .swatch span { font-size: .9rem; font-style: italic; opacity: .85; }

        /* Polaroid Carousel Galeri */
        .section--gallery {
          padding: 4.5rem 0;
          background: var(--paper) var(--grain);
        }
        .section--gallery .section-title { padding: 0 1.8rem; }
        .carousel-viewport { overflow: hidden; padding: 1.2rem 0; }
        .carousel-track {
          display: flex;
          gap: 18px;
          cursor: grab;
          will-change: transform;
          transition: transform .5s cubic-bezier(.2, .7, .2, 1);
        }
        .carousel-track img {
          flex: 0 0 min(72%, 290px);
          aspect-ratio: 3/4;
          object-fit: cover;
          border: 10px solid var(--cream);
          border-bottom-width: 38px;
          box-shadow: 0 10px 22px -10px rgba(31, 29, 25, .2);
          user-select: none;
          transition: transform .4s var(--ease-smooth), box-shadow .4s ease;
        }
        .carousel-track img:nth-child(odd) { transform: rotate(-1.5deg); }
        .carousel-track img:nth-child(even) { transform: rotate(1.4deg) translateY(6px); }
        .carousel-track img:hover { 
          transform: scale(1.04) rotate(0deg) translateY(-8px) !important; 
          box-shadow: 0 18px 34px -12px rgba(31, 29, 25, .3);
          z-index: 10; 
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 1.6rem;
          font: 600 .95rem var(--font-display);
        }
        .carousel-controls button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--ink);
          background: none;
          color: var(--ink);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .3s, transform .2s;
        }
        .carousel-controls button:hover:not(:disabled) { 
          background: rgba(31, 29, 25, .08); 
          transform: scale(1.05);
        }
        .carousel-controls button:disabled {
          opacity: .3;
          cursor: not-allowed;
        }

        /* Tanda Kasih */
        .section--gift {
          padding: 4.2rem 1.8rem;
          background: var(--paper) var(--grain);
        }
        .envelope {
          border-left: 3px solid var(--olive);
          padding-left: 1.2rem;
          max-width: 24em;
        }

        /* Guestbook & RSVP */
        .section--guestbook,
        .section--rsvp { padding: 4.5rem 1.8rem; }
        .section--guestbook { background: var(--ink); color: var(--cream); }
        .section--rsvp { background: var(--paper) var(--grain); }

        .wishes-list {
          max-height: 320px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.2rem;
          padding-right: .3rem;
        }
        .wish-card {
          border-bottom: 1px solid rgba(248, 245, 236, .2);
          padding-bottom: 1rem;
        }
        .wish-card .guest-name {
          display: block;
          font: 600 1rem var(--font-display);
          color: var(--sand);
        }
        .wish-card .message { opacity: .92; }

        form {
          display: flex;
          flex-direction: column;
          gap: .8rem;
        }
        form input,
        form textarea,
        form select {
          width: 100%;
          font: inherit;
          padding: .85rem .95rem;
          border-radius: 2px;
          border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
          background: transparent;
          color: inherit;
        }
        form select option { color: var(--ink); background: var(--paper); }
        form ::placeholder { color: inherit; opacity: .6; }
        form textarea { min-height: 96px; resize: vertical; }
        form button[type="submit"] {
          border: 0;
          background: var(--olive);
          color: var(--cream);
          padding: .95rem;
          font: 600 1rem var(--font-display);
          border-radius: 2px;
          cursor: pointer;
          transition: opacity .3s, transform .2s;
        }
        form button[type="submit"]:hover { opacity: .92; transform: translateY(-1px); }

        /* Penutup */
        .section--closing {
          min-height: 76vh;
          min-height: 76svh;
          align-items: center;
        }
        .section--closing::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(31, 29, 25, .82);
        }
        .closing-content {
          padding-top: 2.5rem;
          text-align: center;
        }
        .closing-content p { max-width: 22em; margin-bottom: 1.4rem; margin-inline: auto; opacity: .94; }
        .closing-credit { font-size: .9rem; font-style: italic; opacity: .7; margin: 0; }

        @media (min-width: 1024px) {
          .jurnal-dua-hati-wrapper {
            padding-left: calc(100vw - var(--stage-w) - var(--right-w));
            padding-right: var(--right-w);
          }
          .side-panel { display: block; }
          .stage {
            max-width: var(--stage-w);
            box-shadow: 0 16px 50px -12px rgba(31, 29, 25, .4);
          }
          .gate-shade,
          .section--cover {
            left: calc(100vw - var(--stage-w) - var(--right-w));
            right: auto;
            width: var(--stage-w);
          }
        }
      `}</style>

      {/* ============================================================
          TOP DEMO CONTROL BAR (Sticky Navigation for Sekarsiti)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1F1D19]/90 backdrop-blur-md border-b border-[#D8C9A3]/25 text-[#F8F5EC] px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-[#D8C9A3] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sekarsiti</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[#F8F5EC]/85">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55653F] animate-pulse" />
          <span className="font-['Bricolage_Grotesque',sans-serif] text-sm text-[#F8F5EC] tracking-wide">
            Seri Jurnal Dua Hati · Kirana &amp; Adhitya
          </span>
        </div>

        <button
          onClick={onOrderViaWhatsApp}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#55653F] hover:bg-[#435132] text-white font-semibold rounded-full shadow-md transition-all active:scale-95 cursor-pointer font-['Bricolage_Grotesque',sans-serif]"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain Ini</span>
        </button>
      </header>

      {/* Floating Audio Vinyl Player with Rotation Animation */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {showAudioToast && (
          <div className="hidden sm:flex items-center gap-2 py-1.5 px-3.5 bg-[#1F1D19]/95 backdrop-blur-md border border-[#D8C9A3]/30 text-[#F8F5EC] rounded-full text-xs shadow-xl animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55653F] animate-pulse" />
            <span>{isPlayingAudio ? 'Musik: Until I Found You (Acoustic Strings)' : 'Musik dijeda'}</span>
          </div>
        )}

        <button
          onClick={toggleAudio}
          className={`w-12 h-12 rounded-full border border-[#D8C9A3]/60 flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
            isPlayingAudio 
              ? 'bg-[#1F1D19] text-[#D8C9A3] ring-4 ring-[#55653F]/30' 
              : 'bg-[#1F1D19]/80 text-[#F8F5EC]/60 hover:text-white'
          }`}
          title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          aria-label="Kontrol musik latar"
        >
          {isPlayingAudio ? (
            <Volume2 className="w-5 h-5 text-[#D8C9A3] anim-spin-record" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ============================================================
          DESKTOP DUAL SIDE PANELS (INTERACTIVE BACKGROUND MIRRORS)
          ============================================================ */}
      
      {/* Panel dekoratif KIRI (lebar) — desktop saja, foto mengikuti section aktif */}
      <div className="side-panel side-panel--left" id="panelLeft" aria-hidden="true">
        <div 
          className="side-panel__layer is-active" 
          style={{ 
            backgroundImage: `url('${leftPhoto}')`,
            transform: `translate3d(0, ${scrollParallax}px, 0)`
          }}
        />
      </div>

      {/* Panel dekoratif KANAN (sempit) — desktop saja, foto section berikutnya */}
      <div className="side-panel side-panel--right" id="panelRight" aria-hidden="true">
        <div 
          className="side-panel__layer is-active" 
          style={{ 
            backgroundImage: `url('${rightPhoto}')`,
            transform: `translate3d(0, ${-scrollParallax}px, 0)`
          }}
        />
      </div>

      {/* ============================================================
          MAIN CENTRAL STAGE (480px Notebook Width)
          ============================================================ */}
      <div className="stage pt-12" id="stage">
        <main>

          {/* ============ 1. SAMPUL JURNAL (3D BOOK SWING OPEN) ============ */}
          {/* Scroll terkunci saat sampul aktif, tidak bisa di-scroll sebelum dibuka */}
          {!isCoverDismissed && (
            <>
              <div className={`gate-shade ${isCoverOpening ? 'is-opening' : ''}`} aria-hidden="true" />
              <section id="cover" className={`section section--cover ${isCoverOpening ? 'is-opening' : ''}`}>
                <div className="cover-photo-frame">
                  <img 
                    className="cover-bg" 
                    src="/src/assets/images/editorial_couple_portrait_1790838636662.jpg" 
                    alt="Sampul Jurnal Kirana &amp; Adhitya"
                  />
                </div>
                
                <div className="cover-top">
                  <span className="cover-top-tag">
                    <BookOpen className="w-3.5 h-3.5 text-[#D8C9A3]" />
                    <span>Jurnal No. 04</span>
                  </span>
                  <span>Undangan Pernikahan</span>
                </div>

                <div className="cover-mid">
                  <h1 className="cover-headline">Dua Kisah. Satu Cerita Baru.</h1>
                  <p className="cover-subtitle">Kami mengundang Anda untuk merayakan awal dari perjalanan seumur hidup kami.</p>
                </div>

                <div className="cover-bottom flex flex-col items-center gap-3">
                  <button 
                    className="open-btn group anim-wax-pulse" 
                    type="button" 
                    onClick={handleOpenCover}
                    disabled={isCoverOpening}
                  >
                    <img 
                      src="/src/assets/images/wax_seal_gold_monogram_1790915522548.jpg" 
                      alt="Segel lilin emas monogram" 
                      className="w-6 h-6 rounded-full object-cover shadow-sm group-hover:rotate-12 transition-transform"
                    />
                    <span>Buka Lembaran Undangan</span>
                    <span className="text-[#55653F] font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <p className="text-[11px] text-[#D8C9A3]/90 italic tracking-wider">
                    Sentuh segel lilin untuk membuka buku jurnal
                  </p>
                </div>
              </section>
            </>
          )}

          {/* ============ 2. HALAMAN PERTAMA: MEMPELAI & SILSILAH KELUARGA ============ */}
          {/* Section pertama lengkap dan berbobot: Basmalah, Kartu Ex-Libris Tamu, Foto Couple & Profil */}
          <section id="couple" className="section section--couple">
            
            {/* Top Sacred Basmalah & Greeting Banner */}
            <div className="pt-8 pb-4 px-6 text-center bg-[#EDE9DB] border-b border-[#D8C9A3]/40">
              <p className="font-serif text-base text-[#55653F] tracking-wide mb-1 font-medium">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#1F1D19]/70 font-['Bricolage_Grotesque',sans-serif] font-medium">
                Dengan Memohon Ridho Allah SWT
              </p>
            </div>

            {/* Ex-Libris Vintage Bookplate Salutation for Honored Guest */}
            <div className="mx-4 sm:mx-6 my-4 p-4 bg-white/90 border border-[#D8C9A3] rounded-xs shadow-xs text-center space-y-1">
              <p className="text-[10px] font-['Bricolage_Grotesque',sans-serif] tracking-widest text-[#55653F] uppercase font-semibold">
                LEMBARAN KESAKSIAN TERCINTA
              </p>
              <p className="text-xs text-[#1F1D19]/80 italic">
                Khusus Ditujukan Kepada Yang Kami Hormati:
              </p>
              <h4 className="font-['Bricolage_Grotesque',sans-serif] text-base sm:text-lg text-[#1F1D19] font-bold tracking-tight">
                {guestRecipient}
              </h4>
              <p className="text-[10px] text-[#1F1D19]/60 italic">
                di Tempat
              </p>
            </div>

            {/* Couple Archival Photo Frame */}
            <div className="couple-photo-frame mx-4 sm:mx-6 border border-[#D8C9A3]/80">
              <img 
                src="/src/assets/images/art_deco_emerald_couple_1790840336340.jpg" 
                alt="Foto pasangan mempelai Kirana &amp; Adhitya" 
              />
              <div className="absolute bottom-3 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1F1D19]/80 backdrop-blur-xs text-[#D8C9A3] text-[10px] uppercase tracking-widest font-['Bricolage_Grotesque',sans-serif] rounded-xs">
                  FIG. 01 · {brideName.toUpperCase()} &amp; {groomName.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Main Curatorial Profiles: Bride & Groom Diptych */}
            <div className="couple-body mx-4 sm:mx-6">
              <p className="lead reveal in-view text-[#1F1D19]/90 text-sm leading-relaxed mb-6">
                “Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan penuh syukur dan kerendahan hati, kami bermaksud mengikat janji suci pernikahan:”
              </p>

              {/* Mempelai Wanita */}
              <div className="space-y-3 pb-6 border-b border-[#D8C9A3]/40 reveal in-view">
                <span className="text-[11px] font-['Bricolage_Grotesque',sans-serif] font-semibold text-[#55653F] tracking-widest uppercase">
                  MEMPELAI WANITA
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#1F1D19] font-serif font-bold">
                  {brideFullName}
                </h2>
                <p className="text-xs sm:text-sm text-[#4B463E] leading-relaxed">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#55653F]">
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="font-sans">{brideInstagram}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Monogram Seal Interlude */}
              <div className="py-6 flex items-center justify-center reveal in-view">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[#D8C9A3]" />
                  <div className="w-10 h-10 rounded-full border border-[#55653F] bg-[#EDE9DB] flex items-center justify-center font-['Newsreader',serif] italic font-semibold text-base text-[#55653F] shadow-xs">
                    {brideName.charAt(0)} &amp; {groomName.charAt(0)}
                  </div>
                  <div className="h-px w-12 bg-[#D8C9A3]" />
                </div>
              </div>

              {/* Mempelai Pria */}
              <div className="space-y-3 pb-6 border-b border-[#D8C9A3]/40 reveal in-view">
                <span className="text-[11px] font-['Bricolage_Grotesque',sans-serif] font-semibold text-[#55653F] tracking-widest uppercase">
                  MEMPELAI PRIA
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#1F1D19] font-serif font-bold">
                  {groomFullName}
                </h2>
                <p className="text-xs sm:text-sm text-[#4B463E] leading-relaxed">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#55653F]">
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="font-sans">{groomInstagram}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Kami yang Berbahagia Badge */}
              <div className="pt-6 text-center space-y-1.5 reveal in-view">
                <span className="text-[10px] font-['Bricolage_Grotesque',sans-serif] uppercase tracking-widest text-[#55653F] font-bold">
                  KAMI YANG BERBAHAGIA
                </span>
                <p className="font-serif italic text-xs text-[#4B463E]">
                  Keluarga Besar Bpk. Hendra Wijaya &amp; Keluarga Besar Bpk. Suryanto Nugraha
                </p>
              </div>

            </div>
          </section>

          {/* ============ 3. MOMEN 1 ============ */}
          <section id="moment-1" className="section section--moment">
            <img 
              loading="lazy" 
              className="moment-bg" 
              src="/src/assets/images/wedding_couple_portrait_1790833906470.jpg" 
              alt="Momen Cahaya Sore" 
            />
            <div className="moment-caption reveal">
              <h3>Cahaya Sore</h3>
              <p className="text-xs italic text-[#D8C9A3] tracking-wide mt-1">Saat langkah pertama saling berpadu</p>
            </div>
          </section>

          {/* ============ 4. WAKTU & TANGGAL (COUNTDOWN REALTIME) ============ */}
          <section id="datetime" className="section section--datetime">
            <p className="lead reveal text-[#D8C9A3]">Simpan tanggalnya</p>
            <p className="dt-date reveal text-[#F8F5EC]">{eventDateFormatted}</p>
            
            <div className="countdown reveal" id="countdown">
              <div><span className="tabular-nums">{countdown.days}</span><small>Hari</small></div>
              <div><span className="tabular-nums">{countdown.hours}</span><small>Jam</small></div>
              <div><span className="tabular-nums">{countdown.mins}</span><small>Menit</small></div>
              <div><span className="tabular-nums">{countdown.secs}</span><small>Detik</small></div>
            </div>

            <div className="schedule-grid reveal">
              <div className="schedule-card">
                <p className="label">Akad Nikah</p>
                <p className="value text-[#F8F5EC]">{akadTime}</p>
              </div>
              <div className="schedule-card">
                <p className="label">Resepsi</p>
                <p className="value text-[#F8F5EC]">{resepsiTime}</p>
              </div>
            </div>

            <div className="mt-8 reveal">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-3 px-5 bg-[#D8C9A3] hover:bg-white text-[#1F1D19] rounded-xs font-semibold text-xs uppercase tracking-wider font-['Bricolage_Grotesque',sans-serif] transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#55653F]" />
                <span>Simpan ke Google Calendar</span>
              </a>
            </div>
          </section>

          {/* ============ 5. LOKASI ACARA ============ */}
          <section id="lokasi" className="section section--lokasi">
            <img 
              loading="lazy" 
              className="lokasi-bg" 
              src="/src/assets/images/art_deco_venue_details_1790840351864.jpg" 
              alt={resepsiVenue} 
            />
            <div className="lokasi-content">
              <p className="lead reveal text-[#D8C9A3]">Lokasi acara</p>
              <h3 className="reveal text-[#F8F5EC]">{resepsiVenue}</h3>
              <p className="lokasi-address reveal text-[#F8F5EC]/90 text-sm">
                {city}
              </p>
              <a 
                className="maps-btn reveal inline-flex items-center gap-2" 
                href={mapsUrl} 
                target="_blank" 
                rel="noreferrer"
              >
                <MapPin className="w-4 h-4 text-[#55653F]" />
                <span>Buka Petunjuk di Google Maps</span>
                <span className="font-bold">→</span>
              </a>
            </div>
          </section>

          {/* ============ 6. TURUT MENGUNDANG ============ */}
          <section id="turut" className="section section--turut">
            <h3 className="section-title reveal text-[#F8F5EC]">Turut mengundang</h3>
            <p className="turut-text reveal text-[#F8F5EC]/95">
              Keluarga Besar Wijaya &amp; Keluarga Besar Nugraha turut mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan doa restu bagi kedua mempelai.
            </p>
          </section>

          {/* ============ 7. KISAH CINTA KAMI ============ */}
          <section id="our-story" className="section section--story">
            <h3 className="section-title reveal text-[#1F1D19]">Kisah Cinta Kami</h3>
            <div className="story-timeline">
              <div className="story-item reveal">
                <span className="story-date">Agustus 2019</span>
                <span className="story-title">Pertemuan Pertama</span>
                <p>Bertemu tanpa sengaja di sebuah acara kampus, dan sejak itu percakapan tak pernah berhenti mengalir hangat.</p>
              </div>
              <div className="story-item reveal">
                <span className="story-date">Desember 2022</span>
                <span className="story-title">Lamaran</span>
                <p>Di depan keluarga besar, sebuah janji sederhana disampaikan dan diterima dengan haru bahagia.</p>
              </div>
              <div className="story-item reveal">
                <span className="story-date">Februari 2027</span>
                <span className="story-title">Hari Bahagia</span>
                <p>Babak baru dimulai — dua keluarga menjadi satu, disaksikan oleh seluruh orang-orang tercinta.</p>
              </div>
            </div>
          </section>

          {/* ============ 8. MOMEN 2 ============ */}
          <section id="moment-2" className="section section--moment">
            <img 
              loading="lazy" 
              className="moment-bg" 
              src="/src/assets/images/wedding_dance_lights_1790901533590.jpg" 
              alt="Momen Tawa yang Sama" 
            />
            <div className="moment-caption reveal">
              <h3>Tawa yang Sama</h3>
              <p className="text-xs italic text-[#D8C9A3] tracking-wide mt-1">Di setiap kelakar dan obrolan panjang</p>
            </div>
          </section>

          {/* ============ 9. KETENTUAN BUSANA (DRESSCODE) ============ */}
          <section id="dresscode" className="section section--dresscode">
            <h3 className="section-title reveal text-[#F8F5EC]">Ketentuan busana</h3>
            <p className="dresscode-note reveal text-[#F8F5EC]/90 text-sm">
              Kami mengundang Anda mengenakan busana bernuansa olive, navy, pasir, atau krem hangat — agar potret bersama terasa senada.
            </p>
            <div className="swatches reveal">
              <div className="swatch"><i style={{ background: '#55653F' }}></i><span>Olive</span></div>
              <div className="swatch"><i style={{ background: '#263548' }}></i><span>Navy</span></div>
              <div className="swatch"><i style={{ background: '#D8C9A3' }}></i><span>Pasir</span></div>
              <div className="swatch"><i style={{ background: '#F8F5EC' }}></i><span>Krem</span></div>
            </div>
          </section>

          {/* ============ 10. MOMEN 3 ============ */}
          <section id="moment-3" className="section section--moment">
            <img 
              loading="lazy" 
              className="moment-bg" 
              src="/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg" 
              alt="Momen Menuju Rumah" 
            />
            <div className="moment-caption reveal">
              <h3>Menuju Rumah</h3>
              <p className="text-xs italic text-[#D8C9A3] tracking-wide mt-1">Tempat hati ini selalu pulang</p>
            </div>
          </section>

          {/* ============ 11. GALERI CAROUSEL POLAROID ============ */}
          <section id="gallery" className="section section--gallery">
            <div className="px-6 flex items-center justify-between mb-2">
              <h3 className="section-title reveal text-[#1F1D19] !mb-0">Galeri Polaroid</h3>
              <span className="text-xs text-[#55653F] font-serif italic reveal">Klik untuk memperbesar</span>
            </div>

            <div className="carousel">
              <div className="carousel-viewport">
                <div 
                  ref={carouselTrackRef}
                  className="carousel-track px-6"
                  style={{ transform: `translateX(${-carouselIdx * 270}px)` }}
                >
                  {galleryPhotos.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img.src} 
                      alt={img.alt} 
                      onClick={() => setSelectedPhoto(img.src)}
                      className="cursor-pointer"
                      title="Klik untuk melihat resolusi penuh"
                    />
                  ))}
                </div>
              </div>

              <div className="carousel-controls">
                <button 
                  type="button" 
                  onClick={handlePrevSlide} 
                  disabled={carouselIdx === 0}
                  aria-label="Foto sebelumnya"
                >
                  ‹
                </button>
                <span>{carouselIdx + 1} / {galleryPhotos.length}</span>
                <button 
                  type="button" 
                  onClick={handleNextSlide} 
                  disabled={carouselIdx === galleryPhotos.length - 1}
                  aria-label="Foto berikutnya"
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* ============ 12. TANDA KASIH ============ */}
          <section id="gift" className="section section--gift">
            <h3 className="section-title reveal text-[#1F1D19]">Tanda kasih</h3>
            <div className="envelope reveal space-y-4">
              <p className="text-sm text-[#4B463E] leading-relaxed">
                Doa restu Anda adalah karunia yang paling berarti bagi kami. Namun jika ingin memberi tanda kasih, kami dengan hormat menerima melalui:
              </p>
              
              <div className="p-4 bg-white/90 border border-[#D8C9A3] rounded-xs space-y-1 shadow-xs">
                <p className="font-semibold text-sm text-[#1F1D19] font-['Bricolage_Grotesque',sans-serif]">
                  {bankName}: {accountNumber}
                </p>
                <p className="text-xs text-[#55653F] italic font-serif">
                  a.n. {accountHolder}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyAccount}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F1D19] hover:bg-black text-[#F8F5EC] text-xs font-semibold rounded-xs font-['Bricolage_Grotesque',sans-serif] transition-colors cursor-pointer"
              >
                {isCopied('jurnal-bank') ? <Check className="w-3.5 h-3.5 text-[#D8C9A3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied('jurnal-bank') ? 'Nomor Tersalin!' : 'Salin Nomor Rekening'}</span>
              </button>
            </div>
          </section>

          {/* ============ 13. BUKU TAMU / GUESTBOOK ============ */}
          <section id="guestbook" className="section section--guestbook">
            <h3 className="section-title reveal text-[#F8F5EC]">Ucapan &amp; Doa</h3>
            
            <div className="wishes-list reveal">
              {wishes.map((w, idx) => (
                <div key={idx} className="wish-card">
                  <span className="guest-name">{w.name}</span>
                  <p className="message text-sm text-[#F8F5EC]/90">{w.message}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddWish} className="reveal">
              <input 
                type="text" 
                placeholder="Nama Anda" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required 
              />
              <textarea 
                placeholder="Tulis ucapan & doa restu untuk kedua mempelai" 
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                required 
              />
              <button type="submit">Kirim Ucapan</button>
            </form>
          </section>

          {/* ============ 14. RSVP KONFIRMASI KEHADIRAN ============ */}
          <section id="rsvp" className="section section--rsvp">
            <h3 className="section-title reveal text-[#1F1D19]">Konfirmasi Kehadiran</h3>
            
            <form onSubmit={handleRsvpSubmit} className="reveal">
              <input 
                type="text" 
                placeholder="Nama Anda" 
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                required 
              />
              <select 
                value={rsvpAttendance} 
                onChange={(e) => setRsvpAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                required
              >
                <option value="hadir">Akan Hadir</option>
                <option value="tidak_hadir">Berhalangan Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
              <input 
                type="number" 
                min="1" 
                max="5"
                value={rsvpCount}
                onChange={(e) => setRsvpCount(e.target.value)}
                placeholder="Jumlah tamu yang hadir" 
              />
              <button type="submit" disabled={rsvpSubmitted}>
                {rsvpSubmitted ? 'Konfirmasi Berhasil Terkirim!' : 'Kirim Konfirmasi Kehadiran'}
              </button>
            </form>
          </section>

          {/* ============ 15. PENUTUP ============ */}
          <section id="closing" className="section section--closing">
            <img 
              loading="lazy" 
              className="closing-bg" 
              src="/src/assets/images/editorial_venue_rings_1790838653826.jpg" 
              alt="Penutup Jurnal" 
            />
            <div className="closing-content reveal">
              <h3 className="section-title text-[#F8F5EC]">Terima kasih</h3>
              <p className="text-sm text-[#F8F5EC]/90 leading-relaxed">
                Terima kasih telah menjadi bagian berharga dari kisah kami. Kehadiran dan doa restu Anda adalah hadiah terindah dalam memulai babak baru ini.
              </p>
              <p className="closing-credit text-[#D8C9A3]/80">
                Kirana &amp; Adhitya · Jakarta, 2027
              </p>
            </div>
          </section>

        </main>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-[#1F1D19]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedPhoto}
            alt="Perbesar foto polaroid"
            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl border-4 border-[#F8F5EC]"
          />
        </div>
      )}

    </div>
  );
};
