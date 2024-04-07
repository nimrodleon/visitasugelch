import { create } from "zustand"

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    selectedUser: {
        id: 0,
        dni: '',
        nombres: '',
        apellidos: '',
        rol: '',
        usuario: '',
        password: ''
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    addUser: (user) => set(state => ({ users: [...state.users, user] })),
    userFormType: 'add',
    setUserFormType: (userFormType) => set({ userFormType }),
}))