// KirtanContext.js
import React, { createContext, useContext, useState } from 'react';

const KirtanContext = createContext();

export const KirtanProvider = ({ children }) => {
  const [selectedKirtanIndex, setSelectedKirtanIndex] = useState(0);
  const [availableKirtans, setAvailableKirtans] = useState([]);

  // Other context-related logic...

  const contextValue = {
    selectedKirtanIndex,
    setSelectedKirtanIndex,
    availableKirtans,
    setAvailableKirtans,
  };

  return (
    <KirtanContext.Provider value={contextValue}>
      {children}
    </KirtanContext.Provider>
  );
};

export const useKirtanContext = () => {
  return useContext(KirtanContext);
};
