import React, { useContext } from 'react';
import firebase from 'firebase/app';
import './Header.scss';
import { AlertContext, AuthContext } from '../../context';
import { Icon, IconButton, Tooltip } from '..';

export const Header = () => {
    const { user, isLoggedIn } = useContext(AuthContext);
    const { alert } = useContext(AlertContext);

    const logout = () => {
        firebase.auth().signOut();
    };

    const login = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);
    };


    return (
        <nav id="navigation" className="Header">
            <h1>DM Tools</h1>
            {alert && 
                <Tooltip
                    content={alert}
                    direction="left"
                    delay={100}
                    className="Header-Alert"
                >
                    <Icon name="exclamation-circle" color="red" />
                </Tooltip>
            }
            { !isLoggedIn ? 
                <button onClick={login}>Sign In</button> 
                : 
                <>
                    <h4>{user?.displayName}</h4>
                    <IconButton onClick={logout}>
                        <Icon name="sign-out-alt" color="black" />
                    </IconButton>
                </>
            }
        </nav>
    )
};
export default Header;
