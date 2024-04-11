import { axios } from "./axios"

export async function getAllLugares() {
    try {
        const response = await axios.get('/lugares')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function searchLugares(query = '', currentPage = 1, perPage = 10) {
    try {
        const response = await axios.get('/search-lugares', {
            params: {
                query,
                currentPage,
                perPage,
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function createLugar(data) {
    try {
        const response = await axios.post('/lugares', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function getLugarById(id) {
    try {
        const response = await axios.get(`/lugares/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function updateLugarById(id, data) {
    try {
        const response = await axios.put(`/lugares/${id}`, data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteLugarById(id) {
    try {
        const response = await axios.delete(`/lugares/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
