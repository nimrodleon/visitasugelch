import { create } from "zustand"

export const useFuncionarioStore = create((set, get) => ({
    // ============================ Modal Funcionario ============================
    currentFuncionario: {},
    setCurrentFuncionario: (currentFuncionario) => set({ currentFuncionario }),
    formType: '',
    setFormType: (formType) => set({ formType }),
    // ============================ Lista de Funcionarios ============================
    funcionarios: { data: [] },
    setFuncionarios: (funcionarios) => set({ funcionarios }),
    // ============================ Funciones ============================
    agregarFuncionario: (funcionario) => set({
        funcionarios: {
            ...get().funcionarios, data: [
                funcionario, ...get().funcionarios.data
            ]
        }
    }),
    editarFuncionario: (funcionario) => set({
        funcionarios: {
            ...get().funcionarios,
            data: get().funcionarios.data.map(v => v.id === funcionario.id ? funcionario : v)
        }
    }),
    borrarFuncionario: (funcionarioId) => set({
        funcionarios: {
            ...get().funcionarios,
            data: get().funcionarios.data.filter(v => v.id !== funcionarioId)
        }
    }),
}))