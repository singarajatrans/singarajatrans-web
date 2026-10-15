# Acuan website SINGARAJA TRANS

## Scope saat ini

Website pelanggan desktop dan mobile; tablet adaptif. Repository resmi `singarajatrans/singarajatrans-web`, branch `main`. Website WordPress dan domain lama tetap aktif. Dashboard, PWA, driver dan migrasi domain ditunda.

## Arah visual yang disepakati

- Merah #D84E55, putih #FFFFFF, latar abu muda #F7F7F7, teks #303030.
- Tombol utama merah gelap #B8323B untuk keterbacaan teks putih; merah utama menjadi aksen.
- Identitas logo resmi dipertahankan sesuai aset; bukan diwarnai ulang.
- Minimalis, profesional, radius moderat, bayangan ringan dan spacing konsisten.
- Desktop: pencarian horizontal. Mobile: ikon tab di atas nama layanan, field tersusun nyaman, widget radius luar 16px.
- Tanpa tombol tukar asal/tujuan, mengikuti keputusan terakhir.
- Rute populer kembali berupa kartu ringkas dengan harga “Mulai dari”, bukan kartu hasil pencarian.
- Pilihan mobil hasil pencarian horizontal, gambar kiri dan detail kanan, satu kolom ke bawah.
- Urutan beranda: header, hero/pencarian, rute populer, layanan, keunggulan/profil, inspirasi wisata, ulasan, FAQ, footer.
- Footer desktop empat kolom; mobile accordion; aksen gelombang tipis di atas footer.

## Konten dan semantik

Satu H1; H2 untuk bagian utama; H3 untuk item di dalamnya. HTML heading hanya H1–H6. Tidak menggunakan heading untuk sekadar mengatur ukuran font. Jangan mengarang harga, jadwal, sisa kursi, rating, testimoni, sertifikasi, nomor booking atau status pembayaran.

## Alur dan batas

Pencarian → hasil tarif/jadwal publikasi → data pemesan, alamat jemput/tujuan, catatan → tinjau → permintaan WhatsApp admin. Data pencarian tetap terbawa. Tanpa konfirmasi transaksi palsu. Harga/shuttle dikalikan jumlah orang; privat per mobil. Waktu Bali UTC+8. Jadwal lewat tidak ditawarkan.

Target sistem berikutnya: booking dan pembayaran dari satu sumber data, Cek Booking dengan kode + nomor WhatsApp; aturan reschedule shuttle yang dibahas (sekali, tanpa biaya admin, maksimal enam jam sebelum keberangkatan pertama dan sebelum penjemputan) memerlukan validasi backend. Belum aktif dalam website ini dan tidak diberlakukan untuk Charter Drop.

## Verifikasi sebelum FINAL/LOCKED

Implementasi, deploy sukses, tes live, audit visual desktop/mobile/tablet dan state penting, regression. Hasil CI saja tidak cukup untuk menyatakan visual final. Area dan desain lama di repository yang sudah dihapus bukan source kode proyek baru ini.
