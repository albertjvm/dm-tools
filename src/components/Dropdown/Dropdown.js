import './Dropdown.scss';

export const Dropdown = ({ open, children }) => {
    return (
        <div className={`Dropdown ${open ? 'open': 'closed'}`}>
            {children}
        </div>
    );
};

export default Dropdown;