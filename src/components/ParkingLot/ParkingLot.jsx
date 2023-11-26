import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Button, Stack, Spinner, Container } from '@chakra-ui/react';
import './ParkingLot.css';
import axios from 'axios';

const ParkingLot = ({ showFree }) => {
  const initialParkingData = [
    { number: 1, status: 'vacant' },
    { number: 2, status: 'vacant' },
    { number: 3, status: 'reserved' },
    { number: 4, status: 'vacant' },
    { number: 5, status: 'vacant' },
    { number: 6, status: 'occupied' },
    { number: 7, status: 'reserved' },
    { number: 8, status: 'vacant' },
    { number: 9, status: 'occupied' },
    { number: 10, status: 'reserved' },
    { number: 11, status: 'vacant' },
    { number: 12, status: 'reserved' },
    { number: 13, status: 'vacant' },
    { number: 14, status: 'occupied' },
    { number: 15, status: 'vacant' },
  ];

  const [vacantSpots, setVacantSpots] = useState(0);
  const [parkingData, setParkingData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    axios.get('https://telekomparking.website.tuke.sk/api/all-spots').then((res) => {
      setIsLoadingData(false);
      setParkingData(res.data.payload);
      setVacantSpots(res.data.payload.filter((spot) => spot.availability).length);
    });
  }, []);

  let leftParkingSpots = parkingData.slice(0, 5);
  let rightParkingSpotsLeft = parkingData.slice(5, 10);
  let rightParkingSpotsRight = parkingData.slice(10);

  const getStatusColor = (status) => {
    if (status) return '#E10075';
    else return '#2C2C2C';

    // switch (status) {
    //   case 'vacant':
    //     return '#E10075';
    //   case 'occupied':
    //     return '#2C2C2C';
    //   default:
    //     return '#2C2C2C';
    // }
  };

  // useEffect(() => {
  //   leftParkingSpots = parkingData.slice(0, 5);
  //   rightParkingSpotsLeft = parkingData.slice(5, 10);
  //   rightParkingSpotsRight = parkingData.slice(10);
  //   const updatedVacantSpots = parkingData.filter((spot) => spot.status === 'vacant').length;
  //   setVacantSpots(updatedVacantSpots);
  // }, [parkingData]);

  const handleCreateBooking = () => {
    // Add logic to handle the creation of a booking
    console.log('Creating booking...');
  };

  return (
    <Container className='parking-lot-container'>
      {isLoadingData ? (
        <Spinner size='xl' />
      ) : (
        <>
          <Flex
            className='parking-area'
            marginTop={'1rem'}
            position='relative'
            justifyContent='center'
          >
            <Flex flexDirection='column'>
              {leftParkingSpots.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '5rem']} // Adjust width as needed
                  height={['3rem', '3rem', '3rem']}
                  borderLeft='2px solid #ACACAC'
                  borderTop='2px solid #ACACAC'
                  borderBottom={index === leftParkingSpots.length - 1 ? '2px solid #ACACAC' : ''}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  marginBottom={['2%', '2%', '2%']} // Adjust margin as needed
                  position='relative'
                  color={'white'}
                >
                  <Box
                    className='parking-spot'
                    position='absolute'
                    bottom='50%'
                    right='50%'
                    transform='translate(50%, 50%)'
                    width='80%' // Adjust width as needed
                    height='2rem'
                    borderRadius='10px'
                    backgroundColor={getStatusColor(spot.availability)}
                    zIndex={0}
                  >
                    {spot.spotNumber}
                  </Box>
                </Box>
              ))}
            </Flex>

            <Flex flexDirection='column' alignItems='flex-end' marginLeft={'4rem'}>
              {rightParkingSpotsLeft.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '5rem']} // Adjust width as needed
                  height={['3rem', '3rem', '3rem']}
                  borderRight='1px solid #ACACAC'
                  borderTop='2px solid #ACACAC'
                  borderBottom={
                    index === rightParkingSpotsLeft.length - 1 ? '2px solid #ACACAC' : ''
                  }
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  position='relative'
                  color={'white'}
                >
                  <Box
                    className='parking-spot'
                    position='absolute'
                    bottom='50%'
                    left='50%'
                    transform='translate(-50%, 50%)'
                    width='80%' // Adjust width as needed
                    height='2rem'
                    borderRadius='10px'
                    backgroundColor={getStatusColor(spot.availability)}
                    zIndex={0}
                  >
                    {spot.spotNumber}
                  </Box>
                </Box>
              ))}
            </Flex>

            <Flex flexDirection='column'>
              {rightParkingSpotsRight.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '5rem']} // Adjust width as needed
                  height={['3rem', '3rem', '3rem']}
                  borderLeft='1px solid #ACACAC'
                  borderTop='2px solid #ACACAC'
                  borderBottom={
                    index === rightParkingSpotsRight.length - 1 ? '2px solid #ACACAC' : ''
                  }
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  position='relative'
                  color={'white'}
                >
                  <Box
                    className='parking-spot'
                    position='absolute'
                    bottom='50%'
                    right='50%'
                    transform='translate(50%, 50%)'
                    width='80%' // Adjust width as needed
                    height='2rem'
                    borderRadius='10px'
                    zIndex={0}
                    backgroundColor={getStatusColor(spot.availability)}
                  >
                    {spot.spotNumber}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Flex>
          <Stack
            direction={'row'}
            marginTop={'2%'}
            align={'baseline'}
            display={showFree ? 'flex' : 'none'}
          >
            {/* Display the number of available spots */}
            <Text fontSize='3xl' color={'#E10075'}>
              {vacantSpots}
            </Text>
            <Text fontSize='md'>{`free slots currently`}</Text>

            {/* Create Booking Button */}
            <Button
              variant={'outline'}
              color={'#E10075'}
              bgColor={''}
              outlineColor={'#E10075'}
              onClick={handleCreateBooking}
            >
              Create Booking
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default ParkingLot;
