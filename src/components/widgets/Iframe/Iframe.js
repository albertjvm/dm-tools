import './Iframe.scss';

export const Iframe = ({ url }) => {
    return (
        <iframe className='Iframe' src={url} title={url}></iframe>
    );
};