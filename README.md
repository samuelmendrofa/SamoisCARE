# MurniMedika — Domain A: Klinik Digital

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Local_Persistence-00b894)

> MurniMedika adalah aplikasi layanan klinik digital terpadu berbasis mobile yang mempermudah pasien dalam melakukan pendaftaran akun, pencarian dan booking jadwal dokter spesialis, verifikasi KTP, serta penyimpanan riwayat rekam medis secara offline dan persisten. Aplikasi ini menyelesaikan masalah antrean panjang di klinik fisik dan memberikan akses pengelolaan data kesehatan pasien yang mandiri dan aman.

---

## 📸 Screenshots

| Login Screen | Home Screen | Profile Screen |
|:---:|:---:|:---:|
| <img width="716" height="1600" alt="image" src="https://github.com/user-attachments/assets/1158a8e7-0149-49c7-b6b4-ca545c1a2776" /> | <img width="716" height="1600" alt="image" src="https://github.com/user-attachments/assets/2cfe4da7-d6ea-48d1-ba39-3e10dd440d53" /> | <img width="403" height="1280" alt="image" src="https://github.com/user-attachments/assets/346cec47-b92b-485f-9110-d1c93f55cc5d" /> |

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
git clone [https://github.com/samuelmendrofa/SamoisCARE.git](https://github.com/samuelmendrofa/SamoisCARE.git)
