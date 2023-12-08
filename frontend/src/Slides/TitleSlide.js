// TitleSlide.js

import React, { useEffect, useState } from 'react';
import Slide from '../Components/RevealComponents/Slide';

const TitleSlide = () => {



  return (
    <>
      <Slide>
        <div id="logo-container">
          <img src="logo.png" alt="Logo" />
        </div>
      </Slide>
    </>
  );
};

export default TitleSlide;
