import React, { useState, useEffect } from 'react';
import KirtanLyrics from './Lyrics';
import Reveal from 'reveal.js';
import { useKirtanContext } from '../useKirtanContext';
const Kirtan = () => {
  const {
    selectedKirtanIndex,
    setSelectedKirtanIndex,
    availableKirtans,
    setAvailableKirtans,
  } = useKirtanContext();
  const [kirtanData, setKirtanData] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeReveal = () => {
    // Initialize or update reveal.js after data has been loaded
    Reveal.initialize();
  };

  // Function to load kirtan data based on the selected kirtan
  const loadKirtanData = async (kirtanFileName) => {
    try {
      // Assume kirtanFileName is the name of the selected kirtan file
      const response = await fetch(`/kirtans/${kirtanFileName}.json`);
      const data = await response.json();
      setKirtanData(data);
    } catch (error) {
      console.error('Error loading kirtan data:', error.message);
    } finally {
      // Set loading to false when data is loaded (or an error occurs)
      setLoading(false);
    }
  };

  // Function to fetch the list of available kirtans
// Function to fetch the list of available kirtans
const fetchAvailableKirtans = async () => {
  try {
    const response = await fetch('/kirtans/kirtanList.json');
    const kirtanList = await response.json();

    // Set availableKirtans in the context
    setAvailableKirtans(kirtanList.map((kirtan) => kirtan.title));

    // Default to the first kirtan in the list
    if (kirtanList.length > 0) {
      setSelectedKirtanIndex(0);
      loadKirtanData(kirtanList[0].title);
    }
  } catch (error) {
    console.error('Error fetching available kirtans:', error.message);
    console.log('Response content:', error.response && (await error.response.text()));
  }
};

// Use useEffect to fetch available kirtans when the component mounts
useEffect(() => {
  fetchAvailableKirtans();
}, []);

// Use useEffect to initialize reveal.js after data has been loaded
useEffect(() => {
  if (!loading) {
    initializeReveal();
  }
}, [loading]);

// Update selected kirtan when the component mounts or whenever needed
useEffect(() => {
  // Fetch the kirtan data based on the selected index
  const selectedKirtan = availableKirtans[selectedKirtanIndex];
  // Use setSelectedKirtanIndex instead of setSelectedKirtan
  setSelectedKirtanIndex(selectedKirtanIndex);
  if (selectedKirtan) {
    console.log(selectedKirtan);
    loadKirtanData(selectedKirtan);
  }
}, [selectedKirtanIndex]);


  return (
    <>
    {loading ? (
      <p>Loading kirtan...</p>
    ) : (
      <KirtanLyrics kirtanData={kirtanData} />
    )}
  </>
  );
};


export default Kirtan;
