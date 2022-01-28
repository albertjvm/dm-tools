import { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ children, content, delay = 400, direction = 'top' }) => {
    const [active, setActive] = useState(false);

    const showTip = () => {
        setActive(true);
    };

    const hideTip = () => {
        setActive(false);
    };

    return (
        <div
            className='Tooltip--Wrapper'
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            { active && (
                <div className={`Tooltip--Tip ${direction}`}>
                    {content}
                </div>
            )}
        </div>
    );
};