import React, { useState } from 'react';
import Parking from '../../components/Parking/Parking.jsx';
import { Box, VStack, Text, Stack, Heading, Grid } from '@chakra-ui/react';
import TParking from '../../assets/tparking.svg';
import { Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const ParkingSite = () => {
  return (
    <Box>
      <Stack direction='row' className='page'>
        {/* Navbar on the left */}
        <Box
          position='absolute'
          height='100vh'
          width='12rem'
          bg='white'
          color='#2e2e2e'
          borderRight='3px solid #f2007c'
        >
          <VStack
            spacing='5'
            alignItems='space between'
            paddingLeft={'6'}
            paddingRight={'6'}
            justifyContent={'center'}
            paddingTop='8'
          >
            <Image src={TParking} boxSize='100px' marginBottom />
            <Button
              className='buttons'
              bg='#f2007c'
              variant='solid'
              size='md'
              color='#FFFFFF'
              _hover={{ backgroundColor: '#8a094b' }}
            >
              Dashboard
            </Button>
            <Text>Map</Text>
            <Text>My bookings</Text>
            <Text align='left'>Waiting list</Text>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box marginLeft='12rem' width='100%' height='100vh'>
          <Grid templateColumns='repeat(2, 1fr)' gap={8} p={7} height='100vh'>
            {/* Two big boxes stacked vertically */}
            <VStack spacing={6}>
              <Box border='3px solid #2e2e2e' height='40%' width='100%' borderRadius='8px' p={6}>
                <Heading size='md'>Currently booked</Heading>
              </Box>
              <Box border='3px solid #2e2e2e' height='60%' width='100%' borderRadius='8px' p={6}>
                <Heading as={'h1'} size='md'>
                  Telecom parking slots
                </Heading>
              </Box>
            </VStack>

            {/* Three smaller boxes stacked vertically */}
            <VStack spacing={6} alignItems='flex-start'>
              <Box border='3px solid #2e2e2e' height='20%' width='100%' borderRadius='8px' p={6}>
                <Heading size='md'>Your vehicles</Heading>
              </Box>
              <Box border='3px solid #2e2e2e' height='30%' width='100%' borderRadius='8px' p={6}>
                <Heading size='md'>Calendar</Heading>
              </Box>
              <Box border='3px solid #2e2e2e' height='50%' width='100%' borderRadius='8px' p={6}>
                <Heading size='md'>Waiting list</Heading>
              </Box>
            </VStack>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default ParkingSite;
