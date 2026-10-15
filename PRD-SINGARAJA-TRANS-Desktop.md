# PRD SINGARAJA TRANS — Website Desktop

**Versi:** 1.1 · 15 Oktober 2026  
**Status:** Draf kebutuhan dan konsep desain, untuk ditinjau.  
**Cakupan:** Website publik untuk pelanggan; konsep desktop dan kesesuaian mobile.  
**Bahasa utama:** Indonesia; pilihan Inggris disediakan dalam rancangan.

## 1. Tujuan dan batas pekerjaan

Menyusun acuan desain website SINGARAJA TRANS agar pelanggan dapat mencari perjalanan, membandingkan pilihan, memesan, dan memeriksa booking dengan alur yang jelas. Desktop memakai keputusan konsep mobile terbaru sebagai acuan, dengan susunan yang disesuaikan untuk layar lebar.

Dokumen ini adalah spesifikasi desain. Dokumen ini tidak menyatakan sistem sudah dibangun, terhubung ke data operasional, diuji, atau siap produksi. Tidak ada instruksi membuat repository, commit, deployment, maupun mengubah website aktif.

**Termasuk:** struktur halaman, navigasi, komponen pencarian, hasil pencarian, pemesanan, konfirmasi, Cek Booking, Ubah Jadwal shuttle, keadaan kosong/error/loading, dan kriteria penerimaan desain.

**Di luar cakupan:** implementasi backend, API, database, autentikasi, RBAC, dashboard admin/driver, integrasi pembayaran, migrasi WordPress, domain/hosting, SEO teknis, serta integrasi B-K Rent. Perubahan mobile dan area website aktif yang sudah LOCKED tidak diotorisasi oleh PRD ini.

## 2. Keputusan yang menjadi acuan

| Area | Acuan yang sudah disepakati |
|---|---|
| Arah visual | Merah, putih, abu-abu, terinspirasi kombinasi warna redBus; identitas tetap SINGARAJA TRANS |
| Layanan | Travel Shuttle, Airport Transfer, Charter Drop |
| Charter Drop | Mobil privat sekali jalan, tarif per mobil/perjalanan |
| Alternatif shuttle | Tampilkan Charter Drop saat kursi shuttle tidak mencukupi; pelanggan memilih sendiri |
| Kartu mobil | Foto di kiri, detail di kanan; daftar kartu turun ke bawah |
| Kartu rute populer | Versi foto dengan harga Mulai dari dan tombol Pilih Rute; versi kartu hasil pencarian dibatalkan |
| Widget terbaru | Sudut luar lebih lembut; tombol tukar panah dihapus; jarak dan tipografi diseimbangkan |
| Footer konsep | Empat kolom desktop, susunan adaptif mobile, aksen gelombang merah muda tipis |
| Revisi foto | Pembesaran foto mobil ditunda, tidak menjadi syarat versi pertama |
| Ubah jadwal shuttle | Satu kali, tanpa biaya admin, paling lambat enam jam sebelum keberangkatan pertama, penjemputan belum dimulai |
| Ketersediaan baru | Jadwal masih menerima booking dan kursi mencukupi |
| Kursi lama | Dilepas setelah perpindahan berhasil |
| COD setelah perubahan | Mengikuti tarif baru |
| Tahap kerja sekarang | Konsep/PRD; belum memberi izin implementasi repository |

Susunan desktop dan ukuran komponen pada bagian berikut adalah **usulan desain**, bukan hasil persetujuan visual final. Aturan Ubah Jadwal shuttle tidak otomatis berlaku untuk Airport Transfer atau Charter Drop.

## 3. Pengguna dan kebutuhan utama

- **Pelanggan shuttle:** mencari kursi untuk rute, tanggal, dan jumlah penumpang tertentu; melihat jadwal serta harga per kursi.
- **Pelanggan transfer bandara:** memilih perjalanan privat dari/ke bandara sesuai lokasi dan jumlah penumpang.
- **Pelanggan Charter Drop:** mencari mobil privat sekali jalan dengan harga total per mobil yang jelas.
- **Pelanggan yang sudah memesan:** melihat status, detail perjalanan, pembayaran, bantuan, dan pilihan ubah jadwal shuttle jika memenuhi syarat.

Pelanggan harus selalu dapat membedakan layanan sharing dan privat, satuan harga, status pesanan dan pembayaran, serta apakah data yang ditampilkan merupakan simulasi.

## 4. Arah visual desktop

### 4.1 Palet awal

| Elemen | Warna usulan | Penggunaan |
|---|---|---|
| Aksen utama | `#D84E55` | Tab aktif, aksen merek, elemen penekanan |
| Merah gelap | `#B8323B` | Kandidat tombol dengan teks putih dan keadaan hover; wajib cek kontras |
| Putih | `#FFFFFF` | Header, form, kartu |
| Abu muda | `#F7F7F7` | Latar bagian halaman |
| Teks utama | `#303030` | Judul, nilai form, informasi penting |
| Teks sekunder | `#626262` | Keterangan dan informasi pendukung |
| Garis pemisah | `#E7E7E7` | Border dan divider |
| Hijau | Ditentukan saat desain | Status tersedia/berhasil; selalu disertai teks |

Palet adalah acuan internal desain; bukan klaim hasil pemeriksaan CSS aktif redBus. Jangan menyalin logo, aset, atau keseluruhan desain redBus. Arah merah menggantikan aksen emas hanya pada konsep baru ini.

### 4.2 Geometri dan keterbacaan

- Usulan lebar konten maksimum 1.200 px, terpusat; gutter menyesuaikan layar.
- Gunakan satu keluarga font yang jelas dan konsisten; Inter dengan fallback sistem dapat dipertimbangkan saat implementasi ditentukan.
- Usulan teks isi 16 px, label/keterangan 14 px, judul bagian 28–32 px, headline hero 40–48 px. Sesuaikan berdasarkan render, bukan angka semata.
- Gunakan spacing konsisten, misalnya kelipatan 8 px; radius sedang dan shadow ringan.
- Teks panjang boleh membungkus tanpa memotong harga, tombol, atau informasi perjalanan.
- Keadaan aktif, focus, error, dan disabled harus jelas; warna bukan satu-satunya pembeda.

## 5. Struktur beranda

Urutan berikut menjadi usulan pertama untuk mockup desktop.

| Urutan | Bagian | Isi dan perilaku |
|---|---|---|
| 1 | Header | Logo resmi, navigasi ringkas, bahasa dengan bendera ID/EN, tombol Cek Booking |
| 2 | Hero | Headline dua baris “Pesan perjalanan Bali / lebih mudah”, deskripsi singkat, foto resmi yang disetujui |
| 3 | Pencarian | Tiga tab layanan dan form horizontal; menjadi tindakan utama pada layar awal |
| 4 | Rute populer | Rute operasional yang sudah diverifikasi; tarif hanya jika sumber resmi tersedia |
| 5 | Pilihan layanan | Penjelasan singkat perbedaan shuttle, transfer bandara, dan Charter Drop |
| 6 | Inspirasi Wisata Bali | Kartu foto, nama destinasi, lokasi dan deskripsi ringkas; konten/foto diverifikasi sebelum produksi |
| 7 | Keunggulan | Manfaat faktual; hindari klaim, angka, atau penghargaan tanpa bukti |
| 8 | Ulasan | Hanya ulasan nyata dengan sumber/izin yang sesuai; jangan membuat rating simulasi seolah nyata |
| 9 | FAQ | Pertanyaan pemesanan, penjemputan, pembayaran, serta ubah jadwal sesuai kebijakan |
| 10 | Footer | Identitas perusahaan, kontak resmi, navigasi bantuan, kebijakan yang sudah ditetapkan |

**Usulan menu:** Beranda, Layanan, Rute & Jadwal, Bantuan. Navigasi desktop dan perilaku sticky/auto-hide perlu ditinjau sebagai desain baru; jangan mengubah header aktif yang LOCKED berdasarkan PRD ini.

Hero tidak boleh membuat form pencarian sulit ditemukan. Foto, logo, dan kontak resmi belum dipilih ulang di dokumen ini; gunakan hanya aset yang sudah disetujui atau tandai sebagai placeholder saat mockup.

## 6. Pencarian perjalanan

### 6.1 Susunan layanan

| Layanan | Input utama | Satuan harga pada hasil | Tombol |
|---|---|---|---|
| Travel Shuttle | Asal, tujuan, tanggal, jumlah penumpang; pilihan waktu mengikuti kebutuhan jadwal | Per kursi/orang, serta total untuk jumlah penumpang yang dipilih | Cari Tiket |
| Airport Transfer | Arah dari/ke bandara, lokasi jemput/tujuan, tanggal, jam, jumlah penumpang | Per mobil/perjalanan | Cari Mobil |
| Charter Drop | Alamat/lokasi jemput, tujuan, tanggal, jam, jumlah penumpang | Per mobil/perjalanan | Cari Mobil |

Tiga tab berada di atas form. Pada mobile, ikon berada di atas nama layanan. Tombol tukar panah tidak ditampilkan sesuai revisi terakhir. Shuttle diusulkan memakai satu baris field utama dan tombol di kanan. Form privat boleh menggunakan baris tambahan untuk alamat panjang dan jam agar tidak dipaksakan sempit.

Jika pulang-pergi ditampilkan, kebutuhan tanggal kembali dan ketersediaan layanan harus diputuskan terlebih dahulu; jangan menampilkan kontrol yang belum memiliki alur jelas.

### 6.2 Interaksi

- Pergantian tab menampilkan form layanan yang dipilih tanpa mengubah tinggi/lebar komponen secara mengganggu.
- Label tetap terlihat setelah input terisi; placeholder hanya sebagai contoh.
- Asal dan tujuan harus jelas, tidak boleh kosong atau sama jika tidak didukung layanan.
- Tanggal/jam lampau tidak boleh dipilih; aturan batas pemesanan mengikuti kebijakan operasional yang masih perlu ditetapkan.
- Jumlah penumpang harus berada dalam kapasitas yang didukung.
- Dropdown, kalender, dan popover tidak mendorong layout, tertutup header, atau terpotong container.
- Jika lokasi perangkat tersedia dalam desain, tampilkan loading, penolakan izin, lokasi tidak tersedia, dan fallback input manual. Detail integrasi tidak termasuk PRD ini.
- Saat kembali dari hasil pencarian, input sebelumnya tetap tersedia sesuai rancangan alur.

## 7. Hasil pencarian

### 7.1 Shuttle

Kartu rute populer di beranda tetap berupa kartu foto, rute, label layanan, harga Mulai dari beserta satuannya, dan tombol Pilih Rute; bukan kartu hasil pencarian.

Pada halaman hasil pencarian terpisah, bagian atas memuat ringkasan pencarian dan tindakan Ubah Pencarian. Setiap kartu menampilkan jam keberangkatan, estimasi tiba/durasi jika datanya tersedia, asal/tujuan, fasilitas yang benar-benar tersedia, harga per kursi, total, status kursi, dan tombol Pilih Kursi.

Pemilihan nomor kursi/denah kendaraan belum diputuskan. Jangan mengarang denah, kapasitas, atau jumlah kursi tersisa. Jika pilihan kursi bukan bagian produk, label CTA perlu disesuaikan pada review berikutnya.

### 7.2 Alternatif mobil privat

Alternatif ditampilkan ketika jumlah kursi pada jadwal yang relevan tidak mencukupi permintaan. Jangan menampilkan pesan penuh bersamaan dengan hasil yang sebenarnya masih mencukupi.

**Teks acuan:**

> Belum menemukan jadwal shuttle yang sesuai.
>
> Kursi untuk [jumlah penumpang] penumpang pada jadwal pilihan belum tersedia. Anda bisa pilih tanggal lain atau lanjut dengan mobil privat.

**Tindakan:** Pilih Tanggal Lain dan Lihat Charter Drop.

Rute, tanggal, dan jumlah penumpang dibawa ke pencarian Charter Drop. Pelanggan melengkapi alamat atau jam yang belum tersedia, memilih mobil, lalu mengonfirmasi sendiri. Tidak ada pengalihan layanan, pemesanan, atau perubahan harga secara otomatis.

### 7.3 Airport Transfer dan Charter Drop

Kartu mobil horizontal: foto di kiri; nama kendaraan, kapasitas, fasilitas, status ketersediaan, harga, dan tombol Pilih Mobil di kanan. Daftar tetap satu kolom agar pilihan mudah dibandingkan.

Harga harus dinyatakan **per mobil/perjalanan**. Apabila tarif belum dapat dihitung, tampilkan kebutuhan melengkapi data atau meminta penawaran; jangan menampilkan total final palsu atau langsung menyatakan booking terkonfirmasi.

Status ketersediaan dan jumlah unit hanya boleh ditampilkan jika didukung data. Foto mobil tidak boleh berubah proporsi atau mengaburkan tipe kendaraan.

## 8. Alur pemesanan dan konfirmasi

**Alur utama:** Pencarian → hasil → pilih perjalanan/mobil → detail pemesanan → tinjau pesanan dan pembayaran → konfirmasi → hasil pemesanan.

Data pencarian tidak perlu diisi ulang. Detail pemesanan mencakup identitas layanan, pilihan perjalanan/mobil, alamat jemput dan tujuan, tanggal/jam, jumlah penumpang, nama pemesan, nomor WhatsApp, rincian harga, dan metode pembayaran yang benar-benar tersedia.

Usulan desktop: form di kiri dan ringkasan harga di kanan; ringkasan dapat sticky selama tidak menutup tombol atau footer. Sediakan Kembali/Edit sebelum konfirmasi.

Untuk COD, tombol utama **Konfirmasi Pesanan** dengan keterangan pembayaran kepada sopir. Metode pembayaran selain COD, syarat deposit, dan cara verifikasi pembayaran belum ditentukan.

Halaman hasil menampilkan kode booking, status aktual pesanan, status pembayaran, ringkasan perjalanan, dan akses Cek Booking. Jangan menyamakan “permintaan diterima” dengan “terkonfirmasi” jika operasional masih memerlukan pemeriksaan.

Saat proses gagal, data form dipertahankan dan pelanggan mendapat pilihan mencoba lagi. Klik berulang tidak boleh menghasilkan pesanan ganda; spesifikasi teknis penanganannya menjadi pekerjaan implementasi terpisah.

## 9. Cek Booking dan Ubah Jadwal

### 9.1 Cek Booking

Rancangan awal memakai kode booking dan nomor WhatsApp pemesan. Detail ditampilkan setelah kombinasi cocok. Ini adalah rancangan akses, **bukan keputusan final mekanisme keamanan**; validasi server, perlindungan percobaan berulang, dan kemungkinan OTP perlu dibahas sebelum produksi.

Halaman menampilkan status pesanan dan pembayaran secara terpisah, layanan, rute, alamat, tanggal/jam, jumlah penumpang, total biaya, bantuan resmi, dan tindakan yang memang diperbolehkan.

Jika data tidak cocok, gunakan pesan umum: “Pesanan belum ditemukan. Periksa kembali kode booking dan nomor WhatsApp.” Jangan membocorkan detail pesanan melalui pesan error.

### 9.2 Aturan ubah jadwal shuttle

1. Berlaku satu kali untuk booking yang memenuhi syarat.
2. Tanpa biaya administrasi.
3. Paling lambat enam jam sebelum **keberangkatan pertama**; batas tidak dihitung ulang dari jadwal pengganti.
4. Penjemputan belum dimulai.
5. Jadwal pengganti masih menerima booking dan kursi cukup untuk seluruh penumpang dalam booking.
6. Kursi lama tetap tersimpan sampai perpindahan berhasil. Jika gagal, booking lama tetap berlaku.
7. COD mengikuti tarif baru. Selisih tarif harus ditampilkan sebelum pelanggan mengonfirmasi.
8. Untuk pembayaran lunas, kekurangan dibayar; mekanisme pembayaran tambahan dan pengembalian kelebihan belum ditentukan.

**Alur:** Detail booking → Ubah Jadwal → pilih jadwal tersedia → tinjau jadwal lama/baru dan selisih tarif → konfirmasi → hasil perubahan.

Jika tidak memenuhi syarat, tombol dinonaktifkan dan alasannya terlihat: batas waktu lewat, sudah pernah diubah, atau penjemputan dimulai. Bantuan tetap dapat diakses. Aturan untuk layanan privat belum diputuskan.

## 10. Keadaan UI yang wajib dirancang

| Komponen | Keadaan yang harus tersedia |
|---|---|
| Form pencarian | Kosong, terisi, focus, input tidak valid, loading, gagal |
| Lokasi | Loading, berhasil, izin ditolak, tidak tersedia, input manual |
| Hasil shuttle | Tersedia, kursi kurang, tidak ada jadwal, gagal memuat |
| Hasil mobil | Tersedia, tidak tersedia, tarif belum dapat dihitung |
| Pemesanan | Data kurang, tinjau, sedang diproses, berhasil, gagal, percobaan ulang |
| Cek Booking | Awal, loading, tidak cocok, berhasil, layanan tidak tersedia |
| Ubah Jadwal | Memenuhi syarat, batas lewat, penjemputan dimulai, sudah dipakai, jadwal penuh, konfirmasi, berhasil, gagal |

Pada mockup, semua harga, nama pemesan, kode booking, dan status simulasi wajib ditandai. Jangan mengklaim pemesanan atau perubahan nyata terjadi.

## 11. Responsive, aksesibilitas, dan audit

Usulan pengujian desktop: 1.024, 1.280, 1.366, 1.440, dan 1.920 px. Lebar 1.024 px dipakai untuk menemukan kebutuhan adaptasi; breakpoint akhir ditentukan setelah melihat desain nyata. Tablet/mobile di luar perubahan tahap ini, tetapi harus dicatat jika rancangan desktop menimbulkan kebutuhan lanjutan.

**Audit desain mencakup:** layout, alignment, ukuran, spacing, warna, border, radius, shadow, tipografi, ikon, label/placeholder/nilai, hover, focus, active, disabled, error, dropdown, kalender, jam, modal, popover, scroll, clipping, overflow, z-index, refresh, resize, dan layout shift.

Navigasi keyboard harus jelas, urutan fokus masuk akal, dialog mengelola fokus, form berlabel, dan pesan error terkait field. Usulan target sentuh/tombol utama minimal 44 px. Kontras teks dan kontrol harus diperiksa terhadap WCAG AA saat visual dibuat.

## 12. Kriteria penerimaan

- [ ] Identitas SINGARAJA TRANS dan palet konsep terbaru konsisten di seluruh halaman desktop.
- [ ] Tiga layanan dapat dibedakan dari nama, field, satuan harga, dan alurnya.
- [ ] Pencarian menjadi tindakan utama yang mudah ditemukan di beranda.
- [ ] Harga per kursi dan per mobil tidak tertukar; total mengikuti jumlah penumpang/layanan.
- [ ] Alternatif Charter Drop muncul pada kondisi relevan tanpa mengalihkan pelanggan otomatis.
- [ ] Kartu mobil mempertahankan foto kiri, detail kanan, dan daftar satu kolom.
- [ ] Input sebelumnya terbawa saat pindah langkah atau kembali mengedit.
- [ ] Semua keadaan UI pada bagian 10 memiliki rancangan yang bisa diperiksa.
- [ ] Batas enam jam memakai jadwal pertama dan seluruh syarat Ubah Jadwal terlihat jelas.
- [ ] Kegagalan perpindahan mempertahankan jadwal lama; konfirmasi memperlihatkan selisih tarif.
- [ ] Tidak ada harga, kontak, ulasan, ketersediaan, atau klaim operasional yang dibuat-buat.
- [ ] Tidak ada overflow, overlap, clipping, atau perubahan layout yang mengganggu pada viewport desktop yang diperiksa.
- [ ] Focus, hover, disabled, dan error dapat dibedakan; keyboard dan kontras telah diperiksa.
- [ ] Mobile, area LOCKED, serta sistem existing tidak diubah tanpa izin khusus.
- [ ] Persetujuan mockup tidak dinyatakan sebagai implementasi/deployment atau kesiapan produksi.

## 13. Keputusan yang masih diperlukan

| Topik | Belum diputuskan |
|---|---|
| Aset | Logo final, foto hero desktop, foto armada, serta sumber ulasan |
| Operasional | Rute, jadwal, kapasitas, cakupan jemput/antar, batas booking, cara menghitung tarif |
| Harga privat | Komponen biaya, biaya tambahan, termasuk/tidak termasuk, aturan bagasi |
| Shuttle | Pemilihan nomor kursi, layanan pulang-pergi, penanganan booking banyak penumpang |
| Pembayaran | Metode selain COD, pelunasan selisih, pengembalian kelebihan tarif |
| Kebijakan | Pembatalan, refund, no-show, perubahan Airport Transfer/Charter Drop |
| Status | Pesanan langsung terkonfirmasi atau perlu pemeriksaan ketersediaan |
| Akses booking | Kebutuhan OTP, perlindungan data, masa berlaku akses |
| Desktop | Komposisi hero final, ukuran komponen, perilaku header dan ringkasan sticky |
| Infrastruktur | Akun GitHub resmi, repository baru, hosting dan integrasi; dibahas terpisah |

Keputusan yang belum tersedia harus tetap diberi penanda pada mockup. Jangan mengisi kekosongan dengan kebijakan atau angka seolah sudah disetujui.

## 14. Tahap berikutnya

1. Tinjau PRD dan selesaikan keputusan yang menghalangi desain.
2. Buat mockup desktop beranda: header, hero, dan pencarian.
3. Tinjau hasil pencarian shuttle serta mobil privat.
4. Tinjau alur pemesanan, konfirmasi, Cek Booking, dan Ubah Jadwal.
5. Audit visual seluruh scope dan keadaan penting, lalu minta persetujuan desain.
6. Implementasi hanya dimulai dengan instruksi terpisah, scope jelas, dan repository resmi yang sudah ditentukan.

**Selesai untuk tahap PRD** berarti dokumen telah disusun dan dapat ditinjau. **FINAL/LOCKED untuk produk** tetap memerlukan implementasi, deployment, verifikasi live, audit visual, dan regression sesuai scope; belum berlaku pada dokumen ini.


## 15. Acuan UI, hierarki heading, dan sumber resmi

Ketentuan berikut menjadi acuan konsep desain dan implementasi HTML pada tahap pembangunan. Ini bukan pernyataan bahwa tag heading atau aksesibilitas telah diterapkan di website aktif. Jika angka tipografi usulan sebelumnya berbeda, gunakan acuan bagian ini sebagai keputusan terbaru.

### Struktur heading yang ditetapkan

| Tingkat | Elemen halaman | Teks/acuan |
|---|---|---|
| H1 | Judul utama beranda; satu H1 dipilih sebagai pola proyek | Pesan perjalanan Bali lebih mudah |
| H2 | Bagian rute | Rute populer |
| H3 | Judul kartu rute | Singaraja ke Denpasar; Singaraja ke Gilimanuk; Bandara ke Singaraja |
| H2 | Bagian layanan | Pilihan layanan |
| H3 | Nama layanan | Travel Shuttle; Airport Transfer; Charter Drop |
| H2 | Bagian wisata | Inspirasi Wisata Bali |
| H3 | Nama destinasi | Ulun Danu Bratan; Lovina; Ubud; Tanah Lot |
| H2 | Bagian ulasan | Ulasan pelanggan |
| H2 | Bagian FAQ | Pertanyaan yang sering diajukan |
| H3 | Pertanyaan FAQ | Setiap pertanyaan; kontrol buka-tutup menjadi tombol di dalam heading saat dibangun |

- Tidak memakai H7; HTML menyediakan H1–H6.
- H4–H6 hanya jika ada subbagian yang membutuhkannya, bukan untuk mengecilkan font.
- Label Asal, Tujuan, Tanggal dan Penumpang menggunakan label form, bukan heading.
- Tab layanan dan CTA menggunakan kontrol semantik yang sesuai, bukan heading.
- Logo/nama merek di header tidak mengulang H1 halaman.
- Footer menggunakan kelompok navigasi berlabel; heading mengikuti konteksnya, tidak dipaksa menjadi anak FAQ.
- Versi mobile dan desktop memiliki susunan isi yang sama; hindari duplikasi heading akibat menggandakan seluruh DOM untuk setiap perangkat.
- Judul halaman, meta description, URL, internal link, alt foto, dan pengindeksan diperiksa terpisah saat pembangunan; tidak dinyatakan selesai melalui mockup.

### Hierarki visual yang dipilih untuk proyek

Angka berikut merupakan pilihan desain proyek, bukan ukuran wajib dari Google.

| Elemen | Desktop | Mobile |
|---|---|---|
| H1 | 40–48 px, bobot 700 | 28–32 px, bobot 700 |
| H2 | 28–32 px, bobot 700 | 22–24 px, bobot 700 |
| H3 | 18–20 px, bobot 600 | 16–18 px, bobot 600 |
| Teks isi/nilai field | 16 px | 16 px |
| Label/keterangan | 14 px; keterangan tersier dapat 12 px jika tetap terbaca | 14 px; keterangan tersier dapat 12 px jika tetap terbaca |
| Jarak baris teks isi | Sekitar 1,5 | Sekitar 1,5 |
| Jarak label ke kontrol | 8 px | 8 px |
| Jarak field/tombol yang berdekatan | 12–16 px | 12–16 px |
| Padding kartu | 16–24 px | 16 px |
| Jarak antarbagian | 40–56 px | 24–32 px |
| Area klik kontrol utama | Minimal 44 × 44 CSS px sebagai sasaran proyek | Minimal 44 × 44 CSS px sebagai sasaran proyek |

Ukuran akhir perlu diperiksa pada render nyata. Spacing mengikuti skala konsisten kelipatan 4/8, bukan angka acak. Pertahankan kartu rute populer versi foto, harga Mulai dari, tombol Pilih Rute, ikon tab mobile di atas teks, penghapusan tombol tukar, dan footer dengan aksen gelombang.

### Persyaratan pemeriksaan

- Kontras teks normal minimal 4,5:1; teks besar minimal 3:1 sesuai definisi WCAG.
- Ukuran target minimum WCAG 2.2 AA adalah 24 × 24 CSS px dengan pengecualian yang dijelaskan sumber. Sasaran proyek 44 × 44 CSS px mengikuti kriteria enhanced, bukan klaim bahwa AA selalu mewajibkan 44 px.
- Ikon dapat lebih kecil dari area klik; area kontrol tidak boleh saling bertumpuk.
- Focus keyboard terlihat; label, error dan keadaan aktif tidak dibedakan hanya melalui warna.
- Periksa susunan heading pada DOM, keterbacaan, keyboard, zoom, clipping, overflow, dan seluruh keadaan form setelah website dibangun.
- Jangan menyatakan PASS aksesibilitas, peningkatan ranking, atau FINAL/LOCKED hanya dari gambar mockup.

### Dasar sumber resmi

1. [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): konten mudah dibaca, pembagian bagian dan heading yang membantu navigasi. Urutan heading bukan jaminan ranking; struktur semantik tetap berguna untuk aksesibilitas.
2. [W3C WAI — Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/): heading merepresentasikan susunan isi dan tingkat subbagian.
3. [W3C WCAG 2.2 — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): ambang kontras teks dan pengecualiannya.
4. [W3C WCAG 2.2 — Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): kriteria AA dan pengecualian target kecil.
5. [W3C WCAG 2.2 — Target Size Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced): acuan target 44 × 44 CSS px.
6. [Material Design — Spacing Methods](https://m2.material.io/design/layout/spacing-methods.html): referensi sistem spacing 4/8; bukan persyaratan Google Search.

Seluruh sumber diperiksa pada 15 Oktober 2026. Dokumen membedakan standar aksesibilitas, panduan Search, dan keputusan desain internal.
