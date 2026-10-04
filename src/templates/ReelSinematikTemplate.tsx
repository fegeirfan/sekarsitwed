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
  Film,
  Ticket,
  Clock,
  Send
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

interface ReelSinematikTemplateProps {
  onBackToLanding: () => void;
  onOrderViaWhatsApp: () => void;
  customData?: ClientInvitationData;
}

// Chapters for the bottom filmstrip navigation
const CHAPTERS = [
  { id: 's-hero', title: 'Pembuka', thumbSeed: 'hero', photo: '/src/assets/images/film_vintage_couple_1791034007642.jpg' },
  { id: 's-profil', title: 'Profil', thumbSeed: 'couple', photo: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg' },
  { id: 's-sisipan-1', title: 'Naskah I', thumbSeed: 'quote1', photo: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg' },
  { id: 's-mempelai', title: 'Mempelai', thumbSeed: 'groom', photo: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg' },
  { id: 's-story', title: 'Adegan Cinta', thumbSeed: 'story', photo: '/src/assets/images/wedding_couple_portrait_1790833906470.jpg' },
  { id: 's-waktu', title: 'Jadwal Tayang', thumbSeed: 'ticket', photo: '/src/assets/images/art_deco_venue_details_1790840351864.jpg' },
  { id: 's-galeri', title: 'Contact Sheet', thumbSeed: 'gallery', photo: '/src/assets/images/wedding_dance_lights_1790901533590.jpg' },
  { id: 's-dresscode', title: 'Wardrobe', thumbSeed: 'dresscode', photo: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg' },
  { id: 's-sisipan-2', title: 'Naskah II', thumbSeed: 'quote2', photo: '/src/assets/images/wedding_ring_exchange_1790833922500.jpg' },
  { id: 's-hadiah', title: 'Tanda Kasih', thumbSeed: 'gift', photo: '/src/assets/images/wedding_table_botanical_1790833955186.jpg' },
  { id: 's-rsvp', title: 'Reservasi', thumbSeed: 'rsvp', photo: '/src/assets/images/wedding_bride_portrait_1790833939171.jpg' },
  { id: 's-ucapan', title: 'Papan Ucapan', thumbSeed: 'ucapan', photo: '/src/assets/images/editorial_venue_rings_1790838653826.jpg' },
  { id: 's-penutup', title: 'Tamat', thumbSeed: 'closing', photo: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg' }
];

// 8 scattered polaroids for gallery
const GALLERY_POLAROIDS = [
  { src: '/src/assets/images/wedding_bride_veil_1790901501919.jpg', cap: '01 · Senyuman Pertama', alt: 'Veil mempelai wanita' },
  { src: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg', cap: '02 · Tatapan Hangat', alt: 'Potret mempelai pria' },
  { src: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', cap: '03 · Janji Suci & Buket', alt: 'Buket bunga vintage' },
  { src: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', cap: '04 · Detail Wardrobe', alt: 'Sepatu dan perhiasan' },
  { src: '/src/assets/images/editorial_venue_rings_1790838653826.jpg', cap: '05 · Sepasang Cincin', alt: 'Cincin kawin di atas batu' },
  { src: '/src/assets/images/wedding_table_botanical_1790833955186.jpg', cap: '06 · Jamuan Meja', alt: 'Dekorasi meja jamuan' },
  { src: '/src/assets/images/wedding_dance_lights_1790901533590.jpg', cap: '07 · Dansa Malam', alt: 'Tarian di bawah lampu gantung' },
  { src: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg', cap: '08 · Pelukan Bahagia', alt: 'Momen berpelukan' }
];

// 16 tiles for hero analog mosaic
const HERO_TILES = [
  '/src/assets/images/film_vintage_couple_1791034007642.jpg',
  '/src/assets/images/wedding_couple_portrait_1790833906470.jpg',
  '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
  '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
  '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
  '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
  '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
  '/src/assets/images/editorial_venue_rings_1790838653826.jpg',
  '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
  '/src/assets/images/wedding_table_botanical_1790833955186.jpg',
  '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg',
  '/src/assets/images/art_deco_venue_details_1790840351864.jpg',
  '/src/assets/images/wedding_ring_exchange_1790833922500.jpg',
  '/src/assets/images/wedding_bride_portrait_1790833939171.jpg',
  '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
  '/src/assets/images/botanical_estate_venue_1790919022237.jpg'
];

export const ReelSinematikTemplate: React.FC<ReelSinematikTemplateProps> = ({
  onBackToLanding,
  onOrderViaWhatsApp,
  customData,
}) => {
  // Extract custom client values or fallbacks
  const brideName = customData?.brideName || 'Larasati';
  const brideFullName = customData?.brideFullName || 'Larasati Sekar Kinanti, S.Sn.';
  const brideParents = customData?.brideParents || 'Putri tercinta Bapak Danang Triputra & Ibu Ratna Susilowati';
  const brideInstagram = customData?.brideInstagram || '@larasatisekar';

  const groomName = customData?.groomName || 'Fajar';
  const groomFullName = customData?.groomFullName || 'Fajar Nugraha Pratama, S.T.';
  const groomParents = customData?.groomParents || 'Putra tercinta Bapak Hendrawan Pratama & Ibu Nuraini Dewi';
  const groomInstagram = customData?.groomInstagram || '@fajarnugraha';

  const eventDateFormatted = customData?.eventDateFormatted || 'Sabtu, 24 Oktober 2026';
  const countdownIsoDate = customData?.countdownIsoDate || '2026-10-24T08:00:00+07:00';
  const akadTime = customData?.akadTime || '08.00 – 10.00 WIB';
  const akadVenue = customData?.akadVenue || 'Paviliun Rinjani, Sanur Heritage Estate';
  const resepsiTime = customData?.resepsiTime || '11.00 – 15.00 WIB';
  const resepsiVenue = customData?.resepsiVenue || 'Amphitheater Garden, Sanur Estate';
  const city = customData?.city || 'Denpasar, Bali';
  const mapsUrl = customData?.mapsUrl || 'https://maps.google.com';

  const bankName = customData?.bankName || 'Bank Mandiri';
  const accountNumber = customData?.accountNumber || '1370019283741';
  const accountHolder = customData?.accountHolder || 'Fajar Nugraha Pratama';
  const songTitle = customData?.songTitle || 'Lagu Senja Analog - 35mm Acoustic Tape';

  const customFilmImages = customData?.mediaSlots?.filmstripImages || customData?.mediaSlots?.galleryImages;
  const galleryPolaroids = (customFilmImages && customFilmImages.length > 0)
    ? customFilmImages.map((src, i) => ({
        src,
        cap: `${String(i + 1).padStart(2, '0')} · Klise Sinematik #${i + 1}`,
        alt: `Frame Klise 35mm #${i + 1}`
      }))
    : GALLERY_POLAROIDS;

  // Gate / Double Door Cover State
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isGateDone, setIsGateDone] = useState(false);

  // Modular Hooks: Guest recipient, audio, clipboard, countdown, guestbook, rsvp
  const { guestName: guestRecipient } = useGuestRecipient('Tamu Undangan');
  const { isPlayingAudio, showAudioToast, toggleAudio, startAudio } = useAudioController(songTitle);
  const { copyText, isCopied } = useClipboardCopy(2500);
  const countdownRaw = useCountdown(countdownIsoDate);
  const countdown = { d: countdownRaw.days, h: countdownRaw.hours, m: countdownRaw.mins, s: countdownRaw.secs };
  const [flippedUnit, setFlippedUnit] = useState<string | null>(null);

  // Active section for filmstrip navigation
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Lightbox Modal state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const initialWishes = customData?.guestbookEntries && customData.guestbookEntries.length > 0
    ? customData.guestbookEntries.map((w, idx) => ({ ...w, rotate: (idx % 2 === 0 ? -1.8 : 1.5) }))
    : [
        {
          name: 'Putri Anggraini',
          message: 'Selamat menikah kalian berdua! Semoga langgeng sampai kakek nenek ya, aku terharu banget liat kalian sejauh ini 🥹💍',
          rotate: -2.2
        },
        {
          name: 'Rian & Monica',
          message: 'Selamat memasuki babak baru kehidupan! Semoga selalu diliputi cinta, rezeki melimpah, dan keluarga yang bahagia.',
          rotate: 1.8
        },
        {
          name: 'dr. Danang Wijayanto',
          message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Turut berbahagia untuk Laras & Fajar!',
          rotate: -1.5
        }
      ];

  const {
    wishes,
    nameInput: guestName,
    setNameInput: setGuestName,
    messageInput: guestMessage,
    setMessageInput: setGuestMessage,
    submitWish: handleAddWish
  } = useGuestbook(initialWishes as any);

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
  const [rsvpNote, setRsvpNote] = useState('');

  // Filmstrip track container ref
  const filmstripTrackRef = useRef<HTMLDivElement>(null);

  // Body scroll lock while gate is closed
  useEffect(() => {
    if (!isGateDone) {
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
  }, [isGateDone]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = CHAPTERS.map(c => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) {
              setActiveSectionIdx(idx);
              // Auto scroll filmstrip thumbnail into view
              if (filmstripTrackRef.current) {
                const activeThumb = filmstripTrackRef.current.children[idx] as HTMLElement;
                if (activeThumb) {
                  activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isGateDone]);

  // Scroll reveal animation observer
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reel-reveal').forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [isGateDone]);

  // Open gate handler
  const handleOpenGate = () => {
    setIsGateOpen(true);
    startAudio();

    setTimeout(() => {
      setIsGateDone(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1500);
  };

  const handleCopy = (text: string, key: string) => {
    copyText(text, key);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(brideName)}+%26+${encodeURIComponent(groomName)}&dates=20271009T010000Z/20271009T060000Z&details=Undangan+Pernikahan+${encodeURIComponent(brideFullName)}+%26+${encodeURIComponent(groomFullName)}.+Akad+${encodeURIComponent(akadTime)},+Resepsi+${encodeURIComponent(resepsiTime)}.&location=${encodeURIComponent(resepsiVenue)}`;

  return (
    <div className="reel-template-root relative min-h-screen bg-[#F3EAD9] text-[#211B14] font-['Karla',sans-serif] selection:bg-[#C99A4B]/40 selection:text-[#171310] pb-[82px]">
      
      {/* ============================================================
          DESIGN TOKENS & CSS STYLESHEET
          Vintage 35mm Analog Film, Polaroid, Cinema Perforations
          ============================================================ */}
      <style>{`
        .reel-template-root {
          --film-black: #171310;
          --film-deep: #0D0A08;
          --paper: #F3EAD9;
          --paper-dim: #E8DDC5;
          --paper-warm: #FAF4E8;
          --sepia: #C99A4B;
          --sepia-light: #DFC084;
          --wine: #7B3B34;
          --ink: #211B14;
          --gold: #D4AF6A;
          --gold-deep: #A9782F;
          --gold-grad: linear-gradient(100deg, #B98A3E, #F2DDA6 40%, #C99A4B 65%, #EBCF92);
          --font-display: 'DM Serif Display', 'Bodoni Moda', serif;
          --font-body: 'Karla', sans-serif;
          --font-hand: 'Caveat', cursive;
          --font-mono: 'Courier Prime', monospace;
          --font-script: 'Pinyon Script', cursive;
        }

        .reel-template-root h1,
        .reel-template-root h2,
        .reel-template-root h3 {
          font-family: var(--font-display);
          font-weight: 400;
          margin: 0;
        }

        .gold-text {
          background: var(--gold-grad);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .reel-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--wine);
        }

        .reel-section-inner {
          max-width: 580px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
          z-index: 2;
        }

        .reel-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.22, .61, .36, 1);
        }
        .reel-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Polaroid Frame with Washi Tape */
        .reel-polaroid {
          position: relative;
          background: #FFFFFF;
          padding: 12px 12px 34px;
          box-shadow: 0 12px 30px rgba(23, 19, 16, 0.22);
          transition: transform .35s ease, box-shadow .35s ease;
        }
        .reel-polaroid::before {
          content: "";
          position: absolute;
          top: -11px;
          left: 50%;
          width: 74px;
          height: 22px;
          transform: translateX(-50%) rotate(-3deg);
          background: rgba(239, 220, 207, 0.82);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        .reel-polaroid img {
          width: 100%;
          display: block;
          object-fit: cover;
        }
        .reel-polaroid .cap {
          font-family: var(--font-hand);
          font-size: 1.15rem;
          color: var(--ink);
          text-align: center;
          margin-top: 10px;
          line-height: 1.2;
        }

        /* Double Door Gate / Sampul */
        .gate-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50.4%;
          background: radial-gradient(ellipse at 50% 40%, #2A2019, var(--film-black) 75%);
          transition: transform 1.4s cubic-bezier(.77, 0, .18, 1);
          z-index: 1;
        }
        .gate-door::before,
        .gate-door::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(212, 175, 106, 0.45);
          top: 16px;
          bottom: 16px;
        }
        .gate-door::after {
          top: 26px;
          bottom: 26px;
          border-color: rgba(212, 175, 106, 0.2);
        }
        .door-left {
          left: 0;
        }
        .door-left::before { left: 16px; right: 8px; }
        .door-left::after { left: 26px; right: 18px; }
        .door-right {
          right: 0;
        }
        .door-right::before { left: 8px; right: 16px; }
        .door-right::after { left: 18px; right: 26px; }

        .gate-open .door-left {
          transform: translateX(-101%);
        }
        .gate-open .door-right {
          transform: translateX(101%);
        }

        /* Filmstrip Navigation Bar */
        #filmstrip-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 70;
          background: rgba(23, 19, 16, 0.94);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(243, 234, 217, 0.18);
        }
        #filmstrip-nav::before,
        #filmstrip-nav::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 8px;
          background-image: radial-gradient(circle, rgba(243, 234, 217, 0.4) 2px, transparent 2.4px);
          background-size: 16px 8px;
          background-repeat: repeat-x;
          pointer-events: none;
        }
        #filmstrip-nav::before { top: 0; }
        #filmstrip-nav::after { bottom: 0; }

        .film-thumb {
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(243, 234, 217, 0.28);
          overflow: hidden;
          transition: transform .35s cubic-bezier(.34, 1.56, .64, 1), width .35s ease, height .35s ease, border-color .3s ease;
        }
        .film-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(85%) brightness(0.72);
          transition: filter .35s ease;
        }
        .film-thumb .fno {
          position: absolute;
          bottom: 1px;
          right: 3px;
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--sepia);
          font-weight: 700;
        }
        .film-thumb.active {
          width: 58px;
          height: 58px;
          transform: translateY(-6px);
          border-color: var(--sepia);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45);
        }
        .film-thumb.active img {
          filter: grayscale(0%) brightness(1);
        }

        /* Cinema Admission Ticket Card */
        .cinema-ticket {
          border: 1px solid rgba(212, 175, 106, 0.45);
          background: linear-gradient(160deg, rgba(212, 175, 106, 0.08), rgba(243, 234, 217, 0.03));
          position: relative;
        }
        .ticket-half + .ticket-half::before,
        .ticket-half + .ticket-half::after {
          content: "";
          position: absolute;
          top: -10px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--film-black);
          border: 1px solid rgba(212, 175, 106, 0.45);
        }
        .ticket-half + .ticket-half::before { left: -11px; }
        .ticket-half + .ticket-half::after { right: -11px; }
        .cinema-ticket-barcode {
          height: 26px;
          background: repeating-linear-gradient(90deg, rgba(243, 234, 217, 0.6) 0 2px, transparent 2px 5px, rgba(243, 234, 217, 0.6) 5px 6px, transparent 6px 10px);
        }

        /* Reel Flip Counter */
        .reel-digit .face {
          border: 1px solid var(--gold);
          background: linear-gradient(#F9F1E2, var(--paper));
          box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.12);
        }
        .reel-digit.flip .face {
          animation: flipTick .3s ease;
        }
        @keyframes flipTick {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); opacity: .5; }
          100% { transform: rotateX(0deg); }
        }

        /* Classical Envelope with Heart Seal */
        .hadiah-envelope {
          border: 1px solid var(--gold-deep);
          padding: 74px 24px 28px;
          background: linear-gradient(#FBF4E8, var(--paper));
          box-shadow: 0 14px 30px rgba(33, 27, 20, 0.12);
          position: relative;
        }
        .hadiah-envelope::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 58px;
          background: linear-gradient(to bottom right, transparent 48.6%, var(--gold-deep) 49.4% 50.6%, transparent 51.4%) left/50% 100% no-repeat,
                      linear-gradient(to bottom left, transparent 48.6%, var(--gold-deep) 49.4% 50.6%, transparent 51.4%) right/50% 100% no-repeat;
        }
        .hadiah-envelope::after {
          content: "♥";
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 35% 30%, #A24E44, var(--wine));
          color: #E9C98A;
          font-size: .95rem;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }

        /* Corkboard Note Cards with Pushpins */
        .note-card {
          position: relative;
          background: var(--paper);
          color: var(--ink);
          width: 172px;
          padding: 14px 14px 10px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
        }
        .note-card::before {
          content: "";
          position: absolute;
          top: -6px;
          left: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle at 35% 30%, #D96B5E, #8E3028);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        /* Perforated Quote Ticket */
        .ticket-card {
          background: var(--paper);
          border: 1px dashed var(--wine);
          padding: 34px 24px;
          position: relative;
        }
        .ticket-card::before,
        .ticket-card::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--paper-dim);
          transform: translateY(-50%);
        }
        .ticket-card::before { left: -10px; }
        .ticket-card::after { right: -10px; }

        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .anim-spin-music {
          animation: vinylSpin 7s linear infinite;
        }
      `}</style>

      {/* ============================================================
          TOP DEMO CONTROL BAR (Sticky Navigation for Sekarsiti)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#171310]/90 backdrop-blur-md border-b border-[#D4AF6A]/25 text-[#F3EAD9] px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-[#D4AF6A] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sekarsiti</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[#F3EAD9]/85">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99A4B] animate-pulse" />
          <span className="font-['DM_Serif_Display',serif] text-sm text-[#F3EAD9] tracking-wide">
            Seri Reel Sinematik · Larasati &amp; Fajar
          </span>
        </div>

        <button
          onClick={onOrderViaWhatsApp}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#7B3B34] hover:bg-[#5C2B25] text-white font-semibold rounded-full shadow-md transition-all active:scale-95 cursor-pointer font-['Karla',sans-serif]"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain Ini</span>
        </button>
      </header>

      {/* ============================================================
          FLOATING AUDIO PLAYER (VINYL FILM REEL BADGE)
          ============================================================ */}
      <div className="fixed bottom-[94px] right-4 z-40 flex items-center gap-3">
        {showAudioToast && (
          <div className="hidden sm:flex items-center gap-2 py-1.5 px-3.5 bg-[#171310]/95 backdrop-blur-md border border-[#D4AF6A]/30 text-[#F3EAD9] rounded-full text-xs shadow-xl animate-fade-in font-['Courier_Prime',monospace]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99A4B] animate-pulse" />
            <span>{isPlayingAudio ? 'Soundtrack: Golden Hour Nostalgia' : 'Audio Dijeda'}</span>
          </div>
        )}

        <button
          onClick={toggleAudio}
          className={`w-11 h-11 rounded-full border border-[#D4AF6A] flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
            isPlayingAudio 
              ? 'bg-[#171310] text-[#D4AF6A] ring-4 ring-[#C99A4B]/25' 
              : 'bg-[#171310]/80 text-[#F3EAD9]/60 hover:text-white'
          }`}
          title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
          aria-label="Kontrol musik latar"
        >
          {isPlayingAudio ? (
            <Volume2 className="w-4 h-4 text-[#D4AF6A] anim-spin-music" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* ============================================================
          GERBANG SAMPUL SINEMATIK DUA PINTU (DOUBLE DOOR COVER)
          Terkunci saat awal, pintu terbuka saat ditekan
          ============================================================ */}
      {!isGateDone && (
        <div 
          id="gate" 
          className={`fixed inset-0 z-50 flex items-center justify-center text-center text-[#F3EAD9] ${isGateOpen ? 'gate-open' : ''}`}
          role="dialog" 
          aria-label="Sampul Undangan Sinematik"
        >
          <div className="gate-door door-left" />
          <div className="gate-door door-right" />
          
          <div className={`relative z-10 max-w-md px-8 transition-all duration-700 ${isGateOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <span className="reel-kicker text-[#D4AF6A]">Undangan Pernikahan</span>
            
            <h1 className="gate-names gold-text font-serif italic text-3xl sm:text-4xl my-6 leading-tight">
              <span>Fajar Ramadhan Putra</span>
              <span className="block font-['Pinyon_Script',cursive] not-italic text-5xl my-1 text-[#D4AF6A]">&amp;</span>
              <span>Larasati Ayu Ningtyas</span>
            </h1>

            <div className="my-6 py-3 px-4 border-y border-[#D4AF6A]/30">
              <p className="text-xs uppercase tracking-widest text-[#F3EAD9]/80 font-['Courier_Prime',monospace]">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <strong className="block text-xl font-serif text-[#F3EAD9] mt-1 font-normal">
                {guestRecipient}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleOpenGate}
              className="mt-4 px-8 py-3.5 border border-[#D4AF6A] rounded-full text-[#D4AF6A] hover:bg-[#D4AF6A] hover:text-[#171310] font-['Courier_Prime',monospace] text-xs uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer active:scale-95"
            >
              Buka Lembaran Film Undangan ▶
            </button>
            
            <p className="text-[11px] text-[#D4AF6A]/70 italic mt-4 font-['Courier_Prime',monospace]">
              Sentuh tombol untuk membuka pintu rol kenangan
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          MAIN BODY SECTIONS
          ============================================================ */}
      <main className="pt-12">

        {/* ============ SECTION 1 (STATIS): HERO KOLASE 16 TILES ============ */}
        <section 
          id="s-hero" 
          className="min-h-[100svh] relative overflow-hidden flex items-center justify-center bg-[#171310] text-[#F3EAD9]"
          aria-label="Pembuka"
        >
          {/* 16-Tile Analog Photo Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-45 pointer-events-none" aria-hidden="true">
            {HERO_TILES.map((t, idx) => (
              <div key={idx} className={`w-full h-full overflow-hidden ${idx % 2 === 1 ? 'scale-[1.03]' : ''}`}>
                <img 
                  src={t} 
                  alt="" 
                  className="w-full h-full object-cover grayscale-[45%] sepia-[20%] contrast-[1.05]"
                />
              </div>
            ))}
          </div>

          {/* Golden hairline frame & Radial Vignette */}
          <div className="absolute inset-4 border border-[#D4AF6A]/45 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-[#171310]/40 via-[#171310]/80 to-[#171310] z-1 pointer-events-none" />

          {/* Hero Content */}
          <div className="reel-section-inner text-center relative z-20 reel-reveal">
            <span className="reel-kicker text-[#C99A4B]">Reel Kenangan · Roll #01</span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic my-4 leading-tight gold-text font-normal">
              Sebuah Cerita<br />yang Diputar Ulang
            </h1>
            
            <p className="font-['Caveat',cursive] text-2xl text-[#F3EAD9]/90 mt-2">
              setiap bingkai, setiap detik bersama kalian
            </p>

            <button 
              onClick={() => handleScrollToSection('s-profil')}
              className="mt-8 w-16 h-16 rounded-full border border-[#C99A4B] text-[#C99A4B] hover:bg-[#C99A4B] hover:text-[#171310] flex items-center justify-center text-xl transition-all duration-300 mx-auto cursor-pointer shadow-lg hover:scale-105"
              aria-label="Mulai memutar reel undangan"
            >
              ▶
            </button>
          </div>
        </section>

        {/* ============ SECTION 2 (DINAMIS): PROFIL PASANGAN ============ */}
        <section id="s-profil" className="bg-[#F3EAD9] text-center" aria-label="Profil pasangan">
          <div className="reel-section-inner reel-reveal">
            <span className="reel-kicker">Frame Pertama</span>
            
            {/* Main Polaroid Photo */}
            <div className="reel-polaroid w-[min(76vw,320px)] mx-auto mt-6 -rotate-2">
              <img 
                src="/src/assets/images/film_vintage_couple_1791034007642.jpg" 
                alt="Foto pasangan mempelai Fajar &amp; Larasati" 
                className="aspect-4/5"
              />
              <p className="cap">— selamanya, mulai hari ini —</p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif italic mt-8 text-[#211B14] font-normal leading-tight">
              <span>Fajar Ramadhan Putra</span>
              <span className="block font-['Pinyon_Script',cursive] not-italic text-5xl sm:text-6xl text-[#A9782F] my-1">
                &amp;
              </span>
              <span>Larasati Ayu Ningtyas</span>
            </h2>

            <p className="reel-kicker text-[#7B3B34] mt-4 tracking-widest">
              Menulis babak baru bersama
            </p>
          </div>
        </section>

        {/* ============ SECTION 3 (STATIS): TIKET SISIPAN I ============ */}
        <section id="s-sisipan-1" className="bg-[#E8DDC5] text-center" aria-label="Sisipan naskah pertama">
          <div className="reel-section-inner reel-reveal py-16">
            <div className="ticket-card max-w-md mx-auto shadow-sm">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#211B14] leading-relaxed">
                &ldquo;Kisah terbaik selalu punya adegan sederhana yang paling dikenang.&rdquo;
              </blockquote>
              <cite className="block mt-4 font-['Courier_Prime',monospace] text-[10px] tracking-widest uppercase text-[#7B3B34] not-italic">
                potongan naskah — babak awal
              </cite>
            </div>
          </div>
        </section>

        {/* ============ SECTION 4 (DINAMIS): MEMPELAI & KELUARGA ============ */}
        <section id="s-mempelai" className="bg-gradient-to-b from-[#F3EAD9] to-[#F6E6DA]" aria-label="Profil mempelai">
          <div className="reel-section-inner">
            <div className="text-center reel-reveal">
              <span className="reel-kicker">Mempelai Berbahagia</span>
              <h2 className="text-3xl font-serif italic mt-2 text-[#211B14]">
                Dua Insan yang Berpadu
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-10 mt-10">
              
              {/* Mempelai Pria */}
              <div className="text-center reel-reveal max-w-xs">
                <div className="reel-polaroid w-[220px] mx-auto -rotate-3">
                  <img 
                    src="/src/assets/images/editorial_groom_portrait_1790915490996.jpg" 
                    alt="Foto mempelai pria Fajar Ramadhan Putra" 
                    className="aspect-3/4"
                  />
                  <p className="cap">Fajar · The Groom</p>
                </div>
                <span className="block font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#7B3B34] mt-5">
                  Mempelai Pria
                </span>
                <h3 className="text-2xl font-serif text-[#211B14] mt-1 font-medium">
                  Fajar Ramadhan Putra, S.T.
                </h3>
                <p className="text-xs text-[#5A5343] mt-2 leading-relaxed">
                  Putra dari <strong>Bapak Bambang Ramadhan</strong> &amp; <strong>Ibu Sulastri</strong>
                  <br />
                  <span className="italic opacity-80">Bandung, Jawa Barat</span>
                </p>
                <div className="mt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#7B3B34] hover:text-[#211B14] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@fajarputra</span>
                  </a>
                </div>
              </div>

              {/* Mempelai Wanita */}
              <div className="text-center reel-reveal max-w-xs">
                <div className="reel-polaroid w-[220px] mx-auto rotate-3">
                  <img 
                    src="/src/assets/images/wedding_bride_veil_1790901501919.jpg" 
                    alt="Foto mempelai wanita Larasati Ayu Ningtyas" 
                    className="aspect-3/4"
                  />
                  <p className="cap">Larasati · The Bride</p>
                </div>
                <span className="block font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#7B3B34] mt-5">
                  Mempelai Wanita
                </span>
                <h3 className="text-2xl font-serif text-[#211B14] mt-1 font-medium">
                  Larasati Ayu Ningtyas, S.Ds.
                </h3>
                <p className="text-xs text-[#5A5343] mt-2 leading-relaxed">
                  Putri dari <strong>Bapak Wahyu Ningtyas</strong> &amp; <strong>Ibu Endah Kusuma</strong>
                  <br />
                  <span className="italic opacity-80">Kota Bandung</span>
                </p>
                <div className="mt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#7B3B34] hover:text-[#211B14] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@larasatiayu</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============ SECTION TAMBAHAN: STORYBOARD ADEGAN PERJALANAN CINTA ============ */}
        <section id="s-story" className="bg-[#EFE5D2] py-16" aria-label="Storyboard adegan cinta">
          <div className="reel-section-inner">
            <div className="text-center reel-reveal mb-10">
              <span className="reel-kicker">Storyboard Naskah</span>
              <h2 className="text-3xl font-serif italic mt-2 text-[#211B14]">
                Tiga Babak Adegan Kami
              </h2>
            </div>

            <div className="space-y-6">
              {/* Scene 01 */}
              <div className="p-5 bg-[#FAF4E8] border border-[#D4AF6A]/60 rounded-xs shadow-xs reel-reveal">
                <div className="flex items-center justify-between border-b border-[#D4AF6A]/30 pb-2 mb-3">
                  <span className="font-['Courier_Prime',monospace] text-xs font-bold text-[#7B3B34]">SCENE 01 · 2020</span>
                  <span className="text-xs font-['Caveat',cursive] text-[#211B14] text-base">Toko Buku Tua di Dago</span>
                </div>
                <h4 className="font-serif text-lg text-[#211B14] mb-1 font-medium">Pertemuan yang Tak Terencana</h4>
                <p className="text-xs sm:text-sm text-[#5A5343] leading-relaxed">
                  Dua orang asing berebut naskah sastra klasik yang sama di rak pojok. Sebuah tawa canggung menjadi obrolan hangat berjam-jam di kedai kopi seberang jalan.
                </p>
              </div>

              {/* Scene 02 */}
              <div className="p-5 bg-[#FAF4E8] border border-[#D4AF6A]/60 rounded-xs shadow-xs reel-reveal">
                <div className="flex items-center justify-between border-b border-[#D4AF6A]/30 pb-2 mb-3">
                  <span className="font-['Courier_Prime',monospace] text-xs font-bold text-[#7B3B34]">SCENE 02 · 2023</span>
                  <span className="text-xs font-['Caveat',cursive] text-[#211B14] text-base">Kamera Analog Pertama</span>
                </div>
                <h4 className="font-serif text-lg text-[#211B14] mb-1 font-medium">Menyimpan Setiap Momen dalam Film</h4>
                <p className="text-xs sm:text-sm text-[#5A5343] leading-relaxed">
                  Kami mulai mengoleksi gulungan film 35mm. Dari senja di bukit hingga langkah kaki di Braga, setiap detik terasa terlalu berharga untuk dilewatkan tanpa terekam.
                </p>
              </div>

              {/* Scene 03 */}
              <div className="p-5 bg-[#FAF4E8] border border-[#D4AF6A]/60 rounded-xs shadow-xs reel-reveal">
                <div className="flex items-center justify-between border-b border-[#D4AF6A]/30 pb-2 mb-3">
                  <span className="font-['Courier_Prime',monospace] text-xs font-bold text-[#7B3B34]">SCENE 03 · 2026</span>
                  <span className="text-xs font-['Caveat',cursive] text-[#211B14] text-base">Janji Seumur Hidup</span>
                </div>
                <h4 className="font-serif text-lg text-[#211B14] mb-1 font-medium">Lamaran &amp; Menuju Hari Bahagia</h4>
                <p className="text-xs sm:text-sm text-[#5A5343] leading-relaxed">
                  Di hadapan orang tua dan keluarga terdekat, sebuah cincin disematkan. Babak baru resmi dimulai untuk kita nikmati bersama sampai rambut memutih.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 5 (DINAMIS): WAKTU & TEMPAT (TIKET BIOSKOP + FLIP COUNTER) ============ */}
        <section id="s-waktu" className="bg-[#171310] text-[#F3EAD9] py-20" aria-label="Waktu dan tempat acara">
          <div className="reel-section-inner">
            
            <div className="text-center reel-reveal">
              <span className="reel-kicker text-[#C99A4B]">Jadwal Tayang Acara</span>
              <h2 className="text-3xl sm:text-4xl font-serif italic mt-2 text-[#F3EAD9] font-normal">
                Akad &amp; Resepsi
              </h2>
            </div>

            {/* Cinema Ticket Card */}
            <div className="cinema-ticket max-w-md mx-auto mt-8 shadow-xl reel-reveal">
              <div className="ticket-half p-6">
                <span className="font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#C99A4B]">
                  ADMIT ONE · AKAD NIKAH
                </span>
                <p className="text-2xl font-serif italic text-[#F3EAD9] mt-2">
                  Sabtu, 9 Oktober 2027
                </p>
                <p className="text-sm font-['Courier_Prime',monospace] text-[#DFC084] mt-1">
                  Pukul 08.00 – 09.30 WIB
                </p>
              </div>

              <div className="ticket-half p-6">
                <span className="font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#C99A4B]">
                  ADMIT ONE · RESEPSI PERNIKAHAN
                </span>
                <p className="text-2xl font-serif italic text-[#F3EAD9] mt-2">
                  Sabtu, 9 Oktober 2027
                </p>
                <p className="text-sm font-['Courier_Prime',monospace] text-[#DFC084] mt-1">
                  Pukul 10.00 – 13.00 WIB
                </p>
              </div>

              <div className="cinema-ticket-barcode mx-6 mb-4" />
            </div>

            {/* Location & Map Links */}
            <div className="text-center mt-8 reel-reveal space-y-4">
              <div>
                <span className="font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#C99A4B] block mb-1">
                  LOKASI UTAMA
                </span>
                <p className="text-base text-[#F3EAD9] font-serif">
                  Hotel Aryaduta Ballroom, Lantai 3
                </p>
                <p className="text-xs text-[#F3EAD9]/80 mt-1 max-w-sm mx-auto">
                  Jl. Sumatera No. 51, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a 
                  href="https://maps.google.com/?q=Hotel+Aryaduta+Bandung" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C99A4B] hover:bg-[#DFC084] text-[#171310] font-['Courier_Prime',monospace] text-xs uppercase font-bold rounded-xs transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka di Google Maps</span>
                </a>

                <a 
                  href={googleCalendarUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#211B14] border border-[#D4AF6A] hover:bg-[#2A2019] text-[#D4AF6A] font-['Courier_Prime',monospace] text-xs uppercase font-bold rounded-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Simpan ke Kalender</span>
                </a>
              </div>
            </div>

            {/* Film Reel Flip Counter */}
            <div className="reel-counter flex justify-center gap-3 sm:gap-4 mt-12 reel-reveal" id="countdown">
              <div className={`reel-digit text-center ${flippedUnit === 'd' ? 'flip' : ''}`}>
                <div className="face w-14 sm:w-16 h-16 sm:h-18 flex items-center justify-center font-['Courier_Prime',monospace] font-bold text-2xl sm:text-3xl text-[#211B14] rounded-xs">
                  {countdown.d}
                </div>
                <div className="lbl font-['Courier_Prime',monospace] text-[9px] uppercase tracking-wider text-[#C99A4B] mt-2">
                  Hari
                </div>
              </div>

              <div className={`reel-digit text-center ${flippedUnit === 'h' ? 'flip' : ''}`}>
                <div className="face w-14 sm:w-16 h-16 sm:h-18 flex items-center justify-center font-['Courier_Prime',monospace] font-bold text-2xl sm:text-3xl text-[#211B14] rounded-xs">
                  {countdown.h}
                </div>
                <div className="lbl font-['Courier_Prime',monospace] text-[9px] uppercase tracking-wider text-[#C99A4B] mt-2">
                  Jam
                </div>
              </div>

              <div className={`reel-digit text-center ${flippedUnit === 'm' ? 'flip' : ''}`}>
                <div className="face w-14 sm:w-16 h-16 sm:h-18 flex items-center justify-center font-['Courier_Prime',monospace] font-bold text-2xl sm:text-3xl text-[#211B14] rounded-xs">
                  {countdown.m}
                </div>
                <div className="lbl font-['Courier_Prime',monospace] text-[9px] uppercase tracking-wider text-[#C99A4B] mt-2">
                  Menit
                </div>
              </div>

              <div className={`reel-digit text-center ${flippedUnit === 's' ? 'flip' : ''}`}>
                <div className="face w-14 sm:w-16 h-16 sm:h-18 flex items-center justify-center font-['Courier_Prime',monospace] font-bold text-2xl sm:text-3xl text-[#211B14] rounded-xs">
                  {countdown.s}
                </div>
                <div className="lbl font-['Courier_Prime',monospace] text-[9px] uppercase tracking-wider text-[#C99A4B] mt-2">
                  Detik
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============ SECTION 6 (DINAMIS): GALERI POLAROID SCATTERED (8 FOTO) ============ */}
        <section id="s-galeri" className="bg-[#E8DDC5] py-20" aria-label="Galeri foto">
          <div className="max-w-4xl mx-auto px-6 text-center reel-reveal mb-12">
            <span className="reel-kicker">Contact Sheet Roll #01</span>
            <h2 className="text-3xl sm:text-4xl font-serif italic mt-2 text-[#211B14]">
              Jejak yang Terekam
            </h2>
            <p className="text-xs text-[#5A5343] font-['Courier_Prime',monospace] mt-2">
              Sentuh foto polaroid untuk membuka lensa resolusi penuh
            </p>
          </div>

          {/* Scattered Polaroid Grid */}
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryPolaroids.map((p, idx) => {
              const rotations = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-4', 'rotate-1', '-rotate-1', 'rotate-4'];
              const rot = rotations[idx % rotations.length];
              return (
                <div 
                  key={idx} 
                  onClick={() => setLightboxIdx(idx)}
                  className={`reel-polaroid ${rot} hover:rotate-0 hover:scale-105 cursor-pointer reel-reveal transition-all`}
                >
                  <img src={p.src} alt={p.alt} className="aspect-3/4 object-cover" />
                  <p className="cap">{p.cap}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ SECTION 7 (STATIS): TIKET SISIPAN II ============ */}
        <section id="s-sisipan-2" className="bg-[#E8DDC5] text-center" aria-label="Sisipan naskah kedua">
          <div className="reel-section-inner reel-reveal py-16">
            <div className="ticket-card max-w-md mx-auto shadow-sm">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#211B14] leading-relaxed">
                &ldquo;Doa yang dititipkan hari ini akan terus terputar sepanjang cerita kami.&rdquo;
              </blockquote>
              <cite className="block mt-4 font-['Courier_Prime',monospace] text-[10px] tracking-widest uppercase text-[#7B3B34] not-italic">
                potongan naskah — perihal restu
              </cite>
            </div>
          </div>
        </section>

        {/* ============ SECTION TAMBAHAN: DRESSCODE / WARDROBE & COLOR GRADING ============ */}
        <section id="s-dresscode" className="bg-[#171310] text-[#F3EAD9] py-18" aria-label="Panduan busana">
          <div className="reel-section-inner text-center">
            <div className="reel-reveal">
              <span className="reel-kicker text-[#C99A4B]">Color Grading &amp; Wardrobe</span>
              <h2 className="text-3xl font-serif italic mt-2 text-[#F3EAD9]">
                Ketentuan Busana Tamu
              </h2>
              <p className="text-xs sm:text-sm text-[#F3EAD9]/80 mt-3 max-w-md mx-auto leading-relaxed">
                Kami mengundang Bapak/Ibu/Saudara/i untuk mengenakan pakaian bernuansa hangat vintage agar setiap potret bersama terasa selaras:
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 reel-reveal">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF6A] bg-[#C99A4B] shadow-md" />
                <span className="text-xs font-['Courier_Prime',monospace] text-[#C99A4B]">Sepia Gold</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF6A] bg-[#7B3B34] shadow-md" />
                <span className="text-xs font-['Courier_Prime',monospace] text-[#DFC084]">Wine Deep</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF6A] bg-[#171310] shadow-md" />
                <span className="text-xs font-['Courier_Prime',monospace] text-[#DFC084]">Film Black</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF6A] bg-[#F3EAD9] shadow-md" />
                <span className="text-xs font-['Courier_Prime',monospace] text-[#DFC084]">Paper Ivory</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 8 (DINAMIS): TANDA KASIH (AMPLOP DIGITAL) ============ */}
        <section id="s-hadiah" className="bg-[#F3EAD9] py-20 text-center" aria-label="Informasi hadiah">
          <div className="reel-section-inner reel-reveal">
            <span className="reel-kicker">Tanda Kasih</span>
            <h2 className="text-3xl font-serif italic mt-2 text-[#211B14]">
              Kado &amp; Amplop Digital
            </h2>

            {/* Classical Folded Envelope with Heart */}
            <div className="hadiah-envelope max-w-sm mx-auto mt-8 text-center">
              <span className="font-['Courier_Prime',monospace] text-[10px] uppercase tracking-widest text-[#7B3B34]">
                CARA MEMBERI KADO DIGITAL
              </span>
              
              <p className="text-sm text-[#5A5343] mt-4 leading-relaxed font-serif">
                Kehadiran dan doa restu Anda adalah karunia yang paling bernilai bagi kami. Namun jika hendak menitipkan tanda kasih, kami menyediakannya melalui saluran rekening berikut:
              </p>

              {/* Bank BRI */}
              <div className="mt-6 p-4 bg-white/80 border border-[#D4AF6A] rounded-xs text-left">
                <div className="flex items-center justify-between">
                  <span className="font-['Courier_Prime',monospace] font-bold text-sm text-[#211B14]">Bank BRI</span>
                  <span className="text-xs text-[#7B3B34] font-medium font-serif italic">Rekening Utama</span>
                </div>
                <p className="font-['Courier_Prime',monospace] text-base font-bold text-[#171310] mt-1 tracking-wider">
                  0011 2233 4455
                </p>
                <p className="text-xs text-[#5A5343]">a.n. Larasati Ayu Ningtyas</p>
                
                <button
                  type="button"
                  onClick={() => handleCopy('001122334455', 'bri')}
                  className="mt-3 w-full py-2 bg-[#7B3B34] hover:bg-[#5C2B25] text-white text-xs font-['Courier_Prime',monospace] uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied('bri') ? <Check className="w-3.5 h-3.5 text-[#DFC084]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied('bri') ? 'Nomor Tersalin!' : 'Salin Nomor BRI'}</span>
                </button>
              </div>

              {/* Bank BCA */}
              <div className="mt-4 p-4 bg-white/80 border border-[#D4AF6A] rounded-xs text-left">
                <div className="flex items-center justify-between">
                  <span className="font-['Courier_Prime',monospace] font-bold text-sm text-[#211B14]">Bank BCA</span>
                  <span className="text-xs text-[#7B3B34] font-medium font-serif italic">Rekening Mempelai</span>
                </div>
                <p className="font-['Courier_Prime',monospace] text-base font-bold text-[#171310] mt-1 tracking-wider">
                  8820 9182 34
                </p>
                <p className="text-xs text-[#5A5343]">a.n. Fajar Ramadhan Putra</p>
                
                <button
                  type="button"
                  onClick={() => handleCopy('8820918234', 'bca')}
                  className="mt-3 w-full py-2 bg-[#211B14] hover:bg-black text-[#F3EAD9] text-xs font-['Courier_Prime',monospace] uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied('bca') ? <Check className="w-3.5 h-3.5 text-[#DFC084]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied('bca') ? 'Nomor Tersalin!' : 'Salin Nomor BCA'}</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ============ SECTION TAMBAHAN: RESERVASI & RSVP (CINEMA TICKET RESERVATION) ============ */}
        <section id="s-rsvp" className="bg-[#FAF4E8] py-20 border-t border-[#D4AF6A]/30" aria-label="Konfirmasi Kehadiran">
          <div className="reel-section-inner">
            <div className="text-center reel-reveal">
              <span className="reel-kicker">Konfirmasi Kursi</span>
              <h2 className="text-3xl font-serif italic mt-2 text-[#211B14]">
                Reservasi Kehadiran Tamu
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5343] mt-2 max-w-sm mx-auto">
                Mohon berkenan mengisi reservasi agar tim penata acara dapat menyiapkan tempat duduk ternyaman bagi Anda.
              </p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto mt-8 space-y-4 reel-reveal">
              <div>
                <label className="block text-xs font-['Courier_Prime',monospace] uppercase tracking-wider text-[#7B3B34] mb-1">
                  Nama Tamu / Rombongan
                </label>
                <input 
                  type="text" 
                  value={rsvpName} 
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Contoh: Budi Santoso &amp; Istri"
                  className="w-full px-4 py-2.5 bg-white border border-[#D4AF6A] rounded-xs text-sm text-[#211B14] outline-none focus:border-[#7B3B34]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-['Courier_Prime',monospace] uppercase tracking-wider text-[#7B3B34] mb-1">
                  Konfirmasi Kehadiran
                </label>
                <select 
                  value={rsvpAttendance} 
                  onChange={(e) => setRsvpAttendance(e.target.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                  className="w-full px-4 py-2.5 bg-white border border-[#D4AF6A] rounded-xs text-sm text-[#211B14] outline-none focus:border-[#7B3B34]"
                >
                  <option value="hadir">Pasti Hadir Memenuhi Undangan</option>
                  <option value="tidak_hadir">Berhalangan Hadir (Doa dari Jauh)</option>
                  <option value="ragu">Masih Menyesuaikan Jadwal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-['Courier_Prime',monospace] uppercase tracking-wider text-[#7B3B34] mb-1">
                  Jumlah Tamu
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="5"
                  value={rsvpCount} 
                  onChange={(e) => setRsvpCount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#D4AF6A] rounded-xs text-sm text-[#211B14] outline-none focus:border-[#7B3B34]"
                />
              </div>

              <div>
                <label className="block text-xs font-['Courier_Prime',monospace] uppercase tracking-wider text-[#7B3B34] mb-1">
                  Catatan / Harapan Khusus (Opsional)
                </label>
                <textarea 
                  rows={2}
                  value={rsvpNote} 
                  onChange={(e) => setRsvpNote(e.target.value)}
                  placeholder="Kebutuhan tempat duduk lansia / doa singkat..."
                  className="w-full px-4 py-2.5 bg-white border border-[#D4AF6A] rounded-xs text-sm text-[#211B14] outline-none focus:border-[#7B3B34]"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpSubmitted}
                className="w-full py-3 bg-[#7B3B34] hover:bg-[#5C2B25] text-white text-xs font-['Courier_Prime',monospace] uppercase tracking-widest rounded-xs transition-colors cursor-pointer shadow-md font-bold"
              >
                {rsvpSubmitted ? '✓ Reservasi Anda Telah Tercatat!' : 'Kirim Reservasi Tempat Duduk'}
              </button>
            </form>
          </div>
        </section>

        {/* ============ SECTION 9 (DINAMIS): GUESTBOOK CORKBOARD ============ */}
        <section id="s-ucapan" className="bg-[#171310] text-[#F3EAD9] py-20" aria-label="Ucapan dan doa">
          <div className="reel-section-inner">
            <div className="text-center reel-reveal">
              <span className="reel-kicker text-[#C99A4B]">Papan Catatan Gabus</span>
              <h2 className="text-3xl sm:text-4xl font-serif italic mt-2 text-[#F3EAD9] font-normal">
                Ucapan &amp; Doa Restu
              </h2>
            </div>

            {/* Pinned Note Cards */}
            <div className="flex flex-wrap gap-5 justify-center max-w-lg mx-auto my-10 max-h-[420px] overflow-y-auto p-2 reel-reveal">
              {wishes.map((w, idx) => (
                <article 
                  key={idx} 
                  className="note-card transition-transform duration-300 hover:rotate-0 hover:scale-105"
                  style={{ transform: `rotate(${w.rotate}deg)` }}
                >
                  <span className="block font-['Caveat',cursive] text-lg text-[#7B3B34] leading-tight">
                    {w.name}
                  </span>
                  <p className="text-xs text-[#211B14] mt-1.5 leading-relaxed">
                    {w.message}
                  </p>
                </article>
              ))}
            </div>

            {/* Wish Submission Form */}
            <form onSubmit={handleAddWish} className="max-w-md mx-auto space-y-3 reel-reveal">
              <input 
                type="text" 
                placeholder="Nama Anda" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#F3EAD9]/35 text-[#F3EAD9] text-sm py-2 px-1 outline-none focus:border-[#C99A4B] placeholder-[#F3EAD9]/40"
              />
              <textarea 
                rows={3} 
                placeholder="Tulis ucapan & doa restu untuk kedua mempelai..." 
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#F3EAD9]/35 text-[#F3EAD9] text-sm py-2 px-1 outline-none focus:border-[#C99A4B] placeholder-[#F3EAD9]/40 resize-none"
              />
              <div className="text-center pt-2">
                <button 
                  type="submit" 
                  className="px-8 py-2.5 bg-[#C99A4B] hover:bg-[#DFC084] text-[#171310] font-['Courier_Prime',monospace] text-xs uppercase font-bold tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  Tempel Catatan Ucapan 📌
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ============ SECTION 10 (STATIS): PENUTUP (TAMAT) ============ */}
        <section 
          id="s-penutup" 
          className="min-h-[64svh] flex items-center justify-center relative overflow-hidden text-center text-[#F3EAD9] bg-[#171310]"
          aria-label="Penutup"
        >
          {/* Black Letterbox Bars Top and Bottom */}
          <div className="absolute top-0 left-0 right-0 h-[10%] bg-black z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-black z-10 pointer-events-none" />

          <img 
            src="/src/assets/images/art_deco_emerald_couple_1790840336340.jpg" 
            alt="Penutup rol film" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
          />

          <div className="relative z-20 px-6 py-12 reel-reveal">
            <h2 className="text-4xl sm:text-5xl font-serif italic tracking-widest gold-text font-normal">
              TAMAT
            </h2>
            <p className="font-['Caveat',cursive] text-2xl text-[#C99A4B] mt-4">
              terima kasih telah menonton hingga usai
            </p>
            <p className="font-['Courier_Prime',monospace] text-[11px] text-[#F3EAD9]/70 uppercase tracking-widest mt-6">
              Pemeran Utama: Fajar &amp; Larasati · Disutradarai oleh Cinta · Bandung, 2027
            </p>
          </div>
        </section>

      </main>

      {/* ============================================================
          FIXED BOTTOM FILMSTRIP NAVIGATION (ANALOG SPROCKET REEL)
          ============================================================ */}
      <nav id="filmstrip-nav" aria-label="Navigasi bagian film undangan">
        <span className="absolute -top-6 left-4 font-['Courier_Prime',monospace] text-[9px] uppercase tracking-wider text-[#F3EAD9] bg-[#171310]/90 px-2 py-0.5 border border-[#D4AF6A]/30">
          {String(activeSectionIdx + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')} — {CHAPTERS[activeSectionIdx].title}
        </span>

        <div 
          ref={filmstripTrackRef}
          className="flex gap-1.5 overflow-x-auto py-2.5 px-3.5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CHAPTERS.map((ch, idx) => (
            <div 
              key={ch.id} 
              onClick={() => handleScrollToSection(ch.id)}
              className={`film-thumb ${activeSectionIdx === idx ? 'active' : ''}`}
              title={ch.title}
            >
              <img src={ch.photo} alt={ch.title} />
              <span className="fno">{String(idx + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* ============================================================
          LIGHTBOX MODAL FOR POLAROIDS
          ============================================================ */}
      {lightboxIdx !== null && (
        <div 
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 bg-[#171310]/95 z-[100] flex items-center justify-center p-4 cursor-pointer"
        >
          <button 
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 px-3 py-1.5 border border-[#F3EAD9]/40 text-[#F3EAD9] font-['Courier_Prime',monospace] text-xs hover:bg-[#F3EAD9] hover:text-[#171310] transition-colors"
          >
            ✕ Tutup
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx - 1 + galleryPolaroids.length) % galleryPolaroids.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F3EAD9]/40 text-[#F3EAD9] text-xl flex items-center justify-center hover:bg-[#F3EAD9] hover:text-[#171310] transition-colors"
          >
            ‹
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % galleryPolaroids.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F3EAD9]/40 text-[#F3EAD9] text-xl flex items-center justify-center hover:bg-[#F3EAD9] hover:text-[#171310] transition-colors"
          >
            ›
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="reel-polaroid w-[min(85vw,400px)] shadow-2xl"
          >
            <img 
              src={galleryPolaroids[lightboxIdx].src} 
              alt={galleryPolaroids[lightboxIdx].alt} 
              className="max-h-[65vh] w-full object-contain"
            />
            <p className="cap text-lg mt-3">{galleryPolaroids[lightboxIdx].cap}</p>
          </div>
        </div>
      )}

    </div>
  );
};
