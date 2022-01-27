import { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton } from '..';
import './DamageTracker.scss';
import { DamageItem } from '.';
import { PartyContext } from '../../context';

export const DamageTracker = ({id}) => {
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     if(id) {
    //         const unsubscribe = firebase.firestore().collection('initiativeItems')
    //             .where('widgetId', '==', id)
    //             .onSnapshot(
    //                 snapshot => {
    //                     setItems(snapshot.docs.map(doc => ({
    //                         id: doc.id,
    //                         ...doc.data()
    //                     })));
    //                 }
    //             );

    //         return () => unsubscribe();
    //     }
    // }, [id]);

    // const addItem = () => {
    //     firebase.firestore().collection('initiativeItems').add({
    //         name: 'NEW',
    //         value: 0,
    //         widgetId: id
    //     });
    // };

    // const deleteAll = () => {
    //     items.forEach(({id}) => {
    //         firebase.firestore().collection('initiativeItems').doc(id).delete();
    //     });
    //     firebase.firestore().collection('widgets').doc(id).update({
    //         current: firebase.firestore.FieldValue.delete()
    //     });
    // };

    return (
        <div className="Initiative">
            <div className="Initiative--Main">
                {items.map(({...item}, i) => <DamageItem key={`ii-${i}`} {...item} />)}
            </div>
            <div className="Initiative--Footer">
                <div style={{flex: 1}} />
                <IconButton onClick={()=>{}}><Icon name="plus" /></IconButton>
                <IconButton onClick={()=>{}} requireConfirm><Icon name="trash" /></IconButton>
            </div>
        </div>
    );
};

export default DamageTracker;
