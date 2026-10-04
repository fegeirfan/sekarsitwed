import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Check, 
  Sparkles,
  Calendar,
  Heart,
  CreditCard,
  ImageIcon,
  UserCheck,
  Users
} from 'lucide-react';
import { ClientInvitationData, TemplateId } from '../../types/clientInvitation';
import { TEMPLATE_REGISTRY } from '../../admin/templateRegistry';

import { TemplateSelector } from './editor/TemplateSelector';
import { ClientInfoSection } from './editor/ClientInfoSection';
import { CoupleProfileSection } from './editor/CoupleProfileSection';
import { EventScheduleSection } from './editor/EventScheduleSection';
import { MediaUploadSection } from './editor/MediaUploadSection';
import { GiftMusicSection } from './editor/GiftMusicSection';
import { RsvpGuestbookSection } from './editor/RsvpGuestbookSection';
import { AiSetupModal } from './editor/AiSetupModal';
import { ParsedInvitationAiResult } from '../../services/aiSetupAssistant';

interface ClientOrderEditorProps {
  initialData?: ClientInvitationData | null;
  onSave: (data: ClientInvitationData) => void;
  onCancel: () => void;
  onPreview: (data: ClientInvitationData) => void;
}

type EditorTab = 'template' | 'client' | 'couple' | 'event' | 'media' | 'gift' | 'rsvp';

export const ClientOrderEditor: React.FC<ClientOrderEditorProps> = ({
  initialData,
  onSave,
  onCancel,
  onPreview
}) => {
  // Current active template
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(
    initialData?.templateId || 'ruang-rasa'
  );

  // Form State
  const [formData, setFormData] = useState<ClientInvitationData>(() => {
    if (initialData) return initialData;

    const templateDefaults = TEMPLATE_REGISTRY['ruang-rasa'].defaultData;
    return {
      id: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      clientName: 'Kirana & Adhitya',
      clientPhone: '081234567890',
      clientEmail: '',
      templateId: 'ruang-rasa',
      status: 'in_progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slug: 'kirana-adhitya',
      brideName: templateDefaults.brideName || 'Kirana',
      brideFullName: templateDefaults.brideFullName || 'Kirana Ayu Lestari, S.Ds.',
      brideParents: templateDefaults.brideParents || 'Putri pertama Bapak Hendra Wijaya & Ibu Sinta Maharani',
      brideInstagram: templateDefaults.brideInstagram || '@kiranaayuu',
      groomName: templateDefaults.groomName || 'Adhitya',
      groomFullName: templateDefaults.groomFullName || 'Adhitya Nugraha, B.Eng.',
      groomParents: templateDefaults.groomParents || 'Putra kedua Bapak Suryanto Nugraha & Ibu Ratna Dewi',
      groomInstagram: templateDefaults.groomInstagram || '@adhityanugraha',
      eventDateFormatted: templateDefaults.eventDateFormatted || 'Minggu, 14 Februari 2027',
      countdownIsoDate: templateDefaults.countdownIsoDate || '2027-02-14T08:00:00',
      akadTime: templateDefaults.akadTime || '08.00 – 09.30 WIB',
      akadVenue: templateDefaults.akadVenue || 'Ruang Bimasena, Aryaduta Hotel',
      resepsiTime: templateDefaults.resepsiTime || '11.00 – 14.00 WIB',
      resepsiVenue: templateDefaults.resepsiVenue || 'Grand Ballroom, Aryaduta Hotel',
      city: templateDefaults.city || 'Jakarta Selatan',
      mapsUrl: templateDefaults.mapsUrl || 'https://maps.google.com',
      quoteText: templateDefaults.quoteText || 'Dan di antara tanda-tanda kekuasaan-Nya...',
      quoteSource: templateDefaults.quoteSource || 'QS. Ar-Rum : 21',
      bankName: templateDefaults.bankName || 'BCA',
      accountNumber: templateDefaults.accountNumber || '8271029384',
      accountHolder: templateDefaults.accountHolder || 'Kirana Ayu Lestari',
      songTitle: templateDefaults.songTitle || 'Until I Found You - Stephen Sanchez',
      mediaSlots: {
        heroImage: '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
        bridePortrait: '/src/assets/images/wedding_bride_veil_1790901501919.jpg',
        groomPortrait: '/src/assets/images/editorial_groom_portrait_1790915490996.jpg',
        galleryImages: [
          '/src/assets/images/editorial_couple_portrait_1790838636662.jpg',
          '/src/assets/images/wedding_vows_bouquet_1790901516667.jpg'
        ]
      },
      guestbookEntries: [],
      rsvpList: []
    };
  });

  const [activeTab, setActiveTab] = useState<EditorTab>('template');
  const [saveToast, setSaveToast] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Apply data extracted by AI
  const handleApplyAiData = (parsed: ParsedInvitationAiResult) => {
    setFormData(prev => {
      const updated = { ...prev };
      if (parsed.clientName) updated.clientName = parsed.clientName;
      if (parsed.brideName) updated.brideName = parsed.brideName;
      if (parsed.brideFullName) updated.brideFullName = parsed.brideFullName;
      if (parsed.brideParents) updated.brideParents = parsed.brideParents;
      if (parsed.groomName) updated.groomName = parsed.groomName;
      if (parsed.groomFullName) updated.groomFullName = parsed.groomFullName;
      if (parsed.groomParents) updated.groomParents = parsed.groomParents;
      if (parsed.eventDateFormatted) updated.eventDateFormatted = parsed.eventDateFormatted;
      if (parsed.countdownIsoDate) updated.countdownIsoDate = parsed.countdownIsoDate;
      if (parsed.akadTime) updated.akadTime = parsed.akadTime;
      if (parsed.akadVenue) updated.akadVenue = parsed.akadVenue;
      if (parsed.resepsiTime) updated.resepsiTime = parsed.resepsiTime;
      if (parsed.resepsiVenue) updated.resepsiVenue = parsed.resepsiVenue;
      if (parsed.city) updated.city = parsed.city;
      if (parsed.mapsUrl) updated.mapsUrl = parsed.mapsUrl;
      if (parsed.bankName) updated.bankName = parsed.bankName;
      if (parsed.accountNumber) updated.accountNumber = parsed.accountNumber;
      if (parsed.accountHolder) updated.accountHolder = parsed.accountHolder;
      if (parsed.quoteText) updated.quoteText = parsed.quoteText;
      if (parsed.quoteSource) updated.quoteSource = parsed.quoteSource;
      if (parsed.songTitle) updated.songTitle = parsed.songTitle;
      if (parsed.recommendedTemplate) {
        updated.templateId = parsed.recommendedTemplate;
        setSelectedTemplateId(parsed.recommendedTemplate);
      }
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Template switch handler
  const handleTemplateChange = (newTemplateId: TemplateId) => {
    setSelectedTemplateId(newTemplateId);
    setFormData(prev => ({
      ...prev,
      templateId: newTemplateId
    }));
    setHasUnsavedChanges(true);
  };

  const handleFieldChange = (field: keyof ClientInvitationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleMediaSlotChange = (slotKey: string, newValue: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      mediaSlots: {
        ...prev.mediaSlots,
        [slotKey]: newValue
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave({
      ...formData,
      templateId: selectedTemplateId,
      updatedAt: new Date().toISOString()
    });
    setHasUnsavedChanges(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const activeTemplateDef = TEMPLATE_REGISTRY[selectedTemplateId] || TEMPLATE_REGISTRY['ruang-rasa'];

  const tabItems: { id: EditorTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'template', label: '1. Desain Template', icon: Sparkles },
    { id: 'client', label: '2. Info Klien & Status', icon: UserCheck },
    { id: 'couple', label: '3. Profil Mempelai', icon: Heart },
    { id: 'event', label: '4. Jadwal & Lokasi', icon: Calendar },
    { id: 'media', label: '5. Upload Media & Foto', icon: ImageIcon },
    { id: 'gift', label: '6. Rekening & Musik', icon: CreditCard },
    { id: 'rsvp', label: '7. Respon RSVP & Doa', icon: Users },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
            title="Kembali ke Daftar Pesanan"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-stone-900 tracking-tight">
                {initialData ? `Sunting: ${formData.clientName}` : 'Buat Undangan Klien Baru'}
              </h1>
              {hasUnsavedChanges && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                  Belum disimpan
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500">
              ID: <span className="font-mono text-stone-700">{formData.id}</span> · Template:{' '}
              <span className="font-medium text-[#C5A880]">{activeTemplateDef.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1 font-medium animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan!</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F3EAD9] border border-[#C5A880]/60 text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Ekstrak obrolan chat klien otomatis dengan AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>✨ AI Quick Setup</span>
          </button>

          <button
            type="button"
            onClick={() => onPreview({ ...formData, templateId: selectedTemplateId })}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pratinjau Klien</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Undangan</span>
          </button>
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-200 text-xs font-medium scrollbar-none">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isActive 
                  ? 'bg-[#141413] text-white shadow-xs' 
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A880]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
              {tab.id === 'rsvp' && ((formData.rsvpList?.length || 0) > 0) && (
                <span className="font-mono text-[9px] bg-[#C5A880] text-black px-1.5 rounded-full font-bold">
                  {formData.rsvpList?.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[400px]">
        {activeTab === 'template' && (
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onSelect={handleTemplateChange}
          />
        )}

        {activeTab === 'client' && (
          <ClientInfoSection
            formData={formData}
            onChange={handleFieldChange}
          />
        )}

        {activeTab === 'couple' && (
          <CoupleProfileSection
            formData={formData}
            onChange={handleFieldChange}
          />
        )}

        {activeTab === 'event' && (
          <EventScheduleSection
            formData={formData}
            onChange={handleFieldChange}
          />
        )}

        {activeTab === 'media' && (
          <MediaUploadSection
            formData={formData}
            selectedTemplateId={selectedTemplateId}
            onMediaSlotChange={handleMediaSlotChange}
          />
        )}

        {activeTab === 'gift' && (
          <GiftMusicSection
            formData={formData}
            onChange={handleFieldChange}
          />
        )}

        {activeTab === 'rsvp' && (
          <RsvpGuestbookSection
            formData={formData}
            onChange={handleFieldChange}
          />
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
        >
          Kembali ke Daftar
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onPreview({ ...formData, templateId: selectedTemplateId })}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pratinjau Klien</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#C5A880] hover:bg-[#b8986c] text-[#141413] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Undangan</span>
          </button>
        </div>
      </div>

      {/* AI Quick Setup Modal */}
      <AiSetupModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyParsedData={handleApplyAiData}
      />

    </div>
  );
};
