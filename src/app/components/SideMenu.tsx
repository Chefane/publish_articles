"use client";
import React from 'react';
import styles from '@/app/styles/sideMenu.module.css';
import { Nav } from 'react-bootstrap';
import { BsHouse, BsPeople, BsPerson } from 'react-icons/bs'; // Import icons from react-icons

const SideMenu = () => {
    const linkStyle = {
        color: 'white',
    };

    return (
        <nav className={`col-md-3 col-lg-2 d-md-block bg-primary sidebar ${styles['custom-sidebar']}`}>
          <h4>Admin Dashboard</h4>
            <div className="position-sticky">
                <ul className={`nav flex-column ${styles['dash-content']}`}>
                    <li className="nav-item">
                        <Nav.Link href="/" className="text-light nav-link">
                            <BsHouse /> Home
                        </Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link href="/manage-users" className="text-light nav-link">
                            <BsPeople /> Manage Users
                        </Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link href="/user-profile" className="text-light nav-link">
                            <BsPerson /> User Profile
                        </Nav.Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default SideMenu;




