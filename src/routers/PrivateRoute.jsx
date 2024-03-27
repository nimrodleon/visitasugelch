import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token')
    return isLoggedIn ? children : <Navigate to="/" />
}