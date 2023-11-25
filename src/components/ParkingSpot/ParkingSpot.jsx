import React, { useState } from 'react';
import './ParkingSpot.css';

const ParkingSpot = ({ spotData }) => {
  return <div className={`parking-slot ${getStatusColor()}`}>{spotData.number}</div>;
};

export default ParkingSpot;
