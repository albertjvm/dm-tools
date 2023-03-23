import React, { useEffect, useState } from "react";
import { 
    getRedirectResult,
    signInWithRedirect,
    signOut
} from 'firebase/auth';
import { auth, provider } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const loginWithGoogle = () => {
        signInWithRedirect(auth, provider);
    };

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
        });
    };

    useEffect(() => {
        getRedirectResult(auth).then(result => {
            if (result?.user != null) {
                setUser(result.user.toJSON());
            } else if (auth.currentUser != null) {
                setUser(auth.currentUser);
            }
        });
    }, [])

    useEffect(() => {
        setIsLoggedIn(user !== null);
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            loginWithGoogle,
            logout,
            isLoggedIn,
        }}>
            { children }
        </AuthContext.Provider>
    );
}