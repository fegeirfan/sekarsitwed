import { ClientInvitationData, TemplateId } from '../types/clientInvitation';
import { TEMPLATE_REGISTRY } from './templateRegistry';

const STORAGE_KEY = 'sekarsiti_client_invitations_v1';

// Initial Seed Orders so the admin is never empty upon opening
const INITIAL_SEED_ORDERS: ClientInvitationData[] = [
  {
    id: 'INV-2027-001',
    clientName: 'Kirana & Adhitya',
    clientPhone: '081298765432',
    clientEmail: 'kirana.lestari@gmail.com',
    templateId: 'ruang-rasa',
    status: 'published',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-03T12:30:00Z',
    slug: 'kirana-adhitya',
    accessCode: 'kirana-adhitya',
    pinCode: '7429',
    guestLinks: [
      { id: 'gl-1', guestName: 'Bpk. Ir. Hendra & Keluarga', category: 'Keluarga', createdAt: '2026-10-02T10:00:00Z', isSent: true },
      { id: 'gl-2', guestName: 'dr. Farah Amanda', category: 'Sahabat', createdAt: '2026-10-02T11:30:00Z', isSent: true },
      { id: 'gl-3', guestName: 'Raka & Dian (Kantor)', category: 'Rekan Kerja', createdAt: '2026-10-03T09:15:00Z', isSent: false }
    ],
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
    songTitle: 'Until I Found You - Stephen Sanchez (Violin Solo)',
    mediaSlots: {
      heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
      bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
      groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
      galleryImages: [
        '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg',
        '/src/assets/images/wedding_shoes_jewelry_1790901548736.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
      ]
    },
    guestbookEntries: [
      { name: 'Raditya & Vanya', message: 'Selamat berbahagia Kirana & Adhitya!', time: '2 jam lalu' }
    ]
  },
  {
    id: 'INV-2026-002',
    clientName: 'Damar & Alya',
    clientPhone: '085712348765',
    clientEmail: 'damar.wibisono@gmail.com',
    templateId: 'setangkai',
    status: 'in_progress',
    createdAt: '2026-10-02T14:15:00Z',
    updatedAt: '2026-10-03T16:00:00Z',
    slug: 'damar-alya',
    accessCode: 'damar-alya',
    pinCode: '5812',
    guestLinks: [
      { id: 'gl-201', guestName: 'Keluarga Besar Wibisono', category: 'Keluarga', createdAt: '2026-10-02T15:00:00Z', isSent: true }
    ],
    brideName: 'Alya',
    brideFullName: 'Alya Puspita Ningrum',
    brideParents: 'Putri Bapak Bambang Tri Atmojo & Ibu Sri Wahyuni',
    groomName: 'Damar',
    groomFullName: 'Damar Aji Wibisono',
    groomParents: 'Putra Bapak Suhartono Wibisono & Ibu Endang Lestari',
    eventDateFormatted: 'Sabtu, 14 November 2026',
    countdownIsoDate: '2026-11-14T07:30:00',
    akadTime: '07.30 – 09.00 WIB',
    akadVenue: 'Griya Kunang Estate, Jl. Kaliurang Km. 12',
    resepsiTime: '10.30 – 13.30 WIB',
    resepsiVenue: 'Griya Kunang Lawn & Pavilion',
    city: 'Sleman, Yogyakarta',
    mapsUrl: 'https://maps.google.com',
    quoteText: 'Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup.',
    quoteSource: 'QS. Ar-Rum : 21',
    bankName: 'BCA',
    accountNumber: '8801234567',
    accountHolder: 'Damar Aji Wibisono',
    songTitle: 'Until I Found You - Acoustic Strings',
    mediaSlots: {
      heroImage: '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
      bridePortrait: '/src/assets/images/wedding_bride_portrait_1790833939171.jpg',
      groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
      galleryImages: [
        '/src/assets/images/sage_outdoor_couple_portrait_1790919006777.jpg',
        '/src/assets/images/botanical_estate_venue_1790919022237.jpg'
      ]
    }
  },
  {
    id: 'INV-2026-003',
    clientName: 'Larasati & Fajar',
    clientPhone: '081399887766',
    templateId: 'lembayung',
    status: 'published',
    createdAt: '2026-10-03T09:00:00Z',
    updatedAt: '2026-10-03T18:00:00Z',
    slug: 'larasati-fajar',
    accessCode: 'larasati-fajar',
    pinCode: '9134',
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
    quoteText: 'Seperti rol film 35mm yang merekam tiap detik berharga, cinta kita adalah sinema abadi.',
    quoteSource: 'Sinema Kasih Kita',
    bankName: 'Bank BRI',
    accountNumber: '034101002938501',
    accountHolder: 'Fajar Nugraha Pratama',
    songTitle: 'Lagu Senja Analog - 35mm Acoustic Tape',
    mediaSlots: {
      heroImage: '/src/assets/images/film_vintage_couple_1791034007642.jpg',
      filmstripImages: [
        '/src/assets/images/film_vintage_couple_1791034007642.jpg',
        '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg',
        '/src/assets/images/wedding_dance_lights_1790901533590.jpg'
      ],
      galleryImages: [
        '/src/assets/images/film_vintage_couple_1791034007642.jpg',
        '/src/assets/images/editorial_venue_rings_1790838653826.jpg'
      ]
    }
  }
];

export interface AdminStoreStats {
  total: number;
  published: number;
  inProgress: number;
  review: number;
  pending: number;
  totalGuests: number;
}

type StoreListener = () => void;

export class AdminStore {
  private static listeners: Set<StoreListener> = new Set();

  static subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notify(): void {
    this.listeners.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('Error in AdminStore listener', err);
      }
    });
  }

  private static getStore(): ClientInvitationData[] {
    if (typeof window === 'undefined') return INITIAL_SEED_ORDERS;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ORDERS));
      return INITIAL_SEED_ORDERS;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        let hasChanges = false;
        const normalized = parsed.map((item: ClientInvitationData, idx: number) => {
          const updated = { ...item };
          if (!updated.accessCode) {
            updated.accessCode = updated.slug || updated.id;
            hasChanges = true;
          }
          if (!updated.pinCode) {
            updated.pinCode = String(1000 + ((idx * 173 + 7429) % 9000));
            hasChanges = true;
          }
          if (!updated.guestLinks) {
            updated.guestLinks = [];
            hasChanges = true;
          }
          return updated;
        });
        if (hasChanges) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        }
        return normalized;
      }
      return INITIAL_SEED_ORDERS;
    } catch {
      return INITIAL_SEED_ORDERS;
    }
  }

  private static saveStore(data: ClientInvitationData[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.notify();
  }

  static getAll(): ClientInvitationData[] {
    return this.getStore();
  }

  static getById(id: string): ClientInvitationData | undefined {
    return this.getStore().find(item => item.id === id || item.slug === id);
  }

  static getStats(): AdminStoreStats {
    const list = this.getStore();
    return {
      total: list.length,
      published: list.filter(i => i.status === 'published').length,
      inProgress: list.filter(i => i.status === 'in_progress').length,
      review: list.filter(i => i.status === 'review').length,
      pending: list.filter(i => i.status === 'pending').length,
      totalGuests: list.reduce((acc, curr) => acc + (curr.rsvpList?.length || 0), 0)
    };
  }

  static create(payload: Partial<ClientInvitationData>): ClientInvitationData {
    const orders = this.getStore();
    const id = `INV-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    const templateId = payload.templateId || 'ruang-rasa';
    const templateDefaults = TEMPLATE_REGISTRY[templateId].defaultData;

    const slug = (payload.clientName || 'undangan-klien')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `undangan-${Date.now()}`;

    const newOrder: ClientInvitationData = {
      id,
      clientName: payload.clientName || 'Klien Baru',
      clientPhone: payload.clientPhone || '',
      clientEmail: payload.clientEmail || '',
      templateId,
      status: payload.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug,
      brideName: payload.brideName || templateDefaults.brideName || '',
      brideFullName: payload.brideFullName || templateDefaults.brideFullName || '',
      brideParents: payload.brideParents || templateDefaults.brideParents || '',
      brideInstagram: payload.brideInstagram || templateDefaults.brideInstagram || '',
      groomName: payload.groomName || templateDefaults.groomName || '',
      groomFullName: payload.groomFullName || templateDefaults.groomFullName || '',
      groomParents: payload.groomParents || templateDefaults.groomParents || '',
      groomInstagram: payload.groomInstagram || templateDefaults.groomInstagram || '',
      eventDateFormatted: payload.eventDateFormatted || templateDefaults.eventDateFormatted || 'Minggu, 14 Februari 2027',
      countdownIsoDate: payload.countdownIsoDate || templateDefaults.countdownIsoDate || '2027-02-14T08:00:00',
      akadTime: payload.akadTime || templateDefaults.akadTime || '08.00 – 10.00 WIB',
      akadVenue: payload.akadVenue || templateDefaults.akadVenue || 'Masjid / Gedung Akad',
      resepsiTime: payload.resepsiTime || templateDefaults.resepsiTime || '11.00 – 14.00 WIB',
      resepsiVenue: payload.resepsiVenue || templateDefaults.resepsiVenue || 'Grand Ballroom',
      city: payload.city || templateDefaults.city || 'Jakarta',
      mapsUrl: payload.mapsUrl || templateDefaults.mapsUrl || 'https://maps.google.com',
      quoteText: payload.quoteText || templateDefaults.quoteText || '',
      quoteSource: payload.quoteSource || templateDefaults.quoteSource || '',
      bankName: payload.bankName || templateDefaults.bankName || 'BCA',
      accountNumber: payload.accountNumber || templateDefaults.accountNumber || '1234567890',
      accountHolder: payload.accountHolder || templateDefaults.accountHolder || '',
      secondaryBankName: payload.secondaryBankName || '',
      secondaryAccountNumber: payload.secondaryAccountNumber || '',
      secondaryAccountHolder: payload.secondaryAccountHolder || '',
      qrisImageUrl: payload.qrisImageUrl || '',
      songTitle: payload.songTitle || templateDefaults.songTitle || 'Until I Found You',
      mediaSlots: payload.mediaSlots || {
        heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
        galleryImages: [
          '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
          '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg'
        ]
      },
      accessCode: payload.accessCode || slug || id,
      pinCode: payload.pinCode || String(Math.floor(1000 + Math.random() * 9000)),
      guestLinks: payload.guestLinks || [],
      guestbookEntries: payload.guestbookEntries || [],
      rsvpList: payload.rsvpList || []
    };

    orders.unshift(newOrder);
    this.saveStore(orders);
    return newOrder;
  }

  // Get invitation by client access credentials (code & PIN)
  static getByAccess(code: string, pin: string): ClientInvitationData | null {
    if (!code || !pin) return null;
    const cleanCode = code.trim().toLowerCase();
    const cleanPin = pin.trim();
    const orders = this.getStore();
    
    return orders.find(item => {
      const matchCode = 
        (item.accessCode && item.accessCode.toLowerCase() === cleanCode) ||
        (item.slug && item.slug.toLowerCase() === cleanCode) ||
        (item.id && item.id.toLowerCase() === cleanCode);
      
      const matchPin = item.pinCode ? item.pinCode === cleanPin : true;
      return matchCode && matchPin;
    }) || null;
  }

  // Add a personalized guest WhatsApp link from client portal
  static addGuestLink(
    invitationId: string,
    guestData: { guestName: string; category?: string; phone?: string }
  ): { success: boolean; link: any } {
    const orders = this.getStore();
    const index = orders.findIndex(o => o.id === invitationId || o.slug === invitationId);
    if (index === -1) return { success: false, link: null };

    const newLink = {
      id: `gl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      guestName: guestData.guestName.trim(),
      category: guestData.category || 'Tamu Undangan',
      phone: guestData.phone?.trim() || '',
      createdAt: new Date().toISOString(),
      isSent: false
    };

    const currentLinks = orders[index].guestLinks || [];
    orders[index] = {
      ...orders[index],
      guestLinks: [newLink, ...currentLinks],
      updatedAt: new Date().toISOString()
    };

    this.saveStore(orders);
    return { success: true, link: newLink };
  }

  // Toggle guest link sent status
  static toggleGuestLinkSent(invitationId: string, linkId: string): void {
    const orders = this.getStore();
    const index = orders.findIndex(o => o.id === invitationId || o.slug === invitationId);
    if (index === -1) return;

    const currentLinks = orders[index].guestLinks || [];
    orders[index] = {
      ...orders[index],
      guestLinks: currentLinks.map(l => l.id === linkId ? { ...l, isSent: !l.isSent } : l),
      updatedAt: new Date().toISOString()
    };
    this.saveStore(orders);
  }

  // Delete guest link
  static deleteGuestLink(invitationId: string, linkId: string): void {
    const orders = this.getStore();
    const index = orders.findIndex(o => o.id === invitationId || o.slug === invitationId);
    if (index === -1) return;

    const currentLinks = orders[index].guestLinks || [];
    orders[index] = {
      ...orders[index],
      guestLinks: currentLinks.filter(l => l.id !== linkId),
      updatedAt: new Date().toISOString()
    };
    this.saveStore(orders);
  }

  // Add RSVP from guest
  static addRsvp(
    invitationId: string,
    rsvp: { name: string; attendance: string; count: number }
  ): void {
    const orders = this.getStore();
    const index = orders.findIndex(o => o.id === invitationId || o.slug === invitationId);
    if (index === -1) return;

    const currentRsvp = orders[index].rsvpList || [];
    orders[index] = {
      ...orders[index],
      rsvpList: [
        {
          name: rsvp.name,
          attendance: rsvp.attendance,
          count: rsvp.count,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        },
        ...currentRsvp
      ],
      updatedAt: new Date().toISOString()
    };
    this.saveStore(orders);
  }

  // Add guestbook message
  static addGuestbook(
    invitationId: string,
    entry: { name: string; message: string }
  ): void {
    const orders = this.getStore();
    const index = orders.findIndex(o => o.id === invitationId || o.slug === invitationId);
    if (index === -1) return;

    const currentEntries = orders[index].guestbookEntries || [];
    orders[index] = {
      ...orders[index],
      guestbookEntries: [
        {
          name: entry.name,
          message: entry.message,
          time: 'Baru saja'
        },
        ...currentEntries
      ],
      updatedAt: new Date().toISOString()
    };
    this.saveStore(orders);
  }

  static update(id: string, updates: Partial<ClientInvitationData>): ClientInvitationData {
    const orders = this.getStore();
    const index = orders.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }

    const updated: ClientInvitationData = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    orders[index] = updated;
    this.saveStore(orders);
    return updated;
  }

  static delete(id: string): void {
    const orders = this.getStore().filter(item => item.id !== id);
    this.saveStore(orders);
  }

  static duplicate(id: string): ClientInvitationData {
    const original = this.getById(id);
    if (!original) throw new Error('Original not found');

    return this.create({
      ...original,
      clientName: `${original.clientName} (Salinan)`,
      status: 'pending'
    });
  }

  static generateShareLink(invitation: ClientInvitationData, guestName?: string): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const baseUrl = `${origin}/?client=${invitation.id}`;
    if (!guestName || !guestName.trim()) return baseUrl;
    return `${baseUrl}&to=${encodeURIComponent(guestName.trim())}`;
  }

  static generateWhatsAppMessage(invitation: ClientInvitationData, guestName: string): string {
    const cleanGuest = guestName.trim() || 'Bapak/Ibu/Saudara/i';
    const link = this.generateShareLink(invitation, guestName);

    return `Kepada Yth.
${cleanGuest},

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Anda untuk hadir pada perayaan pernikahan kami:

${invitation.brideName} & ${invitation.groomName}
Hari/Tanggal: ${invitation.eventDateFormatted}
Tempat: ${invitation.resepsiVenue}, ${invitation.city}

Tautan Undangan Resmi Digital Anda:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Hormat kami yang berbahagia,
${invitation.brideName} & ${invitation.groomName}`;
  }

  static generateBatchLinks(invitation: ClientInvitationData, guestNames: string[]) {
    return guestNames
      .map(name => name.trim())
      .filter(Boolean)
      .map(name => ({
        guestName: name,
        link: this.generateShareLink(invitation, name),
        message: this.generateWhatsAppMessage(invitation, name)
      }));
  }

  // Backup & Restore
  static exportAllAsJson(): void {
    const data = this.getStore();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sekarsiti_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static importJsonBackup(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        return { success: false, count: 0, error: 'Format data JSON tidak valid: bukan daftar undangan.' };
      }
      // Basic validation
      const validOrders = parsed.filter(item => item && item.id && item.clientName);
      if (validOrders.length === 0) {
        return { success: false, count: 0, error: 'Tidak ditemukan data undangan yang valid dalam file.' };
      }
      this.saveStore(validOrders);
      return { success: true, count: validOrders.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err?.message || 'Gagal memproses file JSON.' };
    }
  }

  static resetToDefaultSeed(): void {
    this.saveStore(INITIAL_SEED_ORDERS);
  }

  // Export RSVP to CSV
  static exportRsvpToCsv(invitation: ClientInvitationData): void {
    const rsvpList = invitation.rsvpList || [];
    const headers = ['No', 'Nama Tamu', 'Konfirmasi Kehadiran', 'Jumlah Tamu', 'Tanggal RSVP'];
    const rows = rsvpList.map((item, index) => [
      index + 1,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.attendance}"`,
      item.count,
      `"${item.date || '-'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp_${invitation.slug || invitation.id}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Export Guestbook to CSV
  static exportGuestbookToCsv(invitation: ClientInvitationData): void {
    const wishes = invitation.guestbookEntries || [];
    const headers = ['No', 'Nama Pengirim', 'Ucapan dan Doa Restu', 'Waktu'];
    const rows = wishes.map((item, index) => [
      index + 1,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.message.replace(/"/g, '""')}"`,
      `"${item.time || '-'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ucapan_${invitation.slug || invitation.id}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
