<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="loading">
      <LoadingProgress
          title="Mencari Rekomendasi Terbaik..."
          message="Algoritma KNN sedang menganalisis preferensimu dan mencocokkan dengan 2,257 produk."
          :tips="[
          'Sistem menggunakan Euclidean Distance untuk menghitung kesamaan produk.',
          'Semakin spesifik preferensimu, semakin akurat rekomendasi yang diberikan.',
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
        <h1 class="text-4xl font-bold text-primary mb-4">
          ✨ Rekomendasi Moisturizer Untukmu
        </h1>
        <p class="text-lg text-base-content/70">
          Berdasarkan preferensimu, kami menemukan {{ recommendations.length }} produk terbaik!
        </p>
      </div>

      <div class="card bg-base-100 shadow-lg mb-10">
        <div class="card-body">
          <h3 class="card-title text-xl mb-4">Preferensi Kamu:</h3>
          <div class="flex flex-wrap gap-4">
            <div class="badge badge-lg badge-primary text-primary-content">Tipe Kulit: {{ userInput?.skinType }}</div>
            <div class="badge badge-lg badge-secondary text-secondary-content">Tekstur: {{ userInput?.productType }}</div>
            <div class="badge badge-lg badge-accent text-accent-content">Kandungan: {{ userInput?.mainIngredient }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <ProductCard
            v-for="(product, index) in recommendations"
            :key="product.id"
            :product="product"
            :rank="index + 1"
        />
      </div>

      <div class="flex justify-center">
        <NuxtLink to="/" class="btn btn-outline btn-lg">
          Cari Lagi
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <EmptyState
          title="Belum Ada Hasil Rekomendasi"
          description="Silakan isi form di halaman utama untuk mendapatkan rekomendasi moisturizer yang cocok untukmu."
          action-text="Kembali ke Home"
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