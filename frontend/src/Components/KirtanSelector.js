import React, { useState } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { useKirtanContext } from '../useKirtanContext';

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
      maxWidth: '300px',
      margin: 'auto',
      padding: '20px',
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
      <button onClick={openModal}>Open Kirtan Selector</button>
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
