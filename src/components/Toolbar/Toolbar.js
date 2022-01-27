import { useContext, useState } from 'react';
import { Dropdown, Icon, IconButton, PartyModal } from '..';
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
            <IconButton onClick={()=> {setDopdownOpen(o => !o)}}>
                <Icon name="plus" />
                <Dropdown open={dropdownOpen}>
                    <IconButton title="DiceTable" onClick={createDiceTable}><Icon name="dice-d20" /></IconButton>
                    <IconButton title="Initiative" onClick={() => createWidget('initiative')}><Icon name="sort-amount-down-alt" /></IconButton>
                    <IconButton title="Party Search" onClick={() => createWidget('partysearch')}><Icon name="users" /></IconButton>
                    <IconButton title="Damage Tracker" onClick={() => createWidget('damagetracker')}><Icon name="skull-crossbones" /></IconButton>
                </Dropdown>
            </IconButton>
            <IconButton onClick={toggleEditAll} toggled={editAll} >
                <Icon name="clone" color={editAll ? 'rgba(0,0,0, .5)' : 'white'} />
            </IconButton>
            <IconButton onClick={handlePartyClick}><Icon name="users" /></IconButton>
            <div style={{flex: 1}} />
            <IconButton onClick={handleSettingsClick}><Icon name="cog" /></IconButton>
        </div>
    );
}

export default Toolbar;