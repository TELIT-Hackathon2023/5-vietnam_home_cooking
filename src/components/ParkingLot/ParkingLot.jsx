import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const ParkingLot = () => {
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
  const [parkingData, setParkingData] = useState(initialParkingData);

  let leftParkingSpots = parkingData.slice(0, 5);
  let rightParkingSpotsLeft = parkingData.slice(5, 10);
  let rightParkingSpotsRight = parkingData.slice(10);

  const getStatusColor = (status) => {
    switch (status) {
      case 'vacant':
        return '#E10075';
      case 'occupied':
        return '#2C2C2C';
      default:
        return '#2C2C2C';
    }
  };

  useEffect(() => {
    leftParkingSpots = parkingData.slice(0, 5);
    rightParkingSpotsLeft = parkingData.slice(5, 10);
    rightParkingSpotsRight = parkingData.slice(10);
    const updatedVacantSpots = parkingData.filter((spot) => spot.status === 'vacant').length;
    setVacantSpots(updatedVacantSpots);
  }, [parkingData]);

  return (
    <Flex className='parking-area' marginTop={'2rem'}>
      <Flex flexDirection='column'>
        {leftParkingSpots.map((slot) => (
          <Box
            key={slot.number}
            className={`park-area`}
            width={['100%', '100%', '40%']} // Adjust width as needed
            height={['5rem', '5rem', '5rem']}
            borderLeft='2px solid #ACACAC'
            borderTop='2px solid #ACACAC'
            display='flex'
            alignItems='center'
            justifyContent='center'
            marginRight={['0', '0', '2%']} // Adjust margin as needed
            marginLeft={['0', '0', '2%']} // Adjust margin as needed
            position='relative'
            color={'white'}
          >
            <Text zIndex={2}>{slot.number}</Text>
            <Box
              position='absolute'
              bottom='50%'
              right='50%'
              transform='translate(50%, 50%)'
              width='80%' // Adjust width as needed
              height='3rem'
              borderRadius='10px'
              backgroundColor={getStatusColor(slot.status)}
              zIndex={0}
            ></Box>
          </Box>
        ))}
      </Flex>

      <Flex flexDirection='column' alignItems='flex-end'>
        {rightParkingSpotsLeft.map((slot) => (
          <Box
            key={slot.number}
            className={`park-area`}
            width={['100%', '100%', '40%']} // Adjust width as needed
            height={['5rem', '5rem', '5rem']}
            borderRight='1px solid #ACACAC'
            borderTop='2px solid #ACACAC'
            display='flex'
            alignItems='center'
            justifyContent='center'
            position='relative'
            color={'white'}
          >
            <Text zIndex={2}>{slot.number}</Text>
            <Box
              position='absolute'
              bottom='50%'
              left='50%'
              transform='translate(-50%, 50%)'
              width='80%' // Adjust width as needed
              height='3rem'
              borderRadius='10px'
              backgroundColor={getStatusColor(slot.status)}
              zIndex={0}
            ></Box>
          </Box>
        ))}
      </Flex>

      <Flex flexDirection='column'>
        {rightParkingSpotsRight.map((slot) => (
          <Box
            key={slot.number}
            className={`park-area`}
            width={['100%', '100%', '40%']} // Adjust width as needed
            height={['5rem', '5rem', '5rem']}
            borderLeft='1px solid #ACACAC'
            borderTop='2px solid #ACACAC'
            display='flex'
            alignItems='center'
            justifyContent='center'
            position='relative'
            color={'white'}
          >
            <Text zIndex={2}>{slot.number}</Text>
            <Box
              position='absolute'
              bottom='50%'
              right='50%'
              transform='translate(50%, 50%)'
              width='80%' // Adjust width as needed
              height='3rem'
              borderRadius='10px'
              zIndex={0}
              backgroundColor={getStatusColor(slot.status)}
            ></Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ParkingLot;