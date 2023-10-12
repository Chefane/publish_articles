"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Form, Button, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const PublishForm = () => {
  const authToken = Cookies.get("auth_token");

  const [formData, setFormData] = useState({
    publisher_name: "",
    article_title: "",
    story: "",
    url: "",
    published_date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/pages/api/publish", formData);

      if (response.status === 200) {
        setSuccess("Story Published Successfully");
      } else if (response.status === 400) {
        setError("Story Already Published");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Publish Articles</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Publisher Name</Form.Label>
            <Form.Control
              type="text"
              name="publisher_name"
              value={formData.publisher_name}
              onChange={handleChange}
              placeholder="Add Publisher Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              type="text"
              name="article_title"
              value={formData.article_title}
              onChange={handleChange}
              placeholder="Add Article Title"
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb-2">Article Body</Form.Label>
            <Form.Control
              as="textarea"
              name="story"
              rows={5}
              placeholder="Enter your article story here....."
              style={{
                borderRadius: "10px",
                borderColor: "#ccc",
                padding: "10px",
                fontSize: "16px",
              }}
              value={formData.story}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Article URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Add URL for the entire story"
              required
            />
          </Form.Group>
          <Form.Group controlId="published_date">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{
              marginTop: "10px",
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                
                Publishing...
              </>
            ) : (
              "Publish Story"
            )}
          </Button>
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

export default PublishForm;
