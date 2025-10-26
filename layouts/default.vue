<template>
  <div class="min-h-screen bg-cream-100 flex flex-col">
    <nav class="bg-pink-500 text-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto flex items-center justify-between p-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-xl font-bold">
            💧 Moisturizer Finder
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center gap-2">
          <NuxtLink to="/" class="px-4 py-2 hover:bg-black/10 rounded-lg">Home</NuxtLink>
          <NuxtLink to="/about" class="px-4 py-2 hover:bg-black/10 rounded-lg">About</NuxtLink>
        </div>

        <div>
          <NuxtLink v-if="!authStore.isAuthenticated" to="/admin/login" class="px-4 py-2 text-sm hover:bg-black/10 rounded-lg">
            Admin Login
          </NuxtLink>
          <div v-else class="flex items-center gap-4">
            <NuxtLink to="/admin/dashboard" class="px-4 py-2 text-sm hover:bg-black/10 rounded-lg">Dashboard</NuxtLink>
            <button @click="authStore.logout()" class="bg-error text-white px-3 py-2 rounded-lg text-sm font-semibold">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="text-center p-10 bg-cream-50 text-content mt-20">
      <div>
        <p class="font-bold">Moisturizer Finder 💧</p>
        <p>Sistem Rekomendasi Moisturizer menggunakan Algoritma KNN</p>
        <p class="text-sm opacity-70">© 2025 Abdullah Rendra Zuriansyah - Universitas Pamulang</p>
      </div>
    </footer>

    <Toast />
  </div>
</template>

<script setup>
const authStore = useAuthStore();
</script>