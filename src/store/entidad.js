import { create } from "zustand"

export const useEntidadStore = create((set, get) => ({
    // ============================ Modal Entidad ============================
    currentEntidad: {},
    setCurrentEntidad: (currentEntidad) => set({ currentEntidad }),
    formType: '',
    setFormType: (formType) => set({ formType }),
    // ============================ Lista de Entidades ============================
    entidades: { data: [] },
    setEntidades: (entidades) => set({ entidades }),
    // ============================ Funciones ============================
    agregarEntidad: (entidad) => set({
        entidades: {
            ...get().entidades, data: [
                entidad, ...get().entidades.data
            ]
        }
    }),
    editarEntidad: (entidad) => set({
        entidades: {
            ...get().entidades,
            data: get().entidades.data.map(v => v.id === entidad.id ? entidad : v)
        }
    }),
    borrarEntidad: (entidadId) => set({
        entidades: {
            ...get().entidades,
            data: get().entidades.data.filter(v => v.id !== entidadId)
        }
    }),
}))