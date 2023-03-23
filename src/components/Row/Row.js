import './Row.scss';

export const Row = ({ children, className = '', ...props }) => {
    return (
        <div className={`Row ${className}`} {...props} >
            {children}
        </div>
    );
};