import React, { useState } from 'react';
import { Box, HStack, Image, Table, Tbody, Td, Tr, Text, Button, useToast } from '@chakra-ui/react';
import { useUserContext } from '../../hooks/UserContext.jsx';
import axios from 'axios';

const YourVehicles = () => {
    const { setUserData, userData } = useUserContext();
    const toast = useToast();

    const onSubmit = (plateNumber) => {
        axios
            .post(
                'https://telekomparking.website.tuke.sk/api/delete-car',
                { userId: userData.id, plateNumber },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                }
            )
            .then(() => {
                toast({
                    title: `Vehicle ${plateNumber} removed`,
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                });
                setUserData({...userData, vehicles: userData.vehicles.filter(vehicle =>  vehicle.plateNumber !== plateNumber)})
            });
    };

    return (
        <>
            <Table variant='simple' colorScheme='whiteAlpha'>
                <Tbody>
                    {userData.vehicles.map((vehicle) => {
                        const imgPath = '/src/assets/brands/' + vehicle.carBrand + '.png';
                        console.log(imgPath);

                        return (
                            <Tr key={vehicle.plateNumber}>
                                <Td borderBottom='1px solid' borderColor='gray.200'>
                                    <HStack>
                                        <Image src={imgPath} w='2rem' h='2rem' />
                                        <Text>{vehicle.carBrand}</Text>
                                    </HStack>
                                </Td>
                                <Td borderBottom='1px solid' borderColor='gray.200'>
                                    {vehicle.plateNumber}
                                </Td>
                                <Td borderBottom='1px solid' borderColor='gray.200'>
                                    <Button onClick={() => onSubmit(vehicle.plateNumber)}>Remove</Button>
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
