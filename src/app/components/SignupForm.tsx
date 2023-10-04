// components/SignupForm.js
import React from 'react';

const SignupForm = () => {
  return (
    <div className="signup-form-container">
      <h2 className="header">Create Account</h2>
      <form className="signup-form">
        <div className="form-group">
          <input type="text" id="username" name="username" placeholder="enter your username" />
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" placeholder='enter your email' />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="enter password" />
        </div>
        <div className="form-group">
          <input type="password" id="confirm-password" name="confirm-password" placeholder="confirm password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
