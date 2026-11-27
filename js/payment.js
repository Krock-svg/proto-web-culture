/**
 * MODUL BOOKING, PEMBAYARAN VIRTUAL ACCOUNT / E-WALLET & E-TICKET (BUMI MAGELANG)
 * Mendukung pemesanan untuk:
 * 1. Tiket Destinasi Wisata
 * 2. Reservasi Tour Guide
 * 3. Booking Hotel & Penginapan
 * Menghasilkan E-Ticket ber-QR Code yang bisa langsung diunduh (PNG) / dicetak.
 */

(function () {
  const STORAGE_TICKETS_KEY = 'bumi_magelang_tickets';
  const SERVICE_FEE = 2500;

  let activeBookingItem = null; // { type, id, title, subtitle, unitLabel, unitPrice, image }
  let bookingFormState = null;  // { customerName, customerPhone, date, qty, methodCode, methodName, methodType }
  let activeTicket = null;
  let countdownInterval = null;

  const PAYMENT_METHODS = [
    { code: 'BCA_VA', name: 'BCA Virtual Account', type: 'VA', prefix: '8801', badge: 'Bank VA', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { code: 'BRI_VA', name: 'BRI Virtual Account (BRIVA)', type: 'VA', prefix: '8802', badge: 'Bank VA', color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { code: 'BNI_VA', name: 'BNI Virtual Account', type: 'VA', prefix: '8803', badge: 'Bank VA', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { code: 'MANDIRI_VA', name: 'Mandiri Virtual Account', type: 'VA', prefix: '8804', badge: 'Bank VA', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { code: 'QRIS', name: 'QRIS (Semua E-Wallet)', type: 'EWALLET', prefix: 'QR', badge: 'Instan', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { code: 'GOPAY', name: 'GoPay', type: 'EWALLET', prefix: 'GP', badge: 'E-Wallet', color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { code: 'OVO', name: 'OVO', type: 'EWALLET', prefix: 'OV', badge: 'E-Wallet', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { code: 'DANA', name: 'DANA', type: 'EWALLET', prefix: 'DN', badge: 'E-Wallet', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' }
  ];

  function formatRupiah(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  }

  function getSavedTickets() {
    try {
      const raw = localStorage.getItem(STORAGE_TICKETS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTicket(ticket) {
    const tickets = getSavedTickets();
    tickets.unshift(ticket);
    localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(tickets));

    // Perbarui angka badge di tab Tiket Saya secara langsung
    const tabBtn = document.querySelector('[data-subtab="tiketSaya"]');
    if (tabBtn) {
      const countBadge = tabBtn.querySelector('span:last-child');
      if (countBadge) countBadge.textContent = tickets.length;
    }
  }

  function clearCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  /**
   * Resolve item data dari window.dataUmum
   */
  function findBookingItem(type, id) {
    const dataUmum = window.dataUmum || {};
    if (type === 'destinasi') {
      const d = (dataUmum.destinasi || []).find(x => x.id === id);
      if (!d) return null;
      return {
        type: 'destinasi',
        id: d.id,
        title: `Tiket Masuk: ${d.nama}`,
        subtitle: d.lokasi,
        unitLabel: 'Jumlah Pengunjung',
        unitNoun: 'Tiket',
        unitPrice: d.hargaNumerik || 25000,
        image: d.image
      };
    }
    if (type === 'guide') {
      const g = (dataUmum.tourGuide || []).find(x => x.id === id);
      if (!g) return null;
      return {
        type: 'guide',
        id: g.id,
        title: `Pemandu Wisata: ${g.nama}`,
        subtitle: g.sertifikasi,
        unitLabel: 'Jumlah Sesi Tur',
        unitNoun: 'Sesi',
        unitPrice: g.hargaNumerik || 300000,
        image: g.foto
      };
    }
    if (type === 'hotel') {
      const h = (dataUmum.penginapan || []).find(x => x.id === id);
      if (!h) return null;
      return {
        type: 'hotel',
        id: h.id,
        title: `Booking Kamar: ${h.nama}`,
        subtitle: `${h.tipe} • ${h.lokasi}`,
        unitLabel: 'Durasi Menginap (Malam)',
        unitNoun: 'Malam',
        unitPrice: h.hargaNumerik || 350000,
        image: h.image
      };
    }
    return null;
  }

  /**
   * Buka Modal Booking (Langkah 1)
   */
  function openBookingModal(type, id) {
    const item = findBookingItem(type, id);
    if (!item) return;

    activeBookingItem = item;
    activeTicket = null;
    clearCountdown();

    const modal = document.getElementById('globalModal');
    const modalBody = document.getElementById('globalModalBody');
    if (!modal || !modalBody) return;

    const todayStr = new Date().toISOString().split('T')[0];

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-4">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0" />
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Pemesanan & Pembayaran Online
            </span>
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">${item.title}</h2>
            <p class="text-xs text-slate-500">${item.subtitle}</p>
          </div>
        </div>

        <form id="bookingStep1Form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Pemesan</label>
              <input type="text" id="bookName" required placeholder="Contoh: Budi Santoso"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Nomor HP / WhatsApp</label>
              <input type="tel" id="bookPhone" required placeholder="Contoh: 081234567890"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Tanggal Kunjungan / Check-in</label>
              <input type="date" id="bookDate" required min="${todayStr}" value="${todayStr}"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${item.unitLabel}</label>
              <input type="number" id="bookQty" required min="1" max="20" value="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <!-- Pilihan Metode Pembayaran -->
          <div class="space-y-2 pt-2">
            <label class="block text-xs font-bold text-slate-700">Pilih Metode Pembayaran (Virtual Account / E-Wallet)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${PAYMENT_METHODS.map((pm, idx) => `
                <label class="cursor-pointer flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/70">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="paymentMethod" value="${pm.code}" ${idx === 0 ? 'checked' : ''} class="accent-emerald-600" />
                    <span class="text-xs font-bold text-slate-800">${pm.name}</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border ${pm.color}">${pm.badge}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Ringkasan Harga -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Harga Satuan (${item.unitNoun})</span>
              <span class="font-semibold">${formatRupiah(item.unitPrice)}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Biaya Layanan Sistem</span>
              <span class="font-semibold">${formatRupiah(SERVICE_FEE)}</span>
            </div>
            <div class="flex justify-between text-sm font-extrabold text-emerald-800 pt-2 border-t border-slate-200">
              <span>Total Pembayaran</span>
              <span id="bookTotalPreview">${formatRupiah(item.unitPrice + SERVICE_FEE)}</span>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" data-action="close-modal"
              class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
              Batal
            </button>
            <button type="submit"
              class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-2">
              <span>Lanjut ke Pembayaran</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    const qtyInput = document.getElementById('bookQty');
    const totalPreview = document.getElementById('bookTotalPreview');
    if (qtyInput && totalPreview) {
      qtyInput.addEventListener('input', () => {
        const qty = Math.max(1, parseInt(qtyInput.value || '1', 10));
        totalPreview.textContent = formatRupiah(item.unitPrice * qty + SERVICE_FEE);
      });
    }

    const form = document.getElementById('bookingStep1Form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const qty = Math.max(1, parseInt(document.getElementById('bookQty').value || '1', 10));
        const selectedCode = form.querySelector('input[name="paymentMethod"]:checked').value;
        const pm = PAYMENT_METHODS.find(p => p.code === selectedCode) || PAYMENT_METHODS[0];

        bookingFormState = {
          customerName: document.getElementById('bookName').value.trim(),
          customerPhone: document.getElementById('bookPhone').value.trim(),
          date: document.getElementById('bookDate').value,
          qty,
          totalAmount: item.unitPrice * qty + SERVICE_FEE,
          method: pm
        };
        renderPaymentInstructionStep();
      });
    }
  }

  /**
   * Langkah 2: Layar Nomor Virtual Account / QRIS + Countdown
   */
  function renderPaymentInstructionStep() {
    const modalBody = document.getElementById('globalModalBody');
    if (!modalBody || !bookingFormState || !activeBookingItem) return;

    const pm = bookingFormState.method;
    const randomDigits = Math.floor(1000000000 + Math.random() * 8999999999).toString();
    const vaNumber = pm.type === 'VA' ? `${pm.prefix}${randomDigits}` : `MGL-${pm.prefix}-${randomDigits.slice(0, 6)}`;

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div class="text-center space-y-2 border-b border-slate-100 pb-5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <i class="fa-regular fa-clock"></i>
            Menunggu Pembayaran • <span id="vaCountdownTimer" class="font-mono">15:00</span>
          </span>
          <h2 class="text-xl font-extrabold text-slate-900">${pm.name}</h2>
          <p class="text-xs text-slate-500">Selesaikan pembayaran sebelum batas waktu berakhir agar E-Ticket langsung terbit.</p>
        </div>

        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-center">
          <div>
            <span class="text-xs font-semibold text-slate-500 block mb-1">
              ${pm.type === 'VA' ? 'Nomor Virtual Account' : 'Kode Pembayaran / QRIS'}
            </span>
            <div class="flex items-center justify-center gap-2">
              <span class="text-xl sm:text-2xl font-black font-mono tracking-wider text-slate-900 select-all">${vaNumber}</span>
              <button id="btnCopyVa" type="button"
                class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-emerald-50 hover:border-emerald-400 text-xs font-bold text-slate-700 transition-colors">
                <i class="fa-regular fa-copy mr-1"></i>Salin
              </button>
            </div>
          </div>

          ${pm.type === 'EWALLET' ? `
            <div class="w-36 h-36 mx-auto bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
              ${generateQrSvg(vaNumber)}
            </div>
          ` : ''}

          <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span class="text-slate-600 font-medium">Total Tagihan:</span>
            <span class="text-base font-extrabold text-emerald-700">${formatRupiah(bookingFormState.totalAmount)}</span>
          </div>
        </div>

        <div class="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 leading-relaxed">
          <strong>Info Prototipe:</strong> Klik tombol <em>"Konfirmasi Sudah Bayar"</em> di bawah untuk mensimulasikan verifikasi pembayaran Virtual Account / E-Wallet yang langsung menerbitkan E-Ticket Anda.
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
          <button id="btnBackToBookingForm" type="button"
            class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
            <i class="fa-solid fa-arrow-left mr-1"></i>Ubah Metode
          </button>
          <button id="btnConfirmPaid" type="button"
            class="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-2">
            <i class="fa-solid fa-check-circle"></i>
            <span>Konfirmasi Sudah Bayar</span>
          </button>
        </div>
      </div>
    `;

    // Countdown 15 menit
    let secondsLeft = 900;
    clearCountdown();
    countdownInterval = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
      const timerEl = document.getElementById('vaCountdownTimer');
      if (!timerEl) {
        clearCountdown();
        return;
      }
      const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
      const s = String(secondsLeft % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
    }, 1000);

    const btnCopy = document.getElementById('btnCopyVa');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(vaNumber);
        }
        if (window.showToast) window.showToast('Nomor pembayaran berhasil disalin!', 'success');
      });
    }

    const btnBack = document.getElementById('btnBackToBookingForm');
    if (btnBack) {
      btnBack.addEventListener('click', () => openBookingModal(activeBookingItem.type, activeBookingItem.id));
    }

    const btnConfirm = document.getElementById('btnConfirmPaid');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => {
        clearCountdown();
        const code = 'MGL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const ticket = {
          bookingCode: code,
          serviceTitle: activeBookingItem.title,
          serviceSubtitle: activeBookingItem.subtitle,
          serviceType: activeBookingItem.type,
          unitNoun: activeBookingItem.unitNoun,
          qty: bookingFormState.qty,
          visitDate: bookingFormState.date,
          customerName: bookingFormState.customerName,
          customerPhone: bookingFormState.customerPhone,
          paymentMethod: pm.name,
          vaNumber,
          totalAmount: bookingFormState.totalAmount,
          paidAt: new Date().toLocaleString('id-ID'),
          status: 'LUNAS'
        };
        saveTicket(ticket);
        renderETicketModal(ticket);
        if (window.showToast) window.showToast(`Pembayaran Lunas! E-Ticket ${code} siap diunduh.`, 'success');
      });
    }
  }

  /**
   * Langkah 3: Tampilkan E-Ticket Resmi & Tombol Unduh PNG / PDF
   */
  function renderETicketModal(ticket) {
    activeTicket = ticket;
    const modal = document.getElementById('globalModal');
    const modalBody = document.getElementById('globalModalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h2 class="text-xl font-extrabold text-slate-900">Pembayaran Berhasil & E-Ticket Terbit!</h2>
          <p class="text-xs text-slate-500">Simpan atau unduh E-Ticket berikut sebagai bukti akses resmi di Magelang.</p>
        </div>

        <!-- Kartu E-Ticket -->
        <div id="eTicketCardPreview" class="rounded-3xl border-2 border-dashed border-emerald-500/60 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/70 pb-4">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">Mageloka • Bumi Magelang E-Ticket</span>
              <h3 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">${ticket.serviceTitle}</h3>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold tracking-wider">
              ${ticket.status}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div class="sm:col-span-8 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-400 block">Kode Booking</span>
                <span class="font-mono font-extrabold text-slate-900 text-sm">${ticket.bookingCode}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Nama Pemesan</span>
                <span class="font-bold text-slate-800">${ticket.customerName}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Tanggal Kunjungan</span>
                <span class="font-bold text-slate-800">${ticket.visitDate}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Jumlah</span>
                <span class="font-bold text-slate-800">${ticket.qty} ${ticket.unitNoun}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Metode Bayar</span>
                <span class="font-semibold text-slate-700">${ticket.paymentMethod}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Total Dibayar</span>
                <span class="font-extrabold text-emerald-700">${formatRupiah(ticket.totalAmount)}</span>
              </div>
            </div>

            <div class="sm:col-span-4 flex flex-col items-center justify-center bg-white p-3 rounded-2xl border border-slate-200">
              <div class="w-24 h-24">${generateQrSvg(ticket.bookingCode)}</div>
              <span class="text-[10px] font-mono text-slate-500 mt-1">${ticket.bookingCode}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
          <button type="button" data-action="close-modal"
            class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
            Tutup
          </button>
          <div class="flex items-center gap-2">
            <button id="btnPrintTicket" type="button"
              class="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5">
              <i class="fa-solid fa-print"></i>
              <span>Cetak / PDF</span>
            </button>
            <button id="btnDownloadTicketPng" type="button"
              class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-2">
              <i class="fa-solid fa-download"></i>
              <span>Unduh E-Ticket (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    const btnPng = document.getElementById('btnDownloadTicketPng');
    if (btnPng) btnPng.addEventListener('click', () => downloadTicketAsPng(ticket));

    const btnPrint = document.getElementById('btnPrintTicket');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());
  }

  /**
   * Generate QR Code deterministik berbasis SVG untuk kode booking
   */
  function generateQrSvg(seedText) {
    const size = 9;
    let hash = 0;
    for (let i = 0; i < seedText.length; i++) {
      hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
    }

    let rects = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const isCorner = (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);
        const bit = ((hash >> ((r * size + c) % 24)) ^ (r * 3 + c)) & 1;
        if (isCorner || bit === 1) {
          rects += `<rect x="${c * 10 + 5}" y="${r * 10 + 5}" width="8" height="8" rx="1.5" fill="#0f172a" />`;
        }
      }
    }
    return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  /**
   * Gambar E-Ticket ke HTML5 Canvas dan unduh langsung sebagai PNG
   */
  function downloadTicketAsPng(ticket) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Background putih
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header hijau zamrud
    ctx.fillStyle = '#047857';
    ctx.fillRect(0, 0, canvas.width, 105);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('MAGELOKA • BUMI MAGELANG OFFICIAL E-TICKET', 40, 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(ticket.serviceTitle.slice(0, 48), 40, 80);

    // Badge LUNAS
    ctx.fillStyle = '#10b981';
    ctx.fillRect(740, 32, 120, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('LUNAS', 770, 59);

    // Garis putus-putus
    ctx.strokeStyle = '#cbd5e1';
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(40, 130);
    ctx.lineTo(860, 130);
    ctx.stroke();
    ctx.setLineDash([]);

    // Detail Tiket
    const rows = [
      ['KODE BOOKING', ticket.bookingCode],
      ['NAMA PEMESAN', ticket.customerName],
      ['NO. TELEPON', ticket.customerPhone],
      ['TANGGAL KUNJUNGAN', ticket.visitDate],
      ['JUMLAH', `${ticket.qty} ${ticket.unitNoun}`],
      ['METODE BAYAR', ticket.paymentMethod],
      ['TOTAL DIBAYAR', formatRupiah(ticket.totalAmount)]
    ];

    let y = 170;
    rows.forEach(([label, val]) => {
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(label, 40, y);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(String(val), 240, y);
      y += 42;
    });

    // Kotak QR sederhana di kanan
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 3;
    ctx.strokeRect(640, 175, 200, 200);
    ctx.fillStyle = '#0f172a';
    let hash = 0;
    for (let i = 0; i < ticket.bookingCode.length; i++) {
      hash = (hash * 31 + ticket.bookingCode.charCodeAt(i)) >>> 0;
    }
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const isCorner = (r < 3 && c < 3) || (r < 3 && c >= 6) || (r >= 6 && c < 3);
        const bit = ((hash >> ((r * 9 + c) % 24)) ^ (r * 3 + c)) & 1;
        if (isCorner || bit === 1) {
          ctx.fillRect(658 + c * 18, 193 + r * 18, 14, 14);
        }
      }
    }
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(ticket.bookingCode, 692, 405);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Diterbitkan pada ${ticket.paidAt} • Tunjukkan E-Ticket ini di lokasi wisata/layanan.`, 40, 472);

    // Download langsung
    const link = document.createElement('a');
    link.download = `Tiket-Mageloka-${ticket.bookingCode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (window.showToast) window.showToast(`File Tiket-Mageloka-${ticket.bookingCode}.png diunduh!`, 'success');
  }

  /**
   * Render daftar semua tiket yang sudah dibeli user di tab "Tiket Saya"
   */
  function renderMyTickets(grid) {
    if (!grid) return;
    const tickets = getSavedTickets();

    if (tickets.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-3">
          <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto text-2xl">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Belum Ada E-Ticket</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Silakan pesan tiket Destinasi Wisata, Tour Guide, atau Kamar Hotel menggunakan Virtual Account / E-Wallet. Tiket Anda akan otomatis tersimpan di sini.
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = tickets.map((t, idx) => `
      <article class="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">${t.bookingCode}</span>
            <span class="text-[11px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">${t.status}</span>
          </div>
          <h3 class="text-base font-bold text-slate-900">${t.serviceTitle}</h3>
          <p class="text-xs text-slate-500">${t.customerName} • Kunjungan: <strong>${t.visitDate}</strong> (${t.qty} ${t.unitNoun})</p>
          <p class="text-xs text-slate-600">Dibayar via ${t.paymentMethod} • <strong class="text-emerald-700">${formatRupiah(t.totalAmount)}</strong></p>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button type="button" data-action="view-ticket" data-ticket-index="${idx}"
            class="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors">
            <i class="fa-solid fa-qrcode mr-1"></i>Lihat Tiket
          </button>
          <button type="button" data-action="download-ticket" data-ticket-index="${idx}"
            class="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors">
            <i class="fa-solid fa-download mr-1"></i>Unduh PNG
          </button>
        </div>
      </article>
    `).join('');
  }

  function viewTicketByIndex(idx) {
    const tickets = getSavedTickets();
    if (tickets[idx]) renderETicketModal(tickets[idx]);
  }

  function downloadTicketByIndex(idx) {
    const tickets = getSavedTickets();
    if (tickets[idx]) downloadTicketAsPng(tickets[idx]);
  }

  window.PaymentModule = {
    openBookingModal,
    renderMyTickets,
    viewTicketByIndex,
    downloadTicketByIndex,
    getSavedTickets
  };
})();
