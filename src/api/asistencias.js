import { axios } from "./axios"

export async function getAsistencias(fromDate, toDate, query, perPage) {
    const response = await axios.get('/asistencias', {
        params: {
            fromDate,
            toDate,
            query,
            perPage
        }
    })
    return response.data
}
 
export async function createAsistencia(asistenciaData) {
    const response = await axios.post('/asistencias', asistenciaData)
    return response.data
}

export async function getAsistencia(asistenciaId) {
    const response = await axios.get(`/asistencias/${asistenciaId}`)
    return response.data
}

export async function marcarHoraSalida(asistenciaId) {
    const response = await axios.patch(`/asistencias/${asistenciaId}`)
    return response.data
}

export async function deleteAsistencia(asistenciaId) {
    await axios.delete(`/asistencias/${asistenciaId}`)
}
