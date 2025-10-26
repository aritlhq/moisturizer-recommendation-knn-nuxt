<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="loading">
      <LoadingProgress
          title="Mencari Rekomendasi Terbaik..."
          message="Algoritma KNN sedang menganalisis preferensi Anda dan mencocokkannya dengan ribuan produk di database kami."
          :tips="[
          'Sistem menggunakan Euclidean Distance untuk menghitung kesamaan produk.',
          'Semakin spesifik preferensi Anda, semakin akurat rekomendasi yang diberikan.',
          'Hasil rekomendasi diurutkan berdasarkan tingkat kemiripan tertinggi.'
        ]"
      />
    </div>

    <div v-else-if="error">
      <EmptyState
          title="Oops! Terjadi Kesalahan"
          :description="error"
          action-text="Coba Cari Lagi"
          @action="router.push('/')"
      />
    </div>

    <div v-else-if="recommendations.length > 0">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-pink-500 mb-4">
          ✨ Rekomendasi Moisturizer Untukmu
        </h1>
        <p class="text-lg text-content-light max-w-2xl mx-auto">
          Berdasarkan preferensi Anda, kami menemukan {{ recommendations.length }} produk terbaik yang paling cocok!
        </p>
      </div>

      <!-- User Input Summary -->
      <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-10">
        <h3 class="text-xl font-bold mb-4 text-content">Preferensi Anda:</h3>
        <div class="flex flex-wrap gap-3">
          <span class="font-medium inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700">Tipe Kulit: {{ userInput?.skinType }}</span>
          <span class="font-medium inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">Tekstur: {{ userInput?.productType }}</span>
          <span class="font-medium inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">Kandungan: {{ userInput?.mainIngredient }}</span>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <ProductCard
            v-for="(product, index) in recommendations"
            :key="product.id"
            :product="product"
            :rank="index + 1"
        />
      </div>

      <div class="flex justify-center mt-8">
        <NuxtLink to="/" class="btn btn-outline btn-lg">
          Cari Rekomendasi Lain
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <EmptyState
          title="Belum Ada Hasil Rekomendasi"
          description="Silakan isi form di halaman utama untuk mendapatkan rekomendasi moisturizer yang cocok untukmu."
          action-text="Kembali ke Halaman Utama"
          @action="router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const recommendationStore = useRecommendationStore()
const { recommendations, userInput, loading, error } = storeToRefs(recommendationStore)

onMounted(() => {
  if (!userInput.value && recommendations.value.length === 0 && !loading.value) {
    router.push('/')
  }
})
</script>