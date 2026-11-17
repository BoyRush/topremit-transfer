import type { TranslationDict } from "./en";

/**
 * Bahasa Indonesia translation dictionary.
 * Keys must be identical to en.ts.
 */
const id: TranslationDict = {
  // ---- App / Global ----
  "app.name": "topremit",
  "app.tagline": "KIRIM UANG",
  "app.simulation_notice":
    "Simulasi Prototipe: Tidak ada dana riil yang dipotong dari rekening Anda atau ditransfer ke bank luar negeri.",

  // ---- Navigation ----
  "nav.send_money": "Kirim Uang",
  "nav.history": "Riwayat Transaksi",
  "nav.help": "Bantuan",
  "nav.user_placeholder": "Tamu",

  // ---- Language Switcher ----
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",
  "lang.select": "Bahasa",

  // ---- Calculator Page ----
  "calc.title": "Berapa yang ingin kamu kirim?",
  "calc.subtitle": "Masukkan jumlah yang ingin dikirim, pilih negara tujuan dan layanan transfer.",
  "calc.sender_label": "Kamu mengirim",
  "calc.receiver_label": "Penerima menerima",
  "calc.rate_label": "Kurs",
  "calc.service_speed_label": "Layanan & Mode Pengiriman",
  "calc.change": "Ubah",
  "calc.instant": "Instan",
  "calc.regular": "Reguler",
  "calc.bank_transfer": "Bank Transfer",
  "calc.e_wallet": "E-Wallet",
  "calc.fee": "Biaya Transfer",
  "calc.total": "Total Pembayaran",
  "calc.continue": "Lanjutkan",
  "calc.single_recipient": "Satu penerima",
  "calc.multi_recipient": "Banyak penerima",
  "calc.select_country": "Pilih negara tujuan",
  "calc.search_country": "Cari negara atau mata uang",
  "calc.local_transfer": "Transfer Lokal",
  "calc.international_transfer": "Transfer Internasional",
  "calc.close": "Tutup",

  // ---- Stepper ----
  "step.calculator": "Kalkulator",
  "step.recipient": "Penerima",
  "step.review": "Review",
  "step.success": "Selesai",

  // ---- Recipient Page ----
  "recipient.title": "Ke siapa kamu mengirim?",
  "recipient.subtitle": "Masukkan data rekening penerima di negara tujuan dengan benar dan teliti.",
  "recipient.back": "Kembali ke Kalkulator",
  "recipient.bank_name": "Bank Tujuan",
  "recipient.bank_placeholder": "Pilih bank",
  "recipient.account_number": "Nomor Rekening",
  "recipient.account_number_placeholder": "cth. 0192837465",
  "recipient.full_name": "Nama Lengkap",
  "recipient.full_name_placeholder": "Sesuai dokumen resmi bank",
  "recipient.transfer_purpose": "Tujuan Transfer",
  "recipient.transfer_purpose_placeholder": "Pilih tujuan",
  "recipient.email": "Email (Opsional)",
  "recipient.email_placeholder": "penerima@contoh.com",
  "recipient.note": "Catatan (Opsional)",
  "recipient.note_placeholder": "Informasi tambahan untuk penerima...",
  "recipient.continue": "Lanjutkan ke Review",
  "recipient.select_bank": "Pilih Bank",
  "recipient.search_bank": "Cari nama bank...",
  "recipient.no_bank_found": "Bank tidak ditemukan",
  "recipient.purpose.family_support": "Dukungan Keluarga",
  "recipient.purpose.education": "Pendidikan",
  "recipient.purpose.business_payment": "Pembayaran Bisnis",
  "recipient.purpose.personal_expenses": "Biaya Pribadi",
  "recipient.purpose.other": "Lainnya",

  // ---- Review Page ----
  "review.title": "Periksa sebelum mengirim",
  "review.subtitle": "Periksa kembali ringkasan transaksi sebelum mengonfirmasi pengiriman dana.",
  "review.back": "Kembali ke Data Penerima",
  "review.send_details": "Detail Pengiriman & Kurs",
  "review.recipient_info": "Informasi Penerima",
  "review.payment_method": "Metode Pembayaran",
  "review.payment_bank_label": "Transfer Dana via",
  "review.promo_code": "Kode Promo",
  "review.promo_placeholder": "Masukkan kode promo",
  "review.promo_apply": "Pakai",
  "review.promo_remove": "Hapus",
  "review.promo_applied": "Promo berhasil diterapkan!",
  "review.promo_invalid": "Kode promo tidak valid atau sudah kadaluarsa.",
  "review.promo_inactive": "Kode promo ini sudah tidak aktif.",
  "review.promo_min_amount": "Transfer minimum IDR {min} diperlukan untuk promo ini.",
  "review.confirm_button": "Konfirmasi Transfer",
  "review.total_payment": "Total Pembayaran",
  "review.transfer_fee": "Biaya Transfer",
  "review.discount": "Diskon Promo",
  "review.send_amount": "Nominal Kirim",
  "review.receive_amount": "Penerima Menerima",
  "review.rate": "Nilai Tukar",
  "review.service": "Layanan & Kecepatan",

  // ---- Confirm Dialog ----
  "confirm.title": "Konfirmasi Transfer",
  "confirm.subtitle": "Mohon verifikasi rincian berikut sebelum melanjutkan.",
  "confirm.recipient": "Penerima",
  "confirm.destination": "Tujuan",
  "confirm.send_amount": "Nominal Kirim",
  "confirm.fee": "Biaya",
  "confirm.total": "Total",
  "confirm.button": "Ya, Konfirmasi Transfer",
  "confirm.cancel": "Batal, Periksa Lagi",
  "confirm.disclaimer": "Ini adalah simulasi prototipe. Tidak ada dana riil yang akan ditransfer.",

  // ---- Success Page ----
  "success.title": "Pengiriman dalam proses",
  "success.subtitle":
    "Transaksi simulasi pengiriman uang Anda telah berhasil dibuat dan sedang diproses.",
  "success.heading": "Pengiriman Berhasil Diajukan",
  "success.ref": "No. Referensi",
  "success.copy": "Salin",
  "success.copied": "Tersalin!",
  "success.send_again": "Kirim Uang Lagi",
  "success.view_history": "Lihat Riwayat Transaksi",
  "success.summary": "Ringkasan Transaksi",
  "success.recipient_name": "Penerima",
  "success.bank_account": "Bank & Rekening",
  "success.destination_country": "Negara Tujuan",
  "success.transfer_purpose": "Tujuan Transfer",
  "success.send_amount": "Nominal Dikirim",
  "success.receive_amount": "Penerima Menerima",
  "success.rate": "Nilai Tukar",
  "success.fee_speed": "Biaya & Kecepatan",
  "success.total_payment": "Total Pembayaran",
  "success.created_at": "Waktu Transaksi",

  // ---- Rating ----
  "rating.title": "Bagaimana pengalaman transfer Anda?",
  "rating.subtitle": "Bantu kami meningkatkan kualitas layanan simulasi transfer Topremit.",
  "rating.submit": "Kirim Ulasan",
  "rating.comment_label": "Komentar atau Masukan (Opsional)",
  "rating.comment_placeholder": "Ceritakan pengalaman Anda menggunakan prototipe Topremit...",
  "rating.thank_you_title": "Terima Kasih Atas Ulasan Anda!",
  "rating.1": "Sangat Tidak Puas",
  "rating.2": "Kurang Puas",
  "rating.3": "Cukup",
  "rating.4": "Puas",
  "rating.5": "Sangat Puas! ⭐",
  "rating.select_error": "Silakan pilih jumlah bintang (1–5) terlebih dahulu.",
  "rating.already_rated": "Rating sudah pernah diberikan untuk transaksi ini.",
  "rating.failed": "Gagal menyimpan ulasan. Silakan coba kembali.",

  // ---- History Page ----
  "history.title": "Riwayat transfer Anda",
  "history.subtitle":
    "Pantau status pengiriman dana dan rincian transaksi pengiriman uang internasional Anda.",
  "history.send_money": "Kirim Uang",
  "history.search_placeholder": "Cari berdasarkan referensi, nama, atau negara...",
  "history.tab.all": "Semua",
  "history.tab.processing": "Sedang Diproses",
  "history.tab.completed": "Selesai",
  "history.tab.pending": "Menunggu",
  "history.empty_title": "Belum Ada Riwayat Transaksi",
  "history.empty_description":
    "Anda belum pernah melakukan simulasi pengiriman uang. Mulai sekarang untuk merasakan kemudahan kirim uang internasional.",
  "history.empty_cta": "Kirim Uang Sekarang",
  "history.search_empty_title": "Tidak Ada Transaksi Ditemukan",
  "history.search_empty_description":
    'Tidak ada transaksi yang cocok dengan pencarian "{query}" pada filter ini.',
  "history.search_empty_cta": "Reset Pencarian & Filter",
  "history.loading": "Memuat riwayat transaksi pengiriman...",
  "history.error_title": "Gagal Memuat Riwayat",
  "history.retry": "Coba Lagi",

  // ---- Transaction Detail ----
  "detail.back": "Kembali ke Riwayat",
  "detail.ref": "Nomor Referensi Transaksi",
  "detail.payment_details": "Rincian Pembayaran & Kurs",
  "detail.recipient_info": "Informasi Penerima",
  "detail.payment_account": "Rekening Tujuan Pembayaran Simulasi",
  "detail.payment_account_note":
    "Pada sistem riil, pembayaran ditransfer ke rekening virtual account berikut:",
  "detail.send_again": "Kirim Uang Lagi",
  "detail.not_found_title": "Transaksi Tidak Ditemukan",
  "detail.not_found_description":
    "Nomor referensi atau ID {id} tidak ditemukan di sistem simulasi ini.",

  // ---- Status Labels ----
  "status.pending": "Menunggu Pembayaran",
  "status.processing": "Sedang Diproses",
  "status.completed": "Berhasil Terkirim",
  "status.failed": "Gagal",
  "status.cancelled": "Dibatalkan",

  // ---- Error / Empty States ----
  "error.generic_title": "Terjadi Kendala",
  "error.retry": "Coba Lagi",
  "empty.generic_title": "Tidak Ada Data",

  // ---- Misc ----
  "misc.note": "Catatan",
  "misc.email": "Email",
  "misc.or": "atau",
  "misc.regular_days": "3 hari kerja bank",
  "misc.instant_time": "15–60 menit",
  "misc.business_days": "Senin–Jumat",
};

export default id;
