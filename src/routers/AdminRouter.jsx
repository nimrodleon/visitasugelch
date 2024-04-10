import { Route, Routes } from "react-router-dom"
import { ListaUsuarios, ListaVisitantes, ListaVisitas } from "../pages/admin"
import { UserProvider } from "../store"

export const AdminRouter = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="usuarios" element={<ListaUsuarios />} />
                <Route path="visitantes" element={<ListaVisitantes />} />
                <Route path="*" element={<ListaVisitas />} />
            </Routes>
        </UserProvider>

    )
}