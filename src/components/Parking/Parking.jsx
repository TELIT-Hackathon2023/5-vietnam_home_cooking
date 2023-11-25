import React from 'react';
import ImgMapper from 'react-img-mapper';
import { Box } from '@chakra-ui/react';
import ParkingLot from '../../assets/parking.svg';
import './Parking.css';

const Parking = () => {
  const areas = [
    {
      name: 'Area1',
      shape: 'poly',
      // Ensure these coordinates are within the boundaries of your image
      coords: [493, 72, 463, 80, 472, 108, 500, 100],
      preFillColor: 'rgba(28,236,38,0.38)',
      fillColor: 'rgba(210,4,217,0.6)',
      lineWidth: 1,
      onClick: () => handleAreaClick('Area1'),
    },
  ];

  return (
    <Box
      className='parking-box'
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh' // Set the height to full viewport height
    >
      <Box
        className={'border-parking'}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px', // Set a maximum width if needed
          height: '80%', // Set a percentage-based heigh
        }}
      >
        <ImgMapper
          src={ParkingLot}
          map={{
            name: 'parking-map',
            areas: areas,
          }}
          width={800}
          height={600}
          imgWidth={800} // Set the actual width of your image
          imgHeight={600}
          onClick={(area, index, event) => handleAreaClick(area.name)}
          onTouchStart={(area, index, event) => handleAreaClick(area.name)}
        />
      </Box>
    </Box>
  );
};

export default Parking;
