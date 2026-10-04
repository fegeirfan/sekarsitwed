import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle, Volume2, VolumeX, Calendar, Sparkles, Gift } from 'lucide-react';
import { ClientInvitationData } from '../types/clientInvitation';
import { 
  useCountdown, 
  useGuestRecipient, 
  useAudioController, 
  useClipboardCopy, 
  useGuestbook, 
  useRsvpForm 
} from '../hooks/useInvitationCore';

interface DamarAlyaTemplateProps {
  onBackToLanding: () => void;
  onOrderViaWhatsApp: () => void;
  customData?: ClientInvitationData;
}

// Stage sections matching the exact HTML data-stage attributes
const STAGE_CONFIG = [
  { id: 'sec-hero-couple', key: 'hero-couple', image: '/src/assets/images/wedding_couple_portrait_1790833906470.jpg', text: 'Damar & Alya, menghitung hari.' },
  { id: 'sec-opening', key: 'opening', image: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg', text: 'Tenteram dalam satu ikatan suci.' },
  { id: 'sec-couple', key: 'couple', image: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg', text: 'Damar & Alya, mempelai yang berbahagia.' },
  { id: 'sec-story', key: 'story', image: '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg', text: 'Kisah yang bermula dari kedai kopi kecil.' },
  { id: 'sec-spotlight-1', key: 'spotlight1', image: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg', text: 'Berjalan berdampingan, satu tujuan.' },
  { id: 'sec-schedule', key: 'schedule', image: '/src/assets/images/botanical_estate_venue_1790919022237.jpg', text: 'Akad dan resepsi, dua janji dalam satu hari.' },
  { id: 'sec-gallery', key: 'gallery', image: '/src/assets/images/wedding_table_botanical_1790833955186.jpg', text: 'Setiap foto membuka diri, satu per satu.' },
  { id: 'sec-spotlight-2', key: 'spotlight2', image: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg', text: 'Waktu berhenti sejenak untuk kami berdua.' },
  { id: 'sec-gift', key: 'gift', image: '/src/assets/images/editorial_venue_rings_1790838653826.jpg', text: 'Doa restu Anda adalah hadiah paling berarti.' },
  { id: 'sec-guestbook', key: 'guestbook', image: '/src/assets/images/brand_story_botanical_1790831303860.jpg', text: 'Setiap ucapan, kami simpan sebagai doa.' },
  { id: 'sec-rsvp', key: 'rsvp', image: '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg', text: 'Kehadiran Anda melengkapi hari kami.' },
  { id: 'sec-closing', key: 'closing', image: '/src/assets/images/wedding_dance_lights_1790901533590.jpg', text: 'Terima kasih telah menjadi bagian dari kisah ini.' }
];

export const DamarAlyaTemplate: React.FC<DamarAlyaTemplateProps> = ({
  onBackToLanding,
  onOrderViaWhatsApp,
  customData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceFrameRef = useRef<HTMLElement>(null);
  const coverImgRef = useRef<HTMLImageElement>(null);

  // Extract custom client values or fallbacks
  const brideName = customData?.brideName || 'Alya';
  const brideFullName = customData?.brideFullName || 'Alya Puspita Ningrum';
  const brideParents = customData?.brideParents || 'Putri dari Bapak Hendra Gunawan & Ibu Sri Wahyuni';
  const groomName = customData?.groomName || 'Damar';
  const groomFullName = customData?.groomFullName || 'Damar Aji Wibisono';
  const groomParents = customData?.groomParents || 'Putra dari Bapak Sutrisno Wibisono & Ibu Ratna Kusumawati';
  const eventDateFormatted = customData?.eventDateFormatted || 'Sabtu, 14 November 2026';
  const countdownIsoDate = customData?.countdownIsoDate || '2026-11-14T07:30:00+07:00';
  const akadTime = customData?.akadTime || '07.30 – 09.00 WIB';
  const akadVenue = customData?.akadVenue || 'Griya Kunang Estate, Jl. Kaliurang Km. 12';
  const resepsiTime = customData?.resepsiTime || '11.00 – 14.00 WIB';
  const resepsiVenue = customData?.resepsiVenue || 'Griya Kunang Estate, Jl. Kaliurang Km. 12';
  const city = customData?.city || 'Sleman, Yogyakarta';
  const mapsUrl = customData?.mapsUrl || 'https://maps.google.com';
  const bankName = customData?.bankName || 'BCA';
  const accountNumber = customData?.accountNumber || '8801234567';
  const accountHolder = customData?.accountHolder || 'Damar Aji Wibisono';
  const quoteText = customData?.quoteText || 'Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup, agar engkau merasa tenteram di sisinya.';
  const quoteSource = customData?.quoteSource || 'QS. Ar-Rum: 21';
  const songTitle = customData?.songTitle || 'Until I Found You - Acoustic Strings';

  const heroImage = customData?.mediaSlots?.heroImage || '/src/assets/images/wedding_couple_portrait_1790833906470.jpg';
  const bridePortrait = customData?.mediaSlots?.bridePortrait || '/src/assets/images/wedding_bride_portrait_1790833939171.jpg';
  const groomPortrait = customData?.mediaSlots?.groomPortrait || '/src/assets/images/editorial_groom_portrait_1790915490996.jpg';

  const galleryImages = (customData?.mediaSlots?.galleryImages && customData.mediaSlots.galleryImages.length > 0)
    ? customData.mediaSlots.galleryImages
    : [
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
        '/src/assets/images/wedding_table_botanical_1790833955186.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg',
        '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg'
      ];

  // Cover gate state: isCoverOpened controls unsealing, isCoverDismissed removes the gate
  const [isCoverOpened, setIsCoverOpened] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  // Active stage index & text
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [stageCaptionText, setStageCaptionText] = useState(`${groomName} & ${brideName}, menghitung hari.`);

  // Modular Hooks: Countdown, Guest Recipient, Audio, Clipboard, Guestbook, RSVP
  const cdRaw = useCountdown(countdownIsoDate);
  const cd = { d: cdRaw.days, h: cdRaw.hours, m: cdRaw.mins, s: cdRaw.secs };
  const { guestName, setGuestName } = useGuestRecipient('Bpk. Hendra Wijaya & Keluarga');
  const { isPlayingAudio, showAudioToast, toggleAudio, startAudio } = useAudioController(songTitle);
  const { copyText, isCopied } = useClipboardCopy(2000);

  const initialWishes = customData?.guestbookEntries && customData.guestbookEntries.length > 0
    ? customData.guestbookEntries
    : [
        {
          name: 'Salsabila Rahma',
          message: 'Selamat menempuh hidup baru, Damar & Alya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.'
        },
        {
          name: 'Dimas Prasetyo & Keluarga',
          message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Lancar dan bahagia selalu sampai kakek nenek!'
        },
        {
          name: 'dr. Farah Amanda',
          message: 'Doa terbaik untuk hari bahagia kalian berdua, langgeng penuh keberkahan.'
        }
      ];

  const {
    wishes,
    nameInput: gbName,
    setNameInput: setGbName,
    messageInput: gbMsg,
    setMessageInput: setGbMsg,
    submitWish: handleGuestbookSubmit
  } = useGuestbook(initialWishes);

  const {
    rsvpName,
    setRsvpName,
    attendance: rsvpAttendance,
    setAttendance: setRsvpAttendance,
    guestCount: rsvpCount,
    setGuestCount: setRsvpCount,
    isSuccess: showRsvpNote,
    submitRsvp: handleRsvpSubmit
  } = useRsvpForm();
  const [rsvpNote, setRsvpNote] = useState('');

  // 2. IntersectionObserver for .reveal and .wipe-item and .stage crossfade
  useEffect(() => {
    const root = deviceFrameRef.current;
    if (!root) return;

    // Reveal elements observer
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { root, threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

    root.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // Wipe-stack gallery observer (alternating clip-path wipe reveal)
    const wipeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          wipeObserver.unobserve(entry.target);
        }
      });
    }, { root, threshold: 0.22 });

    root.querySelectorAll('.wipe-item').forEach((el) => wipeObserver.observe(el));

    // Stage mirror observer for desktop left panel
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const idx = STAGE_CONFIG.findIndex(s => s.id === entry.target.id);
          if (idx !== -1) {
            setActiveStageIdx(idx);
            setStageCaptionText(STAGE_CONFIG[idx].text);
          }
        }
      });
    }, { root, threshold: [0.35, 0.6] });

    STAGE_CONFIG.forEach((sec) => {
      const el = root.querySelector('#' + sec.id);
      if (el) stageObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      wipeObserver.disconnect();
      stageObserver.disconnect();
    };
  }, [isCoverOpened]);

  // Handle Opening the Cover Gate (Real unsealing instead of scroll)
  const handleOpenInvitation = () => {
    setIsCoverOpened(true);
    startAudio();
    setTimeout(() => {
      setIsCoverDismissed(true);
    }, 1000);
  };

  const handleCopyAccount = () => {
    copyText(accountNumber, 'damar-bank');
  };

  return (
    <div ref={containerRef} className="damar-alya-wrapper relative min-h-screen">
      
      {/* ============================================================
          ENHANCED ORGANIC PALETTE & TYPOGRAPHY
          Harmonious sage & alabaster tones with soft organic shadows
          (No harsh black shadows, no dirty overlays)
          ============================================================ */}
      <style>{`
        .damar-alya-wrapper {
          --paper: #faf7f1;
          --paper-soft: #f4efe4;
          --ink-900: #1b1e17;
          --ink-600: #464a40;
          --ink-400: #72776a;
          --sage-600: #556743;
          --sage-300: #b4c1a4;
          --blush-500: #b2736b;
          --line: #ded9cb;
          --shadow-soft: 0 14px 34px rgba(48, 56, 42, 0.08);
          --shadow-deep: 0 24px 54px rgba(34, 42, 30, 0.16);
          font-family: 'Work Sans', sans-serif;
          background: var(--paper);
          color: var(--ink-600);
          -webkit-font-smoothing: antialiased;
        }

        .damar-alya-wrapper h1,
        .damar-alya-wrapper h2,
        .damar-alya-wrapper h3 {
          font-family: 'Bodoni Moda', serif;
          margin: 0;
          line-height: 1.15;
          color: var(--ink-900);
          font-weight: 500;
        }
        .damar-alya-wrapper p { margin: 0; line-height: 1.75; }
        .damar-alya-wrapper button { font-family: inherit; cursor: pointer; }

        .eyebrow-row { display: flex; align-items: center; justify-content: center; gap: .6rem; margin-bottom: 1rem; }
        .eyebrow-num { font-family: 'JetBrains Mono', monospace; font-size: .66rem; color: var(--sage-600); letter-spacing: .05em; }
        .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: .64rem; letter-spacing: .32em; text-transform: uppercase; color: var(--ink-400); }
        .hairline { width: 34px; height: 1px; background: var(--line); }

        /* ============ SHELL ============ */
        .stage { display: none; }
        .device-frame { position: relative; width: 100%; background: var(--paper); }

        @media (min-width: 1024px) {
          .app-shell { display: flex; min-height: 100vh; }
          .stage {
            display: block; flex: 1 1 auto; position: sticky; top: 0; height: 100vh; overflow: hidden;
            background: #171a14;
          }
          .stage-layer {
            position: absolute; inset: 0; background-size: cover; background-position: center;
            opacity: 0; transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1); filter: brightness(0.85) saturate(0.95);
          }
          .stage-layer.is-active { opacity: 1; }
          .stage::after {
            content: ""; position: absolute; inset: 0;
            background: linear-gradient(180deg, rgba(23, 26, 20, 0.25) 0%, rgba(23, 26, 20, 0.45) 50%, rgba(18, 21, 15, 0.92) 100%);
          }
          .stage-caption { position: absolute; left: 2.8rem; bottom: 2.8rem; z-index: 2; max-width: 58%; }
          .stage-caption .eyebrow { color: var(--sage-300); }
          .stage-caption h2 { color: var(--paper); font-size: 1.6rem; font-style: italic; font-weight: 400; text-shadow: 0 2px 14px rgba(25, 30, 22, 0.5); }
          .stage-index {
            position: absolute; right: 2.4rem; top: 2.4rem; z-index: 2;
            font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--paper);
            opacity: .85; letter-spacing: .1em; background: rgba(27, 31, 23, 0.6);
            backdrop-filter: blur(8px); padding: 0.35rem 0.85rem; border-radius: 9999px;
            border: 1px solid rgba(180, 193, 164, 0.25);
          }
          .device-frame {
            flex: 0 0 452px; max-width: 452px; height: 100vh;
            scroll-behavior: smooth; box-shadow: var(--shadow-deep);
            scrollbar-width: thin; scrollbar-color: var(--sage-600) transparent;
          }
          .device-frame::-webkit-scrollbar { width: 5px; }
          .device-frame::-webkit-scrollbar-thumb { background: var(--sage-600); border-radius: 4px; }
        }

        /* ============ SECTION SHELL ============ */
        .inv-section { position: relative; padding: 5.4rem 1.7rem; overflow: hidden; }
        .inv-section.tight { padding-top: 3.2rem; padding-bottom: 3.2rem; }
        .inv-section.flush { padding: 0; }
        .section-inner { position: relative; z-index: 2; max-width: 520px; margin: 0 auto; }
        .center { text-align: center; }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: .1s; }
        .reveal-delay-2 { transition-delay: .2s; }
        .reveal-delay-3 { transition-delay: .32s; }

        /* ============ REAL UNSEALING COVER GATE ============ */
        .cover-gate {
          position: absolute; inset: 0; z-index: 45; min-height: 100vh;
          display: flex; align-items: flex-end; background: var(--ink-900);
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease;
          overflow: hidden; box-shadow: var(--shadow-deep);
        }
        .cover-gate.is-opened {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }
        .cover-bg-wrap { position: absolute; inset: 0; overflow: hidden; }
        .cover-bg-wrap img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8) contrast(1.04); }
        .cover-gate::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(23, 26, 20, 0.2) 0%, rgba(23, 26, 20, 0.55) 55%, rgba(19, 22, 16, 0.94) 96%);
          z-index: 1;
        }
        .cover-content { position: relative; z-index: 2; width: 100%; padding: 2.4rem 1.8rem 3.4rem; text-align: center; }
        .cover-kicker { font-family: 'JetBrains Mono', monospace; letter-spacing: .34em; text-transform: uppercase; font-size: .62rem; color: var(--sage-300); margin-bottom: 1.1rem; }
        .cover-names { font-size: 2.7rem; color: var(--paper); font-style: italic; text-shadow: 0 2px 18px rgba(25, 30, 22, 0.5); }
        .cover-amp { display: inline-block; margin: 0 .4rem; color: var(--blush-500); font-style: normal; }
        .cover-sub { margin-top: 1.1rem; font-size: .84rem; color: rgba(250, 247, 241, .85); }
        .ring-btn {
          margin-top: 2.4rem; width: 82px; height: 82px; border-radius: 50%;
          border: 1px solid var(--paper); background: rgba(250, 247, 241, 0.08); backdrop-filter: blur(6px);
          color: var(--paper); font-family: 'JetBrains Mono', monospace; font-size: .6rem;
          letter-spacing: .12em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center;
          text-align: center; transition: all .35s; box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .ring-btn:hover { background: var(--paper); color: var(--ink-900); transform: scale(1.05); box-shadow: 0 8px 30px rgba(180, 193, 164, 0.35); }

        /* ============ 2. HERO MEMPELAI PENUH & COUNTDOWN (RICHER, NON-EMPTY) ============ */
        .hero-couple {
          min-height: 100vh; padding: 3rem 1.7rem 2.8rem; display: flex; flex-direction: column;
          justify-content: space-between; background: var(--ink-900); text-align: center;
          position: relative;
        }
        .hero-couple-bg { position: absolute; inset: 0; overflow: hidden; }
        .hero-couple-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.72) contrast(1.05); }
        .hero-couple::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(22, 25, 20, 0.82) 0%, rgba(22, 25, 20, 0.28) 42%, rgba(18, 21, 16, 0.94) 100%);
          z-index: 1;
        }
        .hero-couple-header { position: relative; z-index: 2; padding-top: 1.5rem; }
        .hero-crest {
          width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(180, 193, 164, 0.45);
          background: rgba(27, 31, 23, 0.5); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem;
          font-family: 'Bodoni Moda', serif; font-size: 0.85rem; color: var(--sage-300);
          box-shadow: var(--shadow-soft);
        }
        .hero-kicker {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--sage-300); margin-bottom: 0.6rem;
        }
        .hero-names {
          font-size: 2.4rem; color: var(--paper); font-style: italic; font-weight: 400; line-height: 1.15;
          text-shadow: 0 2px 18px rgba(25, 30, 22, 0.5);
        }
        .hero-date {
          font-size: 0.82rem; color: rgba(250, 247, 241, 0.9); font-weight: 300; margin-top: 0.5rem; letter-spacing: 0.04em;
        }
        .countdown-wrap { position: relative; z-index: 2; padding: 0 0.5rem; }
        .countdown-divider { display: flex; align-items: center; justify-content: center; gap: 0.7rem; margin-bottom: 0.9rem; }
        .countdown-divider .hairline { width: 28px; background: rgba(180, 193, 164, 0.35); }
        .countdown-label { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .3em; text-transform: uppercase; color: var(--sage-300); }
        .countdown-grid { display: flex; justify-content: center; gap: .9rem; }
        .countdown-cell { min-width: 58px; }
        .countdown-num { font-family: 'Bodoni Moda', serif; font-size: 2rem; color: var(--paper); font-weight: 500; line-height: 1; text-shadow: 0 2px 14px rgba(25, 30, 22, 0.5); }
        .countdown-unit { font-family: 'JetBrains Mono', monospace; font-size: .58rem; letter-spacing: .14em; text-transform: uppercase; color: rgba(250,247,241,.7); margin-top: .4rem; }
        .countdown-sep { font-family: 'Bodoni Moda', serif; font-size: 1.6rem; color: rgba(250,247,241,.4); align-self: flex-start; padding-top: .15rem; }
        .hero-scroll-hint {
          margin-top: 1.4rem; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--sage-300); opacity: 0.85;
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
        }

        /* ============ KUTIPAN ============ */
        .opening { background: var(--paper-soft); }
        .opening .quote-mark { font-family: 'Bodoni Moda', serif; font-size: 3rem; color: var(--sage-600); font-style: italic; line-height: 1; }
        .opening blockquote { font-family: 'Bodoni Moda', serif; font-style: italic; font-size: 1.3rem; color: var(--ink-900); margin-top: .3rem; }
        .opening cite { display: block; margin-top: 1rem; font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-400); }

        /* ============ MEMPELAI ============ */
        .couple { background: var(--paper); }
        .persons { display: flex; flex-direction: column; gap: 2rem; margin-top: 2.2rem; }
        .person-photo { width: 150px; aspect-ratio: 3/4; margin: 0 auto 1rem; overflow: hidden; box-shadow: var(--shadow-soft); border-radius: 4px; }
        .person-photo img { width: 100%; height: 100%; object-fit: cover; }
        .person-order { font-family: 'JetBrains Mono', monospace; font-size: .6rem; letter-spacing: .22em; text-transform: uppercase; color: var(--sage-600); margin-bottom: .4rem; }
        .person-name { font-size: 1.35rem; font-style: italic; }
        .person-parents { font-size: .84rem; margin-top: .5rem; color: var(--ink-400); }
        .person-parents b { color: var(--ink-600); font-weight: 600; }
        .persons-divider { display: flex; align-items: center; gap: .7rem; justify-content: center; }
        .persons-divider span { font-family: 'Bodoni Moda', serif; font-style: italic; color: var(--blush-500); }

        /* ============ KISAH CINTA ============ */
        .story { background: var(--paper-soft); }
        .story-entries { margin-top: 2rem; display: flex; flex-direction: column; gap: 2.2rem; }
        .story-entry { text-align: center; }
        .story-date { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: var(--sage-600); margin-bottom: .5rem; }
        .story-title { font-size: 1.25rem; font-style: italic; margin-bottom: .5rem; }
        .story-photo { margin-top: 1rem; aspect-ratio: 16/10; overflow: hidden; box-shadow: var(--shadow-soft); border-radius: 4px; }
        .story-photo img { width: 100%; height: 100%; object-fit: cover; }

        /* ============ SPOTLIGHT FOTO BESAR ============ */
        .spotlight { padding: 0; min-height: 80vh; display: flex; align-items: flex-end; background: var(--ink-900); }
        .spotlight-media { position: absolute; inset: 0; }
        .spotlight-media img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); }
        .spotlight::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(20, 23, 18, 0) 45%, rgba(20, 23, 18, 0.92) 100%);
        }
        .spotlight-caption { position: relative; z-index: 2; padding: 2.1rem 1.8rem; }
        .spotlight-caption span { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .22em; text-transform: uppercase; color: var(--sage-300); }
        .spotlight-caption p { margin-top: .5rem; font-family: 'Bodoni Moda', serif; font-style: italic; color: var(--paper); font-size: 1.15rem; text-shadow: 0 2px 14px rgba(25, 30, 22, 0.5); }

        /* ============ WAKTU & TEMPAT ============ */
        .schedule { background: var(--paper); }
        .schedule-date-block { text-align: center; margin-bottom: 1.9rem; }
        .schedule-date-block .datebig { font-size: 1.85rem; font-style: italic; }
        .schedule-cards { display: flex; flex-direction: column; gap: 0; }
        .schedule-card { padding: 1.5rem 0; border-top: 1px solid var(--line); }
        .schedule-card:last-child { border-bottom: 1px solid var(--line); }
        .schedule-card .label { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: var(--sage-600); margin-bottom: .6rem; }
        .schedule-card .datetime { font-size: 1.25rem; font-style: italic; margin-bottom: .3rem; }
        .schedule-card .place { font-size: .88rem; }
        .map-btn { margin-top: .9rem; display: inline-flex; align-items: center; gap: .4rem; font-size: .72rem; color: var(--sage-600); border-bottom: 1px solid var(--sage-600); text-decoration: none; font-family: 'JetBrains Mono', monospace; padding-bottom: 2px; }

        /* ============ GALERI — WIPE REVEAL VERTIKAL (THE AUTHENTIC SIGNATURE EFFECT) ============ */
        .gallery { background: var(--paper-soft); }
        .wipe-stack { margin-top: 2.2rem; display: flex; flex-direction: column; gap: 1.4rem; }
        .wipe-item { position: relative; aspect-ratio: 4/3; overflow: hidden; box-shadow: var(--shadow-soft); border-radius: 4px; }
        .wipe-item img {
          width: 100%; height: 100%; object-fit: cover;
          clip-path: inset(0 0 0 100%); transition: clip-path 1.1s cubic-bezier(.4, 0, .2, 1);
        }
        .wipe-item.is-visible img { clip-path: inset(0 0 0 0%); }
        .wipe-item:nth-child(even) img { clip-path: inset(0 100% 0 0); }
        .wipe-item:nth-child(even).is-visible img { clip-path: inset(0 0% 0 0); }

        /* ============ HADIAH ============ */
        .gift { background: var(--paper); }
        .gift-card { margin-top: 2rem; border: 1px solid var(--line); padding: 1.8rem; text-align: center; border-radius: 6px; box-shadow: var(--shadow-soft); }
        .gift-icon { width: 34px; height: 34px; margin: 0 auto 1rem; color: var(--sage-600); }
        .copy-btn {
          margin-top: 1.2rem; background: var(--ink-900); color: var(--paper); border: none;
          padding: .75rem 1.5rem; font-weight: 600; font-size: .78rem; border-radius: 4px;
          transition: background .2s, transform .2s;
        }
        .copy-btn:hover { background: #121410; transform: translateY(-1px); }

        /* ============ GUESTBOOK ============ */
        .guestbook { background: var(--paper-soft); }
        .wish-list { display: flex; flex-direction: column; gap: 0; margin-top: 2rem; max-height: 320px; overflow-y: auto; padding-right: .3rem; }
        .wish-card { padding: 1rem 0; border-top: 1px solid var(--line); text-align: left; }
        .wish-name { font-family: 'Bodoni Moda', serif; font-style: italic; color: var(--sage-600); font-size: 1rem; margin-bottom: .3rem; }
        .wish-msg { font-size: .86rem; }
        .gb-form { margin-top: 1.8rem; display: flex; flex-direction: column; gap: .75rem; }
        .gb-form input, .gb-form textarea {
          background: var(--paper); border: 1px solid var(--line); padding: .8rem .95rem;
          font-family: 'Work Sans', sans-serif; font-size: .88rem; resize: none; color: var(--ink-600); border-radius: 4px;
        }
        .gb-form textarea { min-height: 88px; }
        .gb-form button {
          background: var(--sage-600); color: var(--paper); border: none; padding: .8rem 1rem;
          font-weight: 600; border-radius: 4px; transition: background .2s;
        }
        .gb-form button:hover { background: #475737; }

        /* ============ RSVP ============ */
        .rsvp { background: var(--paper); }
        .rsvp-form { margin-top: 2rem; display: flex; flex-direction: column; gap: .8rem; }
        .rsvp-form input, .rsvp-form select, .rsvp-form textarea {
          background: var(--paper-soft); border: 1px solid var(--line); padding: .8rem .95rem;
          font-family: 'Work Sans', sans-serif; font-size: .88rem; color: var(--ink-600); border-radius: 4px;
        }
        .rsvp-radios { display: flex; gap: .5rem; }
        .rsvp-radios label {
          flex: 1; text-align: center; border: 1px solid var(--line); padding: .7rem .4rem;
          font-size: .78rem; cursor: pointer; border-radius: 4px; transition: all .2s;
        }
        .rsvp-radios input { display: none; }
        .rsvp-radios label.is-selected { background: var(--ink-900); color: var(--paper); border-color: var(--ink-900); }
        .rsvp-form button {
          background: var(--blush-500); color: var(--paper); border: none; padding: .85rem 1rem;
          font-weight: 600; border-radius: 4px; transition: background .2s;
        }
        .rsvp-form button:hover { background: #a2655e; }
        .rsvp-note { margin-top: .9rem; font-size: .76rem; text-align: center; display: none; color: var(--sage-600); font-weight: 500; }
        .rsvp-note.show { display: block; }

        /* ============ PENUTUP ============ */
        .closing { min-height: 84vh; padding: 0; display: flex; align-items: center; background: var(--ink-900); }
        .closing-bg { position: absolute; inset: 0; }
        .closing-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.65); }
        .closing::before { content: ""; position: absolute; inset: 0; background: rgba(19, 22, 16, 0.86); }
        .closing-inner { position: relative; z-index: 2; text-align: center; padding: 0 1.7rem; }
        .closing-inner .quote-mark { color: var(--blush-500); font-family: 'Bodoni Moda', serif; font-size: 2.3rem; font-style: italic; }
        .closing-inner h2 { font-size: 1.75rem; font-style: italic; color: var(--paper); margin: .5rem 0 1rem; text-shadow: 0 2px 14px rgba(25, 30, 22, 0.5); }
        .closing-inner p { font-size: .84rem; color: rgba(250,247,241,.85); }
        .closing-names { margin-top: 1.5rem; font-family: 'JetBrains Mono', monospace; letter-spacing: .2em; text-transform: uppercase; font-size: .68rem; color: var(--sage-300); }

        @media (min-width: 640px) {
          .section-inner { max-width: 560px; }
          .cover-names { font-size: 3.1rem; }
        }
      `}</style>

      {/* ============================================================
          TOP DEMO CONTROL BAR (Sticky Navigation for Sekarsiti)
          ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1b1e17]/90 backdrop-blur-md border-b border-[#b4c1a4]/25 text-[#faf7f1] px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-[#b4c1a4] hover:text-white transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sekarsiti</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[#faf7f1]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#556743] animate-pulse" />
          <span className="font-['Bodoni_Moda',serif] text-sm text-[#faf7f1] tracking-wide">
            Kertas Putih &amp; Sage · Damar &amp; Alya
          </span>
        </div>

        <button
          onClick={onOrderViaWhatsApp}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#556743] hover:bg-[#475737] text-white font-semibold rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Pesan Desain Ini</span>
        </button>
      </header>

      {/* Floating Audio Disk Player (Only visible after opening) */}
      {isCoverOpened && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {showAudioToast && (
            <div className="hidden sm:flex items-center gap-2 py-1.5 px-3.5 bg-[#1b1e17]/90 backdrop-blur-md border border-[#b4c1a4]/30 text-[#faf7f1] rounded-full text-xs shadow-xl animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#556743] animate-pulse" />
              <span>{isPlayingAudio ? 'Musik: Until I Found You (Acoustic Strings)' : 'Musik dijeda'}</span>
            </div>
          )}

          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full border border-[#556743]/60 flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              isPlayingAudio 
                ? 'bg-[#1b1e17] text-[#b4c1a4] ring-4 ring-[#556743]/25' 
                : 'bg-[#1b1e17]/80 text-[#faf7f1]/60 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            aria-label="Kontrol musik latar"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 animate-pulse text-[#b4c1a4]" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      )}

      {/* ============================================================
          EXACT APP-SHELL: STAGE (LEFT) & DEVICE FRAME (RIGHT)
          ============================================================ */}
      <div className="app-shell pt-12">

        {/* STAGE: panel kiri khusus desktop — foto berganti (crossfade) mengikuti section aktif */}
        <aside className="stage" aria-hidden="true">
          {STAGE_CONFIG.map((sec, idx) => (
            <div
              key={sec.id}
              className={`stage-layer ${idx === activeStageIdx ? 'is-active' : ''}`}
              data-photo-slot={`stage-mirror-${sec.key}`}
              data-slot-type="static-background"
              style={{ backgroundImage: `url('${sec.image}')` }}
            />
          ))}

          <div className="stage-caption">
            <p className="eyebrow">Kertas Putih &amp; Sage</p>
            <h2 data-stage-caption>{stageCaptionText}</h2>
          </div>
          <div className="stage-index" data-stage-index>
            {String(activeStageIdx + 1).padStart(2, '0')} / {String(STAGE_CONFIG.length).padStart(2, '0')}
          </div>
        </aside>

        {/* DEVICE FRAME: kolom kanan, selalu tampil sebagai "mode mobile" */}
        <main 
          className="device-frame" 
          id="deviceFrame" 
          ref={deviceFrameRef}
          style={{ overflowY: isCoverOpened ? 'auto' : 'hidden' }}
        >

          {/* ============ 1. REAL OPENING COVER GATE (UNSEALING INTERACTION, NOT SCROLL) ============ */}
          {!isCoverDismissed && (
            <div 
              className={`cover-gate ${isCoverOpened ? 'is-opened' : ''}`}
              id="sec-cover" 
              data-section-type="static"
            >
              <div className="cover-bg-wrap">
                <img 
                  ref={coverImgRef}
                  id="coverParallaxImg" 
                  src={heroImage} 
                  alt={`Foto sampul ${groomName} dan ${brideName}`} 
                />
              </div>
              <div className="cover-content">
                <p className="cover-kicker">Undangan Pernikahan</p>
                <h1 className="cover-names">
                  {groomName}<span className="cover-amp">&amp;</span>{brideName}
                </h1>
                <p className="cover-sub">Kepada {guestName}</p>
                <button 
                  className="ring-btn" 
                  id="openInvitationBtn" 
                  type="button"
                  onClick={handleOpenInvitation}
                >
                  Buka<br />Undangan
                </button>
              </div>
            </div>
          )}

          {/* ============ 2. SECTION PERTAMA: FOTO MEMPELAI PENUH & COUNTDOWN (LENGKAP & TIDAK KOSONG) ============ */}
          <section 
            className="inv-section hero-couple" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-hero-couple" 
            data-stage-key="hero-couple" 
            data-stage-image={heroImage} 
            data-stage-text={`${groomName} & ${brideName}, menghitung hari.`}
          >
            <div className="hero-couple-bg">
              <img 
                src={heroImage} 
                alt={`Foto ${groomName} dan ${brideName}`} 
                data-photo-slot="couple-full" 
                data-slot-type="dynamic-cover"
              />
            </div>

            {/* Bagian atas: Monogram & Nama Lengkap Kedua Mempelai (Memastikan Section Pertama Penuh & Megah) */}
            <div className="hero-couple-header">
              <div className="hero-crest">
                <span>{groomName.charAt(0)} &amp; {brideName.charAt(0)}</span>
              </div>
              <p className="hero-kicker">THE WEDDING OF</p>
              <h1 className="hero-names">
                {groomName} &amp; {brideName}
              </h1>
              <p className="hero-date">
                {eventDateFormatted} · {city}
              </p>
            </div>

            {/* Bagian bawah: Countdown Realtime & Petunjuk Gulir */}
            <div className="countdown-wrap">
              <div className="countdown-divider">
                <span className="hairline"></span>
                <p className="countdown-label">Menuju Hari Bahagia Kami</p>
                <span className="hairline"></span>
              </div>
              <div 
                className="countdown-grid" 
                id="countdownGrid" 
                data-dynamic-field="event_date" 
                data-countdown-target={countdownIsoDate}
              >
                <div className="countdown-cell"><div className="countdown-num" data-cd="d">{cd.d}</div><div className="countdown-unit">Hari</div></div>
                <div className="countdown-sep">:</div>
                <div className="countdown-cell"><div className="countdown-num" data-cd="h">{cd.h}</div><div className="countdown-unit">Jam</div></div>
                <div className="countdown-sep">:</div>
                <div className="countdown-cell"><div className="countdown-num" data-cd="m">{cd.m}</div><div className="countdown-unit">Menit</div></div>
                <div className="countdown-sep">:</div>
                <div className="countdown-cell"><div className="countdown-num" data-cd="s">{cd.s}</div><div className="countdown-unit">Detik</div></div>
              </div>

              <div className="hero-scroll-hint">
                <span>Gulir ke Bawah</span>
                <span>↓</span>
              </div>
            </div>
          </section>

          {/* ============ 3. KUTIPAN PEMBUKA ============ */}
          <section 
            className="inv-section opening tight" 
            data-section-type="static" 
            id="sec-opening" 
            data-stage-key="opening" 
            data-stage-image={heroImage} 
            data-stage-text="Tenteram dalam satu ikatan."
          >
            <div className="section-inner center">
              <span className="quote-mark reveal">&ldquo;</span>
              <blockquote className="reveal reveal-delay-1" data-dynamic-field="custom:opening_quote">
                {quoteText}
              </blockquote>
              <cite className="reveal reveal-delay-2">{quoteSource}</cite>
            </div>
          </section>

          {/* ============ 4. MEMPELAI ============ */}
          <section 
            className="inv-section couple" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-couple" 
            data-stage-key="couple" 
            data-stage-image={groomPortrait} 
            data-stage-text={`${groomName} & ${brideName}, mempelai yang berbahagia.`}
          >
            <div className="section-inner center">
              <p className="eyebrow reveal">Mempelai</p>
              <div className="persons">
                <div className="person-card reveal reveal-delay-1">
                  <div className="person-photo">
                    <img 
                      src={groomPortrait} 
                      alt="Foto mempelai pria" 
                      data-photo-slot="groom-portrait" 
                      data-slot-type="dynamic-gallery"
                    />
                  </div>
                  <p className="person-order">Mempelai Pria</p>
                  <p className="person-name" data-dynamic-field="groom_name">{groomFullName}</p>
                  <p className="person-parents">{groomParents}</p>
                </div>
                
                <div className="persons-divider reveal reveal-delay-2"><span>&amp;</span></div>
                
                <div className="person-card reveal reveal-delay-3">
                  <div className="person-photo">
                    <img 
                      src={bridePortrait} 
                      alt="Foto mempelai wanita" 
                      data-photo-slot="bride-portrait" 
                      data-slot-type="dynamic-gallery"
                    />
                  </div>
                  <p className="person-order">Mempelai Wanita</p>
                  <p className="person-name" data-dynamic-field="bride_name">{brideFullName}</p>
                  <p className="person-parents">{brideParents}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ 5. KISAH CINTA KAMI — opsional ============ */}
          <section 
            className="inv-section story" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-story" 
            data-stage-key="story" 
            data-stage-image="/src/assets/images/wedding_vows_bouquet_1790901516667.jpg" 
            data-stage-text="Kisah yang bermula dari kedai kopi kecil."
          >
            <div className="section-inner center">
              <p className="eyebrow reveal">Kisah Cinta Kami</p>
              <div className="story-entries" data-dynamic-list="our_story" data-list-source="customer">
                <div className="story-entry reveal" data-list-item-template>
                  <p className="story-date" data-list-item-field="date">Agustus 2019</p>
                  <p className="story-title" data-list-item-field="title">Pertemuan Pertama</p>
                  <p data-list-item-field="description">Bertemu tanpa sengaja di sebuah kedai kopi kecil dekat kampus, saat hujan sore tak kunjung reda.</p>
                  <div className="story-photo">
                    <img 
                      src="/src/assets/images/brand_story_botanical_1790831303860.jpg" 
                      alt="Kisah 1" 
                      data-list-item-field="photo" 
                      data-photo-slot="story-1" 
                      data-slot-type="dynamic-gallery"
                    />
                  </div>
                </div>
                <div className="story-entry reveal reveal-delay-1" data-list-item-template>
                  <p className="story-date" data-list-item-field="date">Februari 2022</p>
                  <p className="story-title" data-list-item-field="title">Menjadi Sepasang</p>
                  <p data-list-item-field="description">Setelah tiga tahun saling mengenal, kami memutuskan untuk melangkah bersama sebagai sepasang kekasih.</p>
                  <div className="story-photo">
                    <img 
                      src="/src/assets/images/wedding_ring_exchange_1790833922500.jpg" 
                      alt="Kisah 2" 
                      data-list-item-field="photo" 
                      data-photo-slot="story-2" 
                      data-slot-type="dynamic-gallery"
                    />
                  </div>
                </div>
                <div className="story-entry reveal reveal-delay-2" data-list-item-template>
                  <p className="story-date" data-list-item-field="date">Mei 2026</p>
                  <p className="story-title" data-list-item-field="title">Lamaran</p>
                  <p data-list-item-field="description">Damar melamar Alya di tepi danau saat senja, disaksikan keluarga terdekat.</p>
                  <div className="story-photo">
                    <img 
                      src="/src/assets/images/wedding_vows_bouquet_1790901516667.jpg" 
                      alt="Kisah 3" 
                      data-list-item-field="photo" 
                      data-photo-slot="story-3" 
                      data-slot-type="dynamic-gallery"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ 6. SPOTLIGHT FOTO BESAR #1 (statis) ============ */}
          <section 
            className="inv-section spotlight" 
            data-section-type="static" 
            id="sec-spotlight-1" 
            data-stage-key="spotlight1" 
            data-stage-image="/src/assets/images/editorial_couple_portrait_1790838636662.jpg" 
            data-stage-text="Berjalan berdampingan, satu tujuan."
          >
            <div className="spotlight-media">
              <img 
                src="/src/assets/images/editorial_couple_portrait_1790838636662.jpg" 
                alt="Momen Damar dan Alya" 
                data-photo-slot="spotlight-1" 
                data-slot-type="static-background"
              />
            </div>
            <div className="spotlight-caption reveal">
              <span>Sekeping Momen</span>
              <p>&ldquo;Berjalan berdampingan, satu tujuan.&rdquo;</p>
            </div>
          </section>

          {/* ============ 7. WAKTU & TEMPAT ============ */}
          <section 
            className="inv-section schedule" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-schedule" 
            data-stage-key="schedule" 
            data-stage-image="/src/assets/images/botanical_estate_venue_1790919022237.jpg" 
            data-stage-text="Akad dan resepsi, dua janji dalam satu hari."
          >
            <div className="section-inner">
              <p className="eyebrow reveal center">Waktu &amp; Tempat</p>
              <div className="schedule-date-block reveal reveal-delay-1">
                <p className="datebig" data-dynamic-field="event_date">{eventDateFormatted}</p>
              </div>
              <div className="schedule-cards">
                <div className="schedule-card reveal reveal-delay-1">
                  <p className="label">Akad Nikah</p>
                  <p className="datetime" data-dynamic-field="akad_schedule">{akadTime}</p>
                  <p className="place" data-dynamic-field="event_location">{akadVenue}</p>
                  <a className="map-btn" href={mapsUrl} target="_blank" rel="noreferrer">
                    Lihat Peta ↗
                  </a>
                </div>
                <div className="schedule-card reveal reveal-delay-2">
                  <p className="label">Resepsi</p>
                  <p className="datetime" data-dynamic-field="resepsi_schedule">{resepsiTime}</p>
                  <p className="place" data-dynamic-field="event_location">{resepsiVenue}</p>
                  <a className="map-btn" href={mapsUrl} target="_blank" rel="noreferrer">
                    Lihat Peta ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ============ 8. GALERI — WIPE REVEAL VERTIKAL (THE AUTHENTIC SIGNATURE EFFECT) ============ */}
          <section 
            className="inv-section gallery" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-gallery" 
            data-stage-key="gallery" 
            data-stage-image="/src/assets/images/wedding_table_botanical_1790833955186.jpg" 
            data-stage-text="Setiap foto membuka diri, satu per satu."
          >
            <div className="section-inner">
              <p className="eyebrow reveal center">Galeri</p>
              <div className="wipe-stack" id="wipeStack">
                {galleryImages.map((src, idx) => (
                  <div key={idx} className="wipe-item">
                    <img 
                      src={src} 
                      alt={`Galeri foto ${idx + 1}`} 
                      data-photo-slot={`gallery-${idx + 1}`} 
                      data-slot-type="dynamic-gallery" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ 9. SPOTLIGHT FOTO BESAR #2 (statis) ============ */}
          <section 
            className="inv-section spotlight" 
            data-section-type="static" 
            id="sec-spotlight-2" 
            data-stage-key="spotlight2" 
            data-stage-image="/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg" 
            data-stage-text="Waktu berhenti sejenak untuk kami berdua."
          >
            <div className="spotlight-media">
              <img 
                src="/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg" 
                alt="Momen Damar dan Alya" 
                data-photo-slot="spotlight-2" 
                data-slot-type="static-background"
              />
            </div>
            <div className="spotlight-caption reveal">
              <span>Sekeping Momen</span>
              <p>&ldquo;Waktu berhenti sejenak untuk kami berdua.&rdquo;</p>
            </div>
          </section>

          {/* ============ 10. INFO HADIAH / AMPLOP DIGITAL ============ */}
          <section 
            className="inv-section gift" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-gift" 
            data-stage-key="gift" 
            data-stage-image="/src/assets/images/editorial_venue_rings_1790838653826.jpg" 
            data-stage-text="Doa restu Anda adalah hadiah paling berarti."
          >
            <div className="section-inner center">
              <p className="eyebrow reveal">Tanda Kasih</p>
              <div className="gift-card reveal reveal-delay-1">
                <Gift className="gift-icon w-6 h-6 mx-auto mb-2 text-[#414A35]" />
                <p data-dynamic-field="gift_info">
                  Bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih, dapat melalui {bankName} {accountNumber} a.n. {accountHolder}, atau tanda kasih langsung pada resepsi.
                </p>
                <button 
                  className="copy-btn" 
                  type="button" 
                  id="copyGiftBtn"
                  onClick={handleCopyAccount}
                >
                  {isCopied('damar-bank') ? 'Tersalin!' : 'Salin Nomor Rekening'}
                </button>
              </div>
            </div>
          </section>

          {/* ============ 11. UCAPAN & DOA — GUESTBOOK ============ */}
          <section 
            className="inv-section guestbook" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-guestbook" 
            data-stage-key="guestbook" 
            data-stage-image="/src/assets/images/brand_story_botanical_1790831303860.jpg" 
            data-stage-text="Setiap ucapan, kami simpan sebagai doa."
          >
            <div className="section-inner">
              <p className="eyebrow reveal center">Ucapan &amp; Doa</p>
              <div className="wish-list" data-dynamic-list="guest_wishes" data-list-source="guest" id="wishList">
                {wishes.map((w, idx) => (
                  <div key={idx} className="wish-card reveal is-visible" data-list-item-template>
                    <p className="wish-name" data-list-item-field="guest_name">{w.name}</p>
                    <p className="wish-msg" data-list-item-field="message">{w.message}</p>
                  </div>
                ))}
              </div>
              <form className="gb-form reveal reveal-delay-1" data-guestbook-form id="guestbookForm" onSubmit={handleGuestbookSubmit}>
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  required 
                  data-guestbook-input="guest_name"
                  value={gbName}
                  onChange={(e) => setGbName(e.target.value)}
                />
                <textarea 
                  placeholder="Tulis ucapan &amp; doa Anda..." 
                  required 
                  data-guestbook-input="message"
                  value={gbMsg}
                  onChange={(e) => setGbMsg(e.target.value)}
                />
                <button type="submit" data-guestbook-submit>Kirim Ucapan</button>
              </form>
            </div>
          </section>

          {/* ============ 12. KONFIRMASI KEHADIRAN — RSVP ============ */}
          <section 
            className="inv-section rsvp" 
            data-section-type="dynamic" 
            data-invitation-type="pernikahan" 
            id="sec-rsvp" 
            data-stage-key="rsvp" 
            data-stage-image="/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg" 
            data-stage-text="Kehadiran Anda melengkapi hari kami."
          >
            <div className="section-inner center">
              <p className="eyebrow reveal">RSVP</p>
              <h2 className="reveal reveal-delay-1" style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>Konfirmasi Kehadiran</h2>
              <p className="reveal reveal-delay-2" style={{ marginTop: '.6rem' }}>Mohon konfirmasi sebelum 1 November 2026 untuk membantu kami mempersiapkan acara.</p>
              
              <form className="rsvp-form reveal reveal-delay-3" data-rsvp-form id="rsvpForm" onSubmit={handleRsvpSubmit}>
                <input 
                  type="text" 
                  placeholder="Nama lengkap" 
                  required 
                  data-rsvp-input="name"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                />
                <div className="rsvp-radios">
                  <label className={rsvpAttendance === 'hadir' ? 'is-selected' : ''}>
                    <input 
                      type="radio" 
                      name="attendance" 
                      value="hadir" 
                      checked={rsvpAttendance === 'hadir'}
                      onChange={() => setRsvpAttendance('hadir')}
                    />
                    <span>Hadir</span>
                  </label>
                  <label className={rsvpAttendance === 'ragu' ? 'is-selected' : ''}>
                    <input 
                      type="radio" 
                      name="attendance" 
                      value="ragu" 
                      checked={rsvpAttendance === 'ragu'}
                      onChange={() => setRsvpAttendance('ragu')}
                    />
                    <span>Ragu</span>
                  </label>
                  <label className={rsvpAttendance === 'tidak_hadir' ? 'is-selected' : ''}>
                    <input 
                      type="radio" 
                      name="attendance" 
                      value="tidak_hadir" 
                      checked={rsvpAttendance === 'tidak_hadir'}
                      onChange={() => setRsvpAttendance('tidak_hadir')}
                    />
                    <span>Tidak Hadir</span>
                  </label>
                </div>
                <select 
                  data-rsvp-input="guest_count"
                  value={rsvpCount}
                  onChange={(e) => setRsvpCount(e.target.value)}
                >
                  <option value="1">1 orang</option>
                  <option value="2">2 orang</option>
                  <option value="3">3 orang</option>
                  <option value="4">4 orang</option>
                </select>
                <textarea 
                  placeholder="Pesan tambahan (opsional)" 
                  data-rsvp-input="note"
                  value={rsvpNote}
                  onChange={(e) => setRsvpNote(e.target.value)}
                />
                <button type="submit" data-rsvp-submit>Kirim Konfirmasi</button>
              </form>
              <p className={`rsvp-note ${showRsvpNote ? 'show' : ''}`} id="rsvpNote">
                Terima kasih, konfirmasi kehadiran Anda telah kami terima.
              </p>
            </div>
          </section>

          {/* ============ 13. PENUTUP ============ */}
          <section 
            className="inv-section closing" 
            data-section-type="static" 
            id="sec-closing" 
            data-stage-key="closing" 
            data-stage-image="/src/assets/images/wedding_dance_lights_1790901533590.jpg" 
            data-stage-text="Terima kasih telah menjadi bagian dari kisah ini."
          >
            <div className="closing-bg">
              <img 
                src="/src/assets/images/wedding_dance_lights_1790901533590.jpg" 
                alt="Foto penutup" 
                data-photo-slot="closing-bg" 
                data-slot-type="static-background"
              />
            </div>
            <div className="closing-inner">
              <span className="quote-mark reveal">&ldquo;</span>
              <h2 className="reveal reveal-delay-1" data-dynamic-field="custom:closing_note">
                Terima kasih telah menjadi bagian dari kisah kami.
              </h2>
              <p className="reveal reveal-delay-2">
                Sampai jumpa di hari bahagia kami — dengan penuh kasih, kami menantikan kehadiran Anda.
              </p>
              <p className="closing-names reveal reveal-delay-3">Damar &amp; Alya</p>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
};
