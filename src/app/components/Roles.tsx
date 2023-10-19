"use client";
import React, { useState } from "react";
import { Form, Button, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const AssignRole = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Assign Roles To Users</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter User Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              name="email_address"
              placeholder="Enter Email Address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Role</Form.Label>
            <Form.Select aria-label="Floating label">
              <option>Select Role</option>
              <option value="1">Author</option>
              <option value="2">Editor</option>
              <option value="3">Publisher</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Enter Password"
              required
            />
          </Form.Group>
          <Button>Assign Role</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AssignRole;
