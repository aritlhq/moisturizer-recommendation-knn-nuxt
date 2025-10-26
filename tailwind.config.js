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
                    50: '#FEF7F9',
                    100: '#FCEEF0',
                    200: '#F9E4E8',
                    300: '#F8E2DC',
                    400: '#F5C0A7',
                    500: '#F4ABC4',
                    600: '#D885A3',
                },
                'peach': {
                    400: '#F5C0A7',
                },
                'cream': {
                    50: '#FEF7F9',
                    100: '#FCEEF0',
                },
                'content': {
                    DEFAULT: '#4A3F3F',
                    light: '#A49393',
                },
                'success': '#64B39A',
                'error': '#D87777',
            }
        },
    },
    plugins: [],
}