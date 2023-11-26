import React, { useState } from 'react';
import './ParkingSite.css';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import NavBar from '../../components/NavBar/NavBar.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import ParkingMap from '../../components/ParkingMap/ParkingMap.jsx';

const ParkingSite = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavItemClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='content-container'>
      <Box bg='white' w='70%' h='75%' borderRadius='2rem' overflow='hidden'>
        <Flex direction='row' height='100%'>
          {/* Vertical Navbar */}
          <NavBar onNavItemClick={handleNavItemClick} />

          {/* Dashboard */}
          <Box flex='1' p='4'>
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'map' && <ParkingMap />}
            {/* Add other pages as needed */}
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default ParkingSite;
