import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, Home } from './components';
import { 
  AlertProvider,
  AuthProvider, 
  CampaignProvider, 
  ModalProvider, 
  PartyProvider,
  SettingsProvider,
  ToastProvider
} from './context';

const App = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ModalProvider>
          <CampaignProvider>
            <PartyProvider>
              <ToastProvider>
                <AlertProvider>
                    <main className="App">
                      <Header />
                      <Switch>
                        <Route path="/" exact render={(props) => (
                          <Home {...props} />
                        )} />
                      </Switch>
                    </main>
                </AlertProvider>
              </ToastProvider>
            </PartyProvider>
          </CampaignProvider>
        </ModalProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
