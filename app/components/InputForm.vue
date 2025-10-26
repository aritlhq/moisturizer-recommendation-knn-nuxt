<template>
  <div class="card bg-base-100 shadow-2xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold text-primary justify-center mb-4">
        🎯 Ceritakan Tentang Kulitmu
      </h2>
      <p class="text-center text-base-content/70 mb-6">
        Pilih preferensimu, dan kami akan merekomendasikan produk terbaik!
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-control">
          <label class="label"><span class="label-text font-semibold text-lg">Tipe Kulitmu</span></label>
          <select v-model="form.skinType" class="select select-bordered w-full" required>
            <option disabled value="">Pilih tipe kulit...</option>
            <option v-for="type in options.skinTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text font-semibold text-lg">Tekstur yang Diinginkan</span></label>
          <div class="grid grid-cols-2 gap-4">
            <label v-for="type in options.productTypes" :key="type" class="label cursor-pointer border-2 rounded-lg p-4 hover:border-primary transition-all" :class="{ 'border-primary bg-primary/10': form.productType === type, 'border-base-300': form.productType !== type }">
              <input type="radio" :value="type" v-model="form.productType" class="radio radio-primary" required />
              <span class="label-text font-semibold">{{ type }}</span>
            </label>
          </div>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text font-semibold text-lg">Kandungan Utama</span></label>
          <select v-model="form.mainIngredient" class="select select-bordered w-full" required>
            <option disabled value="">Pilih kandungan...</option>
            <option v-for="ingredient in options.mainIngredients" :key="ingredient" :value="ingredient">{{ ingredient }}</option>
          </select>
        </div>

        <div class="form-control mt-8">
          <button type="submit" class="btn btn-lg btn-primary w-full" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-else>Cari Rekomendasi</span>
          </button>
        </div>
      </form>
    </div>
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