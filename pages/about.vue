<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary mb-4">
          📖 Tentang Aplikasi Ini
        </h1>
        <p class="text-lg text-base-content/70">
          Sistem Rekomendasi Moisturizer menggunakan Algoritma K-Nearest Neighbors (KNN)
        </p>
      </div>

      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h2 class="card-title text-2xl text-secondary mb-4">🎓 Tentang Proyek</h2>
          <div>
            <p class="font-semibold">Judul Skripsi:</p>
            <p class="text-base-content/80">
              "Analisis dan Implementasi Algoritma K-Nearest Neighbors (KNN) untuk Sistem
              Rekomendasi Moisturizer Berdasarkan Tipe Kulit pada Remaja Wanita"
            </p>
          </div>
          <div class="divider"></div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="font-semibold">Peneliti:</p>
              <p class="text-base-content/80">Abdullah Rendra Zuriansyah</p>
            </div>
            <div>
              <p class="font-semibold">Institusi:</p>
              <p class="text-base-content/80">Universitas Pamulang</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h2 class="card-title text-2xl text-accent mb-4">🤖 Algoritma KNN</h2>
          <p class="mb-4">
            <strong>K-Nearest Neighbors (KNN)</strong> adalah algoritma machine learning yang bekerja
            dengan mencari "tetangga terdekat" dari input yang diberikan.
          </p>
          <ul class="steps steps-vertical lg:steps-horizontal w-full">
            <li class="step step-primary">Input Preferensi</li>
            <li class="step step-primary">One-Hot Encoding</li>
            <li class="step step-primary">Hitung Jarak</li>
            <li class="step step-primary">Top-5 Terdekat</li>
            <li class="step step-primary">Hasil</li>
          </ul>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/public" class="btn btn-primary btn-lg">
          🚀 Coba Sekarang
        </NuxtLink>
      </div>
    </div>
  </div>
</template>