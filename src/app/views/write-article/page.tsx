"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/app/styles/editor.module.css";
import { Form, Button, Toast, Card } from "react-bootstrap";
import AuthorNav from "@/app/components/AuthorNav";
import dynamic from "next/dynamic";
import Spinner from "react-bootstrap/Spinner";

const QuillEditor = dynamic(() => import("@/app/components/Editor"), {
  ssr: false,
});

const outputStyles = {
  marginLeft: "10%",
  width: "80%",
};

if (typeof window !== "undefined") {
  const storedArticleTitle = localStorage.getItem("article_title");

  if (storedArticleTitle) {
    console.log("Retrieved Article Title:", storedArticleTitle);
  } else {
    console.log("Article Title not found in local storage");
  }
}

const PostArticles: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [content, setContent] = useState<string>("");
  const [isEditorActive, setIsEditorActive] = useState(true);

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const toggleEditor = () => {
    setIsEditorActive(true);
  };

  const toggleContentReview = () => {
    setIsEditorActive(false);
  };

  const saveArticle = async () => {
    const articleTitle = localStorage.getItem("article_title");
    if (!articleTitle) {
      console.log("Article Title not found in local storage");
      return;
    }

    const textContent = content.replace(/<[^>]+>/g, "");

    try {
      const response = await fetch("../pages/api/save-full-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_title: articleTitle,
          entire_article: textContent,
        }),
      });

      if (response.status === 200) {
        setSuccess("Article Saved Successfully");
      } else if (response.status === 400) {
        setError("article title and the article content is required");
      } else if (response.status === 401) {
        setError("article title not found");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AuthorNav />
      <div className="container">
        {isEditorActive ? (
          <>
            <h3
              style={{
                marginTop: "3%",
                marginLeft: "30%",
                marginBottom: "-3%",
              }}
            >
              Write Your Article Story
            </h3>
            <QuillEditor value={content} onChange={handleEditorChange} />
            <Button
              className={`btn btn-dark ${styles["article-review-btn"]}`}
              onClick={toggleContentReview}
            >
              Review Article
            </Button>
          </>
        ) : (
          <>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
              style={outputStyles}
            />
            <Button
              className={`btn btn-dark ${styles["editor-toggle-btn"]}`}
              onClick={toggleEditor}
            >
              Back to Editor
            </Button>
            <Button
              type="submit"
              className={`btn btn-dark ${styles["save-btn"]}`}
              onClick={saveArticle}
              disabled={isSaving} // Disable the button while saving
            >
              {isSaving ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Save The Article"
              )}
            </Button>
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
          </>
        )}
      </div>
    </>
  );
};

export default PostArticles;
