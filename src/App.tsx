import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { TemplateCollection } from './components/TemplateCollection';
import { HowItWorks } from './components/HowItWorks';
import { BrandStory } from './components/BrandStory';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobilePreviewModal } from './components/MobilePreviewModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { PrintPlateHerbariumTemplate } from './templates/PrintPlateHerbariumTemplate';
import { MalamZamrudTemplate } from './templates/MalamZamrudTemplate';
import { DamarAlyaTemplate } from './templates/DamarAlyaTemplate';
import { JurnalDuaHatiTemplate } from './templates/JurnalDuaHatiTemplate';
import { ReelSinematikTemplate } from './templates/ReelSinematikTemplate';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ClientPortal } from './components/portal/ClientPortal';
import { AdminStore } from './admin/adminStore';
import { ClientInvitationData } from './types/clientInvitation';
import { InvitationItem } from './types';
import { TEMPLATES } from './data/catalog';

export default function App() {
  // View routing state: 'landing' | 'demo-editorial' | 'demo-malam-zamrud' | 'demo-damar-alya' | 'demo-jurnal-dua-hati' | 'demo-reel-sinematik' | 'admin' | 'portal'
  const [currentView, setCurrentView] = useState<'landing' | 'demo-editorial' | 'demo-malam-zamrud' | 'demo-damar-alya' | 'demo-jurnal-dua-hati' | 'demo-reel-sinematik' | 'admin' | 'portal'>('landing');

  // Client invitation custom data (when previewing from admin or via ?client=...)
  const [clientPreviewData, setClientPreviewData] = useState<ClientInvitationData | null>(null);
  const [isAdminPreviewMode, setIsAdminPreviewMode] = useState(false);

  // Client portal prefill credentials (if accessing via direct link)
  const [portalInitialCode, setPortalInitialCode] = useState('');
  const [portalInitialPin, setPortalInitialPin] = useState('');

  // Check URL query param for direct linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    const viewParam = params.get('view');
    const clientParam = params.get('client');
    const portalParam = params.get('portal');
    const pinParam = params.get('pin');

    if (portalParam || viewParam === 'portal') {
      setPortalInitialCode(portalParam || '');
      setPortalInitialPin(pinParam || '');
      setCurrentView('portal');
      return;
    }

    if (adminParam === 'true' || viewParam === 'admin') {
      setCurrentView('admin');
      return;
    }

    if (clientParam) {
      const foundClient = AdminStore.getById(clientParam);
      if (foundClient) {
        setClientPreviewData(foundClient);
        if (foundClient.templateId === 'malam-zamrud') setCurrentView('demo-malam-zamrud');
        else if (foundClient.templateId === 'setangkai') setCurrentView('demo-damar-alya');
        else if (foundClient.templateId === 'suasana') setCurrentView('demo-jurnal-dua-hati');
        else if (foundClient.templateId === 'lembayung') setCurrentView('demo-reel-sinematik');
        else setCurrentView('demo-editorial');
        return;
      }
    }

    const demoParam = params.get('demo');
    if (demoParam === 'malam-zamrud') {
      setCurrentView('demo-malam-zamrud');
    } else if (demoParam === 'editorial' || demoParam === 'plat-cetak') {
      setCurrentView('demo-editorial');
    } else if (demoParam === 'damar-alya' || demoParam === 'setangkai' || demoParam === 'sage') {
      setCurrentView('demo-damar-alya');
    } else if (demoParam === 'jurnal-dua-hati' || demoParam === 'suasana' || demoParam === 'jurnal') {
      setCurrentView('demo-jurnal-dua-hati');
    } else if (demoParam === 'reel-sinematik' || demoParam === 'lembayung' || demoParam === 'reel' || demoParam === 'larasati-fajar') {
      setCurrentView('demo-reel-sinematik');
    }
  }, []);

  // Mobile Preview modal state (for compact smartphone preview)
  const [previewTemplate, setPreviewTemplate] = useState<InvitationItem | null>(null);

  // WhatsApp Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedTemplateForOrder, setSelectedTemplateForOrder] = useState<InvitationItem | null>(null);

  const handleOpenOrderModal = (item?: InvitationItem) => {
    setSelectedTemplateForOrder(item || null);
    setIsOrderModalOpen(true);
  };

  const handlePreviewTemplate = (item: InvitationItem) => {
    setPreviewTemplate(item);
  };

  const handleOrderFromCatalog = (item: InvitationItem) => {
    setSelectedTemplateForOrder(item);
    setIsOrderModalOpen(true);
    setPreviewTemplate(null);
  };

  const handleScrollToCollection = () => {
    const el = document.getElementById('koleksi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('cara-kerja');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDedicatedDemo = (templateId: string) => {
    if (templateId === 'malam-zamrud') {
      setCurrentView('demo-malam-zamrud');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?demo=malam-zamrud');
    } else if (templateId === 'setangkai' || templateId === 'damar-alya') {
      setCurrentView('demo-damar-alya');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?demo=damar-alya');
    } else if (templateId === 'suasana' || templateId === 'jurnal-dua-hati') {
      setCurrentView('demo-jurnal-dua-hati');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?demo=jurnal-dua-hati');
    } else if (templateId === 'lembayung' || templateId === 'reel-sinematik' || templateId === 'larasati-fajar') {
      setCurrentView('demo-reel-sinematik');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?demo=reel-sinematik');
    } else {
      setCurrentView('demo-editorial');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?demo=editorial');
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setClientPreviewData(null);
    setIsAdminPreviewMode(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleOpenAdmin = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState({}, '', '?admin=true');
  };

  const handleOpenClientPortal = (invitation?: ClientInvitationData) => {
    if (invitation) {
      const code = invitation.accessCode || invitation.slug || invitation.id;
      const pin = invitation.pinCode || '7429';
      setPortalInitialCode(code);
      setPortalInitialPin(pin);
      window.history.pushState({}, '', `?portal=${encodeURIComponent(code)}&pin=${encodeURIComponent(pin)}`);
    } else {
      setPortalInitialCode('');
      setPortalInitialPin('');
      window.history.pushState({}, '', '?view=portal');
    }
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handlePreviewClientInvitation = (invitation: ClientInvitationData) => {
    setClientPreviewData(invitation);
    setIsAdminPreviewMode(true);
    if (invitation.templateId === 'malam-zamrud') {
      setCurrentView('demo-malam-zamrud');
    } else if (invitation.templateId === 'setangkai') {
      setCurrentView('demo-damar-alya');
    } else if (invitation.templateId === 'suasana') {
      setCurrentView('demo-jurnal-dua-hati');
    } else if (invitation.templateId === 'lembayung') {
      setCurrentView('demo-reel-sinematik');
    } else {
      setCurrentView('demo-editorial');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromDemo = () => {
    if (isAdminPreviewMode) {
      setIsAdminPreviewMode(false);
      setClientPreviewData(null);
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', '?admin=true');
      return;
    }
    handleBackToLanding();
  };

  // If user is in Client Portal view
  if (currentView === 'portal') {
    return (
      <ClientPortal
        initialCode={portalInitialCode}
        initialPin={portalInitialPin}
        onBackToHome={handleBackToLanding}
        onOpenInvitation={handlePreviewClientInvitation}
      />
    );
  }

  // If user is in Admin Dashboard view
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToLanding={handleBackToLanding}
        onPreviewClientInvitation={handlePreviewClientInvitation}
        onOpenClientPortal={handleOpenClientPortal}
      />
    );
  }

  // If user is viewing the Reel Sinematik (Template 5)
  if (currentView === 'demo-reel-sinematik') {
    const reelTemplate = TEMPLATES.find(t => t.id === 'lembayung') || TEMPLATES[4];
    return (
      <>
        {isAdminPreviewMode && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#141413] px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
            <span>Pratinjau Klien: {clientPreviewData?.clientName}</span>
            <button
              onClick={handleBackFromDemo}
              className="bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] cursor-pointer"
            >
              Kembali ke Admin
            </button>
          </div>
        )}

        <ReelSinematikTemplate
          onBackToLanding={handleBackFromDemo}
          customData={clientPreviewData || undefined}
          onOrderViaWhatsApp={() => {
            handleOpenOrderModal(reelTemplate);
          }}
        />

        {/* WhatsApp Order Modal */}
        <WhatsAppOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          preselectedItem={selectedTemplateForOrder || reelTemplate}
        />
      </>
    );
  }

  // If user is viewing the Jurnal Dua Hati (Template 4)
  if (currentView === 'demo-jurnal-dua-hati') {
    const jurnalTemplate = TEMPLATES.find(t => t.id === 'suasana') || TEMPLATES[3];
    return (
      <>
        {isAdminPreviewMode && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#141413] px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
            <span>Pratinjau Klien: {clientPreviewData?.clientName}</span>
            <button
              onClick={handleBackFromDemo}
              className="bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] cursor-pointer"
            >
              Kembali ke Admin
            </button>
          </div>
        )}

        <JurnalDuaHatiTemplate
          onBackToLanding={handleBackFromDemo}
          customData={clientPreviewData || undefined}
          onOrderViaWhatsApp={() => {
            handleOpenOrderModal(jurnalTemplate);
          }}
        />

        {/* WhatsApp Order Modal */}
        <WhatsAppOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          preselectedItem={selectedTemplateForOrder || jurnalTemplate}
        />
      </>
    );
  }

  // If user is viewing the Damar & Alya (Kertas Putih & Sage) template
  if (currentView === 'demo-damar-alya') {
    const damarAlyaTemplate = TEMPLATES.find(t => t.id === 'setangkai') || TEMPLATES[2];
    return (
      <>
        {isAdminPreviewMode && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#141413] px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
            <span>Pratinjau Klien: {clientPreviewData?.clientName}</span>
            <button
              onClick={handleBackFromDemo}
              className="bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] cursor-pointer"
            >
              Kembali ke Admin
            </button>
          </div>
        )}

        <DamarAlyaTemplate
          onBackToLanding={handleBackFromDemo}
          customData={clientPreviewData || undefined}
          onOrderViaWhatsApp={() => {
            handleOpenOrderModal(damarAlyaTemplate);
          }}
        />

        {/* WhatsApp Order Modal */}
        <WhatsAppOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          preselectedItem={selectedTemplateForOrder || damarAlyaTemplate}
        />
      </>
    );
  }

  // If user is viewing the Malam Zamrud (Art Deco) template
  if (currentView === 'demo-malam-zamrud') {
    const malamZamrudTemplate = TEMPLATES.find(t => t.id === 'malam-zamrud') || TEMPLATES[1];
    return (
      <>
        {isAdminPreviewMode && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#141413] px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
            <span>Pratinjau Klien: {clientPreviewData?.clientName}</span>
            <button
              onClick={handleBackFromDemo}
              className="bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] cursor-pointer"
            >
              Kembali ke Admin
            </button>
          </div>
        )}

        <MalamZamrudTemplate
          onBackToLanding={handleBackFromDemo}
          customData={clientPreviewData || undefined}
          onOrderViaWhatsApp={() => {
            handleOpenOrderModal(malamZamrudTemplate);
          }}
        />

        {/* WhatsApp Order Modal */}
        <WhatsAppOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          preselectedItem={selectedTemplateForOrder || malamZamrudTemplate}
        />
      </>
    );
  }

  // If user is viewing the Editorial Modern template
  if (currentView === 'demo-editorial') {
    const editorialTemplate = TEMPLATES.find(t => t.id === 'ruang-rasa') || TEMPLATES[0];
    return (
      <>
        {isAdminPreviewMode && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#141413] px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
            <span>Pratinjau Klien: {clientPreviewData?.clientName}</span>
            <button
              onClick={handleBackFromDemo}
              className="bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] cursor-pointer"
            >
              Kembali ke Admin
            </button>
          </div>
        )}

        <PrintPlateHerbariumTemplate
          onBackToLanding={handleBackFromDemo}
          customData={clientPreviewData || undefined}
          onOrderViaWhatsApp={() => {
            handleOpenOrderModal(editorialTemplate);
          }}
        />

        {/* WhatsApp Order Modal */}
        <WhatsAppOrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          preselectedItem={selectedTemplateForOrder || editorialTemplate}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#2C2E28] font-sans selection:bg-[#E2DDD3] selection:text-[#414A35]">
      
      {/* 1. NAVIGATION */}
      <Navbar 
        onSelectTemplateCTA={() => handleOpenOrderModal()} 
        onOpenAdmin={handleOpenAdmin}
        onOpenPortal={() => handleOpenClientPortal()}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <Hero
          onExploreCollection={handleScrollToCollection}
          onExploreHowItWorks={handleScrollToHowItWorks}
        />

        {/* 3. VALUE PROPOSITION */}
        <ValueProposition />

        {/* 4. TEMPLATE COLLECTION (Linked to dedicated demos for template 1 and template 2) */}
        <TemplateCollection
          onPreviewTemplate={handlePreviewTemplate}
          onOrderViaWhatsApp={handleOrderFromCatalog}
          onOpenDedicatedDemo={handleOpenDedicatedDemo}
        />

        {/* 5. HOW IT WORKS */}
        <HowItWorks />

        {/* 6. BRAND STORY */}
        <BrandStory />

        {/* 7. FINAL CTA */}
        <FinalCTA onExploreCollection={handleScrollToCollection} />
      </main>

      {/* 8. FOOTER */}
      <Footer 
        onContactWhatsApp={() => handleOpenOrderModal()} 
        onOpenAdmin={handleOpenAdmin}
        onOpenPortal={() => handleOpenClientPortal()}
      />

      {/* Subtle Floating WhatsApp Action */}
      <FloatingWhatsAppButton onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* Interactive Mobile Invitation Preview Simulator */}
      {previewTemplate && (
        <MobilePreviewModal
          item={previewTemplate}
          allItems={TEMPLATES}
          onClose={() => setPreviewTemplate(null)}
          onOrderViaWhatsApp={handleOrderFromCatalog}
          onSelectAnotherItem={(item) => setPreviewTemplate(item)}
        />
      )}

      {/* Direct WhatsApp Ordering Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedItem={selectedTemplateForOrder}
      />

    </div>
  );
}
