import { useContext } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton, Modal, TextInput } from '..';
import './PartyModal.scss';
import { AuthContext, PartyContext } from '../../context';

export const PartyModal = () => {
    const { user } = useContext(AuthContext);
    const { party } = useContext(PartyContext);

    const addPartyMember = () => {
        firebase.firestore().collection('partyMembers')
            .add({
                userId: user.uid,
                name: 'Party Member'
            });
    };

    const updatePartyMember = ({ id, key, value }) => {
        firebase.firestore().collection('partyMembers').doc(id).update({
            [key]: value
        });
    };

    const deletePartyMember = (id) => {
        firebase.firestore().collection('partyMembers').doc(id).delete();
    };

    return (
        <Modal className="PartyModal">
            <h3>Party time!</h3>

            {party.map(({ id, name }) => (
                <div className='PartyModal--Row'>
                    <TextInput value={name} onChange={value => updatePartyMember({id, key: 'name', value})}/>
                    <IconButton onClick={() => deletePartyMember(id)}><Icon name="times"/></IconButton>
                </div>
            ))}

            <footer>
                <IconButton onClick={addPartyMember}><Icon name="plus" /></IconButton>
            </footer>
        </Modal>
    );
};

export default PartyModal;
