import React from 'react';
import { useStatevalue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [{ basket }] = useStatevalue();
  const navigate = useNavigate();
  return (
    <div className="nav-container">
      <div className="inner-container">
        <div className="home-logo">
          <img src="./amazon_logo1.png" alt="" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <div onClick={() => navigate('/addproduct')} className="search-icon">
            <img src="./searchIcon.png" alt="" />
          </div>
        </div>
        <div className="right-container">
          <div className="nav-button">
            <p>Hello</p>
            <p>Guest</p>
          </div>
          <div className="nav-button">
            <p>Return</p>
            <p>& Orders</p>
          </div>
          <div onClick={() => navigate('/checkout')} className="basket-button">
            <img src="./basket-icon.png" alt="" />
            <p>{basket.length}</p>
          </div>
        </div>
      </div>
      <div className="mobile-search-bar">
        <input type="text" placeholder="Search..." />
        <div onClick={() => navigate('/addproduct')} className="search-icon">
          <img src="./searchIcon.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
