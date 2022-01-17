import React, { useContext } from 'react';
import firebase from 'firebase/app';
import './Header.css';
import { AuthContext } from '../../context';
import { Link } from 'react-router-dom';
import { Icon, IconButton } from '..';

export const Header = () => {
    const { user, isLoggedIn } = useContext(AuthContext);

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
            { !isLoggedIn ? 
                <button onClick={login}>Sign In</button> 
                : 
                <>
                    <h4>{user?.displayName}</h4>
                    <IconButton onClick={logout}>
                        <Icon name="sign-out-alt" color="black" />
                    </IconButton>
                </>}
        </nav>
    )
};
export default Header;
