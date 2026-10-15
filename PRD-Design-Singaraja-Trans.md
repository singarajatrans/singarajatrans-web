# PRD Desain — SINGARAJA TRANS

**Versi:** 1.0  
**Status:** Acuan desain dan implementasi UI  
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

| Peran | Warna | Penggunaan |
|---|---:|---|
| Merah utama | `#D84E55` | CTA utama, tab aktif, harga penting, aksen |
| Merah gelap | `#B8323B` | Hover/pressed CTA |
| Merah sangat muda | `#FFF1F2` | Latar aksen, status ringan |
| Teks utama | `#1F2937` | Judul dan informasi utama |
| Teks sekunder | `#6B7280` | Label, deskripsi, metadata |
| Border | `#E5E7EB` | Field, kartu, divider |
| Latar halaman | `#F7F7F7` | Section dan halaman hasil |
| Putih | `#FFFFFF` | Kartu, form, header |

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

- Logo tetap jelas dan proporsional.
- Navigasi ringkas melalui menu hamburger atau menu terkontrol.
- Tombol/ikon harus memiliki target sentuh minimum 44px.
- Header tidak boleh menutupi dropdown, kalender, atau popover.

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

- Header ringkas dengan tinggi visual 56–64px, tidak termasuk safe-area.
- Logo berada di kiri dan tidak boleh terpotong atau melebar tidak proporsional.
- Kontrol bahasa `ID / EN` tetap terlihat di header; tidak memakai menu `Masuk`.
- Tombol menu, kembali, atau WhatsApp memiliki area sentuh minimal 44 × 44px.
- Menu terbuka sebagai drawer/panel yang berada di atas konten dengan overlay; panel tidak boleh bertabrakan dengan dropdown form.
- Header boleh sticky, tetapi tidak boleh menutupi fokus field, kalender, hasil filter, atau CTA.

### 11.4 Hero mobile

- Hero tidak memakai tagline tambahan. Area pencarian digeser lebih atas dan tampil floating dengan jarak bawah yang seimbang terhadap section berikutnya.
- Hero tidak lebih tinggi dari yang diperlukan untuk memperkenalkan layanan dan menampilkan awal widget.
- H1 memakai 28–32px, line-height 1.15–1.25, maksimal tiga baris pada layar 320px.
- Deskripsi memakai 16px dan maksimal tiga baris; hindari paragraf panjang.
- Gambar hero adalah elemen pendukung. Jika ruang sempit, prioritas tetap pada judul dan widget pencarian.
- Jarak dari hero ke widget harus konsisten; widget tidak boleh tertutup gambar atau overlap dengan section berikutnya.

### 11.5 Tab dan widget pencarian

- Tiga tab memenuhi lebar wadah dan tetap terbaca pada viewport 375px.
- Tinggi target tab minimal 44px; label dapat 12–14px tetapi tidak boleh terpotong.
- Setiap tab memakai ikon di atas teks: Travel Shuttle, Airport Transfer, dan Charter Drop.
- Indikator tab aktif memakai merah utama dan tidak menyebabkan perubahan tinggi atau pergeseran layout.
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
