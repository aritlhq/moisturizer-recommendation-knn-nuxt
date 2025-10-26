export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],

    css: [
        '~/assets/css/main.css',
    ],

    runtimeConfig: {
        dbHost: process.env.NUXT_DB_HOST,
        dbPort: process.env.NUXT_DB_PORT,
        dbUser: process.env.NUXT_DB_USER,
        dbPassword: process.env.NUXT_DB_PASSWORD,
        dbName: process.env.NUXT_DB_NAME,
        jwtSecret: process.env.NUXT_JWT_SECRET,
        pythonPath: process.env.NUXT_PYTHON_PATH,
    },
});