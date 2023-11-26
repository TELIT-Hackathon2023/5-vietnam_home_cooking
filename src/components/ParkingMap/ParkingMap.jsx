import React, { useState, useRef } from 'react';
import ImgMapper from 'react-img-mapper';
import { Box, Text } from '@chakra-ui/react';
import ParkingLot from '../../assets/parking.svg';
import './ParkingMap.css';

const ParkingMap = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredArea, setHoveredArea] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const parentRef = useRef(null);

  // Example: Parking space data
  const parkingSpaceData = {
    Area1: {
      totalSpaces: 50,
      occupiedSpaces: 20,
      waiting: 5,
    },
    // Add more areas as needed
  };

  const areas = [
    {
      name: 'Area1',
      shape: 'poly',
      coords: [650, 120, 660, 160, 710, 145, 695, 105],
      preFillColor: 'rgba(28,236,38,0.38)',
      fillColor: 'rgba(210,4,217,0.6)',
      lineWidth: 1,
    },
    // Add more areas as needed
  ];

  const handleAreaClick = (areaName) => {
    console.log(`Clicked on area: ${areaName}`);
  };

  const handleMouseMove = (e) => {
    const rect = parentRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse is within the mapped area
    const isInside = areas.some((area) => {
      return ImgMapper.utils.pointInPolygon(mouseX, mouseY, area.coords);
    });

    if (isInside) {
      setHoveredArea(areas[0].name); // Assuming only one area for simplicity
    } else {
      setHoveredArea(null);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      // Middle mouse button (wheel) is clicked
      handleDown(e.clientX, e.clientY);
    }
  };

  const handleDown = (clientX, clientY) => {
    setIsDragging(true);
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleMove = (clientX, clientY) => {
    if (isDragging) {
      const deltaX = clientX - startPosition.x;
      const deltaY = clientY - startPosition.y;

      const newX = position.x + deltaX;
      const newY = position.y + deltaY;

      setPosition({ x: newX, y: newY });
      setStartPosition({ x: clientX, y: clientY });
    }
  };

  const handleUp = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    handleUp();
  };

  const handleWheelClick = (e) => {
    if (e.button === 1) {
      // Middle mouse button (wheel) is clicked
      e.preventDefault();
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleDown(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleUp();
  };

  return (
    <Box
      className='parking-box'
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      ref={parentRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheelClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
      }}
    >
      <Box
        className={'border-parking'}
        style={{
          position: 'relative',
          width: '100%',
          height: '90%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
      >
        <ImgMapper
          src={ParkingLot}
          map={{
            name: 'parking-map',
            areas: areas,
          }}
          width={1000}
          height={800}
          imgWidth={1000}
          imgHeight={800}
          onClick={(area, index, event) => handleAreaClick(area.name)}
        />
        {hoveredArea && (
          <Box
            position='absolute'
            bottom='10px'
            right='10px'
            bg='gray.700'
            color='white'
            p='2'
            borderRadius='md'
            zIndex='tooltip'
          >
            <Text>{`Area: ${hoveredArea}`}</Text>
            <Text>{`Total Spaces: ${parkingSpaceData[hoveredArea].totalSpaces}`}</Text>
            <Text>{`Occupied Spaces: ${parkingSpaceData[hoveredArea].occupiedSpaces}`}</Text>
            <Text>{`Waiting: ${parkingSpaceData[hoveredArea].waiting}`}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ParkingMap;
