# Agent 5 — Visual QA / Regression

**Status: BELUM FINAL. FINAL/LOCKED diblokir.**

Audit: 27 Oktober 2026, WITA. Repository `singarajatrans/singarajatrans-web`, branch `main`, HEAD `055c204c1a7d3e9bb60dd3916c18269786bcd520` (sama dengan remote saat audit). Ini laporan independen; tidak ada perbaikan produksi dalam scope Agent 5.

## 1. Dasar review dan metode

Dibaca: `AGENTS.md`, `docs/agents/05-visual-qa.md`, `docs/home-mobile-v2.md`, `DESIGN.md`, `PRD-Design-Singaraja-Trans.md`, `docs/MOBILE-PWA-MASTER-DESIGN.md`, addendum bottom navigation, source mobile/booking/PWA, serta tes yang tersedia.

Prioritas visual adalah Home mobile 27 Oktober: sea-blue/orange, header lokasi/bell/search, empat shortcut, dua kartu favorit, baris rute populer, inspirasi/destinasi/review, empat item bottom nav. Arahan merah/lima item/notch lama tidak digunakan sebagai alasan mengembalikan desain. Master saat ini menyebut “Implemented baseline”; label tersebut bukan bukti semua state telah lolos visual.

Audit membandingkan render aktual terhadap spesifikasi terbaru di repository. Tidak ditemukan file gambar referensi eksternal asli yang dapat dipakai untuk pixel matching; kesesuaian terhadap gambar/video asli belum dapat disertifikasi. Screenshot yang dihasilkan adalah bukti implementasi, bukan desain pembanding independen.

Preview lokal menggunakan source HEAD tanpa perubahan. Chromium sistem dipakai karena unduhan Chromium Playwright terkena 403. WebKit 26.5 berhasil dijalankan setelah library Debian diekstrak ke folder kerja dan launcher lokal digunakan; tidak menambah dependency repository. Pengujian yang menghasilkan artefak dijalankan pada salinan identik di folder kerja. Tidak ada pengiriman WhatsApp atau pembuatan booking nyata.

### Cakupan eksekusi

| Matriks | Chromium | WebKit/iPhone | Catatan |
|---|---|---|---|
| 360×800 | Screenshot Home, booking, charter, motor, dialog, viewport pendek | Screenshot state yang sama | Ukuran utama persis; tes Home tambahan memakai tinggi 844 |
| 390×844 | Sama + screenshot scroll, results/detail dan fokus | Sama + bukti scroll dari tes Home | Utama |
| 412×915 | Sama + screenshot scroll/results/detail | Sama | Utama |
| 320×800 | Screenshot/state dan lifecycle | Screenshot/state dan lifecycle; iPhone SE | Resilience, bukan pengganti ukuran utama |
| 430×932 | Screenshot/state dan lifecycle | Screenshot/state; iPhone 14 Pro Max melalui tes iOS | Lifecycle tes memakai tinggi 844 |
| 768×900, 1440×900 | Screenshot desktop | Screenshot desktop | 1024×900 juga diuji otomatis di Chromium |
| Browser mode | Dijalankan | Dijalankan dengan iPhone UA/touch pada matriks visual | Bukan browser fisik |
| PWA installed/standalone | Inspeksi manifest/CSS saja | Inspeksi saja | BELUM DIVERIFIKASI di instalasi nyata |
| Keyboard fisik, notch/home indicator, toolbar Safari dinamis | Belum perangkat nyata | Resize/focus/scroll emulasi tersedia | Resize tidak membuktikan keyboard/safe-area fisik |

### Hasil otomatis yang benar-benar dijalankan

- `node tests/core.test.cjs`: PASS, 19 assertion.
- `tests/home-mobile-v2.cjs`: PASS Chromium dan WebKit pada 360/390/412; layout, pilihan layanan, favorit, ekspansi, ID/EN, rute, hasil dan review tautan WhatsApp. Tidak menekan tautan kirim.
- `tests/mobile-search-lifecycle.cjs`: PASS Chromium dan WebKit pada 320/390/430; transisi desktop/mobile, field tersimpan, bahasa, expand/collapse, reload, overflow.
- `tests/ios-scroll.cjs`: PASS WebKit iPhone SE, iPhone 13, iPhone 14 Pro Max; native scroller, pembalikan scroll, resize, sticky header, dialog dan navigation.
- `tests/browser.cjs`: PASS Chromium, header mobile 320/360/390/412/430 dan responsive/booking/validation/resize/refresh desktop 768/1024/1440.
- Percobaan awal Home/WebKit gagal karena library host, kemudian seluruh suite Home diulang dan PASS. Percobaan skrip audit lokal pada port 4190 sempat timeout; matriks screenshot diulang pada 4191 dan selesai. Kegagalan harness tidak diklasifikasikan sebagai defect produk.

**Automated PASS tidak sama dengan VISUAL PASS.** Bukti visual berikut tetap menghalangi persetujuan.

## 2. Temuan berperingkat

Tidak ditemukan defect Critical dalam state yang berhasil diperiksa. Ini bukan jaminan terhadap state/perangkat yang belum terverifikasi.

### VQA-01 — High — Kontras teks informasi dan aksi terlalu rendah

- Lokasi/component: `.section-action`, `.home-all-link`, `.route-fare strong`, `.home-popular-price`, `.reference-card-location`, label bottom navigation.
- Viewport/device: 320/360/390/412/430; Chromium dan WebKit.
- Masalah: teks harga/tautan orange kecil, metadata abu terang dan label bottom nav sukar dibaca di surface putih. Rasio CSS `#FF8A4C`/putih ≈2,34:1; `#A0A5A6`/putih ≈2,49:1; `#9BA5A9`/putih ≈2,52:1. Ukuran aktual harga 10,5–12px, lokasi 9px, label nav 9px. Label trips adalah aksi tersedia, sehingga tidak seluruhnya dapat dianggap pengecualian disabled.
- Expected result: teks biasa minimal 4,5:1; ikon/batas kontrol penting minimal 3:1. Informasi harga dan navigasi terbaca tanpa zoom. Orange dekoratif boleh tetap menjadi aksen.
- Rekomendasi: Agent 1 menetapkan varian token teks yang kontras dalam palet yang sama; pemilik implementasi menerapkannya khusus mobile. Jangan mengubah harga/konten maupun warna desktop.
- Bukti: `chromium-320-home.png`, `webkit-360-home.png`, screenshot Home WebKit 390 pada scroll 1150; nilai sumber `assets/mobile-reference.css`.

### VQA-02 — High — Header menutup shortcut yang sedang difokuskan

- Lokasi/component: sticky `#header`, `.service-tabs`, pembukaan booking/focus keyboard.
- Viewport/device: direproduksi Chromium 390×844 dan 360×800; risiko semua mobile. Belum menyatakan reproduksi keyboard yang sama di WebKit.
- Masalah: setelah membuka pencarian, fokus `#tab-shuttle`, Tab lalu Shift+Tab, ikon layanan berada di belakang header; pada 390px kotak tab dimulai sekitar y=142 sementara header masih mencapai y=172. Bagian kontrol/fokus terhalang. Beberapa screenshot sesudah membuka booking juga menunjukkan ikon atas tertutup.
- Expected result: kontrol fokus dan indikatornya terlihat penuh, tidak ditutup sticky header; berpindah fokus tidak membuat pengguna kehilangan konteks layanan.
- Rekomendasi: spesifikasikan offset scroll/focus terhadap tinggi header aktual dan urutan pembukaan panel; gunakan perilaku yang sudah ada tanpa mengganti booking state/logic. Verifikasi kedua scroll owner yang ada, bukan sekadar menaikkan z-index.
- Bukti: `keyboard-focus.png`, `actual-360-tabfocus.png`, `chromium-390-booking.png`. Repro harus diulang dengan keyboard nyata dan WebKit.

### VQA-03 — Medium — Banyak target sentuh di bawah master 44×44px

- Lokasi/component: favorite heart, Lihat semua, close panel booking, quick dates, language, indikator/like review.
- Viewport/device: kelima lebar; Chromium dan inspeksi CSS/render WebKit.
- Masalah: favorite 30×30; Lihat semua tinggi 30; close panel 34×34; quick dates tinggi 36; language tinggi 34; review like 44×32 dan indikator dapat berukuran 30×8/7×7. Area target yang diukur adalah button/link, bukan ukuran ikon semata.
- Expected result: seluruh kontrol interaktif minimal 44×44 CSS px sesuai master, tidak saling overlap. Ikon visual boleh lebih kecil.
- Rekomendasi: tetapkan hit-area melalui padding/wrapper yang sesuai ownership implementasi, pertahankan geometri kartu. Pastikan hit-area favorite tidak diambil overlay pemilih rute.
- Bukti: pengukuran DOM pada lima lebar dan rule `.route-favorite`, `.section-action`, `.reference-language`; `geometry.json` awal Chromium berada di folder kerja sebelum hasil WebKit.

### VQA-04 — Medium — Nama rute terpotong pada Chromium 320px

- Lokasi/component: `.route-card .route-path`, grid Pilihan Favorit dua kolom.
- Viewport/device: Chromium 320×800; WebKit 320×800 menampilkan lebih banyak teks karena metrik font berbeda. Bukan defect overflow dokumen.
- Masalah: “Singaraja ↔ Denpasar” dan “Singaraja ↔ Gilimanuk” terpotong di sisi kanan pada Chromium; tujuan menjadi ambigu walaupun tes scrollWidth dokumen PASS. Rule nowrap dan lebar kolom terbatas menyebabkan clipping internal.
- Expected result: nama asal/tujuan tetap bisa dipahami pada 320px, tanpa memotong karakter secara tidak terindikasi; kartu tetap dua kolom sesuai arah terbaru.
- Rekomendasi: pemilik desain menentukan wrap atau truncation yang terindikasi dengan akses nama lengkap; ukur ID/EN dan teks rute terpanjang di kedua engine. Jangan mengubah dataset rute.
- Bukti: `chromium-320-home.png` dibandingkan `webkit-320-home.png`. Pada screenshot utama 360/390/412 tidak terlihat pemotongan yang sama.

### VQA-05 — Medium — Fokus layanan berkontras rendah

- Lokasi/component: `.service-tabs button:focus-visible`, trip-mode focus styling.
- Viewport/device: Chromium 390×844 dengan navigasi Tab/Shift+Tab; rule CSS juga berlaku mobile WebKit.
- Masalah: computed focus-visible pada `tab-shuttle` adalah garis putih 2px di latar `#F5F7F8` (≈1,07:1). Garis nyaris hilang. CSS mobile juga menghapus outline/box-shadow kontrol trip-mode sehingga perlu pemeriksaan fokus eksplisit per kontrol.
- Expected result: indikator fokus terlihat jelas dengan kontras minimal 3:1 dan tidak bergantung pada hover/selected saja; radio trip-mode tetap memiliki indikator keyboard.
- Rekomendasi: master menentukan token fokus sea-blue yang kontras, offset yang tidak clipped, dan aturan fokus untuk radio/label; perubahan kelak hanya mobile.
- Bukti: `keyboard-focus.png`, rule `.service-tabs button:focus-visible` dan penghapusan outline `#trip-mode` di `assets/style.css`.

### VQA-06 — Medium — Single active surface bottom nav belum konsisten

- Lokasi/component: `.mobile-bottom-item[aria-current=page]::before` dan background item aktif.
- Viewport/device: kelima lebar, kedua engine.
- Masalah: item Home aktif memiliki surface dasar `#E6F5F7` radius 16px dan pseudo-element inset `5px 3px`, radius 25px, warna `#E0F7F5`. Dua surface aktif bertumpuk, sedangkan dokumen terbaru meminta satu active surface. Efeknya halus namun rule saling bersaing menyulitkan validasi pressed/focus/active.
- Expected result: satu surface aktif yang stabil; ikon/label tidak berpindah dan tidak ada background aktif kedua saat interaksi.
- Rekomendasi: Agent 1 menetapkan satu layer aktif dalam master; pemilik implementasi menghilangkan rule yang konflik dalam scope mobile setelah desain disetujui.
- Bukti: rule aktif bottom nav di `assets/mobile-reference.css`, screenshot Home 360/390/412.

### VQA-07 — Low — Informasi lokasi berperilaku visual seperti selector

- Lokasi/component: header “Bali, Indonesia” dengan chevron.
- Viewport/device: semua mobile, kedua engine.
- Masalah/risiko: chevron memberi affordance dropdown, tetapi lokasi adalah presentasi teks, bukan kontrol pemilih lokasi yang terlihat dalam alur ini. Ini risiko interpretasi, bukan permintaan fitur geolocation baru.
- Expected result: affordance sesuai fungsi aktual yang disetujui.
- Rekomendasi: catat keputusan di master apakah lokasi statis atau kontrol existing; jangan menambah geolocation/routing atau fitur baru melalui QA.

## 3. Acceptance criteria master design

Semua kriteria berikut harus dapat ditandai PASS dengan screenshot dan perilaku aktual sebelum FINAL:

1. **Komposisi:** mengikuti urutan/struktur Home 27 Oktober; empat layanan/four-item navigation, favorite grid dua kolom, popular rows, booking tetap existing. Tidak memulihkan versi mobile lama.
2. **Matriks:** browser Chromium dan WebKit pada 360×800, 390×844, 412×915; resilience 320×800, 430×932; ID/EN, teks panjang, font fallback. Tidak boleh hanya mengandalkan satu engine.
3. **Layout:** gutter utama 16px; grid layanan empat kolom sama; tile 62×58, search dan tombol orange 48px; jarak/alignment konsisten; tidak ada clipping teks penting atau overlap target. Pembulatan subpixel ≤1px boleh, mismatch struktur tidak.
4. **Surface:** kartu/booking mengikuti radius yang ditentukan (kartu 16px, booking 20px, field 14px), border satu sistem dan shadow lembut; nilai berbeda harus dijelaskan di master, bukan ditoleransi diam-diam.
5. **Readability:** teks biasa ≥4,5:1; large text ≥3:1; indikator kontrol/fokus penting ≥3:1. Tidak mengubah angka tarif/jadwal untuk memperbaiki layout. Periksa screenshot pada skala 100%, bukan hanya diperkecil.
6. **Targets:** kontrol ≥44×44; search/CTA 48px sesuai master; hit-area tidak tumpang tindih dengan link/overlay lain. Ukuran ikon boleh berbeda dari ukuran target.
7. **States:** setiap kontrol punya spesifikasi default, selected, pressed, focus, disabled; loading/error/empty untuk flow yang relevan. State yang memang tidak ada harus dinyatakan N/A dengan alasan. Tidak memalsukan availability/status/data.
8. **Focus/scroll:** seluruh focused control dan outline terlihat; keyboard tidak ditutup header/bottom nav; Escape/close mengembalikan fokus ke pemicu; tidak ada scroll trap; membuka/menutup booking mempertahankan input. Repro VQA-02 harus bersih.
9. **Picker:** asal/tujuan/pax select, tanggal, return date, waktu privat memiliki bukti native picker pada Android/iPhone: selected/disabled/date minimum, label panjang, buka/tutup, orientation/keyboard. Native OS UI tidak wajib dipaksa mengikuti mock custom lama; keputusan ini harus eksplisit pada master.
10. **Dialog/popover:** top layer di atas header/nav, semua isi dan close bisa dijangkau lewat scroll, backdrop tidak bocor, tombol submit bisa dijangkau pada viewport pendek, fokus terkunci dan kembali. Picker tidak clipped oleh wrapper.
11. **Navigation:** empat target seimbang, label terlihat, satu active surface, disabled feedback jujur, safe-area padding cukup; tidak menutupi CTA/isi terakhir. Konten rail horizontal boleh peek, tetapi halaman keseluruhan tidak boleh overflow horizontal.
12. **Keyboard/device:** bukti Android Chrome dan iPhone Safari nyata dengan keyboard terbuka, address textarea panjang, phone/code validation, rotasi dan toolbar berubah; CTA/field aktif/error tetap dapat dijangkau. Resize viewport desktop saja belum memenuhi.
13. **PWA:** bukti instalasi Android/iOS, display standalone aktif, top/bottom safe-area nonzero, startup/theme sesuai sea-blue, offline informatif, tidak ada status booking palsu dari cache. Source manifest saja belum memenuhi.
14. **Motion/content shift:** reduced-motion mematikan motion nonesensial; pressed/favorite/translation tidak mengubah ukuran kartu; lazy images tidak menggeser konten penting; pengamatan normal-motion dan slow-load tersedia. No horizontal overflow tidak membuktikan no CLS.
15. **Desktop lock:** pada 768/1024/1440 tidak muncul shell/nav mobile, booking dan layout desktop tetap baseline yang disetujui. Perbandingan pixel/geometry memakai source, browser, font, viewport, waktu/data dan state yang sama; perubahan mobile tidak boleh bocor ≥768.
16. **Sign-off:** VQA-01 sampai VQA-06 selesai atau memiliki keputusan penerimaan eksplisit beserta alasan; risiko yang belum diuji tidak diberi PASS. Agent 1 menyelesaikan kontradiksi dokumen sesuai urutan sumber kebenaran.

## 4. Screenshot/state checklist

Legenda: **D** dijalankan dan screenshot ditinjau; **A** dibuktikan assertion/perilaku, belum review visual lengkap; **P** pending, bukan PASS; **S** hanya inspeksi source.

| State/component | Status | Bukti/catatan |
|---|---|---|
| Home idle 360/390/412 Chromium + WebKit | D | Header, alignment, tile, favorit, harga, bottom nav; temuan di atas |
| Home 320/430 kedua engine | D | Clipping Chromium 320; WebKit teks berbeda; tidak ada document overflow di assertion lifecycle |
| Home scroll popular/inspiration/destination/reviews | D | Screenshot 620/1150/1800 tes Home; screenshot manual 360/390/412, review metadata/nav |
| Buka/tutup booking dan retain fields | D/A | Screenshot booking; assertion lifecycle dan Home |
| Airport/charter/motor | D/A | Screenshot panel; automated pencarian airport/charter dan motor unavailable copy |
| Expanded favorites, saved/unsaved heart, reload | A | Tes Home dua engine; review visual pressed/focus heart belum lengkap |
| ID/EN, long labels | A/D | Functional PASS; clipping tujuan 320 ditemukan; semua state EN belum tersedia dalam screenshot |
| Keyboard focus layanan | D | Repro VQA-02 dan VQA-05; keyboard snapshot Chromium |
| Pressed seluruh kontrol | P | Perlu capture pointerdown/touch-down yang konsisten, bukan hanya click akhir |
| Disabled favorit/akun bottom nav + feedback | S/P | aria-disabled dan pesan tersedia di source; tidak menyatakan hasil tap fisik PASS |
| Loading lambat/asset gagal | P | Belum controlled slow-load screenshot; jangan menciptakan skeleton palsu untuk data sinkron |
| Error pencarian/per-field dan native validity bubble | A/P | Browser suite validation PASS; audit visual setiap pesan/bubble belum lengkap |
| Empty results dan edit CTA | S/P | Template tersedia; belum screenshot empty terkonfirmasi; screenshot URL percobaan yang kembali Home bukan bukti empty |
| Hasil shuttle + detail dialog | D/A | Chromium lima lebar screenshots, booking review assertion dua engine |
| Booking review + WhatsApp target | A | URL reviewed/validated tanpa membuka atau mengirim WhatsApp; visual review seluruh locale pending |
| Check Booking dialog + focused phone | D | Screenshot dialog dan resize 480px kedua engine |
| Origin/destination/pax native dropdown terbuka | P | SelectOption assertion tidak sama dengan screenshot popup OS |
| Calendar today/selected/disabled/return date | S/P | Native input date; click quick date bukan bukti kalender terbuka |
| Private time picker native | S/P | Input time existing; belum capture popup native OS |
| Dialog clipping/z-index/close | D/A | Top-layer menutup nav pada screenshot; Escape assertions PASS; semua modal + physical keyboard pending |
| iPhone native scroll/reversals/header | A/D | Tes iOS tiga profil PASS; screenshots native/rounded scroll ditinjau |
| Safe-area notch/home indicator nonzero | P | CSS env ada; emulasi dapat menghasilkan inset nol |
| PWA standalone/install/offline/update | S/P | Manifest/theme/icons diinspeksi; butuh bukti runtime perangkat |
| Normal-motion/reduced-motion | S/A/P | Banyak capture memakai reduce; normal motion/perceptual shift belum ditandatangani |
| Desktop 768/1024/1440 | A/D | Suite PASS; screenshot 768/1440 kedua engine; tidak ada edit produksi |

Bukti sementara berada di `/workspace/work/agent5/`: `chromium-{width}-{state}.png`, `webkit-{width}-{state}.png`, `actual-{width}-{scroll|results|details}.png`, `keyboard-focus.png`. Bukti suite berada di `test-copy/qa-output/home-v2-{engine}-{width}-{top|620|1150|1800}.png`, `ios-native-scroll-{320|390|430}.png`, `ios-rounded-scroll-{width}.png`; log `home-complete.log`, `lifecycle-complete.log`, `ios.log`, `browser.log`. Ini lokasi kerja sesi, bukan baseline versioned atau attachment permanen. Sesuai ownership, repository hanya mendapat laporan ini.

Catatan capture: fullPage Chromium pada mobile dengan body scroller dapat menghasilkan bidang sea-blue panjang sesudah viewport. Ini artefak teknik capture, tidak otomatis defect halaman. Review isi bawah memakai scroll-screenshot aktual; posisi bottom nav pada fullPage WebKit adalah posisi saat capture, bukan bukti nav menempel di tengah dokumen.

## 5. Regression checklist

- [x] Source terbaru remote diverifikasi; tidak memakai baseline lokal lama.
- [x] Tidak mengubah HTML/CSS/JS produksi, manifest/SW, tes, workflow, backend/API/database/auth/RBAC/tarif/jadwal/booking logic.
- [x] Tidak mengerjakan laporan pemilik Agent lain; hanya output Agent 5.
- [x] Tidak redesign atau mengubah desktop; desktop smoke suite lulus 768/1024/1440.
- [x] Home header/search/nav dan service entry diverifikasi; search close/reopen retain fields PASS.
- [x] Route selection, expand/collapse, favorite persistence, ID/EN dan edit-search diuji existing suite.
- [x] Booking shuttle/airport/charter, detail/review dan format target WhatsApp diuji tanpa pengiriman.
- [x] Breakpoint resize tidak kehilangan state; dokumen tidak horizontal overflow pada matriks assertion.
- [x] iPhone native scroll owner/reversals/resize/close dialog/home return PASS di WebKit emulasi.
- [ ] Clipping internal teks 320px dibereskan; document overflow PASS tidak menutup VQA-04.
- [ ] Header/fokus tidak saling menutupi; focus ring kontras; hit-area kecil dibereskan.
- [ ] Semua error/empty/loading/pressed/native picker punya bukti screenshot yang valid.
- [ ] Keyboard fisik, safe-area nonzero, toolbar Safari dan standalone Android/iOS diperiksa.
- [ ] Pixel/geometry diff dengan baseline desktop yang disetujui tersedia. Audit ini memastikan tidak ada perubahan produksi oleh Agent 5, bukan menyertifikasi ulang seluruh sejarah desktop. Klaim byte-identical di dokumen belum diulang dalam audit ini.
- [ ] Master menyelesaikan konflik spesifikasi lama: empat vs lima nav, native vs custom picker, palet, scroll owner; tidak menghidupkan arahan superseded.

## 6. Gate FINAL/LOCKED dan handoff

**BELUM FINAL** karena kontras informasi penting (High), fokus tertutup header (High), target sentuh/fokus/clipping dan single active surface belum selesai, serta sejumlah state penting/perangkat nyata belum terverifikasi.

Agent 1 menerima temuan dan menetapkan acceptance master; pemilik implementasi menangani perbaikan sesuai ownership setelah master disetujui. Agent 5 tidak menerapkan perbaikan, menambah fitur, mengubah flow atau mengambil alih scope Agent 2–4. Setelah implementasi, ulangi matriks visual yang terdampak beserta desktop boundary, lalu lampirkan bukti native picker, keyboard, PWA dan state yang masih P. Ketiadaan Critical dan automated PASS tidak boleh dipakai untuk menghapus gate ini.

Output Agent 5 selesai sebagai laporan audit, kriteria penerimaan, checklist screenshot/state, checklist regression, dan blocker FINAL/LOCKED. Status produk tetap BELUM FINAL; pekerjaan verifikasi yang belum terbukti ditulis terbuka, bukan diberi PASS.
