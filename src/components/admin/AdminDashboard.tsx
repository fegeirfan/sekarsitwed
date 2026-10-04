import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Copy, 
  Trash2, 
  Eye, 
  ArrowLeft,
  LayoutDashboard,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  Send,
  Download,
  Upload,
  RefreshCw,
  ArrowUpDown,
  FileText,
  KeyRound,
  Heart,
  Share2
} from 'lucide-react';
import { ClientInvitationData, OrderStatus } from '../../types/clientInvitation';
import { AdminStore } from '../../admin/adminStore';
import { TEMPLATE_REGISTRY } from '../../admin/templateRegistry';
import { ClientOrderEditor } from './ClientOrderEditor';
import { GuestLinkModal } from './GuestLinkModal';

interface AdminDashboardProps {
  onBackToLanding: () => void;
  onPreviewClientInvitation: (invitation: ClientInvitationData) => void;
  onOpenClientPortal?: (invitation?: ClientInvitationData) => void;
}

type SortField = 'date_desc' | 'date_asc' | 'name_asc' | 'event_date';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToLanding,
  onPreviewClientInvitation,
  onOpenClientPortal
}) => {
  const [orders, setOrders] = useState<ClientInvitationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [templateFilter, setTemplateFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortField>('date_desc');

  // Active view: 'list' | 'create' | 'edit'
  const [viewState, setViewState] = useState<'list' | 'create' | 'edit'>('list');
  const [editingOrder, setEditingOrder] = useState<ClientInvitationData | null>(null);

  // Guest link generator modal
  const [guestLinkOrder, setGuestLinkOrder] = useState<ClientInvitationData | null>(null);

  // Import file ref
  const importInputRef = useRef<HTMLInputElement>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleCopyClientAccess = (order: ClientInvitationData) => {
    const code = order.accessCode || order.slug || order.id;
    const pin = order.pinCode || '7429';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const portalUrl = `${origin}${path}?portal=${encodeURIComponent(code)}&pin=${encodeURIComponent(pin)}`;
    
    const message = `Halo ${order.clientName}, undangan pernikahan digital Anda di Sekarsiti Studio telah aktif! ✨

Untuk membuat link sebar tamu personal via WhatsApp dan memantau katering RSVP secara langsung, silakan masuk ke Portal Mempelai:
🔗 ${portalUrl}

Kredensial Masuk Anda:
• Kode Akses: ${code}
• Sandi PIN: ${pin}

Semoga persiapan hari bahagia Anda berjalan lancar & berkesan.`;

    navigator.clipboard.writeText(message);
    showToast(`Pesan kredensial WhatsApp untuk ${order.clientName} berhasil disalin!`);
  };

  const refreshOrders = () => {
    setOrders(AdminStore.getAll());
  };

  // Subscribe to reactive store updates
  useEffect(() => {
    refreshOrders();
    const unsubscribe = AdminStore.subscribe(() => {
      refreshOrders();
    });
    return unsubscribe;
  }, []);

  const handleCreateNew = () => {
    setEditingOrder(null);
    setViewState('create');
  };

  const handleEdit = (order: ClientInvitationData) => {
    setEditingOrder(order);
    setViewState('edit');
  };

  const handleSaveOrder = (data: ClientInvitationData) => {
    if (viewState === 'create') {
      AdminStore.create(data);
      showToast('Undangan baru berhasil dibuat!');
    } else {
      AdminStore.update(data.id, data);
      showToast('Perubahan undangan tersimpan!');
    }
    setViewState('list');
    setEditingOrder(null);
  };

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(`Yakin ingin menghapus undangan "${clientName}"? Data tidak dapat dipulihkan.`)) {
      AdminStore.delete(id);
      showToast('Undangan berhasil dihapus');
    }
  };

  const handleDuplicate = (id: string) => {
    const duplicated = AdminStore.duplicate(id);
    showToast(`Duplikasi berhasil dibuat (${duplicated.id})`);
  };

  const handleExportBackup = () => {
    AdminStore.exportAllAsJson();
    showToast('File backup JSON berhasil diunduh');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const result = AdminStore.importJsonBackup(content);
      if (result.success) {
        showToast(`Berhasil mengimpor ${result.count} data undangan!`);
      } else {
        alert(result.error || 'Gagal mengimpor file.');
      }
    };
    reader.readAsText(file);

    if (importInputRef.current) {
      importInputRef.current.value = '';
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset seluruh data undangan ke kondisi contoh awal Sekarsiti? Perubahan kustom saat ini akan diganti.')) {
      AdminStore.resetToDefaultSeed();
      showToast('Data berhasil di-reset ke kondisi awal');
    }
  };

  // Filtered and Sorted orders
  const stats = AdminStore.getStats();

  const filteredOrders = orders
    .filter(item => {
      const matchesSearch = 
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientPhone.includes(searchQuery) ||
        item.brideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.groomName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesTemplate = templateFilter === 'all' || item.templateId === templateFilter;

      return matchesSearch && matchesStatus && matchesTemplate;
    })
    .sort((a, b) => {
      if (sortOption === 'name_asc') {
        return a.clientName.localeCompare(b.clientName);
      }
      if (sortOption === 'event_date') {
        return (a.countdownIsoDate || '').localeCompare(b.countdownIsoDate || '');
      }
      if (sortOption === 'date_asc') {
        return (a.createdAt || '').localeCompare(b.createdAt || '');
      }
      // default date_desc
      return (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || '');
    });

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-stone-900 font-['Plus_Jakarta_Sans',sans-serif] flex">
      
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#141413] text-[#F3EAD9] px-4 py-2.5 rounded-xl shadow-xl border border-[#C5A880]/40 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Hidden File Input for JSON Backup Import */}
      <input 
        ref={importInputRef} 
        type="file" 
        accept=".json,application/json" 
        onChange={handleImportFile} 
        className="hidden" 
      />

      {/* ============================================================
          SIDEBAR NAVIGATION (260px SaaS Enterprise Standard)
          ============================================================ */}
      <aside className="w-64 bg-[#141413] text-stone-300 flex flex-col shrink-0 border-r border-[#262522]">
        
        {/* Brand Lockup */}
        <div className="p-5 border-b border-[#262522] space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
            <span className="font-['Fraunces',serif] text-base text-white tracking-wide">
              Sekarsiti Studio
            </span>
          </div>
          <p className="text-[10px] text-[#A8A39A] uppercase tracking-widest font-mono">
            Admin Workspace &amp; Client Generator
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 text-xs font-medium flex-1 text-left">
          <button
            onClick={() => setViewState('list')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              viewState === 'list' 
                ? 'bg-[#22211E] text-[#C5A880] font-semibold' 
                : 'text-stone-400 hover:text-white hover:bg-[#1A1918]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Daftar Undangan Klien</span>
            </div>
            <span className="font-mono text-[10px] bg-[#141413] border border-[#2E2C28] px-2 py-0.5 rounded text-stone-300">
              {orders.length}
            </span>
          </button>

          <button
            onClick={handleCreateNew}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              viewState === 'create' 
                ? 'bg-[#22211E] text-[#C5A880] font-semibold' 
                : 'text-stone-400 hover:text-white hover:bg-[#1A1918]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#C5A880]" />
            <span>Buat Undangan Baru</span>
          </button>

          <button
            onClick={() => onOpenClientPortal && onOpenClientPortal()}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-stone-400 hover:text-white hover:bg-[#1A1918]"
            title="Buka portal login mempelai"
          >
            <Heart className="w-4 h-4 text-[#C5A880]" />
            <span>Portal Mempelai</span>
          </button>

          {/* Quick Filter Section */}
          <div className="pt-4 pb-1 px-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Filter Cepat Status
            </span>
          </div>

          <div className="space-y-0.5 text-[11px]">
            <button
              onClick={() => { setStatusFilter('all'); setViewState('list'); }}
              className={`w-full px-3 py-1.5 rounded text-left flex items-center justify-between cursor-pointer ${
                statusFilter === 'all' && viewState === 'list' ? 'bg-[#1F1E1B] text-white font-semibold' : 'text-stone-400 hover:bg-[#1A1918]'
              }`}
            >
              <span>Semua Status</span>
              <span className="font-mono text-[10px]">{stats.total}</span>
            </button>
            <button
              onClick={() => { setStatusFilter('published'); setViewState('list'); }}
              className={`w-full px-3 py-1.5 rounded text-left flex items-center justify-between cursor-pointer ${
                statusFilter === 'published' && viewState === 'list' ? 'bg-[#1F1E1B] text-emerald-400 font-semibold' : 'text-stone-400 hover:bg-[#1A1918]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Siap Publikasi</span>
              </span>
              <span className="font-mono text-[10px]">{stats.published}</span>
            </button>
            <button
              onClick={() => { setStatusFilter('in_progress'); setViewState('list'); }}
              className={`w-full px-3 py-1.5 rounded text-left flex items-center justify-between cursor-pointer ${
                statusFilter === 'in_progress' && viewState === 'list' ? 'bg-[#1F1E1B] text-amber-400 font-semibold' : 'text-stone-400 hover:bg-[#1A1918]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Proses Desain</span>
              </span>
              <span className="font-mono text-[10px]">{stats.inProgress}</span>
            </button>
            <button
              onClick={() => { setStatusFilter('pending'); setViewState('list'); }}
              className={`w-full px-3 py-1.5 rounded text-left flex items-center justify-between cursor-pointer ${
                statusFilter === 'pending' && viewState === 'list' ? 'bg-[#1F1E1B] text-stone-200 font-semibold' : 'text-stone-400 hover:bg-[#1A1918]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                <span>Draf Baru</span>
              </span>
              <span className="font-mono text-[10px]">{stats.pending}</span>
            </button>
          </div>

          {/* Backup & Tools Section */}
          <div className="pt-5 pb-1 px-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              Alat &amp; Arsip Data
            </span>
          </div>

          <div className="space-y-1">
            <button
              onClick={handleExportBackup}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-stone-400 hover:text-white hover:bg-[#1A1918] transition-colors cursor-pointer text-[11px]"
              title="Unduh seluruh data undangan dalam file JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Ekspor Backup JSON</span>
            </button>

            <button
              onClick={() => importInputRef.current?.click()}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-stone-400 hover:text-white hover:bg-[#1A1918] transition-colors cursor-pointer text-[11px]"
              title="Pulihkan data undangan dari file JSON"
            >
              <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Impor Backup JSON</span>
            </button>

            <button
              onClick={handleResetData}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-stone-500 hover:text-stone-300 hover:bg-[#1A1918] transition-colors cursor-pointer text-[11px]"
              title="Reset ke template contoh bawaan"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data Contoh</span>
            </button>
          </div>
        </nav>

        {/* Bottom Back Button */}
        <div className="p-4 border-t border-[#262522]">
          <button
            onClick={onBackToLanding}
            className="w-full py-2 px-3 bg-[#1A1918] hover:bg-[#262522] text-stone-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Kembali ke Website Utama</span>
          </button>
        </div>
      </aside>

      {/* ============================================================
          MAIN WORKSPACE AREA
          ============================================================ */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header & Breadcrumb Ribbon */}
        <header className="bg-white border-b border-stone-200 px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Workspace</span>
            <span>/</span>
            <span>Undangan Klien</span>
            {viewState !== 'list' && (
              <>
                <span>/</span>
                <span className="font-semibold text-stone-900">
                  {viewState === 'create' ? 'Buat Undangan Baru' : 'Sunting Undangan'}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {viewState === 'list' && (
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Undangan Klien Baru</span>
              </button>
            )}
          </div>
        </header>

        {/* View Switch: Table List vs Form Editor */}
        <div className="p-8 flex-1">
          {viewState === 'list' ? (
            <div className="space-y-6">
              
              {/* Studio Metrics Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setStatusFilter('all')}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer text-left ${
                    statusFilter === 'all' ? 'border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]/30' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                    Total Undangan Klien
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-bold font-mono text-stone-900">
                      {stats.total}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      Semua Draf
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('published')}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer text-left ${
                    statusFilter === 'published' ? 'border-emerald-500 shadow-sm ring-1 ring-emerald-500/30' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                    Siap Publikasi (Published)
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-bold font-mono text-emerald-800">
                      {stats.published}
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                      Aktif Live
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('in_progress')}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer text-left ${
                    statusFilter === 'in_progress' ? 'border-amber-500 shadow-sm ring-1 ring-amber-500/30' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                    Proses Desain
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-bold font-mono text-amber-800">
                      {stats.inProgress}
                    </span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      In-Progress
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('pending')}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer text-left ${
                    statusFilter === 'pending' ? 'border-stone-400 shadow-sm ring-1 ring-stone-400/30' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                    Draf Baru (Pending)
                  </span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-bold font-mono text-stone-700">
                      {stats.pending}
                    </span>
                    <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                      Belum Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Cari nama klien, ID, mempelai, atau nomor telepon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Filter className="w-3.5 h-3.5 text-stone-400" />
                    <span>Filter:</span>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="all">Semua Status ({orders.length})</option>
                    <option value="pending">Draf Baru</option>
                    <option value="in_progress">Dalam Proses</option>
                    <option value="review">Review Klien</option>
                    <option value="published">Siap Publikasi</option>
                  </select>

                  <select
                    value={templateFilter}
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="all">Semua Template Desain</option>
                    <option value="ruang-rasa">Seri Editorial (Ruang Rasa)</option>
                    <option value="malam-zamrud">Malam Zamrud (Art Deco)</option>
                    <option value="setangkai">Damar &amp; Alya (Sage)</option>
                    <option value="suasana">Jurnal Dua Hati (Buku)</option>
                    <option value="lembayung">Reel Sinematik 35mm</option>
                  </select>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 pl-1 border-l border-stone-200">
                    <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                  </div>

                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortField)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none"
                  >
                    <option value="date_desc">Terbaru Diperbarui</option>
                    <option value="date_asc">Terlama Dibuat</option>
                    <option value="name_asc">Nama Klien (A–Z)</option>
                    <option value="event_date">Tanggal Acara Perayaan</option>
                  </select>
                </div>
              </div>

              {/* High-Density Data Table */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                      <th className="py-3 px-4">ID &amp; Klien</th>
                      <th className="py-3 px-4">Template Terpilih</th>
                      <th className="py-3 px-4">Tanggal Perayaan</th>
                      <th className="py-3 px-4 text-center">RSVP</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi &amp; Generator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-normal">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => {
                        const templateDef = TEMPLATE_REGISTRY[order.templateId] || TEMPLATE_REGISTRY['ruang-rasa'];
                        const rsvpCount = order.rsvpList?.length || 0;
                        
                        return (
                          <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Client ID & Couple */}
                            <td className="py-3.5 px-4">
                              <span className="font-mono text-[10px] text-stone-500 block">
                                {order.id}
                              </span>
                              <span className="font-bold text-stone-900 text-sm">
                                {order.clientName}
                              </span>
                              <span className="text-[11px] text-stone-500 block">
                                {order.brideName} &amp; {order.groomName} · {order.city}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1.5 font-mono text-[10px] text-stone-600 bg-stone-100 border border-stone-200/80 px-2 py-0.5 rounded w-fit">
                                <KeyRound className="w-3 h-3 text-[#C5A880]" />
                                <span>Akses: {order.accessCode || order.slug}</span>
                                <span className="text-stone-300">|</span>
                                <span>PIN: <strong>{order.pinCode || '7429'}</strong></span>
                              </div>
                            </td>

                            {/* Template Badge */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={templateDef.coverThumbnail} 
                                  alt={templateDef.name}
                                  className="w-8 h-8 rounded object-cover border border-stone-200 shrink-0"
                                />
                                <div>
                                  <span className="font-medium text-stone-900 block truncate max-w-[180px]">
                                    {templateDef.name}
                                  </span>
                                  <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-semibold">
                                    {templateDef.styleLabel}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Event Date */}
                            <td className="py-3.5 px-4 text-stone-700">
                              <span className="font-medium block">
                                {order.eventDateFormatted}
                              </span>
                              <span className="text-[10px] text-stone-500 truncate max-w-[180px] block">
                                {order.resepsiVenue}
                              </span>
                            </td>

                            {/* RSVP Count */}
                            <td className="py-3.5 px-4 text-center font-mono">
                              {rsvpCount > 0 ? (
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                                  {rsvpCount} Tamu
                                </span>
                              ) : (
                                <span className="text-stone-400 text-[10px]">-</span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                order.status === 'published' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : order.status === 'in_progress'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : order.status === 'review'
                                  ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                  : 'bg-stone-100 text-stone-600 border border-stone-200'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {order.status === 'published' ? 'Published' : order.status === 'in_progress' ? 'Proses Desain' : order.status === 'review' ? 'Review Klien' : 'Draf'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {/* Copy WhatsApp Credentials for Client */}
                                <button
                                  type="button"
                                  onClick={() => handleCopyClientAccess(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-600 hover:text-white text-stone-700 transition-colors cursor-pointer"
                                  title="Salin Pesan Akses Portal untuk WhatsApp Klien"
                                >
                                  <KeyRound className="w-3.5 h-3.5" />
                                </button>

                                {/* Open Client Portal Directly */}
                                <button
                                  type="button"
                                  onClick={() => onOpenClientPortal && onOpenClientPortal(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C5A880] hover:text-[#141413] text-stone-700 transition-colors cursor-pointer"
                                  title="Buka Portal Mempelai Klien Ini"
                                >
                                  <Heart className="w-3.5 h-3.5" />
                                </button>

                                {/* Preview Customized Client Template */}
                                <button
                                  type="button"
                                  onClick={() => onPreviewClientInvitation(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C5A880] hover:text-[#141413] text-stone-700 transition-colors cursor-pointer"
                                  title="Buka Pratinjau Klien"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Guest Link Generator */}
                                <button
                                  type="button"
                                  onClick={() => setGuestLinkOrder(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C5A880] hover:text-[#141413] text-stone-700 transition-colors cursor-pointer"
                                  title="Buat Tautan Tamu WhatsApp"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit Order */}
                                <button
                                  type="button"
                                  onClick={() => handleEdit(order)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                                  title="Sunting Data Undangan"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Duplicate */}
                                <button
                                  type="button"
                                  onClick={() => handleDuplicate(order.id)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                                  title="Duplikasi Undangan Ini"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(order.id, order.clientName)}
                                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-100 hover:text-red-700 text-stone-500 transition-colors cursor-pointer"
                                  title="Hapus Undangan"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-500">
                          <p className="text-sm font-medium">Tidak ada undangan yang cocok dengan filter pencarian.</p>
                          <p className="text-xs text-stone-400 mt-1">Coba sesuaikan kata kunci atau ubah filter status.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-2xs">
              <ClientOrderEditor
                initialData={editingOrder}
                onSave={handleSaveOrder}
                onCancel={() => {
                  setViewState('list');
                  setEditingOrder(null);
                }}
                onPreview={onPreviewClientInvitation}
              />
            </div>
          )}
        </div>
      </main>

      {/* Guest Link Personalization Modal */}
      {guestLinkOrder && (
        <GuestLinkModal
          invitation={guestLinkOrder}
          onClose={() => setGuestLinkOrder(null)}
        />
      )}

    </div>
  );
};
