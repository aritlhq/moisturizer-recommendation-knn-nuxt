<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="relative w-24 h-24 mb-8">
      <div class="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin"></div>
      <div class="absolute inset-2 rounded-full border-4 border-t-secondary border-r-transparent border-b-accent border-l-transparent" style="animation: spin 1.5s linear infinite reverse;"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    </div>
    <h3 class="text-xl font-bold text-base-content">
      {{ title }}
    </h3>
    <p class="text-base-content/70 max-w-md mt-2">
      {{ message }}
    </p>
    <div v-if="tips.length > 0" class="mt-8 p-4 bg-info/10 rounded-lg max-w-md text-left">
      <p class="text-sm font-medium text-info mb-1">💡 Tahukah kamu?</p>
      <p class="text-sm text-base-content/70">{{ currentTip }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: String,
  message: String,
  tips: {
    type: Array,
    default: () => []
  }
})

const currentTipIndex = ref(0)
const currentTip = ref(props.tips[0])
let tipInterval = null

onMounted(() => {
  if (props.tips.length > 1) {
    tipInterval = setInterval(() => {
      currentTipIndex.value = (currentTipIndex.value + 1) % props.tips.length
      currentTip.value = props.tips[currentTipIndex.value]
    }, 5000)
  }
})

onUnmounted(() => {
  if (tipInterval) clearInterval(tipInterval)
})
</script>