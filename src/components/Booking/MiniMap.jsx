import React from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';

const MiniMap = () => {
  return (
    <Grid p='4' templateRows='repeat(5, 0.5fr)' templateColumns='repeat(7, 1fr)' gap={0}>
      <GridItem colSpan={2} borderColor='#ACACAC' borderWidth='1px' p='0.5rem'>
        <Box as='button' h='2.375rem' fontSize='1rem'>
          Car
        </Box>
      </GridItem>
      <GridItem colSpan={1} p='0.5rem' />
      <GridItem colSpan={2} borderColor='#ACACAC' borderWidth='1px' p='0.5rem'>
        <Box as='button' h='2.375rem' fontSize='1rem'>
          Car
        </Box>
      </GridItem>
      <GridItem colSpan={2} borderColor='#ACACAC' borderWidth='1px' p='0.5rem'>
        <Box as='button' h='2.375rem' fontSize='1rem'>
          Car
        </Box>
      </GridItem>
    </Grid>
  );
};

export default MiniMap;
