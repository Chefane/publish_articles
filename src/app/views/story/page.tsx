"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/app/page.module.css";
import QuillEditor from "@/app/components/Editor";
import { Card } from "react-bootstrap";

const outputStyles = {
  marginLeft: "30%"
  };

const PostArticles: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="container fluid">
      <Card>
        <h1 style={outputStyles}>Write Your Article Story</h1>
        <QuillEditor value={content} onChange={handleEditorChange} />
        <div  style={{ marginTop: "-8%", marginLeft: "15%" }}>
          <h2 style={outputStyles}>Review Your Article:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={outputStyles}
          />
        </div>
      </Card>
    </div>
  );
};

export default PostArticles;
