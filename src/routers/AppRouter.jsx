import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from './PrivateRoute'
import { Portal } from '../pages'
import { Dashboard } from "../pages/admin"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </PrivateRoute>
                } />
                <Route path="/*" element={<Portal />} />
            </Routes>
        </BrowserRouter>
    )
}