import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Spacer,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalFooter,
  FormControl, FormLabel, Input, FormHelperText, useToast,
} from '@chakra-ui/react';
import './Dashboard.css';
import ParkingLot from '../ParkingLot/ParkingLot.jsx';
import YourVehicles from '../YourVehicles/YourVehicles.jsx';
import axios from "axios";
import {useUserContext} from "../../hooks/UserContext.jsx";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ vehicleRegistration, setVehicleRegistration] = useState("");
  const { setUserData ,userData } = useUserContext();
  const toast = useToast();
  const vehicles = async () => {
    await axios
        .get('https://telekomparking.website.tuke.sk/api/employee-cars/' + userData.id)
        .then((res) => setUserData({...userData, vehicles: res.data.payload}));
  }

  const onSubmit = function () {
    axios
        .post('https://telekomparking.website.tuke.sk/api/register-car', {"userId": userData.id, "plateNumber": vehicleRegistration }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then( () => {
      toast({
        title: `Vehicle ${vehicleRegistration} registered`,
        status: "info",
        duration: 9000,
        isClosable: true,
      });
          onClose();
          vehicles();



        })

  }

  return (
    <Flex direction={['column', 'column', 'row']} height='100%'>
      {/* Left side with 2 big boxes */}
      <Flex
        direction='column'
        width={['100%', '100%', '50%']}
        padding={['4', '4', '4']}
        color='black'
        gap={'1.5rem'}
      >
        <Box
          height={['200px', '200px', '60%']}
          marginBottom={['4', '4', '0']}
          borderRadius='md'
          border={'3px solid #ACACAC'}
          padding={'1rem'}
        >
          <Heading size='md' fontWeight={500}>
            Currently booked
          </Heading>

          <Table variant='simple' colorScheme='whiteAlpha' align={'center'}>
            <Tbody>
              {/* Add your table rows here */}
              <Tr>
                <Td
                  borderBottom='1px solid'
                  borderColor='gray.200'
                  padding={'1rem 0 0 0 !important'}
                >
                  12:00 PM
                </Td>
                <Td
                  borderBottom='1px solid'
                  borderColor='gray.200'
                  padding={'1rem 0 0 0 !important'}
                >
                  2023-11-25
                </Td>
                <Td
                  borderBottom='1px solid'
                  borderColor='gray.200'
                  padding={'1rem 0 0 0 !important'}
                >
                  1
                </Td>
                <Td
                  borderBottom='1px solid'
                  borderColor='gray.200'
                  padding={'1rem 0 0 0 !important'}
                >
                  ABC 123
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Button
            variant={'outline'}
            color={'#E10075'}
            bgColor={''}
            outlineColor={'#E10075'}
            marginTop={'15%'}
          >
            Go to my bookings
          </Button>
        </Box>
        {/* Second big box */}
        <Box
          height={['200px', '200px', '100%']}
          borderRadius='md'
          border={'3px solid #ACACAC'}
          padding={'1rem'}
        >
          <Heading size='md' fontWeight={500}>
            Telecom parking slots
          </Heading>
          <ParkingLot showFree={true} />
        </Box>
      </Flex>

      {/* Right side with 3 boxes */}
      <Flex
        width={['100%', '100%', '50%']}
        padding={['4', '4', '4']}
        direction='column'
        gap={'0.5rem'}
      >
        {/* First box on the right */}
        <Box
          height={['200px', '200px', '70%']}
          borderRadius='md'
          mb={['4', '4', '4']}
          border={'3px solid #ACACAC'}
          padding={'1rem'}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Heading size='md' fontWeight={500}>
              Your vehicles
            </Heading>
            <Spacer />
            <Box>
              <Text
                  fontWeight={600}
                  color={'#E10075'}
                  cursor={'pointer'}
                  onClick={onOpen}
              >
                Add
              </Text>
            </Box>
          </Stack>
          <Box borderColor='gray.200' marginY='1rem' />
          <YourVehicles />
        </Box>
        {/* Second box on the right */}
        <Box
          height={['200px', '200px', '100%']}
          borderRadius='md'
          mb={['4', '4', '4']}
          border={'3px solid #ACACAC'}
          padding={'1rem'}
        >
          {/* Content for the second box on the right */}
          <Heading size='md' fontWeight={500}>
            Calendar
          </Heading>
        </Box>
        {/* Third box on the right */}
        <Box
          height={['200px', '200px', '80%']}
          borderRadius='md'
          border={'3px solid #ACACAC'}
          padding={'1rem'}
        >
          {/* Content for the third box on the right */}
          <Heading size='md' fontWeight={500}>
            Waiting list
          </Heading>
          <Button
            variant={'outline'}
            color={'#E10075'}
            bgColor={''}
            outlineColor={'#E10075'}
            marginTop={'15%'}
          >
            Go to waiting list
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add vehicle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Licence plate number</FormLabel>
              <Input type="text" onChange={(event) => {
                setVehicleRegistration(event.target.value);
              }} />
            </FormControl>
          </ModalBody>
          <ModalFooter >
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="pink" onClick={onSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Dashboard;
