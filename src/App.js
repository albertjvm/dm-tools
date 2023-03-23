import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components';
import { AuthContext } from './context';
import { CampaignChooser, CampaignPage, InitiativePage, PartyEditPage, PartyPage } from './pages';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        {isLoggedIn ? 
          <>
            <Route path="/campaign/:campaignId" element={<CampaignPage />}>
              <Route path='party' element={<PartyPage />} />
              <Route path='edit' element={<PartyEditPage />} />
              <Route path='initiative' element={<InitiativePage />} />
            </Route>
            <Route path="*" element={<CampaignChooser />} />
          </> 
        : 
          <Route path="*" element={<div />} />
        }
      </Routes>
    </div>
  );
}

export default App;
