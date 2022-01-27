import { TextInput } from '..';
import firebase from 'firebase/app';
import './DamageItem.scss';
import { useState } from 'react';

export const DamageItem = ({ id, name, value }) => {
    const [tempValue, setTempValue] = useState(null);

    // const updateItem = ({ key, value }) => {
    //     firebase.firestore().collection('initiativeItems').doc(id).update({
    //         [key]: value
    //     });
    // };

    return (
        <div className="DamageItem">
            <TextInput
                className="DamageItem--Name" 
                value={name} 
                onChange={value => {}} 
            />
            <TextInput
                className="DamageItem--Value" 
                value={tempValue || value} 
                type="number"
                onChange={setTempValue} 
                onBlur={value => {
                    // updateItem({key: 'value', value: parseInt(value) });
                    setTempValue(null);
                }} 
            />
        </div>
    );
};

export default DamageItem;