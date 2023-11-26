import React, { useState, useRef } from 'react';
import {
  Box,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { FaCar, FaChair, FaClock } from 'react-icons/fa'; // Chakra UI icon components
import ParkingLot from '../../assets/parking.svg';
import './ParkingMap.css';

const ParkingMap = () => {
  const [highlightedSpot, setHighlightedSpot] = useState({
    x: 670,
    y: 113,
    width: 50,
    height: 50,
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState({
    occupied: 5,
    vacant: 10,
    waiting: 2,
  });

  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        className='parking-box'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        style={{
          overflow: 'hidden',
        }}
      >
        <Box
          className={'border-parking'}
          style={{
            position: 'relative',
            width: '100%',
            height: '90%',
          }}
        >
          {/* SVG Image */}
          <Image src={ParkingLot} ref={imageRef} />

          {/* Highlighted Spot Overlay */}
          {highlightedSpot && (
            <Box
              className='highlight-overlay'
              zIndex={25}
              hover={{
                backgroundColor: 'rgb(45,49,45)', // Color on hover
              }}
              style={{
                position: 'absolute',
                top: `${highlightedSpot.y}px`,
                left: `${highlightedSpot.x}px`,
                width: `${highlightedSpot.width}px`,
                height: `${highlightedSpot.height}px`,
                backgroundColor: 'rgba(141, 255, 114, 0.86)', // Initial color
                transform: `rotate(-17deg)`,
                transition: 'background-color 0.3s ease', // Smooth transition
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            ></Box>
          )}

          {/* Popover */}
          {popoverOpen && (
            <Popover
              placement='right'
              offset={[0, 10]}
              isOpen={popoverOpen}
              onClose={handleMouseLeave}
            >
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Spot Information</PopoverHeader>
                <PopoverBody>
                  <Text>
                    <Icon as={FaCar} color='blue.500' mr={2} />
                    Occupied: {popoverContent.occupied}
                  </Text>
                  <Text>
                    <Icon as={FaChair} color='green.500' mr={2} />
                    Vacant: {popoverContent.vacant}
                  </Text>
                  <Text>
                    <Icon as={FaClock} color='orange.500' mr={2} />
                    Waiting: {popoverContent.waiting}
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ParkingMap;
