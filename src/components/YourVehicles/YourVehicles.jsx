import React, { useEffect } from 'react';
import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useUserContext } from '../../hooks/UserContext.jsx';

const YourVehicles = () => {
  const { userData } = useUserContext();

  return (
    <Table variant='simple' colorScheme='whiteAlpha'>
      <Tbody>
        {userData.vehicles.map((vehicle) => (
          <Tr>
            <Td borderBottom='1px solid' borderColor='gray.200'>
              {vehicle.carBrand}
            </Td>
            <Td borderBottom='1px solid' borderColor='gray.200'>
              {vehicle.plateNumber}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default YourVehicles;
