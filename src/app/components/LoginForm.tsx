"use client"
import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Card, Form, Button, Toast } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import jwtDecode from "jwt-decode";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [userData, setUserData] = useState<{
    userId: string;
    userName: string;
    userEmail: string;
  } | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("../pages/api/login", {
        username,
        password,
      });
      if (response.status === 401) {
        setError("User no registered");
      } else if (response.status === 400) {
        setError("username or pasword incorrect");
      } else {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const data = JSON.stringify(decodedToken);
        const jsonData = JSON.parse(data);
        const userRole = jsonData.userRole;

        if (userRole === "author") {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);

          Cookies.set("auth_token", data, { expires: expirationDate });
          router.push("/views/summarise-article");

        } else if (userRole === "editor") {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);

          Cookies.set("auth_token", token, { expires: expirationDate });
          router.push("/views/edit-article");

        } else if (userRole === "publisher") {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);

          Cookies.set("auth_token", token, { expires: expirationDate });
          router.push("/views/publish-stories");

        } else if (userRole === "admin"){
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);

          Cookies.set("auth_token", token, { expires: expirationDate });
          router.push("/views/admin-dashboard");
        }
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Login</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button className="btn btn-dark" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </Form>
        <Toast
          show={!!success}
          onClose={() => setSuccess("")}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{success}</Toast.Body>
        </Toast>

        <Toast
          show={!!error}
          onClose={() => setError("")}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
          bg="danger"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
