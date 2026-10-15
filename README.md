# SINGARAJA TRANS — Website

Website pelanggan responsif, dibangun ulang di akun resmi `singarajatrans`.

## Menjalankan

Tidak memerlukan build, npm, framework, atau backend.

```sh
python3 -m http.server 4173
```

Buka `http://localhost:4173`. Pemeriksaan referensi tarif: `node tests/core.test.cjs`.

## Isi dan perilaku

- Beranda desktop, tablet, mobile; merah, putih, abu-abu.
- Tiga layanan: Travel Shuttle, Airport Transfer, Charter Drop.
- Pencarian rute, tanggal, waktu WITA, penumpang, tarif publikasi.
- Tarif shuttle per orang; charter/airport per mobil, dengan kapasitas airport yang sesuai.
- Form detail → tinjau → tautan permintaan WhatsApp. Tidak mengirim otomatis.
- Cek Booking mengarahkan permintaan verifikasi ke admin lewat WhatsApp.
- Rute populer dapat digeser dan mengisi pencarian; FAQ dan footer mobile accordion; ID/EN.
- Header disembunyikan bersama saat scroll turun dan muncul saat scroll naik.

## Batas implementasi

Belum ada backend booking, inventori kursi/armada langsung, gateway pembayaran, kode booking otomatis, akun pelanggan, perubahan jadwal otomatis, dashboard, PWA, atau aplikasi driver. Tidak menyimpan data pribadi ke localStorage. Pengisian form belum membuat transaksi. Admin mengonfirmasi harga, ketersediaan, dan pembayaran lewat WhatsApp. Jangan menampilkan data fiktif atau mengklaim booking berhasil sebelum sistem terintegrasi.

Preview memakai `noindex` dan `robots.txt: Disallow: /`; belum ada perubahan domain atau hosting WordPress. Saat migrasi produksi, verifikasi konten/tarif, domain, canonical, URL lama dan redirect, sitemap serta kebijakan sebelum melepas noindex.

## Deployment

`.github/workflows/pages.yml` memeriksa JavaScript, tarif, dan interaksi Chromium di 320/390/768/1024/1440px, menyimpan screenshot sebagai artifact `visual-review`, lalu deploy ke GitHub Pages. Aktifkan **Settings → Pages → Source → GitHub Actions** di repository. Tidak ada custom domain.

## Sumber konten (diverifikasi 15 Oktober 2026)

- Kontak, perusahaan, logo, foto armada: https://www.singarajatrans.com/
- Tarif dan jadwal shuttle/charter: https://www.singarajatrans.com/tarif-jadwal-travel/
- Airport transfer dan kapasitas: https://www.singarajatrans.com/airport-transfer/
- Ulun Danu: https://www.indonesia.travel/gb/en/destination/bali-nusa-tenggara/bali/bali---ulun-danu-beratan
- Lovina: https://www.indonesia.travel/id/en/destination/bali-nusa-tenggara/bali/bali---lovina-beach
- Jatiluwih: https://www.indonesia.travel/id/id/destination/bali-nusa-tenggara/bali/bali---jatiluwih

Gambar destinasi: Indonesia Travel, dikompresi ke WebP. Foto armada bersifat ilustrasi pilihan kendaraan. Jika halaman resmi berisi angka yang berbeda, dataset memakai halaman Tarif & Jadwal, bukan ringkasan homepage. Informasi airport menjadi tarif acuan untuk pengajuan kedua arah; tarif akhir dikonfirmasi admin. Ulasan mengarah ke pencarian Google Maps tanpa membuat rating atau testimoni sendiri.
