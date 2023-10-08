"use client";
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Spinner, Toast } from "react-bootstrap";
import { toast } from 'react-toastify';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("pages/api/register", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
         console.log("Registration successful", response.data);
      }

      if (response.status === 400) {
        console.log("user already registered", response.data);
     }
   
    } catch (err: any) {
       setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2 className="header">Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>

    </div>
  );
};

export default SignupForm;
