import React from 'react';
import firebase from 'firebase/app';
import './Header.css';

export const Header = ({user, setUser}) => {
    const logout = () => {
        firebase.auth().signOut().then(() => {
            setUser(null);
          }).catch((error) => {
            // An error happened.
          });
    };

    const login = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);
    };


    return (
        <nav id="navigation" className="Header">
            <h1>AUTH TEST</h1>
            {user == null ? 
                <button onClick={login}>Sign In</button> 
                : 
                <>
                    <button onClick={logout}>Sign Out</button>
                    <h4>{user.displayName}</h4>
                </>}
        </nav>
    )
};
export default Header;
