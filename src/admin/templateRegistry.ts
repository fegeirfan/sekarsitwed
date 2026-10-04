import { TemplateId, ClientInvitationData } from '../types/clientInvitation';

export interface MediaSlotDefinition {
  key: string;
  label: string;
  description: string;
  aspectRatio: string;
  recommendedCount?: string;
  isMultiple?: boolean;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  styleLabel: string;
  demoComponentKey: string;
  coverThumbnail: string;
  description: string;
  mediaSlots: MediaSlotDefinition[];
  hasDresscode: boolean;
  hasFilmstrip: boolean;
  hasStoryChapters: boolean;
  hasWaxSeal: boolean;
  defaultData: Partial<ClientInvitationData>;
}

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  'ruang-rasa': {
    id: 'ruang-rasa',
    name: 'Seri Editorial Modern (Ruang Rasa)',
    styleLabel: 'Modern Minimalis & Archival Broadsheet',
    demoComponentKey: 'editorial',
    coverThumbnail: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
    description: 'Estetika editorial majalah fine-art dengan tipografi Fraunces klasik, tata letak terbuka bebas kotak, dan esai foto babak perjalanan.',
    hasDresscode: false,
    hasFilmstrip: false,
    hasStoryChapters: true,
    hasWaxSeal: true,
    mediaSlots: [
      {
        key: 'heroImage',
        label: 'Foto / Poster Video Hero',
        description: 'Tampil sebagai latar sinematik pertama di sampul dan pembuka',
        aspectRatio: '16:9'
      },
      {
        key: 'bridePortrait',
        label: 'Foto Mempelai Wanita (The Bride)',
        description: 'Potret tunggal mempelai wanita beresolusi tinggi',
        aspectRatio: '3:4'
      },
      {
        key: 'groomPortrait',
        label: 'Foto Mempelai Pria (The Groom)',
        description: 'Potret tunggal mempelai pria beresolusi tinggi',
        aspectRatio: '3:4'
      },
      {
        key: 'galleryImages',
        label: 'Galeri Momen Editorial (Bebas Jumlah)',
        description: 'Unggah foto-foto momen perayaan tanpa batasan kuota kaku',
        aspectRatio: '3:4 atau 4:3',
        isMultiple: true
      }
    ],
    defaultData: {
      brideName: 'Kirana',
      brideFullName: 'Kirana Ayu Lestari, S.Ds.',
      brideParents: 'Putri pertama dari Bapak Hendra Wijaya & Ibu Sinta Maharani',
      brideInstagram: '@kiranaayuu',
      groomName: 'Adhitya',
      groomFullName: 'Adhitya Nugraha, B.Eng.',
      groomParents: 'Putra kedua dari Bapak Suryanto Nugraha & Ibu Ratna Dewi',
      groomInstagram: '@adhityanugraha',
      eventDateFormatted: 'Minggu, 14 Februari 2027',
      countdownIsoDate: '2027-02-14T08:00:00',
      akadTime: '08.00 – 09.30 WIB',
      akadVenue: 'Ruang Bimasena, Aryaduta Hotel',
      resepsiTime: '11.00 – 14.00 WIB',
      resepsiVenue: 'Grand Ballroom, Aryaduta Hotel',
      city: 'Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
      quoteText: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, serta menjadikan di antara kamu rasa kasih dan sayang.',
      quoteSource: 'QS. Ar-Rum : 21',
      bankName: 'BCA',
      accountNumber: '8271029384',
      accountHolder: 'Kirana Ayu Lestari',
      songTitle: 'Until I Found You - Stephen Sanchez (Violin Solo)'
    }
  },

  'malam-zamrud': {
    id: 'malam-zamrud',
    name: 'Malam Zamrud (Art Deco & Emerald)',
    styleLabel: 'Art Deco Megah & Zamrud Malam',
    demoComponentKey: 'malam-zamrud',
    coverThumbnail: '/src/assets/images/art_deco_emerald_couple_1790840336340.jpg',
    description: 'Kemewahan palet onyx malam dan emas kuningan Art Deco dengan fitur panduan dresscode dan amplop multi-rekening.',
    hasDresscode: true,
    hasFilmstrip: false,
    hasStoryChapters: true,
    hasWaxSeal: false,
    mediaSlots: [
      {
        key: 'heroImage',
        label: 'Foto Hero Onyx Art Deco',
        description: 'Latar pembuka suasana malam megah ballroom',
        aspectRatio: '16:9'
      },
      {
        key: 'bridePortrait',
        label: 'Potret Mempelai Wanita Art Deco',
        description: 'Foto potret mempelai wanita berbingkai kubah lengkung',
        aspectRatio: '3:4'
      },
      {
        key: 'groomPortrait',
        label: 'Potret Mempelai Pria Art Deco',
        description: 'Foto potret mempelai pria berbingkai kubah lengkung',
        aspectRatio: '3:4'
      },
      {
        key: 'qrisImageUrl',
        label: 'Barcode QRIS Tanda Kasih',
        description: 'Gambar QRIS untuk penerimaan tanda kasih tamu instan',
        aspectRatio: '1:1'
      },
      {
        key: 'galleryImages',
        label: 'Galeri Kemewahan Resepsi (Bebas Jumlah)',
        description: 'Foto-foto venue, cincin, dan kemewahan resepsi',
        aspectRatio: '3:4 atau 1:1',
        isMultiple: true
      }
    ],
    defaultData: {
      brideName: 'Kirana',
      brideFullName: 'Kirana Ayu Lestari',
      brideParents: 'Putri tercinta Bapak Hendra Wijaya & Ibu Sinta Maharani',
      groomName: 'Adhitya',
      groomFullName: 'Adhitya Nugraha',
      groomParents: 'Putra tercinta Bapak Suryanto Nugraha & Ibu Ratna Dewi',
      eventDateFormatted: 'Sabtu, 14 Februari 2027',
      countdownIsoDate: '2027-02-14T08:00:00',
      akadTime: '08.00 – 10.00 WIB',
      akadVenue: 'Grand Ballroom Aryaduta Hotel',
      resepsiTime: '11.00 – 14.00 WIB',
      resepsiVenue: 'Grand Ballroom Aryaduta Hotel',
      city: 'Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
      quoteText: 'Bunga melati tumbuh berseri, mekar indah di taman hati. Dua insan berjanji sehidup semati, menyatu dalam ikatan suci.',
      quoteSource: 'Syair Kasih Klasik',
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountHolder: 'Kirana Ayu Lestari',
      secondaryBankName: 'Bank Mandiri',
      secondaryAccountNumber: '140001928374',
      secondaryAccountHolder: 'Adhitya Nugraha',
      songTitle: 'Midnight Waltz - Gatsby Evening Strings'
    }
  },

  'setangkai': {
    id: 'setangkai',
    name: 'Damar & Alya (Kertas Putih & Sage)',
    styleLabel: 'Botanikal Sage & Kertas Gading',
    demoComponentKey: 'damar-alya',
    coverThumbnail: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
    description: 'Nuansa kertas gading dan dedaunan sage outdoor yang menenangkan dengan panggung desktop interaktif dan wipe-reveal.',
    hasDresscode: false,
    hasFilmstrip: false,
    hasStoryChapters: true,
    hasWaxSeal: false,
    mediaSlots: [
      {
        key: 'heroImage',
        label: 'Foto Hero Sage Outdoor',
        description: 'Potret pasangan di alam terbuka bertema sage green',
        aspectRatio: '16:9'
      },
      {
        key: 'bridePortrait',
        label: 'Foto Mempelai Wanita (Alya)',
        description: 'Potret pengantin wanita bergaya gading natural',
        aspectRatio: '4:5'
      },
      {
        key: 'groomPortrait',
        label: 'Foto Mempelai Pria (Damar)',
        description: 'Potret pengantin pria berlatar alam teduh',
        aspectRatio: '4:5'
      },
      {
        key: 'galleryImages',
        label: 'Galeri Wipe-Reveal (Bebas Jumlah)',
        description: 'Koleksi foto horizontal dan vertikal',
        aspectRatio: '4:5',
        isMultiple: true
      }
    ],
    defaultData: {
      brideName: 'Alya',
      brideFullName: 'Alya Puspita Ningrum',
      brideParents: 'Putri dari Bapak Bambang Tri Atmojo & Ibu Sri Wahyuni',
      groomName: 'Damar',
      groomFullName: 'Damar Aji Wibisono',
      groomParents: 'Putra dari Bapak Suhartono Wibisono & Ibu Endang Lestari',
      eventDateFormatted: 'Sabtu, 14 November 2026',
      countdownIsoDate: '2026-11-14T07:30:00',
      akadTime: '07.30 – 09.00 WIB',
      akadVenue: 'Griya Kunang Estate, Jl. Kaliurang Km. 12',
      resepsiTime: '10.30 – 13.30 WIB',
      resepsiVenue: 'Griya Kunang Lawn & Pavilion',
      city: 'Sleman, Yogyakarta',
      mapsUrl: 'https://maps.google.com',
      quoteText: 'Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup, agar engkau merasa tenteram di sisinya.',
      quoteSource: 'QS. Ar-Rum : 21',
      bankName: 'BCA',
      accountNumber: '8801234567',
      accountHolder: 'Damar Aji Wibisono',
      songTitle: 'Until I Found You - Acoustic Strings'
    }
  },

  'suasana': {
    id: 'suasana',
    name: 'Jurnal Dua Hati (Buku Catatan Vintage)',
    styleLabel: 'Jurnal Antik & Buku Bersegel Lilin',
    demoComponentKey: 'jurnal-dua-hati',
    coverThumbnail: '/src/assets/images/film_vintage_couple_1791034007642.jpg',
    description: 'Sensasi membuka buku jurnal antik bersampul kulit navy, segel lilin emas, dan foto-foto polaroid miring organik.',
    hasDresscode: true,
    hasFilmstrip: false,
    hasStoryChapters: true,
    hasWaxSeal: true,
    mediaSlots: [
      {
        key: 'waxSealEmblem',
        label: 'Emblem Segel Lilin Emas',
        description: 'Segel lilin monogram pada sampul buku jurnal',
        aspectRatio: '1:1'
      },
      {
        key: 'heroImage',
        label: 'Foto Pembuka Lembar Jurnal',
        description: 'Potret berlatar piringan hitam dan halaman bergaris',
        aspectRatio: '16:9'
      },
      {
        key: 'bridePortrait',
        label: 'Foto Polaroid Mempelai Wanita',
        description: 'Potret polaroid dengan sudut miring hangat',
        aspectRatio: '1:1'
      },
      {
        key: 'groomPortrait',
        label: 'Foto Polaroid Mempelai Pria',
        description: 'Potret polaroid dengan sudut miring hangat',
        aspectRatio: '1:1'
      },
      {
        key: 'galleryImages',
        label: 'Koleksi Lembar Foto Polaroid (Bebas Jumlah)',
        description: 'Koleksi polaroid interaktif yang terangkat saat disentuh',
        aspectRatio: '1:1',
        isMultiple: true
      }
    ],
    defaultData: {
      brideName: 'Kirana',
      brideFullName: 'Kirana Ayu Lestari',
      brideParents: 'Putri Bapak Hendra Wijaya & Ibu Sinta Maharani',
      groomName: 'Adhitya',
      groomFullName: 'Adhitya Nugraha',
      groomParents: 'Putra Bapak Suryanto Nugraha & Ibu Ratna Dewi',
      eventDateFormatted: 'Minggu, 14 Februari 2027',
      countdownIsoDate: '2027-02-14T08:00:00',
      akadTime: '08.00 – 10.00 WIB',
      akadVenue: 'Paviliun Joglo Heritage Aryaduta',
      resepsiTime: '11.00 – 14.00 WIB',
      resepsiVenue: 'Taman Asri Ballroom Aryaduta',
      city: 'Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
      quoteText: 'Di lembar hari yang tenang, kisah kita ditulis dengan doa dan harapan suci.',
      quoteSource: 'Catatan Kasih Dua Hati',
      bankName: 'BCA',
      accountNumber: '8271029384',
      accountHolder: 'Kirana Ayu Lestari',
      songTitle: 'Nostalgic Vinyl Strings - Acoustic Serenade'
    }
  },

  'lembayung': {
    id: 'lembayung',
    name: 'Larasati & Fajar (Reel Sinematik 35mm)',
    styleLabel: 'Reel Film Analog 35mm & Tiket Bioskop',
    demoComponentKey: 'reel-sinematik',
    coverThumbnail: '/src/assets/images/film_vintage_couple_1791034007642.jpg',
    description: 'Sensasi rol film analog 35mm lengkap dengan perforasi film, reservasi tiket bioskop klasik, dan layar akhir TAMAT.',
    hasDresscode: false,
    hasFilmstrip: true,
    hasStoryChapters: false,
    hasWaxSeal: false,
    mediaSlots: [
      {
        key: 'heroImage',
        label: 'Frame Rol Film Pembuka (35mm)',
        description: 'Frame film utama dengan grain dan efek analog hangat',
        aspectRatio: '3:2'
      },
      {
        key: 'bridePortrait',
        label: 'Frame Rol Mempelai Wanita (Larasati)',
        description: 'Potret pengantin wanita bergaya analog retro',
        aspectRatio: '4:5'
      },
      {
        key: 'groomPortrait',
        label: 'Frame Rol Mempelai Pria (Fajar)',
        description: 'Potret pengantin pria bergaya vintage blazer',
        aspectRatio: '4:5'
      },
      {
        key: 'filmstripImages',
        label: 'Deretan Frame Filmstrip Klise (Bebas Jumlah)',
        description: 'Rangkaian foto klise film 35mm berlubang perforasi tanpa batas kuota',
        aspectRatio: '3:2',
        isMultiple: true
      },
      {
        key: 'galleryImages',
        label: 'Papan Foto Polaroid Gabus (Corkboard)',
        description: 'Foto momen tersemat jarum pentul merah di papan gabus',
        aspectRatio: '1:1',
        isMultiple: true
      }
    ],
    defaultData: {
      brideName: 'Larasati',
      brideFullName: 'Larasati Sekar Kinanti, S.Sn.',
      brideParents: 'Putri tercinta Bapak Danang Triputra & Ibu Ratna Susilowati',
      groomName: 'Fajar',
      groomFullName: 'Fajar Nugraha Pratama, S.T.',
      groomParents: 'Putra tercinta Bapak Hendrawan Pratama & Ibu Nuraini Dewi',
      eventDateFormatted: 'Sabtu, 24 Oktober 2026',
      countdownIsoDate: '2026-10-24T08:00:00',
      akadTime: '08.00 – 10.00 WIB',
      akadVenue: 'Paviliun Rinjani, Sanur Heritage Estate',
      resepsiTime: '11.00 – 15.00 WIB',
      resepsiVenue: 'Amphitheater Garden, Sanur Estate',
      city: 'Denpasar, Bali',
      mapsUrl: 'https://maps.google.com',
      quoteText: 'Seperti rol film 35mm yang merekam tiap detik berharga, cinta kita adalah sinema abadi yang tak lekang waktu.',
      quoteSource: 'Sinema Kasih Kita',
      bankName: 'Bank BRI',
      accountNumber: '034101002938501',
      accountHolder: 'Fajar Nugraha Pratama',
      secondaryBankName: 'Bank BCA',
      secondaryAccountNumber: '8271029384',
      secondaryAccountHolder: 'Larasati Sekar Kinanti',
      songTitle: 'Lagu Senja Analog - 35mm Acoustic Tape'
    }
  }
};
