<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="text-center">
      <div class="text-9xl font-bold text-primary mb-4">{{ error.statusCode }}</div>
      <h1 class="text-4xl font-bold mb-4">
        {{ error.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
      </h1>
      <p class="text-xl text-base-content/70 mb-8">
        {{ error.statusCode === 404 ? 'Oops! Sepertinya Anda tersesat.' : error.message }}
      </p>
      <button @click="handleError" class="btn btn-primary btn-lg">
        Kembali ke Halaman Utama
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