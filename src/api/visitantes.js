import { axios } from "./axios"

export async function getVisitantes(query = '', perPage = 10) {
    try {
        const response = await axios.get('/visitantes', {
            params: {
                query,
                perPage
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createVisitante(visitanteData) {
    try {
        const response = await axios.post('/visitantes', visitanteData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getVisitante(id) {
    try {
        const response = await axios.get(`/visitantes/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function buscarVisitantePorDni(dni) {
    try {
        const response = await axios.get(`/visitantes/${dni}/dni`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function buscarVisitantePorRuc(ruc) {
    try {
        const response = await axios.get(`/visitantes/${ruc}/ruc`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function updateVisitante(id, visitanteData) {
    try {
        const response = await axios.put(`/visitantes/${id}`, visitanteData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteVisitante(id) {
    try {
        await axios.delete(`/visitantes/${id}`)
    } catch (error) {
        console.error(error)
        throw error
    }
}