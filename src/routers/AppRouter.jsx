import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Portal } from "../pages"
import { ListaUsuarios, ListaVisitantes, ListaVisitas } from "../pages/admin"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={
                    <PrivateRoute>
                        <Routes>
                            <Route path="/usuarios" element={<ListaUsuarios />} />
                            <Route path="/visitantes" element={<ListaVisitantes />} />
                            <Route path="/" element={<ListaVisitas />} />
                        </Routes>
                    </PrivateRoute>
                } />
                <Route path="/*" element={<Portal />} />
            </Routes>
        </BrowserRouter>
    )
}