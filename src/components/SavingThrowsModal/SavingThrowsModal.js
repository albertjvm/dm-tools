import { Modal } from '..';
import firebase from 'firebase/app';
import './SavingThrowsModal.scss';
import { useContext } from 'react';
import { PartyContext } from '../../context';
import { ABILITIES, PROFICIENCY } from '../../data';

export const SavingThrowsModal = ({ id }) => {
    const { member } = useContext(PartyContext);
    const { name, saves } = member(id);

    const updatePartyMember = ({ id, key, value }) => {
        firebase.firestore().collection('partyMembers').doc(id).update({
            [key]: value
        });
    };

    const handleCheck = (e) => {
        const { name, checked } = e.target;

        updatePartyMember({ id, key: `saves.${name}`, value: checked ? PROFICIENCY.NORMAL : PROFICIENCY.NONE});
    };

    const value = (name) => saves?.hasOwnProperty(name) ? saves[name] : PROFICIENCY.NONE;

    return (
        <Modal className="SavingThrowsModal">
            <h3>{`${name} - Saving Throws`}</h3>
            <div className='SavingThrowsModal--Grid'>
                {ABILITIES.map(({ name, shortName }) => (
                    <div key={shortName}>
                        <input type="checkbox" 
                            checked={value(shortName)}
                            name={shortName} onChange={handleCheck} 
                        />
                        <label>{name}</label>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SavingThrowsModal;