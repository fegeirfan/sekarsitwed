export type TemplateId = 'ruang-rasa' | 'malam-zamrud' | 'setangkai' | 'suasana' | 'lembayung';

export type OrderStatus = 'pending' | 'in_progress' | 'review' | 'published';

export interface DresscodeSwatch {
  name: string;
  hex: string;
  note: string;
}

export interface StoryChapterData {
  chapter: string;
  title: string;
  date: string;
  story: string;
  image: string;
}

export interface ClientInvitationData {
  id: string; // e.g. "INV-2027-001"
  clientName: string; // e.g. "Kirana & Adhitya"
  clientPhone: string; // e.g. "08123456789"
  clientEmail?: string;
  templateId: TemplateId;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  slug: string; // URL friendly slug e.g. "kirana-adhitya"

  // Mempelai Wanita
  brideName: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram?: string;

  // Mempelai Pria
  groomName: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram?: string;

  // Tanggal & Countdown
  eventDateFormatted: string; // e.g. "Minggu, 14 Februari 2027"
  countdownIsoDate: string; // e.g. "2027-02-14T08:00:00"

  // Rangkaian Acara
  akadTime: string; // e.g. "08.00 – 09.30 WIB"
  akadVenue: string; // e.g. "Ruang Bimasena, Aryaduta Hotel"
  resepsiTime: string; // e.g. "11.00 – 14.00 WIB"
  resepsiVenue: string; // e.g. "Grand Ballroom, Aryaduta Hotel"
  city: string; // e.g. "Jakarta Selatan"
  mapsUrl: string;

  // Kutipan & Doa
  quoteText: string;
  quoteSource: string;

  // Tanda Kasih / Rekening
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  secondaryBankName?: string;
  secondaryAccountNumber?: string;
  secondaryAccountHolder?: string;
  qrisImageUrl?: string;

  // Musik
  songTitle: string;
  audioUrl?: string;

  // Template-Specific Media Slots (Bebas tanpa batasan kaku umum)
  mediaSlots: {
    heroImage?: string;
    bridePortrait?: string;
    groomPortrait?: string;
    galleryImages: string[]; // Bebas jumlah foto galeri
    filmstripImages?: string[]; // Khusus Reel Sinematik 35mm
    storyChapters?: StoryChapterData[]; // Khusus Editorial & Sage
    dresscodeSwatches?: DresscodeSwatch[]; // Khusus Malam Zamrud & Jurnal
    waxSealEmblem?: string; // Khusus Jurnal Dua Hati
    qrisImageUrl?: string; // Khusus Malam Zamrud & Editorial
  };

  // Akses Portal Mempelai (Kode & Sandi)
  accessCode?: string; // e.g. "INV-2027-001" atau "kirana-adhitya"
  pinCode?: string; // 4-6 digit sandi PIN, e.g. "8294"

  // Riwayat Link Tamu WhatsApp yang Dibuat Mempelai di Portal
  guestLinks?: {
    id: string;
    guestName: string;
    category?: string; // "Keluarga" | "Sahabat" | "Rekan Kerja" | "VIP"
    phone?: string;
    createdAt: string;
    isSent?: boolean;
  }[];

  // Tamu & RSVP
  guestbookEntries?: { name: string; message: string; time: string }[];
  rsvpList?: { name: string; attendance: string; count: number; date: string }[];
}
