import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { CampaignContext } from '.';

export const PartyContext = React.createContext();

export const PartyProvider = ({ children }) => {
    const { activeCampaign } = useContext(CampaignContext);
    const [ party, setParty ] = useState([]);

    useEffect(() => {
        if (activeCampaign) {
            const unsubscribe = firebase
                .firestore()
                .collection('partyMembers')
                .where('campaignId', '==', activeCampaign?.id)
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
    }, [activeCampaign]);

    const member = (id) => party.find(p => p.id === id);

    return (
        <PartyContext.Provider value={{ 
            party,
            member
         }}>
             {children}
        </PartyContext.Provider>
    );
};
