export const useRecommendationStore = defineStore('recommendation', () => {
    const recommendations = ref([])
    const userInput = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const options = ref({
        skinTypes: [],
        productTypes: [],
        mainIngredients: []
    })

    async function fetchOptions() {
        try {
            const data = await $fetch('/api/options')
            options.value = data
        } catch (err) {
            console.error('Failed to fetch options:', err)
        }
    }

    async function getRecommendations(input) {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch('/api/recommend', {
                method: 'POST',
                body: {
                    skin_type: input.skinType,
                    product_type: input.productType,
                    main_ingredient: input.mainIngredient
                }
            })
            recommendations.value = response.recommendations
            userInput.value = input
            return { success: true }
        } catch (err) {
            error.value = err.data?.message || 'Gagal mendapatkan rekomendasi'
            return { success: false, message: error.value }
        } finally {
            loading.value = false
        }
    }

    return {
        recommendations,
        userInput,
        loading,
        error,
        options,
        fetchOptions,
        getRecommendations
    }
})