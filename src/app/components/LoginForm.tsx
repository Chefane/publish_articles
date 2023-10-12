'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("pages/api/login", {
        username,
        password,
      });
      const token = response.data.token;

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);

      Cookies.set("auth_token", token, { expires: expirationDate });
      router.push('/publish');

    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="signup-form-container">
      <h2 className="header">Login</h2>
      <form className="signup-form">
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
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} disabled={isLoading}>
          {" "}
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
