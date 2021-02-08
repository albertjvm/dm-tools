import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import './App.css';
import Header from './Header';
import SampleChooser from './SampleChooser';

const App = () => {

  const [user, setUser] = useState(null);

  const isLoggedIn = () => (user != null);

  useEffect(() => {
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.user != null) {
          setUser(result.user.toJSON());
        } else if (firebase.auth().currentUser != null) {
          setUser(firebase.auth().currentUser);
        }
      }).catch((error) => {
    
      });
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="App">
        {isLoggedIn() ? <SampleChooser /> : null}
      </div>
    </>
  );
}

export default App;
