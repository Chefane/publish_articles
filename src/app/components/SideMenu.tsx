"use client"
import React from 'react';
import styles from '@/app/styles/sideMenu.module.css';
import { Nav } from 'react-bootstrap';
import { BsHouse, BsPeople, BsPerson } from 'react-icons/bs'; // Import icons from react-icons

const SideMenu = () => {
    const linkStyle = {
        color: 'white',
    };

    return (
        <nav className={`col-md-3 col-lg-2 d-md-block bg-light  sidebar ${styles['custom-sidebar']}`}>
          <h4 className='text-dark'>Admin Dashboard</h4>
            <div className="position-sticky">
                <ul className={`nav flex-column ${styles['dash-content']}`}>
                    <li className="nav-item">
                        <Nav.Link href="/" className="text-dark nav-link">
                            <BsHouse /> Home
                        </Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link href="/manage-users" className="text-dark nav-link">
                            <BsPeople /> Manage Users
                        </Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link href="/user-profile" className="text-dark nav-link">
                            <BsPerson /> User Profile
                        </Nav.Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default SideMenu;




