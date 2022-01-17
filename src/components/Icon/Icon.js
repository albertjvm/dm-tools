import './Icon.scss';

export const Icon = ({ name, color = 'white', size = 18 }) => {
    return (
        <span 
            className={`Icon fas fa-${name}`}
            style={{
                color,
                fontSize: size
            }}
        />
    )
}