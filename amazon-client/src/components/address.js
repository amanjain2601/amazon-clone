import React from 'react';
import Navbar from './navbar';
import './address.css';
import { useState } from 'react';
import { useStatevalue } from '../StateProvider';

function Address() {
  const [{}, dispatch] = useStatevalue();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landMark, setLandMark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const deliver = (e) => {
    e.preventDefault();

    dispatch({
      type: 'SET_ADDRESS',
      item: {
        fullName,
        phone,
        flat,
        area,
        city,
        state,
      },
    });
  };

  return (
    <div className="address-container">
      <Navbar />
      <div className="address-main-container">
        <form className="address-form-container">
          <div className="input-container">
            <p>Full Name</p>
            <input
              type="text"
              placeholder="John Smith"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>
          <div className="input-container">
            <p>Phone Number</p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="input-container">
            <p>Flat, House no, Building, Company, Apartment</p>
            <input
              type="text"
              onChange={(e) => setFlat(e.target.value)}
              value={flat}
            />
          </div>
          <div className="input-container">
            <p>Area, Colony, Street</p>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </div>
          <div className="input-container">
            <p>Landmark</p>
            <input
              type="text"
              onChange={(e) => setLandMark(e.target.value)}
              value={landMark}
            />
          </div>
          <div className="input-container">
            <p>Town/City </p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <div className="input-container">
            <p>State/Province</p>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </div>

          <button onClick={deliver}>Deliver to this Address</button>
        </form>
      </div>
    </div>
  );
}

export default Address;
