<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl">
      <div class="card-body">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-primary">🔐 Admin Login</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text">Username</span></label>
            <input
                v-model="form.username"
                type="text"
                class="input input-bordered"
                required
            />
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text">Password</span></label>
            <input
                v-model="form.password"
                type="password"
                class="input input-bordered"
                required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-error text-sm">
            <span>{{ errorMessage }}</span>
          </div>

          <div class="form-control mt-6">
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading"
            >
              <span v-if="loading" class="loading loading-spinner"></span>
              Login
            </button>
          </div>
        </form>
      </div>
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