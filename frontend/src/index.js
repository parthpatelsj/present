import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Deck from './Components/RevealComponents/Deck';
import Slides from './Slides';
import AdminPage from './Components/AdminPage';
import './index.css';
import './Themes/override.css';
import 'reveal.js/dist/theme/black.css';
import { KirtanProvider } from './useKirtanContext';
import VideoBackground from './Components/VideoBackground';

const App = () => {
  const [selectedVideoId, setSelectedVideoId] = useState('');

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getVideoId`);
        const data = await response.json();
        setSelectedVideoId(data.videoId);
      } catch (error) {
        console.error('Error fetching video ID:', error.message);
      }
    };

    fetchVideoId();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'p') {
        // Fade out Deck component
        const deck = document.querySelector('.reveal'); // replace with the actual class or ID of your Deck component
        deck.style.transition = 'opacity 1s';
        const videoBackground = document.querySelector('.video-background');
        videoBackground.style.transition = 'opacity 1s';

        if (deck.style.opacity == 1) {
          deck.style.opacity = 0;
          // Fade in video background
          videoBackground.style.opacity = 1;
        } else {
          deck.style.opacity = 1;
          videoBackground.style.opacity = 0.7
        }

        
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this effect will run once when the component mounts

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
              </KirtanProvider>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
