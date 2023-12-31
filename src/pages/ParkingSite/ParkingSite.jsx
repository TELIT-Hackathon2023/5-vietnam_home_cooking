import React, { useState } from 'react';
import './ParkingSite.css';
import { Box, Button, Flex, Spacer, useToast } from '@chakra-ui/react';
import NavBar from '../../components/NavBar/NavBar.jsx';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Booking from '../../components/Booking/Booking.jsx';
import ParkingMap from '../../components/ParkingMap/ParkingMap.jsx';

const ParkingSite = ({ setLoggedIn }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState('dashboard');

  const handleNavItemClick = (page) => {
    setCurrentPage(page);
    setSelectedItem(page);
  };

  const onLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className='content-container'>
      <Box bg='white' w='70%' h='75%' borderRadius='2rem' overflow='hidden'>
        <Flex direction='row' height='100%'>
          {/* Vertical Navbar */}
          <NavBar onNavItemClick={handleNavItemClick} onLogOut={onLogOut} />

          {/* Dashboard */}
          <Box flex='1' p='4'>
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'booking' && <Booking />}
            {currentPage === 'map' && <ParkingMap setCurrentPage = {setCurrentPage} />}
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default ParkingSite;
