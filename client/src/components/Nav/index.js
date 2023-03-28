import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="">
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
          <li className="mx-1">
            <Cart />
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="">
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
    <header className="flex flex-col md:flex-row justify-between px-1 mb-5">
      <h1 className="mb-5 md:mb-0" aria-label="Book of Fortune Logo">
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
