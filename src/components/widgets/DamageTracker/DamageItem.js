import { TextInput } from '../..';
import firebase from 'firebase/app';
import './DamageItem.scss';
import { useState } from 'react';

export const DamageItem = ({ id, name, value }) => {
    const [tempValue, setTempValue] = useState(null);

    const updateItem = ({ key, value }) => {
        firebase.firestore().collection('damageItems').doc(id).update({
            [key]: value
        });
    };

    const handleValueChange = (newValue) => {
        if (newValue.startsWith('+') || newValue.startsWith('-')) {
            updateItem({key: 'value', value: value + parseInt(newValue)});
        } else {
            updateItem({key: 'value', value: parseInt(newValue)});
        }
        setTempValue(null);
    };

    return (
        <div className="DamageItem">
            <TextInput
                className="DamageItem-Name" 
                value={name} 
                onChange={value => updateItem({key: 'name', value})} 
            />
            <TextInput
                className="DamageItem-Value" 
                value={tempValue || value} 
                onChange={setTempValue} 
                onBlur={handleValueChange} 
                onEnter={() => handleValueChange(tempValue || value)}
                selectOnFocus
            />
        </div>
    );
};

export default DamageItem;