<template>
  <div class="container mx-auto px-4 py-12">
    <div class="hero min-h-[70vh] bg-accent/50 rounded-3xl mb-12">
      <div class="hero-content text-center">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-primary leading-tight">
            Temukan Moisturizer Perfect Match! 💧
          </h1>
          <p class="text-lg md:text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
            Rekomendasi personal berdasarkan tipe kulit dan preferensimu menggunakan Algoritma KNN
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="scrollToForm" class="btn btn-primary btn-lg gap-2">
              Mulai Sekarang - Gratis!
            </button>
            <button @click="scrollToIntro" class="btn btn-outline btn-secondary btn-lg gap-2">
              Pelajari Dulu
            </button>
          </div>
        </div>
      </div>
    </div>

    <div ref="introSection" class="mb-12">
      <SkincareIntro @ready="scrollToForm" />
    </div>

    <div class="divider"></div>

    <div ref="formSection" class="max-w-2xl mx-auto">
      <InputForm />
    </div>

    <div class="mt-20">
      <h2 class="text-3xl font-bold text-center mb-10">
        Bagaimana Cara Kerjanya?
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <div class="text-5xl mb-4">📝</div>
            <h3 class="card-title">1. Input Preferensi</h3>
            <p class="text-base-content/70">
              Pilih tipe kulit, tekstur, dan kandungan yang kamu inginkan
            </p>
          </div>
        </div>
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <div class="text-5xl mb-4">🤖</div>
            <h3 class="card-title">2. Algoritma KNN</h3>
            <p class="text-base-content/70">
              Sistem mencari 5 produk paling mirip dengan preferensimu
            </p>
          </div>
        </div>
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body items-center text-center">
            <div class="text-5xl mb-4">✨</div>
            <h3 class="card-title">3. Hasil Rekomendasi</h3>
            <p class="text-base-content/70">
              Dapatkan daftar produk terbaik lengkap dengan detail
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
  introSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const scrollToForm = () => {
  formSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>