import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
            withCredentials: true,
        })
        .then((response) => {
            setUser(response.data.user);
        })
        .catch((error) => {
            console.error(error, "ERROR AUTH");
            setUser(null);
        });
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;