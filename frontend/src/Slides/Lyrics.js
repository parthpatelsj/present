import React from 'react';
import Slide from '../Components/RevealComponents/Slide';

const KirtanLyrics = (props) => {
  return (
    <>
      {props.kirtanData.song_lyrics.map((verse, index) => (
        <Slide key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', background: 'rgba(0, 0, 0, 0.6)', minHeight: '100vh' }}>
          <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: '20px' }}>{verse}</p>
          {/* <div style={{ color: 'white', textAlign: 'right' }}>
            {/* Display footer or controls */}
            {/* <p>Verse {index + 1}</p>
          </div> */}    
        </Slide>
      ))}
    </>
  );
};

export default KirtanLyrics;
