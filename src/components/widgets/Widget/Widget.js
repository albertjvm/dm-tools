import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { DamageTracker, Iframe, Initiative, PartySearch, WordGenerator, RollableTable, Notes } from '..';
import './Widget.scss';
import { TextInput } from '../..';

export const Widget = ({ id, name, type, data }) => {
    const [ headerOpen, setHeaderOpen ] = useState(false);
    const [ editingName, setEditingName ] = useState(!name);
    const [ tempName, setTempName ] = useState(name || '');

    const updateWidget = (data) => {
        firebase.firestore().collection('widgets').doc(id).update(data);
    };

    useEffect(() => {
        if(!name) {
            setEditingName(headerOpen);
        }
    }, [headerOpen, name])

    const props = () => ( WIDGETS[type] ? {
        id,
        ...data, 
        updateWidget
    } : {});

    const renderName = () => (
        editingName ? 
            <TextInput 
                className='Widget-Name--Edit'
                onClick={e => e.stopPropagation()}
                value={tempName}
                onChange={setTempName}
                onBlur={val => {
                    updateWidget({name: val});
                    setEditingName(false);
                }}
            /> 
        : 
            <h3
                className='Widget-Name--Display'
                onClick={e => {
                    e.stopPropagation();
                    setEditingName(true);
                }}
            >
                {name}
            </h3>
    );

    const WIDGETS = {
        initiative: Initiative,
        partysearch: PartySearch,
        damagetracker: DamageTracker,
        wordgenerator: WordGenerator,
        iframe: Iframe,
        rollabletable: RollableTable,
        notes: Notes
    };

    const ChildWidget = WIDGETS[type] || 'div';

    return (
        <div className='Widget'>
            <header className={`Widget-Header ${headerOpen ? '' : 'collapsed'}`} onClick={() => setHeaderOpen(!headerOpen)}>
                {headerOpen && renderName()}
            </header>
            <ChildWidget {...props()} />
        </div>
    );
};