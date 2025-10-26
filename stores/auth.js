export const useAuthStore = defineStore('auth', () => {
    const token = useCookie('auth-token', { maxAge: 60 * 60 * 24 });
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);

    async function login(username, password) {
        try {
            const response = await $fetch('/api/auth/login', {
                method: 'POST',
                body: { username, password }
            });

            token.value = response.token;
            user.value = response.user;

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.data?.statusMessage || 'Login gagal'
            };
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
        navigateTo('/');
    }

    return { token, user, isAuthenticated, login, logout };
});