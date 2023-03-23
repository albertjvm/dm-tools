import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context';
import { Icon } from '../Icon';
import './Header.scss';

export const Header = () => {
    const { 
        isLoggedIn, 
        loginWithGoogle,
        logout 
    } = useContext(AuthContext);

    return (
        <header className="Header">
            <Link to="/" className='title'>
                <Icon 
                    name='hammer'
                />
                <h1>DM Tools</h1>
            </Link>
            { isLoggedIn ? 
                <>
                    <Icon 
                        name='right-from-bracket'
                        onClick={logout}
                    />
                </>
            :
                <Icon 
                    name='right-to-bracket'
                    onClick={loginWithGoogle}
                />
            }
        </header>
    );
};