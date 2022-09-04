import React, { useState } from 'react';
import './login.css';
import './signup.css';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createAccount = (e) => {
    e.preventDefault();

    axios
      .post('/register', {
        userName,
        email,
        password,
        confirmPassword,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="./amazon_logo.png" alt="" />
      </div>
      <form className="signup-form">
        <h3>Sign-Up</h3>
        <div className="input-container">
          <p>FullName</p>
          <input
            type="text"
            placeholder="John Smith"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className="input-container">
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="input-container">
          <p>Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="input-container">
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <button onClick={createAccount} className="signup-btn">
          Create Account in Amazon
        </button>

        <p className="infotext">
          By continuing, you agree to Amazon's <span>Conditions of Use </span>
          and <span>Privacy Notice </span>
        </p>
      </form>
      <button onClick={() => navigate('/login')} className="signup-loginbtn">
        Back to Login
      </button>
    </div>
  );
}

export default Signup;
