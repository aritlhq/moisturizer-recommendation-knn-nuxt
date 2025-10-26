<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="mb-6">
      <svg class="w-32 h-32 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <h3 class="text-2xl font-bold mb-3 text-base-content">
      {{ title }}
    </h3>
    <p class="text-base-content/70 mb-8 max-w-md">
      {{ description }}
    </p>
    <div v-if="actionText">
      <button @click="$emit('action')" class="btn btn-primary gap-2">
        {{ actionText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  actionText: String
})

defineEmits(['action'])
</script>