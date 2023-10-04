import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/signup">
            Create Account
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
