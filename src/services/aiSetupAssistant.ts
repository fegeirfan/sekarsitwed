import { TemplateId } from '../types/clientInvitation';

export interface ParsedInvitationAiResult {
  clientName?: string;
  brideName?: string;
  brideFullName?: string;
  brideParents?: string;
  groomName?: string;
  groomFullName?: string;
  groomParents?: string;
  eventDateFormatted?: string;
  countdownIsoDate?: string;
  akadTime?: string;
  akadVenue?: string;
  resepsiTime?: string;
  resepsiVenue?: string;
  city?: string;
  mapsUrl?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  quoteText?: string;
  quoteSource?: string;
  songTitle?: string;
  recommendedTemplate?: TemplateId;
}

// Heuristic fallback parser when AI server is unreachable or without API key
function parseHeuristicFallback(rawText: string): ParsedInvitationAiResult {
  const result: ParsedInvitationAiResult = {};
  const text = rawText.trim();

  // Find couple names (e.g. "Kirana & Adhitya" or "Kirana dan Adhitya")
  const coupleMatch = text.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*(?:&|dan|\+)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (coupleMatch) {
    result.brideName = coupleMatch[1].trim();
    result.groomName = coupleMatch[2].trim();
    result.clientName = `${result.brideName} & ${result.groomName}`;
  }

  // Find date patterns (e.g. "24 Oktober 2026" or "14-02-2027")
  const dateMatch = text.match(/(\d{1,2})\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+(\d{4})/i);
  if (dateMatch) {
    const day = dateMatch[1];
    const monthName = dateMatch[2];
    const year = dateMatch[3];
    result.eventDateFormatted = `${day} ${monthName} ${year}`;

    const monthMap: Record<string, string> = {
      januari: '01', februari: '02', maret: '03', april: '04', mei: '05', juni: '06',
      juli: '07', agustus: '08', september: '09', oktober: '10', november: '11', desember: '12'
    };
    const mNum = monthMap[monthName.toLowerCase()] || '01';
    result.countdownIsoDate = `${year}-${mNum}-${day.padStart(2, '0')}T08:00:00`;
  }

  // Find Akad and Resepsi
  const akadMatch = text.match(/akad(?:\s+nikah)?[\s:]+([^\n,]+)/i);
  if (akadMatch) {
    result.akadTime = '08.00 – 10.00 WIB';
    result.akadVenue = akadMatch[1].trim();
  }

  const resepsiMatch = text.match(/resepsi[\s:]+([^\n,]+)/i);
  if (resepsiMatch) {
    result.resepsiTime = '11.00 – 14.00 WIB';
    result.resepsiVenue = resepsiMatch[1].trim();
  }

  // Find Bank info
  const bankMatch = text.match(/(BCA|Mandiri|BNI|BRI|BSI|CIMB)\s*(?:no\.?|rek\.?|:)?\s*(\d{7,16})/i);
  if (bankMatch) {
    result.bankName = bankMatch[1].toUpperCase();
    result.accountNumber = bankMatch[2].trim();
  }

  // Find location / city
  const cityMatch = text.match(/(?:di|lokasi|kota)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (cityMatch) {
    result.city = cityMatch[1].trim();
  }

  // Suggest template based on venue keywords
  const lower = text.toLowerCase();
  if (lower.includes('film') || lower.includes('sinema') || lower.includes('retro') || lower.includes('35mm')) {
    result.recommendedTemplate = 'lembayung';
  } else if (lower.includes('emerald') || lower.includes('zamrud') || lower.includes('malam') || lower.includes('ballroom')) {
    result.recommendedTemplate = 'malam-zamrud';
  } else if (lower.includes('taman') || lower.includes('garden') || lower.includes('sage') || lower.includes('outdoor')) {
    result.recommendedTemplate = 'setangkai';
  } else if (lower.includes('buku') || lower.includes('jurnal') || lower.includes('vintage') || lower.includes('arsip')) {
    result.recommendedTemplate = 'suasana';
  } else {
    result.recommendedTemplate = 'ruang-rasa';
  }

  result.quoteText = 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.';
  result.quoteSource = 'QS. Ar-Rum: 21';
  result.songTitle = 'Until I Found You - Stephen Sanchez';

  return result;
}

export async function parseInvitationWithAi(rawText: string): Promise<{
  success: boolean;
  data: ParsedInvitationAiResult;
  isAi: boolean;
  message?: string;
}> {
  try {
    const res = await fetch('/api/ai/parse-invitation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          success: true,
          data: json.data,
          isAi: true,
          message: 'Berhasil diekstrak menggunakan Gemini AI.'
        };
      }
    }
  } catch (err) {
    console.warn('AI Endpoint unavailable, using local smart parser fallback:', err);
  }

  // Local heuristic fallback
  const fallback = parseHeuristicFallback(rawText);
  return {
    success: true,
    data: fallback,
    isAi: false,
    message: 'Diekstrak menggunakan parser lokal cerdas Sekarsiti.'
  };
}

export async function generateQuoteWithAi(theme: string, coupleName: string): Promise<{
  quoteText: string;
  quoteSource: string;
}> {
  try {
    const res = await fetch('/api/ai/generate-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme, coupleName }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          quoteText: json.data.quoteText,
          quoteSource: json.data.quoteSource
        };
      }
    }
  } catch (err) {
    console.warn('AI Quote failed, using elegant fallback', err);
  }

  return {
    quoteText: 'Mencintai bukanlah saling memandang, melainkan bersama-sama memandang ke satu arah yang sama dalam ikatan janji suci yang abadi.',
    quoteSource: 'Antoine de Saint-Exupéry'
  };
}
