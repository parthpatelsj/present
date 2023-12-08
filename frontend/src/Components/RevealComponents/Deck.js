import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import revealOptions from './revealOptions';
import { KirtanProvider, useKirtanContext } from '../../useKirtanContext';
import 'reveal.js/dist/reveal.css';
import KirtanDropdown from '../KirtanSelector';


const Deck = ({ children }) => {
  const { selectedKirtanIndex, setSelectedKirtanIndex } = useKirtanContext();

  const handleChangeKirtan = (newIndex) => {
    // Change the selected kirtan index
    setSelectedKirtanIndex(newIndex);
  };

  useEffect(() => {
    Reveal.initialize({
      ...revealOptions,
      plugins: [RevealNotes, RevealMarkdown],
    });
  });
  return (
    <>
    <KirtanDropdown />  
    <div className="reveal">
      <div className="slides">{children}</div>
      {/* <Author>@parthpatelsj</Author> */}
    </div>
    </>
  );
};

const Author = styled.h6`
  position: fixed;
  bottom: 0;
  left: 20px;
`;

Deck.propTypes = {
  children: PropTypes.node,
};

export default Deck;
