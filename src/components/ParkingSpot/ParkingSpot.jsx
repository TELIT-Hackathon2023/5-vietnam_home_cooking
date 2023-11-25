import React, { useState } from 'react';
import './ParkingSpot.css';

const ParkingSpot = ({ spotData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`spot ${isHovered ? 'hovered' : ''} ${spotData.occupation ? 'taken' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className='parking-spot-info'>
          <p>Spot ID: {spotData.id}</p>
          <p>ECV: {spotData.id}</p>
        </div>
      )}
    </div>
  );
};

export default ParkingSpot;
