import React, { useState } from 'react';

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
    const [ modalStack, setModalStack ] = useState([]);

    const pushModal = (modal) => {
        setModalStack([
            ...modalStack,
            modal
        ]);
    };

    const popModal = () => {
        setModalStack(modalStack.slice(0, -1));
    };

    const closeAllModals = () => {
        setModalStack([]);
    }

    return (
        <ModalContext.Provider value={{ 
            modalStack,
            pushModal,
            popModal,
            closeAllModals
         }}>
             {children}
        </ModalContext.Provider>
    );
};
