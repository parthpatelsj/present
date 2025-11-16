import React, { useMemo } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { useKirtanContext } from '../useKirtanContext';
import styled from 'styled-components';

const KirtanDropdown = ({ onClose }) => {
  const { selectedKirtanIndex, setSelectedKirtanIndex, availableKirtans } = useKirtanContext();

  const options = useMemo(() =>
    availableKirtans.map((kirtan, index) => ({
      value: index,
      label: kirtan,
    })),
    [availableKirtans]
  );

  const handleChange = (selectedOption) => {
    setSelectedKirtanIndex(selectedOption.value);
    if (onClose) onClose();
  };

  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  const modalStyles = {
    content: {
      maxWidth: '600px',
      width: '90%',
      maxHeight: '60vh',
      margin: 'auto',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
    },
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1a1a2e',
      borderColor: '#667eea',
      borderRadius: '8px',
      minHeight: '50px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        borderColor: '#764ba2',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1a1a2e',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#667eea' : state.isFocused ? '#2a2a3e' : '#1a1a2e',
      color: '#ffffff',
      padding: '12px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#667eea',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaaaaa',
    }),
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCloseModal}
      contentLabel="Select Kirtan"
      style={modalStyles}
      ariaHideApp={false}
    >
      <ModalContent>
        <Title>Select a Kirtan</Title>
        <Subtitle>{availableKirtans.length} kirtans available</Subtitle>
        <Select
          value={{ value: selectedKirtanIndex, label: availableKirtans[selectedKirtanIndex] }}
          options={options}
          onChange={handleChange}
          isSearchable
          placeholder="Search kirtans..."
          styles={customSelectStyles}
          autoFocus
          menuIsOpen
        />
        <HelpText>Press ESC to close • Use arrow keys to navigate</HelpText>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #aaaaaa;
  font-size: 14px;
  text-align: center;
`;

const HelpText = styled.p`
  margin: 0;
  color: #888888;
  font-size: 12px;
  text-align: center;
  font-style: italic;
`;

export default KirtanDropdown;
