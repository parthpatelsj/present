import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setIsVisible(prev => !prev);
      }
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Overlay onClick={() => setIsVisible(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>⌨️ Keyboard Shortcuts</Title>
          <CloseButton onClick={() => setIsVisible(false)}>✕</CloseButton>
        </Header>

        <ShortcutsGrid>
          <Section>
            <SectionTitle>Navigation</SectionTitle>
            <Shortcut>
              <Keys>
                <Key>→</Key> / <Key>Space</Key>
              </Keys>
              <Description>Next slide</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>←</Key>
              </Keys>
              <Description>Previous slide</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>↑</Key> / <Key>↓</Key>
              </Keys>
              <Description>Navigate vertically</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>Home</Key>
              </Keys>
              <Description>First slide</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>End</Key>
              </Keys>
              <Description>Last slide</Description>
            </Shortcut>
          </Section>

          <Section>
            <SectionTitle>Presentation</SectionTitle>
            <Shortcut>
              <Keys>
                <Key>K</Key>
              </Keys>
              <Description>Toggle kirtan selector</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>P</Key>
              </Keys>
              <Description>Toggle video/presentation mode</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>F</Key>
              </Keys>
              <Description>Fullscreen mode</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>Esc</Key>
              </Keys>
              <Description>Exit fullscreen/Close modals</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>?</Key>
              </Keys>
              <Description>Toggle this help menu</Description>
            </Shortcut>
          </Section>

          <Section>
            <SectionTitle>Overview</SectionTitle>
            <Shortcut>
              <Keys>
                <Key>O</Key>
              </Keys>
              <Description>Slide overview mode</Description>
            </Shortcut>
            <Shortcut>
              <Keys>
                <Key>S</Key>
              </Keys>
              <Description>Speaker notes view</Description>
            </Shortcut>
          </Section>
        </ShortcutsGrid>

        <Footer>
          Press <Key>Esc</Key> or <Key>?</Key> to close
        </Footer>
      </Modal>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Modal = styled.div`
  background: linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%);
  border-radius: 16px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ShortcutsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #667eea;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Shortcut = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Keys = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Key = styled.kbd`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 28px;
  text-align: center;
`;

const Description = styled.span`
  color: #cccccc;
  font-size: 14px;
`;

const Footer = styled.div`
  text-align: center;
  color: #888888;
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export default KeyboardShortcuts;
