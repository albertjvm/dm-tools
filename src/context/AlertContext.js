import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('alerts')
            .doc('main')
                .onSnapshot(
                    doc => {
                        setAlert(doc.data().text)
                    }
                );

        return () => unsubscribe();
    }, []);


    return (
        <AlertContext.Provider value={{ 
            alert
         }}>
             {children}
        </AlertContext.Provider>
    );
};
