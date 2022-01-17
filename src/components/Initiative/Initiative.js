import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton } from '..';
import './Initiative.scss';
import { InitiativeItem } from '.';

export const Initiative = ({id, current = null}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if(id) {
            const unsubscribe = firebase.firestore().collection('initiativeItems')
                .where('widgetId', '==', id)
                .onSnapshot(
                    snapshot => {
                        setItems(snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })));
                    }
                );

            return () => unsubscribe();
        }
    }, [id]);

    const addItem = () => {
        firebase.firestore().collection('initiativeItems').add({
            name: 'test',
            value: 0,
            widgetId: id
        }).then(docRef => {
            if (!current) {
                firebase.firestore().collection('widgets').doc(id).update({
                    current: docRef.id
                })
            }
        });
    };

    const advance = () => {
        firebase.firestore().collection('widgets').doc(id).update({
            current: orderedItems()[1].id
        })
    };

    const orderedItems = () => {
        const sorted = items.sort(({value: v1, name: n1}, {value: v2, name: n2}) => (
            v2 - v1 || n1.localeCompare(n2)
        ));
        const currentIndex = sorted.findIndex(({id}) => id === current);
        return [
            ...sorted.slice(currentIndex),
            ...sorted.slice(0, currentIndex)
        ];
    };

    return (
        <div className="Initiative">
            <div className="Initiative--Main">
                {orderedItems().map(({...item}, i) => <InitiativeItem key={`ii-${i}`} {...item} />)}
            </div>
            <div className="Initiative--Footer">
                <IconButton onClick={advance}><Icon name="angle-double-right" /></IconButton>
                <div style={{flex: 1}} />
                <IconButton onClick={addItem}><Icon name="plus" /></IconButton>
            </div>
        </div>
    );
};

export default Initiative;