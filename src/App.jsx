import './App.css';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import { useState } from 'react';
import ParkingSite from './pages/ParkingSite/ParkingSite.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <ParkingSite setLoggedIn={setLoggedIn} />
      ) : (
        <LandingPage setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
