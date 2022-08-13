import React from 'react';
import './login.css';
import './signup.css';

function Signup() {
  return (
    <div className="container">
      <div className="logo">
        <img src="./amazon_logo.png" alt="" />
      </div>
      <form className="signup-form">
        <h3>Sign-Up</h3>
        <div className="input-container">
          <p>FullName</p>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="input-container">
          <p>Email</p>
          <input type="email" placeholder="example@example.com" />
        </div>

        <div className="input-container">
          <p>Password</p>
          <input type="password" placeholder="********" />
        </div>

        <button className="signup-btn">Create Account in Amazon</button>

        <p className="infotext">
          By continuing, you agree to Amazon's <span>Conditions of Use </span>
          and <span>Privacy Notice </span>
        </p>
      </form>
      <button className="signup-loginbtn">Back to Login</button>
    </div>
  );
}

export default Signup;
