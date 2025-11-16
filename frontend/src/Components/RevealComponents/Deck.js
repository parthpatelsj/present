import React, { useEffect, useState, useRef } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import revealOptions from './revealOptions';
import { useKirtanContext } from '../../useKirtanContext';
import socketIOClient from 'socket.io-client';
import 'reveal.js/dist/reveal.css';
import KirtanDropdown from '../KirtanSelector';
import BlinkingText from '../BlinkingText/BlinkingText';

const Deck = ({ children }) => {
  const { selectedKirtanIndex, setSelectedKirtanIndex } = useKirtanContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const socketRef = useRef(null);
  const revealInitialized = useRef(false);

  const handleChangeKirtan = (newIndex) => {
    setSelectedKirtanIndex(newIndex);
    setShowDropdown(false);
  };

  // Initialize socket connection once
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = socketIOClient(process.env.REACT_APP_BACKEND_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
      });

      socketRef.current.on('text', (data) => {
        setDisplayText(data.text);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      socketRef.current.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Initialize Reveal.js once when children are ready
  useEffect(() => {
    if (!revealInitialized.current && children) {
      const initReveal = () => {
        try {
          Reveal.initialize({
            ...revealOptions,
            plugins: [RevealNotes, RevealMarkdown],
          });
          revealInitialized.current = true;
        } catch (error) {
          console.error('Error initializing Reveal.js:', error);
        }
      };

      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(initReveal, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [children]);

  // Keyboard shortcut to toggle dropdown (K key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'k' || e.key === 'K') {
        setShowDropdown(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {showDropdown && <KirtanDropdown onClose={() => setShowDropdown(false)} />}
      <DropdownToggle onClick={() => setShowDropdown(prev => !prev)}>
        Select Kirtan (K)
      </DropdownToggle>
      <div className="reveal">
        <div className="slides">{children}</div>
        <Author>{displayText && <BlinkingText text={displayText} />}</Author>
      </div>
    </>
  );
};

const DropdownToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Author = styled.h6`
  position: fixed;
  bottom: 0;
  right: 20px;
  opacity: 0.5;
  color: white;
  font-size: 14px;
  margin: 20px;
`;

Deck.propTypes = {
  children: PropTypes.node,
};

export default Deck;
