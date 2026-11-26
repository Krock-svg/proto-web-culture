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
   * Memperbarui badge jumlah materi yang disimpan & statistik workspace
   */
  function updateBookmarkBadgeCount() {
    const count = getSavedBookmarkIds().length;
    const badgeEl = document.getElementById('bookmarkCountBadge');
    if (badgeEl) {
      badgeEl.textContent = count;
      if (count > 0) {
        badgeEl.classList.remove('hidden');
      } else {
        badgeEl.classList.add('hidden');
      }
    }
    const statsBookmark = document.getElementById('statsCountBookmark');
    if (statsBookmark) statsBookmark.textContent = count;

    const statsModul = document.getElementById('statsCountModul');
    if (statsModul) statsModul.textContent = getData().length;
  }

  /**
   * Inisialisasi tampilan Mode Mahasiswa
   */
  function initMahasiswaView() {
    setupWorkspaceTabs();
    setupFilterButtons();
    updateBookmarkBadgeCount();
    renderMahasiswaContent();
  }

  /**
   * Setup navigasi tab internal Workspace TIDARAKSA
   */
  function setupWorkspaceTabs() {
    const tabBtns = document.querySelectorAll('.ws-tab-btn');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.wsTab;

        if (tab === 'ai') {
          if (window.TidarAI) {
            window.TidarAI.askQuestion('Halo TidarAI! Berikan rekomendasi topik penelitian budaya Magelang untuk mahasiswa UNTIDAR.');
          }
          return;
        }

        // Update active button style
        tabBtns.forEach(b => {
          if (b.dataset.wsTab === tab) {
            b.className = 'ws-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap bg-indigo-700 text-white shadow-md shadow-indigo-200';
          } else {
            b.className = 'ws-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50';
          }
        });

        if (tab === 'modul') {
          showingBookmarksOnly = false;
          setupFilterButtons();
          renderMahasiswaContent();
        } else if (tab === 'riset') {
          showingBookmarksOnly = true;
          setupFilterButtons();
          renderMahasiswaContent();
        } else if (tab === 'lapangan') {
          renderFieldworkGuide();
        }
      });
    });
  }

  /**
   * Render Panduan Observasi Lapangan khusus Mahasiswa UNTIDAR
   */
  function renderFieldworkGuide() {
    const container = document.getElementById('mahasiswaGrid');
    if (!container) return;

    container.innerHTML = `
      <div class="col-span-full space-y-6">
        <div class="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg">
              <i class="fa-solid fa-clipboard-check"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900">Lembar Observasi Lapangan Mahasiswa UNTIDAR</h3>
              <p class="text-xs text-slate-500">Panduan praktis saat melakukan kunjungan riset ke Candi Borobudur, Mendut, Pawon, atau Situs Canggal.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 class="text-sm font-bold text-indigo-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
                Observasi Struktur & Kosmologi
              </h4>
              <ul class="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                <li>Amati perbedaan material dan teknik sambungan batu andesit tanpa perekat semen.</li>
                <li>Catat transisi visual dari tingkat <strong>Kamadhatu</strong>, <strong>Rupadhatu</strong>, hingga <strong>Arupadhatu</strong>.</li>
                <li>Identifikasi sistem drainase (jaladwara) dan konservasi batuan oleh BPCB.</li>
              </ul>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 class="text-sm font-bold text-amber-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">2</span>
                Dokumentasi Relief & Refleksi
              </h4>
              <ul class="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                <li>Pilih minimal 2 panil relief (<em>Lalitavistara</em> atau <em>Jataka</em>) untuk dianalisis nilai moralnya.</li>
                <li>Kaitkan temuan lapangan dengan nilai <strong>Karakter Tidar</strong> dan konteks pariwisata berkelanjutan.</li>
                <li>Gunakan asisten <strong>TidarAI</strong> untuk membantu menyusun sitasi APA/Chicago laporan Anda.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
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

    const bookThemes = [
      'from-indigo-900 via-indigo-800 to-slate-900 border-indigo-400/30',
      'from-amber-800 via-amber-900 to-stone-900 border-amber-400/30',
      'from-emerald-900 via-teal-900 to-slate-900 border-emerald-400/30',
      'from-rose-900 via-rose-950 to-slate-900 border-rose-400/30',
      'from-slate-800 via-slate-900 to-indigo-950 border-slate-400/30'
    ];

    container.innerHTML = filtered.map((item, idx) => {
      const isBookmarked = bookmarkedIds.includes(item.id);
      const themeClass = bookThemes[idx % bookThemes.length];

      return `
        <article class="book-card-3d rounded-r-2xl rounded-l-md bg-gradient-to-br ${themeClass} border shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer min-h-[340px] group relative"
          data-action="baca-mhs" data-id="${item.id}">
          <!-- Efek Punggung Buku 3D -->
          <div class="book-spine-crease"></div>

          <!-- Header Sampul Buku -->
          <div class="p-5 pl-7 space-y-3 relative z-10">
            <div class="flex items-start justify-between gap-2">
              <span class="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-amber-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10">
                <i class="fa-solid fa-award text-amber-300 text-[9px]"></i>
                ${item.badge}
              </span>

              <button 
                data-action="bookmark-mhs" 
                data-id="${item.id}"
                onclick="event.stopPropagation()"
                title="${isBookmarked ? 'Hapus dari Catatan Riset' : 'Simpan ke Catatan Riset'}"
                class="w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 shrink-0 ${isBookmarked
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/40'
                  : 'bg-white/10 text-white/80 hover:bg-white/25 hover:text-amber-300'
                }">
                <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark text-xs"></i>
              </button>
            </div>

            <div class="pt-1">
              <span class="text-[10px] font-semibold text-white/60 uppercase tracking-widest block mb-1">
                ${item.matkulKategori}
              </span>
              <h3 class="text-base sm:text-lg font-extrabold text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-3 font-serif">
                ${item.judul}
              </h3>
            </div>
          </div>

          <!-- Gambar Mini & Footer Sampul -->
          <div class="px-5 pl-7 pb-5 pt-2 space-y-3 relative z-10">
            <div class="h-24 rounded-xl overflow-hidden border border-white/15 relative">
              <img 
                src="${item.image}" 
                alt="${item.judul}" 
                class="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span class="absolute bottom-1.5 left-2.5 text-[10px] text-white/90 font-medium flex items-center gap-1">
                <i class="fa-regular fa-clock text-[9px] text-amber-300"></i> ${item.waktuBaca}
              </span>
            </div>

            <div class="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-white/80">
              <span class="truncate max-w-[140px] font-medium">${item.penulis}</span>
              <span class="inline-flex items-center gap-1 font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                Buka Buku <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');
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
