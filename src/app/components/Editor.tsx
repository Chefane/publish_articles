"use client";
import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
  }

  const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['clean']
      ],
    };

    return (
        <ReactQuill
          value={value}
          onChange={(content) => onChange(content)}
          modules={modules}
        />
      );
    };
    
    export default QuillEditor;;