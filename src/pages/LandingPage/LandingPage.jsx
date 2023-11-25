import React, { useState } from 'react';
import { Box, Container, HStack, Image } from '@chakra-ui/react';
import './LandingPage.css';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';

const LandingPage = () => {
  const [login, setLogin] = useState(1);

  return (
    <div className='content-container'>
      <Box bg='white' w='74rem' h='46.875rem' borderRadius='2rem'>
        {login ? <LoginForm /> : <RegisterForm />}
      </Box>
    </div>
  );
};

export default LandingPage;
