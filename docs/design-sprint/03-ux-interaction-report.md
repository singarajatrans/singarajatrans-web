# Agent 3 — UX / Interaction Report

Tanggal: 27 Oktober 2026 (WITA). Status: audit dan spesifikasi desain selesai; bukan implementasi atau desain FINAL/LOCKED.

## Dasar audit dan batas ownership

Dibaca: `AGENTS.md`, `docs/agents/03-ux-interaction.md`, `docs/home-mobile-v2.md`, `DESIGN.md`, `PRD-Design-Singaraja-Trans.md`, serta master desain baseline. Repo lokal: `singarajatrans/singarajatrans-web`, branch `work`, HEAD `055c204c1a7d3e9bb60dd3916c18269786bcd520`. Laporan mengaudit checkout ini; tidak mengklaim sinkronisasi remote atau verifikasi live.

Sumber bukti: `index.html:123–153` (form), `index.html:176–185` (hasil), dialog di akhir HTML; `assets/booking.js` (setService, searchState/searchParams, restoreSearchState, submit, renderResults, dialog, translate); `assets/mobile-home-v2.js` (open/close dan entry point); `assets/mobile-bottom-nav.js`; `assets/ui.js`; cascade `assets/style.css` dan stylesheet aktif `assets/mobile-reference.css`; dataset/aturan murni `assets/core.js`. `assets/app.js`, header animasi lama dan stylesheet V2 lama tidak dijadikan baseline aktif.

Hanya file laporan ini menjadi perubahan repo. Desktop **>=768px** terkunci, termasuk tablet. Tidak mengubah produksi, tes, routing, API, backend, database, auth/RBAC, tarif, jadwal, geolokasi, WhatsApp, atau booking business logic. Rekomendasi di bawah untuk master desain Agent 1 setelah sintesis; tidak dianggap fitur yang sudah diimplementasikan.

Prioritas dokumen: arahan 27 Oktober Home sea-blue/orange, empat shortcut, bottom nav **Beranda → Favorit → Perjalanan → Akun** menggantikan header/carousel merah dan lima slot nav PRD lama. Master desain baseline bukan persetujuan otomatis untuk mengimplementasikan rekomendasi sprint. Warna/geometri final milik Agent 2; perangkat/PWA milik Agent 4; sign-off visual/regression milik Agent 5.

## 1. Temuan dan primary user flow yang direkomendasikan

### Temuan prioritas

| ID / prioritas | Bukti dan konsekuensi UX | Rekomendasi desain / kriteria selesai |
|---|---|---|
| UX-01 / P1 | Radio Pulang Pergi membuka tanggal kembali, tetapi searchState/searchParams hanya membawa service/from/to/date/time/passengers. Browser membuktikan hasil tetap sekali jalan. `novalidate` membuat required return-date bukan pengaman submit. | Jangan menjanjikan perjalanan pulang pergi. Master desain perlu menetapkan affordance mobile sebagai belum tersedia + penjelasan sekali jalan, tanpa menambah engine pulang pergi. Pertahankan engine; jangan membuat harga/jadwal pulang. Ini keputusan produk untuk Agent 1, belum diterapkan. |
| UX-02 / P1 | `.passenger-field` disembunyikan pada mobile; nilai default 1 tetap dikirim. Search hasil bisa memakai nilai query yang pengguna tidak melihat. Shuttle `.time-field` juga tersembunyi meskipun filter waktu disimpan di URL. | Tampilkan selector jumlah penumpang existing dan filter waktu Shuttle existing yang ringkas di form mobile. Default tidak berubah. Ringkasan hasil menyebut penumpang dan waktu/filter aktif. Tidak menambah data/aturan tarif. |
| UX-03 / P1 | Submit invalid memberi alert umum + field-invalid, tetapi fokus tetap pada Cari. UI helper tidak memberi aria-invalid atau error per field. Field berisi nilai dapat kehilangan marker invalid walau pasangan lokasi masih salah. | Pertahankan urutan/rule validasi; hubungkan pesan spesifik dengan field, fokus satu kali ke field invalid pertama; bersihkan error hanya setelah rule terkait terpenuhi. |
| UX-04 / P1 | CSS terakhir menghapus outline/ring lokasi dan tanggal; close pencarian berukuran 34×34px. | Focus-visible kontras dan area sentuh close >=44×44px tanpa memperbesar ikon. Uji kontrol native dan keyboard eksternal. Detail token diserahkan ke Agent 2. |
| UX-05 / P2 | Close selalu fokus ke `.reference-search`, termasuk setelah masuk melalui shortcut/rute/filter. Service shortcut membuka panel tetapi tidak memfokuskan field; motor tidak memiliki origin yang terlihat. | Catat pemicu valid terakhir selama halaman yang sama. Close kembali ke pemicu; entry point dengan intent mengarah ke field relevan, motor ke info/CTA existing. Jangan auto-submit atau membuka picker. |
| UX-06 / P2 | Favorite kartu tersimpan lokal, tetapi bottom Favorit memberi “belum tersedia”; storage gagal ditelan sehingga selected tampak tersimpan. | Jelaskan “disimpan di perangkat ini”; bedakan simpan kartu dengan halaman Favorit yang belum tersedia. Jangan mengaktifkan halaman atau sinkronisasi akun palsu. Bila gagal simpan, beri status jujur dan jangan menjanjikan persistensi. |
| UX-07 / P2 | Tombol oranye berikon slider sebenarnya membuka form; lokasi Bali dengan chevron bukan kontrol; bell membuka Cek Booking. | Nama aksesibel dan bantuan singkat menjelaskan “Buka pencarian”, “Cek booking”; hindari petunjuk lokasi yang tampak dapat diganti bila belum ada aksi. Tidak membuat filter/lokasi/notifikasi baru. |
| UX-08 / P2 | Bahasa berada di bagian bawah Home; beberapa aria-label mobile dan pesan unavailable nav tetap Indonesia saat EN. Navigasi hasil membuat language variabel kembali ID. | Pertahankan toggle ID/EN existing dan data form; lengkapi copy status/label dalam spesifikasi. Jangan menjanjikan bahasa persisten lintas navigasi sebelum diputuskan; hindari menambah routing bahasa. |
| UX-09 / P2 | Beberapa handler scroll masih hard-coded smooth; CSS reduced-motion saja tidak menjamin penghentian scroll imperatif. | Semua gerakan non-esensial mengikuti reduced motion, termasuk scroll dari tab, route, empty-edit dan navigasi. |
| UX-10 / P2 | Swap mobile ada pada checkout meskipun DESIGN/PRD melarangnya; beberapa kartu airport entry lewat setService('shuttle') karena dataset rute publikasi. | Catat konflik ke Agent 1; jangan menghapus handler atau mengubah pemetaan tarif. Spesifikasi tidak menambah swap baru. Bedakan Shuttle ke bandara dengan Airport Transfer privat melalui label layanan dan satuan harga yang benar. |

P1 = menghambat pemahaman/koreksi atau memberi ekspektasi layanan salah. P2 = friksi, konsistensi, atau risiko aksesibilitas. Tidak ada temuan yang menjadi izin mengubah business logic.

### Flow utama

1. **Home:** header pencarian dan empat shortcut langsung terlihat. Search umum membuka layanan aktif; kontrol oranye membuka form yang sama. Tidak ada search bebas kedua, onboarding, login, atau konfirmasi tambahan.
2. **Pilih layanan satu tap:** Shuttle, Airport Transfer, Sewa Mobil/Charter, Motor. Semua mendelegasikan ke kontrol dan state layanan existing. Copy Charter menjelaskan privat sekali jalan, bukan rental berdurasi. Motor menampilkan informasi belum tersedia dan kontak existing, tanpa form/hasil fiktif.
3. **Isi form sesuai konteks:** asal → tujuan → tanggal → waktu relevan → penumpang → Cari. Label tetap terlihat; default lokasi airport dan batas opsi tetap mengikuti existing. Pilih tanggal cepat Hari ini/Besok satu tap; tanggal lain memakai native date picker. Tidak otomatis membuka native picker saat panel dibuka.
4. **Validasi:** tetap pada form dengan seluruh nilai utuh; error pertama terbaca dan dapat langsung diperbaiki. Enter/submit tidak membuat dua navigasi. Tidak meminta detail pemesan sebelum pengguna melihat hasil.
5. **Hasil:** navigasi/query existing tetap terpisah dari Home. Ringkasan layanan, rute, tanggal, waktu/WITA dan penumpang mendahului kartu. Harga adalah acuan publikasi, bukan inventori live. Ubah pencarian langsung membuka form terisi, tanpa memilih layanan/asal/tujuan ulang.
6. **Empty:** pesan tidak ada pilihan sesuai input, bukan “kursi habis”. Ubah pencarian satu tap; alternatif Charter hanya bila ditawarkan engine existing. Tidak otomatis mengganti layanan, tanggal, waktu, atau kapasitas.
7. **Batas audit sesudah hasil:** tombol pilih membuka dialog existing; detail → review → link permintaan WhatsApp tetap berjalan. Tidak mengubah transaksi/konfirmasi bisnis.

### Pengurangan tap yang aman

- Route entry mengisi asal/tujuan dan membawa fokus tanggal; pengguna tidak perlu memilih layanan/rute lagi. Ini baseline yang harus dipertahankan.
- Hari ini/Besok langsung mengisi tanggal tanpa langkah Simpan; satu selected date yang sama dengan input native.
- Edit dari hasil/empty langsung membuka form terisi; close/reopen bukan Reset.
- Gunakan selector penumpang existing secara langsung, tanpa subhalaman atau dialog konfirmasi baru. Filter waktu optional tetap default Semua.
- Target untuk rute terisi + Besok: **tap rute → Besok → Cari**, tiga aktivasi sampai hasil, tanpa menghitung scroll. Flow manual: buka → pilih asal → pilih tujuan → tanggal → Cari; interaksi internal native picker dihitung terpisah karena berbeda OS. Jangan mengklaim penghematan angka universal tanpa uji perangkat.

## 2. Interaction / state matrix

Tabel adalah perilaku target untuk implementasi setelah master disetujui, kecuali disebut baseline. Semua transisi mempertahankan business rule existing.

| Komponen / kondisi | Aksi dan state berikutnya | Data, fokus, announcement / batas |
|---|---|---|
| First load Home | Form collapsed, empat shortcut, search dan CTA buka terlihat | Tidak autofocus/keyboard otomatis; hidden form tidak masuk Tab. Lokasi Bali informasional. |
| Search/filter closed → open | Satu panel inline existing, aria-expanded true pada kontrol terkait | Fokus origin bila layanan punya form; motor ke informasi/CTA. Jangan trap fokus karena bukan modal. |
| Panel open → close | Panel hidden; aria-expanded false | Nilai tidak di-reset; fokus pemicu semula, fallback search bila pemicu hilang. Jangan membuat history entry baru. |
| Pilih layanan | aria-selected dan roving tabindex sinkron, panel berlabel tab aktif | Opsi/default/normalisasi mengikuti setService existing. Jangan berjanji setiap layanan menyimpan draft terpisah. |
| Motor | Informasi belum tersedia + tautan kontak nyata | Tidak submit, spinner, hasil, kalender atau availability palsu. |
| Lokasi default/selected | Native select; placeholder bukan kota yang dipilih | Urutan asal lalu tujuan. Kedua arah airport tetap didukung; jangan memaksa asal selalu bandara. |
| Asal=tujuan / airport tanpa bandara | Tetap form; error tepat pada lokasi terkait | Fokus invalid pertama; teks menjelaskan rule. Tidak menukar/mengoreksi diam-diam. |
| Tanggal kosong/selected | Native date dan quick-date memakai satu nilai | Min hari Bali; cancel picker menjaga nilai terakhir. Selected quick-date mengikuti nilai input. |
| Tanggal lampau | Error tanggal saat submit | Jangan menggeser tanggal otomatis. Hari ini sah; opsi jadwal lewat tetap dibuang engine. |
| Waktu Shuttle | Filter Semua/Pagi/Siang-Sore/Malam existing | Bukan pilihan departure final; departure dipilih pada hasil. |
| Waktu privat | Native time, WITA, nilai awal existing 09:00 | Required dan future rule existing. Cancel tidak menghapus nilai. Jangan fallback diam-diam jika jam lewat. |
| Penumpang | Native select existing, default 1 | 1–12 Shuttle/Airport; 1–6 Charter mengikuti sumber. Jangan menyimpulkan kursi tersedia dari angka ini. |
| Form dirty + validasi | Error terkait, label dan CTA tetap terbaca | aria-invalid + describedby; satu alert, jangan announce berulang pada setiap ketikan. Nilai lain utuh. |
| Cari idle → submitting | Hanya sesudah validasi lulus: busy + cegah aktivasi ulang | Indikator hanya selama navigasi nyata; tidak ada progress/timer jaringan buatan. Fokus tidak hilang. |
| Navigasi gagal / kembali dari bfcache | Kembalikan tombol idle dan nilai form | Jangan meninggalkan disabled/spinner permanen; pengguna dapat retry. Ini spesifikasi, guard belum terbukti ada pada baseline. |
| Hasil sukses | Daftar + ringkasan + Ubah pencarian | Fokus heading hasil pada navigasi klien bila diperlukan; full navigation tetap semantik dokumen. Jangan menambah history palsu. |
| Hasil kosong | Empty dan Ubah pencarian, alternatif conditional existing | Tidak menyatakan sold out. Edit mempertahankan query yang sama. |
| Route/favorite-card entry | Prefill existing, panel terbuka, fokus tanggal | Tapping heart hanya toggle favorite; tidak memicu booking. Label layanan mengikuti dataset sebenarnya. |
| Favorit kartu | aria-pressed + simpan lokal, toggle ulang membatalkan | Tidak membutuhkan akun; gagal storage tidak diumumkan sebagai tersimpan permanen. |
| Lihat semua | Expanded/collapsed memakai dataset yang sama | aria-expanded, fokus tombol stabil; tidak berpindah halaman/mereset form. |
| Bottom Home | Tautan Home existing | Tidak membuat tab layanan baru. Kembali dari hasil mengikuti routing existing. |
| Bottom Favorit/Akun unavailable | Status sopan, tetap di layar kini | Pertahankan unavailable, tidak berpindah active page. Semantik disabled harus konsisten dengan feedback yang masih boleh diaktifkan. |
| Bottom Perjalanan / bell | Dialog Cek Booking existing | Jangan tampilkan booking palsu/list pembayaran. Nav kembali ke prior state saat dialog tutup. |
| ID ↔ EN | Translate existing tanpa reset form | Fokus tetap kontrol bahasa; selected service/date/locations tidak berubah. Refresh/navigasi punya batas persistensi baseline. |
| Dialog open/close | Native modal, close/backdrop/Escape existing | Tab terkurung secara native, background inert. Close kembali pemicu; keyboard tidak membawa fokus ke nav di belakang. |
| Cek Booking | Kode + WhatsApp → link verifikasi WhatsApp existing | Link baru dihapus saat input berubah; tidak memalsukan fetch status atau klaim terverifikasi. Reset saat buka baru adalah baseline. |
| Browser/Android Back | Navigasi dan native picker/keyboard sesuai browser | Tidak intercept history/popstate baru. Keyboard/picker ditangani OS; Escape web menutup dialog existing. |

## 3. Focus order, keyboard, accessibility dan touch

### Urutan fokus target

- Home: skip link → Cek Booking/bell → search → kontrol oranye → tab layanan aktif (panah/Home/End memilih tab) → konten kartu/aksi sesuai urutan baca → bahasa → bottom nav sesuai urutan visual. DOM nav saat ini berurutan Home/Explore/Trips/Favorites/Account, CSS menyembunyikan Explore dan mengurutkan Favorit sebelum Trips: master perlu menyelaraskan urutan keyboard dengan visual mobile tanpa mengubah desktop.
- Panel terbuka: tab aktif → close panel → mode perjalanan yang benar-benar tersedia → asal → tujuan → tanggal → Hari ini/Besok → waktu layanan bila tersedia → penumpang → Cari. Jangan memasukkan kontrol hidden/disabled ke Tab. Mode pulang pergi tidak diperlakukan sebagai booking aktif sampai konflik UX-01 diselesaikan.
- Route entry: tanggal (rute sudah terisi); edit search: field pertama yang relevan, tanpa menghapus nilai; invalid submit: field invalid pertama, bukan CTA. Jangan memfokuskan dua elemen dari handler entry point berbeda.
- Cek Booking: close → kode → telepon → submit → link WhatsApp bila sudah dibuat. Native dialog boleh awalnya fokus close; jangan paksa keyboard telepon saat hanya membuka dialog. Escape/close/backdrop mengembalikan fokus pemicu.
- Hasil: ringkasan → Ubah pencarian → tombol tiap kartu; empty → Ubah pencarian → alternatif existing. Review dialog mempertahankan alur form/review existing.

### Ketika keyboard mobile terbuka

- Form pencarian memakai select/date/time native; jangan mengganti dengan custom combobox tanpa kebutuhan. Text keyboard terutama di dialog Cek Booking/detail. Nomor WhatsApp memakai tel; tipe input tidak menggantikan validasi existing.
- Field aktif, label dan error harus berada dalam visual viewport, dengan jarak aman sekitar 12–16px dari keyboard. Scroll container yang memang aktif; jangan memaksa scroll halaman dan body bersamaan. Hindari scroll berulang pada setiap resize visualViewport.
- Dialog dibatasi tinggi viewport yang tersedia, konten di dalam dapat discroll, close dan tombol akhir dapat dijangkau. Bottom nav tidak diangkat ke atas keyboard atau menutupi field; tidak menambahkan CTA sticky kedua. Fokus dan draft tidak berpindah/hilang saat keyboard buka/tutup atau rotasi.
- Jangan mengunci tinggi memakai 100vh statis, auto-zoom karena input kecil, atau memblokir native back/pull-to-refresh. Nilai input mobile >=16px; zoom pengguna tetap tersedia.
- Auto focus dari aksi sengaja hanya untuk navigasi field; native picker tidak dipaksa muncul. Enter pada kode/tel mengikuti form existing; jangan submit dua kali atau mengubah makna multiline pada detail.
- Pengujian viewport pendek adalah proksi layout, **bukan bukti keyboard fisik**. iOS Safari/WebKit, Android Chrome dengan IME nyata, dan standalone wajib diuji oleh QA perangkat sebelum sign-off.

### Semantik dan target sentuh

Target interaktif minimal 44×44 CSS px, CTA utama 48px, jarak antaraksi sekitar 8px bila mungkin. Ikon tetap proporsional dalam target; close 34px dan kontrol bahasa min-height 34px saat ini perlu diperbaiki pada desain. Periksa heart, quick-date, swap existing, close dialog, nav, dan native date di semua width; jangan menumpuk hitbox.

Fokus terlihat dengan ring/border kontras; selected bukan hanya warna (aria-selected/pressed dan teks), disabled dijelaskan, error selalu teks. Error dihubungkan ke kontrol dengan aria-describedby; hanya kontrol invalid memakai aria-invalid. Alert/status menggunakan live region seperlunya tanpa announcement ganda. Nama aksesibel icon-only ikut ID/EN. Gunakan label lokasi yang nyata, heading hasil, dan urutan baca yang sama dengan tampilan. Kontras teks/focus minimal mengikuti WCAG AA (teks normal 4.5:1, indikator UI 3:1); pengukuran visual final milik Agent 2/5.

## 4. Motion / transition rules

- Open/close panel: instan atau opacity 120–180ms; tidak mengubah tinggi secara animasi panjang, tidak bounce, tidak menggeser fokus dua kali. Saat hidden selesai, kontrol tidak bisa difokuskan.
- Selected/pressed/focus: 120–180ms warna/opacity, geometri dan hitbox konstan. Tekanan tombol tidak perlu scale bila mengurangi ketepatan sentuh.
- Scroll ke panel/field: maksimal satu scroll kontekstual setelah aksi sengaja; jangan menengahkan form panjang sehingga close/field awal tertutup header. Tidak scroll ke atas ketika pengguna sedang mengetik.
- Error: teks dan fokus cukup; shake/haptic hanya tambahan, bukan satu-satunya sinyal. Jangan mengulang haptic terus-menerus atau memakai sukses getaran sebagai bukti booking.
- Loading hanya untuk proses nyata. Tidak membuat skeleton/jeda untuk hasil lokal yang dihitung langsung.
- `prefers-reduced-motion: reduce`: hilangkan shake, pergeseran, scale, smooth-scroll imperatif dan transisi panel/nav; tampilkan state akhir instan. Tidak menambah library/timer animasi. Respect perubahan preference selama sesi.

## 5. Failure / error handling

| Kasus | Respons UX yang ditetapkan | Batas kebenaran / recovery |
|---|---|---|
| Asal/tujuan kosong, sama atau airport invalid | Pesan existing yang spesifik + field terkait | Simpan semua field, koreksi langsung; jangan membuat opsi lokasi baru. |
| Tanggal kosong/lampau, waktu privat lewat | Pesan tanggal/waktu dan WITA | Jangan mengganti jam otomatis; validasi backend baru di luar scope. |
| Tidak ada opsi rute/filter/jadwal | “Belum menemukan pilihan yang sesuai” | Ubah pencarian existing; tidak mengklaim kegagalan server/kursi habis. |
| Offline/gagal memuat halaman hasil | Feedback koneksi jujur jika halaman dapat mendeteksinya, retry melalui navigasi existing | Browser dapat menampilkan error navigasi; jangan mengklaim custom recovery sudah ada. Jangan cache status booking/hasil seolah data live. Detail offline milik Agent 4. |
| Klik Cari berulang / kembali browser | Satu navigasi; busy dipulihkan saat halaman aktif kembali | Tidak mengubah payload/query atau membuat booking baru. |
| Storage Favorit diblokir/penuh | Informasi simpan gagal, UI tidak menjanjikan persistensi | Tidak menambah server, login, atau sinkronisasi. |
| Bahasa berubah ketika error tampil | Pesan dan nama kontrol mengikuti bahasa terpilih | Jangan menghapus draft untuk menerjemahkan; baseline message statis perlu diperhatikan. |
| WhatsApp tidak terbuka | Pertahankan dialog/link agar bisa dicoba lagi | Tanpa klaim terkirim, nomor booking, payment success, atau konfirmasi otomatis. Jangan mengubah flow dua langkah verifikasi existing. |
| Jadwal lewat saat detail dibuka lama | Pertahankan penolakan existing dan ajakan cari ulang | Risiko existing: error bisa berada di panel Home tersembunyi saat results-page; perlu presentasi error yang terlihat, tanpa melewati validFuture. |
| URL query tidak valid/parsial | Jangan menyatakan hasil valid sebelum pemeriksaan existing | Hardening parser/routing merupakan risiko terpisah, bukan izin mengubah engine pada sprint ini. |

## 6. Implementation risks dan keputusan untuk sintesis

1. **Janji layanan yang belum didukung (UX-01):** highest priority sebelum implementasi. Agent 1 menetapkan wording/state mobile Pulang Pergi; tidak menambah penghitungan return trip. Uji tanggal kembali kosong/terisi dan pastikan tidak ada klaim return di hasil.
2. **Konflik swap dan label airport (UX-10):** dokumen melarang swap, checkout memiliki kontrol. Jangan otomatis menghapus perilaku atau memetakan semua rute bandara ke privat; data Shuttle bandara memang ada. Agent 1 harus menyatakan keputusan dan mempertahankan kebenaran tarif.
3. **State normalization:** updateSelects/setService mengubah opsi serta default, termasuk cap Charter dan airport. UI draft baru lintas layanan bisa menimpa aturan existing. Jangan menduplikasi state machine; proposal memunculkan selector existing lebih aman.
4. **Inline panel bukan modal:** jangan menambahkan focus trap/body lock/backdrop hanya karena terlihat seperti surface aplikasi. Dialog native Cek Booking berbeda dan tetap modal.
5. **CSS cascade kuat:** reset outline, grid areas, hidden passenger/time, selector `!important`, order nav dan body scroller berbeda iOS/Chromium. Semua implementasi UI harus mobile-guard <768px; jangan mengubah DOM global/nav focus order tanpa regression desktop. Laporan ini tidak melakukan implementasi tersebut.
6. **Focus listener ganda:** capture openBooking, route listeners, setService dan translate/renderRoutes dapat berinteraksi; simpan pemicu sebelum rerender dan fallback bila node dihapus. Jangan memaksa focus origin pada Motor.
7. **Persistensi punya batas:** close/reopen mempertahankan DOM fields; URL membawa enam field inti; refresh Home bersih tidak menjamin draft; bahasa dan trip-mode/return date tidak ikut query. Jangan menambahkan localStorage untuk data pribadi/draft tanpa scope baru.
8. **Disabled/unavailable:** aria-disabled true pada nav masih punya click feedback; automation menganggap disabled. Putuskan semantik feedback tanpa membuat fitur aktif. Pesan unavailable tetap harus tersedia bagi pembaca layar dan tidak hanya lewat tap pointer.
9. **Motion dan keyboard:** CSS reduce tidak cukup untuk smooth scroll JS. Viewport pendek desktop emulation tidak setara IME/toolbar/overscroll perangkat. Masukan Agent 4 dan verifikasi Agent 5 diperlukan.
10. **Gate:** laporan siap disintesis, bukan master FINAL. Tidak ada perubahan CSS, SEO, manifest, service worker, produksi atau deploy yang diizinkan oleh laporan ini.

## 7. Behavior yang wajib tetap sama

- Pencarian dan hasil memakai routing/query existing; hasil terpisah dari Home; Edit/empty-edit merekonstruksi service, from, to, date, time, passengers.
- Close/reopen form tidak reset field inti. Pemilihan layanan tetap memakai setService dan normalisasi existing, bukan salinan logika baru.
- Sumber lokasi, airport direction, dataset rute, urutan validasi, waktu Bali UTC+8, tanggal minimum dan future-time/jadwal lewat tetap sama.
- Shuttle per penumpang; privat per kendaraan; cap layanan dan opsi engine existing tidak berubah. Ketersediaan/harga akhir dikonfirmasi admin.
- Hari ini/Besok, native date/time/select, cancel picker dan filter existing tetap berfungsi.
- Favorit kartu lokal dan expand daftar existing tetap bekerja; menu Favorit/Akun belum tersedia, Motor belum punya engine booking.
- ID/EN memakai translate dan kontrol existing; tanpa route bahasa atau auth baru.
- Dialog native, Escape/backdrop/close dan kembali fokus tetap didukung; reset form Cek Booking saat membuka baru dan reset detail saat memilih trip baru tetap baseline. Close/reopen search tidak boleh disamakan dengan persistensi detail pemesan.
- Detail → review → permintaan WhatsApp, validasi nomor/alamat, escaping data pengguna, dan pemeriksaan jadwal sebelum review tetap sama. Tidak membuat konfirmasi/pembayaran/status booking palsu.
- Geolocation tidak ditemukan sebagai kontrol aktif pada form checkout ini; jangan menambahkan atau mengganti resolver berdasarkan skill lama.
- Desktop/tablet >=768px, konten truth, tarif, jadwal, backend/API/database/auth/RBAC dan SEO/PWA tetap terkunci.

## 8. Bukti verifikasi dan acceptance handoff

### Audit yang dilakukan

- Review source dan cascade pada checkout HEAD di atas, sebelum penulisan laporan; working tree awal bersih.
- `node tests/core.test.cjs`: **PASS, 19 assertions** tarif publikasi, arah, kapasitas, tanggal dan waktu. Tidak mengubah tes.
- Probe Playwright Chromium sistem, localhost, reduced motion, width **320/360/390/412/430**, tinggi awal 844px: form mulai collapsed; search membuka/fokus origin; validasi kosong tampil; tutup/buka mempertahankan rute; Shuttle, Airport Transfer dan Charter menghasilkan opsi; Edit membuka form terisi; Motor informasional; feedback Favorit unavailable; Cek Booking menghasilkan link WhatsApp tanpa mengirim; Escape mengembalikan fokus Perjalanan; tidak ada horizontal overflow pada viewport akhir atau pageerror selama flow.
- Probe Pulang Pergi memakai klik label radio (bukan input yang tertutup span): pilihan dapat dipilih tetapi query hasil hanya `service/from/to/date/time/passengers/hasil`. Ini reproduksi UX-01, bukan PASS dukungan pulang pergi.
- Probe validasi: activeElement tetap `.search-button`, mereproduksi UX-03.
- Viewport dipendekkan menjadi **420px** saat dialog Cek Booking terbuka: dialog terletak y=10, tinggi 402px pada kelima width; link verifikasi dapat dijangkau dan fokus kembali setelah Escape. Ini cek layout, bukan keyboard fisik.
- Probe tambahan 390px: route entry, ID/EN dan state rute, empty route lalu Edit, serta visibilitas selector penumpang/waktu diperiksa terpisah.
- Skrip audit hanya sementara di `/workspace/work/`, tidak ditambahkan ke repo. Percobaan awal memakai `.check()` pada radio dekoratif dan `.click()` otomatis pada aria-disabled nav terkena actionability timeout; pengulangan memakai label radio dan klik koordinat kontrol unavailable. Tidak menganggap timeout harness tersebut sebagai kegagalan booking.
- WebKit tidak tersedia di lingkungan (executable `webkit-2336/pw_run.sh` tidak ditemukan). Tidak memasang dependency, tidak mengklaim WebKit/iPhone/Android/PWA fisik/live/desktop visual sudah PASS. Audit ini bukan pengganti QA visual Agent 5.

### Acceptance untuk implementasi berikutnya

| Skenario | Hasil yang wajib dibuktikan pada 360/390/412 (resilience 320/430) |
|---|---|
| Home → tiap service → close/reopen | Form/layanan sesuai, nilai existing utuh, fokus kembali pemicu, Motor informasional |
| Rute → quick-date → Cari → hasil → Edit | Tidak mengulang input rute, enam field inti sama, ringkasan benar, satu navigasi |
| Empty → Edit / alternatif conditional | Tidak mengklaim sold out, semua input dibawa kembali, layanan tidak berganti otomatis |
| Semua invalid rule | Pesan dekat field, aria relasi benar, fokus invalid pertama terlihat, rule dan payload sama |
| Penumpang/filter waktu | Nilai dapat dilihat/diedit tanpa mengganti engine; ringkasan mencerminkan query |
| Pulang Pergi / swap | Keputusan Agent 1 terdokumentasi; tidak menyiratkan kemampuan bisnis baru |
| Keyboard/Back/rotasi | iOS Safari + Android Chrome nyata dan standalone; field/error/close/CTA terjangkau, tidak kehilangan draft atau double back |
| Dialog dan Cek Booking | Focus trap native, tab order, tel keyboard, dismiss/return focus, link WhatsApp benar tanpa mengirim dalam QA |
| ID/EN, favorites local/unavailable | Tidak reset form, nama aksesibel/status sesuai, tidak membuat akun/data palsu |
| Reduced motion + throttled navigation | Tidak shake/smooth-scroll non-esensial, tidak spinner fiktif/permanen, retry aman |
| Desktop 768/1024/1440 | Tidak ada perubahan tampilan/perilaku; regression diserahkan Agent 5 |

Ketujuh output role terisi: primary flow, matrix state, motion, failure handling, accessibility/touch, implementation risks, dan behavioral invariants. Agent 1 dapat memakai laporan ini untuk master tanpa Agent 3 menyunting output agent lain.
