import { Modal } from '..';
import firebase from 'firebase/app';
import './FeatsModal.scss';
import { useContext } from 'react';
import { PartyContext } from '../../context';
import { FEATS } from '../../data';

export const FeatsModal = ({ id }) => {
    const { member } = useContext(PartyContext);
    const { name, feats } = member(id);

    const updatePartyMember = ({ id, key, value }) => {
        firebase.firestore().collection('partyMembers').doc(id).update({
            [key]: value
        });
    };

    const handleCheck = (e) => {
        const { name, checked } = e.target;

        updatePartyMember({ 
            id, 
            key: 'feats', 
            value: checked ? [...(feats || []), name] : feats.filter(f => f !== name)
        });
    };

    return (
        <Modal className="FeatsModal">
            <h3>{`${name} - Feats`}</h3>
            <div className='FeatsModal--Grid'>
                {FEATS.map(({ name }) => (
                    <div key={name}>
                        <input type="checkbox" 
                            checked={(feats || []).includes(name)}
                            name={name} 
                            onChange={handleCheck} 
                        />
                        <label>{name}</label>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default FeatsModal;