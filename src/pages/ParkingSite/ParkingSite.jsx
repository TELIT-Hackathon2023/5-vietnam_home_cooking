import React, { useState } from 'react';
import Parking from '../../components/Parking/Parking.jsx';
import { Box, VStack, HStack, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import TParking from '../../assets/tparking.svg';
import { Image } from '@chakra-ui/react';

const ParkingSite = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box position='fixed' left='0' top='0' height='100vh' width='8rem' bg='white' color='#2e2e2e'>
      <VStack
        spacing='4'
        alignItems='center'
        justifyContent='center'
        paddingTop='8'
        display={{ base: 'none', md: 'flex' }}
      >
        <Image src={TParking} boxSize='100px'></Image>
        <h1>Map</h1>
        <h1>Waiting list</h1>
      </VStack>

      <Box display={{ base: 'flex', md: 'none' }}>
        <IconButton
          icon={<HamburgerIcon />}
          aria-label='Menu'
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />

        {isMobileMenuOpen && (
          <VStack spacing='4' alignItems='flex-start' marginTop='8' justifyContent='center'>
            <Text>Home</Text>
            <Text>Profile</Text>
            <Text>Settings</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default ParkingSite;
