import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { AuthContext, SettingsContext } from '.';

export const CampaignContext = React.createContext();

export const CampaignProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { settings, updateSettings } = useContext(SettingsContext);
    const [ campaigns, setCampaigns ] = useState([]);

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('campaigns')
                .where('userId', '==', user?.uid)
                .onSnapshot(
                    snapshot => {
                        setCampaigns(snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })));
                    }
                );

            return () => unsubscribe();
        }
    }, [user]);

    const createCampaign = (name) => {
        firebase.firestore().collection('campaigns').add({
            name,
            userId: user.uid
        }).then(docRef => {
            setActiveCampaign(docRef.id);
        });
    };

    const updateCampaign = (campaignId, data) => {
        firebase.firestore().collection('campaigns').doc(campaignId).update(data);
    };

    const setActiveCampaign = (campaignId) => updateSettings({
        key: 'activeCampaignId', 
        value: campaignId
    });

    const deleteCampaign = (campaignId) => {
        firebase.firestore().collection('campaigns').doc(campaignId).delete().then(_ => {
            setActiveCampaign(null);
        });
    };

    return (
        <CampaignContext.Provider value={{ 
            activeCampaign: campaigns.find(({id}) => id === settings?.activeCampaignId),
            setActiveCampaign,
            campaigns,
            createCampaign,
            deleteCampaign,
            updateCampaign
         }}>
             {children}
        </CampaignContext.Provider>
    );
};
