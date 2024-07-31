"use client"

import  { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const initialAdmin = () => {
    const myAdmin = JSON.parse(localStorage.getItem("admin"));
    return myAdmin ? myAdmin : null
}
export const UserProvider = ({ children }) => {
    const [admin, setAdmin] = useState(initialAdmin);

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(admin));
    }, [admin]);

    return (
        <UserContext.Provider value={{ admin, setAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)