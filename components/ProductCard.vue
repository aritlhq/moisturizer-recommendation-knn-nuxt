<template>
  <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full overflow-hidden group">
    <div class="relative h-48">
      <div class="w-full h-full bg-pink-50 flex items-center justify-center">
        <img
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div v-else class="text-7xl opacity-30 text-pink-300">
          💧
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <span class="inline-block self-start px-3 py-1 text-xs font-semibold rounded-full bg-peach-400/20 text-peach-600 mb-2">{{ product.brand }}</span>
      <h3 class="text-base font-bold text-content flex-grow line-clamp-2 h-12 group-hover:text-pink-500">
        {{ product.name }}
      </h3>
      <div class="space-y-2 mt-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="inline-block px-2 py-1 text-xs font-medium rounded bg-pink-500 text-white">{{ product.skin_type }}</span>
          <span class="opacity-60">•</span>
          <span class="opacity-80">{{ product.product_type }}</span>
        </div>
      </div>
      <div class="mt-4 text-right">
        <a
            v-if="product.product_url"
            :href="product.product_url"
            target="_blank"
            class="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors"
        >
          Lihat Detail
        </a>
      </div>
    </div>
    <div v-if="rank" class="absolute top-2 right-2 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
      #{{ rank }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    default: null
  }
})
</script>