import { useContext } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton, Table, TextInput } from '../..';
import { Modal, FeatsModal, SavingThrowsModal, SkillsModal, VitalsModal } from '..';
import './PartyModal.scss';
import { CampaignContext, ModalContext, PartyContext } from '../../../context';
import { ABILITIES } from '../../../data';

export const PartyModal = () => {
    const { activeCampaign } = useContext(CampaignContext);
    const { pushModal } = useContext(ModalContext);
    const { party } = useContext(PartyContext);

    const addPartyMember = () => {
        firebase.firestore().collection('partyMembers')
            .add({
                campaignId: activeCampaign.id,
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

    const handleFeatsClick = ({id, name}) => {
        pushModal(
            <FeatsModal 
                key={`feats-${name}`}
                id={id}
            />
        );
    };

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
            <h2>Party time!</h2>

            {party.length ? 
                <Table 
                    actions={[
                        { icon: 'heartbeat', title: 'Vitals', onClick: handleVitalsClick },
                        { icon: 'running', title: 'Skills', onClick: handleSkillsClick },
                        { icon: 'save', title: 'Saves', onClick: handleSavesClick },
                        { icon: 'trophy', title: 'Feats', onClick: handleFeatsClick },
                        { icon: 'trash', requireConfirm: true, onClick: ({id}) => deletePartyMember(id) }
                    ]}
                    columns={[
                        { name: 'name', flex: 2, render: ({id, name}) => (
                            <TextInput value={name} onChange={value => updatePartyMember({id, key: 'name', value})}/>
                        )},
                        { name: 'level', render: ({id, level = 1}) => (
                            <TextInput value={level} type="number" onChange={value => updatePartyMember({id, key: 'level', value})}/>
                        )},
                        ...ABILITIES.map(({shortName}) => abilityColumn(shortName))
                    ]}
                    data={party.sort(({createdAt: a}, {createdAt: b}) => a - b)}
                />
            : 
                <h3>Click <Icon name="plus"/> to add you first party member.</h3>
            }

            <footer>
                <IconButton onClick={addPartyMember}><Icon name="plus" /></IconButton>
            </footer>
        </Modal>
    );
};

export default PartyModal;
