# PRD Desain — SINGARAJA TRANS

**Versi:** 1.5 · 18 Oktober 2026
**Status:** Acuan desain dan implementasi UI · SEO/PWA constraint LOCKED  
**Platform:** Website publik, desktop dan mobile  
**Arah visual:** redBus-inspired, merah–putih–abu, modern dan tepercaya

---

## 1. Tujuan Desain

Menciptakan pengalaman pemesanan transportasi Bali Utara yang cepat dipahami, terasa profesional, dan nyaman digunakan dari ponsel. Website harus memprioritaskan pencarian Travel, Airport Transfer, dan Charter tanpa membuat pengguna harus memahami alur yang rumit.

Desain tidak boleh terasa seperti template, dashboard, atau prototipe. Fokusnya adalah kejelasan informasi, rasa aman, CTA yang tegas, dan alur booking yang terarah.

## 2. Prinsip Utama

1. **Mobile-first.** Versi mobile adalah acuan utama untuk ukuran teks, sentuhan, dan urutan informasi.
2. **Satu tujuan utama per layar.** Beranda mengarahkan pengguna mencari layanan; halaman hasil mengarahkan pengguna memilih kendaraan.
3. **Pemisahan konteks.** Hasil pencarian adalah halaman/rute tersendiri, tidak muncul di bawah konten Beranda.
4. **Hierarki jelas.** Informasi rute, waktu, harga, dan CTA harus terbaca dalam sekali lihat.
5. **Konsisten antar layanan.** Struktur UI sama, namun input dan satuan harga mengikuti jenis layanan.
6. **Minimal dan nyata.** Tidak memakai rating, ketersediaan, klaim, atau data operasional palsu.

## 3. Sistem Visual

### 3.1 Warna

Warna merah utama mengikuti gambar referensi visual yang disepakati. Nilai canonical untuk implementasi adalah **`#C85759`**. Nilai ini diambil dari area merah dominan pada referensi dan menjadi sumber tunggal untuk token merah utama; jangan melakukan sampling ulang dari screenshot pada setiap implementasi karena hasil dapat berbeda akibat layar, kompresi, atau color management.

| Peran | Warna | Penggunaan |
|---|---:|---|
| Merah utama / Reference Red | `#C85759` | CTA utama, tab aktif, harga penting, ikon aktif, aksen utama |
| Merah hover | `#AE494B` | Hover CTA, hover elemen interaktif merah |
| Merah pressed | `#963D40` | Pressed/active CTA |
| Merah sangat muda | `#F9EAEA` | Latar aksen, chip/status ringan, lingkaran ikon |
| Ring merah | `rgba(200, 87, 89, 0.18)` | Focus ring halus pada field dan kontrol |
| Teks utama | `#1F2937` | Judul dan informasi utama |
| Teks sekunder | `#6B7280` | Label, deskripsi, metadata |
| Border | `#E5E7EB` | Field, kartu, divider |
| Latar halaman | `#F7F7F7` | Section dan halaman hasil |
| Putih | `#FFFFFF` | Kartu, form, header |

Aturan konsistensi merah:

- `#C85759` adalah satu-satunya **primary red** untuk desain ini.
- Warna merah lama seperti `#D84E55`, `#E21F2F`, atau variasi lain tidak digunakan sebagai primary pada implementasi baru.
- CTA utama, tab aktif, harga utama, indikator aktif, ikon aksen, dan elemen brand-interaction menggunakan token yang sama, bukan nilai merah berbeda per komponen.
- Teks putih di atas merah utama harus dipakai bila kontras memenuhi kebutuhan keterbacaan; jangan mengurangi opacity teks CTA.
- State hover dan pressed hanya memakai token turunan di atas agar identitas warna tetap sama.
- Focus tidak mengubah komponen menjadi warna lain; gunakan border merah utama + ring merah halus.
- Merah tidak dipakai sebagai latar area besar selain elemen brand/CTA yang memang membutuhkan penekanan.
- Pada foto atau hero, warna merah tidak boleh menimpa warna asli gambar dengan overlay berat.

Tidak menggunakan biru atau emas sebagai warna aktif pada versi desain ini.

### 3.2 Tipografi

Gunakan **Inter** dengan fallback `system-ui, sans-serif`.

| Elemen | Desktop | Mobile | Berat |
|---|---:|---:|---:|
| H1 / hero | 42–48px | 28–32px | 700 |
| H2 | 30–32px | 22–24px | 700 |
| H3 / judul kartu | 18–20px | 16–18px | 600–700 |
| Body | 16px | 16px | 400 |
| Label form | 14px | 14px | 500 |
| Meta / bantuan | 13–14px | 13–14px | 400 |
| Tombol | 15–16px | 15–16px | 600 |

Nilai field dan isi utama tidak boleh kurang dari 16px pada mobile.

### 3.3 Bentuk, border, dan bayangan

- Radius field: 10–12px.
- Radius kartu: 14–16px.
- Border default: 1px `#E5E7EB`.
- Fokus: border merah utama dan ring sangat halus.
- Shadow kartu: halus; tidak memakai shadow gelap atau berlapis.
- Tidak menggunakan glassmorphism, gradient berlebihan, atau radius yang terlalu bulat.

## 4. Struktur Informasi

| Halaman | Tujuan | CTA utama |
|---|---|---|
| Beranda | Memulai pencarian layanan | Cari Tiket / Cari Mobil |
| Hasil Pencarian | Memilih jadwal atau kendaraan | Pilih / Pesan Sekarang |
| Detail Layanan | Memahami detail sebelum booking | Lanjutkan Pesanan |
| Pemesanan | Mengisi data perjalanan | Lanjut Pembayaran |
| Konfirmasi | Memberi kode booking dan instruksi | Cek Booking / WhatsApp |
| Cek Booking | Melihat status pemesanan | Cek Booking |

## 5. Header

### Desktop

- Latar putih, tinggi ringkas, logo di kiri.
- Menu: Beranda, Travel, Airport Transfer, Charter, Cek Booking.
- CTA WhatsApp di kanan bila diperlukan.
- Header tidak mengalahkan fokus hero atau widget.

### Mobile

- Susunan final: animated search → flag aktif → share.
- Logo resmi dan teks SINGARAJA TRANS hanya berada di dalam search saat opening; tidak ada logo/nama tambahan di luar search dan tidak ada hamburger.
- Header setinggi 60px, search setinggi 40px dengan radius 20px, dua kontrol kanan masing-masing 40 × 40px. Ukuran kontrol header ini mengikuti keputusan eksplisit 18 Oktober 2026; sasaran 44px untuk kontrol lain tetap berlaku.
- Flag langsung mengganti ID/EN melalui state bahasa existing tanpa dropdown atau routing baru.
- Header tidak boleh menutupi dropdown, kalender, atau popover. Spesifikasi rinci berada pada bagian LOCKED / FINAL — Mobile Header & Service Selector.

## 6. Beranda

### 6.1 Hero

Susunan desktop:

- Hero visual di latar atau sisi kanan.
- Judul 2–3 baris di sisi kiri.
- Deskripsi satu hingga dua kalimat.
- Widget pencarian menjadi fokus visual utama.

Susunan mobile:

- Judul lebih dahulu, maksimal 2–3 baris.
- Deskripsi singkat.
- Widget langsung terlihat tanpa perlu scroll jauh.
- Hindari tinggi hero berlebihan dan gambar yang mempersempit form.
- **Hero kontekstual wajib mengikuti tab layanan aktif** pada desktop dan mobile: Travel Shuttle menampilkan visual armada shuttle, Airport Transfer menampilkan visual kendaraan privat/airport, dan Charter Drop menampilkan visual perjalanan privat/destinasi.
- Perpindahan visual hero memakai transisi cross-fade ringan; tidak boleh menambah layout shift, mengubah tinggi hero, atau mengganggu fokus/klik pada widget.
- Desktop menempatkan visual layanan sebagai layer yang menyatu di sisi kanan hero dengan area teks tetap aman di kiri. Mobile memakai layer full-bleed beropacity terkontrol agar H1, deskripsi, dan widget tetap menjadi fokus utama.
- Visual layanan bersifat dekoratif dengan aria-hidden atau alt kosong bila berupa layer tambahan dan tidak menduplikasi informasi semantik tab.

Konten yang direkomendasikan:

- Eyebrow: `Transportasi Bali Utara`
- H1: `Pesan perjalanan Bali lebih mudah`
- Deskripsi: layanan Travel, Airport Transfer, dan Charter dalam satu tempat.

### 6.2 Widget pencarian

Widget memiliki tiga tab:

| Tab | Field wajib | Satuan harga | Tombol |
|---|---|---|---|
| Travel | Asal, Tujuan, Tanggal, Penumpang, Waktu | Per kursi | Cari Tiket |
| Airport Transfer | Lokasi jemput, Bandara/Tujuan, Tanggal, Waktu, Penumpang | Per mobil | Cari Mobil |
| Charter | Lokasi jemput, Rencana perjalanan, Tanggal, Durasi, Jenis mobil | Per mobil | Cari Mobil |

Aturan desain widget:

- Tab aktif memakai merah utama dan indikator aktif yang jelas.
- Tab tidak aktif tetap mudah terbaca dan tidak tampak seperti tombol nonaktif.
- Tidak ada tombol tukar asal–tujuan.
- Label tampil di atas nilai field atau sebagai label floating yang stabil.
- Dropdown, kalender, dan pemilih waktu tidak boleh mengubah ukuran widget atau mendorong layout.
- Pada mobile semua field disusun vertikal; CTA penuh satu lebar.
- Validasi ditampilkan dekat field terkait tanpa menimpa elemen lain.

### 6.3 Rute populer

Section setelah hero, dengan judul dan deskripsi singkat.

Kartu rute harus memuat:

- Thumbnail/foto rute atau kendaraan.
- Nama rute.
- Keterangan singkat bila relevan.
- Harga dengan label `Mulai dari`.
- Satuan harga yang tepat.
- CTA yang membawa pengguna ke pencarian terkait.

Layout:

- Desktop: grid 3–4 kolom.
- Tablet: 2 kolom.
- Mobile: horizontal scroll yang terkontrol atau 1 kolom penuh; tidak ada kartu terpotong tanpa petunjuk.

### 6.4 Keunggulan dan cara pesan

Gunakan section ringan, bukan dominan:

- Aman dan tepercaya.
- Armada nyaman.
- Pengemudi berpengalaman.
- Pemesanan mudah.

Cara pesan maksimal 3 langkah: Cari → Pilih → Konfirmasi.

## 7. Halaman Hasil Pencarian

### 7.1 Aturan utama

Hasil pencarian **wajib** berada di halaman/rute terpisah.

Pada layar hasil tidak boleh tampil kembali:

- Hero Beranda
- Widget Beranda lengkap sebagai bagian Home
- Rute populer
- Section keunggulan Home
- Footer yang muncul di tengah daftar hasil

Bagian paling atas terdiri dari:

1. Judul hasil pencarian.
2. Ringkasan rute, tanggal, dan jumlah penumpang.
3. Tombol `Ubah Pencarian`.
4. Filter sederhana bila dibutuhkan.

### 7.2 Kartu hasil

Setiap kartu berisi, urut dari prioritas tertinggi:

1. Foto kendaraan.
2. Nama layanan/kendaraan.
3. Rute dan jam/estimasi.
4. Kapasitas dan fasilitas ringkas.
5. Harga besar dan satuan harga.
6. CTA `Pilih` atau `Pesan Sekarang`.

Aturan harga:

- Travel: `Rp xxx.xxx / kursi`.
- Airport Transfer dan Charter: `Rp xxx.xxx / mobil`.

### 7.3 Layout hasil

| Viewport | Susunan |
|---|---|
| Desktop | Kolom filter opsional di kiri, daftar kartu di kanan |
| Tablet | Filter ringkas di atas, kartu satu kolom |
| Mobile | Ringkasan di atas, kartu satu kolom, CTA mudah dijangkau |

Pada mobile, foto berada di atas atau di kiri dengan ukuran tetap; harga dan CTA tidak boleh bertumpuk atau keluar dari kartu.

## 8. Detail Layanan dan Pemesanan

### Detail layanan

- Galeri/foto kendaraan sederhana.
- Ringkasan rute dan waktu.
- Harga dan satuan harga konsisten.
- Kapasitas, fasilitas, titik jemput, dan ketentuan.
- CTA selalu terlihat pada akhir informasi penting.

### Form pemesanan

Urutan:

1. Ringkasan layanan yang dipilih.
2. Data pemesan.
3. Data penumpang dan titik jemput.
4. Ringkasan harga.
5. Metode pembayaran/konfirmasi.

Form tidak boleh terlalu padat. Gunakan grouping, label yang jelas, dan error per field.

## 9. State dan Interaksi

Setiap kontrol wajib memiliki state:

- Default
- Hover (desktop)
- Focus
- Active/selected
- Disabled
- Error
- Loading

Ketentuan:

- Hover tidak boleh menggeser ukuran elemen.
- Focus harus cukup kontras dan tetap rapi.
- Loading memakai indikator ringan dan CTA tidak dapat ditekan ulang.
- Empty state memiliki pesan jelas serta CTA untuk mengubah pencarian.
- Error tidak boleh hanya mengandalkan warna merah; sertakan teks bantuan.

## 10. Responsif dan Spacing

### Breakpoint

| Mode | Lebar |
|---|---:|
| Mobile | hingga 767px |
| Tablet | 768–1023px |
| Desktop | 1024px ke atas |

### Spacing

- Sistem jarak: 4, 8, 12, 16, 20, 24, 32, 40, 48px.
- Padding halaman mobile: 16–20px.
- Jarak antar-section desktop: 64–96px.
- Jarak antar-section mobile: 40–56px.
- Jarak dalam kartu: 16–20px.

Tidak boleh ada horizontal overflow, teks terpotong, kartu saling menimpa, atau CTA yang tertutup sticky element.

## 11. Spesifikasi Detail Mobile

### 11.1 Acuan komposisi mobile

Komposisi wajib mengikuti mockup awal yang disepakati, dengan urutan:

**Header → hero ringkas + widget pencarian floating → rute populer foto → Airport Transfer → layanan → keunggulan/trust → armada/fasilitas → cara booking → akses penumpang → informasi tentang → CTA WhatsApp → footer bahasa/legal.**

Konten marketing berada setelah pencarian. Pengguna harus dapat memulai pencarian tanpa perlu melewati section promosi panjang.

### 11.2 Viewport dan shell halaman

- Target utama: lebar 375px, 390px, dan 430px.
- Seluruh halaman memakai lebar konten `100%` dengan padding horizontal 16px; dapat menjadi 20px pada layar 390px ke atas.
- Tidak ada elemen yang memakai lebar tetap melebihi viewport.
- Tidak ada scroll horizontal pada body, widget, kartu hasil, kalender, maupun drawer.
- Safe-area perangkat harus diperhitungkan untuk header sticky, bottom sheet, dan CTA yang menempel di bawah.

### 11.3 Header dan navigasi mobile

- Header final setinggi 60px dengan padding horizontal 16px dan gap kontrol 6px.
- Search memperoleh ruang terbesar; logo resmi hanya tampil di dalam search saat opening, dengan proporsi asli aset.
- Flag aktif saja yang terlihat; tidak ada teks ID/EN, chevron, dropdown, hamburger, atau branding tambahan di header.
- Kontrol kanan berbentuk lingkaran 40 × 40px: bahasa lalu share.
- Sticky auto-hide/show dan radius surface 24px saat tersembunyi tetap berlaku. Fokus field, kalender, hasil filter, dan CTA tetap dapat diakses.
- Gunakan bagian LOCKED / FINAL — Mobile Header & Service Selector sebagai acuan implementasi dan QA scope ini.

### 11.4 Hero mobile

- Hero tidak memakai tagline tambahan. Area pencarian digeser lebih atas dan tampil floating dengan jarak bawah yang seimbang terhadap section berikutnya.
- Hero tidak lebih tinggi dari yang diperlukan untuk memperkenalkan layanan dan menampilkan awal widget.
- H1 memakai 28–32px, line-height 1.15–1.25, maksimal tiga baris pada layar 320px.
- Deskripsi memakai 16px dan maksimal tiga baris; hindari paragraf panjang.
- Gambar hero adalah elemen pendukung. Jika ruang sempit, prioritas tetap pada judul dan widget pencarian.
- Jarak dari hero ke widget harus konsisten; widget tidak boleh tertutup gambar atau overlap dengan section berikutnya.

### 11.5 Tab dan widget pencarian

- Empat tab utama mobile: Travel Shuttle, Airport Transfer, Sewa Mobil, dan Sewa Motor.
- Keempat kartu memakai geometri identik: tinggi 88px, radius 16px, padding 10px 6px 9px, gap ikon–label 4px, dan area label minimum 28px. Label 11,5px dengan line-height 1,2, tetap terbaca tanpa terpotong.
- Ikon berada di atas label, dengan area layout 24 × 24px dan normalisasi optik per bentuk. Carousel menampilkan tiga kartu utuh dan sebagian kartu tetangga (peek) pada viewport QA; semua layanan tetap dapat diakses melalui swipe, klik/shortcut, dan keyboard.
- Indikator aktif berupa notch putih dangkal di bawah kartu; active/inactive tidak mengubah ukuran border-box, padding, posisi ikon/label, atau skala kartu. Geometri carousel dan perilaku final mengikuti bagian LOCKED / FINAL.
- Field disusun satu kolom dengan jarak 12px.
- Setiap field memiliki tinggi minimum 52px dan area tekan minimum 44px.
- Label: 14px; nilai, placeholder, dan hasil pilihan: minimum 16px.
- Ikon field memiliki ruang tetap agar teks tidak bertabrakan.
- CTA `Cari Tiket`/`Cari Mobil` lebar penuh, tinggi minimum 48px, dan diberi jarak 16px dari field terakhir.
- Tidak ada tombol tukar asal–tujuan.

### 11.6 Dropdown, combobox, kalender, dan pemilih waktu

- Popover dibuka di atas layer konten tetapi di bawah modal/drawer global.
- Lebar popover mengikuti field, dengan margin aman 16px dari tepi layar.
- Dropdown panjang memakai area scroll internal; tidak membuat body berpindah atau melebar.
- Opsi pilihan minimal 44px tinggi dan memiliki state hover/focus/selected yang jelas.
- Kalender satu bulan per layar pada mobile.
- Tombol bulan sebelumnya/berikutnya minimal 36–40px dan memiliki label aksesibel.
- Sel tanggal berbentuk persegi, minimum 36px; jarak antarsel konsisten.
- Tanggal hari ini, tanggal dipilih, disabled, dan rentang tanggal harus dapat dibedakan tanpa saling bertumpuk.
- Kalender tidak boleh menutupi field yang sedang aktif secara membingungkan dan tidak boleh tertutup oleh header.
- Pemilih waktu mengikuti pola popover/bottom sheet yang sama dan dapat ditutup melalui tombol kembali, pilihan, atau area overlay.

### 11.7 Rute populer dan section Beranda

- Rute populer tetap berupa kartu foto, bukan kartu hasil pencarian.
- Pada mobile, kartu rute menggunakan grid dua kolom dengan foto dominan, nama rute, label `Mulai dari`, harga/tarif, dan tombol panah/pilih rute.
- Kartu memiliki tinggi konsisten, dekorasi minimal, dan shadow halus.
- Section Airport Transfer, layanan, armada, trust, cara booking, akses penumpang, tentang, CTA WhatsApp, serta footer ditampilkan berurutan mengikuti mockup awal.
- CTA WhatsApp berperan sebagai bantuan, bukan pengganti CTA pencarian/pemesanan utama.

### 11.8 Hasil pencarian mobile

- Hasil pencarian tetap berada pada halaman/rute terpisah dari Beranda.
- Ringkasan pencarian berada di atas daftar dengan tombol `Ubah Pencarian` yang mudah dijangkau.
- Filter, jika ada, ditampilkan sebagai tombol ringkas lalu dibuka dalam bottom sheet atau panel penuh.
- Daftar hasil satu kolom dengan gap 12–16px.
- Kartu hasil tidak menggunakan layout absolut untuk harga atau CTA.
- Kartu hasil memakai foto di kiri dan detail di kanan: nama layanan, rute/jadwal, fasilitas ringkas, harga, dan CTA.
- Pada layar sangat sempit, kartu dapat berubah menjadi foto di atas lalu detail di bawah; harga dan CTA tetap pada blok tersendiri.
- Foto rasio konsisten, memiliki tinggi tetap, dan tidak mendorong teks keluar layar.
- Harga harus terlihat tanpa harus membuka detail kartu.
- CTA lebar penuh pada kartu atau ditempatkan pada baris khusus; tidak boleh bertumpuk dengan harga.
- Saat tidak ada hasil, tampilkan empty state dan CTA `Ubah Pencarian` tanpa memunculkan konten Home.

### 11.9 Detail layanan dan pemesanan mobile

- Informasi dipisahkan dalam section pendek: ringkasan, fasilitas, titik jemput, ketentuan, harga.
- Accordion hanya digunakan untuk informasi sekunder; ringkasan harga dan CTA tidak boleh tersembunyi.
- Form satu kolom dengan label tetap terlihat, pesan bantuan singkat, dan error tepat di bawah field.
- Ringkasan pesanan dapat menjadi sticky bottom bar hanya bila tidak menutup field aktif atau tombol sistem.
- CTA lanjutan selalu memuat konteks tindakan, misalnya `Lanjut Isi Data` atau `Lanjut Pembayaran`.

### 11.10 Bottom sheet, modal, dan feedback

- Bottom sheet memiliki radius atas 16–20px, handle yang terlihat, dan ruang aman di bawah.
- Tinggi awal tidak melebihi 85% viewport; konten panjang dapat di-scroll di dalam sheet.
- Modal memiliki tombol tutup yang jelas dan fokus keyboard terkunci di dalam modal saat terbuka.
- Toast atau pesan sukses/error muncul tanpa menutup CTA atau field penting.
- Loading tidak menghapus konteks pencarian; gunakan skeleton/indikator ringan dan cegah klik ganda pada CTA.

### 11.11 Gesture dan state mobile

- Tidak ada interaksi penting yang hanya mengandalkan hover.
- Scroll horizontal hanya diperbolehkan pada carousel yang jelas indikatornya; tidak digunakan untuk form atau hasil pencarian.
- Swipe tidak boleh menjadi satu-satunya cara menutup atau melanjutkan proses.
- Setelah keyboard perangkat muncul, field aktif dan pesan error tetap terlihat; CTA tidak boleh menutupi field.
- Setelah refresh, resize, rotasi layar, atau berpindah tab layanan, layout harus kembali stabil tanpa overlap.

### 11.12 Checklist QA mobile

Pengujian wajib dilakukan pada lebar 375px, 390px, dan 430px untuk:

1. Beranda, seluruh tab layanan, dan semua field.
2. Dropdown asal/tujuan, lokasi, penumpang, waktu, serta kalender.
3. State default, focus, validasi error, loading, dan disabled.
4. Hasil pencarian Travel, Airport Transfer, dan Charter.
5. Kartu hasil panjang, empty state, dan CTA.
6. Scroll, keyboard virtual, refresh, rotasi, serta kembali dari halaman hasil.
7. Header, drawer, bottom sheet, modal, footer, clipping, z-index, dan overflow.

## 12. Aksesibilitas

- Kontras teks dan tombol harus terbaca jelas.
- Semua input memiliki label nyata.
- Target sentuh minimal 44 × 44px di mobile.
- Fokus keyboard terlihat.
- Ikon selalu memiliki label/aria-label bila berdiri sendiri.
- Informasi penting tidak hanya dibedakan dengan warna.

## 13. Larangan Desain

- Tidak menampilkan tombol swap asal–tujuan.
- Tidak mencampur hasil pencarian ke halaman Beranda.
- Tidak menggunakan harga/satuan yang salah.
- Tidak membuat kartu dengan elemen absolut yang mudah tumpang tindih.
- Tidak membuat typography mobile di bawah standar keterbacaan.
- Tidak menambahkan badge, rating, stok, atau promo yang tidak didukung data nyata.
- Tidak menambah efek visual berat yang memperlambat halaman.

## 14. Acceptance Criteria Desain

Desain dinyatakan siap diimplementasikan bila:

1. Arah warna merah–putih–abu konsisten di seluruh halaman.
2. Desktop, tablet, dan mobile menggunakan hierarki yang sama namun layout menyesuaikan layar.
3. Widget tiga layanan terbaca jelas dan CTA sesuai tipe layanan.
4. Tidak ada tombol swap asal–tujuan.
5. Halaman hasil benar-benar terpisah dari Beranda.
6. Semua harga memakai satuan yang benar.
7. Hasil, field, dropdown, kalender, dan CTA tidak saling tumpang tindih di mobile.
8. Ukuran teks mobile memenuhi spesifikasi di atas.
9. State focus, error, loading, dan empty state tersedia dan rapi.
10. Tidak ada overflow horizontal atau clipping pada viewport utama.
11. Seluruh checklist QA mobile pada bagian 11.12 lolos tanpa overlap, clipping, atau CTA tertutup.

---

## 15. Catatan Implementasi

Dokumen ini mengatur desain dan pengalaman UI. Perubahan backend, API, pembayaran riil, ketersediaan real-time, autentikasi, serta database memerlukan keputusan teknis terpisah.


---

## SEO & PWA — LOCKED CONSTRAINT (17 Oktober 2026)

**Status: LOCKED.** Target produk bukan hanya kualitas visual, tetapi juga menjaga dan meningkatkan kemampuan website untuk ditemukan melalui Google Search. Tidak ada redesign UI/UX, termasuk perubahan mobile app-like/PWA, yang boleh mengorbankan crawlability, indexability, semantic content, internal navigation, atau performa pencarian organik.

### Keputusan produk

- Website tetap satu basis responsif untuk desktop, tablet, dan mobile; tidak membuat situs mobile terpisah.
- UI mobile boleh dirancang app-like/PWA-style sejak browser biasa. Saat PWA diaktifkan/install, UI mobile yang sama menjadi basis pengalaman standalone; tidak diperlukan desain kedua khusus PWA.
- PWA adalah lapisan capability/installability, bukan pengganti website responsif dan bukan alasan mengubah arsitektur SEO.
- Konten utama, intent halaman, heading semantik, internal link penting, metadata SEO, canonical, structured data yang relevan, dan URL yang dapat dirayapi harus tetap tersedia/valid pada mobile.
- Menghilangkan hamburger/menu tradisional diperbolehkan hanya jika seluruh navigasi penting tetap mudah ditemukan pengguna dan dapat diakses/crawl melalui link HTML yang sesuai.
- Jangan menyembunyikan atau menghapus konten SEO penting pada mobile hanya untuk membuat UI terasa seperti aplikasi.
- Mobile dan desktop tidak boleh memiliki perbedaan konten utama yang mengubah intent halaman atau menghilangkan informasi yang diperlukan untuk pencarian organik.
- Service worker/caching PWA tidak boleh menyebabkan Googlebot menerima konten usang, shell kosong, error offline, atau konten yang berbeda secara tidak disengaja dari pengalaman web utama.
- Core Web Vitals dan performa mobile menjadi acceptance gate: fitur PWA, animasi, font, gambar, dan JavaScript tidak boleh menambah beban yang secara material merusak LCP, INP, CLS, atau usability.
- Setiap perubahan besar mobile/PWA wajib melalui regression SEO: crawl/index accessibility, title/meta, canonical, robots directives, sitemap bila relevan, heading hierarchy, internal links, structured data bila ada, responsive rendering, Core Web Vitals/performance, dan tidak ada horizontal overflow.
- PWA tidak boleh diklaim sebagai faktor ranking langsung. Sasaran proyek adalah pengalaman mobile yang lebih baik tanpa merusak fondasi SEO, sambil meningkatkan kualitas konten, performa, dan kemudahan penggunaan yang mendukung pertumbuhan organic search.
- Target "halaman satu Google" adalah sasaran bisnis, bukan jaminan hasil. Tidak boleh ada klaim ranking pasti.

**LOCK RULE:** Jika perubahan desain, navigasi, PWA, atau implementasi teknis berpotensi menurunkan crawlability/indexability atau menghapus konten/link penting, perubahan tersebut **BLOCKED** sampai tersedia solusi yang menjaga SEO. SEO preservation memiliki prioritas lebih tinggi daripada kosmetik visual.


## Mobile Service Selector — LOCKED (17 Oktober 2026)

**Status: LOCKED untuk responsive mobile. Desktop tidak diubah oleh keputusan ini.**

### Struktur layanan

Urutan layanan mobile ditetapkan menjadi:

1. **Travel Shuttle**
2. **Airport Transfer**
3. **Sewa Mobil** — menggantikan nama/layanan UI **Charter Drop**.
4. **Sewa Motor** — layanan baru pada selector utama.

### Arah visual selector mobile

- Selector layanan mobile mengikuti **pola layout referensi Klook yang telah disetujui**: deretan kartu layanan besar dengan ikon di atas dan label di bawah, lalu panel/form pencarian berada langsung di bawah selector.
- Target kesesuaian visual mencakup komposisi, proporsi, spacing, ukuran kartu, posisi ikon dan label, active/inactive state, serta hubungan visual kartu aktif dengan panel form di bawahnya.
- Kartu aktif berwarna putih dengan border merah 1px dan notch putih dangkal di bawah kartu. Kartu nonaktif memakai putih beropacity 0,86, teks gelap, dan border transparan 1px. Border-box semua kartu tetap identik; peek kartu tetangga disengaja hanya di dalam rail. Ukuran dan perilaku terbaru mengikuti bagian LOCKED / FINAL — Mobile Header & Service Selector.
- Empat layanan tetap dapat diakses pada viewport mobile; bila ruang tidak cukup, selector boleh menggunakan horizontal scrolling yang jelas tanpa menyebabkan overflow halaman.
- Branding, logo, ikon, copy, warna, foto, dan aset tetap milik **SINGARAJA TRANS**; referensi Klook dipakai untuk pola UI/layout, bukan untuk menyalin aset merek.
- Pemilihan layanan mengganti form/konteks pencarian di panel bawah tanpa mencampurkan hasil pencarian ke Beranda.
- **Sewa Motor** disiapkan sebagai entry point layanan rental; integrasi engine/backend ditentukan pada spesifikasi teknis terpisah.

### SEO guardrail

Selector adalah kontrol UI dan **bukan heading SEO**. Implementasi tidak boleh mengubah hierarchy semantik halaman yang telah ditetapkan, menghapus konten/link penting dari mobile, atau melanggar **SEO & PWA — LOCKED CONSTRAINT**. Bila implementasi visual bertentangan dengan crawlability, indexability, semantic content, internal navigation, atau performa, SEO preservation tetap memiliki prioritas lebih tinggi.


---

## Mobile Header & Permukaan Konten Saat Scroll — LOCKED (18 Oktober 2026)

**Status: desain dan perilaku disetujui pengguna.** Bagian ini menjadi acuan desain, implementasi, dan regression berikutnya untuk area paling atas mobile saja (`max-width:767px`). Desktop dan tablet mulai 768px tetap menggunakan implementasi existing. Jika spesifikasi sebelumnya berbeda, ketentuan bagian ini berlaku khusus untuk treatment header/surface mobile ini; radius widget, kartu, dan komponen lain tidak ikut berubah.

### Desain yang ditetapkan

- Header mobile merah menggunakan sudut luar bawah **0px**. Tidak boleh terlihat celah/lapisan putih di belakang sudut bawah kiri dan kanan menu.
- Warna header, latar akar halaman di belakang surface, dan `theme-color` browser selaras dengan warna implementasi yang disetujui: **#C85759**. Pil putih pencarian dan pilihan bahasa tetap dipertahankan.
- Saat header auto-hide karena scroll turun, **permukaan konten yang benar-benar sedang di-scroll** memiliki radius **24px pada kiri atas dan kanan atas**, sedangkan kedua sudut bawah **0px** (`24px 24px 0 0`).
- Radius tetap berada pada tepi atas viewport pada berbagai posisi scroll, termasuk rute populer, layanan, dan bagian bawah halaman; tidak hanya terlihat di hero.
- Merah terlihat secara alami di luar kedua lengkungan. Konten yang terlihat tetap konten asli tanpa tertutup lapisan tambahan.
- Saat scroll ke atas menampilkan kembali header, radius surface kembali ke **0px** secara halus. Durasi transisi existing **0,26 detik, ease** dipertahankan.
- Perilaku auto-hide/show, fokus keyboard, kontrol header, dan scroll existing harus tetap bekerja. Jangan mengubah tinggi/menu header, hero, selector layanan, widget booking, atau konten hanya untuk efek sudut ini.

### Acuan implementasi dan larangan

Baseline yang disetujui: commit `d51ddcc01865fbfc920858d03db2366793d0dbe8` pada repository resmi `singarajatrans/singarajatrans-web`, branch `main`. Implementasi menggunakan `html` sebagai latar merah dan `body` sebagai surface scroll mobile berukuran viewport; `body.header-hidden` mengatur radius. JavaScript menyelaraskan state tersebut dengan `#header.is-hidden`. Implementasi ini dipertahankan kecuali ada instruksi perubahan eksplisit.

- Jangan mengembalikan fixed white topper/strip, termasuk `body.header-hidden #main::before`.
- Jangan membuat bar merah tambahan, dua kotak merah di sudut, atau overlay/pseudo-element dekoratif untuk memalsukan radius.
- Jangan menumpuk override di atas eksperimen lama; perbaiki rule sumber yang relevan dan pertahankan satu implementasi final.
- Header dan pembungkus menu tidak memiliki border/shadow yang membuat garis putih pemisah dari sisi halaman. Pertahankan posisi header tepat di tepi atas viewport saat tampil.
- Garis tipis milik toolbar **Chrome/browser** berada di luar DOM/CSS situs. Pada baseline yang disetujui, garis tersebut tidak dihapus; ini adalah batas kendali browser yang diterima, bukan pekerjaan CSS yang diklaim selesai. Jangan menutupinya dengan overlay, mengubah branding, atau mengarang dukungan browser. Keselarasan `theme-color` dan warna halaman tetap dipertahankan.

### Acceptance dan regression berikutnya

1. Uji live mobile **375px, 390px, dan 430px** dengan scroll/touch turun dan naik di beberapa kedalaman halaman sampai bagian bawah, bukan hanya hero.
2. Pastikan header tersembunyi saat turun, kembali saat naik, radius atas 24px saat tersembunyi, dan radius surface 0px saat header kembali tampil.
3. Pastikan celah putih di belakang menu, white strip/topper, seam dari halaman, artificial corner boxes, dan overlay tambahan tidak muncul. Pisahkan temuan antarmuka browser dari render halaman.
4. Periksa transisi, clipping, z-index, horizontal overflow, flicker, target sentuh, fokus, refresh, perubahan tinggi viewport, dan resize melintasi breakpoint.
5. Pertahankan layout/style desktop/tablet pada **768px, 1024px, dan 1440px**; lakukan regression layanan, form, dropdown, kalender, validasi, bahasa, dan dialog bila implementasi terkait berubah.
6. SEO/PWA, heading semantik, metadata, internal link, konten penting, pemisahan hasil pencarian dari Home, dan larangan tombol swap tetap mengikuti constraint LOCKED sebelumnya. Tidak ada perubahan backend/API/database/routing untuk treatment ini.
7. Setelah perubahan implementasi: commit ke `main`, tunggu deployment sukses, verifikasi render dan interaksi pada live, lalu laporkan status, file/perubahan, verification/regression, commit SHA, deploy status/duration, dan finish time. Source/CI PASS saja tidak cukup.

**Catatan bukti:** baseline implementasi diverifikasi live pada 17 Oktober 2026; pengguna menyatakan hasil sempurna dan menyetujui pencatatannya pada 18 Oktober 2026. Persetujuan ini hanya mengunci treatment mobile di atas, bukan menyatakan seluruh produk telah diaudit ulang melalui perubahan dokumen ini.


---

## LOCKED / FINAL — Mobile Header & Service Selector

**Tanggal:** 18 Oktober 2026 (WITA). **Status: implementasi, deployment, pengujian live, audit visual, dan regression PASS.** Baseline header: commit `25f69d823ea648de588e29ec6b24e2b1d338f9f6`. Refinement carousel final: commit `c2bb76d1bcce3997ad2c7b6c8d041674ccfd9909`, repository resmi `singarajatrans/singarajatrans-web`, branch `main`; CSS/booking memakai versi asset `mobile-carousel-9`, modul header tetap `mobile-header-selector-7`.

Bagian ini menjadi sumber final untuk scope **mobile sampai 767px** dan menggantikan detail header/selector mobile lama yang berbeda. Tidak mengubah scope atau aturan desktop/tablet, booking business logic, backend/API/database, routing, SEO/PWA, hero, footer, FAQ, kartu rute, atau area LOCKED lain. Penggantian konteks hero melalui state layanan existing tetap bekerja; tidak ada redesign hero.

### 1. Header dan ukuran final

| Elemen | Implementasi final |
|---|---|
| Urutan | Animated search → flag aktif → share |
| Header | Tinggi 60px, padding vertikal 10px, sisi 16px, gap 6px; brand merah `#C85759` |
| Search | Tinggi 40px, radius 20px, flex mengisi ruang terbesar, padding sisi 10px; ikon cari 17px |
| Kontrol kanan | Container lingkaran identik 40 × 40px, gap 6px |
| Optik ikon kanan | Flag bulat 20px; share dalam SVG 24px dengan area gambar sekitar 20px; pusat dan alignment sama |
| Konten lain | Tidak ada logo/nama tambahan di luar search, hamburger, dropdown bahasa, atau tombol WhatsApp tambahan di header mobile |

### 2. Opening dan animated search

- Setiap pembukaan Home Mobile menampilkan simbol logo resmi dari `assets/images/logo.png` dan teks **SINGARAJA TRANS** di dalam search. Logo mempertahankan proporsi asli; tidak diganti dengan ikon mobil atau aset merek lain. Simbol ditampilkan melalui viewport crop aset resmi tanpa mengubah file logo.
- Branding ditahan **3.000ms**, lalu mobil kecil yang terpisah bergerak **kanan → kiri selama 1.500ms** dengan easing lembut tanpa bounce.
- Posisi mobil dan batas `clip-path` branding dihitung dari progress yang sama: bagian di belakang mobil terhapus **secara progresif**, bukan disembunyikan sekaligus. Mobil terpotong di area copy search dan opacity masuk/keluarnya halus; tidak melintas menutupi ikon cari.
- Setelah wipe, prompt berganti setiap **2.800ms**: Cari Travel Shuttle → Cari Airport Transfer → Cari Sewa Mobil → Cari Sewa Motor → Cari rute, kota, atau tujuan…; lalu loop prompt saja. Pergantian prompt memakai fade/translate vertikal 3px selama 0,24 detik.
- Klik, sentuhan/pointer, keyboard, fokus search, atau wheel menghentikan autoplay. Pergantian bahasa menerjemahkan prompt tanpa memulai opening lagi. Halaman tersembunyi atau perpindahan ke desktop membatalkan timer/RAF; resize kembali tidak menduplikasi listener atau mengulang opening.
- `prefers-reduced-motion:reduce` langsung menampilkan prompt umum tanpa opening/wipe/loop/fade; carousel berpindah instan. Tidak memakai library animasi tambahan.
- Search tetap berupa link semantik dengan nama aksesibel yang sesuai konteks; visual animasi tidak diumumkan terus-menerus oleh screen reader.

### 3. Shortcut, bahasa, dan share

- Klik empat prompt layanan memicu kontrol tab existing, lalu scroll/fokus widget layanan yang sama. Travel/Airport/Sewa Mobil memfokuskan field asal; Sewa Motor memfokuskan CTA informasi existing, tanpa mengarang engine atau ketersediaan.
- Klik prompt umum/branding mengarah ke kontrol pencarian yang relevan untuk layanan aktif. Tidak membuat state booking atau hasil pencarian kedua di Home.
- Bahasa memakai dua tombol/state `data-language` existing dan fungsi translate existing: hanya flag aktif yang terlihat, klik langsung ID ↔ EN. Aset flag Indonesia/UK berasal dari repository. Tidak menambah `/en`, redirect, atau sistem routing baru. Aktivasi melalui keyboard mempertahankan fokus pada flag yang baru aktif; Tab berpindah langsung dari kontrol bahasa menuju Share.
- Share menggunakan `navigator.share` dalam interaksi pengguna. Jika tidak tersedia/gagal selain pembatalan pengguna, gunakan Clipboard API; sukses menampilkan centang sementara selama 2,4 detik dan status aksesibel. Jika clipboard tidak tersedia/ditolak, dialog ringan menampilkan URL readonly yang dapat dipilih/disalin manual.
- Pembatalan native share tidak memaksa fallback. Dialog dapat ditutup melalui tombol, Escape, atau backdrop; fokus kembali ke tombol Share, termasuk setelah dialog existing lain pernah dibuka. Pointer/touch di konten melepas fokus kontrol header agar auto-hide tetap berjalan, sementara perlindungan fokus keyboard dipertahankan. Judul dialog adalah label UI, bukan heading SEO tambahan.

### 4. Empat kartu dan geometri carousel

- Urutan tetap **Travel Shuttle → Airport Transfer → Sewa Mobil → Sewa Motor**. Semua merupakan tab kontrol UI, bukan heading SEO.
- Keempat kartu selalu sama width, height, radius, border-box, padding, area ikon/label, gap dan alignment. Panjang label tidak mengubah geometri. Tidak ada scale pada kartu aktif.
- Tinggi **88px**, radius **16px**, padding **10px 6px 9px**, gap **4px**, border **1px**, area label minimum **28px**. Active: putih, teks merah gelap, border merah utama, bayangan ringan dan **notch putih** di bawah; inactive: putih opacity 0,86, teks gelap dan border transparan. Notch memakai area gambar **26 × 10px**, dengan overlap putih 3px untuk menutup border bawah kartu. Kurva simetris memiliki border merah **1px** yang menyambung dengan border kartu, ujung membulat sekitar 6,5px di luar border-box, tanpa garis melintang pada sambungan atau indikator garis di dalam kartu. SVG dekoratif lokal `assets/images/service-notch.svg` memakai putih dan merah brand yang sama. Border-box kartu tetap identik pada semua state.
- Ikon layanan menggunakan simbol repository: bus, pesawat, sedan, motor. Area layout dasar **24 × 24px**, stroke 2, posisi pusat sama. Koreksi optik konstan per bentuk: bus scaleX 1,08; sedan 1,12 × 1,04; motor scaleX 0,9; pesawat default. Koreksi ini berlaku untuk active/inactive dan tidak mengubah ukuran kartu/area label.
- Referensi refinement: **233843.mp4** untuk perbandingan existing dan **233844.mp4** untuk notch, gap, hubungan panel, peek, serta gerakan kontekstual. Hanya struktur/interaksi yang diacu; warna, ikon, logo dan aset SINGARAJA TRANS dipertahankan.
- Rail selebar viewport, padding sisi **16px**, gap horizontal **8px**, padding atas 4px dan bawah **14px**. Lebar kartu adalah `floor((viewport − 32px) × 0,28)` dalam CSS pixel. Tiga kartu utuh disertai peek kartu keempat; pada ujung berlawanan, kartu pertama mengintip dari kiri.
- Jarak border-box kartu ke panel **14px**, dengan sekitar **8px** ruang antara ujung notch dan panel. Margin atas panel 0; isi, padding, warna dan radius panel tidak diubah oleh refinement ini.

| Viewport QA | Lebar setiap kartu | Tinggi setiap kartu | Tepi luar kartu pertama/terakhir saat dipilih | Peek kartu tetangga pada ujung rail |
|---|---:|---:|---:|---:|
| 360px | 91px | 88px | 16px | 47px |
| 390px | 100px | 88px | 16px | 50px |
| 412px | 106px | 88px | 16px | 54px |

- Rail tetap finite: tidak membuat clone/reorder layanan atau infinite loop. Klik langsung memilih layanan dan menjalankan smooth horizontal scroll. Keempat layanan memiliki landing berbeda: `target = (scrollWidth − clientWidth) × index / 3`, dengan index 0–3 sesuai urutan layanan. Pada 390px targetnya 0/22/44/66px. Memilih Sewa Mobil setelah Sewa Motor wajib menggeser rail kembali, begitu pula setiap perpindahan ke layanan tetangga. Active tidak dipaksa ke tengah; memilih layanan yang sama tidak menggeser rail tanpa alasan.
- Swipe memakai scroll native tanpa mandatory snap ke awal kartu, karena snap tersebut menggabungkan landing layanan tengah dengan ujung rail. Scroll-padding dan padding sisi tetap simetris. Setelah pemilihan, kartu aktif termasuk kartu pertama/terakhir terlihat utuh. **Peek kartu tetangga yang terpotong di tepi rail disengaja** sesuai instruksi terbaru; pengecualian ini hanya berlaku pada carousel layanan, bukan form atau halaman. Swipe dan keyboard tetap dapat dipakai tanpa horizontal page overflow.
- `setService` existing tetap menjadi satu sumber state layanan, `aria-selected`, tabIndex, body dataset, label panel dan form. Search shortcut memicu tab existing; tidak menduplikasi business logic. Fokus keyboard tidak memicu scroll browser yang bertentangan dengan scroll rail.

### 5. Perlindungan perilaku dan verifikasi

- Header auto-hide/show existing dipertahankan. Surface konten asli tetap menggunakan radius **24px 24px 0 0** saat header tersembunyi, kembali **0px** saat tampil; transisi surface 0,26 detik tetap berlaku.
- Tidak ada celah putih di sudut bawah header, topper/white strip, artificial red corner boxes, overlay pemalsu radius, atau bar merah tambahan. Batas tipis toolbar native Chrome tetap merupakan batas browser yang diterima pada spesifikasi sebelumnya.
- Implementasi mobile berada pada media query mobile dan modul JS ber-guard breakpoint. Desktop/tablet mulai 768px mempertahankan tampilan dan perilaku existing.
- Bukti live pada `https://singarajatrans-web.pages.dev/`: **360/390/412px** lolos opening ±3 detik, mobil kanan→kiri dan wipe progresif, lima shortcut, ID/EN, jalur native share (stub tanpa mengirim keluar), clipboard asli, fallback manual, empat tab, geometri identik, optical alignment, smooth/snap, first/last card, tepi simetris, sinkronisasi widget, touch scroll sampai bagian bawah, header show/hide, refresh/resize, fokus, reduced motion, overflow, dan console error.
- Desktop **768/1024/1440px** diperiksa terhadap baseline sebelum pekerjaan: geometri dan style seluruh elemen terlihat sama, ditambah review screenshot. Regression booking, layanan, validasi, bahasa, dialog, tanggal, resize/refresh serta 19 assertion tarif/tanggal/jam/kapasitas lolos.
- Revisi carousel `c2bb76d` menggantikan detail notch/landing `dc18238` berdasarkan gambar **233862.jpg** dan video **233863.mp4**. Sebelumnya notch tidak memiliki stroke dan overlap-nya terlalu dangkal; target Sewa Mobil/Motor sama-sama terjepit di ujung rail. Implementasi baru telah deploy sukses dan diverifikasi LIVE di **360/390/412px**: pemeriksaan pixel sambungan putih tanpa seam dan border kurva merah, review screenshot DPR 3, tap nyata Motor → Mobil → Airport → Shuttle dan arah sebaliknya, landing berbeda, geometri identik, peek, swipe native, keyboard, widget sync, scroll/header pada tiga kedalaman, refresh dan reduced motion. Tidak ada page overflow atau console error. Hash CSS/JS/SVG live pada Cloudflare dan GitHub Pages sama dengan source baru. Regression booking/responsive 320/360/390/412/768/1024/1440px dan 19 assertion tarif/tanggal/jam/kapasitas PASS. Desktop LIVE 768/1024/1440px memiliki geometri/style sama dengan baseline `b976611` dan screenshot telah direview. Header, branding, booking business logic dan SEO/PWA tidak diubah.
- Heading HTML utama tetap sama dengan baseline; metadata, robots, manifest, mesin tarif, routing, konten/tautan penting, pemisahan hasil pencarian dan larangan swap dipertahankan. CSS dan JS live dicocokkan dengan source commit untuk menghindari cache lama.

**Revisi eksplisit 18 Oktober 2026:** tombol aksi sementara/grid setelah flag dihapus dari header mobile atas permintaan pengguna. Header final menjadi **Animated search → flag aktif → Share**; tidak ada placeholder action di antara flag dan Share. Perubahan ini tidak menambah fungsi pengganti dan tidak mengubah desktop, booking logic, SEO/PWA, atau service selector.

**LOCK:** Jangan mengubah mobile header atau service selector final ini tanpa instruksi eksplisit. Pekerjaan berikutnya harus membaca bagian ini dan mempertahankan scope lain yang LOCKED. Jika perubahan diotorisasi: audit sumber/cascade → perubahan minimum → pengujian viewport/state terkait → commit/deploy → tunggu sukses → audit live dan regression → update PRD. CI/source PASS saja tidak cukup untuk menyatakan FINAL.
