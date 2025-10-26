<template>
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-pink-500 mb-2">
        🎯 Ceritakan Tentang Kulitmu
      </h2>
      <p class="text-content-light mb-8">
        Pilih preferensimu, dan kami akan merekomendasikan produk terbaik!
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-lg font-semibold text-content mb-2">Tipe Kulitmu</label>
        <select v-model="form.skinType" class="select-bordered" required>
          <option disabled value="">Pilih tipe kulit...</option>
          <option v-for="type in options.skinTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div>
        <label class="block text-lg font-semibold text-content mb-2">Tekstur yang Diinginkan</label>
        <div class="grid grid-cols-2 gap-4">
          <label v-for="type in options.productTypes" :key="type" class="relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all" :class="form.productType === type ? 'border-pink-500 bg-pink-50' : 'border-gray-300'">
            <input type="radio" :value="type" v-model="form.productType" class="sr-only" required />
            <span class="font-semibold text-content">{{ type }}</span>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-lg font-semibold text-content mb-2">Kandungan Utama</label>
        <select v-model="form.mainIngredient" class="select-bordered" required>
          <option disabled value="">Pilih kandungan...</option>
          <option v-for="ingredient in options.mainIngredients" :key="ingredient" :value="ingredient">{{ ingredient }}</option>
        </select>
      </div>

      <div class="pt-4">
        <button type="submit" class="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-pink-300 flex items-center justify-center" :disabled="loading">
          <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span v-else>Cari Rekomendasi</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const router = useRouter()
const toast = useToast()
const recommendationStore = useRecommendationStore()
const { options, loading } = storeToRefs(recommendationStore)

const form = ref({
  skinType: '',
  productType: '',
  mainIngredient: ''
})

onMounted(() => {
  if (options.value.skinTypes.length === 0) {
    recommendationStore.fetchOptions()
  }
})

const handleSubmit = async () => {
  const result = await recommendationStore.getRecommendations({
    skinType: form.value.skinType,
    productType: form.value.productType,
    mainIngredient: form.value.mainIngredient
  })

  if (result.success) {
    toast.success('Rekomendasi berhasil ditemukan!', 'Berhasil')
    router.push('/result')
  } else {
    toast.error(result.message || 'Terjadi kesalahan. Coba lagi.', 'Gagal')
  }
}
</script>