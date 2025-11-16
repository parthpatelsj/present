import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Deck from './Components/RevealComponents/Deck';
import Slides from './Slides';
import AdminPage from './Components/AdminPage';
import KeyboardShortcuts from './Components/KeyboardShortcuts';
import './index.css';
import './Themes/override.css';
import 'reveal.js/dist/theme/black.css';
import { KirtanProvider } from './useKirtanContext';
import VideoBackground from './Components/VideoBackground';

const App = () => {
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getVideoId`);
        if (!response.ok) throw new Error('Failed to fetch video ID');
        const data = await response.json();
        setSelectedVideoId(data.videoId);
      } catch (error) {
        console.error('Error fetching video ID:', error.message);
        setSelectedVideoId('QoytNH5Lq6M'); // Fallback video
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoId();
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'p' || event.key === 'P') {
      const deck = document.querySelector('.reveal');
      const videoBackground = document.querySelector('.video-background');

      if (!deck || !videoBackground) return;

      const isVideoMode = deck.style.opacity === '0';

      deck.style.transition = 'opacity 1s ease-in-out';
      videoBackground.style.transition = 'opacity 1s ease-in-out';

      deck.style.opacity = isVideoMode ? '1' : '0';
      videoBackground.style.opacity = isVideoMode ? '0.7' : '1';
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (isLoading) {
    return <div className="loading">Loading presentation...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage onSelectVideo={setSelectedVideoId} />} />
        <Route
          path="/"
          element={
            <div className="App">
              <KirtanProvider>
                <VideoBackground videoId={selectedVideoId} />
                <Deck className="deck-class">{Slides}</Deck>
                <KeyboardShortcuts />
              </KirtanProvider>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
