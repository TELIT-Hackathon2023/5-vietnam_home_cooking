import React, { useState } from 'react';
import { Box, Container, HStack, Image } from '@chakra-ui/react';
import './LandingPage.css';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';

const LandingPage = ({ setLoggedIn }) => {
  const [login, setLogin] = useState(1);

  return (
    <div className='content-container'>
      <Box className='content-box'>
        {login ? (
          <LoginForm setLogin={setLogin} setLoggedIn={setLoggedIn} />
        ) : (
          <RegisterForm setLogin={setLogin} />
        )}
      </Box>
    </div>
  );
};

export default LandingPage;
