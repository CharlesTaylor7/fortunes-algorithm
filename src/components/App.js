import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFrames } from '../hooks/useFrames';

export const App = () => {
  const { frame, forward, backward, append } = useFrames();

  useEffect(() => {
    console.log(frame);
  }, [frame]);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') backward();
      else if (e.key === 'ArrowRight') forward();
      else append(e.key);
    }
  }, [forward, backward, append]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
