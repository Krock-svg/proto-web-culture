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
let currentMode = 'mahasiswa'; // default mode: 'mahasiswa' atau 'umum'

function getMahasiswaData() {
  return window.dataMahasiswa || [];
}

function getUmumData() {
  return window.dataUmum || { destinasi: [], tourGuide: [], penginapan: [], edukasiBudaya: [], umkm: [] };
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Baca preferensi mode tersimpan di localStorage (jika ada)
  const savedMode = localStorage.getItem(STORAGE_MODE_KEY);
  if (savedMode === 'mahasiswa' || savedMode === 'umum') {
    currentMode = savedMode;
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
 * Konfigurasi tombol switcher mode di navbar
 */
function setupModeSwitcher() {
  const btnModeMhs = document.getElementById('btnModeMhs');
  const btnModeUmum = document.getElementById('btnModeUmum');
  const mobileBtnModeMhs = document.getElementById('mobileBtnModeMhs');
  const mobileBtnModeUmum = document.getElementById('mobileBtnModeUmum');

  const switchMode = (mode) => {
    if (currentMode === mode) return;
    currentMode = mode;
    localStorage.setItem(STORAGE_MODE_KEY, currentMode);
    applyActiveMode(currentMode, true);
  };

  if (btnModeMhs) btnModeMhs.addEventListener('click', () => switchMode('mahasiswa'));
  if (btnModeUmum) btnModeUmum.addEventListener('click', () => switchMode('umum'));
  if (mobileBtnModeMhs) mobileBtnModeMhs.addEventListener('click', () => switchMode('mahasiswa'));
  if (mobileBtnModeUmum) mobileBtnModeUmum.addEventListener('click', () => switchMode('umum'));

  // Mobile menu drawer toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('hidden');
    });
  }
}

/**
 * Terapkan mode aktif ke UI
 */
function applyActiveMode(mode, animate = true) {
  const btnModeMhs = document.getElementById('btnModeMhs');
  const btnModeUmum = document.getElementById('btnModeUmum');
  const mobileBtnModeMhs = document.getElementById('mobileBtnModeMhs');
  const mobileBtnModeUmum = document.getElementById('mobileBtnModeUmum');

  const sectionMahasiswa = document.getElementById('sectionMahasiswa');
  const sectionUmum = document.getElementById('sectionUmum');

  const heroTagBadge = document.getElementById('heroTagBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroDescription = document.getElementById('heroDescription');
  const globalSearchInput = document.getElementById('globalSearchInput');

  // Bersihkan nilai input search
  if (globalSearchInput) globalSearchInput.value = '';

  if (mode === 'mahasiswa') {
    // Update Switcher Button Styling (Mahasiswa Active)
    const activeClasses = 'bg-indigo-700 text-white shadow-md shadow-indigo-300 font-bold';
    const inactiveClasses = 'text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-100';

    if (btnModeMhs) btnModeMhs.className = `flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${activeClasses}`;
    if (btnModeUmum) btnModeUmum.className = `flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${inactiveClasses}`;

    if (mobileBtnModeMhs) mobileBtnModeMhs.className = `w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${activeClasses}`;
    if (mobileBtnModeUmum) mobileBtnModeUmum.className = `w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${inactiveClasses}`;

    // Update Hero Content untuk Mahasiswa (TIDARAKSA)
    if (heroTagBadge) {
      heroTagBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-950/80 backdrop-blur-md text-indigo-200 border border-indigo-400/40 shadow-lg';
      heroTagBadge.innerHTML = '<i class="fa-solid fa-graduation-cap text-amber-300"></i> Ruang Eksplorasi Digital • TIDARAKSA';
    }

    if (heroTitle) {
      heroTitle.innerHTML = 'Belajar Lebih Mudah, Jelajah Lebih Luas Bersama <span class="text-amber-300 underline decoration-amber-400/80">TIDARAKSA</span>';
    }

    if (heroDescription) {
      heroDescription.textContent = 'TIDARAKSA merupakan ruang eksplorasi digital yang mengajak mahasiswa mengenal lebih dekat sejarah, budaya, dan berbagai potensi lokal Magelang. Mulai dari wawasan edukatif, kisah peninggalan sejarah, tradisi budaya, hingga destinasi wisata yang menyimpan nilai dan cerita. Temukan berbagai informasi, referensi, serta layanan wisata dalam satu tempat untuk memperluas pengetahuan sekaligus merasakan pengalaman menjelajahi Magelang!';
    }

    if (globalSearchInput) {
      globalSearchInput.placeholder = 'Cari materi kuliah, teori, prasasti, atau nama candi...';
    }

    // Toggle Section Display
    if (sectionMahasiswa) {
      sectionMahasiswa.classList.remove('hidden');
      if (animate) sectionMahasiswa.classList.add('animate-fade-in');
    }
    if (sectionUmum) {
      sectionUmum.classList.add('hidden');
    }

    if (window.MahasiswaModule) {
      window.MahasiswaModule.initMahasiswaView();
    }
  } else {
    // Mode Umum Active
    const activeClasses = 'bg-emerald-700 text-white shadow-md shadow-emerald-300 font-bold';
    const inactiveClasses = 'text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-100';

    if (btnModeUmum) btnModeUmum.className = `flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${activeClasses}`;
    if (btnModeMhs) btnModeMhs.className = `flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all ${inactiveClasses}`;

    if (mobileBtnModeUmum) mobileBtnModeUmum.className = `w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${activeClasses}`;
    if (mobileBtnModeMhs) mobileBtnModeMhs.className = `w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs transition-all ${inactiveClasses}`;

    // Update Hero Content untuk Umum (Bumi Magelang)
    if (heroTagBadge) {
      heroTagBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-200 border border-emerald-400/40 shadow-lg';
      heroTagBadge.innerHTML = '<i class="fa-solid fa-compass text-emerald-300"></i> Panduan Wisata • Bumi Magelang';
    }

    if (heroTitle) {
      heroTitle.innerHTML = 'Jelajahi Pesona Megah Wisata & <span class="text-emerald-300 underline decoration-emerald-400/80">Budaya Bumi Magelang</span>';
    }

    if (heroDescription) {
      heroDescription.textContent = 'Panduan lengkap liburan di Magelang: temukan destinasi candi dunia, keajaiban panorama alam lereng Sumbing, pemandu wisata berlisensi, hotel & homestay, kuliner legendaris, dan sentra kerajinan UMKM lokal.';
    }

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

    // 6. Tombol Tutup Modal
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
 * Helper format teks Markdown sederhana menjadi elemen HTML
 */
function formatMarkdownContent(text) {
  if (!text) return '';
  return text
    .split('\n\n')
    .map(p => {
      p = p.trim();
      if (p.startsWith('### ')) {
        return `<h3 class="text-base font-bold text-slate-900 mt-4 mb-2">${p.replace('### ', '')}</h3>`;
      }
      if (p.startsWith('## ')) {
        return `<h2 class="text-lg font-bold text-slate-900 mt-4 mb-2">${p.replace('## ', '')}</h2>`;
      }
      if (p.startsWith('- ')) {
        const listItems = p.split('\n').map(li => `<li class="ml-4 list-disc">${li.replace(/^- /, '')}</li>`).join('');
        return `<ul class="my-2 space-y-1">${listItems}</ul>`;
      }
      if (p.startsWith('1. ')) {
        const listItems = p.split('\n').map(li => `<li class="ml-4 list-decimal">${li.replace(/^\d+\.\s*/, '')}</li>`).join('');
        return `<ol class="my-2 space-y-1">${listItems}</ol>`;
      }
      // Bold & Italic
      p = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      p = p.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return `<p class="mb-3">${p}</p>`;
    })
    .join('');
}

function escapeForAttr(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
