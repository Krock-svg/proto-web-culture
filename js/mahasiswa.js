/**
 * LOGIKA INTERAKSI & TAMPILAN KHUSUS MODE MAHASISWA
 * Mendukung filter mata kuliah, pencarian akademik, salin sitasi ilmiah,
 * serta penyimpanan catatan/bookmark riset di localStorage.
 * Kompatibel via file:// (double-click) dan http:// (localhost).
 */

(function () {
  let activeCategory = 'Semua';
  let searchQuery = '';
  let showingBookmarksOnly = false;

  // Kunci penyimpanan bookmark mahasiswa di localStorage
  const STORAGE_BOOKMARKS_KEY = 'pesona_magelang_mhs_bookmarks';

  /**
   * Mengambil dataMahasiswa dari global window
   */
  function getData() {
    return window.dataMahasiswa || [];
  }

  /**
   * Mengambil daftar ID materi yang dibookmark oleh mahasiswa
   */
  function getSavedBookmarkIds() {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Menyimpan atau menghapus bookmark materi
   */
  function toggleBookmark(id) {
    let bookmarks = getSavedBookmarkIds();
    const index = bookmarks.indexOf(id);
    let isBookmarked = false;

    if (index > -1) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(id);
      isBookmarked = true;
    }

    localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    updateBookmarkBadgeCount();
    renderMahasiswaContent();
    return isBookmarked;
  }

  /**
   * Memperbarui badge jumlah materi yang disimpan
   */
  function updateBookmarkBadgeCount() {
    const badgeEl = document.getElementById('bookmarkCountBadge');
    if (badgeEl) {
      const count = getSavedBookmarkIds().length;
      badgeEl.textContent = count;
      if (count > 0) {
        badgeEl.classList.remove('hidden');
      } else {
        badgeEl.classList.add('hidden');
      }
    }
  }

  /**
   * Inisialisasi tampilan Mode Mahasiswa
   */
  function initMahasiswaView() {
    setupFilterButtons();
    updateBookmarkBadgeCount();
    renderMahasiswaContent();
  }

  /**
   * Pasang event listener untuk tombol filter kategori mata kuliah
   */
  function setupFilterButtons() {
    const container = document.getElementById('mahasiswaCategoryFilters');
    if (!container) return;

    const categories = [
      { label: 'Semua Bidang Ilmu', value: 'Semua', icon: 'fa-book-open' },
      { label: 'Arkeologi & Sejarah', value: 'Arkeologi & Sejarah', icon: 'fa-monument' },
      { label: 'Antropologi & Seni', value: 'Antropologi & Seni Pertunjukan', icon: 'fa-masks-theater' },
      { label: 'Arsitektur Vernakular', value: 'Arsitektur Vernakular', icon: 'fa-archway' },
      { label: 'Sosiologi & Kebencanaan', value: 'Sosiologi & Kearifan Lokal', icon: 'fa-people-group' }
    ];

    container.innerHTML = categories.map(cat => `
      <button 
        data-category="${cat.value}"
        class="cat-filter-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat.value && !showingBookmarksOnly
        ? 'bg-indigo-700 text-white shadow-md shadow-indigo-200'
        : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
      }">
        <i class="fa-solid ${cat.icon} text-xs"></i>
        <span>${cat.label}</span>
      </button>
    `).join('');

    // Event listener untuk tombol filter
    container.querySelectorAll('.cat-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showingBookmarksOnly = false;
        activeCategory = btn.getAttribute('data-category');

        container.querySelectorAll('.cat-filter-btn').forEach(b => {
          b.className = 'cat-filter-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50';
        });
        btn.className = 'cat-filter-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-indigo-700 text-white shadow-md shadow-indigo-200';

        const bookmarkFilterBtn = document.getElementById('btnFilterBookmarkMhs');
        if (bookmarkFilterBtn) {
          bookmarkFilterBtn.classList.remove('bg-amber-600', 'text-white');
          bookmarkFilterBtn.classList.add('bg-white', 'text-slate-700');
        }

        renderMahasiswaContent();
      });
    });

    // Tombol toggle khusus bookmark catatan riset
    const bookmarkFilterBtn = document.getElementById('btnFilterBookmarkMhs');
    if (bookmarkFilterBtn) {
      bookmarkFilterBtn.onclick = () => {
        showingBookmarksOnly = !showingBookmarksOnly;
        if (showingBookmarksOnly) {
          bookmarkFilterBtn.classList.add('bg-amber-600', 'text-white');
          bookmarkFilterBtn.classList.remove('bg-white', 'text-slate-700');
          container.querySelectorAll('.cat-filter-btn').forEach(b => {
            b.className = 'cat-filter-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50';
          });
        } else {
          bookmarkFilterBtn.classList.remove('bg-amber-600', 'text-white');
          bookmarkFilterBtn.classList.add('bg-white', 'text-slate-700');
        }
        renderMahasiswaContent();
      };
    }
  }

  /**
   * Filter dan pencarian data mahasiswa
   */
  function setMahasiswaSearchQuery(query) {
    searchQuery = (query || '').toLowerCase().trim();
    renderMahasiswaContent();
  }

  /**
   * Render kartu-kartu materi kuliah
   */
  function renderMahasiswaContent() {
    const container = document.getElementById('mahasiswaGrid');
    if (!container) return;

    const data = getData();
    const bookmarkedIds = getSavedBookmarkIds();

    // Filter logika
    let filtered = data.filter(item => {
      if (showingBookmarksOnly && !bookmarkedIds.includes(item.id)) {
        return false;
      }
      if (!showingBookmarksOnly && activeCategory !== 'Semua' && item.matkulKategori !== activeCategory) {
        return false;
      }
      if (searchQuery) {
        const matchJudul = item.judul.toLowerCase().includes(searchQuery);
        const matchAbstrak = item.abstrak.toLowerCase().includes(searchQuery);
        const matchKategori = item.matkulKategori.toLowerCase().includes(searchQuery);
        const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(searchQuery));
        return matchJudul || matchAbstrak || matchKategori || matchKeywords;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-4 text-2xl">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-800 mb-1">Materi Tidak Ditemukan</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            ${showingBookmarksOnly
          ? 'Belum ada materi kuliah yang Anda simpan ke catatan riset. Klik ikon bookmark pada kartu untuk menyimpan.'
          : 'Coba ubah kata kunci pencarian atau pilih kategori mata kuliah lain.'}
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isBookmarked = bookmarkedIds.includes(item.id);

      return `
        <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
          <!-- Banner Gambar & Badge -->
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img 
              src="${item.image}" 
              alt="${item.judul}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent"></div>
            
            <!-- Badge Mata Kuliah -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-indigo-900/90 backdrop-blur-sm text-indigo-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
              <i class="fa-solid fa-award text-amber-300 text-[10px]"></i>
              <span>${item.badge}</span>
            </div>

            <!-- Tombol Bookmark Riset -->
            <button 
              data-action="bookmark-mhs" 
              data-id="${item.id}"
              title="${isBookmarked ? 'Hapus dari Catatan Riset' : 'Simpan ke Catatan Riset'}"
              class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${isBookmarked
          ? 'bg-amber-500 text-white shadow-md shadow-amber-300'
          : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-amber-500'
        }">
              <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark text-xs"></i>
            </button>

            <!-- Estimasi Waktu Baca -->
            <div class="absolute bottom-2.5 left-3 text-xs text-white/90 font-medium flex items-center gap-1.5">
              <i class="fa-regular fa-clock text-[11px]"></i>
              <span>${item.waktuBaca}</span>
              <span class="opacity-60">•</span>
              <span>${item.matkulKategori}</span>
            </div>
          </div>

          <!-- Konten Card -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
                ${item.judul}
              </h3>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                ${item.abstrak}
              </p>

              <!-- Tag Kata Kunci -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${item.keywords.slice(0, 3).map(kw => `
                  <span class="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">#${kw}</span>
                `).join('')}
              </div>
            </div>

            <!-- Footer Kartu: Referensi & Aksi -->
            <div class="pt-3 border-t border-slate-100 mt-auto">
              <div class="flex items-center justify-between gap-2">
                <!-- Tombol Salin Sitasi Cepat -->
                <button 
                  data-action="copy-citation" 
                  data-id="${item.id}"
                  title="Salin Sitasi Ilmiah Format APA"
                  class="flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-600 font-medium py-1.5 px-2.5 rounded-lg hover:bg-indigo-50 border border-slate-200 transition-colors">
                  <i class="fa-solid fa-quote-right text-indigo-500 text-[11px]"></i>
                  <span>Sitasi APA</span>
                </button>

                <!-- Tombol Baca Lengkap -->
                <button 
                  data-action="detail-mhs" 
                  data-id="${item.id}"
                  class="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3.5 rounded-lg shadow-sm hover:shadow transition-all">
                  <span>Pelajari Modul</span>
                  <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Pasang module ke window global
  window.MahasiswaModule = {
    initMahasiswaView,
    setMahasiswaSearchQuery,
    toggleBookmark,
    updateBookmarkBadgeCount,
    getSavedBookmarkIds,
    renderMahasiswaContent
  };
})();
