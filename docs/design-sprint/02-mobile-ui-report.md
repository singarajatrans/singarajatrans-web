# Agent 2 — Mobile UI System Report

Tanggal: 27 Oktober 2026, WITA. Baseline lokal: `055c204c1a7d3e9bb60dd3916c18269786bcd520` — Prevent 360px service label clipping.
Status: **audit dan usulan desain selesai; bukan persetujuan FINAL/LOCKED dan bukan implementasi**.
Ownership: hanya laporan ini. Tidak mengubah HTML/CSS/JS produksi, desktop, tests, manifest, backend/API/database/auth/RBAC, routing, tarif, jadwal, atau booking business logic.

## 1. Sumber, prioritas, dan batas keputusan

Dibaca: `AGENTS.md`, `docs/agents/02-mobile-ui.md`, `DESIGN.md`, `docs/home-mobile-v2.md`, `PRD-Design-Singaraja-Trans.md` (termasuk SEO/PWA dan bagian LOCKED), `index.html`, `assets/mobile-reference.css`, selector terkait di `assets/style.css`, `assets/mobile-home-v2.js`, `assets/mobile-bottom-nav.js`, serta tes Home V2/iOS yang tersedia. Screenshot repository `qa-output/` yang tersedia saat mulai adalah desktop 768/1024/1440, bukan bukti audit mobile baru.

Baseline yang berlaku adalah Home Mobile V2 tanggal 27 Oktober: sea-blue/orange, header lokasi + bell + search, empat shortcut, dua favorite cards, popular rows, inspirasi/destinasi/ulasan, bottom nav empat item. `assets/mobile-reference.css` dimuat setelah `style.css`; stylesheet V2 lama tidak dimuat. Ini menggantikan arah visual mobile lama yang bertentangan, bukan alasan mengembalikan header merah/carousel/notch lima-tab dari PRD lama. Desktop mulai 768px tetap LOCKED.

Tidak mengusulkan redesign header, selector, struktur nav, animasi opening lama, hero atau SEO. Catatan ukuran/warna pada bagian tersebut adalah observasi atau kandidat perbaikan aksesibilitas untuk sintesis Agent 1, **bukan izin membuka LOCK**. Rekomendasi baru belum boleh diterapkan sebelum master design disetujui. Constraint SEO, semantik, konten/link, pemisahan hasil dan Home, data nyata, serta larangan mengubah logic tetap berlaku.

Konflik yang perlu dicatat oleh Agent 1, tanpa diselesaikan melalui perubahan produksi oleh Agent 2:

| Konflik | Keputusan dalam audit ini |
|---|---|
| PRD merah/animated header/carousel vs V2 sea-blue/search/empat shortcut | Gunakan V2 terbaru; jangan revive spesifikasi lama. |
| PRD lima nav tanpa pill vs V2 empat nav dengan Home pill | Pertahankan empat item dan satu active surface V2. |
| PRD 19 Oktober H2 23, card 16, body 14, meta 12–13 vs CSS V2 19/11.5/12/9 | Pertahankan komposisi V2; usulkan skala terbaca di bawah untuk master design, bukan otomatis mengembalikan semua ukuran lama. |
| Larangan swap dalam DESIGN/PRD vs tombol swap masih tampak di panel saat ini | Temuan ketidaksesuaian existing. Tidak hapus/sembunyikan/ubah handler; keputusan produk dan penanganannya di luar ownership Agent 2. |
| Warna CTA yang dideklarasikan orange vs actual computed teal | Dokumentasikan pemenang cascade; usulkan mempertahankan teal yang kontras, jangan mengganti ke putih/orange tanpa evaluasi. |

## 2. Metode dan bukti audit

Audit lokal memakai Chromium sistem, viewport tinggi 844px, DPR 1, reduced motion. Screenshot dan computed geometry diperoleh pada 320/360/390/412/430px; review visual utama pada ketiga lebar wajib, ditambah 320/430 untuk resilience. Browser tidak dihubungkan ke WhatsApp dan tidak mengirim pesan/booking. Data publikasi hanya dibaca.

Scratch evidence berada di `/workspace/work/agent2-mobile-ui/a2-*-home.png`, `a2-*-booking.png`, `a2-*-lower.png`, `a2-measurements.json`; scratch bukan deliverable repository dan tidak perlu di-commit. Run tambahan merekam empat service panel, validasi kosong, EN, dan dialog cek booking pada 360/390/412. Screenshot adalah render baseline, bukan mockup usulan. Run state tambahan selesai di 360/390/412: empat panel layanan terlihat tanpa page overflow, favorite menjadi aria-pressed=true, EN direkam, feedback “Favorit belum tersedia.” terpicu, dialog cek booking terlihat, dan pageerror kosong pada tiap lebar. Untuk feedback unavailable, klik automation dipaksa karena Playwright menghormati aria-disabled; ini hanya memeriksa tampilan handler existing, bukan bukti aksesibilitas kontrol tersebut. Native invalid tanggal direkam; pesan “Pilih tanggal perjalanan.” saat ini berada sesudah CTA, sehingga rekomendasi pesan dekat field adalah usulan, bukan deskripsi existing.

| Viewport | Gutter | Search W×H | Favorite card W | Panel W×H terbuka | Page overflow Home / panel / expand |
|---|---:|---:|---:|---:|---|
| 320 | 16 | 230×48 | 139 | 288×379 | 0 / 0 / 0 px |
| **360** | **16** | **270×48** | **159** | **328×379** | **0 / 0 / 0 px** |
| **390** | **16** | **300×48** | **174** | **358×379** | **0 / 0 / 0 px** |
| **412** | **16** | **322×48** | **185** | **380×379** | **0 / 0 / 0 px** |
| 430 | 16 | 340×48 | 194 | 398×379 | 0 / 0 / 0 px |

Angka panel adalah Shuttle awal dalam sesi audit, bukan tinggi wajib untuk setiap layanan/state. Favorite cards awal setinggi sekitar 214.6px; gap 10px, image 126px. Header awal 172px; shortcut mulai y192; heading favorites sekitar y319; kartu y359; bottom nav 70px pada safe-area emulasi 0. Hasil ini menunjukkan konsistensi geometri utama, **bukan kelulusan keterbacaan**.

Di 360px rute awal masih terbaca satu baris, namun ukuran 11.5px terlalu kecil; di 320px teks rute terpotong di batas card meskipun halaman tidak overflow. Di 390/412 ruang bertambah tetapi font tetap kecil. Di 320 label shortcut sampai tiga baris; di 360 label panjang masih dua baris dan tidak tampak terpotong. Jangan mengecilkan font lebih jauh untuk mempertahankan tinggi kartu.

Batas bukti: WebKit tidak dapat dijalankan karena executable `webkit-2336/pw_run.sh` belum tersedia; tidak menginstal dependency. Safari fisik, Android fisik, dynamic toolbar, keyboard native, standalone install, safe-area nonzero dan accessibility text scaling belum diverifikasi. Tidak mengklaim deploy/live verification, full regression atau audit Agent 5. Laporan ini adalah audit visual lokal dan spesifikasi usulan.

## 3. Kesimpulan prioritas visual

Komposisi V2 sudah koheren: header kuat, foto lokal, surface putih, section ringkas dan empat nav. Tidak perlu redesign. Prioritas adalah keterbacaan, kontras, hit area, dan mengurangi variasi surface.

- **P1:** teks harga/link orange pada putih, metadata abu terang dan teks 8–11.5px; rute terpotong di 320; membedakan favorite default/selected.
- **P1:** field aktual 15px, close panel 34px, favorite 30px, action section minimum 30px; kandidat perbaikan ukuran/fokus tanpa menyentuh logic.
- **P2:** variasi shadow kecil-kecil, shadow orange pada CTA teal, label nav 9px, ruang kosong shortcut yang kurang seimbang dengan kartu padat.
- **Pertahankan:** gutter 16, grid dua kolom, empat shortcut, struktur/urutan section, foto existing, nav empat slot, panel yang tetap memakai form existing.

Rasio kontras berikut dihitung dari pasangan warna solid sRGB; foto/gradient perlu pengujian tersendiri: `#FF8A4C` di putih sekitar **2.34:1**, `#87959A` di putih **3.09:1**, `#A0A5A6` di putih **2.49:1**, `#9BA5A9` di putih **2.52:1**. Ini tidak memenuhi 4.5:1 untuk teks kecil; white/orange juga tidak memenuhi 3:1 untuk ikon bermakna. `#0B7285` di putih sekitar **5.59:1**. Rekomendasi `#B54708` di putih sekitar **5.43:1**, `#52636B` di putih sekitar **6.26:1**. Ukur ulang pasangan aktual sesudah implementasi.

## 4. Audit per komponen dan state

T = token-level; K = component-level. Risiko L/M/H menjelaskan risiko bila usulan kelak diterapkan. Semua usulan hanya mobile; detail yang menyentuh area LOCKED menunggu sintesis/gate.

### 4.1 Komposisi dan vertical rhythm

**Existing:** header → shortcut → favorite grid → popular list → inspiration banner → destination rail → review rail → bahasa. Booking collapsed; terbuka di bawah shortcut. Section gap utama 24px; heading-card gap 13px; favorite gap 10px. Favorites heading baru y319 sementara shortcut label berakhir sekitar y277 pada 360.

**Masalah:** card text sangat padat dibanding area kosong setelah shortcut; tidak perlu memadatkan seluruh halaman atau memperbesar header. Banyak shadow membuat kartu kecil lebih dominan dari informasi.

**Usulan tepat:** pertahankan urutan dan header 172px baseline; normalisasi section gap 24, heading-content 12, card gap 12, gutter 16 pada semua 320–430. Atur shortcut section mengikuti tinggi label terpanjang, sisakan 24px ke heading; jangan hard-crop label. Kartu content padding 12 (favorite boleh 8 di frame foto dan 10–12 body); biarkan tinggi mengikuti teks dua baris. Tidak memaksakan seluruh konten berada above fold.

**Alasan:** ruang diberikan ke informasi perjalanan, dengan ritme terprediksi. **Risiko M; T+K:** kenaikan tinggi kartu menggeser section di bawah, perlu audit semua panjang nama/dataset expanded dan ID/EN; tidak mengubah urutan DOM/heading.

### 4.2 Header, lokasi, bell, search dan orange control

**Existing:** sea-blue dengan dekorasi circular halus, lokasi putih, bell 44px, search 48px/r14, control 48×48/r14, gap10. Search teks 12px `#87959A`; control white icon 22px di orange. Tidak ada input search kedua.

**Default:** pertahankan layout/dekorasi/posisi baseline; usul teks trigger 14/20 dan muted gelap. **Focus:** outline 2px primary-strong dengan offset 2 di atas surface putih; di header teal gunakan outer white ring + inner teal agar tidak hilang. **Pressed:** perubahan warna ringan tanpa scale/layout shift; jangan mengubah label atau aksi. **Expanded:** pertahankan indikator existing `aria-expanded`; jangan menjadikan orange control sebagai fitur filter baru. **Lokasi/notification:** jangan membuat status lokasi/notifikasi palsu atau badge dekoratif.

**Masalah:** placeholder dan icon orange control kurang kontras. **Usulan tepat:** pertahankan orange surface, gunakan ink `#20272D` untuk ikon bermakna; teks trigger `#52636B`. Ukuran/pola header LOCKED baseline tidak dirombak. Jika geometri tidak boleh berubah, warna/fokus dicatat sebagai aksesibilitas untuk master design.

**Alasan:** fungsi search lebih mudah ditemukan tanpa menambah fitur. **Risiko M; T**, K hanya bila focus ring terpotong `#header{overflow:hidden}`; verifikasi ring tetap di dalam safe region. Ellipsis hanya prompt trigger, bukan data asal/tujuan. Jangan mengembalikan animated header/globe/share versi lama.

### 4.3 Empat service shortcuts

**Existing:** empat kolom sama; tile 62×58/r16, ikon mask 29px, label 10.5/13.44, height tombol104. Selected baru diberi tile soft-teal saat booking terbuka. Ikon bus, airport/car, charter/car, motor memakai aset existing.

**Default/closed:** pertahankan empat kolom dan tile turquoise putih. **Selected/open:** soft teal + border primary; ikon dan teks tetap, tidak scale. **Focus:** outline 2px, offset2 pada seluruh target, tidak mengubah ukuran tile. **Pressed:** soft teal lebih tegas tanpa shadow tambahan. **Unavailable motor:** tetap membuka informasi existing, bukan memperagakan ketersediaan.

**Masalah:** label kecil; karakter panjang pada 320 tiga baris; service selection tidak boleh hanya mengandalkan warna. **Usulan tepat:** kandidat label 11/14, weight600, minimal ruang tiga baris pada 320 dan tinggi sama mengikuti label terpanjang. Pertahankan tile62×58 dan empat kolom; ikon optical bounds24–28 konsisten, jangan mengganti aset. Selected memakai border2 inset (ukuran luar tetap) dan label weight700; state ARIA tetap mengikuti sumber existing.

**Alasan:** pengenalan layanan lebih stabil. **Risiko M; K+T, area baseline terkunci:** jangan menerapkan resize selector atau mengganti judul layanan tanpa keputusan master. Jika label baru tidak muat, tambah tinggi baris, bukan carousel lama atau singkatan konten sepihak.

### 4.4 Booking surface dan CTA

**Existing terukur:** panel putih/r20/border1/padding16, heading16, close34; field surface `#F6F9FA`, radius14. `#origin` computed15px. Trip mode actual underline teal dengan label15, bukan pill lama. CTA actual teal `#0B7285`, white15, height48/r14, tetapi shadow orange. `#search-form .search-button` di style.css dengan ID+important menang atas rule `.home-mobile-v2 .search-button` orange. CSS terakhir dimuat bukan selalu pemenang.

**Masalah:** shadow CTA tidak sewarna; label/nilai kecil; close hit area; fokus beberapa location/trip-mode di style.css dihapus. Screenshot open setelah search menunjukkan header fixed menutupi bagian atas shortcut (y142 vs header172); ini observasi saat programmatic scroll/focus, bukan bukti bug semua scroll.

**Usulan tepat:** pertahankan panel r20/padding16, field r14, CTA teal/white48 dengan shadow netral tunggal. Nilai field16/24, label12/16, heading18/24; close hit area44 dengan glyph20, panel heading tetap menyediakan ruang judul panjang. Jangan mengganti struktur input, native select/date, IDs, validator, state retention, CTA action atau format harga. Jangan menghapus swap sebagai tindakan styling dalam tugas ini.

**Default/focus/filled:** label stabil; outline2 primary pada wrapper ketika input focus-visible; nilai penuh atau wrap label, bukan clip data. **Selected trip mode:** underline2 + weight600, border-box/tinggi sama; jangan ubah mode atau enable state. **Disabled:** surface neutral, teks muted terbaca, tanpa hover/shadow aktif; jangan menambahkan disabled ke aksi yang kini tersedia. **Invalid:** border `#B42318`, surface `#FEF3F2`, pesan 12/18 dekat field; bukan hanya orange outline existing. **Loading:** hanya bila state existing mengeluarkannya, spinner16 + label existing, lebar48 stabil, tidak mensimulasikan request. **Collapsed/reopened:** tidak reset field, tidak buat form kedua.

**Alasan:** hierarchy form jelas dan familiar, kontras CTA aman. **Risiko H untuk focus/field wrappers, M untuk token; T+K:** wajib menjaga event/state/ARIA dan error placement. Header occlusion perlu acceptance visual bersama pemilik interaksi; Agent 2 hanya menspesifikasikan target: fokus/control aktif harus terlihat utuh, tanpa menambah scroll engine baru.

### 4.5 Favorite cards dan expanded grid

**Existing:** dua card foto, border1/r16, frame6px, foto126/r11, judul11.5, lokasi9, harga12 orange, unit sekitar9, heart30/glyph15. Default heart sudah filled orange; selected hanya menjadi orange lebih gelap. Overlay `.route-select` inset0 z1, favorite z2. Expanded memakai dataset8 item existing.

**Masalah:** hierarki judul/harga terlalu kecil; default vs selected lemah; di320 nama terpotong karena nowrap + overflow hidden. Label “Mulai dari” disembunyikan untuk kartu rute biasa; jangan menebak harga final dari angka yang tampil.

**Usulan tepat:** tetap dua kolom; title14/20 weight600, maksimum dua baris dengan tinggi minimum40 tetapi boleh bertambah agar nama lengkap terbaca; min-width0 pada text region, nama panjang wrap. Price14/20 weight700 dengan accent-text gelap, unit12/16 muted. Tampilkan label “Mulai dari”12/16 dari konten existing, tanpa mengubah nilai/satuan/data. Foto tetap126 dan object-fit cover. Body10–12, gap8; card height auto, pasangan satu baris grid stretch sama tinggi.

**Default favorite:** glyph outline primary/ink; **selected:** filled primary + `aria-pressed` existing; gunakan glyph existing, bukan library. Target44×44 di area bawah yang khusus disediakan, tidak menutupi harga/unit dan tidak bertabrakan overlay route-select. **Focus:** ring yang jelas di card untuk route target dan ring tersendiri pada heart. **Pressed:** background soft pada target, tanpa menggeser card. **Expanded:** gap12, semua8 item muat, tidak mengubah dataset atau menambah card dummy. **Image fail:** pertahankan rasio/alt existing, surface neutral; jangan mengarang foto/fakta.

**Alasan:** informasi beli terbaca dan state favorit dapat dibedakan. **Risiko H; K+T:** layering dua target dan layout harga bisa menyebabkan salah klik; pengujian hit area sangat penting. Pada320 jangan memaksa tinggi lama; jangan mengganti menjadi satu kolom tanpa keputusan master.

### 4.6 Popular route rows

**Existing:** card full-width96px, padding7, foto106px di kiri, gap12, title12, price10.5 orange; foto dekoratif CSS berbeda per row, label “Mulai dari” sudah ada.

**Usulan:** pertahankan image-left; title14/20 semibold, price14/20 bold, unit12/16, padding8–12, radius16, gap12. Tinggi min96/auto, foto104×80 minimum dengan crop yang sama; title boleh dua baris. Pada320 pastikan text minmax(0,1fr), tidak mengorbankan label harga/satuan. Satu row tetap satu target existing; jangan menambah CTA dekoratif kedua.

**States:** default border1; focus ring2; pressed primary-soft; disabled/loading tidak dibuat jika tidak ada pada source. **Alasan:** route rows menjadi alternatif yang lebih mudah dipindai dari compact grid. **Risiko M; K+T:** kenaikan font dapat menaikkan row; mapping route/price handler tidak boleh diubah.

### 4.7 Heading section dan “Lihat semua”

**Existing:** H2 19/23.75 weight700 tracking−.5; action11 orange/min-height30, subtitle hidden. Destination action hanya chevron.

**Usulan:** H2 20/26 weight700 tracking−.2 (bukan otomatis23), action12/18 semibold accent-text, hit area44 dengan visual tetap compact, gap heading/content12. Hindari fixed height heading; align-center saat satu baris, start saat dua baris. Chevron20 dalam target44 dan nama aksesibel existing. Jangan mengubah H1/H2/H3/isi/tautan demi typography.

**States:** focus2, pressed soft; expand/collapse label dan `aria-expanded` mengikuti existing. **Alasan:** section penting terbaca tanpa mengalahkan booking; target mudah disentuh. **Risiko M; T+K:** heading+action dapat berdesakan pada320/EN; uji wrapping, tidak boleh mengurangi font ke9px.

### 4.8 Inspiration banner, destinations, reviews dan footer/bahasa

**Inspiration existing:** split text/foto, radius18, eyebrow8, title18, link10 orange, photo mask gradient. **Usulan:** pertahankan struktur/foto/mask; eyebrow11/16 tracking.5, title18/24, action12/18 gelap; padding16. Tinggi auto/min138; jangan menambah badge/promo. Default/focus/pressed mengikuti target existing. Risiko M; K+T, teks EN bisa menambah tinggi.

**Destinations existing:** horizontal rail46%, gap10, height168/r16, title12/meta10 di overlay gradient. Peek kartu berikutnya memang petunjuk scroll, bukan page overflow. **Usulan:** pertahankan rail/height/photo, title14/20 dan meta12/16; scrim bawah hitam transparan sekitar65% bila pengukuran foto paling terang membutuhkan, tidak menint seluruh foto. Padding12; akhir rail harus punya inset16. Focus ring inset2 agar tidak diclip. Risiko M; K+T, kontras pada tiap foto perlu dicek; tidak mengubah destination link.

**Reviews existing:** white/r18/padding16/min178, title/body12, avatar44, stars orange, metadata kecil; rail satu card viewport. **Usulan:** body14/21, title14/20 semibold, meta12/18 muted; avatar44 tetap, like glyph18 dalam44; card auto, gap12. Default like outline; selected memakai pressed state existing, bukan count baru. Empty/loading hanya tampil bila data existing menyatakan; jangan skeleton/testimonial/rating baru. Jangan mengoreksi tanggal “notifikasi” menjadi tanggal review terverifikasi. Risiko M; T+K: teks panjang/like/rail indicator perlu ruang, tidak mengubah data ulasan.

**Bahasa/footer existing:** tombol bahasa11/min34; ada whitespace sebelum nav. **Usulan:**12/18 dan hit44, jaga minimal16px clear space di atas nav+safe-area; link/legal yang ada tidak dihapus atau disembunyikan untuk memendekkan halaman. Risiko L–M; T+K. Tidak redesign footer LOCKED atau memunculkan floating WA lagi.

### 4.9 Bottom navigation

**Existing actual:** empat slot sama, Beranda/Favorit/Perjalanan/Akun; Jelajah hidden. Nav70px + safe-area, padding7px14px, gap6; glyph21, label9/9, target>=44. Home soft-teal pill; inactive `#9BA5A9`; trips dialog; Favorit/Akun feedback unavailable tetap ada. Source punya beberapa rule pseudo active; actual tidak boleh diasumsikan dari rule pertama.

**Masalah:** label9 terlalu kecil, inactive terlalu pucat; banyak shadow nav terasa berat; state unavailable jangan menyerupai fitur aktif dengan data fiktif.

**Usulan visual saja untuk master:** pertahankan empat slot/order/pill/routing; label11/14 weight600, glyph22 konsisten, gap4, target>=44, nav min70+safe-area dan auto bila text scaling membutuhkan. Inactive muted gelap, active primary+soft; satu pill saja. Nav shadow soft tunggal, border1 top. Perjalanan tetap glyph existing (jangan mengganti ke ikon/fitur baru karena PRD lama).

**States:** Home active satu surface; Trips active ketika dialog terbuka, restored sesudah close sesuai existing; Favorit/Akun mempertahankan feedback existing dan tidak dimodelkan sebagai halaman aktif. Focus ring inset2, pressed soft tanpa bounce, reduced motion tidak memakai transform/transisi nonesensial. Jangan menambahkan badge, booking count, login atau tab kelima.

**Alasan:** teks bisa dibaca tanpa mengganti struktur LOCKED terbaru. **Risiko M–H; T+K, baseline terkunci:** perubahan height/pill/text harus disintesis dahulu; cek nav terhadap modal/keyboard/footer. Area bawah konten minimum `nav actual height + safe-area +16px`, bukan hardcode70 ketika scaling menambah tinggi.

## 5. State lintas komponen dan batas ownership

| State/surface | Spesifikasi visual untuk master | Batas dan risiko |
|---|---|---|
| Focus keyboard | Ring2 primary-strong, offset2; inset bila container clip; tidak menghapus focus dari wrapper field | Audit location/trip-mode yang punya outline:none. Tidak mengganti event/focus orchestration. |
| Pressed | Soft surface/warna lebih tegas; geometri tetap; tanpa bounce | Tidak menambahkan action atau state baru. |
| Selected | Warna + weight/border/filled glyph; ukuran luar stabil | Tetap memakai aria/state existing. |
| Disabled/unavailable | Muted terbaca, tidak hanya opacity; feedback unavailable tetap terlihat | Tidak enable fitur Favorit/Akun, tidak menambah auth. |
| Error | Border error + teks12/18; layout mengalir, tidak menimpa CTA | Pertahankan wording/validator existing. |
| Empty results | Heading16/24, body14/21, satu aksi existing; surface16/padding16 | Tidak membuat hasil/kursi kosong palsu. Styling saja, hasil/UX milik scope lain. |
| Loading | Spinner16, label stabil, kontrol48; tidak shifting | Hanya state yang sudah ada; tidak mengganti timing/request. |
| Dropdown/calendar/time picker | Surface putih/r14/border1/shadow overlay, option min44, text16/24, selected soft+weight | Native controls tetap native. Jangan membuat picker baru; geometry dimiliki komponen existing, validasi jadwal tidak berubah. |
| Dialog/check booking | Radius20, gutter16, heading18/24, body14/21, field16/24, close44; error tak tertutup | Modal harus di atas nav. Tidak mengubah trapping/focus-return/booking lookup. |
| Browser/standalone | Satu sistem visual, nav dan background selaras, padding safe-area | Tidak menyunting manifest/SW/viewport/scroll engine; validasi device adalah dependensi, bukan klaim selesai Agent 4. |
| Reduced motion | State akhir langsung, tanpa bounce/scale atau animasi nonesensial | CSS reference memuat transition nav setelah rule reduce di style.css; kandidat override reduce lokal perlu diverifikasi, jangan anggap sudah terproteksi. |

## 6. Acceptance untuk usulan sebelum master dikunci

Pada 360/390/412 dan tambahan320/430, review default, panel terbuka, setiap layanan, field filled/focus/invalid, ID/EN, favorite off/on, expanded8 cards, lower sections, trips dialog dan unavailable feedback. Bukti harus menunjukkan judul rute lengkap, harga/satuan/“Mulai dari” tidak bertabrakan heart, link/action44, ring terlihat, nav label terbaca, tidak ada page overflow; rail destination/review boleh scroll internal. Ulangi dengan text scaling200% dan text panjang tanpa memaksa screenshot height lama.

Device/PWA acceptance hanya dependensi visual: CTA/focus harus berada di atas keyboard/nav; dialog/kalender tidak clip; toolbar collapse/expand dan safe-area tidak membuka putih; landscape mempertahankan konten. WebKit/iPhone dan Android Chrome nyata dibutuhkan sebelum FINAL; laporan ini tidak mengklaim pengujian itu. Tidak menduplikasi laporan interaksi, PWA atau regression agent lain.

Semua perubahan implementasi kelak harus dibatasi mobile max767 dan component scope yang tepat. Hindari mengganti global `--red` di luar breakpoint, selector desktop atau markup shared. Bandingkan desktop768/1024/1440 sebelum/sesudah sebagai regression gate; karena laporan ini tidak mengubah kode, tidak ada perubahan desktop yang diajukan.

## 7. Hasil dan serah terima

Deliverable Agent 2 adalah laporan ini: audit baseline, matrix viewport, existing/problem/rekomendasi/alasan/risiko/level per komponen, state visual, konflik baseline, batas bukti, acceptance dan token usulan. Usulan prioritas bagi sintesis: (1) kontras teks/ikon, (2) type scale card/meta, (3) wrap rute320, (4) hit area dan focus, (5) normalisasi shadow/border. Tidak menambah fitur, mengubah desain LOCKED atau mengeksekusi perubahan produksi.

Token berikut **usulan mobile untuk master design, belum canonical/approved**. Token pada header/selector/nav adalah referensi aksesibilitas dan konsistensi; tidak membuka LOCK. Seluruh nilai dipakai hanya <=767px; tidak mengekspor token ke desktop.

## 8. Proposed token table

| Kategori | Token / peran | Nilai usulan | Pemakaian / guard |
|---|---|---|---|
| Color | primary | `#0B7285` | Identitas V2, CTA teal/white dan state active |
| Color | primary-strong / pressed | `#075968` / `#064D59` | Focus/pressed, bukan primary baru |
| Color | primary-soft | `#E6F5F7` | Selected tile/nav, satu active surface |
| Color | accent-surface | `#FF8A4C` | Orange control/dekorasi; bukan teks kecil di putih |
| Color | accent-text | `#B54708` | Harga/link orange gelap; kontras putih sekitar5.43:1 |
| Color | ink | `#20272D` | Judul/body, ikon pada orange |
| Color | muted-text | `#52636B` | Meta, unit, nav inactive, trigger search |
| Color | paper / surface | `#F5F7F8` / `#FFFFFF` | Pertahankan shell V2 |
| Color | line / control-line | `#E6ECEE` / `#71848B` | Surface border halus; control-line bila batas perlu kontras3:1 terhadap putih |
| Color | error / error-soft | `#B42318` / `#FEF3F2` | Error yang sudah ada, disertai pesan |
| Typography | font family | Inter, system-ui, sans-serif | Reuse font existing, tanpa dependency |
| Typography | section title | 20/26px,700, tracking−.2px | H2 visual; semantik tetap |
| Typography | panel title / banner title | 18/24px,600–700 | Tidak memaksakan tinggi tetap |
| Typography | card title / price | 14/20px,600 /700 | Wrap, tidak ellipsis data rute |
| Typography | body | 14/21px,400 | Review/deskripsi |
| Typography | field value / option | 16/24px,400–500 | Nilai utama mobile; native control tetap |
| Typography | label / meta / link | 12/16–18px,400–600 | Unit/hint/action, tidak9px |
| Typography | shortcut label / nav label | 11/14px,600 | Kandidat master untuk baseline terkunci; multiline |
| Typography | CTA | 15/20px,600 | Cari Tiket/Cari Mobil existing |
| Spacing | base scale | 4,8,12,16,20,24,32px | Tidak membuat banyak offset per-card |
| Spacing | section / heading-content | 24 /12px | Pertahankan urutan V2 |
| Spacing | card content / field group | 12–16 /12px | Favorite body10–12 bila diperlukan |
| Radii | field / search / CTA | 14px | Baseline V2, bukan pill tambahan |
| Radii | card / large panel | 16 /20px | Banner/review dapat dinormalisasi16 setelah approval |
| Radii | shortcut / active nav | 16px | Preserve baseline geometry |
| Radii | header bottom | 28px | Preserve; tidak redesign |
| Borders | surface / selected / focus | 1px line /2px inset primary /2px primary-strong | Border-box konstan; ring offset2 atau inset |
| Shadows | surface | `0 4px 16px rgba(20,63,72,.06)` | Satu shadow card; boleh none bila border cukup |
| Shadows | overlay/panel | `0 10px 30px rgba(20,63,72,.08)` | Reuse app-shadow, tanpa tumpukan |
| Shadows | bottom nav | `0 -4px 16px rgba(20,63,72,.06)` | Divider1; bukan shadow berat |
| Icon sizes | general / nav / field | 20 /22 /20px | Optical bounds konsisten, reuse SVG |
| Icon sizes | service / small metadata | 24–28 /14–16px | Tile62×58 dipertahankan; tidak mengganti aset |
| Control heights | main / secondary / hit target | 48 /44 /minimum44px | Close/favorite/actions membutuhkan area khusus tanpa overlap |
| Control heights | nav | min70px + safe-area | Auto saat text scaling; empat target sama |
| Page gutters | all320–430 | 16px | Width content = viewport−32 |
| Card gaps | grid / list / rail | 12 /12 /12px | Dua favorite columns tetap; width159→158px di360 bila gap berubah10→12 |
