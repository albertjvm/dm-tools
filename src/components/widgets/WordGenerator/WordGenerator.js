import { useContext, useState } from 'react';
import { Icon, IconButton, TextInput } from '../..';
import { ToastContext } from '../../../context/ToastContext';
import { generateWord } from '../../../utils';
import './WordGenerator.scss';

export const WordGenerator = ({updateWidget, count}) => {
    const { toast } = useContext(ToastContext);
    const [words, setWords] = useState([]);

    const handleClick = () => {
        setWords(
            new Array(count).fill('').map(_ => generateWord().toLowerCase())
        );
    };

    const handleClickWord = (w) => {
        navigator.clipboard.writeText(w);
        toast('Copied to clipboard!');
    };

    const handleChange = (value) => {
        updateWidget({
            count: value
        })
    };

    return (
        <div className='WordGenerator'>
            <main>
                {words.map((w, i) => (
                    <div
                        key={`word-${i}`}
                        className='WordGenerator-Row'
                        onClick={() => handleClickWord(w)}
                    >
                        {w}
                    </div>
                ))}
            </main>
            <footer>
                <IconButton onClick={handleClick}><Icon name="dice-d20" /></IconButton>
                <TextInput type="number" placeholder="#" min="1" value={count} onChange={handleChange} />
            </footer>
        </div>
    );
}