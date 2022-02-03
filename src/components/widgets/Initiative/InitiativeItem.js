import { TextInput } from '../..';
import firebase from 'firebase/app';
import './InitiativeItem.scss';
import { useState } from 'react';

export const InitiativeItem = ({ id, name, value }) => {
    const [tempValue, setTempValue] = useState(null);

    const updateItem = ({ key, value }) => {
        firebase.firestore().collection('initiativeItems').doc(id).update({
            [key]: value
        });
    };

    return (
        <div className="InitiativeItem">
            <TextInput
                className="InitiativeItem-Name" 
                value={name} 
                onChange={value => updateItem({key: 'name', value })} 
            />
            <TextInput
                className="InitiativeItem-Value" 
                value={tempValue || value} 
                type="number"
                onChange={setTempValue} 
                onBlur={value => {
                    updateItem({key: 'value', value: parseInt(value) });
                    setTempValue(null);
                }} 
            />
        </div>
    );
};

export default InitiativeItem;