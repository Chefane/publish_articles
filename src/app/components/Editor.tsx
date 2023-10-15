"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Form } from "react-bootstrap";
import { ImageResize } from "quill-image-resize-module";
import Quill from "quill";

const quillEditorStyles = {
  width: "80%",
  height: "400px",
  margin: "0 auto",
  marginTop: "40vh",
  transform: "translateY(-50%)",
};

type ReactQuillType = typeof ReactQuill;

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuillType | null>(null);

  const customToolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];

  const uploadImageLocally = (file: File) => {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string | null;

        if (result) {
          resolve(result);
        } else {
          reject(new Error("Failed to read the image file."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageInsert = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        try {
          const imageUrl = await uploadImageLocally(file);
          if (imageUrl) {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              quill.insertEmbed(range.index, "image", imageUrl);
            }
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  }, [quillRef]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(true);

      quillRef.current.getEditor().getModule("toolbar").options.handlers = {
        image: handleImageInsert,
      };
    }
  }, [handleImageInsert]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(true);

      quillRef.current.getEditor().getModule("toolbar").options.handlers = {
        image: handleImageInsert,
      };
    }
  }, [handleImageInsert]);

  return (
    <Container>
      <Form>
        <Form.Group controlId="quillEditor">
          <ReactQuill
            ref={quillRef}
            value={value}
            onChange={(content: string) => onChange(content)}
            theme="snow"
            style={quillEditorStyles}
            modules={{
              toolbar: customToolbarOptions,
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default QuillEditor;
function uploadImageLocally(file: File) {
  throw new Error("Function not implemented.");
}

function handleImageInsert() {
  throw new Error("Function not implemented.");
}
