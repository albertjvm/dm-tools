import { useContext } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton, Modal, SavingThrowsModal, SkillsModal, Table, TextInput, VitalsModal } from '..';
import './PartyModal.scss';
import { AuthContext, ModalContext, PartyContext } from '../../context';
import { ABILITIES } from '../../data';

export const PartyModal = () => {
    const { user } = useContext(AuthContext);
    const { pushModal } = useContext(ModalContext);
    const { party } = useContext(PartyContext);

    const addPartyMember = () => {
        firebase.firestore().collection('partyMembers')
            .add({
                userId: user.uid,
                name: 'Party Member',
                createdAt: Date.now()
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

    const abilityColumn = (key) => ({
        name: key,
        render: ({ id, abilities = {} }) => (
            <TextInput
                value={abilities[key]}
                type="number"
                onChange={value => updatePartyMember({id, key: `abilities.${key}`, value: parseInt(value)})}
            />
        )
    });

    const handleSavesClick = ({id, name}) => {
        pushModal(
            <SavingThrowsModal 
                key={`saves-${name}`}
                id={id}
            />
        );
    };

    const handleSkillsClick = ({id, name}) => {
        pushModal(
            <SkillsModal 
                key={`skill-${name}`}
                id={id}
            />
        );
    };

    const handleVitalsClick = ({id, name}) => {
        pushModal(
            <VitalsModal 
                key={`vitals-${name}`}
                id={id}
            />
        );
    };

    return (
        <Modal className="PartyModal">
            <h3>Party time!</h3>

            <Table 
                actions={[
                    { icon: 'heartbeat', title: 'Vitals', onClick: handleVitalsClick },
                    { icon: 'running', title: 'Skills', onClick: handleSkillsClick },
                    { icon: 'save', title: 'Saves', onClick: handleSavesClick },
                    { icon: 'trash', requireConfirm: true, onClick: ({id}) => deletePartyMember(id) }
                ]}
                columns={[
                    { name: 'name', flex: 2, render: ({id, name}) => (
                        <TextInput value={name} onChange={value => updatePartyMember({id, key: 'name', value})}/>
                    )},
                    ...ABILITIES.map(({shortName}) => abilityColumn(shortName))
                ]}
                data={party.sort(({createdAt: a}, {createdAt: b}) => a - b)}
            />

            <footer>
                <IconButton onClick={addPartyMember}><Icon name="plus" /></IconButton>
            </footer>
        </Modal>
    );
};

export default PartyModal;
