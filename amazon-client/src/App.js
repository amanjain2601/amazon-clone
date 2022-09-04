import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Checkout from './components/checkout';
import { useState } from 'react';
import Address from './components/address';
import Payment from './components/payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Addproduct from './components/addproduct';
import Orders from './components/orders';

const promise = loadStripe(
  'pk_test_51L71A9SJy80HPv0GKSTDj9YaHhD5C44iZP9fkwHs3CYfNDJ4Pnm3XeMHUr59DMoBen8YuDHmZsf3qPdGOXdLvcBM00pFlNqyXQ'
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
