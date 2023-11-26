import React, { useEffect } from 'react';
import { Box, HStack, Image, Table, Tbody, Td, Tr, Text } from '@chakra-ui/react';
import { useUserContext } from '../../hooks/UserContext.jsx';

const YourVehicles = () => {
  const { userData } = useUserContext();

  return (
    <>
      <Table variant='simple' colorScheme='whiteAlpha'>
        <Tbody>
          {userData.vehicles.map((vehicle) => {
            const imgPath = '/src/assets/brands/' + vehicle.carBrand + '.png';
            console.log(imgPath);

            return (
              <Tr>
                <Td borderBottom='1px solid' borderColor='gray.200'>
                  <HStack>
                    <Image src={imgPath} w='2rem' h='2rem' />
                    <Text>{vehicle.carBrand}</Text>
                  </HStack>
                </Td>
                <Td borderBottom='1px solid' borderColor='gray.200'>
                  {vehicle.plateNumber}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default YourVehicles;
