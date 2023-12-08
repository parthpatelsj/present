// TitleSlide.js

import React, { useEffect, useState } from 'react';
import Slide from '../Components/RevealComponents/Slide';
import Note from '../Components/Notes/note';
import socketIOClient from 'socket.io-client';
import BlinkingText from '../Components/BlinkingText/BlinkingText';
import VideoBackground from '../Components/VideoBackground';

const TitleSlide = () => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

    socket.on('text', (data) => {
      setDisplayText(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <VideoBackground /> {/* Add the VideoBackground component */}
      <Slide>
        <div id="logo-container">
          <img src="logo.png" alt="Logo" />
        </div>
        {displayText && <BlinkingText text={displayText} />} {/* Use the BlinkingText component */}

      </Slide>
    </>
  );
};

export default TitleSlide;
