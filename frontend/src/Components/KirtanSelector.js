// KirtanSelector.js

import React, { useState, useEffect } from 'react';

const KirtanSelector = ({ onSelectKirtan }) => {
  const [availableKirtans, setAvailableKirtans] = useState([]);

  // Function to fetch the list of available kirtans
  const fetchAvailableKirtans = async () => {
    try {
      const response = await fetch('/kirtans/kirtanList.json');
      const kirtanList = await response.json();
      setAvailableKirtans(kirtanList.map((kirtan) => kirtan.title));
    } catch (error) {
      console.error('Error fetching available kirtans:', error.message);
      console.log('Response content:', error.response && (await error.response.text()));
    }
  };

  // Use useEffect to fetch available kirtans when the component mounts
  useEffect(() => {
    fetchAvailableKirtans();
  }, []);

  return (
    <select
      onChange={(e) => onSelectKirtan(e.target.value)}
    >
      <option value="" disabled>Select a kirtan</option>
      {availableKirtans.map((kirtan) => (
        <option key={kirtan} value={kirtan}>
          {kirtan}
        </option>
      ))}
    </select>
  );
};

export default KirtanSelector;
