import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Portal } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRouter } from "./AdminRouter"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={
                    <PrivateRoute>
                        <AdminRouter />
                    </PrivateRoute>
                } />
                <Route path="/*" element={<Portal />} />
            </Routes>
        </BrowserRouter>
    )
}