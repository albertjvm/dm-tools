import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext } from '.';

export const PartyContext = React.createContext();

export const PartyProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [ party, setParty ] = useState([]);

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('partyMembers')
                .where('userId', '==', user?.uid)
                .onSnapshot(
                    snapshot => {
                        setParty(snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })));
                    }
                );

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <PartyContext.Provider value={{ 
            party
         }}>
             {children}
        </PartyContext.Provider>
    );
};
