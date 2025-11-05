# Sistem Rekomendasi Moisturizer

Selamat datang di proyek Sistem Rekomendasi Moisturizer! Aplikasi web ini dibangun menggunakan Nuxt.js untuk frontend dan backend, serta Python dengan algoritma K-Nearest Neighbors (KNN) untuk sistem rekomendasinya.

Aplikasi ini memungkinkan pengguna untuk mendapatkan rekomendasi produk moisturizer berdasarkan preferensi pribadi mereka seperti tipe kulit, tekstur produk, dan kandungan utama.

## Fitur Utama

-   **Rekomendasi Cerdas**: Menggunakan algoritma KNN untuk menemukan 5 produk yang paling cocok dari dataset.
-   **Database Produk**: Dilengkapi dengan ribuan data produk moisturizer yang ada di pasaran.
-   **Antarmuka Interaktif**: Formulir input yang mudah digunakan untuk memasukkan preferensi pengguna.
-   **Dashboard Admin**: Halaman admin untuk mengelola (CRUD - Create, Read, Update, Delete) data produk yang ada di database.

## Teknologi yang Digunakan

-   **Frontend**: [Nuxt.js 3](https://nuxt.com/) (Vue.js Framework)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Pinia](https://pinia.vuejs.org/)
-   **Backend (API)**: Nuxt.js 3 Server Engine ([Nitro](https://nitro.unjs.io/))
-   **Database**: [MySQL](https://www.mysql.com/)
-   **Machine Learning**: [Python](https://www.python.org/)
    -   **Library**: Scikit-learn, Pandas, Joblib
    -   **Algoritma**: K-Nearest Neighbors (KNN)

## Persiapan Awal (Prerequisites)

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di sistem Windows Anda:

1.  **Node.js**: Versi 18.x atau lebih baru. Unduh dari [nodejs.org](https://nodejs.org/).
2.  **Python**: Versi 3.8 atau lebih baru. Unduh dari [python.org](https://www.python.org/).
    -   **Penting**: Saat instalasi, pastikan Anda mencentang kotak **"Add Python to PATH"**.
3.  **XAMPP**: Untuk server Apache dan database MySQL. Unduh dari [apachefriends.org](https://www.apachefriends.org/). Alternatif lain seperti Laragon atau instalasi MySQL manual juga bisa digunakan.
4.  **Git**: Untuk mengkloning repositori. Unduh dari [git-scm.com](https://git-scm.com/).

## Panduan Instalasi dan Setup (Langkah demi Langkah)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda.

### 1. Mengunduh Repositori

Buka Command Prompt atau Git Bash, lalu kloning repositori ini ke direktori pilihan.

```bash
git clone https://github.com/username/moisturizer-recommendation-knn-nuxt.git
cd moisturizer-recommendation-knn-nuxt
```

atau bisa langsung mengunduh .zip nya [di sini](https://github.com/aritlhq/moisturizer-recommendation-knn-nuxt/archive/refs/heads/master.zip)

### 2. Setup Database MySQL

1.  Jalankan **XAMPP Control Panel** dan start modul **Apache** dan **MySQL**.
2.  Buka browser dan akses `http://localhost/phpmyadmin`.
3.  Buat database baru dengan nama `moisturizer_db`.
4.  Pilih database `moisturizer_db`, lalu klik tab **"Import"**.
5.  Klik **"Choose File"** dan pilih file `db/schema.sql` dari dalam direktori proyek.
6.  Klik tombol **"Go"** atau **"Import"** di bagian bawah untuk membuat semua tabel yang dibutuhkan.

### 3. Konfigurasi Environment

1.  Buat salinan dari file `.env.example` dan beri nama `.env`.
2.  Buka file `.env` yang baru dibuat dan sesuaikan konfigurasinya, terutama `NUXT_DB_PASSWORD`. Biarkan `NUXT_PYTHON_PATH` kosong untuk saat ini.

    ```env
    # Database Configuration
    NUXT_DB_HOST=localhost
    NUXT_DB_PORT=3306
    NUXT_DB_USER=root
    NUXT_DB_PASSWORD= # <-- ISI PASSWORD MYSQL ANDA JIKA ADA (default XAMPP kosong)
    NUXT_DB_NAME=moisturizer_db
    
    # JWT Secret
    NUXT_JWT_SECRET=ini-tidak-perlu-diubah
    
    # Python Path (akan diisi nanti)
    NUXT_PYTHON_PATH=
    ```
### 4. Setup Lingkungan Machine Learning (Python)

Langkah ini sangat penting untuk mengisolasi dependensi Python proyek ini dari sistem global Anda.

1.  Buka **Command Prompt** (CMD) dan navigasi ke folder `scripts`.
    ```cmd
    cd scripts
    ```
2.  Buat *virtual environment* bernama `env`.
    ```cmd
    python -m venv env
    ```
3.  Aktifkan *virtual environment* tersebut.
    ```cmd
    .\env\Scripts\activate.bat
    ```
    Prompt terminal Anda sekarang akan diawali dengan `(env)`, menandakan bahwa lingkungan virtual sudah aktif.
4.  Instal semua dependensi Python yang dibutuhkan.
    ```cmd
    pip install -r requirements.txt
    ```
5.  Temukan path lengkap ke interpreter Python di dalam `env`.
    ```cmd
    where python
    ```
    Salin path pertama yang muncul, yang akan terlihat seperti: `D:\path\to\your\project\scripts\env\Scripts\python.exe`.
6.  Buka kembali file `.env` di root proyek dan tempel path yang sudah Anda salin ke variabel `NUXT_PYTHON_PATH`.
    ```ini
    # Contoh
    NUXT_PYTHON_PATH=D:\Github-Repositories\moisturizer-recommendation-knn-nuxt\scripts\env\Scripts\python.exe
    ```

### 5. Setup Proyek Nuxt.js

1.  Kembali ke direktori root proyek.
    ```cmd
    cd ..
    ```
2.  Instal dependensi Node.js.
    ```bash
    npm install
    ```
3.  Jalankan skrip untuk mengimpor data dari `dataset.csv` ke database Anda. Skrip ini juga akan secara otomatis melakukan scraping gambar produk (proses ini mungkin memakan waktu lebih dari 1 jam).
    ```bash
    npm run import-data
    ```
4.  Jalankan skrip untuk melatih model KNN dari data yang baru saja diimpor.
    ```bash
    npm run setup-ml
    ```
5.  Buat pengguna admin default (`username: admin`, `password: admin123`).
    ```bash
    npm run create-admin
    ```

### 6. Menjalankan Aplikasi

Setelah semua langkah di atas selesai, jalankan server pengembangan Nuxt.js.

```bash
npm run dev
```

Aplikasi sekarang dapat diakses di **[http://localhost:3000](http://localhost:3000)**.

## Halaman Admin

-   **URL Login**: `http://localhost:3000/admin/login`
-   **Username**: `admin`
-   **Password**: `admin123`