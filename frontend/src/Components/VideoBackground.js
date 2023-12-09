// VideoBackground.js

import React from 'react';

const VideoBackground = ({ videoId }) => (
  <div className="video-background">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=10`}
      frameBorder="0"
      allowFullScreen
      title="YouTube Background Video"
    ></iframe>
  </div>
);

export default VideoBackground;
