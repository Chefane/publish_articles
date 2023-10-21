"use client";
import React, { useState } from "react";
import { Form, Button, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const AssignRole = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_role, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("buttun clicked");
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("../pages/api/user-roles", {
        username,
        email,
        user_role,
        password,
      });
      if (response.status === 200) {
        setSuccess("Registration successful");
      }

      if (response.status === 400) {
        setError("User already registered");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Assign Roles To Users</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              name="email_address"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Role</Form.Label>
            <Form.Select
              aria-label="Floating label"
              value={user_role}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>Select Role</option>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="publisher">Publisher</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button className="btn btn-dark"  type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Assign Role"
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

export default AssignRole;
