import instance from 'axios'
export const baseURL = 'http://localhost:8082'
export const AUTH_TOKEN = localStorage.getItem('AuthToken') || ''
export const axios = instance.create({
    baseURL: baseURL, headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401
            || error.response.status === 400) {
            // Cerrar la sesión del usuario
            localStorage.removeItem('AuthToken')
            // Redirigir al usuario a la página de inicio de sesión
            window.location.reload()
        }
        return Promise.reject(error)
    }
)