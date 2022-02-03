import { Modal } from '..';
import { TextInput } from '../..';
import firebase from 'firebase/app';
import './VitalsModal.scss';
import { useContext } from 'react';
import { PartyContext } from '../../../context';

export const VitalsModal = ({ id }) => {
    const { member } = useContext(PartyContext);
    const { name, hp, ac, weight } = member(id);

    const updatePartyMember = ({ id, key, value }) => {
        firebase.firestore().collection('partyMembers').doc(id).update({
            [key]: value
        });
    };

    return (
        <Modal className="VitalsModal">
            <h3>{`${name} - Vitals`}</h3>
            <div className='VitalsModal-Row'>
                <label>HP</label>
                <TextInput 
                    value={hp}
                    type="number"
                    onChange={val => updatePartyMember({id, key: 'hp', value: parseInt(val)})}
                />
            </div>
            <div className='VitalsModal-Row'>
                <label>AC</label>
                <TextInput 
                    value={ac}
                    type="number"
                    onChange={val => updatePartyMember({id, key: 'ac', value: parseInt(val)})}
                />
            </div>
            <div className='VitalsModal-Row'>
                <label>Weight</label>
                <TextInput 
                    value={weight}
                    type="number"
                    onChange={val => updatePartyMember({id, key: 'weight', value: parseInt(val)})}
                />
            </div>
        </Modal>
    );
};

export default VitalsModal;