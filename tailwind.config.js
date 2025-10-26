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
        },
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ec4899",
                    "primary-focus": "#db2777",
                    "primary-content": "#ffffff",
                    "secondary": "#f472b6",
                    "secondary-focus": "#ec4899",
                    "secondary-content": "#ffffff",
                    "accent": "#fb7185",
                    "accent-focus": "#f43f5e",
                    "accent-content": "#ffffff",
                    "neutral": "#3d4451",
                    "neutral-focus": "#1f2937",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#f3f4f6",
                    "base-content": "#1f2937",
                    "info": "#3b82f6",
                    "info-content": "#ffffff",
                    "success": "#10b981",
                    "success-content": "#ffffff",
                    "warning": "#f59e0b",
                    "warning-content": "#ffffff",
                    "error": "#ef4444",
                    "error-content": "#ffffff",
                },
            },
        ],
    },
}