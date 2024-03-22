import React from 'react';
import { RadioComponent, LastFmComponent } from './App';

const MainComponent = () => {
  return (
    <div>
      <RadioComponent apiKey="YOUR_RADIO_API_KEY" />
      <LastFmComponent username="YOUR_LASTFM_USERNAME" />
    </div>
  );
};

export default MainComponent;