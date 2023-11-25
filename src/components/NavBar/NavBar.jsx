import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  Image,
  Button,
  Text,
  Avatar,
  IconButton,
  Divider,
  Spacer,
} from '@chakra-ui/react';
import TParking from '../../assets/tparking.svg';
import { FaCog } from 'react-icons/fa';

const NavBar = ({ onNavItemClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onNavItemClick(item); // Pass the selected item to the parent component
  };

  const renderNavItem = (item, label) => {
    const textStyle = {
      cursor: 'pointer',
      fontWeight: selectedItem === item ? 'bold' : 'normal',
      width: '120px',
    };

    if (selectedItem === item) {
      return (
        <Button
          variant='solid'
          bgColor={'#E10075'}
          color={'white'}
          _hover={{ bgColor: '#C5006A' }}
          onClick={() => handleItemClick(item)}
        >
          {label}
        </Button>
      );
    } else {
      return (
        <Text color={'#2C2C2C'} onClick={() => handleItemClick(item)} style={textStyle}>
          {label}
        </Text>
      );
    }
  };

  return (
    <Flex direction='row' height='100%'>
      {/* Vertical Navbar */}
      <Box width='200px' color='white' padding='8' height='100%' borderRight='3px solid #E10075'>
        <Stack direction='column' align='center' spacing='2rem' height='100%'>
          <Image src={TParking} w={'6rem'} />
          <Stack marginTop={'2rem'} spacing={'1rem'}>
            {renderNavItem('dashboard', 'Dashboard')}
            {renderNavItem('map', 'Map')}
            {renderNavItem('booking', 'Booking')}
          </Stack>

          <Spacer />

          <Divider borderColor='gray.300' my={4} />
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Avatar size='sm' name='John Doe' src='user_avatar_url.jpg' />
              <Text marginLeft={2} color={'#2C2C2C'}>
                John Doe
              </Text>
            </Flex>
            <IconButton
              icon={<FaCog />}
              variant='ghost'
              fontSize='20px'
              color='gray.500'
              aria-label='Settings'
            />
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NavBar;
