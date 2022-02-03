import { Modal } from '..';
import firebase from 'firebase/app';
import './SkillsModal.scss';
import { useContext } from 'react';
import { PartyContext } from '../../../context';
import { PROFICIENCY, SKILLS } from '../../../data';

export const SkillsModal = ({ id }) => {
    const { member } = useContext(PartyContext);
    const { name, skills } = member(id);

    const updatePartyMember = ({ id, key, value }) => {
        firebase.firestore().collection('partyMembers').doc(id).update({
            [key]: value
        });
    };

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        const [ key, expertString ] = name.split('-');
        const expert = expertString === 'expert';

        const value = checked ? (
            expert ? PROFICIENCY.EXPERT
                : PROFICIENCY.NORMAL
        ) : (
            expert ? PROFICIENCY.NORMAL
                : PROFICIENCY.NONE
        );

        updatePartyMember({ id, key: `skills.${key}`, value });
    };
    
    const memberProficiency = (name) => skills?.hasOwnProperty(name) ? skills[name] : PROFICIENCY.NONE;

    return (
        <Modal className="SkillsModal">
            <h3>{`${name} - Skills`}</h3>
            <div className='SkillsModal-Grid'>
                {SKILLS.map(({ name }) => (
                    <div key={name}>
                        <input type="checkbox" 
                            checked={memberProficiency(name) >= PROFICIENCY.NORMAL}
                            name={name} onChange={handleCheck} 
                        />
                        <input type="checkbox" 
                            checked={memberProficiency(name) === PROFICIENCY.EXPERT}
                            name={`${name}-expert`} onChange={handleCheck} 
                        />
                        <label>{name}</label>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default SkillsModal;