import { create } from "zustand"

export const useUserStore = create((set, get) => ({
    // ============================ Modal User ============================
    currentUser: {},
    setCurrentUser: (currentUser) => set({ currentUser }),
    formType: '',
    setFormType: (formType) => set({ formType }),
    // ============================ Lista de User ============================
    users: { data: [] },
    setUsers: (users) => set({ users }),
    // ============================ Funciones ============================
    addUser: (user) => set({
        users: {
            ...get().users, data: [
                user, ...get().users.data
            ]
        }
    }),
    editUser: (user) => set({
        users: {
            ...get().users,
            data: get().users.data.map(v => v.id === user.id ? user : v)
        }
    }),
    deleteUser: (userId) => set({
        users: {
            ...get().users,
            data: get().users.data.filter(v => v.id !== userId)
        }
    }),
}))