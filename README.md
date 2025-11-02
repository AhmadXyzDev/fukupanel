# 🚀 Fukushima Panel Installer

Website Installer Panel Server Otomatis dengan tampilan futuristik dan super keren!

## ✨ Fitur

- 🎨 **Desain Futuristik** dengan animasi gradient dan blur effects
- 💫 **11 Paket Server** (1GB - 10GB + Unlimited)
- ⚡ **Auto Create Panel** menggunakan Pterodactyl API
- 🔐 **Auto Generate Password** yang aman
- 📋 **Copy to Clipboard** untuk username & password
- 📱 **Responsive Design** untuk semua perangkat
- 🎯 **Real-time Validation** untuk input

## 📁 Struktur Folder

```
fukushima-panel-installer/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── api/
│   └── create-panel.js
├── config.js
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

## 🛠️ Instalasi

### 1. Clone atau Download Project

```bash
git clone <repository-url>
cd fukushima-panel-installer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi API

Edit file `config.js` dan sesuaikan dengan data Pterodactyl Anda:

```javascript
const config = {
  egg: "15",                    // Egg ID dari Pterodactyl
  nestid: "5",                  // Nest ID dari Pterodactyl
  loc: "1",                     // Location ID dari Pterodactyl
  domain: "https://fukushima.brengsek.my.id",  // Domain Pterodactyl Anda
  apikey: "ptla_...",           // Application API Key
  capikey: "ptlc_...",          // Client API Key (opsional)
  storename: "Fukushima Store"  // Nama toko Anda
};
```

**Cara mendapatkan API Key:**
1. Login ke panel Pterodactyl Anda
2. Pergi ke **Application API** di menu Account
3. Create New API Key dengan permission:
   - `users` - Create & Read
   - `servers` - Create, Read, Update, Delete

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

1. **Install Vercel CLI** (jika belum):
```bash
npm install -g vercel
```

2. **Login ke Vercel**:
```bash
vercel login
```

3. **Deploy Project**:
```bash
vercel
```

4. **Deploy Production**:
```bash
vercel --prod
```

### Deploy Manual

1. Push project ke GitHub
2. Import project di [Vercel Dashboard](https://vercel.com)
3. Vercel akan otomatis mendeteksi konfigurasi
4. Klik Deploy!

## 🔧 Development

Untuk testing di local:

```bash
# Install Vercel CLI
npm install -g vercel

# Jalankan dev server
vercel dev
```

Website akan berjalan di `http://localhost:3000`

## 📦 Paket yang Tersedia

| Paket | RAM | Disk | CPU | Harga |
|-------|-----|------|-----|-------|
| 1GB | 1 GB | 1 GB | 40% | Rp 5.000 |
| 2GB | 2 GB | 1 GB | 60% | Rp 10.000 |
| 3GB | 3 GB | 2 GB | 80% | Rp 15.000 |
| 4GB | 4 GB | 2 GB | 100% | Rp 20.000 |
| 5GB | 5 GB | 3 GB | 120% | Rp 25.000 |
| 6GB | 6 GB | 3 GB | 140% | Rp 30.000 |
| 7GB | 7 GB | 4 GB | 160% | Rp 35.000 |
| 8GB | 8 GB | 4 GB | 180% | Rp 40.000 |
| 9GB | 9 GB | 5 GB | 200% | Rp 45.000 |
| 10GB | 10 GB | 5 GB | 220% | Rp 50.000 |
| Unlimited | ∞ | ∞ | ∞ | Rp 100.000 |

## 🎨 Customisasi

### Mengubah Warna Tema

Edit `public/style.css` bagian gradient:

```css
body {
    background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
}
```

### Menambah/Mengurangi Paket

Edit array `plans` di `public/script.js` dan `api/create-panel.js`:

```javascript
const plans = [
    { id: '1gb', name: '1GB RAM', ram: 1000, disk: 1000, cpu: 40, price: '5.000' },
    // Tambahkan paket baru di sini
];
```

### Mengubah Logo/Nama

Edit `public/index.html` bagian header:

```html
<h1>
    <span class="zap">⚡</span>
    NAMA ANDA
    <span class="zap">⚡</span>
</h1>
```

## 🔒 Keamanan

- ✅ Password di-generate secara random
- ✅ Username hanya menerima huruf kecil dan angka
- ✅ API Key tidak ter-expose ke frontend
- ✅ CORS protection
- ✅ Error handling yang proper

## 🐛 Troubleshooting

### Error "Method not allowed"
- Pastikan API endpoint menggunakan POST method
- Check `vercel.json` routes sudah benar

### Error "Gagal membuat user"
- Cek API Key di `config.js` sudah benar
- Pastikan API Key memiliki permission yang cukup
- Cek domain Pterodactyl sudah benar (tanpa trailing slash)

### Panel tidak ter-create
- Cek Network tab di browser untuk melihat error
- Cek Vercel logs untuk error di server
- Pastikan egg, nest, dan location ID sudah benar

### Username sudah ada
- Username harus unique
- Gunakan username yang berbeda

## 📝 API Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "username": "testuser",
    "password": "testuser1a2b",
    "serverId": 123,
    "ram": "1 GB",
    "cpu": "40%",
    "disk": "1 GB",
    "date": "02 November 2025",
    "domain": "https://fukushima.brengsek.my.id"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Username dan plan harus diisi!"
}
```

## 📄 License

MIT License - Bebas digunakan untuk project pribadi atau komersial.

## 💬 Support

Jika ada pertanyaan atau issue:
- Create issue di GitHub
- Contact: [Your Contact]

## 🌟 Credits

Created with ❤️ by **Fukushima Store**

---

**Happy Deploying! 🚀**