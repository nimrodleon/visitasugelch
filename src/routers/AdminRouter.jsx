import { Route, Routes } from "react-router-dom"
import { ListaUsuarios, ListaVisitantes, ListaVisitas } from "../pages/admin"

export const AdminRouter = () => {
    return (
        <Routes>
            <Route path="usuarios" element={<ListaUsuarios />} />
            <Route path="visitantes" element={<ListaVisitantes />} />
            <Route path="*" element={<ListaVisitas />} />
        </Routes>
    )
}