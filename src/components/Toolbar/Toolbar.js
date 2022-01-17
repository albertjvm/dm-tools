import { useState } from 'react';
import { Dropdown, Icon, IconButton } from '..';
import { createNewWidget } from '../../db';
import './Toolbar.scss';

export const Toolbar = ({ toggleEditAll, editAll }) => {
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

    const createInitiative = () => {
        createNewWidget({
            type: 'initiative',
            config: {
                row: 1,
                col: 1,
                rowSpan: 2,
                colSpan: 2
            }
        });
    };

    return (
        <div className="Toolbar">
            <IconButton onClick={()=> {setDopdownOpen(o => !o)}}>
                <Icon name="plus" />
                <Dropdown open={dropdownOpen}>
                    <IconButton title="DiceTable" onClick={createDiceTable}><Icon name="dice-d20" /></IconButton>
                    <IconButton title="Initiative" onClick={createInitiative}><Icon name="sort-amount-down-alt" /></IconButton>
                </Dropdown>
            </IconButton>
            <IconButton onClick={toggleEditAll} toggled={editAll} >
                <Icon name="clone" color={editAll ? 'rgba(0,0,0, .5)' : 'white'} />
            </IconButton>
        </div>
    );
}

export default Toolbar;