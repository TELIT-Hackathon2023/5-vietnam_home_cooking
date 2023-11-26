import React from 'react';
import { Button, Container, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import MyBookings from './MyBookings.jsx';
import ParkingLot from '../ParkingLot/ParkingLot.jsx';

const Booking = () => {
  return (
    <Stack h='100%'>
      <Text fontSize='1.25rem' fontWeight='500' m='0' p='4' pt='8'>
        Booking
      </Text>
      <Grid h='100%' p='4' templateRows='repeat(2, 1fr)' templateColumns='repeat(4, 1fr)' gap={4}>
        <GridItem colSpan={2} />
        <GridItem colSpan={2}>
          <ParkingLot showFree={false} />
        </GridItem>
        <GridItem colSpan={3} borderColor='#ACACAC' borderWidth='1px' borderRadius='0.5rem'>
          <MyBookings />
        </GridItem>
        <GridItem colSpan={1} bg='tomato' />
      </Grid>
    </Stack>
  );
};

export default Booking;
