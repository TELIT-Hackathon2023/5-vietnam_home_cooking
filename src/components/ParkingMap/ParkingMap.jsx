import React, {useState, useRef, useEffect} from 'react';
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
  Icon,
} from '@chakra-ui/react';
import { FaCar, FaChair, FaClock } from 'react-icons/fa';
import ParkingLot from '../../assets/parking.svg';
import './ParkingMap.css';
import axios from "axios";

const ParkingMap = ({ setCurrentPage }) => {
  const [highlightedSpot, setHighlightedSpot] = useState({
    x: 670,
    y: 113,
    width: 50,
    height: 50,
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState({
    occupied: 0,
    vacant: 15,
  });

  useEffect(() => {
    axios.get('https://telekomparking.website.tuke.sk/api/all-spots').then((res) => {
      const occupied = res.data.payload.filter((spot) => !spot.availability).length;
      setPopoverContent({
        occupied,vacant: 15-occupied,
      });
    });
  }, []);


  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  const handleSpotClick = () => {
    // Add your logic for handling the click on the highlighted spot
    // For example, you can navigate to another page using setCurrentPage
    setCurrentPage('booking'); // Replace 'desiredPage' with the actual page name or identifier
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
                    onClick={handleSpotClick} // Add onClick event handler
                ></Box>
            )}

            {/* Popover */}
            {popoverOpen && (
                <Popover
                    placement='top'
                    isOpen={popoverOpen}
                    onClose={handleMouseLeave}
                >
                  <PopoverTrigger>
                    <div
                        style={{
                          position: 'absolute',
                          top: `${highlightedSpot.y - 20}px`,
                          left: `${highlightedSpot.x + highlightedSpot.width / 2}px`,
                        }}
                    ></div>
                  </PopoverTrigger>
                  <PopoverContent zIndex={30}>
                    <PopoverArrow />
                    <PopoverBody>
                      <Text>
                        <Icon as={FaCar} color='blue.500' mr={2} />
                        Occupied: {popoverContent.occupied}
                      </Text>
                      <Text>
                        <Icon as={FaChair} color='green.500' mr={2} />
                        Vacant: {popoverContent.vacant}
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
