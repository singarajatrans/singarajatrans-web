# Agent 4 — PWA / Device Experience

Tanggal: 27 Oktober 2026 (Asia/Makassar). Status: audit dan spesifikasi selesai; **belum FINAL/LOCKED dan belum lolos device acceptance**.

## Dasar, ownership, dan batas bukti

Baseline lokal: `055c204c1a7d3e9bb60dd3916c18269786bcd520`, remote `singarajatrans/singarajatrans-web`. Mengikuti `AGENTS.md`, `docs/agents/04-pwa-experience.md`, `docs/home-mobile-v2.md`, `DESIGN.md`, dan constraint SEO/PWA PRD. Repository lama pada skill bukan sumber proyek ini. Tidak ada fetch/push/deploy; audit merupakan snapshot checkout, bukan sertifikasi situs live terbaru.

Hanya laporan ini ditulis. Tidak mengubah desktop >=768px, produksi HTML/CSS/JS, manifest, service worker, tests, workflow, report agent lain, atau master design. Tidak mengubah booking, tarif, jadwal, WhatsApp, backend/API/database/auth/RBAC/routing. Label “Implemented baseline” pada master existing tidak membatalkan larangan perubahan produksi dalam aturan sprint.

Metode: inspeksi source dan uji lokal Python HTTP server + Playwright dengan Chromium sistem `/usr/bin/chromium`, mobile viewport/touch. Bukan Chrome Android fisik. Browser WebKit tidak terpasang; tidak menambah dependency atau mengunduh browser. Installed PWA, Safari toolbar, keyboard OS, notch, OS splash dan lifecycle fisik belum diuji. Assertion dan test existing dibaca sebagai referensi, bukan diklaim telah lulus. Tidak membuat screenshot/test artifact dalam repository.

## Hasil audit current implementation

| Area | Bukti source / observasi | Penilaian |
|---|---|---|
| Layout browser Chromium | 320/360/390/412/430 x 844, mobile/touch: tidak ada horizontal overflow; bottom nav berakhir pada y=844; theme setelah JS `#0b7285`; body fixed | PASS terbatas pada emulasi browser ini |
| Manifest | `id`, `start_url`, `scope` semuanya `./`; `display: standalone`; theme `#0b7285`, background `#f5f7f8`; icons 192/512/maskable | Selaras warna Home terbaru; installability aktual belum terverifikasi |
| Icon | Pillow memastikan PNG any 192x192, any 512x512, maskable 512x512; semuanya RGBA | Dimensi benar; dimensi/purpose belum membuktikan opaque background, crop aman, atau keterbacaan launcher |
| iOS metadata | Apple capable/title/default status bar; touch icon memakai PNG 192 | Fondasi ada; default status bar OS tidak menjamin warna sea blue |
| Viewport / safe area | `index.html` tidak memiliki `viewport-fit=cover`; offline HTML memilikinya. CSS header memakai inset atas; nav/footer memakai inset bawah | Dukungan parsial; inset aktual tidak bisa diasumsikan bekerja dari deklarasi CSS saja |
| Standalone | `assets/mobile-reference.css` max-width 767 + display-mode standalone mengatur overscroll dan padding main | Tidak ada shell kedua; jalur iOS navigator.standalone belum ditangani eksplisit. Dampak perlu verifikasi fisik |
| Scroll | `assets/booking.js:1–4` memilih document scroller pada iOS; lainnya memakai fixed body dari style.css. Nav mengenali kedua pemilik scroll | Jangan menyatukan scroller secara spekulatif; Android keyboard/fixed-body masih berisiko |
| Keyboard / resize | `100dvh` dan dialog max-height tersedia; pencarian melakukan scrollIntoView + focus; tidak ditemukan visualViewport handling pada script aktif yang diaudit | dvh bukan bukti input/CTA aman terhadap keyboard; butuh device test |
| Loading / registration | pwa.js register saat load, error ditelan; tidak ada affordance install/update di script tersebut | Website tidak diblokir registration; kesiapan offline tidak boleh dijanjikan |
| Offline navigation | Setelah SW ready + reload pada 390px, offline reload menampilkan “Koneksi sedang offline” | PASS fallback untuk kunjungan yang sudah memiliki SW/cache |
| Network loss halaman terbuka | Setelah context offline: navigator.onLine false, harga populer tetap ada; pesan offline tidak muncul | GAP: tidak ada penanda ketidakmutakhiran. Ini harga publikasi, bukan bukti cache live booking |
| Offline fallback UI | HTML mandiri tanpa booking/harga/status; tombol reload; warna sesuai shell | Aman secara isi; padding 24px tanpa inset, min-height 100vh; white/orange CTA perlu perbaikan kontras |
| Service worker | Navigasi fetch lalu fallback offline; non-GET/cross-origin/non-asset dilewatkan; gambar cache-first, script/style/font network-first lalu cache | Tidak menyimpan HTML navigasi ke Cache Storage, tetapi aturan aset terlalu luas untuk klaim static-only safety |
| Update / cache lifecycle | skipWaiting + clients.claim langsung, cache name v1, purge prefix singaraja-static- saja | Risiko aset lintas versi pada sesi aktif; cache lain dan HTTP cache tidak tercakup |

Warna terbaru sea blue/orange mengesampingkan arahan mobile merah/header lama dalam PRD. Constraint SEO, semantik, dan business truth PRD tetap berlaku. `index.html` memiliki noindex/nofollow pada baseline; dicatat sebagai konteks staging, bukan diubah atau dinyatakan sebagai masalah produksi oleh Agent 4.

## 1. Design requirements

### Shell browser dan installed

- Satu basis mobile <=767px: struktur Home, layanan dan entry booking sama pada browser dan installed. Tidak menambah onboarding, login, splash buatan, mockup perangkat, navigasi kedua, atau konten operasional baru.
- Primary `#0B7285`, strong `#075968`, soft `#E6F5F7`, accent `#FF8A4C`, background `#F5F7F8`, surface putih. Insets memakai warna shell yang bersebelahan; OS chrome tetap keputusan platform. Jangan memaksa status/navigation bar dengan janji hasil lintas OS.
- Android Chrome: gunakan chrome browser normal; installed standalone tanpa toolbar browser. iPhone Safari: toolbar atas/bawah dapat berubah; installed: status bar/home indicator tetap dihormati. Jangan menggambar replika chrome OS.
- Gutter dasar 16px; ruang aman kiri/kanan minimal max(16px, inset), termasuk landscape. Header action di bawah top inset; bottom nav menambah bottom inset hanya sekali. Konten terakhir dan tombol dialog tetap bisa discroll di atas nav/home indicator. Jangan menambahkan inset pada semua ancestor sekaligus.
- Portrait adalah target komposisi, tanpa orientation lock. Landscape <=767px tetap usable; saat rotasi mencapai >=768px, tampilkan baseline desktop yang terkunci, bukan memaksa layout mobile.
- Target interaksi >=44x44 CSS px, focus terlihat, teks field >=16px untuk menghindari auto zoom iOS; pinch zoom tetap tersedia. Loading/reconnect tidak memindahkan fokus atau menggeser seluruh halaman. Reduced motion menonaktifkan gerakan dekoratif/non-esensial.
- Offline CTA orange/putih saat ini sekitar 2,3:1, tidak memenuhi 4,5:1 untuk teks normal. Pada implementasi nanti gunakan teks gelap yang teruji atau warna tombol accessible dari token yang disetujui Agent 1/2; bukan redesign sistem warna oleh Agent 4.

### Keyboard, viewport dan scroll

- Pertahankan satu pemilik scroll per platform; tidak membuat body dan document sama-sama bisa scroll. Native document scroll iOS yang sudah ada tetap acuan. Tidak memakai preventDefault touchmove global atau tinggi layar hardcoded.
- Saat keyboard dibuka: field aktif, label/error dan CTA dialog dapat dicapai; nav tidak menumpuk input/suggestion picker. Pilihan desain: sembunyikan nav mobile selama keyboard benar-benar mengurangi visual viewport, tampilkan lagi setelah keyboard tutup; jangan bergantung pada focus saja atau mengubah state form. Harus disintesis Agent 1 bersama Agent 3 sebelum implementasi.
- Keyboard tutup/rotasi harus memulihkan tinggi shell tanpa blank gap atau lompat ke Home. Gunakan native resize/dvh dahulu; visualViewport hanya jika bug terukur memerlukannya, dengan cleanup dan tanpa scroll berulang.
- Dropdown, kalender, time picker dan modal harus bisa dibuka/ditutup pada keyboard aktif, tidak terpotong header/nav, serta mempertahankan focus-return existing. Audit behavior booking rinci tetap milik Agent 3.
- Kembali browser dari halaman eksternal dan pageshow/bfcache memulihkan posisi/field existing; tidak reset scrollRestoration global. Return ke Home lewat tombol Home mengikuti behavior existing. Cold start mengikuti start_url existing, tidak memulihkan atau mempersist status transaksi.
- Resume setelah background/offline tidak boleh memberi kesan status lama masih live; tampilkan kondisi koneksi dan minta refresh eksplisit untuk informasi sensitif tanpa menghapus input pengguna.

### State yang harus ditampilkan

| State | Presentasi / recovery | Batas kebenaran |
|---|---|---|
| Cold load online | Shell/content nyata sesegera mungkin; placeholder netral hanya untuk area yang benar-benar loading; tidak mengunci seluruh halaman | Tanpa harga/status dummy |
| Loading operasi existing | Label progres singkat, cegah double action sesuai perilaku existing; error mengembalikan kontrol | Tidak menyatakan berhasil sebelum hasil sah |
| Offline sebelum buka, cache tersedia | Fallback informatif + “Coba lagi”, safe-area dan fokus/tap accessible | Tanpa booking/payment/availability/status/harga |
| Offline pertama kali / SW gagal | Browser mungkin menampilkan error native | Jangan menjanjikan fallback yang belum pernah tersimpan |
| Koneksi putus saat halaman terbuka | Banner mobile nonmodal role=status: “Koneksi terputus. Informasi perjalanan belum dapat diperbarui.” + “Coba lagi”; tidak menutup form atau merebut fokus | Harga publikasi diberi konteks bukan real-time; area live tidak boleh tetap ditampilkan sebagai terverifikasi |
| Online event / retry | “Memeriksa koneksi…” hanya saat request benar-benar berjalan, lalu hasil/error yang terbukti; jangan auto-reload saat user mengisi form | online event bukan bukti server tersedia; jangan auto-submit/ulang transaksi |
| Request timeout/server error meski online | Pesan gagal terpisah dari “offline”, retry eksplisit | HTTP 4xx/5xx bukan bukti perangkat offline; tanpa fallback status sukses |
| Update tersedia | Pemberitahuan ringan; terapkan pada waktu aman/persetujuan reload, tanpa mereset draft | Tidak reload paksa saat input/WhatsApp review |

Status/banner harus tersedia dalam ID/EN mengikuti bahasa existing, sekali diumumkan per perubahan relevan. Copy di tabel adalah usulan presentasi; tidak menambah status bisnis baru. Bila pencegahan aksi offline memerlukan perubahan business logic, catat dependency untuk owner, jangan dilaksanakan dalam scope ini.

### Install, icon dan splash

- Instalasi opsional; website biasa sepenuhnya usable tanpa instalasi. Tidak tampil prompt saat form/modal aktif, tidak ada prompt pada setiap page load, tidak ada klaim “wajib install”.
- Android: tawarkan affordance ringan sesudah interaksi nontransaksional dan hanya jika beforeinstallprompt benar-benar tersedia; panggil prompt hanya dari tap. Dismissal dihormati; installed/appinstalled menyembunyikan ajakan. Jangan melakukan UA-only detection untuk menyimpulkan installable.
- Safari iPhone: bantuan kontekstual “Bagikan → Tambahkan ke Layar Utama” bila dukungan tersedia; OS/browser lain dapat punya langkah berbeda. Tidak menampilkan tombol prompt native palsu. Deteksi standalone juga memperhitungkan navigator.standalone pada platform yang mendukung.
- Gunakan identitas/aset resmi existing. Any icons 192/512 dan maskable 512 dipertahankan; safe zone maskable lingkaran radius 40% sisi canvas, logo penting di dalamnya; seluruh background opaque. Uji crop lingkaran/squircle, light/dark launcher. Apple icon existing diuji terlebih dahulu; buat varian 180 hanya bila dibutuhkan hasil QA, bukan sekadar menambah aset.
- Splash Android dihasilkan OS dari manifest/icon; iOS tidak dijanjikan identik dan dapat memerlukan treatment khusus platform. Jangan menambah kumpulan launch images atau splash JS sebelum ada kebutuhan terukur. Ukur cold/warm launch, tidak ada flash merah sebelum sea blue pada mobile, dan tidak ada white blank berkepanjangan. Status bar default tidak otomatis menerima theme-color.

## 2. Technical PWA requirements

### Cache safety wajib sebelum implementation dinyatakan aman

1. Terapkan allowlist aset presentasi immutable yang eksplisit, bukan hanya request.destination. Current image handler dapat menyimpan semua gambar same-origin, termasuk kemungkinan QR/tiket/receipt di masa depan; tidak terbukti ada endpoint sensitif semacam itu sekarang. Script `assets/core.js` memuat tarif/jadwal publikasi sehingga tidak boleh otomatis dianggap presentational shell yang aman dipakai offline.
2. Booking, payment, availability, live status, dokumen/tiket/QR personal, payload berisi PII, HTML navigasi dan API tidak boleh masuk Cache Storage atau persistent client storage oleh lapisan PWA. Lewatkan request credentialed/personalized/sensitif langsung ke network; jangan cache response no-store/private, redirected, error, atau URL/query sensitif. Denylist pertahanan tambahan, bukan pengganti allowlist.
3. Navigasi online mengambil halaman jaringan; offline hanya fallback informatif dedicated. Current fetch(request) masih mengikuti HTTP cache standar: **network-first SW bukan jaminan no stale HTTP response**. Kebutuhan cache mode dan HTTP/CDN headers untuk informasi sensitif adalah dependency implementasi lintas owner, bukan perubahan backend dari Agent 4. Offline.html tidak boleh dikirim sebagai sukses untuk API/data request.
4. Pisahkan cache aset versi rilis, fallback versi kompatibel, dan retirement cache. Jangan memasangkan HTML baru dengan script business-data lama karena network-first asset fallback. Jika aset kritis tak tersedia, gunakan state gagal aman, bukan menampilkan data operasional cache seolah mutakhir.
5. Cache write harus ditunggu dengan event.waitUntil atau mekanisme lifecycle setara; current put asinkron tidak ditunggu dan dapat terputus/menimbulkan rejection. Tangani quota/write failure tanpa merusak network response. Tetapkan batas jumlah/ukuran/umur aset untuk mencegah cache gambar tak terbatas.
6. Current skipWaiting/clients.claim langsung perlu strategi aktivasi aman. Jangan mengambil alih sesi form aktif dengan bundle campuran. Update prompt/deferred activation dan uji dua tab + rilis lama/baru wajib; tidak mempersist draft sensitif sebagai jalan pintas.
7. Hapus hanya cache milik aplikasi yang diketahui, bukan semua cache origin. Current purge prefix tidak menghapus cache lama bernama lain; inventaris browser storage deployment perlu dilakukan sebelum menyatakan tidak ada cache historis. Jangan menghapus storage favorit atau aplikasi lain.
8. Koneksi putus setelah data masuk DOM, bfcache, HTTP cache, dan memori adalah jalur stale di luar Cache Storage. Network-loss/resume harus menunjukkan ketidakmutakhiran dan tidak menyajikan status live lama sebagai sah; revalidasi memerlukan sumber existing yang benar. Tidak membuat polling/API baru.
9. Offline fallback harus tetap berguna ketika asset eksternal gagal; baseline HTML inline sudah memenuhi fondasi ini. Install addAll gagal berarti offline belum siap; jangan mengklaim “siap offline” hanya dari registration.

### Manifest / platform / regression

- Pertahankan id/start_url/scope relatif ke deployment path yang benar; uji root dan subpath, HTTPS, MIME manifest/JS, SW scope dan redirect origin. Jangan migrasi origin/domain atau memperluas scope.
- Evaluasi viewport-fit=cover setelah desain disetujui dengan top/bottom/left/right inset dan bukti fisik. Meta viewport global dapat memengaruhi desktop; perubahan nantinya wajib mendapat desktop regression >=768px. Tidak menonaktifkan zoom.
- Installed styling tetap max-width 767px; media display-mode + feature detection hanya untuk capability, bukan cabang booking atau konten terpisah. JavaScript gagal, SW ditolak, private browsing/storage eviction tetap memberi website biasa yang usable.
- CSS theme mobile harus benar sedini mungkin tanpa mengubah theme desktop `#c85759`; strategi head/meta media nanti diverifikasi startup, bukan mengganti global token desktop.
- Tidak menambah framework, dependency, secret, client credential, background sync, periodic sync, push, atau persistence transaksi. Tidak queue/replay POST saat reconnect.
- Konten/link semantik tetap ada dan dapat dirayapi; tidak mengganti dokumen dengan app shell kosong. Ukur LCP/INP/CLS; tidak mengklaim peningkatan performa tanpa hasil ukur.

## 3. Later implementation items dan acceptance handoff

Semua item berikut adalah backlog setelah master design disetujui, bukan perubahan yang dilakukan laporan ini.

| Prioritas | Item | Acceptance / pemilik dependency |
|---|---|---|
| P1 | Allowlist cache + non-cache data bisnis + update lifecycle | Offline Cache Storage tidak berisi HTML/API/PII/status/QR/booking; aset rilis konsisten; frontend implementation owner, koordinasi owner data bila perlu |
| P1 | Network-loss dan resume/bfcache state | Putus koneksi di Home/form/review/check: banner jelas, input tidak hilang, tidak ada stale live status/auto-submit; sinkron Agent 3 |
| P1 | Safe-area/keyboard | Input, tombol tutup/retry/CTA terakhir terlihat atau dapat discroll pada notch + keyboard, portrait/landscape; tidak ada dua scroll owner |
| P2 | Theme startup, icon maskable, splash, install affordance | Tidak flash warna mobile lama; launcher crop aman; install opsional dan dismiss dihormati; real-device proof |
| P2 | Offline UI accessibility dan quota/error hardening | Retry dapat diakses keyboard/touch; kontras AA; cache failure tidak memblokir website; fallback aman pada subpath |

### Matriks QA dan status verifikasi

| Lingkungan | Cakupan wajib | Status audit ini |
|---|---|---|
| Chromium sistem browser, mobile/touch 320/360/390/412/430 x844 | Overflow, bottom nav, theme | PASS terbatas; bukan device Chrome Android |
| Chromium 390 x844 controlled SW | Online → offline pada dokumen terbuka → reload | Reload fallback PASS; network-loss indicator GAP teramati |
| Android Chrome fisik browser | Toolbar collapse/expand, keyboard, scroll cepat/balik arah, dialog/calendar/time picker, landscape | PENDING perangkat |
| Android installed PWA | Install/dismiss, cold/warm splash, launcher mask, standalone, Back, resume, update dua tab | PENDING perangkat/install |
| iPhone Safari/WebKit | Document scroll, toolbar, safe-area, focus/keyboard resize, back/bfcache, rotation | Source reviewed; runtime WebKit PENDING executable, physical Safari PENDING perangkat |
| iPhone installed Home Screen | navigator.standalone, status bar/home indicator, keyboard, resume/network loss, launch | PENDING perangkat/install |
| Desktop >=768px | Tidak ada perubahan file produksi; implementasi nanti visual regression 768/1024/1440 | Preserved by report-only diff; browser comparison tidak dijalankan |

Setiap platform mobile harus mencakup lebar utama 360/390/412 serta guard 320/430 melalui resize/emulasi; perangkat fisik dipilih sesuai lebar tersedia, tidak perlu mengklaim semua lebar berasal dari perangkat asli. Ulangi dengan reduced motion, zoom/text enlargement, ID/EN, storage denied/evicted, pertama kali offline, cache terisi offline, koneksi lambat/timeout, server error, serta app background lalu resume. Gunakan data uji nonpersonal; jangan melakukan transaksi nyata.

Gate cache detail: kunjungi navigasi dengan query; pastikan tidak dicache; probe request API/non-GET/personalized image agar tidak ditulis; inspeksi seluruh cache milik aplikasi; simulate upgrade SW saat form aktif dan dua tab; pastikan retry berulang offline tetap informatif; setelah reconnect tidak ada replay; fallback tidak mengandung harga/status. HTTP cache dan bfcache diuji terpisah. Pembuktian runtime kontrol sensitif yang tidak ada pada baseline tidak boleh direkayasa menjadi klaim fitur aktif.

## 4. Explicitly out of scope

- Implementasi produksi apa pun sebelum master approval, termasuk manifest/SW/meta viewport/tests/workflows.
- Desktop/tablet >=768px, redesign UI sistem/kartu/header milik Agent 2, urutan/validasi/business flow booking milik Agent 3, synthesis Agent 1, dan full visual regression Agent 5.
- Backend/API/database/auth/RBAC, payment gateway, fare/schedule/availability engine, routing/domain migration, login/onboarding, dashboard/driver, notification/push dan background booking.
- Mengubah harga/status/content truth, cache transaksi, secrets/client credentials, auto resend booking, atau klaim offline booking berfungsi.
- Mengubah robots/noindex/canonical atau menjanjikan installability, device QA, deploy sukses, dan performa tanpa bukti.

## Handoff

Output Agent 4 lengkap untuk synthesis: kebutuhan desain, persyaratan PWA teknis, backlog implementasi, batas scope, temuan dengan bukti, dan gate QA. Risiko cache safety/network-loss dan pengujian fisik tetap terbuka; laporan selesai tidak berarti aplikasi PWA telah diperbaiki atau siap FINAL/LOCKED.
