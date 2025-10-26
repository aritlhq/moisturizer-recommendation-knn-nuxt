<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <nav class="navbar bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div class="navbar-start">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-lg lg:text-xl font-bold">
          💧 Moisturizer Finder
        </NuxtLink>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/" class="hover:bg-white/20">Home</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:bg-white/20">About</NuxtLink></li>
        </ul>
      </div>

      <div class="navbar-end">
        <NuxtLink v-if="!authStore.isAuthenticated" to="/admin/login" class="btn btn-sm btn-ghost hover:bg-white/20">
          Admin Login
        </NuxtLink>
        <div v-else class="flex items-center gap-4">
          <NuxtLink to="/admin/dashboard" class="btn btn-sm btn-ghost hover:bg-white/20">Dashboard</NuxtLink>
          <button @click="authStore.logout()" class="btn btn-sm btn-error">Logout</button>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="footer footer-center p-10 bg-base-200 text-base-content mt-20">
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