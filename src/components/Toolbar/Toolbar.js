import { useContext, useState } from 'react';
import { Dropdown, Icon, IconButton, PartyModal, Tooltip } from '..';
import { createNewWidget } from '../../db';
import { ModalContext } from '../../context';
import './Toolbar.scss';
import { SettingsModal } from '../SettingsModal';

export const Toolbar = ({ toggleEditAll, editAll }) => {
    const { pushModal } = useContext(ModalContext);
    const [dropdownOpen, setDopdownOpen] = useState(false);

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

    return (
        <div className="Toolbar">
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
            </Dropdown>
            <Tooltip content="Edit Layout" direction='right'>
                <IconButton onClick={toggleEditAll} toggled={editAll} >
                    <Icon name="clone" color={editAll ? 'rgba(0,0,0, .5)' : 'white'} />
                </IconButton>
            </Tooltip>
            <Tooltip content="Configure Party" direction='right'>
                <IconButton onClick={handlePartyClick}><Icon name="users" /></IconButton>
            </Tooltip>
            <div style={{flex: 1}} />
            <Tooltip content="Settings" direction='left'>
                <IconButton onClick={handleSettingsClick}><Icon name="cog" /></IconButton>
            </Tooltip>
        </div>
    );
}

export default Toolbar;