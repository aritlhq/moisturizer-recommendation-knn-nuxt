<template>
  <div class="min-h-screen bg-cream-50 flex flex-col">
    <nav class="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div class="container mx-auto flex items-center justify-between p-4">
        <NuxtLink to="/" class="text-xl font-bold text-pink-500 hover:opacity-80 transition-opacity">
          💧 Moisturizer Finder
        </NuxtLink>

        <div class="hidden lg:flex items-center gap-2">
          <NuxtLink to="/" class="px-4 py-2 text-content-light hover:text-pink-500 rounded-lg transition-colors font-medium">Home</NuxtLink>
          <NuxtLink to="/about" class="px-4 py-2 text-content-light hover:text-pink-500 rounded-lg transition-colors font-medium">About</NuxtLink>
        </div>

        <div>
          <NuxtLink v-if="!authStore.isAuthenticated" to="/admin/login" class="btn btn-outline btn-sm">
            Admin Login
          </NuxtLink>
          <div v-else class="flex items-center gap-4">
            <NuxtLink to="/admin/dashboard" class="px-4 py-2 text-sm text-content-light hover:text-pink-500 rounded-lg transition-colors font-medium">Dashboard</NuxtLink>
            <button @click="authStore.logout()" class="btn btn-error btn-sm">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="text-center p-10 bg-cream-100 text-content-light mt-20 border-t border-gray-200">
      <div class="space-y-2">
        <p class="font-bold text-lg text-content">Moisturizer Finder 💧</p>
        <p>Sistem Rekomendasi Moisturizer menggunakan Algoritma KNN</p>
        <p class="text-sm opacity-80 mt-4">© 2025 Jannibatur Aiman - Universitas Pamulang</p>
      </div>
    </footer>

    <Toast />
  </div>
</template>

<script setup>
const authStore = useAuthStore();
</script>