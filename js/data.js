/**
 * DATASET RESMI PESONA & KHAZANAH MAGELANG
 * Berisi data terstruktur untuk:
 * 1. Mode Mahasiswa (Materi Kuliah, Riset Budaya, Sitasi Ilmiah)
 * 2. Mode Umum (Destinasi Wisata, Tour Guide, Penginapan, Budaya Populer, UMKM)
 * Kompatibel baik via file:// (double-click) maupun http:// (localhost).
 */

const dataMahasiswa = [
  {
    id: "mhs-1",
    matkulKategori: "Arkeologi & Sejarah",
    judul: "Dinamika Kosmologis dan Ikonografi Relief Candi Borobudur",
    badge: "Kajian Sejarah Kuno",
    penulis: "Pusat Studi Arkeologi & Kebudayaan Borobudur",
    sumberReferensi: "Krom, N. J. (1927). Barabudur: Archaeological Description; Soekmono, R. (1976). Chandi Borobudur: A Monument of Mankind. The Unesco Press.",
    waktuBaca: "7 Menit Baca",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    abstrak: "Analisis struktural transisi tingkatan kosmologi Buddha Mahayana dari Kamadhatu (ranah hawa nafsu duniawi), Rupadhatu (ranah wujud berbatas), hingga Arupadhatu (ranah nirwujud murni), serta dekonstruksi naratif relief Karmawibhangga yang tertutup kaki tambahan.",
    materiLengkap: `
### 1. Latar Belakang Geopolitik & Dinasti Syailendra
Candi Borobudur dibangun sekitar abad ke-8 hingga ke-9 Masehi (sekitar tahun 750 - 825 M) pada masa pemerintahan Wangsa Syailendra di dataran Kedu, Magelang. Posisi geografisnya yang diapit oleh Gunung Merapi, Merbabu, Sindoro, dan Sumbing, serta pertemuan dua sungai suci (Elo dan Progo) memperkuat status dataran Kedu sebagai lanskap suci sakral (*sacred landscape*) dalam kosmologi Jawa Kuno.

### 2. Tri-Loka Kosmologi Buddhis
Struktur arsitektur Borobudur merepresentasikan tingkatan spiritual kesadaran manusia:
1. **Kamadhatu (Bagian Kaki/Dasar)**: Melambangkan alam bawah manusia yang masih terikat oleh nafsu badaniah (*kama*). Relief *Karmawibhangga* memuat 160 panil yang mendokumentasikan hukum sebab-akibat karma perbuatan manusia. Bagian ini kemudian ditutup oleh selasar penguat (*encasement*) batu andesit tambahan.
2. **Rupadhatu (Empat Lorong Persegi)**: Melambangkan alam antara, tempat manusia telah terbebas dari dorongan nafsu hewani namun masih terikat pada wujud fisik dan rupa. Dindingnya dihiasi narasi *Lalitavistara* (biografi Sang Buddha Sakyamuni), *Jataka-Avadana*, dan *Gandavyuha* (perjalanan spiritual Sudhana mencari pencerahan tertinggi).
3. **Arupadhatu (Tiga Teras Melingkar & Stupa Induk)**: Melambangkan alam nir-wujud, puncak kekosongan (*sunyata*) dan pencapaian Nirwana. Berbeda dengan dinding lorong di bawahnya, teras Arupadhatu polos tanpa relief naratif, hanya memuat stupa-stupa berterawang yang menaungi arca Dhyani Buddha Vajrasattva/Aksobhya, hingga berpuncak pada Stupa Induk tertutup yang hening.

### 3. Aspek Teknik Arsitektur Interlocking Batu Andesit
Borobudur tidak menggunakan semen atau perekat modern. Sambungan antar balok andesit menggunakan teknik *knock-down interlocking*:
- Sambungan takikan ekor burung (*dovetail joint*)
- Sambungan alur lidah (*tongue and groove*)
- Pola lubang pasak (*dowel and mortise*)
Sistem drainase menggunakan ornamen *Jaladwara* (mulut monster Makara) yang mengalirkan air hujan keluar struktur candi secara gravitasi alami.

### 4. Relevansi Akademik Masa Kini
Kajian relief Borobudur menjadi sumber primer bagi peneliti sosiologi dan filologi dalam merekonstruksi alat musik kuno nusantara (seperti *saron*, *lute*, *flute*), moda transportasi laut (Kapal Borobudur berlunas ganda), flora-fauna endemik Nusantara abad ke-8, serta stratifikasi sosial masyarakat agraris Mataram Kuno.
    `,
    sitasi: {
      apa: "Soekmono, R. (1976). Chandi Borobudur: A Monument of Mankind. Paris: The Unesco Press.",
      chicago: "Soekmono, R. Chandi Borobudur: A Monument of Mankind. Paris: The Unesco Press, 1976.",
      mla: "Soekmono, R. Chandi Borobudur: A Monument of Mankind. The Unesco Press, 1976."
    },
    keywords: ["Borobudur", "Arkeologi", "Dinasti Syailendra", "Karmawibhangga", "Kamadhatu", "Andesit"]
  },
  {
    id: "mhs-2",
    matkulKategori: "Arkeologi & Sejarah",
    judul: "Prasasti Mantyasih & Canggal: Rekonstruksi Historiografi Bumi Magelang",
    badge: "Epigrafi & Filologi Kuno",
    penulis: "Laboratorium Epigrafi Jawa Kuno",
    sumberReferensi: "Boechari. (2012). Melacak Sejarah Kuno Indonesia Lewat Prasasti. Jakarta: Kepustakaan Populer Gramedia; Poerbatjaraka, R. Ng. (1952). Riwajat Indonesia I.",
    waktuBaca: "6 Menit Baca",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    abstrak: "Telaah filologis Prasasti Mantyasih (907 M) masa Raja Dyah Balitung yang menetapkan status Desa Sima perdikan Mantyasih, dan Prasasti Canggal (732 M) di Candi Gunung Wukir Magelang sebagai tonggak penetapan Wangsa Sanjaya di tanah Jawa.",
    materiLengkap: `
### 1. Prasasti Canggal (654 Saka / 732 Masehi)
Ditemukan di halaman Candi Gunung Wukir, Dusun Canggal, Desa Kadiluwih, Kecamatan Salam, Kabupaten Magelang. Prasasti bertuliskan huruf Pallawa dengan bahasa Sanskerta berirama puisi (*sloka*).
- **Isi Pokok**: Memperingati pendirian lingga suci (*Sivalingga*) di bukit Stirangga oleh Raja Sanjaya, putra Sannaha (saudari Raja Sanna).
- **Nilai Penting**: Menjadi dokumen tertulis tertua yang menyebut keberadaan pulau Jawa yang subur (*Yavadvipa*), kaya akan padi dan tambang emas, serta mendokumentasikan legitimasi dinasti Sanjaya yang beraliran Siwaistis.

### 2. Prasasti Mantyasih / Tembaga Balitung (829 Saka / 11 April 907 M)
Ditemukan di Kampung Meteseh, Kelurahan Magelang, Kecamatan Magelang Tengah. Prasasti lempeng tembaga beraksara dan berbahasa Jawa Kuno.
- **Pemberian Anugerah Sima**: Raja Dyah Balitung menganugerahi warga desa Mantyasih status *Sima* (tanah bebas pajak) sebagai balasan jasa karena para tetua desa telah merawat dan menjaga keamanan jalan serta patok perbatasan kerajaan.
- **Daftar Raja-Raja Mataram Kuno (Silsilah Dinasti)**:
  Prasasti ini sangat berharga bagi sejarawan karena mencatat daftar nama penguasa Mataram sebelum Dyah Balitung:
  1. Rakai Mataram Sang Ratu Sanjaya
  2. Sri Maharaja Rakai Panangkaran
  3. Sri Maharaja Rakai Panunggalan
  4. Sri Maharaja Rakai Warak
  5. Sri Maharaja Rakai Garung
  6. Sri Maharaja Rakai Pikatan
  7. Sri Maharaja Rakai Kayuwangi
  8. Sri Maharaja Rakai Watuhumalang
  9. Sri Maharaja Rakai Watukura Dyah Balitung
- **Asal Usul Nama Magelang**: Tanggal 11 April 907 M dalam prasasti Mantyasih inilah yang secara resmi ditetapkan Pemerintah Daerah sebagai Hari Jadi Kota Magelang.
    `,
    sitasi: {
      apa: "Boechari. (2012). Melacak Sejarah Kuno Indonesia Lewat Prasasti. Jakarta: Kepustakaan Populer Gramedia.",
      chicago: "Boechari. Melacak Sejarah Kuno Indonesia Lewat Prasasti. Jakarta: Kepustakaan Populer Gramedia, 2012.",
      mla: "Boechari. Melacak Sejarah Kuno Indonesia Lewat Prasasti. Kepustakaan Populer Gramedia, 2012."
    },
    keywords: ["Prasasti Mantyasih", "Prasasti Canggal", "Dyah Balitung", "Raja Sanjaya", "Epigrafi", "Hari Jadi Magelang"]
  },
  {
    id: "mhs-3",
    matkulKategori: "Antropologi & Seni Pertunjukan",
    judul: "Tari Soreng Merbabu: Etnografi Heroisme Prajurit Aryo Penangsang",
    badge: "Antropologi Budaya",
    penulis: "Divisi Kajian Etnomusikologi & Seni Rakyat",
    sumberReferensi: "Soedarsono, R. M. (2002). Seni Pertunjukan Indonesia di Era Globalisasi. Yogyakarta: Gadjah Mada University Press.",
    waktuBaca: "5 Menit Baca",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    abstrak: "Eksplorasi struktural pertunjukan Tari Soreng yang berkembang di kawasan lereng Gunung Merbabu (Grabag dan Ngablak, Magelang), menelusuri simbolisasi gerakan prajurit berkuda, kostum ronce melati, serta fungsi sosial kohesi warga lereng gunung.",
    materiLengkap: `
### 1. Asal-Usul & Mitologi Kesenian Soreng
Kesenian Soreng berakar dari narasi legenda masa peralihan Kesultanan Demak menuju Pajang (abad ke-16), khususnya pertempuran antara laskar Adipati Jipang Panolan (Aryo Penangsang) bersama patihnya Mantri Gagak Rimang melawan pasukan Sutawijaya.
Tokoh-tokoh prajurit yang dihidupkan dalam tarian ini mencakup:
- Sorengpati
- Sorengrono
- Sorengrangsang
- Prajurit berkuda jaran kepang

### 2. Karakteristik Gerak & Musikalitas
- **Gerak Gagah & Komunal**: Gerakan tarian sangat menghentak, dinamis, dan bertenaga (*vigorous movement*), menyimbolkan ketangguhan prajurit pegunungan yang terbiasa menempuh lereng curam.
- **Rias dan Busana**: Penari mengenakan celana cinde, kain jarik parang, rompi berhias manik-manik, ikat kepala badong dengan hiasan ronce bunga melati yang menjuntai di dada, serta keris terselip di pinggang.
- **Instrumen Musik Pengiring**: Didominasi oleh instrumen ritmis sederhana namun berfrekuensi tinggi: kendang sabet, bedug kecil, kempul, kentrung, dan terompet tiup tradisi (*selompret*) berlaras slendro.

### 3. Fungsi Sosial & Modal Kultural (Cultural Capital)
Dalam masyarakat pedesaan Lereng Merbabu, pertunjukan Soreng bukan semata hiburan panggung, melainkan:
- **Ritual Syukuran Panen & Bersih Desa (*Merti Dusun*)**: Memperkuat ikatan spiritual dengan leluhur pendiri desa (*cikal bakal*).
- **Wahana Inisiasi Pemuda**: Wadah pembentukan disiplin, fisik, dan rasa persaudaraan lintas generasi muda desa.
- **Adaptasi Zaman**: Soreng kini diakui sebagai Warisan Budaya Takbenda (WBTb) Indonesia asal Magelang dan kerap diadaptasi untuk festival budaya internasional.
    `,
    sitasi: {
      apa: "Soedarsono, R. M. (2002). Seni Pertunjukan Indonesia di Era Globalisasi. Yogyakarta: Gadjah Mada University Press.",
      chicago: "Soedarsono, R. M. Seni Pertunjukan Indonesia di Era Globalisasi. Yogyakarta: Gadjah Mada University Press, 2002.",
      mla: "Soedarsono, R. M. Seni Pertunjukan Indonesia di Era Globalisasi. Gadjah Mada University Press, 2002."
    },
    keywords: ["Tari Soreng", "Merbabu", "Aryo Penangsang", "WBTb", "Antropologi Tari", "Merti Dusun"]
  },
  {
    id: "mhs-4",
    matkulKategori: "Antropologi & Seni Pertunjukan",
    judul: "Kesenian Topeng Ireng (Dayakan): Sinkretisme Seni Rakyat Lereng Menoreh",
    badge: "Etnologi Seni Pertunjukan",
    penulis: "Pusat Kajian Folklore Nusantara",
    sumberReferensi: "Kusmayati, A. M. H. (2000). Arak-arakan Seni Pertunjukan di Daerah Istimewa Yogyakarta dan Jawa Tengah. Surakarta: ISI Press.",
    waktuBaca: "6 Menit Baca",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    abstrak: "Kajian transformasi seni pertunjukan Topeng Ireng dari bentuk dakwah dan penyamaran politik zaman kolonial menjadi seni pertunjukan massal komunal dengan denting lonceng gemerincing kaki khas lereng Merapi-Menoreh.",
    materiLengkap: `
### 1. Genealogi Nama dan Historis
Nama **Topeng Ireng** merupakan akronim dari kalimat bahasa Jawa: *"Toto Lempeng Irama Kenceng"* (berbaris lurus dengan ritme irama yang tegas dan cepat).
Awalnya kesenian ini dikenal luas sebagai kesenian *Dayakan* karena tata rias penari yang menyerupai hiasan kepala suku pedalaman bermahkota bulu unggas merak/ayam warna-warni yang menjulang tinggi.

### 2. Elemen Audio-Visual Khas
- **Gemrincing Kelintingan Kaki**: Setiap penari mengikatkan untaian puluhan lonceng kuningan (*kelinting*) di kedua betis kakinya. Setiap hentakan kaki ke tanah menghasilkan paduan bunyi gemerincing ritmis serentak yang memekakkan panggung.
- **Kombinasi Olah Vokal Religi**: Musik pengiring diiringi terbang/rebana, kendang, dan nyanyian tembang Jawa yang diselingi selawat dan wejangan moral religius.

### 3. Aspek Sosiologis
Kesenian ini menunjukkan bagaimana masyarakat agraris pedesaan Magelang menyikapi modernitas dengan terus merevitalisasi kesenian rakyat secara mandiri tanpa kehilangan jiwa komunal gotong-royong.
    `,
    sitasi: {
      apa: "Kusmayati, A. M. H. (2000). Arak-arakan Seni Pertunjukan di Daerah Istimewa Yogyakarta dan Jawa Tengah. Surakarta: ISI Press.",
      chicago: "Kusmayati, A. M. H. Arak-arakan Seni Pertunjukan di Daerah Istimewa Yogyakarta dan Jawa Tengah. Surakarta: ISI Press, 2000.",
      mla: "Kusmayati, A. M. H. Arak-arakan Seni Pertunjukan di Daerah Istimewa Yogyakarta dan Jawa Tengah. ISI Press, 2000."
    },
    keywords: ["Topeng Ireng", "Dayakan", "Menoreh", "Seni Rakyat", "Toto Lempeng", "Kelintingan"]
  },
  {
    id: "mhs-5",
    matkulKategori: "Arsitektur Vernakular",
    judul: "Teknologi Sambungan Kayu Interlocking Omah Joglo Khas Magelangan",
    badge: "Arsitektur Tradisional",
    penulis: "Departemen Arsitektur & Perencanaan Wilayah",
    sumberReferensi: "Dakung, S. (1982). Arsitektur Tradisional Daerah Jawa Tengah. Jakarta: Departemen Pendidikan dan Kebudayaan; Prihatmaji, Y. P. (2007). Perilaku Gempa Rumah Tradisional Jawa.",
    waktuBaca: "6 Menit Baca",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    abstrak: "Analisis performa seismik dan kearifan konstruksi omah Joglo dan Limasan di pedesaan Karesidenan Magelang, mengkaji sistem sambungan tumpangsari, saka guru di atas umpak batu, serta orientasi kosmologis gunung Merapi-Sumbing.",
    materiLengkap: `
### 1. Struktur Saka Guru dan Tumpangsari
Inti dari arsitektur rumah tradisional Magelangan berpusat pada empat pilar utama (*Saka Guru*) dari kayu jati atau nangka tua. Empat pilar ini menopang susunan balok kayu bertingkat ke atas yang disebut *Tumpangsari*.
- Jumlah undakan tumpangsari menunjukkan status pemilik bangunan (tumpangsari 3, 5, atau 7 lapis).
- Dihiasi ukiran lung-lungan bermotif sulur daun tembakau dan teratai yang mencerminkan vegetasi lokal subur lereng gunung.

### 2. Ketahanan Seismik (Earthquake Resilience)
Secara ilmiah, konstruksi Joglo merupakan salah satu struktur kayu tahan gempa terbaik di dunia tropis:
- **Pondasi Umpak Non-Rigid**: Saka Guru tidak ditanam mati ke dalam tanah dengan semen cor, melainkan bertumpu bebas di atas batu umpak kali. Ketika terjadi guncangan gempa bumi, tiang dapat bergeser sedikit tanpa mematahkan rangka atap.
- **Sistem Sambungan Pasak (Knock-down)**: Sambungan antar balok (*blandar*, *pengeret*, *sunduk*) menggunakan teknik takikan purus dan pasak kayu bambu tanpa paku logam, memungkinkan struktur lentur mengikuti getaran seismik.

### 3. Orientasi Kosmologis & Ventilasi Alami
Rumah tradisional di Magelang umumnya dibangun berorientasi Utara-Selatan (menghadap ke poros laut selatan atau membelakangi gunung suci), dengan tritisan atap yang lebar untuk memitigasi curah hujan tropis yang tinggi di daerah pegunungan Kedu.
    `,
    sitasi: {
      apa: "Prihatmaji, Y. P. (2007). Perilaku Gempa Rumah Tradisional Jawa. Jurnal Arsitektur & Lingkungan Binaan, 15(2), 85-94.",
      chicago: "Prihatmaji, Y. P. \"Perilaku Gempa Rumah Tradisional Jawa.\" Jurnal Arsitektur & Lingkungan Binaan 15, no. 2 (2007): 85-94.",
      mla: "Prihatmaji, Y. P. \"Perilaku Gempa Rumah Tradisional Jawa.\" Jurnal Arsitektur & Lingkungan Binaan, vol. 15, no. 2, 2007, pp. 85-94."
    },
    keywords: ["Arsitektur Vernakular", "Omah Joglo", "Saka Guru", "Tumpangsari", "Ketahanan Gempa", "Umpak"]
  },
  {
    id: "mhs-6",
    matkulKategori: "Sosiologi & Kearifan Lokal",
    judul: "Kearifan Lokal 'Paseduluran Desa' dalam Mitigasi Bencana Erupsi Merapi",
    badge: "Sosiologi Kebencanaan",
    penulis: "Pusat Studi Sosiologi Lingkungan & Kebencanaan",
    sumberReferensi: "Dove, M. R. (2008). The Banana Tree at the Gate: A History of Marginal Peoples and Global Markets in West Kalimantan; Schlehe, J. (1996). Reinterpretations of Mystical Traditions: Mount Merapi.",
    waktuBaca: "7 Menit Baca",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    abstrak: "Studi sosiologis mengenai modal sosial masyarakat Magelang lereng Merapi dalam menghadapi ancaman erupsi melalui jaringan kearifan 'Desa Bersaudara' (Sister Village) yang menghubungkan desa Kawasan Rawan Bencana (KRB III) dengan desa penyangga di zona aman.",
    materiLengkap: `
### 1. Paradigma Kosmologi Gunung Merapi
Bagi masyarakat lereng Merapi di Kabupaten Magelang (seperti Dukun, Sawangan, Srumbung), Gunung Merapi bukan sekadar objek geologis yang mengancam, melainkan entitas hidup pemberi kesuburan tanah vulkanik dan sumber mata air. Istilah *"Erupsi"* sering diistilahkan oleh sesepuh desa sebagai *"Merapi Kagungan Kersa"* (Gunung Merapi sedang punya hajatan alam).

### 2. Inovasi Modal Sosial: Sistem 'Sister Village' (Paseduluran Desa)
Kabupaten Magelang menjadi percontohan nasional dalam mitigasi bencana berbasis modal sosial:
- Desa di zona KRB III (zona bahaya tinggi) berpasangan secara resmi dengan desa di zona aman (KRB I/luar ancaman).
- Saat status Merapi naik ke Level Awas, warga mengungsi bukan ke tenda darurat acak, melainkan langsung menuju rumah warga 'saudara' mereka di desa penyangga.
- Setiap keluarga pengungsi telah mengetahui keluarga asuh yang akan mereka tempati, ternak ditampung di kandang komunal desa saudara, dan anak-anak dapat langsung bersekolah darurat di SD mitra.

### 3. Nilai Gotong Royong 'Sambatan'
Sistem ini terbukti meniadakan konflik sosial di pos pengungsian, mempertahankan martabat kemanusiaan para penyintas bencana, dan menjaga stabilitas psikologis warga pedesaan agraris.
    `,
    sitasi: {
      apa: "Schlehe, J. (1996). Reinterpretations of Mystical Traditions: Explanations of a Volcanic Eruption in Java. Anthropos, 91(4/6), 391-409.",
      chicago: "Schlehe, Judith. \"Reinterpretations of Mystical Traditions: Explanations of a Volcanic Eruption in Java.\" Anthropos 91, no. 4/6 (1996): 391-409.",
      mla: "Schlehe, Judith. \"Reinterpretations of Mystical Traditions: Explanations of a Volcanic Eruption in Java.\" Anthropos, vol. 91, no. 4/6, 1996, pp. 391-409."
    },
    keywords: ["Sosiologi Bencana", "Merapi", "Sister Village", "Paseduluran Desa", "Sambatan", "Kearifan Lokal"]
  }
];

const dataUmum = {
  destinasi: [
    {
      id: "wisata-1",
      nama: "Taman Wisata Candi Borobudur",
      kategori: "Sejarah & Candi",
      tagline: "Mahakarya Arsitektur Buddha Terbesar di Dunia (UNESCO World Heritage)",
      rating: 4.9,
      ulasan: 18450,
      hargaTiket: "Rp 50.000 (Reguler) / Rp 150.000 (Naik Monumen)",
      jamBuka: "06.30 - 16.30 WIB",
      lokasi: "Jl. Badrawati, Kawasan Candi Borobudur, Kec. Borobudur, Magelang",
      fasilitas: ["Museum Karmawibhangga", "Museum Samudraraksa", "Mobil Listrik Shuttle", "Pemandu Resmi", "Musholla & Toilet Bersih", "Pusat Cendera Mata"],
      deskripsi: "Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-8 oleh Dinasti Syailendra. Menyajikan 2.672 panel relief naratif yang menakjubkan dan 504 arca Buddha, dikelilingi pemandangan perbukitan Menoreh yang memukau.",
      image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Candi+Borobudur+Magelang"
    },
    {
      id: "wisata-2",
      nama: "Nepal Van Java (Dusun Butuh)",
      kategori: "Wisata Alam",
      tagline: "Pesona Perumahan Warna-Warni Bertingkat di Lereng Gunung Sumbing",
      rating: 4.7,
      ulasan: 5320,
      hargaTiket: "Rp 15.000 / orang",
      jamBuka: "06.00 - 17.30 WIB",
      lokasi: "Dusun Butuh, Desa Temanggung, Kec. Kaliangkrik, Magelang",
      fasilitas: ["Ojek Wisata Lereng", "Spot Foto Gardu Pandang", "Warung Kopi & Kuliner Hangat", "Homestay Warga", "Musholla"],
      deskripsi: "Dusun Butuh merupakan pemukiman tertinggi di Kabupaten Magelang (ketinggian sekitar 1.620 mdpl). Rumah-rumah penduduk yang dibangun bertingkat di lereng gunung dengan latar belakang megah puncak Gunung Sumbing menyerupai lanskap pedesaan Namche Bazaar di Nepal.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Nepal+Van+Java+Dusun+Butuh+Magelang"
    },
    {
      id: "wisata-3",
      nama: "Punthuk Setumbu",
      kategori: "Wisata Alam",
      tagline: "Spot Sunrise 'Nirwana Borobudur' Berselimut Kabut Menoreh",
      rating: 4.8,
      ulasan: 7890,
      hargaTiket: "Rp 20.000 (Domestik) / Rp 50.000 (Mancanegara)",
      jamBuka: "04.00 - 17.00 WIB",
      lokasi: "Dusun Kurahan, Desa Karangrejo, Kec. Borobudur, Magelang",
      fasilitas: ["Gardu Pandang Sunrise", "Gazebo Istirahat", "Jalur Tracking Berbatu Rapi", "Warung Kopi Pagi", "Toilet"],
      deskripsi: "Bukit setinggi 400 mdpl yang menjadi lokasi favorit fotografer dunia untuk menyaksikan kemunculan matahari terbit dengan siluet Candi Borobudur yang mengambang di atas lautan kabut pagi dan latar Gunung Merapi-Merbabu.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Punthuk+Setumbu+Borobudur"
    },
    {
      id: "wisata-4",
      nama: "Ketep Pass & Ketep Volcano Centre",
      kategori: "Wisata Edukasi & Alam",
      tagline: "Pusat Pengamatan Vulkanologi dengan Sudut Pandang 5 Gunung",
      rating: 4.6,
      ulasan: 9400,
      hargaTiket: "Rp 12.500 (Hari Biasa) / Rp 15.000 (Akhir Pekan)",
      jamBuka: "08.00 - 17.00 WIB",
      lokasi: "Jl. Blabak - Boyolali KM 16, Ketep, Kec. Sawangan, Magelang",
      fasilitas: ["Bioskop Vulkanologi (Ketep Volcano Theatre)", "Teropong Bintang & Gunung", "Museum Vulkanologi", "Pelataran Panca Arga", "Restoran"],
      deskripsi: "Berada di celah antara Gunung Merapi dan Merbabu di ketinggian 1.200 mdpl. Dari Pelataran Panca Arga, pengunjung dapat menikmati panorama lima gunung sekaligus (Merapi, Merbabu, Sindoro, Sumbing, Slamet) serta belajar sejarah aktivitas erupsi Merapi.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Ketep+Pass+Magelang"
    },
    {
      id: "wisata-5",
      nama: "Svargabumi Borobudur",
      kategori: "Rekreasi Keluarga",
      tagline: "Destinasi Agrowisata Persawahan Estetik dan Edukatif",
      rating: 4.7,
      ulasan: 6120,
      hargaTiket: "Rp 30.000 (Dewasa) / Rp 15.000 (Anak-anak)",
      jamBuka: "08.00 - 17.00 WIB (Tutup Hari Kamis)",
      lokasi: "Jl. Borobudur - Ngadiharjo, Ngaran Lor, Borobudur, Magelang",
      fasilitas: ["Jembatan Papan Kayu di Atas Sawah", "22+ Spot Foto Unik", "Kolam Santai", "Cafe Sawah", "Area Parkir Luas"],
      deskripsi: "Konsep ekowisata persawahan modern yang memberdayakan lahan milik petani lokal tanpa merusak fungsi padi. Menghadirkan jembatan kayu terapung di tengah hamparan padi hijau dengan pemandangan pegunungan Menoreh.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Svargabumi+Borobudur"
    },
    {
      id: "wisata-6",
      nama: "Candi Umbul (Pemandian Air Hangat Kuno)",
      kategori: "Sejarah & Candi",
      tagline: "Situs Petirtaan Air Hangat Belerang Peninggalan Dinasti Mataram Kuno",
      rating: 4.5,
      ulasan: 2800,
      hargaTiket: "Rp 10.000 / orang",
      jamBuka: "06.00 - 17.30 WIB",
      lokasi: "Desa Kartoharjo, Kec. Grabag, Magelang",
      fasilitas: ["Dua Kolam Batu Andesit Kuno", "Pancuran Air Alami", "Taman Asri", "Ruang Ganti & Bilas", "Warung Kuliner Grabag"],
      deskripsi: "Situs cagar budaya berupa kolam pemandian air hangat alami yang dibangun pada abad ke-9 Masehi. Dikelilingi dinding batu andesit berelief binatang dan tumbuhan, airnya tidak berbau belerang menyengat dan dipercaya menyehatkan kulit serta meredakan pegal.",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Candi+Umbul+Grabag+Magelang"
    }
  ],

  tourGuide: [
    {
      id: "guide-1",
      nama: "Budi Santoso, S.Hum",
      sertifikasi: "Pemandu Madya HPI (Himpunan Pramuwisata Indonesia) Magelang",
      spesialisasi: "Sejarah Relief Candi Borobudur, Arkeologi Percandian & Filosofi Buddha",
      bahasa: ["Bahasa Indonesia", "English", "Nederlands (Belanda)"],
      pengalaman: "14 Tahun Pengalaman",
      rating: 4.95,
      totalTur: 920,
      tarif: "Mulai Rp 350.000 / sesi tur candi",
      waPhone: "6281234567801",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      deskripsi: "Alumnus Arkeologi yang mendedikasikan hidupnya menjelaskan keagungan relief Borobudur dan Mendut dengan gaya bertutur kisah yang hidup, mendalam, dan ilmiah."
    },
    {
      id: "guide-2",
      nama: "Siti Rahmawati, S.Par",
      sertifikasi: "Pemandu Ekowisata & Geotour Guide Bersertifikasi BNSP",
      spesialisasi: "Geowisata Merapi, Trekking Nepal Van Java, dan Silancur Highland",
      bahasa: ["Bahasa Indonesia", "English"],
      pengalaman: "8 Tahun Pengalaman",
      rating: 4.88,
      totalTur: 540,
      tarif: "Mulai Rp 300.000 / hari (Outdoor Trekking)",
      waPhone: "6281234567802",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      deskripsi: "Spesialis rute trekking alam lereng gunung, pengamatan vulkanologi Merapi yang aman, dan sudut pandang fotografi tersembunyi (*hidden gems*) di lereng Sumbing."
    },
    {
      id: "guide-3",
      nama: "Anton Wibowo",
      sertifikasi: "Pemandu Lokal Desa Wisata Candirejo & Wanurejo",
      spesialisasi: "Ekowisata Pedesaan, Kerajinan Gerabah Klipoh, Tur Sepeda & Andong",
      bahasa: ["Bahasa Indonesia", "English", "Français (Perancis)"],
      pengalaman: "11 Tahun Pengalaman",
      rating: 4.92,
      totalTur: 710,
      tarif: "Mulai Rp 250.000 / tur desa wisata",
      waPhone: "6281234567803",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      deskripsi: "Warga asli Borobudur yang piawai mengajak wisatawan berinteraksi langsung dengan pengrajin gerabah, memanen padi bersama petani, dan mencicipi masakan pawon desa."
    },
    {
      id: "guide-4",
      nama: "Hendra Wijaya",
      sertifikasi: "Fotografer Budaya & Pemandu Lanskap Khusus",
      spesialisasi: "Tur Sunrise Punthuk Setumbu, Astrophotography Gunung, & Human Interest",
      bahasa: ["Bahasa Indonesia", "English", "Deutsch (Jerman)"],
      pengalaman: "9 Tahun Pengalaman",
      rating: 4.9,
      totalTur: 480,
      tarif: "Mulai Rp 400.000 / sesi sunrise & hunting foto",
      waPhone: "6281234567804",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      deskripsi: "Membantu Anda mendapatkan komposisi foto terbaik pada jam-jam emas (*golden hour*) di perbukitan Magelang dan mendokumentasikan momen liburan dengan kamera profesional."
    }
  ],

  penginapan: [
    {
      id: "hotel-1",
      nama: "Plataran Borobudur Resort & Spa",
      tipe: "Resort Mewah Bintang 5",
      bintang: 5,
      rating: 4.9,
      kisaranHarga: "Rp 3.500.000 - Rp 7.500.000 / malam",
      lokasi: "Dusun Tanjungan, Kec. Borobudur, Magelang",
      fasilitas: ["Private Pool Villa", "View Langsung Candi Borobudur & Menoreh", "Padma Spa", "The Colonial Restaurant", "Yoga Deck"],
      deskripsi: "Resort mewah bernuansa arsitektur kolonial-jawa di tengah hutan jati bukit Tanjungan. Memberikan suasana privat berkelas dunia dengan pemandangan siluet Candi Borobudur dari balkon villa.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      bookingUrl: "https://www.plataran.com/plataran-borobudur/"
    },
    {
      id: "hotel-2",
      nama: "Hotel Puri Asri Magelang",
      tipe: "Resort Hotel Bintang 5",
      bintang: 5,
      rating: 4.7,
      kisaranHarga: "Rp 650.000 - Rp 2.200.000 / malam",
      lokasi: "Jl. Cempaka No. 9, Kemirirejo, Kota Magelang",
      fasilitas: ["Taman Tropis 22 Hektar", "Tepi Sungai Progo (River View)", "Kolam Renang Luas", "Outbound & Rafting Access", "Restoran Apung"],
      deskripsi: "Hotel legendaris dengan lanskap taman tropis nan rimbun di pusat Kota Magelang. Menghadap langsung aliran Sungai Progo dan sawah asri, memadukan kenyamanan hotel bintang lima dengan udara sejuk pegunungan.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      bookingUrl: "https://hotelpuriasri.com/"
    },
    {
      id: "hotel-3",
      nama: "Atria Hotel Magelang",
      tipe: "Hotel Bisnis & Keluarga Bintang 4",
      bintang: 4,
      rating: 4.6,
      kisaranHarga: "Rp 550.000 - Rp 1.400.000 / malam",
      lokasi: "Jl. Jenderal Sudirman No. 42, Kota Magelang",
      fasilitas: ["Ballroom Konferensi", "Kolam Renang Luar Ruangan", "Fitness Centre & Spa", "Bateeq Lounge", "Dekat Pusat Belanja Artos Mall"],
      deskripsi: "Pilihan utama akomodasi modern bagi pebisnis, akademisi, dan keluarga yang membutuhkan kenyamanan fasilitas hotel modern dengan akses cepat ke pusat kota Magelang.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      bookingUrl: "https://www.parador-hotels.com/atria-hotel-magelang/"
    },
    {
      id: "hotel-4",
      nama: "Homestay Desa Wisata Candirejo",
      tipe: "Homestay Budaya & Ekowisata Komunal",
      bintang: 4,
      rating: 4.8,
      kisaranHarga: "Rp 150.000 - Rp 350.000 / malam",
      lokasi: "Desa Candirejo, Kec. Borobudur, Magelang (3 km dari Borobudur)",
      fasilitas: ["Kamar Bersih Tradisional Jawa", "Sarapan Masakan Pawon Desa", "Paket Tur Andong & Sepeda Ontel", "Belajar Memasak Makanan Tradisional", "Wifi"],
      deskripsi: "Pengalaman menginap otentik bersama warga lokal di desa wisata peraih penghargaan UNWTO. Rasakan ketenangan hidup pedesaan, menyantap sayur lodeh segar dari kebun, dan menikmati malam bertabur bintang di pedesaan Borobudur.",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      bookingUrl: "https://candirejo.com/"
    }
  ],

  edukasiBudaya: [
    {
      id: "budaya-1",
      judul: "Gunung Tidar: 'Paku Tanah Jawa' & Kisah Syekh Subakir",
      kategori: "Legenda & Sejarah Spiritual",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Bukit kecil di tengah Kota Magelang yang diyakini secara turun-temurun sebagai titik sentral keseimbangan Pulau Jawa agar tidak terombang-ambing di lautan.",
      uraianLengkap: `
Gunung Tidar adalah bukit berketinggian sekitar 503 mdpl yang berdiri tegak tepat di tengah Kota Magelang.
Menurut mitologi babad tanah Jawa, pada zaman dahulu Pulau Jawa terapung-apung tidak stabil di samudera luas. Para dewa kemudian menancapkan 'paku sakti' di titik tengahnya, yang kemudian menjadi Bukit Tidar.

Di kawasan wisata religi ini terdapat:
- **Tugu Titik Nol Tanah Jawa**: Tugu berlambang huruf aksara Jawa *"Sa"* (Sapa Salah Seleh).
- **Makam Syekh Subakir**: Tokoh ulama penyebar peradaban asal Persia yang diyakini berhasil berdialog damai dengan penguasa gaib tanah Jawa, Ki Semar / Kyai Semar Badranaya.
- **Makam Kyai Sepanjang**: Tombak pusaka milik Syekh Subakir yang dikuburkan secara terhormat.

Kini Gunung Tidar menjadi paru-paru hijau kota Magelang sekaligus kawasan wisata religi dan olahraga jalan sehat bagi warga lokal.
      `
    },
    {
      id: "budaya-2",
      judul: "Museum Kamar Pengasingan Pangeran Diponegoro Magelang",
      kategori: "Sejarah Perjuangan Nasional",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Saksi bisu peristiwa perundingan penuh siasat licik Jenderal De Kock yang berujung pada penangkapan Pangeran Diponegoro pada 28 Maret 1830.",
      uraianLengkap: `
Terletak di dalam kompleks Karesidenan Kedu di Kota Magelang. Di ruangan inilah Perang Jawa (*De Java Oorlog* 1825-1830) yang menguras kas pemerintah kolonial Belanda secara dramatis berakhir.

Pangeran Diponegoro yang datang dengan itikad baik untuk berunding damai pada suasana Idul Fitri justru disergap dan ditawan oleh pihak Belanda di bawah komando Jenderal Hendrik Merkus de Kock.
Di dalam museum ini masih tersimpan:
- Meja dan kursi perundingan asli dengan bekas goresan kuku Pangeran Diponegoro yang menahan amarah atas pengkhianatan Belanda.
- Jubah gamis putih asli yang dikenakan Sang Pangeran.
- Cangkir teh dan perlengkapan salat bersejarah.
      `
    },
    {
      id: "budaya-3",
      judul: "Kupat Tahu Magelang: Harmoni Rasa Bumbu Kacang Berkuah Manis Gurih",
      kategori: "Warisan Kuliner Otentik",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Perpaduan ketupat lembut, tahu goreng setengah matang, bakwan sayur renyah, dan tauge dengan kuah gula merah cair berbumbu kacang dan bawang putih segar.",
      uraianLengkap: `
Kupat Tahu Magelang memiliki karakteristik yang sangat berbeda dari kupat tahu daerah lain (seperti Bandung atau Singaparna).
Kekhasan Kupat Tahu Magelang terletak pada:
- **Kuah Gula Jawa Cincang**: Tidak menggunakan pasta kacang kental seperti bumbu gado-gado, melainkan kuah cair hangat dari rebusan gula merah murni yang dimasak dengan daun salam, serai, lengkuas, dan kecap manis Magelang.
- **Ulekan Bawang Putih & Cabai Langsung di Piring**: Setiap porsi diulek langsung di piring saji bersama sedikit kacang tanah sangrai tumbuk kasar, memberikan aroma segar (*freshly crushed garlic*).
- **Komposisi Isian**: Potongan ketupat pulen, tahu putih lembut yang digoreng sesaat sebelum disajikan, irisan kol mentah segar, tauge pendek, potongan bakwan renyah, taburan seledri, dan bawang goreng melimpah.

Tempat legendaris: **Kupat Tahu Pojok Magelang** (langganan Presiden RI sejak era Bung Karno) dan **Kupat Tahu Pak Pangat**.
      `
    },
    {
      id: "budaya-4",
      judul: "Mangut Beong Borobudur: Kuliner Pedas Ikan Endemik Sungai Progo",
      kategori: "Warisan Kuliner Otentik",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Ikan Beong (Mystus nemurus) dengan tekstur daging gurih berserat lembut yang dimasak dalam kuah santan cabai rawit pedas kaya rempah.",
      uraianLengkap: `
Ikan Beong adalah ikan endemik sejenis lele air tawar berukuran besar dengan kumis panjang yang hanya hidup di arus deras Sungai Progo dan Sungai Elo di Magelang.
Daging ikan beong padat kenyal mirip daging patin atau lobster air tawar, dan tidak mudah hancur saat digoreng kering sebelum dimasukkan ke dalam bumbu mangut.

Bumbu kuah mangut terdiri dari santan kelapa kental, kunyit bakar, kencur, jahe, bawang merah, bawang putih, kemiri, serta puluhan cabai rawit merah utuh.
Sensasi memakan kepala ikan beong yang kaya rempah pedas membakar lidah ditemani nasi putih panas dan lalapan daun kemangi menjadi buruan wajib pecinta kuliner ekstrem nusantara saat berkunjung ke Borobudur.
      `
    },
    {
      id: "budaya-5",
      judul: "Sop Senerek: Sup Kacang Merah Jejak Budaya Kuliner Indis",
      kategori: "Warisan Kuliner Otentik",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Kuliner fusion era kolonial adaptasi dari masakan sup kacang polong Belanda 'Snert Soep' yang disesuaikan dengan rempah nusantara.",
      uraianLengkap: `
Nama **'Senerek'** merupakan pelafalan lidah orang Jawa untuk kata Belanda **'Snert'** (sebutan untuk sup kacang polong kental Belanda).
Oleh masyarakat Magelang zaman dulu, bahan kacang polong digantikan dengan kacang merah lokal (*red kidney beans*) yang melimpah di lereng Gunung Sumbing.

Semangkuk Sop Senerek disajikan bening kecokelatan dengan aroma rempah pala dan lada yang hangat. Isiannya terdiri dari:
- Kacang merah yang direbus hingga empuk lembut
- Irisan daging sapi atau buntut empuk
- Wortel dan bayam rebus segar
- Taburan daun bawang dan bawang merah goreng

Kedai legendaris: **Sop Senerek Bu Pranto** dan **Sop Senerek Pak Kromo**.
      `
    },
    {
      id: "budaya-6",
      judul: "Getuk Trio & Getuk Goreng: Legenda Olahan Singkong Manis Khas Magelang",
      kategori: "Oleh-Oleh & Tradisi Kuliner",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ringkasan: "Kudapan manis lembut berbahan dasar singkong pilihan dengan tiga lapis warna khas (putih, cokelat mocca, merah muda).",
      uraianLengkap: `
Magelang dijuluki sebagai **'Kota Getuk'** karena kepiawaian masyarakatnya mengolah singkong menjadi camilan bercita rasa bangsawan sejak dekade 1940-an.
Pelopor Getuk Trio diinisiasi pertama kali untuk memanfaatkan melimpahnya hasil tani ketela pohon di masa paceklik zaman perang kemerdekaan.

Getuk Trio dibuat dari singkong mentega yang dikukus matang, ditumbuk halus selagi panas bersama gula pasir dan mentega, lalu dipadatkan menjadi tiga lapisan warna bertingkat dengan aroma vanili dan cokelat moka yang harum. Teksturnya sangat pulen, legit, dan lumer di mulut.
      `
    }
  ],

  umkm: [
    {
      id: "umkm-1",
      nama: "Sanggar Seni Pahat Batu Andesit Candi Muntilan (Prumpung)",
      kategori: "Kerajinan Kriya Batu",
      lokasiDekat: "Dekat Candi Mendut & Jalur Utama Jogja-Magelang (Muntilan)",
      produkUtama: "Patung Stupa Candi, Arca Buddha, Cobek Batu Lava Merapi, Relief Dinding",
      kisaranHarga: "Rp 35.000 (Cobek Asli) - Rp 25.000.000+ (Arca Taman Monumental)",
      kontakWA: "6281328901001",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Pusat pemahat batu lava andesit Merapi terbesar di Indonesia yang mewarisi teknik memahat candi leluhur Mataram Kuno secara turun-temurun sejak ratusan tahun lalu."
    },
    {
      id: "umkm-2",
      nama: "Sentra Gerabah Tradisional Klipoh Karanganyar",
      kategori: "Kerajinan Gerabah Tanah Liat",
      lokasiDekat: "3 km Barat Candi Borobudur (Desa Karanganyar)",
      produkUtama: "Gerabah Pawon Kuno, Kendi Air Alami, Pot Terracotta Estetik, Cangkir Tanah Liat",
      kisaranHarga: "Rp 10.000 - Rp 150.000 / produk",
      kontakWA: "6281328901002",
      rating: 4.85,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Dusun Klipoh adalah sentra gerabah yang bahkan relief aktivitas pembuatannya terukir abadi di dinding relief Candi Borobudur. Wisatawan dapat belajar langsung memutar roda putar tanah liat (*pottery workshop*)."
    },
    {
      id: "umkm-3",
      nama: "Batik Tulis & Cap Magelangan 'Water Torn'",
      kategori: "Fashion & Tekstil Budaya",
      lokasiDekat: "Kawasan Budaya Kota Magelang",
      produkUtama: "Kain Batik Tulis Motif Water Torn, Motif Daun Tembakau Sumbing, Selendang Sutra",
      kisaranHarga: "Rp 120.000 (Batik Cap) - Rp 1.800.000 (Batik Tulis Halus)",
      kontakWA: "6281328901003",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Kreasi batik kontemporer yang mengangkat ikon cagar budaya Menara Air Kota Magelang (*Water Torn*) dan corak pertanian tembakau lereng gunung dengan pewarna alam ramah lingkungan."
    },
    {
      id: "umkm-4",
      nama: "Sentra Oleh-Oleh Getuk Trio Asli Magelang",
      kategori: "Makanan Khas & Oleh-oleh",
      lokasiDekat: "Jl. Tentara Pelajar & Jl. Mataram, Kota Magelang",
      produkUtama: "Getuk Trio Kemasan Dos, Getuk Goreng Renyah, Wajik Salaman, Krasikan Khas Kedu",
      kisaranHarga: "Rp 25.000 - Rp 60.000 / dos",
      kontakWA: "6281328901004",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Produsen oleh-oleh legendaris dengan resep asli tanpa bahan pengawet kimia buatan. Selalu segar dibuat setiap pagi untuk buah tangan para pelancong."
    },
    {
      id: "umkm-5",
      nama: "Kopi Robusta & Arabica Lereng Menoreh / Kaliangkrik",
      kategori: "Hasil Perkebunan & Kopi Nusantara",
      lokasiDekat: "Kawasan Desa Wisata Menoreh & Lereng Sumbing",
      produkUtama: "Biji Kopi Sangrai (Roast Beans) & Bubuk Kopi Robusta Menoreh, Arabica Sumbing Washed",
      kisaranHarga: "Rp 35.000 - Rp 110.000 / pack 250gr",
      kontakWA: "6281328901005",
      rating: 4.88,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Kopi petik merah yang dibudidayakan oleh kelompok tani pegunungan Magelang. Memiliki aroma khas rempah herbal dengan *aftertaste* manis alami yang disukai barista kafe nusantara."
    },
    {
      id: "umkm-6",
      nama: "Kerajinan Bambu & Anyaman Tradisional Giritengah",
      kategori: "Kerajinan Ramah Lingkungan",
      lokasiDekat: "Desa Giritengah Borobudur",
      produkUtama: "Besek Bambu Souvenir, Lampu Gantung Anyaman Etnik, Tas Anyaman Bambu Modern",
      kisaranHarga: "Rp 15.000 - Rp 180.000 / unit",
      kontakWA: "6281328901006",
      rating: 4.75,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      deskripsi: "Komunitas pengrajin desa yang mengubah bilah-bilah bambu hutan menjadi perabotan dan cenderamata bernilai estetika tinggi untuk dekorasi cafe dan homestay."
    }
  ]
};

// Pasang ke window agar dapat diakses tanpa batasan CORS pada protokol file:// maupun http://
window.dataMahasiswa = dataMahasiswa;
window.dataUmum = dataUmum;

