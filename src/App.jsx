import './App.css';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return <>{loggedIn ? '' : <LandingPage setLoggedIn={setLoggedIn} />}</>;
}

export default App;
