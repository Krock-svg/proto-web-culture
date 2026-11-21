/**
 * LOGIKA INTERAKSI & TAMPILAN KHUSUS MODE UMUM
 * Mengelola 5 sub-tab utama:
 * 1. Destinasi Wisata
 * 2. Pilihan Tour Guide
 * 3. Penginapan & Hotel
 * 4. Edukasi Budaya & Kuliner Khas
 * 5. UMKM Sekitar Wisata
 * Kompatibel via file:// (double-click) dan http:// (localhost).
 */

(function () {
  let activeSubTab = 'destinasi'; // 'destinasi' | 'tourGuide' | 'penginapan' | 'edukasiBudaya' | 'umkm'
  let destinationFilter = 'Semua';
  let umumSearchQuery = '';

  function getData() {
    return window.dataUmum || {
      destinasi: [],
      tourGuide: [],
      penginapan: [],
      edukasiBudaya: [],
      umkm: []
    };
  }

  /**
   * Inisialisasi tampilan Mode Umum
   */
  function initUmumView() {
    setupSubTabNavigation();
    setupDestinationCategoryFilters();
    renderUmumCurrentTab();
  }

  /**
   * Setup navigasi antar sub-tab pada Mode Umum
   */
  function setupSubTabNavigation() {
    const container = document.getElementById('umumSubTabNav');
    if (!container) return;

    const dataUmum = getData();
    const tabs = [
      { id: 'destinasi', label: 'Destinasi Wisata', icon: 'fa-map-location-dot', count: dataUmum.destinasi.length },
      { id: 'tourGuide', label: 'Pilihan Tour Guide', icon: 'fa-user-tie', count: dataUmum.tourGuide.length },
      { id: 'penginapan', label: 'Hotel & Penginapan', icon: 'fa-hotel', count: dataUmum.penginapan.length },
      { id: 'edukasiBudaya', label: 'Budaya & Kuliner', icon: 'fa-utensils', count: dataUmum.edukasiBudaya.length },
      { id: 'umkm', label: 'UMKM Sekitar Wisata', icon: 'fa-store', count: dataUmum.umkm.length }
    ];

    container.innerHTML = tabs.map(tab => `
      <button 
        data-subtab="${tab.id}"
        class="subtab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
          activeSubTab === tab.id
            ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200'
            : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50'
        }">
        <i class="fa-solid ${tab.icon} text-xs"></i>
        <span>${tab.label}</span>
        <span class="text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
          activeSubTab === tab.id ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
        }">${tab.count}</span>
      </button>
    `).join('');

    container.querySelectorAll('.subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubTab = btn.getAttribute('data-subtab');
        
        container.querySelectorAll('.subtab-btn').forEach(b => {
          b.className = 'subtab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap bg-white text-slate-700 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50';
        });
        btn.className = 'subtab-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap bg-emerald-700 text-white shadow-md shadow-emerald-200';

        const destFilterWrapper = document.getElementById('destFilterWrapper');
        if (destFilterWrapper) {
          if (activeSubTab === 'destinasi') {
            destFilterWrapper.classList.remove('hidden');
          } else {
            destFilterWrapper.classList.add('hidden');
          }
        }

        renderUmumCurrentTab();
      });
    });
  }

  /**
   * Setup filter kategori untuk destinasi wisata
   */
  function setupDestinationCategoryFilters() {
    const container = document.getElementById('destinationCategoryFilters');
    if (!container) return;

    const filters = ['Semua', 'Sejarah & Candi', 'Wisata Alam', 'Rekreasi Keluarga', 'Wisata Edukasi & Alam'];

    container.innerHTML = filters.map(f => `
      <button 
        data-destfilter="${f}"
        class="dest-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          destinationFilter === f 
            ? 'bg-slate-900 text-white' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }">
        ${f}
      </button>
    `).join('');

    container.querySelectorAll('.dest-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        destinationFilter = btn.getAttribute('data-destfilter');
        container.querySelectorAll('.dest-filter-btn').forEach(b => {
          b.className = 'dest-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-slate-100 text-slate-600 hover:bg-slate-200';
        });
        btn.className = 'dest-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-slate-900 text-white';
        renderUmumCurrentTab();
      });
    });
  }

  /**
   * Filter dan pencarian data mode umum
   */
  function setUmumSearchQuery(query) {
    umumSearchQuery = (query || '').toLowerCase().trim();
    renderUmumCurrentTab();
  }

  /**
   * Render konten tab yang sedang aktif
   */
  function renderUmumCurrentTab() {
    const grid = document.getElementById('umumGrid');
    if (!grid) return;

    switch (activeSubTab) {
      case 'destinasi':
        renderDestinasi(grid);
        break;
      case 'tourGuide':
        renderTourGuide(grid);
        break;
      case 'penginapan':
        renderPenginapan(grid);
        break;
      case 'edukasiBudaya':
        renderEdukasiBudaya(grid);
        break;
      case 'umkm':
        renderUMKM(grid);
        break;
    }
  }

  /**
   * 1. Render Destinasi Wisata
   */
  function renderDestinasi(grid) {
    const dataUmum = getData();
    let items = (dataUmum.destinasi || []).filter(d => {
      if (destinationFilter !== 'Semua' && d.kategori !== destinationFilter) {
        return false;
      }
      if (umumSearchQuery) {
        return d.nama.toLowerCase().includes(umumSearchQuery) ||
               d.lokasi.toLowerCase().includes(umumSearchQuery) ||
               d.tagline.toLowerCase().includes(umumSearchQuery);
      }
      return true;
    });

    if (items.length === 0) {
      showEmptyState(grid, 'Destinasi Wisata Tidak Ditemukan');
      return;
    }

    grid.innerHTML = items.map(d => `
      <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        <div class="relative h-52 overflow-hidden bg-slate-100">
          <img 
            src="${d.image}" 
            alt="${d.nama}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>
          
          <span class="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-sm text-emerald-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
            ${d.kategori}
          </span>

          <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
            <i class="fa-solid fa-star text-amber-500"></i>
            <span>${d.rating}</span>
            <span class="text-slate-400 font-normal">(${d.ulasan.toLocaleString('id-ID')})</span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 text-white">
            <div class="flex items-center gap-1.5 text-xs text-emerald-200 font-medium mb-1">
              <i class="fa-solid fa-clock text-[10px]"></i>
              <span>${d.jamBuka}</span>
            </div>
            <h3 class="text-lg font-bold text-white leading-tight">
              ${d.nama}
            </h3>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs text-emerald-800 font-semibold mb-2">
              "${d.tagline}"
            </p>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              ${d.deskripsi}
            </p>

            <div class="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5 border border-slate-100">
              <div class="flex items-start gap-2 text-xs text-slate-700">
                <i class="fa-solid fa-ticket text-emerald-600 mt-0.5"></i>
                <span class="font-medium">${d.hargaTiket}</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-slate-600">
                <i class="fa-solid fa-location-dot text-rose-500 mt-0.5"></i>
                <span class="line-clamp-1">${d.lokasi}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium py-1.5 px-3 rounded-lg hover:bg-emerald-50 border border-slate-200 transition-colors">
              <i class="fa-solid fa-diamond-turn-right text-emerald-600"></i>
              <span>Buka Peta</span>
            </a>

            <button 
              data-action="detail-destinasi" 
              data-id="${d.id}"
              class="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3.5 rounded-lg shadow-sm hover:shadow transition-all">
              <span>Detail Lengkap</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  /**
   * 2. Render Tour Guide
   */
  function renderTourGuide(grid) {
    const dataUmum = getData();
    let items = (dataUmum.tourGuide || []).filter(g => {
      if (umumSearchQuery) {
        return g.nama.toLowerCase().includes(umumSearchQuery) ||
               g.spesialisasi.toLowerCase().includes(umumSearchQuery) ||
               g.bahasa.some(b => b.toLowerCase().includes(umumSearchQuery));
      }
      return true;
    });

    if (items.length === 0) {
      showEmptyState(grid, 'Pemandu Wisata Tidak Ditemukan');
      return;
    }

    grid.innerHTML = items.map(g => `
      <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group">
        <div>
          <div class="flex items-start gap-4 mb-4">
            <img 
              src="${g.foto}" 
              alt="${g.nama}" 
              class="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  ${g.nama}
                </h3>
                <div class="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  <i class="fa-solid fa-star text-amber-500"></i>
                  <span>${g.rating}</span>
                </div>
              </div>
              <p class="text-xs text-emerald-800 font-semibold mb-1">
                ${g.sertifikasi}
              </p>
              <p class="text-[11px] text-slate-500">
                <i class="fa-solid fa-briefcase text-slate-400 mr-1"></i>${g.pengalaman} • ${g.totalTur}+ Sesi Tur Sukses
              </p>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span class="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">Keahlian & Spesialisasi:</span>
              <p class="text-xs text-slate-600 leading-relaxed font-medium">
                ${g.spesialisasi}
              </p>
            </div>

            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[11px] text-slate-500 font-medium">Bahasa:</span>
              ${g.bahasa.map(b => `
                <span class="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-md font-semibold">
                  ${b}
                </span>
              `).join('')}
            </div>
          </div>

          <p class="text-xs text-slate-600 italic mb-4 leading-relaxed">
            "${g.deskripsi}"
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-semibold block">Tarif Estimasi:</span>
            <span class="text-xs font-bold text-emerald-800">${g.tarif}</span>
          </div>

          <a 
            href="https://wa.me/${g.waPhone}?text=${encodeURIComponent(`Halo ${g.nama}, saya melihat profil Anda di portal Pesona Budaya & Wisata Magelang dan tertarik untuk reservasi pemandu wisata.`)}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm hover:shadow transition-all">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Hubungi Guide</span>
          </a>
        </div>
      </article>
    `).join('');
  }

  /**
   * 3. Render Penginapan & Hotel
   */
  function renderPenginapan(grid) {
    const dataUmum = getData();
    let items = (dataUmum.penginapan || []).filter(h => {
      if (umumSearchQuery) {
        return h.nama.toLowerCase().includes(umumSearchQuery) ||
               h.tipe.toLowerCase().includes(umumSearchQuery) ||
               h.lokasi.toLowerCase().includes(umumSearchQuery);
      }
      return true;
    });

    if (items.length === 0) {
      showEmptyState(grid, 'Akomodasi Tidak Ditemukan');
      return;
    }

    grid.innerHTML = items.map(h => `
      <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <img 
            src="${h.image}" 
            alt="${h.nama}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>

          <div class="absolute top-3 left-3 flex items-center gap-1">
            ${Array.from({ length: h.bintang }).map(() => `
              <i class="fa-solid fa-star text-amber-400 text-xs drop-shadow"></i>
            `).join('')}
          </div>

          <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
            <i class="fa-solid fa-star text-amber-500"></i>
            <span>${h.rating}</span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 text-white">
            <span class="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
              ${h.tipe}
            </span>
            <h3 class="text-base font-bold text-white leading-tight">
              ${h.nama}
            </h3>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs text-slate-500 flex items-center gap-1.5 mb-2">
              <i class="fa-solid fa-location-dot text-rose-500"></i>
              <span class="line-clamp-1">${h.lokasi}</span>
            </p>

            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              ${h.deskripsi}
            </p>

            <div class="mb-4">
              <span class="text-[11px] font-bold text-slate-700 block mb-1.5">Fasilitas Unggulan:</span>
              <div class="flex flex-wrap gap-1">
                ${h.fasilitas.slice(0, 4).map(f => `
                  <span class="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
                    ✓ ${f}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Estimasi Tarif:</span>
              <span class="text-xs font-bold text-emerald-800">${h.kisaranHarga}</span>
            </div>

            <a 
              href="${h.bookingUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm hover:shadow transition-all">
              <span>Cek Kamar / Web</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  /**
   * 4. Render Edukasi Budaya & Kuliner Populer
   */
  function renderEdukasiBudaya(grid) {
    const dataUmum = getData();
    let items = (dataUmum.edukasiBudaya || []).filter(b => {
      if (umumSearchQuery) {
        return b.judul.toLowerCase().includes(umumSearchQuery) ||
               b.kategori.toLowerCase().includes(umumSearchQuery) ||
               b.ringkasan.toLowerCase().includes(umumSearchQuery);
      }
      return true;
    });

    if (items.length === 0) {
      showEmptyState(grid, 'Cerita Budaya & Kuliner Tidak Ditemukan');
      return;
    }

    grid.innerHTML = items.map(b => `
      <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <img 
            src="${b.image}" 
            alt="${b.judul}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>

          <span class="absolute top-3 left-3 bg-amber-800/90 backdrop-blur-sm text-amber-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
            ${b.kategori}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
              ${b.judul}
            </h3>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
              ${b.ringkasan}
            </p>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <span class="text-xs text-slate-400 font-medium">Khazanah Asli Magelang</span>
            <button 
              data-action="detail-budaya-umum" 
              data-id="${b.id}"
              class="flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-lg border border-amber-200 transition-all">
              <span>Baca Kisah</span>
              <i class="fa-solid fa-book-open text-xs"></i>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  /**
   * 5. Render UMKM Sekitar Wisata
   */
  function renderUMKM(grid) {
    const dataUmum = getData();
    let items = (dataUmum.umkm || []).filter(u => {
      if (umumSearchQuery) {
        return u.nama.toLowerCase().includes(umumSearchQuery) ||
               u.kategori.toLowerCase().includes(umumSearchQuery) ||
               u.produkUtama.toLowerCase().includes(umumSearchQuery) ||
               u.lokasiDekat.toLowerCase().includes(umumSearchQuery);
      }
      return true;
    });

    if (items.length === 0) {
      showEmptyState(grid, 'UMKM Tidak Ditemukan');
      return;
    }

    grid.innerHTML = items.map(u => `
      <article class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <img 
            src="${u.image}" 
            alt="${u.nama}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>

          <span class="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-sm text-emerald-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
            ${u.kategori}
          </span>

          <div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
            <i class="fa-solid fa-star text-amber-500"></i>
            <span>${u.rating}</span>
          </div>

          <div class="absolute bottom-2.5 left-3 right-3 text-white">
            <p class="text-[11px] text-emerald-200 flex items-center gap-1 font-medium">
              <i class="fa-solid fa-location-crosshairs text-[10px]"></i>
              <span class="line-clamp-1">${u.lokasiDekat}</span>
            </p>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
              ${u.nama}
            </h3>
            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
              ${u.deskripsi}
            </p>

            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 mb-4">
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Produk Unggulan:</span>
              <p class="text-xs text-slate-700 font-semibold line-clamp-2">${u.produkUtama}</p>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-semibold block">Rentang Harga:</span>
              <span class="text-xs font-bold text-emerald-800">${u.kisaranHarga}</span>
            </div>

            <a 
              href="https://wa.me/${u.kontakWA}?text=${encodeURIComponent(`Halo ${u.nama}, saya melihat produk kerajinan/oleh-oleh Anda di portal Budaya & Wisata Magelang dan tertarik memesan.`)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm hover:shadow transition-all">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span>Chat Pengrajin</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  function showEmptyState(container, title) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 text-2xl">
          <i class="fa-solid fa-compass"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">${title}</h3>
        <p class="text-sm text-slate-500 max-w-md mx-auto">
          Tidak ada data yang cocok dengan kriteria pencarian Anda. Coba reset pencarian atau pilih kategori lain.
        </p>
      </div>
    `;
  }

  // Pasang module ke window global
  window.UmumModule = {
    initUmumView,
    setUmumSearchQuery,
    renderUmumCurrentTab
  };
})();
