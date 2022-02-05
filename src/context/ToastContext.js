import React, { useState } from 'react';

export const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
    const [ snack, setSnack ] = useState('');

    const toast = (value, delay = 3000) => {
        setSnack(value);

        setTimeout(() => {
            setSnack('');
        }, delay);
    };

    return (
        <ToastContext.Provider value={{ 
            toast,
            snack
         }}>
             {children}
        </ToastContext.Provider>
    );
};
