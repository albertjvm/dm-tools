import { Icon } from '../Icon';
import { Row } from '../Row';
import './SearchInput.scss';

export const SearchInput = ({ value = '', onChange = () => {} }) => {

    const handleFocus = (e) => {
        e.target.select();
    };

    return (
        <Row className="SearchInput">
            <input 
                type='text'
                value={value}
                placeholder='Search...'
                onFocus={handleFocus}
                onChange={e => onChange(e.target.value)}
            />
            { !!value.length && 
                <button onClick={() => onChange('')}>
                    <Icon name='times' size="medium" />
                </button>
            }
        </Row>
    );
};