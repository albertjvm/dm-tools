import { useState } from 'react';
import firebase from 'firebase/app';
import { Icon, IconButton, TextInput } from '..';
import { generateWord } from '../../utils';
import './WordGenerator.scss';

export const WordGenerator = ({id, count}) => {
    const [words, setWords] = useState([]);

    const handleClick = () => {
        setWords(
            new Array(count).fill('').map(_ => generateWord().toLowerCase())
        );
    };

    const handleChange = (value) => {
        firebase.firestore().collection('widgets').doc(id).update({
            count: value
        })
    };

    return (
        <div className='WordGenerator'>
            <main>
                {words.map((w, i) => (
                    <div key={`word-${i}`} className='WordGenerator--Row'>{w}</div>
                ))}
            </main>
            <footer>
                <IconButton onClick={handleClick}><Icon name="dice-d20" /></IconButton>
                <TextInput type="number" placeholder="#" min="1" value={count} onChange={handleChange} />
            </footer>
        </div>
    );
}