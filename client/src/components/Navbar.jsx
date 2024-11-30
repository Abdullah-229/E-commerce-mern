import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ user, handleLogout }) => {
  console.log(user)
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://via.placeholder.com/50" className="h-8" alt="Online Gadget Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Online Gadget</span>
          </div>
        </div>
        <div className="navbar-end flex items-center space-x-3">
          {user.id && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="text-xl font-semibold">{user.name}</span>
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.34 1.67M6 7h14M5 7h1m0 0L3.57 4.59a2 2 0 00-.91-.6L1 4m5 3v12a2 2 0 002 2h10a2 2 0 002-2V7m-7 6h2m-2 0h-2m2 0v6m0-6H8m4 0h4" />
                </svg>
              </Link>
            </div>
          )}
          {user.id ? (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
