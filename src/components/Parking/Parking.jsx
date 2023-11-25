import React, { useState } from 'react';
import ImgMapper from 'react-img-mapper';
import { Box, Button } from '@chakra-ui/react';
import ParkingSpot from '../ParkingSpot/ParkingSpot.jsx';
import ParkingLot from '../../assets/parking.jpg';
import './Parking.css';

const Parking = () => {
  const areas = [
    {
      name: 'Area1',
      shape: 'poly',
      coords: [500, 50, 450, 100, 500, 150, 450, 150],
      preFillColor: 'rgba(28,236,38,0.38)',
      fillColor: 'rgba(210,4,217,0.6)',
      lineWidth: 1,
      onClick: () => handleAreaClick('Area1'),
    },
  ];

  return (
    <Box className={'parking-box'} display='flex' alignItems='center' justifyContent='center'>
      <Box
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <ImgMapper
          src={ParkingLot}
          map={{
            name: 'parking-map',
            areas: areas,
          }}
          width={800} // Set the width of your image
          height={600} // Set the height of your image
          imgWidth={800} // Set the width of your image
          imgHeight={600} // Set the height of your image
          onClick={(area, index, event) => handleAreaClick(area.name)}
          onTouchStart={(area, index, event) => handleAreaClick(area.name)}
        />
      </Box>
    </Box>
  );
};

export default Parking;
