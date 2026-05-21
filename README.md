# BugForge
AI-powered bug bounty report generator to convert raw notes into professional, submission-ready reports in seconds.

## Tech Stack
- **React 19 & Next.js 16 (App Router)** (Frontend Framework)
- **Tailwind CSS** (Styling & Layout)
- **TypeScript** (Static Typing)
- **jsPDF** (Client-side PDF Generation & Export)

## Fitur
- ⚡ **Instant AI report generation**: Mengubah catatan kasar, payload, dan log reproduksi menjadi laporan kerentanan yang terstruktur secara otomatis.
- 📝 **Live Preview & Direct Editing**: Edit hasil laporan markdown langsung pada editor pratinjau sebelum menyalin atau mengunduh hasil.
- 📋 **One-click Clipboard Copy**: Salin laporan dalam format markdown dengan satu klik untuk disubmit ke platform bug bounty.
- 📄 **Clean PDF Export**: Ekspor laporan langsung menjadi dokumen PDF A4 dengan layout profesional, blok kode monospace, dan lencana tingkat keparahan (*severity badge*).
- 📱 **Fully Responsive Layout**: Antarmuka bertema gelap premium yang responsif dan nyaman digunakan di HP, tablet, maupun desktop.
- 🚀 **Interactive Samples**: Pengisian contoh laporan instan untuk menguji alur generator dengan sekali klik.

## Menu & Hak Akses
| Menu / Halaman | Deskripsi | Fitur yang Tersedia |
| :--- | :--- | :--- |
| `Home` | Landing page utama yang memuat deskripsi, cara kerja, dan navigasi utama. | Navigasi ke workspace generator |
| `Generator` | Workspace utama yang terbagi menjadi formulir input (kiri) dan editor pratinjau (kanan). | Input form, Load Contoh Catatan, AI Generation, Live Edit, Copy Markdown, Unduh PDF |

## Instalasi

```bash
# Clone & install dependensi
git clone https://github.com/username/bugforge.git
cd bugforge
npm install

# Jalankan server lokal untuk pengembangan
npm run dev

# Build aplikasi untuk tahap produksi
npm run build
```

## Environment Variables (.env)
Karena seluruh pemrosesan dan generator berjalan di sisi klien (*client-side*), tidak diperlukan konfigurasi database eksternal. Anda cukup menggunakan port bawaan Next.js:
```env
PORT=3000
NODE_ENV=development
```
