import { create } from "zustand"

export const useVisitanteStore = create((set, get) => ({
    // ============================ Modal Visitante ============================
    currentVisitante: {},
    setCurrentVisitante: (currentVisitante) => set({ currentVisitante }),
    formType: '',
    setFormType: (formType) => set({ formType }),
    // ============================ Lista de visitantes ============================
    visitantes: { data: [] },
    setVisitantes: (visitantes) => set({ visitantes }),
    // ============================ Funciones ============================
    agregarVisitante: (visitante) => set({
        visitantes: {
            ...get().visitantes, data: [
                visitante, ...get().visitantes.data
            ]
        }
    }),
    editarVisitante: (visitante) => set({
        visitantes: {
            ...get().visitantes,
            data: get().visitantes.data.map(v => v.id === visitante.id ? visitante : v)
        }
    }),
    borrarVisitante: (visitanteId) => set({
        visitantes: {
            ...get().visitantes,
            data: get().visitantes.data.filter(v => v.id !== visitanteId)
        }
    }),
}))