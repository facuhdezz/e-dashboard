import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, []);

    return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
    );
}