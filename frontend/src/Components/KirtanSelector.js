// KirtanDropdown.js
import React from 'react';
import { useKirtanContext } from '../useKirtanContext';

const KirtanDropdown = () => {
  const { selectedKirtanIndex, setSelectedKirtanIndex, availableKirtans } = useKirtanContext();

  const handleChange = (event) => {
    const newIndex = event.target.value;
    setSelectedKirtanIndex(newIndex);
  };

  return (
    <select value={selectedKirtanIndex} onChange={handleChange}>
      {availableKirtans.map((kirtan, index) => (
        <option key={index} value={index}>
          {kirtan}
        </option>
      ))}
    </select>
  );
};

export default KirtanDropdown;
