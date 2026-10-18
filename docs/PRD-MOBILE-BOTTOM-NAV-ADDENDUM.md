# PRD Addendum — Mobile Bottom Navigation

Tanggal: 18 Oktober 2026
Status: Spesifikasi disetujui; implementasi visual belum termasuk perubahan ini.
Referensi: video pengguna `235182.mp4`.

## Scope
Hanya bottom navigation versi mobile SINGARAJA TRANS. Tidak mengubah desktop, backend, API, routing, booking logic, komponen LOCKED, maupun branding.

## Persyaratan visual dan interaksi
1. Tinggi total bottom bar, ukuran ikon, label, padding, dan jarak antar-menu harus dicocokkan secara visual dengan video referensi. Angka piksel tidak ditetapkan sebelum pengukuran referensi dan live render.
2. Saat tab dipilih, ikon aktif berganti warna dengan animasi transisi halus; bukan perubahan warna instan.
3. Ikon aktif menampilkan aksen/partikel kecil di sekeliling ikon seperti referensi. Efek berpindah mengikuti tab aktif, tidak menetap pada tab sebelumnya.
4. Ikon tidak aktif menggunakan gaya outline netral; active state hanya pada tab yang dipilih.
5. Periksa bentuk ikon tiap menu, termasuk Wishlist (simbol hati/love) dan Akun, terhadap referensi; jangan mengasumsikan bentuk tambahan yang tidak terverifikasi.
6. Posisi bottom bar tetap stabil saat scroll, tidak tertutup safe area/gesture bar, dan tidak menyebabkan horizontal overflow.
7. Pertahankan perilaku navigasi dan label yang sudah ada; perubahan ini hanya mengatur visual, tinggi, dan animasi.
8. Hormati prefers-reduced-motion; animasi tidak boleh menghalangi tap atau membuat layout shift.

## Kriteria penerimaan
- Bandingkan video referensi dan rekaman live mobile untuk state idle, tap tiap tab, perpindahan active state, dan scrolling.
- Uji viewport 320, 360, 390, 412 px, termasuk safe area dan overflow.
- Verifikasi interaksi tiap tab, icon/label alignment, animasi warna/aksen, serta regresi header dan carousel tanpa mengubah area tersebut.
- Hanya nyatakan FINAL setelah live visual audit dan regresi lulus.
