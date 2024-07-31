"use client"

import  { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const myAdmin = JSON.parse(localStorage.getItem("admin"));
        if (!myAdmin) return;
        setAdmin(myAdmin);
    }, []);

    return (
        <UserContext.Provider value={{ admin, setAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)