"use client";
import React from 'react';
import styles from '@/app/styles/sideMenu.module.css';
import { Nav } from 'react-bootstrap';

const SideMenu = () => {
    const linkStyle = {
        color: 'white',
      };
  return (
    <nav className={`col-md-3 col-lg-2 d-md-block bg-primary sidebar ${styles['custom-sidebar']}`}>
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
          <Nav.Link href="/" className="text-light nav-link">
              Home
          </Nav.Link>
          </li>
          <li className="nav-item">
          <Nav.Link href="/" className="text-light nav-link">
              Manage Users
          </Nav.Link>
          </li>
          <li className="nav-item">
          <Nav.Link href="/" className="text-light nav-link">
              User Profile
          </Nav.Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;



