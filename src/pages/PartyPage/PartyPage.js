import { Icon, Page, Row, SearchInput } from '../../components';
import './PartyPage.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { processSearchTokens } from '../../utils';

export const PartyPage = () => {
    const { campaignId } = useParams();
    const [ party, setParty ] = useState([]);
    const [ searchString, setSearchString ] = useState('');
    const [ tokens, setTokens ] = useState([]);

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

    useEffect(() => {
        setTokens(searchString.toLowerCase().trim().split(/\s+/));
    }, [searchString]);

    const {title, getSearchValue, getSortValue} = processSearchTokens(tokens);

    const sortedParty = () => party.sort((a, b) => {
        if (getSortValue) {
            return getSortValue(b) - getSortValue(a);
        } else {
            return getSearchValue(b) - getSearchValue(a);
        }
    });

    return (
        <Page className="PartyPage">
            <Row>
                <SearchInput value={searchString} onChange={setSearchString} />
                <Link to="../edit"><Icon name="gear" /></Link>
            </Row>
            <Row className='header'>
                <h3>Name</h3>
                <h3>{title}</h3>
            </Row>
            {sortedParty().map((character) => 
                <Row key={character.id} className='character'>
                    <span>{character.name}</span>
                    <span>{getSearchValue(character)}</span>
                </Row>
            )}
        </Page>
    );
};