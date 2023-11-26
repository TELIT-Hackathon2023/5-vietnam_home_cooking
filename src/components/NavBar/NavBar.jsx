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
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  useToast,
} from '@chakra-ui/react';
import TParking from '../../assets/tparking.svg';
import './NavBar.css';
import { IoEllipsisVertical } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const NavBar = ({ onNavItemClick, onLogOut }) => {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const toast = useToast();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onNavItemClick(item); // Pass the selected item to the parent component
  };

  const handleLogOut = () => {
    toast({
      title: 'Logged out...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    onLogOut();
  };

  const renderNavItem = (item, label) => {
    const textStyle = {
      cursor: 'pointer',
      fontWeight: selectedItem === item ? 'bold' : 'normal',
      width: '120px',
    };

    // if (selectedItem === item) {
    return (
      <Box
        className='nav-bar-button'
        as='button'
        w='9rem'
        h='2.75rem'
        bg={selectedItem === item ? '#E10075' : 'white'}
        color={selectedItem === item ? 'white' : '#2C2C2C'}
        _hover={selectedItem === item ? { bgColor: '#C5006A' } : { bgColor: '#dedede' }}
        borderRadius='0.5rem'
        onClick={() => handleItemClick(item)}
      >
        {label}
      </Box>
    );

    //   return (
    //     <Button
    //       variant='solid'
    //       bgColor={'#E10075'}
    //       color={'white'}
    //       _hover={{ bgColor: '#C5006A' }}
    //       onClick={() => handleItemClick(item)}
    //     >
    //       {label}
    //     </Button>
    //   );
    // } else {
    //   return (
    //     <Text color={'#2C2C2C'} onClick={() => handleItemClick(item)} style={textStyle}>
    //       {label}
    //     </Text>
    //   );
    // }
  };

  return (
    <Flex direction='row' height='100%'>
      {/* Vertical Navbar */}
      <Box width='200px' color='white' height='100%' borderRight='3px solid #E10075'>
        <Stack direction='column' align='center' height='100%' justifyContent='space-between'>
          <Stack padding='8' alignItems='center'>
            <Image src={TParking} w={'6rem'} />
            <Stack marginTop={'2rem'} spacing={'1rem'}>
              {renderNavItem('dashboard', 'Dashboard')}
              {renderNavItem('map', 'Map')}
              {renderNavItem('booking', 'Booking')}
            </Stack>
          </Stack>

          <Stack w='100%'>
            <Divider borderColor='gray.300' my={4} gap='0' mb='0' />
            <Flex alignItems='center' justifyContent='space-between' p='1rem' pt='0'>
              <Flex alignItems='center'>
                <Avatar size='sm' name='John Doe' src='user_avatar_url.jpg' />
                <Text marginLeft={2} color={'#2C2C2C'} fontSize='0.75rem'>
                  John Doe
                </Text>
              </Flex>
              <Menu color='#2c2c2c'>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<IoEllipsisVertical />}
                  variant='ghost'
                />
                <MenuList>
                  <MenuItem
                    icon={<CiLogout color='red' fontSize='1.25rem' />}
                    color='#2c2c2c'
                    onClick={handleLogOut}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NavBar;
