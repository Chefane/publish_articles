// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          Your Logo
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="">
              Home
            </Link>
          </li>
          <li>
            <Link href="/services">
              Create Account
            </Link>
          </li>
          <li>
            <Link href="/contact">
            Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;