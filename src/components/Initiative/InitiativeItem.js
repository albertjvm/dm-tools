import { TextInput } from '..';
import firebase from 'firebase/app';
import './InitiativeItem.scss';

export const InitiativeItem = ({ id, name, value }) => {

    const updateItem = ({ key, value }) => {
        firebase.firestore().collection('initiativeItems').doc(id).update({
            [key]: value
        });
    };

    return (
        <div className="InitiativeItem">
            <TextInput
                className="InitiativeItem--Name" 
                value={name} 
                onChange={value => updateItem({key: 'name', value })} 
            />
            <TextInput
                className="InitiativeItem--Value" 
                value={value} 
                type="number"
                onChange={value => updateItem({key: 'value', value })} 
            />
        </div>
    );
};

export default InitiativeItem;