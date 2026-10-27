# SINGARAJA TRANS — Mobile/PWA Master Design

Tanggal: **27 Oktober 2026, WITA**. Owner: **Agent 1 — Design Lead**.
Status: **Spesifikasi sintesis final untuk review dan sumber implementasi setelah approval; produk BELUM FINAL/LOCKED.** Tidak ada implementasi atau persetujuan deploy dalam dokumen ini. Gate visual/perangkat pada §13 harus lulus sebelum produk dinyatakan FINAL/LOCKED.

## 1. Baseline, otoritas, dan scope

Repository resmi: `singarajatrans/singarajatrans-web`. Baseline: `main` terbaru hasil fetch/pull, **`d96ee6b0fb7d901f90b761ca5315f3ffa39d6830`**. Empat laporan specialist mengaudit source produksi `055c204c1a7d3e9bb60dd3916c18269786bcd520`; selisih ke baseline master hanya menambahkan keempat laporan, sehingga fakta source produksinya tetap relevan.

Sumber yang dibaca, berurutan menurut otoritas: instruksi pengguna aktif; [AGENTS.md](../AGENTS.md); [role Agent 1](agents/01-design-lead.md); [Home Mobile V2](home-mobile-v2.md) tanggal 27 Oktober; [DESIGN.md](../DESIGN.md); [PRD](../PRD-Design-Singaraja-Trans.md) dan [addendum nav](PRD-MOBILE-BOTTOM-NAV-ADDENDUM.md). Input sintesis: [Agent 2/UI](design-sprint/02-mobile-ui-report.md), [Agent 3/UX](design-sprint/03-ux-interaction-report.md), [Agent 4/PWA](design-sprint/04-pwa-experience-report.md), [Agent 5/QA](design-sprint/05-visual-qa-report.md). Source terarah: `index.html`, stylesheet aktif `assets/mobile-reference.css`, aturan terkait di `assets/style.css`, dan entry booking `assets/mobile-home-v2.js`; fakta engine/PWA lainnya mengikuti bukti source specialist.

Master ini menetapkan satu keputusan dari baseline V2, bukan desain kelima. Jika rekomendasi specialist berbeda, keputusan §2 berlaku untuk implementasi mobile. Observasi existing bukan target desain bila master menetapkan koreksi eksplisit.

- Scope presentasi/interaksi: **0–767 CSS px**, browser dan installed PWA memakai komponen yang sama.
- **Desktop dan tablet >=768px LOCKED**, termasuk warna, layout, header, booking, navigasi, ukuran dan perilaku. Guard berlaku juga ketika rotasi melewati 768px.
- Backend, API, database, auth, RBAC, routing/query, dataset, tarif, jadwal, business logic booking, resolver lokasi dan alur WhatsApp tidak diubah. Tidak ada fitur akun, pembayaran, tracking atau transaksi baru.
- Fase ini menulis **hanya dokumen ini**; produksi HTML/CSS/JS, manifest/SW, tes, workflow dan laporan specialist tidak disentuh. Approval master tetap diperlukan sebelum implementasi; push dokumen bukan approval implementasi.
- SEO/semantik tetap mengikuti PRD: satu H1, hierarchy H2/H3, konten/link HTML penting, metadata/canonical/robots dan intent URL existing dipertahankan. Jangan memulihkan header/hero lama sebagai cara menjaga heading. Temuan noindex staging bukan izin mengganti robots.

## 2. Keputusan konflik yang mengikat

| Konflik / sumber | Keputusan final mobile | Konsekuensi implementasi |
|---|---|---|
| PRD/DESIGN merah vs V2 sea/ocean blue + orange | V2 menang: sea-blue shell, orange aksen; logo resmi tidak diwarnai ulang | Merah hanya error semantik. Desktop tetap palet baseline sendiri. |
| Animated search/globe/share, carousel selector dan hero lama vs Home V2 | Lokasi + bell, search putih + kontrol orange; empat shortcut sejajar; form collapsed | Tidak mengembalikan opening logo, hamburger, carousel/notch, device mockup atau hero dekoratif lama. |
| Lima nav/64px/tanpa pill/partikel dari PRD/addendum vs V2 | Empat: Beranda → Favorit → Perjalanan → Akun; minimum 70px + inset, satu active surface | Jelajah tidak tampil. Tidak ada partikel, bounce, duplikasi pill atau tab layanan baru. Aset ikon existing dipakai. |
| Skala PRD lama vs V2 terlalu kecil | Gunakan skala §3: H2 20, card 14, body 14, meta 12, field 16, nav 11 | Komposisi V2 tetap; tinggi konten bertambah wajar. Jangan mempertahankan font 8–10px demi screenshot lama. |
| Orange CTA deklaratif vs computed teal (Agent 2) | CTA booking **teal/putih**, kontrol buka search **orange/ink** | Hilangkan kelak shadow orange pada CTA teal. Harga/link memakai orange-text gelap; identitas orange tetap ada. |
| Custom dropdown/calendar PRD vs native source (Agent 3/5) | Pertahankan native select/date/time | Tidak membangun picker custom atau memaksa popup OS menyerupai mockup. UI OS dinilai usability, bukan pixel match. |
| Inline booking vs tampilan mirip sheet | Panel inline, bukan modal | Tidak ada backdrop/body lock/focus trap. Cek Booking dan detail/review tetap native modal existing. |
| Pulang Pergi selectable tetapi query hanya sekali jalan (UX-01) | Mobile menawarkan **Sekali Jalan**; Pulang Pergi ditampilkan **belum tersedia**, non-selectable, disertai penjelasan | Tanggal kembali tidak menjadi input booking aktif mobile. Ini keputusan affordance, bukan implementasi return engine. Jangan menjanjikan harga/jadwal pulang. Jangan mengubah desktop/serializer; deep-link tetap enam field existing. |
| DESIGN/PRD melarang swap tetapi source masih punya tombol (UX-10) | Mobile tidak menampilkan/menawarkan swap; asal dan tujuan diedit langsung | Pada implementasi berikutnya, sembunyikan target mobile dari visual dan Tab; handler/state engine dipertahankan. Tidak menghapus handler global atau mengubah pemetaan rute. |
| Passenger/filter waktu tersembunyi tetapi ikut query (UX-02) | Tampilkan kontrol existing dalam form, waktu Shuttle sebagai filter, bukan departure final | Tidak menambah opsi, batas kapasitas, harga atau aturan baru. |
| Airport card dapat memetakan ke Shuttle | Ikuti dataset/service mapping existing, tampilkan satuan dan label layanan yang benar | Shuttle ke bandara tetap per orang/kursi; Airport Transfer privat per mobil. Tidak memaksa semua bandara menjadi privat. |
| Favorit lokal vs halaman Favorit unavailable | Heart kartu tetap simpan lokal; nav Favorit/Akun tetap feedback unavailable | Tidak mengarang halaman/login/sinkronisasi. Jelaskan penyimpanan perangkat, bukan akun. |
| Agent 2 menyebut Trips aktif vs Agent 3 mempertahankan prior page | Dialog bukan halaman: `aria-current=page` tetap pada halaman sebenarnya; Trips hanya pressed/focus saat aktivasi | Setelah close fokus kembali pemicu, tidak membuat halaman atau pill aktif kedua. |
| Nav aria-disabled tetapi feedback dapat ditap | Perlakukan Favorit/Akun sebagai aksi informasi yang focusable, bukan tautan ke fitur aktif | Nama/description menyebut belum tersedia; aktivasi pointer, Enter/Space memberi status yang sama. Jangan memakai disabled yang memblokir feedback atau membuat route palsu. |
| Lokasi Bali ber-chevron tanpa aksi | Informasi statis, tanpa affordance chevron selector | Tidak menambah geolocation/notifikasi. Bell bernama Cek Booking, tanpa badge palsu. |
| Dua scroll owner lintas platform | Satu owner per platform: document native iOS; body scroller existing pada platform lain | Jangan menyatukan atau membuat dua scroll container global. Offset fokus dihitung pada owner yang aktif. |
| Nav saat keyboard: tetap vs sembunyi (Agent 4) | Tetap di dasar shell jika tidak menutupi input; jangan angkat nav di atas keyboard. Jika keyboard terbukti mengoklusi, sembunyikan sementara nav | Deteksi berbasis visual viewport/IME terverifikasi, bukan focus saja. Pulihkan setelah keyboard tutup tanpa reset/scroll jump. Native dialog sudah berada di atas nav. |
| PWA ditunda di DESIGN lama vs capability V2 existing | Audit/refine capability existing sebagai target setelah approval; website biasa tetap penuh | Tidak menambah arsitektur/aplikasi kedua. Manifest/SW masih tidak diedit pada fase ini. |

Keputusan non-selectable Pulang Pergi dan penghilangan affordance swap adalah koreksi UI mobile untuk selaras kemampuan existing/dokumen; tidak memberi izin mengubah engine. Jika implementasinya ternyata membutuhkan perubahan business logic/global behavior, pisahkan dependency dan hentikan bagian itu, bukan memperluas scope diam-diam.

## 3. Design system final

Semua angka adalah CSS px pada zoom 100%; min-height dan ukuran target adalah minimum, bukan batas yang memotong text scaling. Gunakan Inter yang sudah ada dengan fallback `system-ui, sans-serif`; tidak menambah font/dependency.

### 3.1 Warna canonical

| Token/peran | Nilai | Penggunaan |
|---|---|---|
| primary | `#0B7285` | Header, CTA teal, ikon layanan, teks active |
| primary-strong | `#075968` | Pressed CTA, fokus di surface terang |
| primary-soft | `#E6F5F7` | Satu active pill, selected/pressed surface |
| accent | `#FF8A4C` | Kontrol orange, dekorasi/star existing; bukan teks kecil pada putih |
| accent-text | `#B54708` | Harga, link/action di putih atau page neutral |
| paper / surface | `#F5F7F8` / `#FFFFFF` | Latar halaman / kartu |
| field-surface | `#F6F9FA` | Field existing |
| ink / muted | `#20272D` / `#52636B` | Teks utama / metadata, nav inactive dan bantuan |
| line | `#E6ECEE` | Divider/border surface dekoratif, bukan satu-satunya batas kontrol penting |
| control-line | `#7C898E` | Batas native field bila batas diperlukan untuk mengenali kontrol; uji >=3:1 |
| error / error-soft | `#B42318` / `#FEF3F2` | Error border, teks dan surface; selalu ada pesan |

Pasangan rujukan sRGB: primary/putih ≈5,59:1; accent-text/putih ≈5,43:1; muted/putih ≈6,26:1. Orange/putih ≈2,34:1 sehingga teks/ikon bermakna pada tombol orange memakai ink. Pasangan aktual termasuk gradient/foto/opacity wajib diukur lagi. Header boleh mempertahankan gradient V2 `#0B7285 → #0D8495` dan lingkaran putih transparan existing; teks putih harus lulus pada area gradient paling terang. Tidak memperbanyak variasi teal/orange per komponen.

### 3.2 Typography

| Peran | Size / line-height | Weight / aturan |
|---|---|---|
| H2 section | 20 / 26 | 700, tracking -0,2px; tidak hard-height |
| Heading booking / inspirasi | 18 / 24 | 600–700 |
| Card route/destination/review title | 14 / 20 | 600 |
| Harga | 14 / 20 | 700; satuan terpisah 12/16 |
| Body/review | 14 / 21 | 400 |
| Input/select/date/time/textarea | **16 / 24** | 400–500, cegah auto zoom iOS |
| Label/help/meta/action kecil | 12 / 16–18 | Label/action 600; bantuan 400 |
| Trigger search | 14 / 20 | 400–500, muted |
| Service label | 11 / 14 | 600; selected 700; label lengkap wrap |
| Bottom label | 11 / 14 | 600, visible semua item |
| CTA utama | 16 / 24 | 600 |
| Header lokasi | 15 / 22 | 600–650; eyebrow 12/18 |
| Eyebrow inspirasi | 11 / 16 | 600, tracking 0,5px |

H1 semantik existing dipertahankan, bukan menambah headline visual baru di shell Home. Tidak mengubah heading level untuk ukuran font. ID/EN dan fallback font harus diuji; 200% text enlargement tidak kehilangan aksi/data penting.

### 3.3 Spacing, radius, border, shadow, ikon

- Unit spacing: **4, 8, 12, 16, 24, 32**. Gutter16; section-gap24; heading→content12; card-gap12; internal gap8/12; panel padding16. Gap search tetap10 dan gap shortcut10 sebagai geometri baseline, bukan token baru untuk semua komponen.
- Radius: **field/search/CTA14**, **tile/card/nav-active16**, **inspiration/review18**, **booking/dialog20**. Foto inset11; header bawah28 mengikuti baseline. Tidak menambahkan capsule lain atau radius berlebih.
- Border surface1 line; selected service2 inset primary agar ukuran luar stabil. Native control boundary1 control-line jika dibutuhkan; invalid1 error + pesan. Tidak menghapus native affordance agar terlihat minimal.
- Satu shadow surface canonical: **`0 10px 30px rgba(20,63,72,.08)`**; bukan berlapis/colored glow. Nav boleh versi arah atas **`0 -10px 30px rgba(20,63,72,.08)`** + top border1. Header/search memakai kedalaman ringan dalam keluarga ini, tidak menambah stack shadow di setiap child. Hierarki terutama lewat spacing/type.
- Ikon: layanan aset/mask existing dalam box29 dengan optical bounds24–28; search18; orange action22; bell21; nav22; close20; glyph heart18. Ukuran target terpisah: **>=44×44**, search/CTA48 tinggi. Jangan mengganti library/aset ikon untuk mengikuti PRD lama.
- Focus-visible: ring2 primary-strong offset2 di terang; pada header teal gunakan ring putih2 dengan separator teal2. Inset jika ancestor clip. Ring penting >=3:1 terhadap warna bersebelahan; tidak hilang pada selected/error/forced colors. Jangan memakai outline putih di paper.

## 4. Hierarchy dan geometri responsive

Urutan Home: **header lokasi/bell → search → empat shortcut → booking inline bila dibuka → Pilihan Favorit dua kolom → Rute Populer image/list → inspirasi Bali → destinasi rail → review rail → bahasa/link/footer existing → ruang bebas nav**. Home idle tidak memaksa form terbuka atau seluruh favorit above fold. Hasil pencarian tetap halaman existing terpisah, tanpa section Home menyusup di daftar.

Berikut target baru dengan gutter16, gap favorite12 (baseline audit memakai10). Angka favorite adalah lebar luar kartu; tinggi auto, bukan tinggi lama214,6. Insets nonzero mengurangi ruang efektif menurut §9.

| Lebar | Content/panel W | Search W + gap10 + action48 | Service cell W (gap10) | Favorite W (gap12) | Nav item W* |
|---:|---:|---|---:|---:|---:|
| 320 | 288 | 230 + 10 + 48 | 64,5 | 138 | 68,5 |
| **360** | **328** | **270 + 10 + 48** | **74,5** | **158** | **78,5** |
| **390** | **358** | **300 + 10 + 48** | **82** | **173** | **86** |
| **412** | **380** | **322 + 10 + 48** | **87,5** | **184** | **91,5** |
| 430 | 398 | 340 + 10 + 48 | 92 | 193 | 96 |

*Nav memakai inset horizontal14, tiga gap6: `(W - 28 - 18)/4`. Saat safe-area kiri/kanan nonzero, gunakan inset aman dan hitung ulang; target minimal44 tetap wajib. Subpixel rounding <=1px dapat diterima.

- 320 tetap empat shortcut dan dua favorite columns; label layanan sediakan tiga baris, nama rute boleh >2 baris bila perlu. Tidak mengurangi font, menutup karakter, atau menjadikan grid satu kolom.
- 360/390/412 memakai sistem identik, bukan layout masing-masing. 430 menambah ruang, tidak memperbesar font/tile secara arbitrer. 431–767 mengalir dengan kolom dan gutter yang sama; tidak menambah breakpoint desain baru.
- Gunakan `minmax(0,1fr)`/min-width0 pada teks, wrap alami ID/EN; data penting tanpa silent ellipsis. Ellipsis hanya prompt search generik. Tidak ada document-level horizontal overflow; rail boleh scroll lokal dengan inset akhir16.
- 767→768: shell/nav mobile hilang, desktop baseline muncul; nilai booking tidak hilang. Tidak boleh ada override mobile bocor lewat root token global atau perubahan DOM bersama.

## 5. Header, search, service selector

### Header dan entry search

Header sea-blue sticky existing, baseline **172px** pada inset0 dan text normal, radius bawah28; tinggi boleh tumbuh untuk inset/text scaling. Pertahankan padding baseline26 atas/24 bawah, gap row18 dan gutter16. Dekorasi lingkaran noninteraktif tidak menangkap pointer dan tidak menutupi fokus. Lokasi Bali statis, bell44 membuka Cek Booking; tidak ada notifikasi/GPS palsu.

Search row: trigger putih tinggi48/r14/padding-inline14, ikon18/gap9; teks14/20 muted; action orange48×48/r14 ikon22 ink. Gap kedua kontrol10. Keduanya membuka **form yang sama**, bukan free-text search/filter baru. Accessible name: “Buka pencarian perjalanan” / “Open journey search”; bell “Cek booking” / “Check booking”. `aria-expanded` dan `aria-controls` sinkron dengan panel, tanpa kontrol tersembunyi masuk Tab.

Default mengikuti token; pressed primary-soft di trigger dan tone orange yang tetap kontras pada action, tanpa scale. Expanded tidak memindah/mengubah ukuran search. Header tidak boleh menutupi focused control (lihat §8); menaikkan z-index tab bukan solusi.

### Service selector

Empat kolom sama: Travel Shuttle, Antar Jemput Bandara, Sewa Mobil & Carter Drop, Sewa Motor; ID/EN memakai label existing. Tile putih62×58/r16; ikon29; seluruh item target >=44, tinggi baseline104 dan **auto/min104** jika label panjang/text scaling. Label11/14, gap visual ikon→label mengikuti baseline; setiap baris mengikuti tinggi label terpanjang. Tidak memotong label pada 320.

Idle/collapsed tidak menambah selected panel palsu. Saat panel open: service aktif memakai primary-soft, border2 inset dan weight700, state `aria-selected` sinkron. Pressed soft tanpa layout shift; focus ring terlihat di seluruh target. Native tablist menggunakan roving tabindex, panah kiri/kanan serta Home/End, panel berlabel tab aktif. Jangan membuka native picker secara otomatis. Motor membuka info unavailable dan CTA kontak nyata, bukan form/pilihan hasil fiktif.

## 6. Booking, hasil dan dialog

### Form inline

Satu `#search-panel`, putih/r20/border1/shadow canonical, padding16; margin atas10/bawah18 mengikuti baseline. Heading18/24 dan close44×44/glyph20/gap12; judul boleh wrap. Tinggi tidak dikunci379: tambahan penumpang, filter waktu dan error harus mengalir.

Urutan: mode yang tersedia + konteks layanan/WITA → asal → tujuan → tanggal pergi → Hari ini/Besok → waktu relevan → penumpang → Cari. Field satu kolom untuk seluruh 320–430; tinggi minimum48 dan auto untuk label+nilai16/24; padding12, gap12, label12/16 tetap terlihat. Pair asal/tujuan tetap mempertahankan label/IDs existing. Tidak ada swap mobile. Pulang Pergi unavailable mengikuti §2; hanya sekali jalan menjadi mode input aktif.

| Service | Kontrol/waktu | Kapasitas/satuan dan batas |
|---|---|---|
| Shuttle | Native asal/tujuan/date; filter waktu Semua/Pagi/Siang-Sore/Malam | Penumpang existing1–12 default1, harga per orang/kursi; jam departure final dipilih pada hasil |
| Airport Transfer | Native lokasi kedua arah airport, date, private time existing09:00 | Penumpang1–12, per mobil; validasi bandara existing tetap |
| Charter Drop | Native lokasi/date/private time existing | Penumpang1–6, per mobil; privat sekali jalan, bukan rental berdurasi/engine baru |
| Motor | Informasi belum tersedia dan kontak existing | Tidak ada submit, harga, jadwal, spinner atau kapasitas palsu |

Batas angka di tabel mendokumentasikan source; engine tetap otoritatif jika dataset resmi berubah. Date minimum hari Bali UTC+8, quick-date terikat satu nilai; cancel native picker mempertahankan nilai. Semua select/date/time tetap native. Tidak meniru kalender custom, tidak mengarang disabled date/kursi. CTA48/r14/teal-putih, full width, margin atas12, label sesuai layanan existing. Tidak ada sticky CTA kedua.

### Hasil dan detail/review

Hasil tetap route/query existing (`service/from/to/date/time/passengers`); tidak menambah param pulang pergi atau mengubah serializer. Ringkasan layanan, asal→tujuan, tanggal, WITA/filter dan penumpang mendahului Ubah Pencarian. Kartu hasil satu kolom, gambar kiri/detail kanan mengikuti DESIGN existing; title16/22, body14/21, harga16/24/700 dan satuan12/16, padding12, gap12/r16. Pada320 detail/CTA boleh mengalir ke baris berikutnya; foto tidak memaksa harga atau rute clip. Data/fasilitas/opsi hanya dari engine. CTA48, tidak mengubah handler.

Detail → review → link permintaan WhatsApp tetap existing; tidak menjanjikan pembayaran/booking terkonfirmasi. Harga Shuttle dikali penumpang dan privat per mobil tetap rule engine, tidak dihitung ulang di UI baru. Cek Booking tetap kode + WhatsApp → link verifikasi, bukan fetch status palsu. Mengubah input membatalkan link verifikasi lama sesuai baseline; membuka Cek Booking baru mengikuti reset existing, bukan janji persistensi search.

Native `<dialog>` tetap modal/top-layer di atas header/nav. Surface r20/padding16, lebar maksimum ruang aman viewport, max-height ruang visual viewport dikurangi margin12 atas/bawah dan inset; content dapat scroll, close44 dan CTA akhir dapat dicapai. Dialog tidak terpotong parent overflow. Focus trap/background inert native, Escape/close/backdrop existing dipertahankan, fokus kembali pemicu. Jangan membuat panel inline menjadi dialog atau mengunci body global lintas platform.

## 7. Sistem content cards dan navigation

### Favorite / route grid

Dua kartu awal, expand memakai dataset existing (saat audit8), grid dua kolom/gap12; card r16/border1/shadow canonical/frame6. Foto tinggi126/r11/object-fit cover, ruangnya direservasi sebelum load. Body padding10–12, gap8; title14/20/min-block40 dengan wrap **tanpa line-clamp data penting**; dua baris target, tambah baris bila nama belum lengkap. Height auto; pasangan satu row stretch sama tinggi. Lokasi12/16 muted. “Mulai dari”12/16 terlihat, harga14/20 accent-text, satuan12/16 dari data. Jangan mengubah nilai untuk layout.

Heart glyph18, target44×44 dalam baris aksi tersendiri di bawah harga agar 320 tidak berdesakan. Default outline, selected filled primary + `aria-pressed`; status “Disimpan di perangkat ini” / “Saved on this device” hanya setelah storage sukses. Gagal simpan memberi status jujur tanpa klaim permanen. Overlay route-select tidak menangkap tap heart atau menutupi ring; kedua target tidak nested/intersect. Tap card prefill dan buka form, tap heart hanya toggle. Expanded tetap semua data asli; Lihat semua44 minimum dan `aria-expanded`, fokus tetap tombol.

### Popular, inspirasi, destinasi, review

- Popular rows: satu kolom, r16, padding8, gap12; media104×80, min-height96/auto; title14/20, harga14/20, unit12/16, teks minmax(0,1fr). Satu target route existing, tanpa CTA dekoratif baru. Nama/rute/harga lengkap pada320.
- Inspirasi: split text/foto existing, r18/padding16/min-height138 auto, title18/24, eyebrow11/16, action12/18 accent-text. Jangan menambah promo/badge atau mengganti gambar/mask tanpa kebutuhan.
- Destinasi: rail existing, card46% area rail, gap12, r16, baseline tinggi168 dengan auto/grow jika pembesaran teks; padding12, title14/20/meta12/16. Scrim bawah cukup untuk putih>=4,5:1 pada tiap foto (starting point hitam65%, uji aktual). Seluruh foto tidak ditint berat. Focus inset terlihat, rail akhir inset16, tidak menyeret halaman horizontal.
- Review: rail satu card selebar content, gap12, r18/padding16/min-height178 auto, body14/21/title14/20/meta12/18, avatar44. Like dan indikator interaktif44×44 (dot visual boleh kecil). Jangan menambah count/rating/testimoni/verifikasi; gunakan data dan state existing. Indikator dekoratif noninteraktif tidak dibuat button.
- Heading section20/26 dan action12/18/target44, gap12 ke content. Pada320/EN action boleh pindah baris tanpa mengubah urutan baca; heading tidak dipaksa fixed height. Footer/legal/link existing tidak dihapus, bahasa12/18/target44. Floating WhatsApp mobile tetap tidak dimunculkan.

### Bottom navigation

Empat slot sesuai §2, inset horizontal14/gap6/padding atas7 bawah7+safe-bottom; minimum **70px sebelum safe-bottom**, tumbuh untuk font scaling. Ikon22/label11/14/gap4, semua label terlihat dan target>=44. Surface putih/top-border1/shadow atas canonical. Satu active layer primary-soft/r16 + icon/text primary; **tidak ada pseudo-pill kedua**. Inactive muted, pressed soft, focus inset2; semua ukuran stabil.

Urutan visual, baca dan keyboard harus Beranda→Favorit→Perjalanan→Akun, bukan hanya CSS `order` yang berbeda dari Tab. Implementasi nanti wajib mobile-guard tanpa mengubah urutan desktop; bila perlu sentuh DOM bersama, buktikan desktop identik sebelum diterima. Tidak menggandakan navigasi semantik/fokus.

Home mengikuti link existing. Perjalanan/bell membuka dialog existing tanpa memindah route/active page. Favorit/Akun mengumumkan “belum tersedia” sesuai bahasa tanpa mengaktifkan halaman palsu. Favorit kartu tidak hilang karena menu belum tersedia. Jangan mengganti logo/ikon dengan aset PRD/addendum lama.

## 8. Interaction dan state contract

| Komponen/state | Respons final | Fokus/data/recovery |
|---|---|---|
| Home load | Booking collapsed; tanpa autofocus | Hidden panel keluar Tab; tidak memunculkan keyboard |
| Search/orange/service open | Satu panel; ARIA expanded/selected sinkron | Search ke asal; service ke field relevan, Motor ke info. Satu focus/scroll sesudah open |
| Route open / edit hasil | Route prefill existing / enam field dipulihkan | Route fokus tanggal; Edit field relevan. Tidak auto-submit/auto-open picker |
| Close/reopen | Hidden/open tanpa reset DOM values | Close kembali pemicu terakhir, fallback search jika node hilang; bukan history entry |
| Service change | setService/normalisasi existing | Tidak menjanjikan draft per-service; cap/default/opsi engine utuh |
| Default/filled | Label tetap, nilai terbaca | Tidak menghilangkan label saat input terisi |
| Selected | Border/weight/filled glyph + ARIA | Tidak hanya warna; ukuran/hitbox sama |
| Pressed | Soft/tone contrast 120–180ms | Tanpa scale/bounce, tidak trigger ganda |
| Focus-visible | Ring §3 pada semua aksi/field/radio | Full target/ring terlihat; tidak ditutup sticky header atau nav |
| Disabled nyata | Neutral/muted, alasan teks, tidak aktif | Ikuti availability existing; jangan disabled aksi yang tersedia |
| Unavailable info | Feedback sopan, tidak pindah halaman | Dapat diakses pointer/keyboard/screen reader sesuai §2; bukan disabled palsu |
| Invalid | Border/error-soft + pesan12/18 dekat field | Rule/urutan existing; aria-invalid/describedby, fokus invalid pertama sekali, semua nilai utuh |
| Error pasangan lokasi/waktu | Pesan tepat pada field terkait | Marker hilang hanya setelah rule terpenuhi, bukan sembarang ketik |
| Submit valid/loading nyata | Busy + cegah aktivasi berulang selama navigasi nyata | Tidak timer/skeleton buatan untuk kalkulasi sinkron; label/lebar stabil, pageshow/gagal kembali idle |
| Empty hasil | “Belum menemukan pilihan yang sesuai” + Ubah Pencarian | Bukan sold out; input tetap; alternatif hanya bila engine menawarkan |
| Gagal gambar/font | Ruang foto netral+alt existing, fallback font | Tidak reflow besar atau foto/data palsu; semua aksi masih usable |
| ID/EN | Translate existing, termasuk accessible names/error/status | Tidak reset form/fokus. Persistensi lintas reload/route tidak dijanjikan atau ditambah |
| Detail kadaluarsa | Penolakan existing terlihat pada dialog/hasil aktif | Jangan menaruh satu-satunya error pada panel Home tersembunyi; jangan bypass validFuture |
| WhatsApp gagal buka | Link/dialog dapat dicoba kembali | Tidak klaim terkirim/sukses/status booking |

Loading/error/empty N/A pada dekorasi statis, judul section dan shortcut data sinkron; selected N/A pada lokasi informasional; tidak membuat state fiktif demi melengkapi matrix. Field native mengikuti OS untuk popup/disabled option; wrapper tetap memenuhi label/error/focus web. State bisnis baru tidak diperkenalkan.

Urutan fokus Home: skip link → bell → search → orange → active service tab → panel bila terbuka → content/actions → bahasa → bottom nav. Dalam form: close → mode available → asal → tujuan → tanggal → quick dates → waktu → penumpang → Cari; hidden/disabled tidak masuk Tab. Modal native menahan fokus sendiri; panel inline tidak.

**Occlusion/focus fix:** gunakan tinggi header sticky yang benar-benar terlihat + inset + margin12 sebagai scroll-padding/scroll-margin pada scroller aktif. Jangan hardcode172 untuk seluruh perangkat/state. Sesudah panel terlihat, lakukan satu scroll yang membawa target+label+ring ke area aman, lalu focus preventScroll bila didukung. Jangan block:center pada form panjang sehingga layanan tertutup. Uji Tab→Shift+Tab ke shortcut seperti repro VQA-02. Jangan menjalankan focus origin dari dua listener bersaing.

Motion default120–180ms untuk warna/opacity; panel instan atau fade pendek, tidak animasi height panjang. Reduced motion meniadakan transisi dekoratif, shake, transform, smooth scroll JS/CSS; state akhir instan. Jangan scroll berulang pada setiap keyboard resize atau saat mengetik; tidak menambah library/haptic/progress palsu.

## 9. PWA/device, safe-area, keyboard dan scroll

Satu shell mobile untuk browser/standalone; install opsional, tanpa onboarding/login/splash JS. Native OS chrome tidak digambar ulang. Android Chrome toolbar dan Safari/WebKit dynamic toolbar dapat bergerak; root/exposed viewport sea-blue, content paper, nav putih; jangan ada lapisan putih/merah lama saat reverse scroll/resize.

### Safe-area dan viewport

- Inline gutter **max(16px, safe-left/right)**; nav memakai max(14px, inset kiri/kanan). Top header baseline26; saat inset nonzero gunakan paling sedikit **max(26px,16px+safe-top)**. Decorative header boleh di belakang notch, kontrol di bawahnya.
- Nav total = measured base height (min70) + safe-bottom, inset ditambahkan **sekali**. Ruang akhir content = measured total nav height +16; jangan menambah safe-bottom lagi pada rumus yang sudah memasukkannya. Hasil, Home, footer dan dialog diuji masing-masing.
- Dialog memakai margin12 + inset yang relevan; offline fallback padding max(24px,inset+16px), retry44/48 dan kontras sesuai token. Seluruh close/error/CTA terakhir dapat dicapai di atas home indicator.
- Evaluasi `viewport-fit=cover` pada implementasi setelah approval, karena index baseline belum memilikinya; CSS env saja bukan bukti inset bekerja. Global meta change membutuhkan desktop regression. Tidak mengatur maximum-scale/user-scalable=no.
- Gunakan dynamic viewport/native resize, bukan tinggi100vh statis. Portrait komposisi utama, landscape usable tanpa orientation lock; >=768 memakai desktop locked.

### Keyboard dan lifecycle

Native iOS document scrolling tetap; platform lain scroller existing. Tidak global preventDefault touchmove, tidak mengunci overscroll browser demi fixed nav; native pull-to-refresh browser dipertahankan. Standalone dapat mengikuti overscroll existing tanpa merusak scroll/bounce native atau membuat dua owner.

Field aktif+label/error harus terlihat dengan jarak12–16 dari keyboard bila ruang cukup, atau dapat discroll bersama; close dan CTA akhir dialog tetap dapat dicapai. Input16px+, tel keyboard untuk WhatsApp existing, textarea multiline tidak diperlakukan Enter sebagai submit ganda. Nav mengikuti keputusan §2; visualViewport handling hanya untuk masalah terukur, dengan cleanup, tanpa scroll loop. Focus saja tidak membuktikan keyboard tampil. Native OS picker tidak dipaksa terbuka lewat focus programmatik.

Back/forward/Escape mengikuti browser dan dialog existing; jangan intercept history/popstate, mematikan Back atau mengubah routing. bfcache/pageshow memulihkan idle busy dan nilai existing; cold start tetap start_url, bukan draft/booking status yang disimpan baru. Close/reopen search mempertahankan field selama sesi DOM, bukan jaminan refresh Home bersih atau detail pemesan.

### Install/theme/icon

Theme mobile `#0B7285`, background `#F5F7F8`; desktop theme existing tetap. Warna benar sejak startup, bukan flash merah sebelum JS; strategi meta/media nanti diuji >=768. OS status bar iOS/default tidak dijanjikan selalu teal.

Manifest id/start_url/scope relatif existing `./`, display standalone; tidak migrasi origin/scope. Icons resmi192/512 any dan512 maskable, opaque background, elemen penting di lingkaran pusat radius40% sisi canvas; uji crop circle/squircle dan launcher light/dark. Apple icon192 existing diuji dahulu; tidak menambah180 tanpa kebutuhan nyata. Splash milik OS, tidak menambah aset launch/splash library.

Install affordance adalah **enhancement terakhir**, bukan blocker pemakaian website: Android hanya saat beforeinstallprompt tersedia, sesudah interaksi nontransaksional, tap eksplisit dan dismissal dihormati; tidak saat form/dialog aktif. iOS bantuan Bagikan→Tambahkan ke Layar Utama kontekstual, tanpa tombol native palsu. Deteksi standalone display-mode dan navigator.standalone bila didukung; jangan UA-only. Jika JS/SW/storage gagal, website biasa tetap usable.

## 10. Offline, loading jaringan dan update safety

| Situasi | UI target / recovery | Batas |
|---|---|---|
| Cold online/slow asset | Konten nyata; placeholder hanya region loading aktual | Tidak skeleton/delay palsu, reserve media dimensions |
| Offline, fallback sudah tersimpan | “Koneksi sedang offline” + Coba lagi | Halaman mandiri tanpa harga/booking/payment/status/availability |
| First visit offline atau SW gagal | Error native browser mungkin terjadi | Tidak menjanjikan fallback siap hanya karena register sukses |
| Koneksi putus pada dokumen terbuka | Banner nonmodal role=status: “Koneksi terputus. Informasi perjalanan belum dapat diperbarui.” + retry | Jangan merebut fokus/menghapus input; harga publikasi bukan live availability |
| Online event/retry | Revalidasi hanya dengan sumber/network existing; tampilkan pemeriksaan hanya selama request nyata | Online event bukan bukti server sehat; tidak auto-reload/auto-submit |
| Timeout/4xx/5xx | Pesan gagal terpisah, retry eksplisit | Jangan menyebut semua failure sebagai offline atau fallback sukses |
| Resume/bfcache | Tunjukkan ketidakmutakhiran bila relevan dan retry aman | Tidak mengklaim status lama terverifikasi |
| Update tersedia | Pemberitahuan ringan, reload saat aman/aksi pengguna | Tidak forced reload saat form/review, tidak menyimpan PII sebagai jalan pintas |

Copy/status juga EN; sekali announce per perubahan penting. Retry yang memerlukan reload saat form dirty harus menjelaskan kehilangan draft dan tidak reload otomatis. Link permintaan WhatsApp tetap existing; offline tidak queue/replay. Tidak membuat endpoint/polling/probe status bisnis baru.

**Contract cache implementasi berikutnya (belum diterapkan):**

1. Allowlist eksplisit aset presentasi release-versioned. `request.destination` saja tidak cukup; `assets/core.js` berisi tarif/jadwal sehingga bukan presentation asset untuk reuse offline otomatis. Jangan campur HTML baru dengan business-data bundle lama.
2. Navigasi online memakai network; saat gagal hanya fallback informatif. Tidak menyimpan navigation HTML/query, API, booking/payment/availability/status, PII, tiket/QR/receipt atau personalized images. Bypass non-GET/credentialed/sensitive requests; jangan cache private/no-store/redirect/error response. Fallback HTML bukan response API sukses.
3. Network-first SW tidak menjamin HTTP cache/bfcache segar. Audit storage aplikasi, HTTP cache dan resume terpisah; header/CDN/data freshness dependency diserahkan owner, bukan izin mengubah backend di sprint ini. Jika butuh perubahan terlarang, catat sebagai dependency release yang belum terpenuhi.
4. Cache versi kompatibel, bounded count/size/age; cache write memakai lifecycle waitUntil/setara dan failure/quota tidak merusak network response. Hapus hanya cache aplikasi yang dikenal, bukan seluruh origin/favorit.
5. Aktivasi SW aman: tidak skipWaiting/claim yang mengambil alih draft aktif dan mencampur rilis. Uji dua tab lama/baru, defer activation hingga waktu aman. Tidak background sync, push, credential baru, persisting transaksi atau replay POST.

## 11. Accessibility dan invariant regression

- Teks normal>=4,5:1, large text>=3:1, indikator/focus/kontrol bermakna>=3:1. Foto/scrim dan semua state diuji, tidak hanya token solid. Border dekoratif tidak wajib menjadi indikator kontrol.
- Semua aksi >=44×44, CTA/search48 tinggi; glyph kecil boleh. Hit area favorite, route overlay, link/action dan dot tidak overlap. Target row/card tidak nested button/link.
- Keyboard dan screen reader: label, role, state ARIA, live region, reading order dan focus return benar. Native tablist, dialog, select/date/time tetap semantik; unavailable feedback dapat didengar tanpa pointer. Error tidak hanya warna; describedby/invalid tepat dan tidak announce ganda.
- Pinch zoom, 200% teks, fallback font, ID/EN, keyboard eksternal, VoiceOver/TalkBack diperiksa. Jangan menghilangkan outline atau mengunci tinggi sehingga label/nilai/control penting terpotong.
- Konten/link/metadata/SEO dan aset nyata tetap; tidak mengarang harga, sisa kursi, rating, ulasan, jadwal, sertifikasi, kode/status booking atau payment success.
- Form IDs/datasets/state classes, setService/normalisasi, validasi dan query existing, dua arah airport, satuan tarif, waktu Bali, pemfilteran jadwal lewat, detail/review/WhatsApp dipertahankan. Tidak menambahkan resolver GPS dari skill/repository lama.
- Desktop comparison wajib source/browser/font/data/state/time yang sama di768/1024/1440; tidak ada shell/nav mobile, geometry/color/behavior baseline identik (noise raster engine terdokumentasi, bukan toleransi perubahan desain).

## 12. Backlog keputusan dan urutan implementasi

Severity adalah dampak; urutan kerja P0/P1/P2/P3 di bawah. Tidak ada isu dinyatakan selesai hanya karena masuk master. Owner implementasi ditetapkan pada fase implementasi; Agents2–5 tetap pemilik report/review, bukan izin menulis produksi.

### Daftar masalah yang harus ditutup

| ID / severity | Masalah dan sumber | Keputusan/perbaikan yang harus dibuktikan |
|---|---|---|
| C-00 **Critical** | Tidak ditemukan Critical pada state teruji Agent5 | Bukan sertifikasi seluruh perangkat. Kebocoran PII/cache atau harga/status palsu yang terkonfirmasi kelak menjadi Critical dan block release; belum diklaim terjadi sekarang. |
| H-01 **High** | VQA-01 / Agent2: harga/link/metadata/nav kontras rendah | Token accent-text/muted, skala §3; semua pasangan/state AA |
| H-02 **High** | VQA-02: sticky header menutup shortcut/focus | Offset measured scroller + satu focus/scroll; repro Tab/Shift+Tab bersih |
| H-03 **High** | UX-01: Pulang Pergi menjanjikan kemampuan tak diserialisasi | Mobile non-selectable + unavailable copy, sekali jalan jujur; engine/query tidak berubah |
| H-04 **High** | UX-02: penumpang/filter terkirim tetapi tersembunyi | Tampilkan kontrol existing dan ringkasan sesuai query |
| H-05 **High** | UX-03: error umum, fokus tetap Cari, relasi invalid kurang | Pesan per-field/fokus pertama/ARIA; error hasil kadaluarsa terlihat di context aktif |
| H-06 **High** | Agent4: allowlist cache terlalu luas, update dapat campur rilis | Contract §10; audit cache dan dua-tab, tidak mengklaim leak aktif tanpa bukti |
| H-07 **High** | Agent4/5: device safe-area/keyboard/standalone belum terbukti | Gate perangkat fisik §13; dukungan inset/focus/CTA/scroll nyata |
| H-08 **High** | Agent4: network loss dokumen terbuka tanpa tanda ketidakmutakhiran | Banner/resume/retry jujur, tanpa auto-submit/draft hilang |
| M-01 **Medium** | VQA-03 / UX-04: target heart/close/quickdate/language/indicator kecil | Target44, tidak overlap; search/CTA48 |
| M-02 **Medium** | VQA-04: nama rute clip internal320 | Dua kolom, wrap penuh/grow; ID/EN + fallback kedua engine |
| M-03 **Medium** | VQA-05: ring putih dan trip-mode outline hilang | Ring primary-strong, kontras3:1, semua input/mode yang tersedia |
| M-04 **Medium** | VQA-06: active nav berlapis | Satu background pill, tanpa pseudo surface kedua |
| M-05 **Medium** | UX-05/06/08: return focus, simpan lokal, terjemahan status | Fokus pemicu; storage denied jujur; ID/EN tidak reset field |
| M-06 **Medium** | UX-09 / Agent4: smooth scroll imperatif, dua owner/viewport risiko | Reduced motion menyeluruh, satu owner, tidak memblokir native gesture |
| M-07 **Medium** | UX-10: swap dan airport mapping tidak konsisten dokumen | Swap affordance mobile dihilangkan, handler tetap; label/satuan ikut dataset |
| M-08 **Medium** | Agent4: theme startup/icon/offline retry accessibility | Startup sea-blue, crop aman, retry AA/target44; bukan klaim splash identik OS |
| L-01 **Low** | VQA-07 / UX-07: chevron lokasi memberi affordance palsu | Lokasi statis tanpa chevron; bell/search bernama sesuai aksi |
| L-02 **Low** | Agent2: variasi shadow dan rhythm | Token/radius/spacing tunggal, tanpa colored shadow di CTA teal |
| L-03 **Low** | Agent4: install affordance enhancement | Opsional/contextual/dismissible; website tidak bergantung instalasi |

### Urutan kerja dan boundaries

1. **P0 — approval dan baseline:** reviewer menerima keputusan §2, source baseline, desktop snapshots serta daftar pending; buat scope implementasi terpisah. Tidak ada produksi di commit sintesis ini.
2. **P1 — kebenaran dan usability:** H-03/H-04/H-05, H-01/H-02 dan M-01/M-02/M-03. Ubah presentasi mobile dan fokus/ARIA saja, pertahankan payload/validator; uji semua service dan boundary768. Jangan mulai dengan polish shadow.
3. **P1 — device dan freshness:** H-06/H-07/H-08, safe-area/keyboard, offline/update/cache contract. Manifest/SW/meta perubahan nanti hanya dengan scope yang disetujui; dependency backend/cache header tidak dikerjakan diam-diam.
4. **P2 — konsistensi:** M-04–M-08, nav tab order, focus return, locale/storage/reduced motion, surface/type/card/state lengkap. Verifikasi lifecycle dan desktop kembali sesudah perubahan terkait.
5. **P3 — polish dan enhancement:** L-01–L-03, install opsional; tidak menambah fitur/navigation business. Akhiri dengan QA seluruh matriks, bukan hanya unit test.

Area selalu terkunci: >=768, SEO/content truth, routing/query/business rules, backend/API/database/auth/RBAC, tarif/jadwal, WhatsApp flow. Perubahan global yang diperlukan untuk presentasi harus dibuktikan tidak mengubah area terkunci; bila tidak bisa, pisahkan dependency.

## 13. Acceptance visual final dan bukti sign-off

**Status awal semua perbaikan di master: OPEN.** Agent5 memiliki bukti baseline Chromium+WebKit dan automated suite PASS; Agents2–4 memiliki audit source/Chromium terbatas. Ini bukan PASS untuk target baru. Agent5 tidak menemukan Critical pada state teruji, tetapi VQA-01–06 dan state/perangkat pending tetap menghalangi product FINAL/LOCKED. Bukti scratch laporan bukan baseline screenshot versioned/permanen; implementasi harus melampirkan artefak yang bisa ditinjau pada commit yang diuji.

### Matriks wajib

| Lingkungan | Dimensi/state minimum | Bukti penerimaan |
|---|---|---|
| Chromium + WebKit browser emulation | **360×800,390×844,412×915**; guard **320×800,430×932** | Screenshot viewport top/scroll+state dan geometry, ID/EN, fallback font; bukan fullPage artifact sebagai satu-satunya bukti |
| Android Chrome nyata | Lebar device dicatat, browser dan installed; portrait/landscape | Native select/date/time open/selected/disabled/cancel, IME, toolbar, Back, rotate, fast/reverse scroll, refresh/resume |
| iPhone Safari nyata / WebKit | Browser dan Home Screen standalone, model/OS/version dicatat | Notch/home-indicator inset nonzero, keyboard tel/textarea, toolbar expand/collapse, bfcache dan native picker; browser iPhone lain bila tersedia untuk dynamic toolbar |
| PWA lifecycle | Android install + iOS Add to Home Screen, cold/warm/resume; storage denied/evicted | display-mode/standalone nyata, icon/splash/theme, offline first vs cached, update dua tab, cache inventory dan tidak ada replay |
| Desktop locked | **768×900,1024×900,1440×900** sebelum/sesudah | Screenshot/geometry diff pada state/data/time/font sama + booking/navigation regression |

Tidak semua lebar harus berasal dari perangkat fisik; matriks emulasi menutup lima ukuran, perangkat nyata menutup perilaku OS. Resize pendek bukan bukti IME; env CSS/manifest source bukan bukti safe-area/install. Catat browser/OS, locale, normal/reduced motion, commit, inset dan hasil tiap kasus; state belum diuji diberi PENDING, bukan PASS.

### Checklist sign-off yang harus semuanya terbukti

- [ ] **Komposisi:** Home mengikuti §4, empat shortcut, dua favorite columns, popular image rows, rail bawah, empat nav; tidak ada arah lama yang muncul.
- [ ] **Geometri:** tabel §4 berlaku (rounding<=1px), gutter16, search/action48, tile62×58; card/booking/field/radius sesuai token. Tinggi auto bukan mismatch bila dipicu teks/state yang ditetapkan.
- [ ] **Readability:** harga/satuan/nama rute/label/error utuh di320–430 dan ID/EN; AA semua state, foto/scrim terukur; review pada skala100% dan teks200%.
- [ ] **Target/state:** semua aksi44×44/CTA48, hitbox heart terpisah, default/selected/pressed/focus/disabled relevan tercapture. Tidak ada ring hilang atau surface aktif ganda. N/A dicatat alasannya.
- [ ] **Booking entry/lifecycle:** search/orange/empat service/rute/edit/empty-edit membuka panel yang sama, close/reopen mempertahankan nilai, fokus pemicu benar, Motor info-only; tidak scroll trap/dua focus/dua navigasi.
- [ ] **Kebenaran input:** Pulang Pergi unavailable, swap mobile tidak ditawarkan; penumpang dan filter existing dapat diubah; label airport/satuan benar; date/time/minimum/cap/default/validasi/query tetap engine existing.
- [ ] **Error/empty/loading:** semua invalid rule ada visual + ARIA/fokus tepat; empty bukan sold out; slow-load/image fail/storage fail/offline/server-error/retry bisa dipulihkan tanpa dummy data. Busy kembali idle saat gagal/bfcache.
- [ ] **Focus occlusion:** repro VQA-02 (open→tab layanan→Tab→Shift+Tab) bersih pada Chromium/WebKit; target dan ring tidak tertutup header. Keyboard/touch nyata menutup gap emulasi.
- [ ] **Picker/dialog:** native lokasi/pax/date/return-unavailable/private time diuji OS; label panjang, minimum/disabled/selected/cancel benar; dialog top-layer scroll/close/CTA terjangkau, Escape/backdrop/focus return, tidak fokus nav belakang.
- [ ] **Nav:** urutan visual/keyboard sama, satu current-page surface, unavailable feedback ID/EN tanpa route palsu, Trips modal tidak menciptakan current page kedua; konten terakhir bebas nav+inset+16.
- [ ] **Device:** keyboard/rotasi/dynamic toolbar/native scrolling dan safe-area nonzero di Android/iPhone browser+installed memenuhi §9, tanpa white gap, hidden CTA atau draft reset.
- [ ] **PWA safety:** install opsional, theme/icons benar, fallback tanpa data bisnis, network loss/resume jujur; allowlist/cache versi/HTTP cache/bfcache/dua-tab diuji; tidak PII/status/QR/booking data cache atau replay. Dependency lintas owner ditutup sebelum klaim aman.
- [ ] **Motion/performance:** normal dan reduced motion direkam, tidak nonessential smooth JS pada reduce; selected/favorite/translate tidak mengubah geometri tanpa alasan, media load tidak menggeser konten. Bandingkan LCP/INP/CLS dengan baseline pada kondisi sama; jangan mengklaim perbaikan tanpa ukur, tidak ada regresi material.
- [ ] **Regression:** suite existing yang relevan (`core`, `home-mobile-v2`, `browser`, `mobile-search-lifecycle`, `ios-scroll`) lulus pada engine tersedia/CI; screenshot tetap wajib. Detail→review→target WhatsApp valid tanpa kirim/transaksi nyata. Desktop boundary/layout/color/behavior utuh; SEO regression PRD utuh.
- [ ] **Penutupan:** H/M/L di §12 diselesaikan atau memiliki penerimaan eksplisit beralasan oleh reviewer; Critical/High terbuka tetap blocker. VQA-01–06 diuji ulang, VQA-07 sesuai keputusan statis. QA visual, UX, device dan Design Lead meninjau bukti implementasi; approval dokumentasi saja tidak memenuhi gate.

## 14. Arah lama yang tidak boleh diperkenalkan kembali

Tidak memakai merah sebagai primary mobile; animated/logo-opening search + globe/share; selector carousel empat kartu geser; lima-tab/Explore/notch; nav merah tanpa pill/partikel/bounce; ukuran font8–10px untuk informasi penting; dua active surfaces; white icon/text pada orange tanpa kontras; shadow orange di CTA teal; swap mobile atau booking Pulang Pergi yang seolah didukung; custom picker mengganti native tanpa kebutuhan; modal trap pada panel inline; mockup device/onboarding/login; floating WhatsApp mobile; page-wide overflow; cache booking/payment/status; auto-reload yang menghilangkan draft; perubahan desktop untuk menyamakan mobile.

Master ini menjadi sumber implementasi mobile/PWA setelah approval. Laporan specialist tetap bukti audit baseline; keputusan konflik, token, state, prioritas dan acceptance pada master ini menjadi kontrak target tunggal.
