import { axios } from "./axios"

// Function to get all users
export async function getUsers(query = '', perPage = 10) {
    try {
        const response = await axios.get('/users', {
            params: {
                perPage,
                query
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Function to create a new user
export async function createUser(user) {
    try {
        const response = await axios.post('/users', user)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Function to get a user by ID
export async function getUserById(id) {
    try {
        const response = await axios.get(`/users/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Function to update a user by ID
export async function updateUserById(id, user) {
    try {
        const response = await axios.put(`/users/${id}`, user)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Function to delete a user by ID
export async function deleteUserById(id) {
    try {
        const response = await axios.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
