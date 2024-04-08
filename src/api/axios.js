import instance from 'axios'
export const baseURL = 'http://localhost:8082'
export const AUTH_TOKEN = localStorage.getItem('AuthToken') || ''
export const axios = instance.create({
    baseURL: baseURL, headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
})
