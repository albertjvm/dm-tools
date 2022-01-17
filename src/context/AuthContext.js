import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setIsLoggedIn(user !== null);
    }, [user]);

    return (
        <AuthContext.Provider value={{ 
            user,
            isLoggedIn
         }}>
             {children}
        </AuthContext.Provider>
    );
};
