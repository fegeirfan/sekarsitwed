import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Send, 
  Users, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Download, 
  Lock, 
  KeyRound, 
  LogOut, 
  MessageSquare, 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Sparkles,
  Phone,
  Check,
  AlertCircle
} from 'lucide-react';
import { ClientInvitationData } from '../../types/clientInvitation';
import { AdminStore } from '../../admin/adminStore';

interface ClientPortalProps {
  initialCode?: string;
  initialPin?: string;
  onBackToHome: () => void;
  onOpenInvitation: (invitation: ClientInvitationData) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  initialCode = '',
  initialPin = '',
  onBackToHome,
  onOpenInvitation
}) => {
  // Login state
  const [accessCodeInput, setAccessCodeInput] = useState(initialCode);
  const [pinCodeInput, setPinCodeInput] = useState(initialPin);
  const [currentClient, setCurrentClient] = useState<ClientInvitationData | null>(null);
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'share' | 'rsvp' | 'wishes' | 'info'
  const [activeTab, setActiveTab] = useState<'share' | 'rsvp' | 'wishes' | 'info'>('share');

  // Generator form
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState('Keluarga');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [guestSearchQuery, setGuestSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Auto-login if params provided
  useEffect(() => {
    if (initialCode && initialPin) {
      const found = AdminStore.getByAccess(initialCode, initialPin);
      if (found) {
        setCurrentClient(found);
      } else {
        setLoginError('Kode akses atau PIN sandi tidak sesuai.');
      }
    }
  }, [initialCode, initialPin]);

  // Subscribe to store updates to keep RSVP & GuestLinks live
  useEffect(() => {
    const unsubscribe = AdminStore.subscribe(() => {
      if (currentClient) {
        const fresh = AdminStore.getById(currentClient.id);
        if (fresh) setCurrentClient(fresh);
      }
    });
    return unsubscribe;
  }, [currentClient]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!accessCodeInput.trim() || !pinCodeInput.trim()) {
      setLoginError('Silakan masukkan Kode Akses dan PIN Sandi Anda.');
      return;
    }

    const found = AdminStore.getByAccess(accessCodeInput, pinCodeInput);
    if (found) {
      setCurrentClient(found);
      setLoginError('');
    } else {
      setLoginError('Kombinasi Kode Akses atau PIN sandi salah. Silakan periksa kembali pesan dari Admin Sekarsiti.');
    }
  };

  const handleLogout = () => {
    setCurrentClient(null);
    setAccessCodeInput('');
    setPinCodeInput('');
  };

  // Base URL for invitation
  const getBaseInvitationUrl = (guestParam?: string) => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}${window.location.pathname}?client=${currentClient?.id || ''}`;
    if (guestParam) {
      return `${base}&to=${encodeURIComponent(guestParam)}`;
    }
    return base;
  };

  // Build warm WhatsApp invitation text
  const generateWhatsAppMessage = (guestName: string) => {
    if (!currentClient) return '';
    const link = getBaseInvitationUrl(guestName);
    return `Kepada Yth.
*${guestName}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:

*${currentClient.brideName} & ${currentClient.groomName}*
🗓 ${currentClient.eventDateFormatted}
📍 ${currentClient.resepsiVenue}, ${currentClient.city}

Tautan undangan digital personal Anda:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Terima kasih,
*${currentClient.brideName} & ${currentClient.groomName}*`;
  };

  const handleCreateGuestLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClient || !newGuestName.trim()) return;

    AdminStore.addGuestLink(currentClient.id, {
      guestName: newGuestName.trim(),
      category: newGuestCategory,
      phone: newGuestPhone.trim()
    });

    setNewGuestName('');
    setNewGuestPhone('');
  };

  const handleToggleSent = (linkId: string) => {
    if (!currentClient) return;
    AdminStore.toggleGuestLinkSent(currentClient.id, linkId);
  };

  const handleDeleteLink = (linkId: string) => {
    if (!currentClient) return;
    if (window.confirm('Hapus tamu ini dari daftar sebar?')) {
      AdminStore.deleteGuestLink(currentClient.id, linkId);
    }
  };

  const handleCopy = (text: string, type: 'link' | 'text') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const handleSendViaWhatsApp = (guestName: string, phone?: string) => {
    const message = generateWhatsAppMessage(guestName);
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
    const waUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // RSVP stats calculation
  const rsvpList = currentClient?.rsvpList || [];
  const totalRsvpCount = rsvpList.length;
  const attendingGuests = rsvpList.filter(r => r.attendance.toLowerCase().includes('hadir') && !r.attendance.toLowerCase().includes('tidak'));
  const totalAttendingPax = attendingGuests.reduce((acc, curr) => acc + (curr.count || 1), 0);
  const uncertainGuests = rsvpList.filter(r => r.attendance.toLowerCase().includes('ragu'));
  const declinedGuests = rsvpList.filter(r => r.attendance.toLowerCase().includes('tidak') || r.attendance.toLowerCase().includes('berhalangan'));

  // Filtered guest links
  const filteredLinks = (currentClient?.guestLinks || []).filter(l => 
    l.guestName.toLowerCase().includes(guestSearchQuery.toLowerCase()) ||
    (l.category && l.category.toLowerCase().includes(guestSearchQuery.toLowerCase()))
  );

  // -------------------------------------------------------------
  // VIEW A: LOGIN SCREEN
  // -------------------------------------------------------------
  if (!currentClient) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-between text-[#2C2E28] font-sans selection:bg-[#E2DDD3]">
        {/* Navigation Bar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-[#E8E4DA] bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToHome}
              className="font-serif text-lg tracking-wider font-semibold text-[#141413] hover:text-[#C5A880] transition-colors"
            >
              sekarsiti.
            </button>
            <span className="text-xs bg-[#C5A880]/15 text-[#8C6D3F] px-2 py-0.5 rounded-full font-medium">
              Portal Mempelai
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            ← Kembali ke Beranda
          </button>
        </header>

        {/* Login Form Container */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E8E4DA] p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A880]/30 mx-auto flex items-center justify-center text-[#C5A880]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                Portal Mempelai
              </h1>
              <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                Masuk untuk membuat link sebar WhatsApp personal dan memantau konfirmasi kehadiran katering secara langsung.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Kode Akses Undangan</span>
                </label>
                <input
                  type="text"
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value)}
                  placeholder="Contoh: kirana-adhitya atau INV-2027-001"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-all bg-stone-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Sandi / PIN Akses</span>
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinCodeInput}
                  onChange={(e) => setPinCodeInput(e.target.value)}
                  placeholder="4 digit sandi (misal: 7429)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-all bg-stone-50/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#141413] hover:bg-[#2C2E28] text-[#FAF8F3] py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Masuk ke Portal</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="pt-4 border-t border-stone-100 text-center space-y-2">
              <span className="text-[11px] text-stone-400 block">
                Ingin mencoba tampilan portal mempelai?
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setAccessCodeInput('kirana-adhitya');
                    setPinCodeInput('7429');
                  }}
                  className="text-[11px] bg-stone-100 hover:bg-[#C5A880]/20 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 transition-colors"
                >
                  Demo: Kirana & Adhitya (PIN: 7429)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccessCodeInput('damar-alya');
                    setPinCodeInput('5812');
                  }}
                  className="text-[11px] bg-stone-100 hover:bg-[#C5A880]/20 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 transition-colors"
                >
                  Demo: Damar & Alya (PIN: 5812)
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-4 text-xs text-stone-400">
          Sekarsiti Studio • Hak Cipta Terpelihara
        </footer>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: LOGGED-IN CLIENT PORTAL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2E28] font-sans selection:bg-[#E2DDD3]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E4DA] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-stone-900 tracking-tight">
              sekarsiti.
            </span>
            <div className="hidden sm:block h-4 w-px bg-stone-300" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                  {currentClient.brideName} & {currentClient.groomName}
                </h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Undangan Aktif
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-mono hidden sm:block">
                ID: {currentClient.id} • Kode: {currentClient.accessCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onOpenInvitation(currentClient)}
              className="text-xs bg-[#FAF7F2] hover:bg-[#F3EAD9] text-stone-800 border border-[#C5A880]/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
            >
              <span>Buka Undangan</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-stone-500 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'share'
                ? 'border-[#C5A880] text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Send className="w-4 h-4 text-[#C5A880]" />
            <span>Sebar Undangan WhatsApp</span>
            <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded-full text-stone-600 font-normal">
              {(currentClient.guestLinks || []).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rsvp')}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'rsvp'
                ? 'border-[#C5A880] text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4 text-[#C5A880]" />
            <span>Pantau RSVP & Katering</span>
            <span className="text-[10px] bg-[#C5A880]/20 text-[#8C6D3F] px-1.5 py-0.5 rounded-full font-bold">
              {totalAttendingPax} Hadir
            </span>
          </button>

          <button
            onClick={() => setActiveTab('wishes')}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'wishes'
                ? 'border-[#C5A880] text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            <span>Doa & Buku Tamu</span>
            <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded-full text-stone-600 font-normal">
              {(currentClient.guestbookEntries || []).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'info'
                ? 'border-[#C5A880] text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Data Acara & Kado</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: WHATSAPP LINK GENERATOR */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'share' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Buat Link Tamu */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Buat Link Undangan Baru</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Ketik nama tamu undangan. Sistem akan otomatis membuatkan tautan khusus dengan nama penerima yang muncul di sampul depan undangan.
                </p>
              </div>

              <form onSubmit={handleCreateGuestLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nama Tamu Undangan *
                  </label>
                  <input
                    type="text"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Contoh: Bpk. Ir. Hendra & Ibu / Sahabat SMA"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={newGuestCategory}
                      onChange={(e) => setNewGuestCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white focus:ring-2 focus:ring-[#C5A880]/50 outline-none"
                    >
                      <option value="Keluarga">Keluarga</option>
                      <option value="Sahabat">Sahabat Dekat</option>
                      <option value="Rekan Kerja">Rekan Kerja</option>
                      <option value="VIP">Tamu VIP</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      No. WhatsApp (Opsional)
                    </label>
                    <input
                      type="tel"
                      value={newGuestPhone}
                      onChange={(e) => setNewGuestPhone(e.target.value)}
                      placeholder="08123456789"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#C5A880]/50 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!newGuestName.trim()}
                  className="w-full bg-[#141413] hover:bg-[#2C2E28] disabled:opacity-50 text-[#FAF8F3] py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Simpan & Buat Tautan</span>
                </button>
              </form>

              {/* Pratinjau Teks WhatsApp */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Pratinjau Format Pesan Sebar:
                </span>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {generateWhatsAppMessage(newGuestName || 'Nama Tamu')}
                </div>
              </div>
            </div>

            {/* Daftar Link Tamu yang Sudah Dibuat */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Daftar Tautan Tamu ({filteredLinks.length})
                  </h3>
                  <p className="text-xs text-stone-400">
                    Klik tombol WhatsApp untuk langsung mengirim pesan personal ke tamu.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={guestSearchQuery}
                    onChange={(e) => setGuestSearchQuery(e.target.value)}
                    placeholder="Cari nama tamu..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                  />
                </div>
              </div>

              {filteredLinks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl">
                  <Users className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 font-medium">Belum ada daftar tamu.</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Buat tautan personal pertama Anda pada formulir di sebelah kiri.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {filteredLinks.map((link) => {
                    const guestUrl = getBaseInvitationUrl(link.guestName);

                    return (
                      <div
                        key={link.id}
                        className={`p-3.5 rounded-xl border transition-all ${
                          link.isSent
                            ? 'bg-stone-50/70 border-stone-200 opacity-80'
                            : 'bg-white border-stone-200 hover:border-[#C5A880]/50 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs font-bold text-stone-900">
                                {link.guestName}
                              </h4>
                              {link.category && (
                                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                                  {link.category}
                                </span>
                              )}
                              {link.isSent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  <span>Sudah Terkirim</span>
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] text-stone-400 font-mono truncate max-w-sm">
                              {guestUrl}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleSendViaWhatsApp(link.guestName, link.phone)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                              title="Buka WhatsApp & Kirim"
                            >
                              <Phone className="w-3 h-3" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            <button
                              onClick={() => handleCopy(guestUrl, 'link')}
                              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                              title="Salin Tautan Saja"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleToggleSent(link.id)}
                              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                link.isSent 
                                  ? 'border-emerald-200 text-emerald-600 bg-emerald-50' 
                                  : 'border-stone-200 text-stone-400 hover:text-stone-700'
                              }`}
                              title={link.isSent ? 'Tandai Belum Terkirim' : 'Tandai Sudah Terkirim'}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="p-1.5 text-stone-300 hover:text-red-500 rounded-lg transition-colors text-xs"
                              title="Hapus"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: LIVE RSVP & CATERING COUNTER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'rsvp' && (
          <div className="space-y-6">
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-400 uppercase font-semibold tracking-wider block">
                  Total Respon
                </span>
                <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  {totalRsvpCount}
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Tamu telah mengonfirmasi
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#C5A880]/40 shadow-2xs">
                <span className="text-[10px] text-[#8C6D3F] uppercase font-semibold tracking-wider block">
                  Porsi / Pax Hadir
                </span>
                <div className="text-2xl font-serif font-bold text-[#8C6D3F] mt-1">
                  {totalAttendingPax}
                </div>
                <span className="text-[10px] text-stone-600 mt-0.5 block">
                  Dari {attendingGuests.length} keluarga hadir
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-amber-600 uppercase font-semibold tracking-wider block">
                  Masih Ragu
                </span>
                <div className="text-2xl font-serif font-bold text-amber-600 mt-1">
                  {uncertainGuests.length}
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Menunggu kepastian
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-400 uppercase font-semibold tracking-wider block">
                  Berhalangan
                </span>
                <div className="text-2xl font-serif font-bold text-stone-400 mt-1">
                  {declinedGuests.length}
                </div>
                <span className="text-[10px] text-stone-400 mt-0.5 block">
                  Tidak dapat hadir
                </span>
              </div>
            </div>

            {/* Table & Export Bar */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Daftar Konfirmasi Kehadiran Katering
                  </h3>
                  <p className="text-xs text-stone-500">
                    Data tamu yang telah mengisi formulir konfirmasi RSVP di halaman undangan.
                  </p>
                </div>

                <button
                  onClick={() => AdminStore.exportRsvpToCsv(currentClient)}
                  className="bg-[#141413] hover:bg-[#2C2E28] text-[#FAF8F3] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Unduh Rekap Tamu (Excel / CSV)</span>
                </button>
              </div>

              {rsvpList.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl">
                  <Users className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 font-medium">Belum ada respon RSVP.</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Ketika tamu mengisi formulir RSVP pada undangan digital Anda, nama dan jumlah porsi akan otomatis muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-400 text-[10px] uppercase tracking-wider font-semibold">
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Nama Tamu</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Jumlah Hadir</th>
                        <th className="py-2.5 px-3">Tanggal Konfirmasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {rsvpList.map((r, i) => {
                        const isAttending = r.attendance.toLowerCase().includes('hadir') && !r.attendance.toLowerCase().includes('tidak');
                        const isUncertain = r.attendance.toLowerCase().includes('ragu');

                        return (
                          <tr key={i} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3 px-3 text-stone-400 font-mono">{i + 1}</td>
                            <td className="py-3 px-3 font-semibold text-stone-900">{r.name}</td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  isAttending
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isUncertain
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-stone-100 text-stone-600'
                                }`}
                              >
                                {r.attendance}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-stone-700">
                              {r.count} Orang
                            </td>
                            <td className="py-3 px-3 text-stone-500 font-mono text-[11px]">
                              {r.date || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: WISHES & GUESTBOOK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'wishes' && (
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Ucapan Doa & Buku Tamu ({currentClient.guestbookEntries?.length || 0})
                </h3>
                <p className="text-xs text-stone-500">
                  Doa restu yang dikirimkan oleh keluarga dan kerabat melalui undangan.
                </p>
              </div>

              <button
                onClick={() => AdminStore.exportGuestbookToCsv(currentClient)}
                className="bg-[#FAF7F2] hover:bg-[#F3EAD9] text-stone-800 border border-[#C5A880]/50 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Unduh Ucapan (CSV)</span>
              </button>
            </div>

            {(!currentClient.guestbookEntries || currentClient.guestbookEntries.length === 0) ? (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-xl">
                <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-medium">Belum ada ucapan doa masuk.</p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Setiap ucapan yang dikirimkan tamu akan terekam secara rapi di sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[550px] overflow-y-auto pr-1">
                {currentClient.guestbookEntries.map((entry, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{entry.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{entry.time}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: EVENT INFO & DIGITAL GIFTS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Informasi Rangkaian Acara</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-[#C5A880] block">
                    Tanggal Pernikahan
                  </span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {currentClient.eventDateFormatted}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-[#C5A880] block">
                    Akad Nikah / Pemberkatan
                  </span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {currentClient.akadTime}
                  </p>
                  <p className="text-stone-600 mt-0.5">{currentClient.akadVenue}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-[#C5A880] block">
                    Resepsi Pernikahan
                  </span>
                  <p className="font-semibold text-stone-900 mt-0.5">
                    {currentClient.resepsiTime}
                  </p>
                  <p className="text-stone-600 mt-0.5">{currentClient.resepsiVenue}, {currentClient.city}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C5A880]" />
                <span>Tanda Kasih & Rekening Terdaftar</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase">
                    Rekening Utama
                  </span>
                  <div className="font-bold text-stone-900 text-sm">
                    {currentClient.bankName} - {currentClient.accountNumber}
                  </div>
                  <div className="text-stone-600 text-xs">
                    a.n {currentClient.accountHolder}
                  </div>
                </div>

                {currentClient.secondaryBankName && (
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">
                      Rekening Sekunder
                    </span>
                    <div className="font-bold text-stone-900 text-sm">
                      {currentClient.secondaryBankName} - {currentClient.secondaryAccountNumber}
                    </div>
                    <div className="text-stone-600 text-xs">
                      a.n {currentClient.secondaryAccountHolder}
                    </div>
                  </div>
                )}

                <div className="p-3 bg-[#FAF7F2] border border-[#C5A880]/30 rounded-xl text-[11px] text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-800">Perlu mengubah jam acara atau nomor rekening?</p>
                  <p className="text-stone-500">
                    Untuk menjaga keaslian desain dan keamanan data, perubahan detail acara dapat langsung dikonfirmasikan kepada Admin Sekarsiti Studio melalui WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
