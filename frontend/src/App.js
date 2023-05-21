import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { ChatGPT } from './components/ChatGPT';
import GoogleMaps from './components/GoogleMaps'; // Update the import statement

function App() {
  return (
    <div className="text-xl border-2 border-red-500">
      test
      <ChatGPT />
      <h1>Google Maps Route</h1>
      <GoogleMaps />
    </div>
  );
}

export default App;
