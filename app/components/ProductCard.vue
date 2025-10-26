<template>
  <div class="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full relative group">
    <figure class="relative h-48 overflow-hidden">
      <div class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <img
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div v-else class="text-7xl opacity-30">
          💧
        </div>
      </div>
    </figure>

    <div class="card-body p-4">
      <div class="badge badge-secondary badge-outline">{{ product.brand }}</div>
      <h3 class="card-title text-base font-bold line-clamp-2 h-12 group-hover:text-primary">
        {{ product.name }}
      </h3>
      <div class="space-y-2 mt-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="badge badge-sm badge-primary">{{ product.skin_type }}</span>
          <span class="opacity-60">•</span>
          <span class="opacity-80">{{ product.product_type }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-accent">Kandungan:</span>
          <span class="badge badge-sm badge-accent badge-outline">
            {{ product.main_ingredient }}
          </span>
        </div>
      </div>
      <div class="card-actions justify-end mt-4">
        <a
            v-if="product.product_url"
            :href="product.product_url"
            target="_blank"
            class="btn btn-primary btn-sm gap-2"
        >
          Lihat Detail
        </a>
      </div>
    </div>
    <div v-if="rank" class="absolute top-2 right-2 badge badge-lg badge-primary font-bold">
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