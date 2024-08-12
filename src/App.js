// src/App.js

import React from 'react';
import Weather from './components/weather';
import GetLocation from './components/location';
import './App.css';

function App() {
  return (
    <div className="App">
      <Weather />
      <GetLocation />
    </div>
  );
}

export default App;

