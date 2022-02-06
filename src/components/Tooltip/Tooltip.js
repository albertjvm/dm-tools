import { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ children, className = '', content, delay = 400, direction = 'top' }) => {
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className={`Tooltip-Wrapper ${className}`}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            { active && (
                <div className={`Tooltip-Tip ${direction}`}>
                    {content}
                </div>
            )}
        </div>
    );
};