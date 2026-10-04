import React, { useState } from 'react';
import { ClientInvitationData } from '../../../types/clientInvitation';
import { AdminStore } from '../../../admin/adminStore';
import { MessageSquare, Users, Download, Plus, Trash2, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface RsvpGuestbookSectionProps {
  formData: ClientInvitationData;
  onChange: (field: keyof ClientInvitationData, value: any) => void;
}

export const RsvpGuestbookSection: React.FC<RsvpGuestbookSectionProps> = ({
  formData,
  onChange
}) => {
  const [newWishName, setNewWishName] = useState('');
  const [newWishMessage, setNewWishMessage] = useState('');

  const [newRsvpName, setNewRsvpName] = useState('');
  const [newRsvpAttendance, setNewRsvpAttendance] = useState('hadir');
  const [newRsvpCount, setNewRsvpCount] = useState(2);

  const rsvpList = formData.rsvpList || [];
  const guestbookEntries = formData.guestbookEntries || [];

  const countHadir = rsvpList.filter(r => r.attendance === 'hadir').length;
  const countTidakHadir = rsvpList.filter(r => r.attendance === 'tidak_hadir').length;
  const countRagu = rsvpList.filter(r => r.attendance === 'ragu').length;
  const totalGuests = rsvpList
    .filter(r => r.attendance === 'hadir')
    .reduce((acc, curr) => acc + (Number(curr.count) || 1), 0);

  const handleAddManualWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishName.trim() || !newWishMessage.trim()) return;

    const entry = {
      name: newWishName.trim(),
      message: newWishMessage.trim(),
      time: 'Baru saja'
    };

    onChange('guestbookEntries', [entry, ...guestbookEntries]);
    setNewWishName('');
    setNewWishMessage('');
  };

  const handleDeleteWish = (index: number) => {
    const updated = guestbookEntries.filter((_, idx) => idx !== index);
    onChange('guestbookEntries', updated);
  };

  const handleAddManualRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRsvpName.trim()) return;

    const item = {
      name: newRsvpName.trim(),
      attendance: newRsvpAttendance,
      count: Number(newRsvpCount) || 1,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    onChange('rsvpList', [item, ...rsvpList]);
    setNewRsvpName('');
  };

  const handleDeleteRsvp = (index: number) => {
    const updated = rsvpList.filter((_, idx) => idx !== index);
    onChange('rsvpList', updated);
  };

  return (
    <div className="max-w-3xl text-left space-y-6">
      <div>
        <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#C5A880]" />
          <span>Data Respon Tamu: RSVP &amp; Buku Ucapan</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Pantau konfirmasi kehadiran tamu (RSVP) serta ucapan &amp; doa restu yang masuk untuk undangan ini.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-stone-200 rounded-xl">
          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
            Total Konfirmasi
          </span>
          <span className="text-xl font-bold text-stone-900 font-mono mt-0.5 block">
            {rsvpList.length}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
          <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block">
            Pasti Hadir
          </span>
          <span className="text-xl font-bold text-emerald-700 font-mono mt-0.5 block">
            {countHadir} <span className="text-xs font-normal text-emerald-600">({totalGuests} orang)</span>
          </span>
        </div>

        <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
          <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider block">
            Masih Ragu
          </span>
          <span className="text-xl font-bold text-amber-700 font-mono mt-0.5 block">
            {countRagu}
          </span>
        </div>

        <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl">
          <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">
            Berhalangan
          </span>
          <span className="text-xl font-bold text-rose-700 font-mono mt-0.5 block">
            {countTidakHadir}
          </span>
        </div>
      </div>

      {/* 1. RSVP Section */}
      <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Daftar Konfirmasi Kehadiran (RSVP)
            </h3>
            <p className="text-[11px] text-stone-500">
              {rsvpList.length} respon tercatat
            </p>
          </div>

          <button
            type="button"
            onClick={() => AdminStore.exportRsvpToCsv(formData)}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Unduh CSV RSVP</span>
          </button>
        </div>

        {/* Table of RSVP */}
        {rsvpList.length > 0 ? (
          <div className="border border-stone-200 rounded-lg overflow-hidden max-h-56 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] border-b border-stone-200 text-[10px] uppercase font-semibold text-stone-600">
                <tr>
                  <th className="py-2 px-3">Nama Tamu</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-center">Jumlah</th>
                  <th className="py-2 px-3">Tanggal</th>
                  <th className="py-2 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rsvpList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50">
                    <td className="py-2 px-3 font-medium text-stone-900">
                      {item.name}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.attendance === 'hadir'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.attendance === 'tidak_hadir'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.attendance === 'hadir' && <CheckCircle2 className="w-3 h-3" />}
                        {item.attendance === 'tidak_hadir' && <XCircle className="w-3 h-3" />}
                        {item.attendance === 'ragu' && <HelpCircle className="w-3 h-3" />}
                        <span>{item.attendance === 'hadir' ? 'Hadir' : item.attendance === 'tidak_hadir' ? 'Tidak Hadir' : 'Ragu'}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-mono">
                      {item.count} org
                    </td>
                    <td className="py-2 px-3 text-stone-500 text-[11px]">
                      {item.date || '-'}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteRsvp(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-stone-400 py-3 text-center italic">
            Belum ada data konfirmasi RSVP. Anda dapat menambahkan simulasi data manual di bawah ini.
          </p>
        )}

        {/* Add manual RSVP row */}
        <form onSubmit={handleAddManualRsvp} className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Tambah nama tamu..."
            value={newRsvpName}
            onChange={(e) => setNewRsvpName(e.target.value)}
            className="flex-1 min-w-[150px] p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
          />
          <select
            value={newRsvpAttendance}
            onChange={(e) => setNewRsvpAttendance(e.target.value)}
            className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
          >
            <option value="hadir">Hadir</option>
            <option value="ragu">Ragu</option>
            <option value="tidak_hadir">Tidak Hadir</option>
          </select>
          <input
            type="number"
            min="1"
            max="10"
            value={newRsvpCount}
            onChange={(e) => setNewRsvpCount(Number(e.target.value))}
            className="w-16 p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-center"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-stone-800 hover:bg-black text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </form>
      </div>

      {/* 2. Guestbook Wishes Section */}
      <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Buku Tamu &amp; Ucapan Doa Restu</span>
            </h3>
            <p className="text-[11px] text-stone-500">
              {guestbookEntries.length} ucapan tersimpan
            </p>
          </div>

          <button
            type="button"
            onClick={() => AdminStore.exportGuestbookToCsv(formData)}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Unduh CSV Ucapan</span>
          </button>
        </div>

        {guestbookEntries.length > 0 ? (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {guestbookEntries.map((w, idx) => (
              <div key={idx} className="p-3 bg-[#FAF7F2] border border-[#E5E0D8] rounded-lg flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{w.name}</span>
                    <span className="text-[10px] text-stone-400">· {w.time || 'Terkirim'}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{w.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteWish(idx)}
                  className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer shrink-0"
                  title="Hapus ucapan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-400 py-3 text-center italic">
            Belum ada ucapan doa restu yang masuk.
          </p>
        )}

        {/* Add manual wish */}
        <form onSubmit={handleAddManualWish} className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nama pengirim..."
              value={newWishName}
              onChange={(e) => setNewWishName(e.target.value)}
              className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-stone-800 hover:bg-black text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Ucapan</span>
            </button>
          </div>
          <textarea
            rows={2}
            placeholder="Pesan ucapan doa restu..."
            value={newWishMessage}
            onChange={(e) => setNewWishMessage(e.target.value)}
            className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs resize-none"
          />
        </form>
      </div>
    </div>
  );
};
