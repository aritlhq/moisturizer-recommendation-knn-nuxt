# Sistem Rekomendasi Moisturizer

Selamat datang di proyek Sistem Rekomendasi Moisturizer. Aplikasi web ini dibangun menggunakan Nuxt.js untuk antarmuka dan layanan *backend*, serta Python dengan algoritma K-Nearest Neighbors (KNN) untuk sistem rekomendasinya.

Aplikasi ini dirancang untuk memberikan rekomendasi produk *moisturizer* kepada pengguna berdasarkan preferensi pribadi mereka, seperti tipe kulit, tekstur produk, dan kandungan utama.

## Fitur Utama

-   **Rekomendasi Cerdas**: Menggunakan algoritma KNN untuk menemukan 5 produk yang paling sesuai dari kumpulan data yang tersedia.
-   **Database Produk**: Dilengkapi dengan data ribuan produk *moisturizer* yang ada di pasaran.
-   **Antarmuka Interaktif**: Menyediakan formulir masukan yang mudah digunakan untuk memasukkan preferensi pengguna.
-   **Dasbor Admin**: Menyediakan halaman khusus admin untuk mengelola data produk (membuat, membaca, memperbarui, dan menghapus).

## Teknologi yang Digunakan

-   **Frontend**: Nuxt.js 3 (Kerangka Kerja Vue.js)
-   **Styling**: Tailwind CSS
-   **State Management**: Pinia
-   **Backend (API)**: Nuxt.js 3 Server Engine (Nitro)
-   **Database**: MySQL
-   **Machine Learning**: Python
    -   **Pustaka**: Scikit-learn, Pandas, Joblib
    -   **Algoritma**: K-Nearest Neighbors (KNN)

## Persiapan Awal

Sebelum memulai, pastikan perangkat lunak berikut telah terpasang di sistem Windows kamu:

1.  **Node.js**: Versi 18.x atau yang lebih baru.
2.  **Python**: Versi 3.8 atau yang lebih baru. Pastikan untuk mencentang opsi **"Add Python to PATH"** saat proses instalasi.
3.  **XAMPP**: Untuk server Apache dan database MySQL. Alternatif lain seperti Laragon atau instalasi MySQL manual juga dapat digunakan.
4.  **Git**: Untuk mengkloning repositori.

## Panduan Instalasi dan Pengaturan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal kamu.

### 1. Mengunduh Repositori

Buka Command Prompt atau Git Bash, lalu kloning repositori ini ke direktori yang kamu inginkan.

```bash
git clone https://github.com/aritlhq/moisturizer-recommendation-knn-nuxt.git
cd moisturizer-recommendation-knn-nuxt
```

### 2. Pengaturan Database MySQL

1.  Jalankan **XAMPP Control Panel** dan aktifkan modul **Apache** serta **MySQL**.
2.  Akses `http://localhost/phpmyadmin` melalui peramban web.
3.  Buat database baru dengan nama `moisturizer_db`.
4.  Pilih database `moisturizer_db`, lalu buka tab **"Import"**.
5.  Klik **"Choose File"** dan pilih file `db/schema.sql` yang ada di dalam direktori proyek.
6.  Klik tombol **"Go"** atau **"Import"** untuk membuat semua tabel yang diperlukan.

### 3. Konfigurasi Environment

1.  Buat salinan dari file `.env.example` dan ubah namanya menjadi `.env`.
2.  Buka file `.env` tersebut dan sesuaikan konfigurasinya, terutama `NUXT_DB_PASSWORD`. Biarkan `NUXT_PYTHON_PATH` kosong untuk sementara.

    ```env
    # Konfigurasi Database
    NUXT_DB_HOST=localhost
    NUXT_DB_PORT=3306
    NUXT_DB_USER=root
    NUXT_DB_PASSWORD= # <-- ISI DENGAN PASSWORD MYSQL (untuk XAMPP standar, biasanya kosong)
    NUXT_DB_NAME=moisturizer_db
    
    # Kunci Rahasia JWT
    NUXT_JWT_SECRET=ini-tidak-perlu-diubah
    
    # Path Python (akan diisi nanti)
    NUXT_PYTHON_PATH=
    ```

### 4. Pengaturan Lingkungan Machine Learning (Python)

Langkah ini penting untuk mengisolasi dependensi Python proyek agar tidak tercampur dengan sistem global.

1.  Buka **Command Prompt** (CMD) dan navigasikan ke folder `scripts`.
    ```cmd
    cd scripts
    ```
2.  Buat *virtual environment* baru dengan nama `env`.
    ```cmd
    python -m venv env
    ```
3.  Aktifkan *virtual environment* tersebut.
    ```cmd
    .\env\Scripts\activate.bat
    ```
    Terminal kamu akan menampilkan `(env)` di awal baris, yang menandakan lingkungan virtual telah aktif.
4.  Pasang semua dependensi Python yang dibutuhkan dari file `requirements.txt`.
    ```cmd
    pip install -r requirements.txt
    ```
5.  Temukan path lengkap dari interpreter Python di dalam `env`.
    ```cmd
    where python
    ```
    Salin path pertama yang muncul, yang akan terlihat seperti: `D:\path\ke\proyek\anda\scripts\env\Scripts\python.exe`.
6.  Buka kembali file `.env` di direktori utama proyek, lalu tempel path yang telah kamu salin ke dalam variabel `NUXT_PYTHON_PATH`.
    ```ini
    # Contoh
    NUXT_PYTHON_PATH=D:\Github-Repositories\moisturizer-recommendation-knn-nuxt\scripts\env\Scripts\python.exe
    ```

### 5. Pengaturan Proyek Nuxt.js

1.  Kembali ke direktori utama proyek.
    ```cmd
    cd ..
    ```
2.  Pasang semua dependensi Node.js.
    ```bash
    npm install
    ```
3.  Jalankan skrip untuk mengimpor data produk ke dalam database.
    ```bash
    npm run import-data
    ```
    Skrip ini akan mengisi database kamu. Repositori ini sudah menyertakan data lengkap beserta URL gambar (`products_with_images.json`), sehingga proses ini akan berjalan **sangat cepat (hanya beberapa detik)**. Jika file tersebut dihapus, skrip akan melakukan proses *scraping* gambar dari awal yang dapat memakan waktu lebih dari satu jam.

4.  Jalankan skrip untuk melatih model KNN dari data yang baru saja diimpor.
    ```bash
    npm run setup-ml
    ```
5.  Buat pengguna admin dengan kredensial default (`username: admin`, `password: admin123`).
    ```bash
    npm run create-admin
    ```

### 6. Menjalankan Aplikasi

Setelah semua langkah selesai, jalankan server pengembangan Nuxt.js.

```bash
npm run dev
```

Aplikasi sekarang dapat diakses melalui **http://localhost:3000**.

## Halaman Admin

-   **URL Login**: `http://localhost:3000/admin/login`
-   **Username**: `admin`
-   **Password**: `admin123`
