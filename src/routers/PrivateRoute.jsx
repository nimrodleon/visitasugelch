import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
    return localStorage.getItem('AuthToken') ? children : <Navigate to="/" />
}

