import React, { useState } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { useKirtanContext } from '../useKirtanContext';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const KirtanDropdown = () => {
  const { selectedKirtanIndex, setSelectedKirtanIndex, availableKirtans } = useKirtanContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = availableKirtans.map((kirtan, index) => ({
    value: index,
    label: kirtan,
  }));

  const handleChange = (selectedOption) => {
    setSelectedKirtanIndex(selectedOption.value);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    content: {
      maxWidth: '30%',
      width: '80%',
      maxHeight: '40%',
      margin: 'auto',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <>
      <StyledButton onClick={openModal}>Open Kirtan Selector</StyledButton>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Select Kirtan" style={modalStyles} ariaHideApp={false}>
        <Select
          value={{ value: selectedKirtanIndex, label: availableKirtans[selectedKirtanIndex] }}
          options={options}
          onChange={handleChange}
          isSearchable
          placeholder="Select Kirtan"
        />
      </Modal>
    </>
  );
};

export default KirtanDropdown;
