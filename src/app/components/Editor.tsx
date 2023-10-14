"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button } from "react-bootstrap";

const quillEditorStyles = {
  width: '80%',
  height: '400px', // Adjust the height as needed
  margin: '0 auto', // Center horizontally
  marginTop: '35vh', // Center vertically
  transform: 'translateY(-50%)', // Center vertically
};

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(true); 
    }
  }, []);

  return (
    <Container>
      <Form>
        <Form.Group controlId="quillEditor">
          <ReactQuill
            ref={quillRef}
            value={value}
            onChange={(content) => onChange(content)}
            theme="snow"
            style={quillEditorStyles}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default QuillEditor;
