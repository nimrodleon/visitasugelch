import { create } from "zustand"

export const useAsistenciaStore = create((set, get) => ({ 
    // ======================== VISITA ========================
    visita: {},
    setVisita: (visita) => set({ visita }),
    // ======================== ENTIDADES ========================
    entidades: [],
    setEntidades: (entidades) => set({ entidades }),
    // ======================== LUGARES ========================
    lugares: [],
    setLugares: (lugares) => set({ lugares }),
    // ======================== FUNCIONARIOS ========================
    funcionarios: [],
    setFuncionarios: (funcionarios) => set({ funcionarios }),
}))