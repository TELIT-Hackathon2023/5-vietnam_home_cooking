import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spinner, VStack, Text, Container } from '@chakra-ui/react';

const OccupiedPopoverBody = ({ spotNumber }) => {
  const [spotData, setSpotData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://telekomparking.website.tuke.sk/api/reservation-by-spot-number/' + spotNumber)
      .then((res) => {
        console.log(res);
        setSpotData(res.data.payload);
        setLoading(false);
      });
  }, []);

  return (
    <Container display='flex' justifyContent={loading ? 'center' : 'flex-start'}>
      {loading ? (
        <Spinner size='sm' />
      ) : (
        <VStack alignItems='flex-start'>
          <Text>{spotData.licensePlate}</Text>
          <Text>From: {spotData.from}</Text>
          <Text>To: {spotData.surname}</Text>
        </VStack>
      )}
    </Container>
  );
};

export default OccupiedPopoverBody;
