import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
    const addToast = ({ type = 'info', title = '', message, duration = 4000 }) => {
        const id = toastId++
        const toast = { id, type, title, message }

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => removeToast(id), duration)
        }
        return id
    }

    const removeToast = (id) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    const success = (message, title = '') => addToast({ type: 'success', message, title })
    const error = (message, title = '') => addToast({ type: 'error', message, title })
    const warning = (message, title = '') => addToast({ type: 'warning', message, title })
    const info = (message, title = '') => addToast({ type: 'info', message, title })

    return { toasts, removeToast, success, error, warning, info }
}