"use client"
import Image from "next/image";
import React, { useState } from 'react';
import styles from "@/app/page.module.css";
import QuillEditor from "@/app/components/Editor"
import PostArticles from "../publish/page";



const postArticles: React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [content, setContent] = useState<string>('');

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <h1>React Quill Editor in Next.js</h1>
      <QuillEditor value={content} onChange={handleEditorChange} />
      <div>
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
      );
    };
    
    export default postArticles;