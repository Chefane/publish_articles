'use client';
import React from 'react';

const LoginForm = () => {
  return (
    <div className="signup-form-container">
      <h2 className="header">Login</h2>
      <form className="signup-form">
        <div className="form-group">
          <input type="text" id="username" name="username" placeholder="enter your username" />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="enter password" />
        </div>
     
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;