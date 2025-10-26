<template>
  <div>
    <!-- Hero Section -->
    <div class="container mx-auto px-4 pt-16 pb-20 text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold mb-6 text-pink-500 leading-tight">
          Temukan Moisturizer Perfect Match Anda! 💧
        </h1>
        <p class="text-lg md:text-xl text-content-light mb-8 max-w-2xl mx-auto">
          Dapatkan rekomendasi personal berdasarkan tipe kulit dan preferensi Anda, didukung oleh Algoritma Cerdas KNN.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="scrollToForm" class="btn btn-primary btn-lg">
            Mulai Sekarang!
          </button>
          <button @click="scrollToIntro" class="btn btn-outline btn-lg">
            Pelajari Dulu
          </button>
        </div>
      </div>
    </div>

    <!-- Intro Section -->
    <div ref="introSection" class="container mx-auto px-4 py-12">
      <SkincareIntro />
    </div>

    <!-- Divider -->
    <div class="container mx-auto px-4">
      <hr class="border-gray-200" />
    </div>

    <!-- Form Section -->
    <div ref="formSection" class="container mx-auto px-4 py-20">
      <div class="max-w-2xl mx-auto">
        <InputForm />
      </div>
    </div>

    <!-- How it Works Section -->
    <div class="bg-cream-100 py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-10 text-content">
          Bagaimana Cara Kerjanya?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div class="text-5xl mb-4">📝</div>
            <h3 class="text-xl font-bold mb-2">1. Input Preferensi</h3>
            <p class="text-content-light">
              Pilih tipe kulit, tekstur, dan kandungan utama yang Anda inginkan.
            </p>
          </div>
          <!-- Step 2 -->
          <div class="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div class="text-5xl mb-4">🤖</div>
            <h3 class="text-xl font-bold mb-2">2. Analisis KNN</h3>
            <p class="text-content-light">
              Sistem kami akan mencari 5 produk yang paling cocok dari database.
            </p>
          </div>
          <!-- Step 3 -->
          <div class="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div class="text-5xl mb-4">✨</div>
            <h3 class="text-xl font-bold mb-2">3. Hasil Rekomendasi</h3>
            <p class="text-content-light">
              Dapatkan daftar produk terbaik yang dipersonalisasi untuk Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const introSection = ref(null)
const formSection = ref(null)

const scrollToIntro = () => {
  introSection.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const scrollToForm = () => {
  formSection.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>