import { createContext, useEffect, useState } from "react"
import { getUserData } from "../api"

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (localStorage.getItem("AuthToken")) {
            getUserData().then(result => {
                setUserData(result)
            })
        }
    }, [getUserData])

    return (
        <UserContext.Provider value={{ userData, }}>
            {children}
        </UserContext.Provider>
    )
}