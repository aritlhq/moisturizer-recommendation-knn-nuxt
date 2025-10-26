<template>
  <div class="min-h-screen flex items-center justify-center bg-cream-100 p-4">
    <div class="text-center">
      <div class="text-9xl font-bold text-pink-500 mb-4">{{ error.statusCode }}</div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-content">
        {{ error.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
      </h1>
      <p class="text-lg md:text-xl text-content-light mb-8 max-w-lg mx-auto">
        {{ error.statusCode === 404 ? 'Oops! Sepertinya Anda tersesat di belantara skincare. Mari kami bantu kembali.' : error.message }}
      </p>
      <button @click="handleError" class="btn btn-primary btn-lg">
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>