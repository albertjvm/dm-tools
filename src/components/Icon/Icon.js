import './Icon.scss';

export const Icon = ({ name, color = 'white', size = 18, className = '' }) => {
    return (
        <span 
            className={`Icon fas fa-${name} ${className}`}
            style={{
                color,
                fontSize: size
            }}
        />
    )
}