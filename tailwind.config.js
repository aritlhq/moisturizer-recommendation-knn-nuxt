/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Poppins', 'Inter', 'sans-serif'],
            },
            colors: {
                'pink': {
                    50: '#FFF5F7',  // Latar belakang sangat terang
                    100: '#FFE4E6', // Highlight ringan
                    200: '#FECDD3',
                    300: '#FDA4AF',
                    400: '#FB7185',
                    500: '#E11D48', // PRIMARY BARU: Jauh lebih gelap & kuat (Rose-600 ish)
                    600: '#BE123C', // HOVER STATE: Lebih gelap lagi
                    700: '#9F1239', // TEXT HEADINGS: Kontras tinggi untuk teks
                    800: '#881337',
                    900: '#4C0519',
                },
                // 'peach': {
                //     400: '#FB923C', // Dibuat sedikit lebih orange agar beda dengan pink
                //     500: '#F97316',
                //     600: '#EA580C',
                // },
                'cream': {
                    50: '#FFFAFB', // Hampir putih, hint pink sangat tipis
                    100: '#FFF5F7',
                },
                'content': {
                    DEFAULT: '#374151', // Gray-700: Lebih gelap dari sebelumnya untuk teks isi
                    light: '#6B7280',   // Gray-500: Untuk teks sekunder
                },
                'success': '#059669', // Emerald-600
                'error': '#DC2626',   // Red-600
            }
        },
    },
    plugins: [],
}