// App.js

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
  const [selectedVideoId, setSelectedVideoId] = useState(''); // Default video ID

  useEffect(() => {
    // Fetch the video ID from the server when the component mounts
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
                <Deck>{Slides}</Deck>
              </KirtanProvider>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
