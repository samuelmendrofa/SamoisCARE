# MurniMedika — Domain A: Klinik Digital

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Local_Persistence-00b894)

> MurniMedika adalah aplikasi layanan klinik digital terpadu berbasis mobile yang mempermudah pasien dalam melakukan pendaftaran akun, pencarian dan booking jadwal dokter spesialis, verifikasi KTP, serta penyimpanan riwayat rekam medis secara offline dan persisten. Aplikasi ini menyelesaikan masalah antrean panjang di klinik fisik dan memberikan akses pengelolaan data kesehatan pasien yang mandiri dan aman.

---

## 📸 Screenshots

| Login Screen | Home Screen | Feature Screen |
|:---:|:---:|:---:|
| ![Login](assets/screenshots/login.png) | ![Home](assets/screenshots/home.png) | ![Feature](assets/screenshots/feature.png) |

> *Catatan: Pastikan kamu telah menyimpan foto screenshot aplikasi di folder `assets/screenshots/` dengan nama `login.png`, `home.png`, dan `feature.png`.*

---

## ✨ Fitur Utama

- [x] Login/Register pasien dengan validasi form & show/hide password
- [x] Reset / Lupa Kata Sandi terverifikasi via email
- [x] Daftar dokter spesialis lengkap dengan FlatList, rating, & filter
- [x] Form Booking Konsultasi dokter dengan pencatatan keluhan medis
- [x] Foto KTP pasien via Kamera & Foto Profil via Kamera/Galeri (`expo-image-picker`)
- [x] Pemilih tanggal lahir intuitif dengan komponen `DateTimePicker`
- [x] Data persisten terenkripsi lokal menggunakan `AsyncStorage` CRUD
- [x] Navigasi gabungan React Navigation (Stack + Bottom Tab 2 tab utama)
- [x] Manajemen edit profil lengkap & fitur hapus akun permanen

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React Native + Expo (Managed Workflow) |
| Navigation | React Navigation v6 (Native Stack + Bottom Tab) |
| Storage | @react-native-async-storage/async-storage |
| Device Feature | expo-image-picker & @react-native-community/datetimepicker |
| Build Tool | EAS Build (Expo Application Services) |

---

## 🚀 Cara Menjalankan

1. Clone repository ini ke komputer kamu:
```bash
git clone [https://github.com/USERNAME_KAMU/KlinikDigital-UAS.git](https://github.com/USERNAME_KAMU/KlinikDigital-UAS.git)
