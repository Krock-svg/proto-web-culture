/**
 * MODUL AR HERITAGE EXPLORER (KHUSUS BUMI MAGELANG)
 * Mengombinasikan Browser Geolocation API (GPS) + Kamera Scanner + 3D Model Viewer
 * untuk mempersempit kandidat objek wisata berdasarkan koordinat pengguna.
 */

(function () {
  let currentCoords = null; // { lat, lng, isSimulated, label }
  let matchedSite = null;
  let selectedObject = null;
  let cameraStream = null;

  /**
   * Rumus Haversine untuk menghitung jarak (meter) antara 2 koordinat GPS
   */
  function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius bumi dalam meter
    const toRad = deg => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  /**
   * Cari situs terdekat & persempit daftar objek berdasarkan koordinat GPS
   */
  function resolveSiteByCoords(lat, lng) {
    const sites = window.arHeritageSites || [];
    if (!sites.length) return { site: null, distance: null, withinRadius: false };

    let nearest = null;
    let minDist = Infinity;

    sites.forEach(site => {
      const dist = calculateDistanceMeters(lat, lng, site.lat, site.lng);
      if (dist < minDist) {
        minDist = dist;
        nearest = site;
      }
    });

    const withinRadius = nearest ? minDist <= nearest.radiusMeter : false;
    return { site: nearest, distance: minDist, withinRadius };
  }

  /**
   * Format jarak agar mudah dibaca (m / km)
   */
  function formatDistance(meters) {
    if (meters === null || meters === undefined) return '-';
    if (meters < 1000) return `${meters} m`;
    return `${(meters / 1000).toFixed(2)} km`;
  }

  /**
   * Meminta GPS Browser secara langsung
   */
  function detectLiveGPS() {
    const statusEl = document.getElementById('arGpsStatusText');
    if (statusEl) {
      statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i>Mendeteksi koordinat GPS...';
    }

    if (!navigator.geolocation) {
      if (window.showToast) window.showToast('Browser tidak mendukung Geolocation. Gunakan Simulasi Lokasi.', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        applyCoordinates(lat, lng, false, 'GPS Real-Time Browser');
      },
      err => {
        if (window.showToast) {
          window.showToast('Izin GPS ditolak/tidak tersedia. Gunakan tombol Simulasi Lokasi GPS.', 'info');
        }
        if (statusEl) {
          statusEl.textContent = 'GPS belum aktif. Silakan klik Simulasi Lokasi di bawah.';
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  /**
   * Terapkan koordinat (Live atau Simulasi) & persempit objek
   */
  function applyCoordinates(lat, lng, isSimulated = false, label = '') {
    currentCoords = { lat, lng, isSimulated, label };
    const resolved = resolveSiteByCoords(lat, lng);
    matchedSite = resolved.site;

    // Jika objek sebelumnya tidak ada di situs baru, pilih objek pertama di situs hasil filter GPS
    if (matchedSite && matchedSite.objects.length > 0) {
      const stillExists = selectedObject && matchedSite.objects.some(o => o.id === selectedObject.id);
      if (!stillExists) {
        selectedObject = matchedSite.objects[0];
      }
    }

    renderArWorkspace(resolved);
    if (window.showToast && matchedSite) {
      window.showToast(`Lokasi terkunci: ${matchedSite.siteName} (${matchedSite.objects.length} objek terfilter)`, 'success');
    }
  }

  /**
   * Simulasi koordinat seolah berada di situs wisata tertentu
   */
  function simulateLocation(siteId) {
    const sites = window.arHeritageSites || [];
    const target = sites.find(s => s.siteId === siteId);
    if (!target) return;
    applyCoordinates(target.lat, target.lng, true, `Simulasi GPS: ${target.siteName}`);
  }

  /**
   * Nyalakan kamera scanner langsung di browser
   */
  async function startCameraScan() {
    const videoEl = document.getElementById('arCameraVideo');
    const placeholderEl = document.getElementById('arCameraPlaceholder');
    const scanOverlay = document.getElementById('arScanOverlay');
    const btnStop = document.getElementById('btnStopCamera');
    const btnStart = document.getElementById('btnStartCamera');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (window.showToast) window.showToast('Kamera tidak didukung di browser/protokol ini.', 'error');
      return;
    }

    try {
      stopCameraScan();
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      if (videoEl) {
        videoEl.srcObject = cameraStream;
        videoEl.classList.remove('hidden');
      }
      if (placeholderEl) placeholderEl.classList.add('hidden');
      if (scanOverlay) scanOverlay.classList.remove('hidden');
      if (btnStop) btnStop.classList.remove('hidden');
      if (btnStart) btnStart.classList.add('hidden');
    } catch (err) {
      if (window.showToast) window.showToast('Izin kamera ditolak. Anda tetap dapat memilih objek hasil filter GPS.', 'info');
    }
  }

  function stopCameraScan() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      cameraStream = null;
    }
    const videoEl = document.getElementById('arCameraVideo');
    const placeholderEl = document.getElementById('arCameraPlaceholder');
    const scanOverlay = document.getElementById('arScanOverlay');
    const btnStop = document.getElementById('btnStopCamera');
    const btnStart = document.getElementById('btnStartCamera');

    if (videoEl) {
      videoEl.srcObject = null;
      videoEl.classList.add('hidden');
    }
    if (placeholderEl) placeholderEl.classList.remove('hidden');
    if (scanOverlay) scanOverlay.classList.add('hidden');
    if (btnStop) btnStop.classList.add('hidden');
    if (btnStart) btnStart.classList.remove('hidden');
  }

  /**
   * Simulasi proses scan objek dari kamera -> tampilkan hasil 3D & sejarah
   */
  function triggerScanObject(objectId) {
    if (!matchedSite) return;
    const obj = matchedSite.objects.find(o => o.id === objectId) || matchedSite.objects[0];
    if (!obj) return;
    selectedObject = obj;

    const viewerSection = document.getElementById('ar3dResultSection');
    render3dViewerAndHistory();
    if (viewerSection) {
      viewerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (window.showToast) {
      window.showToast(`Objek terdeteksi via GPS + Scan: ${obj.nama}`, 'success');
    }
  }

  /**
   * Render tampilan utama AR Heritage Explorer di dalam #umumGrid
   */
  function renderArExplorer(container) {
    if (!container) return;

    // Default awal: jika belum deteksi GPS, tampilkan status siap deteksi dengan opsi simulasi Borobudur
    if (!currentCoords) {
      const sites = window.arHeritageSites || [];
      matchedSite = sites[0] || null;
      selectedObject = matchedSite ? matchedSite.objects[0] : null;
      renderArWorkspace({ site: matchedSite, distance: null, withinRadius: false }, container);
    } else {
      const resolved = resolveSiteByCoords(currentCoords.lat, currentCoords.lng);
      renderArWorkspace(resolved, container);
    }
  }

  function renderArWorkspace(resolved, targetContainer = null) {
    const container = targetContainer || document.getElementById('umumGrid');
    if (!container) return;

    const sites = window.arHeritageSites || [];
    const activeSite = resolved.site || sites[0];
    const objects = activeSite ? activeSite.objects : [];

    container.innerHTML = `
      <div class="col-span-full space-y-6 animate-fade-in">

        <!-- Banner GPS Geofencing & Kamera Scanner -->
        <div class="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/20">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            <!-- Kolom Kiri: Kontrol GPS & Penyempitan Kandidat -->
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <i class="fa-solid fa-satellite-dish"></i>
                <span>Hybrid GPS Geofencing + 3D Object Explorer</span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
                AR Heritage Explorer Magelang
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sistem memadukan koordinat <strong>GPS browser</strong> untuk mempersempit daftar objek hanya ke situs di sekitar Anda, sehingga pemindaian kamera lebih akurat dan tidak tertukar antar-candi.
              </p>

              <!-- Status Koordinat GPS -->
              <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-location-crosshairs"></i>
                    <span id="arGpsStatusText">
                      ${currentCoords
                        ? `${currentCoords.label} (${currentCoords.lat.toFixed(5)}, ${currentCoords.lng.toFixed(5)})`
                        : 'GPS belum dideteksi (Pratinjau area default: Borobudur)'}
                    </span>
                  </span>
                  ${resolved.distance !== null ? `
                    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${resolved.withinRadius ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950'}">
                      Jarak ke ${activeSite.siteName}: ${formatDistance(resolved.distance)} ${resolved.withinRadius ? '(Dalam Radius)' : '(Situs Terdekat)'}
                    </span>
                  ` : ''}
                </div>

                <div class="flex flex-wrap items-center gap-2 pt-1">
                  <button id="btnDetectLiveGps" type="button"
                    class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all">
                    <i class="fa-solid fa-location-arrow"></i>
                    <span>Deteksi GPS Saya</span>
                  </button>

                  <span class="text-[11px] text-slate-400 px-1">atau Simulasi Lokasi:</span>
                  ${sites.map(s => `
                    <button type="button" data-ar-sim-site="${s.siteId}"
                      class="px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                        activeSite && activeSite.siteId === s.siteId
                          ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                          : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/15'
                      }">
                      ${s.siteName.replace('Kawasan ', '').replace('Situs Petirtaan ', '')}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Kolom Kanan: Kamera Live Scanner -->
            <div class="lg:col-span-5">
              <div class="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/15 aspect-video flex flex-col items-center justify-center shadow-2xl">
                <video id="arCameraVideo" autoplay playsinline muted class="hidden w-full h-full object-cover"></video>

                <!-- Frame Target Reticle saat kamera nyala -->
                <div id="arScanOverlay" class="hidden absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div class="w-40 h-40 border-2 border-emerald-400/80 rounded-2xl relative animate-pulse">
                    <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] bg-emerald-950/90 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                      Area Terfilter: ${activeSite ? activeSite.siteName : ''}
                    </span>
                  </div>
                </div>

                <!-- Placeholder sebelum kamera aktif -->
                <div id="arCameraPlaceholder" class="p-6 text-center space-y-3">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto text-xl">
                    <i class="fa-solid fa-camera"></i>
                  </div>
                  <p class="text-xs text-slate-300 max-w-xs mx-auto">
                    Aktifkan kamera untuk mengarahkan ke candi/relief, atau pilih langsung objek terfilter di bawah.
                  </p>
                </div>

                <!-- Kontrol Kamera -->
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 z-10">
                  <button id="btnStartCamera" type="button"
                    class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 text-xs font-bold shadow-lg transition-all">
                    <i class="fa-solid fa-video text-emerald-600"></i>
                    <span>Aktifkan Kamera</span>
                  </button>
                  <button id="btnStopCamera" type="button"
                    class="hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg transition-all">
                    <i class="fa-solid fa-video-slash"></i>
                    <span>Matikan Kamera</span>
                  </button>
                  <button id="btnCaptureScan" type="button"
                    class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg transition-all">
                    <i class="fa-solid fa-expand"></i>
                    <span>Scan Objek Area Ini</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Daftar Objek Terfilter Berdasarkan GPS Lokasi -->
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-crosshairs text-emerald-600"></i>
                <span>Objek Terdeteksi di ${activeSite ? activeSite.siteName : 'Lokasi'} (${objects.length} Kandidat)</span>
              </h3>
              <p class="text-xs text-slate-500">Hanya menampilkan objek di area koordinat aktif untuk akurasi deteksi maksimal.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${objects.map(obj => {
              const isSelected = selectedObject && selectedObject.id === obj.id;
              return `
                <button type="button" data-ar-select-obj="${obj.id}"
                  class="text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                  }">
                  <img src="${obj.posterImage}" alt="${obj.nama}" class="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100" />
                  <div class="flex-1 min-w-0">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }">${obj.kategori}</span>
                    <h4 class="text-sm font-bold text-slate-900 mt-1 line-clamp-1">${obj.nama}</h4>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${obj.ringkasan}</p>
                  </div>
                  <div class="shrink-0 text-emerald-600">
                    <i class="fa-solid fa-cube text-lg"></i>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Hasil 3D Model Viewer & Sejarah Lengkap -->
        <div id="ar3dResultSection" class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <!-- Diisi oleh render3dViewerAndHistory() -->
        </div>

      </div>
    `;

    render3dViewerAndHistory();
    bindArEvents();
  }

  /**
   * Render 3D <model-viewer> & Panel Sejarah untuk objek terpilih
   */
  function render3dViewerAndHistory() {
    const box = document.getElementById('ar3dResultSection');
    if (!box || !selectedObject) return;

    const obj = selectedObject;
    const formattedHistory = window.formatMarkdownContent
      ? window.formatMarkdownContent(obj.sejarah)
      : obj.sejarah.replace(/\n/g, '<br>');

    box.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12">
        <!-- Kolom 3D Model Viewer -->
        <div class="lg:col-span-6 bg-gradient-to-b from-slate-900 to-slate-950 p-5 flex flex-col justify-between min-h-[380px] relative">
          <div class="flex items-center justify-between gap-2 z-10">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <i class="fa-solid fa-cubes"></i>
              3D Model Interaktif
            </span>
            <span class="text-[11px] text-slate-400 font-mono">${obj.modelUrl}</span>
          </div>

          <div class="flex-1 flex items-center justify-center my-3 relative">
            <model-viewer
              id="arModelViewerEl"
              src="${obj.modelUrl}"
              poster="${obj.posterImage}"
              alt="Model 3D ${obj.nama}"
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              class="w-full h-[300px] rounded-2xl bg-slate-900/50">
              <button slot="ar-button"
                class="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                <i class="fa-solid fa-vr-cardboard"></i>
                <span>Lihat di AR</span>
              </button>
            </model-viewer>

            <!-- Pesan panduan jika file .glb lokal belum diletakkan di folder assets/models/ -->
            <div id="arModelFallbackNote" class="hidden absolute inset-0 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 border border-amber-500/30">
              <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl">
                <i class="fa-solid fa-cube"></i>
              </div>
              <h4 class="text-sm font-bold text-white">File Model 3D Belum Ditemukan di Folder Proyek</h4>
              <p class="text-xs text-slate-300 max-w-sm leading-relaxed">
                Silakan letakkan file 3D berformat <code>.glb</code> Anda ke folder proyek dengan nama:<br>
                <code class="text-amber-300 font-bold">${obj.modelUrl}</code>
              </p>
              <span class="text-[11px] text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Sejarah & info GPS tetap tampil lengkap di samping
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span><i class="fa-solid fa-hand-pointer mr-1 text-emerald-400"></i>Geser untuk putar 360° • Scroll untuk zoom</span>
            <span>ARCore / ARKit Ready</span>
          </div>
        </div>

        <!-- Kolom Narasi Sejarah -->
        <div class="lg:col-span-6 p-6 sm:p-8 space-y-4">
          <div class="space-y-1.5 border-b border-slate-100 pb-4">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">${obj.era}</span>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">${obj.nama}</h3>
          </div>

          <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
            ${obj.ringkasan}
          </div>

          <div class="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <h4 class="font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-scroll text-amber-600"></i>
              <span>Sejarah & Makna Peninggalan</span>
            </h4>
            <div>${formattedHistory}</div>
          </div>
        </div>
      </div>
    `;

    // Deteksi jika file .glb belum ditaruh di folder assets/models/
    const mv = document.getElementById('arModelViewerEl');
    const fallbackNote = document.getElementById('arModelFallbackNote');
    if (mv && fallbackNote) {
      mv.addEventListener('error', () => {
        fallbackNote.classList.remove('hidden');
      });
    }
  }

  function bindArEvents() {
    const btnLiveGps = document.getElementById('btnDetectLiveGps');
    if (btnLiveGps) btnLiveGps.addEventListener('click', detectLiveGPS);

    document.querySelectorAll('[data-ar-sim-site]').forEach(btn => {
      btn.addEventListener('click', () => simulateLocation(btn.dataset.arSimSite));
    });

    document.querySelectorAll('[data-ar-select-obj]').forEach(btn => {
      btn.addEventListener('click', () => triggerScanObject(btn.dataset.arSelectObj));
    });

    const btnStartCam = document.getElementById('btnStartCamera');
    const btnStopCam = document.getElementById('btnStopCamera');
    const btnCapture = document.getElementById('btnCaptureScan');
    if (btnStartCam) btnStartCam.addEventListener('click', startCameraScan);
    if (btnStopCam) btnStopCam.addEventListener('click', stopCameraScan);
    if (btnCapture) {
      btnCapture.addEventListener('click', () => {
        if (matchedSite && matchedSite.objects.length > 0) {
          triggerScanObject(selectedObject ? selectedObject.id : matchedSite.objects[0].id);
        }
      });
    }
  }

  window.ArHeritageModule = {
    renderArExplorer,
    stopCameraScan
  };
})();
