// VideoBackground.js

import React from 'react';

const VideoBackground = () => (
  <div className="video-background">
    {/* Replace 'VIDEO_ID' with the actual YouTube video ID */}
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/QoytNH5Lq6M?autoplay=1&mute=1&loop=1&playlist=QoytNH5Lq6M`}
      frameBorder="0"
      allowFullScreen
      title="YouTube Background Video"
    ></iframe>
  </div>
);

export default VideoBackground;
