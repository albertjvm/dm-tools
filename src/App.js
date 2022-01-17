import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, Home } from './components';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <main className="App">
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (
            <Home {...props} />
          )} />
        </Switch>
      </main>
    </AuthProvider>
  );
}

export default App;
