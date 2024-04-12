import { axios } from "./axios"

export const getEntities = async (visitorId) => {
    try {
        const response = await axios.get(`/entidades/${visitorId}/visitante`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function searchEntidades(visitante_id, query = '', currentPage = 1, perPage = 10) {
    try {
        const response = await axios.get(`/search-entidades/${visitante_id}`, {
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

export const createEntity = async (entityData) => {
    try {
        const response = await axios.post('/entidades', entityData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getEntity = async (entityId) => {
    try {
        const response = await axios.get(`/entidades/${entityId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateEntity = async (entityId, entityData) => {
    try {
        const response = await axios.put(`/entidades/${entityId}`, entityData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const deleteEntity = async (entityId) => {
    try {
        const response = await axios.delete(`/entidades/${entityId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}