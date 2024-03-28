import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Portal } from "../pages"
import { ListaUsuarios, ListaVisitantes, ListaVisitas } from "../pages/admin"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={
                    <Routes>                        
                        <Route path="/usuarios" element={<ListaUsuarios />} />
                        <Route path="/visitantes" element={<ListaVisitantes />} />
                        <Route path="/" element={<ListaVisitas />} />
                    </Routes>
                } />
                <Route path="/*" element={<Portal />} />
            </Routes>
        </BrowserRouter>
    )
}