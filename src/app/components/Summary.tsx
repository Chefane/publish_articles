"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Form, Button, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";



const WriteStoryForm = () => {

  const router = useRouter();
  const authToken = Cookies.get("auth_token");

  const [formData, setFormData] = useState({
    publisher_name: "",
    article_title: "",
    story: "",
    url: "",
    article_image: null as string | null,
    published_date: "",
  });


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
  
    if (fileInput) {
      const file = fileInput.files ? fileInput.files[0] : null;
      
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            setFormData({
              ...formData,
              article_image: event.target.result as string,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("../pages/api/summary", formData);

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
  
    const handleNavigation = () => {
      router.push("/views/story");
    };

  return (
    <>
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Summarise Your Story</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              name="publisher_name"
              value={formData.publisher_name}
              onChange={handleChange}
              placeholder="Add Author Name"
              required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              type="text"
              name="article_title"
              value={formData.article_title}
              onChange={handleChange}
              placeholder="Add Article Title"
              required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb-2">Article Body</Form.Label>
            <Form.Control
              as="textarea"
              name="story"
              rows={5}
              placeholder="Summarise your story here....."
              style={{
                borderRadius: "10px",
                borderColor: "#ccc",
                padding: "10px",
                fontSize: "16px",
              }}
              value={formData.story}
              onChange={handleChange}
              required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Article URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Add URL for the entire story"
              required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Article Image</Form.Label>
            <Form.Control
              type="file"
              name="article_image"
              accept="image/*"
              onChange={handleImageChange} />
          </Form.Group>
          <Form.Group controlId="published_date">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              required />
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
                  aria-hidden="true" />
                Saving...
              </>
            ) : (
              "Save Story"
            )}
          </Button>
          <Button variant="primary" onClick={handleNavigation} style={{ marginLeft: "70%", marginTop: "1%" }}>
            Write Entire Story <FaArrowRight />
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
    </Card></>
  );
};

export default WriteStoryForm;
