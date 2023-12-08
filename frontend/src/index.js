import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Deck from './Components/RevealComponents/Deck';
import Slides from './Slides';
import AdminPage from './Components/AdminPage';
import './index.css';
import './Themes/override.css';
import 'reveal.js/dist/theme/black.css';
import { KirtanProvider } from './useKirtanContext';

const App = () => (
  <Router>
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={
          <div className="App"><KirtanProvider><Deck>{Slides}</Deck></KirtanProvider></div>
      } />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
