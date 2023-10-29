"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Form, Button, Toast, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/navigation";

const WriteStoryForm = () => {
  const router = useRouter();
  const authToken = Cookies.get("auth_token");
  let userId;

  if (authToken) {
    try {
      const tokenData = JSON.parse(authToken);
      userId = tokenData.userId;
      console.log("User ID:", userId);
    } catch (error) {
      console.error("Error parsing token data:", error);
    }
  } else {
    console.error("No authentication token found in cookies");
  }

  const [formData, setFormData] = useState({
    author_id: userId,
    author_name: "",
    article_title: "",
    article_summary: "",
    entire_article: "",
    article_image: null as string | null,
    published_date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result as string;

        setFormData({
          ...formData,
          article_image: base64Data,
        });

        setImageFile(file);
        setImageBase64(base64Data);
      };
    } else {
      setImageFile(null);
      setImageBase64(null);

      setFormData({
        ...formData,
        article_image: null,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("../pages/api/summary", formData);

      if (response.status === 200) {
        setSuccess("Story Saved Successfully");
        localStorage.setItem("article_title", formData.article_title);
        handleNavigation();
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
    router.push("/views/write-article");
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
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                placeholder="Add Author Name"
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
                name="article_summary"
                rows={5}
                placeholder="Summarise your story here....."
                style={{
                  borderRadius: "10px",
                  borderColor: "#ccc",
                  padding: "10px",
                  fontSize: "16px",
                }}
                value={formData.article_summary}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Article Image</Form.Label>
              <Form.Control
                type="file"
                name="article_image"
                onChange={handleImageChange}
                accept="image/*"
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
              className="btn btn-dark"
              type="submit"
              style={{
                marginTop: "10px",
                marginLeft: "40%",
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
                  Saving...
                </>
              ) : (
                "Save Article Summary and Continue"
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
    </>
  );
};

export default WriteStoryForm;
