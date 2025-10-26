export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.startsWith('/admin')) {
        const authStore = useAuthStore();
        if (to.path !== '/admin/login' && !authStore.isAuthenticated) {
            return navigateTo('/admin/login');
        }
        if (to.path === '/admin/login' && authStore.isAuthenticated) {
            return navigateTo('/admin/dashboard');
        }
    }
});