<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
          📖 Tentang Aplikasi Ini
        </h1>
        <p class="text-lg text-content-light">
          Sistem Rekomendasi Moisturizer menggunakan Algoritma K-Nearest Neighbors (KNN).
        </p>
      </div>

      <!-- Project Info Card -->
      <div class="bg-white rounded-xl shadow-lg mb-8 p-8">
        <h2 class="text-2xl text-peach-600 mb-4 font-bold">🎓 Tentang Proyek</h2>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-content">Judul Skripsi:</p>
            <p class="text-content-light">
              "Analisis dan Implementasi Algoritma K-Nearest Neighbors (KNN) untuk Sistem
              Rekomendasi Moisturizer Berdasarkan Tipe Kulit pada Remaja Wanita"
            </p>
          </div>
          <hr class="border-gray-200"/>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="font-semibold text-content">Peneliti:</p>
              <p class="text-content-light">[ Nama Mahasiswa ]</p>
            </div>
            <div>
              <p class="font-semibold text-content">Institusi:</p>
              <p class="text-content-light">Universitas Pamulang</p>
            </div>
          </div>
        </div>
      </div>

      <!-- KNN Algorithm Card -->
      <div class="bg-white rounded-xl shadow-lg mb-8 p-8">
        <h2 class="text-2xl text-pink-500 mb-4 font-bold">🤖 Cara Kerja Algoritma KNN</h2>
        <p class="mb-6 text-content-light">
          <strong>K-Nearest Neighbors (KNN)</strong> adalah algoritma machine learning yang bekerja dengan mencari "tetangga terdekat" dari input yang diberikan untuk menemukan produk yang paling mirip.
        </p>
        <!-- Custom Steps Component -->
        <div class="relative">
          <div class="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-pink-200"></div>
          <div class="relative flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
            <div v-for="(step, index) in steps" :key="step.title" class="flex-1 text-center flex flex-col items-center">
              <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10">{{ index + 1 }}</div>
              <h3 class="mt-2 font-semibold text-content">{{ step.title }}</h3>
              <p class="text-sm text-content-light">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/" class="btn btn-primary btn-lg">
          🚀 Coba Rekomendasi Sekarang
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { title: 'Input Preferensi', desc: 'Anda memilih tipe kulit, tekstur, & kandungan.' },
  { title: 'Encoding Data', desc: 'Input diubah menjadi format numerik.' },
  { title: 'Hitung Jarak', desc: 'Mencari jarak terdekat dengan data produk.' },
  { title: 'Ranking', desc: 'Mengambil 5 produk dengan jarak terdekat.' },
  { title: 'Hasil', desc: 'Menampilkan produk yang paling cocok.' },
];
</script>