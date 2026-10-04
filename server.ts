import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Shared Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Route: AI Smart Invitation Parser
  app.post('/api/ai/parse-invitation', async (req, res) => {
    try {
      const { rawText } = req.body;
      if (!rawText || typeof rawText !== 'string') {
        return res.status(400).json({ error: 'Teks masukan tidak boleh kosong' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          error: 'GEMINI_API_KEY belum dikonfigurasi di server.',
          isFallback: true 
        });
      }

      const prompt = `Anda adalah asisten AI profesional untuk Sekarsiti Studio (platform undangan digital pernikahan mewah, editorial, dan puitis).
Tugas Anda: mengekstrak informasi pernikahan dari obrolan WhatsApp atau teks mentah klien ke dalam format JSON yang tepat.

Struktur JSON yang HARUS dikembalikan:
{
  "clientName": "Nama Panggilan Pasangan (contoh: Kirana & Adhitya)",
  "brideName": "Nama Panggilan Mempelai Wanita",
  "brideFullName": "Nama Lengkap Mempelai Wanita Beserta Gelar",
  "brideParents": "Keterangan Orang Tua Mempelai Wanita (contoh: Putri pertama dari Bapak X & Ibu Y)",
  "groomName": "Nama Panggilan Mempelai Pria",
  "groomFullName": "Nama Lengkap Mempelai Pria Beserta Gelar",
  "groomParents": "Keterangan Orang Tua Mempelai Pria (contoh: Putra kedua dari Bapak A & Ibu B)",
  "eventDateFormatted": "Hari dan tanggal formal Indonesia (contoh: Sabtu, 24 Oktober 2026)",
  "countdownIsoDate": "Format ISO YYYY-MM-DDTHH:MM:SS (contoh: 2026-10-24T08:00:00)",
  "akadTime": "Waktu akad (contoh: 08.00 – 10.00 WIB)",
  "akadVenue": "Nama tempat / gedung akad",
  "resepsiTime": "Waktu resepsi (contoh: 11.00 – 14.00 WIB)",
  "resepsiVenue": "Nama tempat / ballroom resepsi",
  "city": "Kota lokasi acara (contoh: Jakarta Selatan / Sleman, Yogyakarta / Denpasar, Bali)",
  "mapsUrl": "Tautan Google Maps jika tersedia",
  "bankName": "Nama bank (BCA / Mandiri / BNI / BRI dll)",
  "accountNumber": "Nomor rekening",
  "accountHolder": "Nama pemilik rekening",
  "quoteText": "Kutipan romantis / ayat suci pernikahan yang puitis dan khidmat",
  "quoteSource": "Sumber kutipan (contoh: QS. Ar-Rum: 21)",
  "songTitle": "Judul lagu pengiring pernikahan yang elegan (contoh: Until I Found You - Stephen Sanchez)",
  "recommendedTemplate": "Salah satu dari: ruang-rasa, malam-zamrud, setangkai, suasana, lembayung"
}

Teks Klien:
"""${rawText}"""`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      const parsedData = JSON.parse(text);
      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error('Error calling Gemini API:', err);
      return res.status(500).json({ error: err?.message || 'Gagal mengekstrak teks dengan AI', isFallback: true });
    }
  });

  // API Route: AI Romantic / Spiritual Quote Generator
  app.post('/api/ai/generate-quote', async (req, res) => {
    try {
      const { theme, coupleName } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: 'GEMINI_API_KEY belum dikonfigurasi', isFallback: true });
      }

      const prompt = `Buat kutipan pernikahan puitis, khidmat, dan mendalam dalam bahasa Indonesia untuk pasangan ${coupleName || 'mempelai'}.
Tema suasana: ${theme || 'editorial modern puitis'}.
Kembalikan JSON murni:
{
  "quoteText": "Teks kutipan puitis dan sakral",
  "quoteSource": "Sumber (contoh: QS. Ar-Rum: 21, Kahlil Gibran, atau Janji Suci)"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsedData = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Gagal membuat kutipan AI', isFallback: true });
    }
  });

  // Setup Vite dev server in development or serve static in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
