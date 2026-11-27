/**
 * PENGENDALI UTAMA APLIKASI (APP CONTROLLER)
 * - Mode Switcher (Mode Mahasiswa <-> Mode Umum) dengan persistensi localStorage
 * - Sinkronisasi Hero Banner & Tema Visual
 * - Pengelola Modal Dialog Terpusat (Detail Modul Mahasiswa & Destinasi Wisata)
 * - Sistem Notifikasi Toast Interaktif
 * - Integrasi Global Search
 * Kompatibel via file:// (double-click) dan http:// (localhost).
 */

const STORAGE_MODE_KEY = 'pesona_magelang_active_mode';
const STORAGE_UNTIDAR_SESSION = 'tidaraksa_untidar_session';
let currentMode = 'umum'; // default mode: 'umum' (Bumi Magelang)

function getUntidarSession() {
  try {
    const raw = localStorage.getItem(STORAGE_UNTIDAR_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function isUntidarLoggedIn() {
  return !!getUntidarSession();
}

function openUntidarLoginModal() {
  const modal = document.getElementById('modalUntidarLogin');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    const input = document.getElementById('loginNama');
    if (input) input.focus();
  }
}

function closeUntidarLoginModal() {
  const modal = document.getElementById('modalUntidarLogin');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function loginUntidar(nama, nim, fakultas) {
  const session = {
    nama: nama || 'Mahasiswa Untidar',
    nim: nim || '2210401089',
    fakultas: fakultas || 'FKIP',
    loginTime: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_UNTIDAR_SESSION, JSON.stringify(session));
  closeUntidarLoginModal();
  switchMode('mahasiswa');
  showToast(`Selamat datang di TIDARAKSA, ${session.nama}!`, 'success');
}

function logoutUntidar() {
  localStorage.removeItem(STORAGE_UNTIDAR_SESSION);
  switchMode('umum');
  showToast('Anda telah keluar dari akun mahasiswa Untidar.', 'info');
}

function switchMode(mode) {
  if (mode === 'mahasiswa' && !isUntidarLoggedIn()) {
    openUntidarLoginModal();
    return;
  }
  currentMode = mode;
  localStorage.setItem(STORAGE_MODE_KEY, currentMode);
  applyActiveMode(currentMode, true);

  // Tutup mobile drawer jika terbuka
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileNavDrawer && !mobileNavDrawer.classList.contains('hidden')) {
    mobileNavDrawer.classList.add('hidden');
  }
}

function getMahasiswaData() {
  return window.dataMahasiswa || [];
}

function getUmumData() {
  return window.dataUmum || { destinasi: [], tourGuide: [], penginapan: [], edukasiBudaya: [], umkm: [] };
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Baca preferensi mode tersimpan di localStorage (jika ada)
  const savedMode = localStorage.getItem(STORAGE_MODE_KEY);
  if (savedMode === 'mahasiswa' && isUntidarLoggedIn()) {
    currentMode = 'mahasiswa';
  } else {
    currentMode = 'umum'; // Default landing: Bumi Magelang
  }

  // 2. Setup Mode Switcher Toggle
  setupModeSwitcher();

  // 3. Setup Global Search Input
  setupGlobalSearch();

  // 4. Setup Global Event Delegation (Modal, Bookmark, Copy Citation, dll.)
  setupGlobalEvents();

  // 5. Inisialisasi tampilan awal sesuai mode aktif
  applyActiveMode(currentMode, false);
});

/**
 * Konfigurasi tombol switcher mode di navbar & gerbang login UNTIDAR
 */
function setupModeSwitcher() {
  const btnGateway = document.getElementById('btnGatewayTidaraksa');
  const mobileBtnGateway = document.getElementById('mobileBtnGatewayTidaraksa');
  const btnBackToBumi = document.getElementById('btnBackToBumi');
  const mobileBtnBackToBumi = document.getElementById('mobileBtnBackToBumi');
  const btnLogout = document.getElementById('btnLogoutUntidar');

  // Tombol Masuk TIDARAKSA
  const handleGatewayClick = () => {
    if (isUntidarLoggedIn()) {
      switchMode('mahasiswa');
    } else {
      openUntidarLoginModal();
    }
  };

  if (btnGateway) btnGateway.addEventListener('click', handleGatewayClick);
  if (mobileBtnGateway) mobileBtnGateway.addEventListener('click', handleGatewayClick);

  // Tombol Kembali ke Bumi Magelang
  if (btnBackToBumi) btnBackToBumi.addEventListener('click', () => switchMode('umum'));
  if (mobileBtnBackToBumi) mobileBtnBackToBumi.addEventListener('click', () => switchMode('umum'));

  // Tombol Logout Mahasiswa
  if (btnLogout) btnLogout.addEventListener('click', logoutUntidar);

  // Modal Login Untidar Events
  const closeLoginBtn = document.getElementById('btnCloseUntidarLogin');
  const loginOverlay = document.getElementById('untidarLoginOverlay');
  const loginForm = document.getElementById('formUntidarLogin');
  const demoLoginBtn = document.getElementById('btnUntidarDemoLogin');

  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeUntidarLoginModal);
  if (loginOverlay) loginOverlay.addEventListener('click', closeUntidarLoginModal);

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('loginNama').value.trim();
      const nim = document.getElementById('loginNim').value.trim();
      const fakultas = document.getElementById('loginFakultas').value;
      loginUntidar(nama, nim, fakultas);
    });
  }

  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      loginUntidar('Arya Satria Pratama', '2210401089', 'FKIP');
    });
  }

  // Mobile menu drawer toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('hidden');
    });
  }

  // Inisialisasi TidarAI widget
  if (window.TidarAI) {
    window.TidarAI.init();
  }
}

/**
 * Terapkan mode aktif ke UI
 */
function applyActiveMode(mode, animate = true) {
  const navBumiActions = document.getElementById('navBumiActions');
  const navTidaraksaActions = document.getElementById('navTidaraksaActions');
  const mobileBtnGateway = document.getElementById('mobileBtnGatewayTidaraksa');
  const mobileBtnBackToBumi = document.getElementById('mobileBtnBackToBumi');

  const sectionMahasiswa = document.getElementById('sectionMahasiswa');
  const sectionUmum = document.getElementById('sectionUmum');

  const heroTagBadge = document.getElementById('heroTagBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroDescription = document.getElementById('heroDescription');
  const globalSearchInput = document.getElementById('globalSearchInput');

  // Bersihkan nilai input search
  if (globalSearchInput) globalSearchInput.value = '';

  if (mode === 'mahasiswa') {
    const session = getUntidarSession() || { nama: 'Mahasiswa Untidar', nim: '2210...', fakultas: 'FKIP' };

    // Navbar Desktop
    if (navBumiActions) navBumiActions.classList.add('hidden');
    if (navTidaraksaActions) navTidaraksaActions.classList.remove('hidden');

    // Update Nama Mahasiswa di Navbar
    const navStudentName = document.getElementById('navStudentName');
    const navStudentMeta = document.getElementById('navStudentMeta');
    if (navStudentName) navStudentName.textContent = session.nama;
    if (navStudentMeta) navStudentMeta.textContent = `${session.nim} • ${session.fakultas}`;

    // Mobile Navbar
    if (mobileBtnGateway) mobileBtnGateway.classList.add('hidden');
    if (mobileBtnBackToBumi) mobileBtnBackToBumi.classList.remove('hidden');

    // Update Hero Content untuk Mahasiswa (TIDARAKSA)
    if (heroTagBadge) {
      heroTagBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-950/80 backdrop-blur-md text-amber-200 border border-amber-400/40 shadow-lg';
      heroTagBadge.innerHTML = '<i class="fa-solid fa-graduation-cap text-amber-300"></i> Pustaka Digital • TIDARAKSA UNTIDAR';
    }

    if (heroTitle) {
      heroTitle.innerHTML = 'Yuk, explore sejarah magelang dengan mudah, bersama <span class="text-amber-300 underline decoration-amber-400/80">TIDARAKSA</span>';
    }

    if (heroDescription) {
      heroDescription.textContent = `Selamat datang, ${session.nama} (${session.fakultas}, Universitas Tidar). Nikmati akses eksklusif ke pustaka manuskrip 3D, bedah relief & prasasti kuno, format sitasi ilmiah otomatis, serta pendampingan riset interaktif bersama TidarAI!`;
    }

    const globalSearchWrapper = document.getElementById('globalSearchWrapper');
    if (globalSearchWrapper) globalSearchWrapper.classList.add('hidden');
    if (globalSearchInput) {
      globalSearchInput.placeholder = 'Cari materi kuliah, teori, prasasti, atau nama candi...';
    }

    // Update Greeting di Workspace
    const workspaceGreeting = document.getElementById('workspaceGreeting');
    if (workspaceGreeting) {
      workspaceGreeting.innerHTML = `Selamat datang, <strong>${session.nama}</strong> (${session.nim} - Fakultas ${session.fakultas}). Koleksi buku di bawah disusun berjejer dalam format rak 3D interaktif. Klik buku untuk membaca kajian mendalam, mengutip sitasi, atau diskusikan telaah relief dengan asisten cerdas TidarAI.`;
    }

    // Toggle Section Display
    if (sectionMahasiswa) {
      sectionMahasiswa.classList.remove('hidden');
      if (animate) sectionMahasiswa.classList.add('animate-fade-in');
    }
    if (sectionUmum) {
      sectionUmum.classList.add('hidden');
    }

    // Tampilkan AI Chatbot
    if (window.TidarAI) {
      window.TidarAI.setVisibility(true);
    }
    if (window.ArHeritageModule) {
      window.ArHeritageModule.stopCameraScan();
    }

    if (window.MahasiswaModule) {
      window.MahasiswaModule.initMahasiswaView();
    }
  } else {
    // Mode Umum (Bumi Magelang Active)
    if (navBumiActions) navBumiActions.classList.remove('hidden');
    if (navTidaraksaActions) navTidaraksaActions.classList.add('hidden');

    if (mobileBtnGateway) mobileBtnGateway.classList.remove('hidden');
    if (mobileBtnBackToBumi) mobileBtnBackToBumi.classList.add('hidden');

    // Update Hero Content untuk Umum (Bumi Magelang)
    if (heroTagBadge) {
      heroTagBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-200 border border-emerald-400/40 shadow-lg';
      heroTagBadge.innerHTML = '<i class="fa-solid fa-compass text-emerald-300"></i> Panduan Wisata • Bumi Magelang';
    }

    if (heroTitle) {
      heroTitle.innerHTML = 'Yuk, Temukan Cerita di Setiap Sudut <span class="text-emerald-300 underline decoration-emerald-400/80">Bumi Magelang!</span>';
    }

    if (heroDescription) {
      heroDescription.textContent = 'BUMI MAGELANG merupakan ruang jelajah digital yang mengajak masyarakat mengenal lebih dekat kekayaan Magelang. Mulai dari kisah sejarah, warisan budaya, destinasi wisata, hingga kuliner dan produk lokal. Temukan berbagai informasi dan layanan wisata dalam satu tempat, lalu rasakan sendiri pesona Magelang!';
    }

    const globalSearchWrapper = document.getElementById('globalSearchWrapper');
    if (globalSearchWrapper) globalSearchWrapper.classList.remove('hidden');
    if (globalSearchInput) {
      globalSearchInput.placeholder = 'Cari destinasi wisata, hotel, nama tour guide, atau UMKM...';
    }

    // Toggle Section Display
    if (sectionMahasiswa) {
      sectionMahasiswa.classList.add('hidden');
    }
    if (sectionUmum) {
      sectionUmum.classList.remove('hidden');
      if (animate) sectionUmum.classList.add('animate-fade-in');
    }

    // Sembunyikan AI Chatbot di mode umum
    if (window.TidarAI) {
      window.TidarAI.setVisibility(false);
    }

    if (window.UmumModule) {
      window.UmumModule.initUmumView();
    }
  }
}

/**
 * Setup Global Search
 */
function setupGlobalSearch() {
  const input = document.getElementById('globalSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value;
    if (currentMode === 'mahasiswa') {
      if (window.MahasiswaModule) {
        window.MahasiswaModule.setMahasiswaSearchQuery(val);
      }
    } else {
      if (window.UmumModule) {
        window.UmumModule.setUmumSearchQuery(val);
      }
    }
  });
}

/**
 * Delegasi Event Klik Global
 */
function setupGlobalEvents() {
  document.addEventListener('click', (e) => {
    // 1. Tombol Salin Sitasi Cepat
    const copyBtn = e.target.closest('[data-action="copy-citation"]');
    if (copyBtn) {
      const id = copyBtn.getAttribute('data-id');
      const item = getMahasiswaData().find(m => m.id === id);
      if (item && item.sitasi && item.sitasi.apa) {
        copyToClipboard(item.sitasi.apa, 'Sitasi Format APA berhasil disalin ke clipboard!');
      }
      return;
    }

    // 2. Tombol Bookmark Mahasiswa
    const bookmarkBtn = e.target.closest('[data-action="bookmark-mhs"]');
    if (bookmarkBtn) {
      const id = bookmarkBtn.getAttribute('data-id');
      const isSaved = window.MahasiswaModule ? window.MahasiswaModule.toggleBookmark(id) : false;
      showToast(
        isSaved
          ? 'Materi berhasil disimpan ke Catatan Riset Anda!'
          : 'Materi dihapus dari Catatan Riset.',
        isSaved ? 'success' : 'info'
      );
      return;
    }

    // 3. Tombol Detail Modul Mahasiswa
    const detailMhsBtn = e.target.closest('[data-action="detail-mhs"]');
    if (detailMhsBtn) {
      const id = detailMhsBtn.getAttribute('data-id');
      const item = getMahasiswaData().find(m => m.id === id);
      if (item) {
        openMahasiswaModal(item);
      }
      return;
    }

    // 4. Tombol Detail Destinasi Wisata
    const detailDestBtn = e.target.closest('[data-action="detail-destinasi"]');
    if (detailDestBtn) {
      const id = detailDestBtn.getAttribute('data-id');
      const item = (getUmumData().destinasi || []).find(d => d.id === id);
      if (item) {
        openDestinasiModal(item);
      }
      return;
    }

    // 5. Tombol Detail Budaya Umum
    const detailBudayaBtn = e.target.closest('[data-action="detail-budaya-umum"]');
    if (detailBudayaBtn) {
      const id = detailBudayaBtn.getAttribute('data-id');
      const item = (getUmumData().edukasiBudaya || []).find(b => b.id === id);
      if (item) {
        openBudayaUmumModal(item);
      }
      return;
    }

    // 6. Tombol Booking Layanan (Destinasi / Tour Guide / Penginapan)
    const bookBtn = e.target.closest('[data-action="book-service"]');
    if (bookBtn) {
      const bookType = bookBtn.getAttribute('data-book-type');
      const id = bookBtn.getAttribute('data-id');
      if (window.PaymentModule) {
        window.PaymentModule.openBookingModal(bookType, id);
      }
      return;
    }

    // 7. Tombol Lihat & Unduh E-Ticket di Tab Tiket Saya
    const viewTicketBtn = e.target.closest('[data-action="view-ticket"]');
    if (viewTicketBtn) {
      const idx = parseInt(viewTicketBtn.getAttribute('data-ticket-index'), 10);
      if (window.PaymentModule) window.PaymentModule.viewTicketByIndex(idx);
      return;
    }

    const downloadTicketBtn = e.target.closest('[data-action="download-ticket"]');
    if (downloadTicketBtn) {
      const idx = parseInt(downloadTicketBtn.getAttribute('data-ticket-index'), 10);
      if (window.PaymentModule) window.PaymentModule.downloadTicketByIndex(idx);
      return;
    }

    // 8. Tombol Tutup Modal
    if (e.target.closest('[data-action="close-modal"]') || e.target.id === 'globalModalOverlay') {
      closeGlobalModal();
    }
  });

  // Tombol Escape untuk menutup modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGlobalModal();
    }
  });
}

/**
 * Membuka modal detail modul riset mahasiswa
 */
function openMahasiswaModal(item) {
  const modal = document.getElementById('globalModal');
  const content = document.getElementById('globalModalBody');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <!-- Header Modul -->
      <div class="border-b border-slate-200 pb-5">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
            ${item.matkulKategori}
          </span>
          <span class="text-xs text-slate-500 font-medium">
            <i class="fa-regular fa-clock mr-1"></i>${item.waktuBaca}
          </span>
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
          ${item.judul}
        </h2>
        <p class="text-xs text-slate-500 font-medium">
          <i class="fa-solid fa-user-pen mr-1.5 text-indigo-600"></i>Oleh: ${item.penulis}
        </p>
      </div>

      <!-- Banner Image -->
      <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
        <img src="${item.image}" alt="${item.judul}" class="w-full h-full object-cover" />
      </div>

      <!-- Abstrak -->
      <div class="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5">
        <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2 flex items-center gap-2">
          <i class="fa-solid fa-bookmark text-indigo-600"></i>
          Abstrak Kajian Ilmiah
        </h4>
        <p class="text-xs sm:text-sm text-indigo-950/80 leading-relaxed font-serif italic">
          "${item.abstrak}"
        </p>
      </div>

      <!-- Uraian Materi Lengkap (Markdown-like parser) -->
      <div class="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed space-y-4">
        ${formatMarkdownContent(item.materiLengkap)}
      </div>

      <!-- Kotak Pustaka & Sitasi Ilmiah -->
      <div class="border-t border-slate-200 pt-6 mt-8">
        <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <i class="fa-solid fa-quote-left text-indigo-600"></i>
          Sitasi & Daftar Pustaka Rekomendasi
        </h4>
        
        <div class="space-y-3">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-slate-700">Format APA 7th Edition:</span>
              <button 
                onclick="navigator.clipboard.writeText('${escapeForAttr(item.sitasi.apa)}').then(() => alert('Sitasi APA disalin!'))"
                class="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                <i class="fa-solid fa-copy text-[10px]"></i> Salin APA
              </button>
            </div>
            <p class="text-xs text-slate-600 font-mono">${item.sitasi.apa}</p>
          </div>

          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-slate-700">Format Chicago Notes & Bibliography:</span>
              <button 
                onclick="navigator.clipboard.writeText('${escapeForAttr(item.sitasi.chicago)}').then(() => alert('Sitasi Chicago disalin!'))"
                class="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                <i class="fa-solid fa-copy text-[10px]"></i> Salin Chicago
              </button>
            </div>
            <p class="text-xs text-slate-600 font-mono">${item.sitasi.chicago}</p>
          </div>
        </div>
      </div>

      <!-- Aksi Cetak & Bookmark di Modal -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 no-print">
        <button 
          onclick="window.print()" 
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors">
          <i class="fa-solid fa-print"></i>
          <span>Cetak Modul / Simpan PDF</span>
        </button>
        <button 
          data-action="close-modal"
          class="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all">
          Selesai Membaca
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

/**
 * Membuka modal detail destinasi wisata
 */
function openDestinasiModal(item) {
  const modal = document.getElementById('globalModal');
  const content = document.getElementById('globalModalBody');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-slate-200 pb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            ${item.kategori}
          </span>
          <div class="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            <i class="fa-solid fa-star text-amber-500"></i>
            <span>${item.rating}</span>
            <span class="text-slate-400 font-normal">(${item.ulasan} Ulasan)</span>
          </div>
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900 leading-tight mb-1">
          ${item.nama}
        </h2>
        <p class="text-xs sm:text-sm text-emerald-800 font-medium">
          "${item.tagline}"
        </p>
      </div>

      <div class="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
        <img src="${item.image}" alt="${item.nama}" class="w-full h-full object-cover" />
      </div>

      <!-- Info Cepat: Tiket, Jam, Lokasi -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-ticket text-xs"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">Harga Tiket Masuk:</span>
            <span class="text-slate-600">${item.hargaTiket}</span>
          </div>
        </div>

        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-clock text-xs"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">Jam Operasional:</span>
            <span class="text-slate-600">${item.jamBuka}</span>
          </div>
        </div>

        <div class="col-span-full flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
          <div class="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-location-dot text-xs"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">Alamat Lengkap:</span>
            <span class="text-slate-600 leading-relaxed">${item.lokasi}</span>
          </div>
        </div>
      </div>

      <!-- Narasi Deskripsi -->
      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-2">Tentang Destinasi</h4>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          ${item.deskripsi}
        </p>
      </div>

      <!-- Fasilitas -->
      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-2">Fasilitas Tersedia</h4>
        <div class="flex flex-wrap gap-2">
          ${item.fasilitas.map(f => `
            <span class="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-emerald-600 text-[10px]"></i>
              ${f}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <a 
          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all">
          <i class="fa-solid fa-diamond-turn-right text-emerald-400"></i>
          <span>Petunjuk Arah Google Maps</span>
        </a>

        <button 
          data-action="close-modal"
          class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all">
          Tutup Jendela
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

/**
 * Membuka modal detail budaya umum & cerita rakyat
 */
function openBudayaUmumModal(item) {
  const modal = document.getElementById('globalModal');
  const content = document.getElementById('globalModalBody');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-slate-200 pb-4">
        <span class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
          ${item.kategori}
        </span>
        <h2 class="text-2xl font-extrabold text-slate-900 leading-tight">
          ${item.judul}
        </h2>
      </div>

      <div class="relative h-64 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
        <img src="${item.image}" alt="${item.judul}" class="w-full h-full object-cover" />
      </div>

      <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-serif">
        ${formatMarkdownContent(item.uraianLengkap)}
      </div>

      <div class="flex justify-end pt-4 border-t border-slate-100">
        <button 
          data-action="close-modal"
          class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-sm transition-all">
          Tutup Cerita
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

/**
 * Menutup modal global
 */
function closeGlobalModal() {
  const modal = document.getElementById('globalModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

/**
 * Salin teks ke clipboard & tampilkan toast notifikasi
 */
function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage, 'success');
  }).catch(() => {
    showToast('Gagal menyalin teks ke clipboard.', 'error');
  });
}

/**
 * Tampilkan pesan notifikasi melayang (Toast)
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-900 text-white border-emerald-700',
    info: 'bg-slate-900 text-white border-slate-700',
    error: 'bg-rose-900 text-white border-rose-700'
  };

  const icons = {
    success: 'fa-circle-check text-emerald-400',
    info: 'fa-circle-info text-blue-400',
    error: 'fa-triangle-exclamation text-rose-400'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border text-xs shadow-xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || icons.info} text-sm"></i>
    <span class="font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animasi masuk
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  // Hilang otomatis setelah 3 detik
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Parser Markdown yang tangguh dan rapi untuk modul baca & modal
 */
function formatMarkdownContent(text) {
  if (!text) return '';

  const lines = text.split('\n');
  const output = [];
  let currentList = null; // 'ul' | 'ol' | null

  function closeList() {
    if (currentList === 'ul') {
      output.push('</ul>');
      currentList = null;
    } else if (currentList === 'ol') {
      output.push('</ol>');
      currentList = null;
    }
  }

  function inlineFormat(str) {
    if (!str) return '';
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      closeList();
      const content = inlineFormat(line.slice(4).trim());
      output.push(`<h3 class="text-base sm:text-lg font-bold text-slate-900 mt-6 mb-3 pt-2 pb-1 border-b border-slate-100 flex items-center gap-2">${content}</h3>`);
    } else if (line.startsWith('## ')) {
      closeList();
      const content = inlineFormat(line.slice(3).trim());
      output.push(`<h2 class="text-lg sm:text-xl font-extrabold text-slate-900 mt-7 mb-3.5 pb-1.5 border-b border-slate-200">${content}</h2>`);
    } else if (line.startsWith('# ')) {
      closeList();
      const content = inlineFormat(line.slice(2).trim());
      output.push(`<h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">${content}</h1>`);
    }
    // Bullet List (- or *)
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentList === 'ol') {
        output.push('</ol>');
        currentList = null;
      }
      if (!currentList) {
        output.push('<ul class="my-3 space-y-2.5 pl-1">');
        currentList = 'ul';
      }
      const content = inlineFormat(line.slice(2).trim());
      output.push(`
        <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
          <span class="flex-1">${content}</span>
        </li>
      `);
    }
    // Numbered List (1. 2. etc.)
    else if (/^\d+\.\s+/.test(line)) {
      if (currentList === 'ul') {
        output.push('</ul>');
        currentList = null;
      }
      if (!currentList) {
        output.push('<ol class="my-3 space-y-2.5 pl-1">');
        currentList = 'ol';
      }
      const numMatch = line.match(/^(\d+)\.\s+(.*)/);
      const num = numMatch ? numMatch[1] : '1';
      const rest = numMatch ? numMatch[2] : line;
      const content = inlineFormat(rest.trim());
      output.push(`
        <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span class="font-bold text-indigo-600 text-xs shrink-0 w-5">${num}.</span>
          <span class="flex-1">${content}</span>
        </li>
      `);
    }
    // Regular paragraph
    else {
      closeList();
      const content = inlineFormat(line);
      output.push(`<p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">${content}</p>`);
    }
  }

  closeList();
  return output.join('\n');
}

function escapeForAttr(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
