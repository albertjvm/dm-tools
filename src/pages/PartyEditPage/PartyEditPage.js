import { CharacterEdit, Page } from '../../components';
import './PartyEditPage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const PartyEditPage = () => {
    const { campaignId } = useParams();
    const [ party, setParty ] = useState([]);

    useEffect(() => {
        const partyQuery = query(collection(db, 'partyMembers'), where('campaignId', '==', campaignId));
        const unsubParty = onSnapshot(partyQuery, snapshot => 
            setParty(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        );

        return () => {
            unsubParty();
        };
    }, [campaignId]);

    return (
        <Page className="PartyEditPage">
            {party.map((character, i) => <CharacterEdit key={`character-${i}`} character={character} />)}
        </Page>
    );
};