import { useState } from 'react';
import './IconButton.scss';

export const IconButton = ({
    toggled, 
    onClick, 
    children, 
    className ='', 
    requireConfirm = false,
    confirmColor = 'red',
    ...rest
}) => {
    const [canConfirm, setCanConfirm] = useState(false);

    const handleClick = () => {
        if (requireConfirm && !canConfirm) {
            setCanConfirm(true);
            setTimeout(() => {
                setCanConfirm(false);
            }, 2000);
        } else {
            setCanConfirm(false);
            onClick();
        }
    };

    return (
        <div
            className={`IconButton ${className} ${toggled ? 'toggled' : ''}`}
            style={(requireConfirm && canConfirm) ? {
                backgroundColor: confirmColor
            } : {}}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </div>
    );
}