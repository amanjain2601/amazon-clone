import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="container">
      <div className="logo">
        <img src="./amazon_logo.png" alt="" />
      </div>

      <form>
        <h3>Sign-In</h3>
        <div className="input-container">
          <p>Email</p>
          <input type="email" placeholder="example@example.com" />
        </div>

        <div className="input-container">
          <p>Password</p>
          <input type="password" placeholder="********" />
        </div>

        <button>LogIn</button>

        <p className="infotext">
          By continuing, you agree to Amazon's <span>Conditions of Use </span>
          and <span>Privacy Notice </span>
        </p>
      </form>

      <button className="create-accountbtn">Create Account in Amazon</button>
    </div>
  );
}

export default Login;
