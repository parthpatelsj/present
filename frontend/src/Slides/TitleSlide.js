import React, { useEffect, useState } from 'react';
import Slide from '../Components/RevealComponents/Slide';
import Note from '../Components/Notes/note';
import socketIOClient from 'socket.io-client';
import BlinkingText from '../Components/BlinkingText/BlinkingText';

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
    <Slide>
      <div id="logo-container">
        <img src="logo.png" alt="Logo" />
      </div>
      {displayText && <BlinkingText text={displayText} />} {/* Use the BlinkingText component */}
      <Note>
        <ul>
          {/* Other static content */}
          <li>Hi all</li>
          <li>Intro: Spotify, platform</li>
          <li>This talk is about</li>
          <li>I'm not affiliated or an expert, just love the web</li>
          <li>Questions</li>
        </ul>
      </Note>
    </Slide>
  );
};

export default TitleSlide;
