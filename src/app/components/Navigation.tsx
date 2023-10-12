'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

const Navigation = () => {
  return (

    <Navbar expand="lg" className="bg-primary">
    <Container>
      <Navbar.Brand href="/" className='text-light'>Article-Publisher</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-aut" >
          <Nav.Link href="/" className='text-light'>Home</Nav.Link>
          <Nav.Link href="/login" className='text-light'>Login</Nav.Link>
          <Nav.Link href="/signup" className='text-light float-right'>Create Account</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    
    // <nav className="navbar">
    //   <ul className="navbar-nav">
    //     <li className="nav-item">
    //       <Link className="nav-link" href="/">
    //         Home
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" href="/signup">
    //         Create Account
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" href="/login">
    //         Login
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navigation;



