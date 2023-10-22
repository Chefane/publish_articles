"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/app/styles/editor.module.css";
import { Card, Button } from "react-bootstrap";
import AuthorNav from "@/app/components/AuthorNav";
import dynamic from "next/dynamic";

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
              className={`btn btn-dark ${styles["save-btn"]}`}
              onClick={toggleEditor}
            >
              Save The Article
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default PostArticles;
