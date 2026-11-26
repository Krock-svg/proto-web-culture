/**
 * TIDARAI - ASISTEN AI KEBUDAYAAN & RISET MAHASISWA UNTIDAR
 * Modul Chatbot Cerdas Khusus Mode TIDARAKSA
 * - Menyediakan tanya-jawab seputar sejarah, candi, dan prasasti Magelang
 * - Rekomendasi topik riset / skripsi spesifik per fakultas Untidar
 * - Generator sitasi ilmiah otomatis (APA, Chicago, MLA)
 * - Tampilan floating chat widget interaktif dengan typewriter effect
 */

(function () {
  // Knowledge Base Mendalam Seputar Kebudayaan Magelang & Akademik Untidar
  const KNOWLEDGE_BASE = [
    {
      keywords: ['tingkat', 'kamadhatu', 'rupadhatu', 'arupadhatu', 'kosmologi', 'struktur', 'makna borobudur', 'filosofi borobudur'],
      title: 'Kosmologi Tiga Tingkatan Candi Borobudur',
      answer: `Struktur Candi Borobudur merepresentasikan kosmologi Buddhis Mahayana tentang perjalanan batin manusia menuju pencerahan (*Nirwana*), yang terbagi ke dalam tiga tingkatan luhur:

1. **Kamadhatu (Bagian Kaki/Dasar)**:
   - Melambangkan alam bawah manusia yang masih terikat oleh hawa nafsu keduniawian (*kama*).
   - Memuat 160 panil relief **Karmawibhangga** yang mendokumentasikan hukum sebab-akibat karma perbuatan manusia. Sebagian relief ini tertutup oleh selasar penguat (*encasement*) batu andesit tambahan.

2. **Rupadhatu (Empat Lorong Persegi)**:
   - Melambangkan alam antara, tempat manusia telah terbebas dari dorongan nafsu hewani namun masih terikat pada wujud fisik dan rupa.
   - Dinding lorong dihiasi relief naratif agung: *Lalitavistara* (riwayat hidup Sang Buddha Sakyamuni), *Jataka-Avadana*, dan *Gandavyuha* (perjalanan spiritual Sudhana mencari hakikat kebijaksanaan tertinggi).

3. **Arupadhatu (Tiga Teras Melingkar & Stupa Induk)**:
   - Melambangkan alam nir-wujud, puncak kesunyataan (*sunyata*) dan pencapaian pencerahan sejati.
   - Memuat 72 stupa terawang (berlubang belah ketupat dan bujur sangkar) yang menaungi arca Dhyani Buddha, mengelilingi satu stupa induk raksasa yang polos tanpa rongga di puncak tertinggi.`
    },
    {
      keywords: ['mantyasih', 'prasasti mantyasih', 'balitung', 'desa sima', 'meteseh', 'sejarah magelang', 'hari jadi'],
      title: 'Prasasti Mantyasih (907 M) & Historiografi Magelang',
      answer: `**Prasasti Mantyasih** (disebut juga Prasasti Balitung atau Prasasti Tembaga Watukura) berangka tahun 829 Saka (11 April 907 Masehi), dikeluarkan oleh **Sri Maharaja Rakai Watukura Dyah Balitung**:

- **Latar Belakang & Isi Pokok**:
  Prasasti ini menetapkan desa **Mantyasih** (kini kampung Meteseh di Kota Magelang) sebagai daerah *Sima* (perdikan bebas pajak) sebagai anugerah raja atas jasa para patih dan warga desa yang setia menjaga keamanan dan memelihara tempat pemujaan suci.
- **Arti Penting bagi Sejarah Nusantara**:
  Prasasti Mantyasih memuat daftar silsilah raja-raja Medang (Mataram Kuno) pendahulu Dyah Balitung secara berurutan, dimulai dari Rakai Mataram Sang Ratu Sanjaya, Rakai Panangkaran, Rakai Panunggalan, Rakai Warak, Rakai Garung, Rakai Pikatan, Rakai Kayuwangi, hingga Rakai Watuhumalang.
- **Hubungan dengan Magelang**:
  Penanggalan prasasti ini (11 April 907 M) menjadi dasar penetapan **Hari Jadi Kota Magelang** secara resmi.`
    },
    {
      keywords: ['canggal', 'prasasti canggal', 'sanjaya', 'gunung wukir', '732', 'siwa', 'yavadvipa'],
      title: 'Prasasti Canggal (732 M) di Candi Gunung Wukir',
      answer: `**Prasasti Canggal** bertarikh 654 Saka (6 Oktober 732 Masehi) ditemukan di pelataran Candi Gunung Wukir, Kecamatan Salam, Kabupaten Magelang:

- **Bentuk & Bahasa**: Ditulis menggunakan aksara Pallawa awal dengan bahasa Sanskerta berirama puisi (*sloka*) yang sangat indah dan bermutu sastra tinggi.
- **Peristiwa Pokok**: Memperingati pendirian lingga suci (*Sivalingga*) di bukit Stirangga oleh **Raja Sanjaya**, putra Sannaha (saudari Raja Sanna).
- **Nilai Penting**:
  1. Menjadi dokumen tertulis tertua yang secara eksplisit menyebut keberadaan pulau Jawa (*Yavadvipa*) yang subur, makmur, kaya akan lumbung padi, dan tambang emas.
  2. Menjadi tonggak sejarah berdirinya Dinasti Sanjaya yang beraliran Hindu Siwaistis di Jawa bagian tengah.`
    },
    {
      keywords: ['skripsi', 'topik riset', 'judul', 'tugas akhir', 'penelitian', 'ide riset'],
      title: 'Rekomendasi Topik Riset Kebudayaan untuk Mahasiswa UNTIDAR',
      answer: `Berikut rekomendasi topik riset & skripsi kebudayaan Magelang yang dapat disesuaikan dengan 5 Fakultas di Universitas Tidar:

🎓 **Fakultas Keguruan dan Ilmu Pendidikan (FKIP)**:
1. *Pengembangan Modul Pembelajaran Sejarah Kontekstual Berbasis Relief Lalitavistara Borobudur untuk Siswa SMA di Magelang.*
2. *Pemanfaatan Nilai Karakter Tidar dalam Penguatan Pendidikan Karakter dan Kearifan Lokal Mahasiswa Untidar.*

📊 **Fakultas Ekonomi (FE)**:
1. *Dampak Kebijakan Pembatasan Tiket Naik Struktur Borobudur terhadap Pendapatan Pelaku UMKM Desa Wisata Sekitar.*
2. *Strategi Pengembangan Ekonomi Sirkular pada Sentra Kerajinan Pahat Batu Muntilan Berbasis Pariwisata Berkelanjutan.*

🏛️ **Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)**:
1. *Resolusi Konflik Spasial Antara Konservasi Cagar Budaya dan Ruang Usaha Masyarakat Lokal di Kawasan Strategis Pariwisata Nasional (KSPN) Borobudur.*
2. *Analisis Partisipasi Komunitas Budaya Lokal dalam Penyelenggaraan Perayaan Waisak Nasional.*

⚙️ **Fakultas Teknik (FT)**:
1. *Kajian Efektivitas Sistem Drainase Kuno Saluran Air Batu Andesit Candi Borobudur Terhadap Pencegahan Erosi Material.*
2. *Aplikasi Fotogrametri Digital 3D untuk Dokumentasi Preservasi Relief Lapuk Candi Selogriyo Lereng Gunung Sumbing.*

🌱 **Fakultas Pertanian (Faperta)**:
1. *Studi Etnobotani Tumbuhan Obat dan Flora Relief Candi Borobudur serta Potensi Budidayanya di Dataran Kedu.*
2. *Pengelolaan Lahan Pertanian Terasering Berkelanjutan di Kawasan Wisata Lereng Sumbing Magelang.*`
    },
    {
      keywords: ['sitasi', 'daftar pustaka', 'apa', 'chicago', 'mla', 'referensi', 'format sitasi'],
      title: 'Panduan Sitasi Ilmiah Cagar Budaya Magelang',
      answer: `Berikut contoh format sitasi ilmiah baku yang siap Anda salin untuk laporan tugas akhir / makalah:

📚 **Buku Monumental Candi Borobudur (N.J. Krom)**:
- **APA 7th**: Krom, N. J. (1927). *Barabudur: Archaeological Description* (Vols. 1–2). The Hague: Martinus Nijhoff.
- **Chicago 17th**: Krom, N. J. *Barabudur: Archaeological Description*. 2 vols. The Hague: Martinus Nijhoff, 1927.

📚 **Karya Pemugaran Candi Borobudur (R. Soekmono)**:
- **APA 7th**: Soekmono, R. (1976). *Chandi Borobudur: A Monument of Mankind*. Paris: The Unesco Press.
- **Chicago 17th**: Soekmono, R. *Chandi Borobudur: A Monument of Mankind*. Paris: The Unesco Press, 1976.

📜 **Kajian Epigrafi Prasasti Mantyasih & Canggal**:
- **APA 7th**: Boechari. (2012). *Melacak Sejarah Kuno Indonesia Lewat Prasasti*. Jakarta: Kepustakaan Populer Gramedia.
- **Chicago 17th**: Boechari. *Melacak Sejarah Kuno Indonesia Lewat Prasasti*. Jakarta: Kepustakaan Populer Gramedia, 2012.`
    },
    {
      keywords: ['mendut', 'pawon', 'tri-candi', 'garis lurus', 'prosesi waisak'],
      title: 'Tritunggal Candi Mendut, Pawon, dan Borobudur',
      answer: `Candi Mendut, Candi Pawon, dan Candi Borobudur berada dalam satu garis lurus geografis yang membentang dari arah timur ke barat:

1. **Candi Mendut**:
   - Berjarak sekitar 3 km di timur Borobudur. Menjadi titik awal prosesi jalan kaki umat Buddha saat Waisak.
   - Di dalam bilik utamanya tersimpan arca monolitik agung **Buddha Sakyamuni** setinggi 3 meter dengan sikap tangan *Dharmachakramudra* (memutar roda darma), diapit oleh Bodhisatwa *Avalokitesvara* dan *Vajrapani*.
2. **Candi Pawon (Brajanalan)**:
   - Berada persis di tengah-tengah antara Mendut dan Borobudur. Berfungsi sebagai tempat transit dan penyucian batin sebelum peziarah mencapai monumen agung Borobudur.
3. **Makna Filosofis**:
   - Perjalanan dari Mendut melewati Pawon menuju puncak Borobudur melambangkan tahapan inisiasi dan pendakian spiritual dari penyiapan batin hingga pencapaian kesadaran pencerahan tertinggi.`
    },
    {
      keywords: ['selogriyo', 'asu', 'ngawen', 'candi lain', 'sebaran candi'],
      title: 'Sebaran Candi Unik di Kabupaten Magelang',
      answer: `Selain Borobudur, Magelang kaya akan peninggalan candi tersebar di lembah dan lereng gunung:

- **Candi Selogriyo (Windusari, Lereng Sumbing)**:
  Candi Hindu abad ke-9 terpencil di tengah panorama lembah sawah terasering spektakuler. Dikenal memiliki arca Agastya dan Ganesha yang sangat halus dan mata air abadi.
- **Candi Ngawen (Muntilan)**:
  Kompleks 5 percandian Buddha dengan arca singa penjaga di tiap sudut batur yang megah.
- **Candi Asu, Lumbung, dan Pendem (Dukun, Lereng Merapi)**:
  Kelompok percandian abad ke-9 masa Mataram Kuno di tepi Sungai Pabelan yang memadukan corak pemujaan Siwaistis dengan lanskap vulkanik Merapi.`
    }
  ];

  // Fungsi pencocokan jawaban cerdas berbasis kata kunci + pencarian dinamis dataMahasiswa
  function findBestAnswer(query, faculty = '') {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    // 1. Sapaan & Pertanyaan Umum tentang TidarAI
    if (/^(halo|hai|hi|hello|pagi|siang|sore|malam|assalamualaikum|permisi)\b/.test(q)) {
      return {
        title: 'Halo, Rekan Mahasiswa UNTIDAR! 👋',
        answer: `Selamat datang di **TidarAI**. Saya siap membantu Anda menelusuri sejarah, arkeologi, seni budaya Magelang, hingga menyusun sitasi tugas kuliah.\n\nSilakan tanyakan topik spesifik seperti *"Jelaskan sejarah Borobudur"*, *"Apa isi Prasasti Mantyasih?"*, *"Tari Soreng"*, *"Omah Joglo"*, atau minta *"Ide topik skripsi"*!`
      };
    }

    if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks')) {
      return {
        title: 'Sama-sama! 😊',
        answer: `Senang bisa membantu riset Anda di **TIDARAKSA**. Jika butuh bantuan sitasi atau referensi materi lain, silakan tanya lagi kapan saja!`
      };
    }

    // 2. Cek jika pertanyaan meminta rekomendasi skripsi/fakultas
    if (q.includes('skripsi') || q.includes('topik') || q.includes('judul') || q.includes('penelitian')) {
      const matched = KNOWLEDGE_BASE.find(item => item.keywords.includes('skripsi'));
      if (matched) return matched;
    }

    // 3. Pencarian di KNOWLEDGE_BASE terkurasi
    let bestScore = 0;
    let bestMatch = null;

    KNOWLEDGE_BASE.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        if (q.includes(kw)) {
          score += kw.length * 2;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch && bestScore >= 4) {
      return bestMatch;
    }

    // 4. Pencarian dinamis di seluruh modul dataMahasiswa (judul, abstrak, materi, keywords)
    const mhsData = window.dataMahasiswa || [];
    const stopWords = ['apa', 'itu', 'yang', 'di', 'ke', 'dari', 'dan', 'atau', 'untuk', 'tentang', 'jelaskan', 'ceritakan', 'bagaimana', 'siapa', 'mengapa', 'kapan', 'dimana', 'tolong', 'dong', 'ya', 'saya', 'aku'];
    const terms = q.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));

    if (terms.length > 0 && mhsData.length > 0) {
      let bestMod = null;
      let bestModScore = 0;

      mhsData.forEach(mod => {
        let s = 0;
        const haystack = `${mod.judul} ${mod.matkulKategori} ${mod.abstrak} ${(mod.keywords || []).join(' ')} ${mod.materiLengkap || ''}`.toLowerCase();
        terms.forEach(t => {
          if (mod.judul.toLowerCase().includes(t)) s += 10;
          if ((mod.keywords || []).some(k => k.toLowerCase().includes(t))) s += 8;
          if (haystack.includes(t)) s += 3;
        });
        if (s > bestModScore) {
          bestModScore = s;
          bestMod = mod;
        }
      });

      if (bestMod && bestModScore >= 6) {
        return {
          title: `📚 ${bestMod.judul}`,
          answer: `**Bidang Ilmu:** ${bestMod.matkulKategori} (${bestMod.badge})\n\n${bestMod.abstrak}\n\n**Referensi Sitasi (APA):**\n*${bestMod.sitasi?.apa || bestMod.sumberReferensi}*\n\n💡 *Anda dapat membuka buku **"${bestMod.judul}"** di Rak Buku 3D untuk membaca kajian lengkapnya.*`
        };
      }
    }

    // 5. Default fallback jika tetap tidak ditemukan kata kunci yang relevan
    return {
      title: 'Bantuan Riset Cagar Budaya Magelang',
      answer: `Pertanyaan Anda sangat menarik untuk diteliti lebih dalam. Sebagai asisten akademik mahasiswa Universitas Tidar, saya dapat membantu Anda menganalisis:

1. **Kosmologi & Relief Borobudur**: Penjelasan panil *Karmawibhangga*, *Lalitavistara*, atau makna 3 tingkatan (Kamadhatu, Rupadhatu, Arupadhatu).
2. **Epigrafi Prasasti Kuno**: Telaah naskah Prasasti Mantyasih (907 M) dan Prasasti Canggal (732 M).
3. **Budaya & Arsitektur Lokal**: Tari Soreng Merbabu, Omah Joglo Magelangan, dan Mitigasi Paseduluran Merapi.
4. **Ide Tugas Akhir & Skripsi**: Rekomendasi topik riset untuk fakultas Anda di Untidar (FKIP, FE, FISIP, FT, Faperta).

*Silakan klik tombol pertanyaan rekomendasi di bawah atau ketik kata kunci yang lebih spesifik.*`
    };
  }

  // Format pesan ke HTML sederhana
  function formatAiResponse(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  // Inisialisasi Tampilan Widget Chat TidarAI
  function initTidarAIWidget() {
    // Jangan buat duplikat
    if (document.getElementById('tidarAiContainer')) return;

    const container = document.createElement('div');
    container.id = 'tidarAiContainer';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none';

    container.innerHTML = `
      <!-- Panel Dialog Obrolan (Drawer) -->
      <div id="tidarAiChatBox" class="hidden pointer-events-auto w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in transition-all">
        <!-- Header Chatbot -->
        <div class="bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 text-lg shadow-inner">
              <i class="fa-solid fa-robot"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold tracking-tight">TidarAI</h3>
                <span class="text-[10px] bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full uppercase">Untidar</span>
              </div>
              <p class="text-[11px] text-amber-100/90 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Asisten Riset & Budaya Mahasiswa</span>
              </p>
            </div>
          </div>
          <button id="tidarAiCloseBtn" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-colors" title="Tutup Chat">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Area Pesan (Message History) -->
        <div id="tidarAiMessages" class="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-slate-50/60 scroll-smooth">
          <!-- Pesan Sambutan Otomatis -->
          <div class="flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <div class="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-slate-800 leading-relaxed max-w-[85%]">
              <p class="font-bold text-amber-900 mb-1">Halo, Sahabat Tidar! 👋</p>
              <p class="text-xs text-slate-600">
                Saya <strong>TidarAI</strong>, asisten pintar pendamping riset kebudayaan mahasiswa Universitas Tidar. Ada materi candi, relief, prasasti, atau ide skripsi yang ingin Anda diskusikan?
              </p>
            </div>
          </div>
        </div>

        <!-- Tombol Rekomendasi Pertanyaan Cepat (Quick Chips) -->
        <div class="px-3 py-2 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-xs">
          <button class="tidar-quick-chip whitespace-nowrap bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors" data-prompt="Jelaskan filosofi 3 tingkatan Candi Borobudur">
            🏛️ 3 Tingkatan Borobudur
          </button>
          <button class="tidar-quick-chip whitespace-nowrap bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors" data-prompt="Apa isi penting Prasasti Mantyasih bagi sejarah Magelang?">
            📜 Prasasti Mantyasih
          </button>
          <button class="tidar-quick-chip whitespace-nowrap bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors" data-prompt="Rekomendasikan ide topik skripsi untuk mahasiswa Untidar">
            💡 Ide Topik Skripsi
          </button>
          <button class="tidar-quick-chip whitespace-nowrap bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors" data-prompt="Bagaimana format sitasi APA untuk Candi Borobudur?">
            📑 Format Sitasi APA
          </button>
        </div>

        <!-- Input Bar Chat -->
        <div class="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input 
            id="tidarAiInput" 
            type="text" 
            placeholder="Tanyakan sejarah, relief, atau ide skripsi..." 
            class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
          <button 
            id="tidarAiSendBtn" 
            class="w-10 h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-md shadow-amber-200 transition-all shrink-0 active:scale-95"
            title="Kirim Pertanyaan"
          >
            <i class="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Floating Launcher Button -->
      <button 
        id="tidarAiLauncherBtn" 
        class="pointer-events-auto group flex items-center gap-2.5 bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-800 hover:from-amber-700 hover:to-indigo-900 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-white/40"
      >
        <div class="relative">
          <i class="fa-solid fa-robot text-base sm:text-lg"></i>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-amber-900 animate-ping"></span>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-amber-900"></span>
        </div>
        <div class="text-left hidden sm:block">
          <span class="text-xs font-black tracking-wide block leading-tight">Tanya TidarAI</span>
          <span class="text-[10px] text-amber-200 block -mt-0.5">Asisten Mahasiswa</span>
        </div>
      </button>
    `;

    document.body.appendChild(container);
    setupTidarAiEvents();
  }

  // Setup Event Listener Chatbot
  function setupTidarAiEvents() {
    const chatBox = document.getElementById('tidarAiChatBox');
    const launcherBtn = document.getElementById('tidarAiLauncherBtn');
    const closeBtn = document.getElementById('tidarAiCloseBtn');
    const input = document.getElementById('tidarAiInput');
    const sendBtn = document.getElementById('tidarAiSendBtn');
    const messages = document.getElementById('tidarAiMessages');

    if (!launcherBtn || !chatBox) return;

    // Toggle Buka/Tutup Chat
    launcherBtn.addEventListener('click', () => {
      const isHidden = chatBox.classList.contains('hidden');
      if (isHidden) {
        chatBox.classList.remove('hidden');
        input.focus();
      } else {
        chatBox.classList.add('hidden');
      }
    });

    closeBtn.addEventListener('click', () => {
      chatBox.classList.add('hidden');
    });

    // Kirim pesan
    function handleSend() {
      const query = input.value.trim();
      if (!query) return;

      input.value = '';
      appendUserMessage(query);

      // Loading bubble
      const loadingId = 'aiLoading_' + Date.now();
      appendLoadingBubble(loadingId);

      // Ambil sesi mahasiswa untuk konteks fakultas
      let faculty = '';
      try {
        const session = JSON.parse(localStorage.getItem('tidaraksa_untidar_session') || '{}');
        faculty = session.fakultas || '';
      } catch (e) {}

      // Simulasi latency AI natural (600ms)
      setTimeout(() => {
        removeLoadingBubble(loadingId);
        const result = findBestAnswer(query, faculty);
        appendAiResponse(result.answer, result.title);
      }, 650);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Event listener quick chips
    document.querySelectorAll('.tidar-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        input.value = prompt;
        handleSend();
      });
    });
  }

  function appendUserMessage(text) {
    const messages = document.getElementById('tidarAiMessages');
    if (!messages) return;

    const div = document.createElement('div');
    div.className = 'flex items-start justify-end gap-2';
    div.innerHTML = `
      <div class="bg-amber-600 text-white rounded-2xl rounded-tr-sm p-3 shadow-sm leading-relaxed max-w-[85%] text-xs sm:text-sm">
        ${escapeHtml(text)}
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendLoadingBubble(id) {
    const messages = document.getElementById('tidarAiMessages');
    if (!messages) return;

    const div = document.createElement('div');
    div.id = id;
    div.className = 'flex items-start gap-2.5';
    div.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 shadow-sm flex items-center gap-1.5 text-slate-400">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]"></span>
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeLoadingBubble(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function appendAiResponse(answer, title = '') {
    const messages = document.getElementById('tidarAiMessages');
    if (!messages) return;

    const div = document.createElement('div');
    div.className = 'flex items-start gap-2.5';
    div.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-3.5 shadow-sm text-slate-800 leading-relaxed max-w-[90%]">
        ${title ? `<h4 class="text-xs font-bold text-indigo-950 mb-1.5 pb-1 border-b border-slate-100 flex items-center gap-1.5"><i class="fa-solid fa-feather text-amber-600"></i> ${escapeHtml(title)}</h4>` : ''}
        <div class="text-xs leading-relaxed space-y-2 text-slate-700">
          ${formatAiResponse(answer)}
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 mt-2 border-t border-slate-100 text-[11px]">
          <button class="copy-ai-answer-btn text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1" title="Salin Teks">
            <i class="fa-regular fa-copy"></i>
            <span>Salin</span>
          </button>
        </div>
      </div>
    `;

    // Pasang tombol salin
    const copyBtn = div.querySelector('.copy-ai-answer-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(answer).then(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> <span class="text-emerald-600">Tersalin!</span>';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Salin</span>';
          }, 2000);
        });
      });
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Tampilkan atau sembunyikan widget tergantung mode aktif
  function setTidarAiVisibility(isMahasiswaMode) {
    const container = document.getElementById('tidarAiContainer');
    if (!container) return;
    if (isMahasiswaMode) {
      container.classList.remove('hidden');
    } else {
      container.classList.add('hidden');
      const chatBox = document.getElementById('tidarAiChatBox');
      if (chatBox) chatBox.classList.add('hidden');
    }
  }

  // Publikasikan API ke window global
  window.TidarAI = {
    init: initTidarAIWidget,
    setVisibility: setTidarAiVisibility,
    askQuestion: function (query) {
      const chatBox = document.getElementById('tidarAiChatBox');
      if (chatBox) chatBox.classList.remove('hidden');
      const input = document.getElementById('tidarAiInput');
      if (input) {
        input.value = query;
        const sendBtn = document.getElementById('tidarAiSendBtn');
        if (sendBtn) sendBtn.click();
      }
    }
  };
})();
