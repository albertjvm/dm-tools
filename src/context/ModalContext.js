import React, { useState } from 'react';

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
    const MODALS = {
        NONE: 'NONE',
        PARTY: 'PARTY',
    };

    const [ activeModal, setActiveModal ] = useState(MODALS.NONE);

    return (
        <ModalContext.Provider value={{ 
            activeModal,
            setActiveModal,
            MODALS
         }}>
             {children}
        </ModalContext.Provider>
    );
};
