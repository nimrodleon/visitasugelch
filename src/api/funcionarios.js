import { axios } from "./axios"

export async function getFuncionariosByLugarId(lugarId) {
    try {
        const response = await axios.get(`/funcionarios/${lugarId}/lugar`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createFuncionario(funcionarioData) {
    try {
        const response = await axios.post('/funcionarios', funcionarioData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getFuncionarioById(id) {
    try {
        const response = await axios.get(`/funcionarios/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function updateFuncionarioById(id, funcionarioData) {
    try {
        const response = await axios.put(`/funcionarios/${id}`, funcionarioData)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteFuncionarioById(id) {
    try {
        const response = await axios.delete(`/funcionarios/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
