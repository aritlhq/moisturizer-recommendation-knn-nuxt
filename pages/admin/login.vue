<template>
  <div class="min-h-screen flex items-center justify-center bg-cream-100 p-4">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-pink-500">🔐 Admin Login</h2>
        <p class="text-content-light mt-2">Selamat datang kembali, Admin.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-content mb-2">Username</label>
          <input
              id="username"
              v-model="form.username"
              type="text"
              class="input"
              required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-content mb-2">Password</label>
          <input
              id="password"
              v-model="form.password"
              type="password"
              class="input"
              required
          />
        </div>

        <div v-if="errorMessage" class="bg-red-100 border-l-4 border-error text-error p-4 rounded-md text-sm">
          <span>{{ errorMessage }}</span>
        </div>

        <div class="pt-2">
          <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="loading"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            {{ loading ? 'Memproses...' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false // Menggunakan layout kosong tanpa navbar/footer
});

const authStore = useAuthStore();
const router = useRouter();

const form = ref({ username: 'admin', password: 'admin123' });
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  const result = await authStore.login(form.value.username, form.value.password);

  loading.value = false;

  if (result.success) {
    router.push('/admin/dashboard');
  } else {
    errorMessage.value = result.message;
  }
}
</script>