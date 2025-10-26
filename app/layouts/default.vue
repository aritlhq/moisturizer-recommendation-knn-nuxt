<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <nav class="navbar bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/admin/login">Admin</NuxtLink></li>
          </ul>
        </div>
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

      <div class="navbar-end hidden lg:flex">
        <NuxtLink to="/admin/login" class="btn btn-sm btn-ghost hover:bg-white/20">
          Admin
        </NuxtLink>
      </div>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="footer footer-center p-10 bg-base-200 text-base-content mt-20">
      <div>
        <p class="font-bold">
          Moisturizer Finder 💧
        </p>
        <p>Sistem Rekomendasi Moisturizer menggunakan Algoritma KNN</p>
        <p class="text-sm opacity-70">
          © 2025 Abdullah Rendra Zuriansyah - Universitas Pamulang
        </p>
      </div>
    </footer>

    <Toast />
  </div>
</template>