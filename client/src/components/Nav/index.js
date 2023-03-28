import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex mx-3">
          <li className="mx-1">
            <Link to="/orderHistory">Shuffle</Link>
          </li>
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex justify-between px-1">
      <h1 aria-label="Book of Fortune Logo">
        <Link to="/">
          <img
            className="max-w-full"
            src="/src/img/site/book-of-fortune.svg"
            alt="Book of Fortune Logo"
          />
        </Link>
        {/* <span aria-readonly="true"> Book of Fortune</span> */}
      </h1>

      <nav
        id="nav-menu"
        className="bg-purple-900 flex items-center justify-center">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
