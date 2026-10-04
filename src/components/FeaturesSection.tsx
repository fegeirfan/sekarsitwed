import React from 'react';
import { 
  Zap, 
  Users, 
  Gift, 
  Music, 
  MapPin, 
  ShieldCheck, 
  Smartphone,
  Sparkles
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="fitur" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Keunggulan Layanan Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 text-balance">
            Dirancang Khusus untuk Momen Spesial Anda
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Bukan sekadar tautan website biasa, setiap detail kami buat agar berkesan, mudah dibuka oleh tamu keluarga, dan bebas repot untuk calon pengantin.
          </p>
        </div>

        {/* Asymmetric Bento-style Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Fast Turnaround (Col-span 7) */}
          <div className="md:col-span-7 bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
                <Zap className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Pengerjaan Kilat 1x24 Jam Selesai
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Kami memahami padatnya jadwal persiapan pernikahan. Cukup kirimkan data teks dan foto via WhatsApp, draf website undangan Anda akan kami selesaikan dalam waktu 24 jam kerja siap disebarkan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-700 font-medium">Bisa pesan darurat hari H?</span>
              <span className="text-emerald-800 font-semibold">Tersedia Layanan Express 6 Jam</span>
            </div>
          </div>

          {/* Bento Card 2: Unlimited Guests (Col-span 5) */}
          <div className="md:col-span-5 bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
                <Users className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Nama Tamu Tanpa Batas
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Buat link personal untuk setiap kerabat, sahabat, atau rekan kerja tanpa batas kuota. Tamu merasa lebih dihargai dengan sapaan khusus di layar cover.
              </p>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Contoh: <code className="bg-stone-100 px-2 py-0.5 rounded text-stone-800">kirana.link/dimas-sarah?to=Bpk.Hendra</code>
            </div>
          </div>

          {/* Bento Card 3: Direct Cashless Envelope (Col-span 4) */}
          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-200">
              <Gift className="w-5 h-5 text-rose-700" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Amplop Digital 100% Milik Anda
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tamu mentransfer langsung ke rekening BCA/Mandiri atau QRIS pribadi Anda. Nol komisi potongan, bebas dari pihak ketiga.
            </p>
          </div>

          {/* Bento Card 4: Audio & Multimedia (Col-span 4) */}
          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-200">
              <Music className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Bebas Request Musik &amp; Lagu
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pilih lagu kenangan Anda berdua untuk diputar otomatis saat undangan dibuka, dilengkapi tombol kontrol jeda/putar yang ramah pengguna.
            </p>
          </div>

          {/* Bento Card 5: Guarantee & Revision (Col-span 4) */}
          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Garansi Revisi Sepuasnya
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ada perubahan jam akad, dresscode, atau foto baru? Kami bantu update secepat mungkin hingga hari pernikahan tiba tanpa biaya tersembunyi.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
