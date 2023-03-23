import './Icon.scss';

export const Icon = ( { 
    name='circle-xmark', 
    color, 
    size='2rem' ,
    className = '',
    ...rest
}) => {
    return (
        <i 
            className={`Icon fa-solid fa-${name} ${className}`}
            style={{
                color,
                fontSize: size
            }}
            {...rest}
        ></i>
    );
};