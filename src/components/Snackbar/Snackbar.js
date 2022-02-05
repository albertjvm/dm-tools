import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';
import './Snackbar.scss';

export const Snackbar = () => {
    const { snack } = useContext(ToastContext);

    return (
        <div className={`Snackbar${snack ? ' show' : ''}`}>
            {snack}
        </div>
    );
};