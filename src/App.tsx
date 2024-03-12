import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Basic} from './components/form';
import { Navbar } from './components/appbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Basic/>
    </div>
  );
}

export default App;
