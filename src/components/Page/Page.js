import './Page.scss';

export const Page = ({ children, className = '' }) => {
    return (
        <main className={`Page ${className}`}>
            {children}
        </main>
    );
};