// BlinkingText.js

import React, { useState, useEffect } from 'react';
import './BlinkingText.css';

const BlinkingText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <div className={`blinking-text ${isVisible ? 'visible' : 'hidden'}`}>{text}</div>;
};

export default BlinkingText;
