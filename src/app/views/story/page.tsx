"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/app/page.module.css";
import { Card } from "react-bootstrap";

import dynamic from 'next/dynamic';

const QuillEditor = dynamic(
  () => import('@/app/components/Editor'),
  { ssr: false } 
);

const outputStyles = {
  marginLeft: "10%",
  width: "80%"
  };

const PostArticles: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="container">
      <Card>
        <h1 style={{marginTop: "5%", marginLeft:"30%" }}>Write Your Article Story</h1>
        <QuillEditor value={content} onChange={handleEditorChange} />
        <div>
          <h2 style={{marginTop: "-8%", marginLeft:"30%" }}>Review Your Article:</h2>
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
