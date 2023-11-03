"use client"
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "@/app/styles/authorNav.module.css";
import Link from "next/link";

const AuthorNav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Author</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/write-article">
            Write Article
          </Link>
          <Link className="nav-link" href="/published">
            Published
          </Link>
        </Nav>
        <Nav className={styles.align} >
          <NavDropdown title="Profile">
            <Link className="dropdown-item" href="/profile">
              Profile
            </Link>
            <Link className="dropdown-item" href="/logout">
              Logout
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AuthorNav;

