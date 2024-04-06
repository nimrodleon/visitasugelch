import { axios } from "./axios"

export const getAccessTokenWithLogin = async ({ usuario, password }) => {
    const URL = '/login'
    const result = await axios.post(URL, { usuario, password })
    const responseLogin = result.data
    return responseLogin
}