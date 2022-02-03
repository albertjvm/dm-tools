import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton } from '../..';
import './DamageTracker.scss';
import { DamageItem } from '.';

export const DamageTracker = ({id}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if(id) {
            const unsubscribe = firebase.firestore().collection('damageItems')
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
        firebase.firestore().collection('damageItems').add({
            name: 'NEW',
            value: 0,
            widgetId: id
        });
    };

    const deleteAll = () => {
        items.forEach(({id}) => {
            firebase.firestore().collection('damageItems').doc(id).delete();
        });
    };

    return (
        <div className="DamageTracker">
            <div className="DamageTracker-Main">
                {items.map(({...item}, i) => <DamageItem key={`di-${i}`} {...item} />)}
            </div>
            <footer>
                <div style={{flex: 1}} />
                <IconButton onClick={addItem}><Icon name="plus" /></IconButton>
                <IconButton onClick={deleteAll} requireConfirm><Icon name="trash" /></IconButton>
            </footer>
        </div>
    );
};

export default DamageTracker;
