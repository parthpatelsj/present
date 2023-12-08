import React, { useEffect, useState } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import revealOptions from './revealOptions';
import { KirtanProvider, useKirtanContext } from '../../useKirtanContext';
import socketIOClient from 'socket.io-client';
import 'reveal.js/dist/reveal.css';
import KirtanDropdown from '../KirtanSelector';
import BlinkingText from '../BlinkingText/BlinkingText';

const Deck = ({ children }) => {
  const { selectedKirtanIndex, setSelectedKirtanIndex } = useKirtanContext();
  const [showDropdown, setShowDropdown] = useState(true);
  const [displayText, setDisplayText] = useState('');

  const handleChangeKirtan = (newIndex) => {
    setSelectedKirtanIndex(newIndex);
    setShowDropdown(false); // Hide the dropdown after changing the kirtan
  };

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

    socket.on('text', (data) => {
      setDisplayText(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Initialize Reveal after a delay of 2 seconds
    const timeoutId = setTimeout(() => {
      Reveal.initialize({
        ...revealOptions,
        plugins: [RevealNotes, RevealMarkdown],
      });
    }, 2000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {showDropdown && <KirtanDropdown />}
      <div className="reveal">
        <div className="slides">{children}</div>
        <Author>{displayText && <BlinkingText text={displayText} />}</Author>
      </div>
    </>
  );
};

const Author = styled.h6`
  position: fixed;
  bottom: 0;
  right: 20px;
  opacity: 0.5;
`;

Deck.propTypes = {
  children: PropTypes.node,
};

export default Deck;
