"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "@/app/styles/navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#">Articles</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarSupportedContent" />
    <Navbar.Collapse id="navbarSupportedContent">
      <Nav className="mr-auto">
        <Link    className="nav-link" href="/">
          Home
        </Link>
        <Link    className="nav-link" href="/views/login">
         Login
        </Link>
        <Link  className="nav-link" href="/published">
         Published Articles
        </Link>
      </Nav>
      <Nav  className={styles.align}>
      <Link  className="nav-link" href="/views/signup">
         Create Account
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default Navigation;
