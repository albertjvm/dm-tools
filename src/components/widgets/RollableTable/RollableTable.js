import React, { useState } from 'react';
import { Icon, IconButton, TextInput } from '../..';
import './RollableTable.scss';

export const RollableTable = ({updateWidget, items = []}) => {
    const [highlightIndex, setHighlightIndex] = useState(null);
    const refs = items.map(item => React.createRef());

    const handleRoll = () => {
        const index = Math.floor(Math.random() * items.length);
        setHighlightIndex(index);
        refs[index].current.scrollIntoView({behavior: "smooth"});
    };

    const handleDeleteAll = () => {
        updateWidget({items: []});
        setHighlightIndex(null);
    };

    const handleAdd = () => {
        updateWidget({
            items: [
                ...items,
                'NEW'
            ]
        });
        setHighlightIndex(null);
    };

    const updateItem = (i, value) => {
        updateWidget({
            items: [
                ...items.slice(0, i),
                value,
                ...items.slice(i + 1)
            ]
        });
        setHighlightIndex(null);
    };

    const handleDelete = (i) => {
        updateWidget({
            items: [
                ...items.slice(0, i),
                ...items.slice(i + 1)
            ]
        });
        setHighlightIndex(null);
    }

    return (
        <div className='RollableTable'>
            <main>
                {items.map((item, i) => (
                    <div
                        className='RollableTable-Row' 
                        key={`rollItem-${i}`}
                        ref={refs[i]}
                    >
                        <TextInput
                            className={i === highlightIndex ? 'highlight' : ''}
                            value={item}
                            onChange={v => updateItem(i, v)}
                        />
                        <IconButton onClick={() => handleDelete(i)} requireConfirm><Icon name="trash" /></IconButton>
                    </div>
                ))}
            </main>
            <footer>
                <IconButton onClick={handleRoll}><Icon name="dice-d20" /></IconButton>
                <IconButton onClick={handleAdd}><Icon name="plus" /></IconButton>
                <IconButton onClick={handleDeleteAll} requireConfirm><Icon name="ban" /></IconButton>
            </footer>
        </div>
    );
}