import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Basic} from './components/form';
import { Navbar } from './components/appbar';
import Footer from './components/footer';
import { Provider } from 'react-redux';
function App() {
  return (
    <div className="App">

      <Navbar/>
      <Basic/>
      <Footer/>

    </div>
  );
}

export default App;
