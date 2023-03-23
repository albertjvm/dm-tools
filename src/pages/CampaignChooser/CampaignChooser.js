import { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { Page } from '../../components';
import { AuthContext } from '../../context';
import './CampaignChooser.scss';
import { useNavigate } from 'react-router-dom';

export const CampaignChooser = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState([]);

    useEffect(() => {
        if (user?.uid) {
            const q = query(collection(db, 'campaigns'), where('userId', '==', user?.uid));
            const unsub = onSnapshot(q, snapshot => 
                setCampaigns(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            );

            return () => unsub();
        }
    }, [user?.uid]);

    return (
        <Page className="CampaignChooser">
            <h2>Select a Campaign</h2>
            {campaigns.map(({ name, id }) => 
                <div 
                    key={id} 
                    className="campaign"
                    onClick={() => navigate(`/campaign/${id}`)}
                >
                    {name}
                </div>
            )}
        </Page>
    );
};