import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Checkout from './components/checkout';
import { useState } from 'react';
import Address from './components/address';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </div>
  );
}

export default App;
