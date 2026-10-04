export type InvitationCategory = 'all' | 'web' | 'video' | 'cetak' | 'aqiqah';

export type InvitationStyle = 'all' | 'minimalist' | 'rustic' | 'luxury' | 'adat' | 'pastel';

export interface InvitationItem {
  id: string;
  title: string;
  category: 'web' | 'video' | 'cetak' | 'aqiqah';
  categoryLabel: string;
  style: 'minimalist' | 'rustic' | 'luxury' | 'adat' | 'pastel';
  styleLabel: string;
  price: number;
  originalPrice: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  hasDedicatedDemo?: boolean;
  dedicatedDemoLabel?: string;
  completionTime: string;
  image: string;
  description: string;
  features: string[];
  demoData: {
    groomName: string;
    brideName: string;
    eventDate: string;
    countdownDate: string; // ISO date for countdown
    location: string;
    city: string;
    songTitle: string;
    themeColor: string; // Tailwind color class or hex
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    loveQuote: string;
  };
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  couple: string;
  city: string;
  templateChosen: string;
  quote: string;
  date: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
