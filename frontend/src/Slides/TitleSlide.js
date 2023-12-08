import React, { useEffect, useState } from 'react';
import Slide from '../Components/RevealComponents/Slide';
import Note from '../Components/Notes/note';
import socketIOClient from 'socket.io-client';

const TitleSlide = () => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    // Update the URL to point to your Heroku backend
    const socket = socketIOClient('https://desolate-fjord-44229-7200a2be3131.herokuapp.com/');

    socket.on('text', (data) => {
      setDisplayText(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Slide>
      <h2>Building talks with Reveal.js (with React)</h2>
      <p>Parth Patel</p>
      {displayText && <p>{displayText}</p>}
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
