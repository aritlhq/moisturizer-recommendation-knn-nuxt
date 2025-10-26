export const useApiFetch = (url, options = {}) => {
    const authStore = useAuthStore();

    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${authStore.token}`
        }
    };

    return useFetch(url, { ...defaultOptions, ...options });
}