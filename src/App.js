import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, Home } from './components';
import { AuthProvider, ModalProvider, SettingsProvider } from './context';
import { PartyProvider } from './context/PartyContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ModalProvider>
          <PartyProvider>
            <ToastProvider>
              <main className="App">
                <Header />
                <Switch>
                  <Route path="/" exact render={(props) => (
                    <Home {...props} />
                  )} />
                </Switch>
              </main>
            </ToastProvider>
          </PartyProvider>
        </ModalProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
