<template>
  <div class="toast toast-top toast-end z-[9999]">
    <div
        v-for="toast in toasts"
        :key="toast.id"
        class="alert shadow-lg"
        :class="getAlertClass(toast.type)"
    >
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <div v-if="toast.title" class="font-bold">{{ toast.title }}</div>
          <div class="text-sm">{{ toast.message }}</div>
        </div>
        <button
            @click="removeToast(toast.id)"
            class="btn btn-sm btn-ghost btn-circle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const getAlertClass = (type) => {
  const classes = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  }
  return classes[type] || 'alert-info'
}
</script>