import { useContext } from 'react';
import { ModalContext } from '../../../context';
import './Modal.scss';

export const Modal = ({children, className}) => {
    const { popModal } = useContext(ModalContext);

    const handleWrapperClick = (e) => {
        e.stopPropagation();
        popModal();
    };

    const handleModalClick= (e) => {
        e.stopPropagation();
    };

    return (
        <div className='Modal-Wrapper' onClick={handleWrapperClick}>
            <div className={`Modal ${className}`} onClick={handleModalClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
