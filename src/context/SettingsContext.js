import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '.';

export const SettingsContext = React.createContext();

export const SettingsProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [ settings, setSettings ] = useState({});

    const updateSettings = ({ key, value }) => {
        firebase.firestore().collection('settings').doc(user?.uid).set({
            [key]: value
        }, {merge: true});
    };

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('settings')
                .doc(user?.uid)
                .onSnapshot(
                    doc => {
                        setSettings(doc.data())
                    }
                );

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <SettingsContext.Provider value={{ 
            settings,
            updateSettings
         }}>
             {children}
        </SettingsContext.Provider>
    );
};
