import { useEffect, useState } from 'react';
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
        } else {
            setCanConfirm(false);
            onClick && onClick();
        }
    };

    useEffect(() => {
        if (canConfirm) {
            const timeout = setTimeout(() => {
                setCanConfirm(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [canConfirm]);

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