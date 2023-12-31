import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Spinner,
  Container,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Popover,
  VStack,
  HStack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Modal,
  useDisclosure,
} from '@chakra-ui/react';
import './ParkingLot.css';
import axios from 'axios';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useUserContext } from '../../hooks/UserContext.jsx';
import OccupiedPopoverBody from './OccupiedPopoverBody.jsx';
import BookSpotButton from './BookSpotButton.jsx';

const ParkingLot = ({ showFree }) => {
  const [vacantSpots, setVacantSpots] = useState(0);
  const [parkingData, setParkingData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { userData } = useUserContext();

  const refreshData = () => {
    axios.get('https://telekomparking.website.tuke.sk/api/all-spots').then((res) => {
      setIsLoadingData(false);
      setParkingData(res.data.payload);
      console.log(res.data.payload);
      setVacantSpots(res.data.payload.filter((spot) => spot.availability).length);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  let leftParkingSpots = parkingData.slice(0, 5);
  let rightParkingSpotsLeft = parkingData.slice(5, 10);
  let rightParkingSpotsRight = parkingData.slice(10);

  const getStatusColor = (status) => {
    if (status) return '#E10075';
    else return '#2C2C2C';
  };

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
          <Flex className='parking-area' position='relative' justifyContent='center'>
            <Flex flexDirection='column'>
              {leftParkingSpots.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '6rem']} // Adjust width as needed
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
                  <Popover placement='top'>
                    <PopoverTrigger>
                      <Box
                        as='button'
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
                    </PopoverTrigger>
                    <PopoverContent color='#2C2C2C' borderWidth='2px'>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        <HStack>
                          {spot.availability ? (
                            <CheckIcon color='#32D560' />
                          ) : (
                            <CloseIcon color='#E83434' />
                          )}
                          <Text>{spot.availability ? 'Free' : 'Occupied'}</Text>
                        </HStack>
                      </PopoverHeader>
                      <PopoverBody>
                        {spot.availability ? (
                          <BookSpotButton spotNumber={spot.spotNumber} refreshData={refreshData} />
                        ) : (
                          <OccupiedPopoverBody spotNumber={spot.spotNumber} />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              ))}
            </Flex>

            <Flex flexDirection='column' alignItems='flex-end' marginLeft={'4rem'}>
              {rightParkingSpotsLeft.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '6rem']} // Adjust width as needed
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
                  <Popover placement='top'>
                    <PopoverTrigger>
                      <Box
                        as='button'
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
                    </PopoverTrigger>
                    <PopoverContent color='#2C2C2C' borderWidth='2px'>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        <HStack>
                          {spot.availability ? (
                            <CheckIcon color='#32D560' />
                          ) : (
                            <CloseIcon color='#E83434' />
                          )}
                          <Text>{spot.availability ? 'Free' : 'Occupied'}</Text>
                        </HStack>
                      </PopoverHeader>
                      <PopoverBody>
                        {spot.availability ? (
                          <BookSpotButton spotNumber={spot.spotNumber} refreshData={refreshData} />
                        ) : (
                          <OccupiedPopoverBody spotNumber={spot.spotNumber} />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              ))}
            </Flex>

            <Flex flexDirection='column'>
              {rightParkingSpotsRight.map((spot, index) => (
                <Box
                  key={spot.spotNumber}
                  className={`park-area`}
                  width={['100%', '100%', '6rem']} // Adjust width as needed
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
                  <Popover placement='top'>
                    <PopoverTrigger>
                      <Box
                        as='button'
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
                    </PopoverTrigger>
                    <PopoverContent color='#2C2C2C' borderWidth='2px'>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        <HStack>
                          {spot.availability ? (
                            <CheckIcon color='#32D560' />
                          ) : (
                            <CloseIcon color='#E83434' />
                          )}
                          <Text>{spot.availability ? 'Free' : 'Occupied'}</Text>
                        </HStack>
                      </PopoverHeader>
                      <PopoverBody>
                        {spot.availability ? (
                          <BookSpotButton spotNumber={spot.spotNumber} refreshData={refreshData} />
                        ) : (
                          <OccupiedPopoverBody spotNumber={spot.spotNumber} />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
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
