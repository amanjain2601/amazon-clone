import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <div className="nav-container">
      <div className="inner-container">
        <div className="home-logo">
          <img src="./amazon_logo1.png" alt="" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <div className="search-icon">
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
          <div className="basket-button">
            <img src="./basket-icon.png" alt="" />
            <p>0</p>
          </div>
        </div>
      </div>
      <div className="mobile-search-bar">
        <input type="text" placeholder="Search..." />
        <div className="search-icon">
          <img src="./searchIcon.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
