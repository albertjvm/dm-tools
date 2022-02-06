import { useContext, useState } from 'react';
import firebase from 'firebase/app';
import { Dropdown, Icon, IconButton, TextInput, Tooltip } from '..';
import { PartyModal, SettingsModal } from '../modals';
import { CampaignContext, ModalContext } from '../../context';
import './Toolbar.scss';

export const Toolbar = ({ toggleEditAll, editAll }) => {
    const { pushModal } = useContext(ModalContext);
    const { createCampaign, activeCampaign, campaigns, setActiveCampaign, deleteCampaign, updateCampaign } = useContext(CampaignContext);
    const [dropdownOpen, setDopdownOpen] = useState(false);
    const [campaignSelectOpen, setCampaignSelectOpen] = useState(false);

    const createNewWidget = (data) => {
        firebase.firestore().collection('widgets').add({
            campaignId: activeCampaign.id,
            ...data
        });
    };

    const createDiceTable = () => {
        createNewWidget({
            type: 'iframe',
            config: {
                row: 1,
                col: 1,
                rowSpan: 10,
                colSpan: 5
            },
            url: 'https://dice-table.albertjvm.ca/'
        });
        setDopdownOpen(false);
    };

    const createWidget = (type) => {
        createNewWidget({
            type,
            config: {
                row: 1,
                col: 1,
                rowSpan: 2,
                colSpan: 2
            }
        });
        setDopdownOpen(false);
    };

    const handlePartyClick = () => {
        pushModal(
            <PartyModal key='party' />
        );
    };

    const handleSettingsClick = () => {
        pushModal(
            <SettingsModal key='settings' />
        );
    };

    const handleNewCampaign = () => {
        createCampaign('New Campaign');
        setCampaignSelectOpen(false);
    };

    const handleSelectCampaign = (id) => {
        setActiveCampaign(id);
        setCampaignSelectOpen(false);
    };

    return (
        <div className="Toolbar">
            <Tooltip content="Switch Campaign" direction='right'>
                <IconButton onClick={()=> {setCampaignSelectOpen(o => !o)}}>
                    <Icon name="book-open" />
                </IconButton>
            </Tooltip>
            <Dropdown open={campaignSelectOpen}>
                {campaigns.map(({name, id}) => (
                    <button key={id} className='CampaignButton' onClick={() => handleSelectCampaign(id)}>{name}</button>
                ))}
                <button className='CampaignButton' onClick={handleNewCampaign}>Create New Campaign</button>
            </Dropdown>
            {activeCampaign && <>
                <TextInput 
                    value={activeCampaign.name}
                    onChange={v => updateCampaign(activeCampaign.id, {name: v})}
                />
                <Tooltip content="Add a widget" direction='right'>
                    <IconButton onClick={()=> {setDopdownOpen(o => !o)}}>
                        <Icon name="plus" />
                    </IconButton>
                </Tooltip>
                <Dropdown open={dropdownOpen}>
                    <IconButton onClick={createDiceTable}><Icon name="dice-d20" />&nbsp;Dice Table</IconButton>
                    <IconButton title="Initiative" onClick={() => createWidget('initiative')}><Icon name="sort-amount-down-alt" />&nbsp;Initiative</IconButton>
                    <IconButton title="Party Search" onClick={() => createWidget('partysearch')}><Icon name="users" />&nbsp;Party Search</IconButton>
                    <IconButton title="Damage Tracker" onClick={() => createWidget('damagetracker')}><Icon name="skull-crossbones" />&nbsp;Damage Tracker</IconButton>
                    <IconButton title="Word Generator" onClick={() => createWidget('wordgenerator')}><Icon name="font" />&nbsp;Name Generator</IconButton>
                    <IconButton title="Rollable Table" onClick={() => createWidget('rollabletable')}><Icon name="table" />&nbsp;Rollable Table</IconButton>
                    <IconButton title="Notes" onClick={() => createWidget('notes')}><Icon name="book" />&nbsp;Notes</IconButton>
                </Dropdown>
                <Tooltip content="Edit Layout" direction='right'>
                    <IconButton onClick={toggleEditAll} toggled={editAll} >
                        <Icon name="clone" color={editAll ? 'rgba(0,0,0, .5)' : 'white'} />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Configure Party" direction='right'>
                    <IconButton onClick={handlePartyClick}><Icon name="users" /></IconButton>
                </Tooltip>
                <Tooltip content="Close Campaign" direction='left'>
                    <IconButton onClick={() => setActiveCampaign(null)}><Icon name="times" /></IconButton>
                </Tooltip>
                <Tooltip content="Delete Campaign" direction='left'>
                    <IconButton onClick={() => deleteCampaign(activeCampaign.id)} requireConfirm><Icon name="trash" /></IconButton>
                </Tooltip>
            </>}
            <div style={{flex: 1}} />
            <Tooltip content="Settings" direction='left'>
                <IconButton onClick={handleSettingsClick}><Icon name="cog" /></IconButton>
            </Tooltip>
        </div>
    );
}

export default Toolbar;