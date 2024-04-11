import { create } from "zustand"

export const useLugarStore = create((set, get) => ({
    // ============================ Modal Lugar ============================
    currentLugar: {},
    setCurrentLugar: (currentLugar) => set({ currentLugar }),
    formType: '',
    setFormType: (formType) => set({ formType }),
    // ============================ Lista de Lugares ============================
    lugares: { data: [] },
    setLugares: (lugares) => set({ lugares }),
    // ============================ Funciones ============================
    agregarLugar: (lugar) => set({
        lugares: {
            ...get().lugares, data: [
                lugar, ...get().lugares.data
            ]
        }
    }),
    editarLugar: (lugar) => set({
        lugares: {
            ...get().lugares,
            data: get().lugares.data.map(v => v.id === lugar.id ? lugar : v)
        }
    }),
    borrarLugar: (lugarId) => set({
        lugares: {
            ...get().lugares,
            data: get().lugares.data.filter(v => v.id !== lugarId)
        }
    }),
}))