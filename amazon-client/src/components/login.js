import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = async (e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      window.alert('login Successfull');
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="./amazon_logo.png" alt="" />
      </div>

      <form>
        <h3>Sign-In</h3>
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

        <button onClick={logIn}>LogIn</button>

        <p className="infotext">
          By continuing, you agree to Amazon's <span>Conditions of Use </span>
          and <span>Privacy Notice </span>
        </p>
      </form>

      <button onClick={() => navigate('/signup')} className="create-accountbtn">
        Create Account in Amazon
      </button>
    </div>
  );
}

export default Login;
