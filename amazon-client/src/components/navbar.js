import React from 'react';
import { useStatevalue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import axios from '../axios';

function Navbar() {
  const [{ basket, user, address }, dispatch] = useStatevalue();
  const navigate = useNavigate();

  const logOut = async () => {
    await axios.post('/logout', {
      basket,
      user,
    });
    dispatch({
      type: 'LOGOUT_USER',
    });

    navigate('/login');
  };

  return (
    <div className="nav-container">
      <div className="inner-container">
        <div className="home-logo" onClick={() => navigate('/')}>
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
            {user ? (
              <p onClick={logOut}>{user}</p>
            ) : (
              <p onClick={() => navigate('/login')}>Sign In</p>
            )}
          </div>
          <div className="nav-button" onClick={() => navigate('/orders')}>
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
