import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-wrap flex-row md:flex-col gap-3">
          <li className="px-1">
            <Link to="/fortuneTelling" className="p-3">
              Tarot
            </Link>
          </li>
          <li className="px-1">
            <Link to="/store">Store</Link>
          </li>
          {/* <li className="px-1">
            <Link to="/orderHistory">Order History</Link>
          </li> */}
          <li className="px-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="px-1 bg-fuchsia-50 md:bg-indigo-600 cart-li">
            <Cart />
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-wrap md:flex-col md:flex-row gap-3">
          <li className="px-1">
            <Link to="/fortuneTelling" className="p-3">
              Tarot
            </Link>
          </li>
          <li className="px-1">
            <Link to="/store">Store</Link>
          </li>
          <li className="px-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="px-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex flex-col md:flex-row justify-between px-1 mb-5">
      <Link to="/">
        <h1 className="flex" aria-label="Oracle Logo">
          <img
            className="max-w-full mx-auto mb-3 md:mb-0 w-[100px] md:w-[250px]"
            src="/src/img/site/oracle.svg"
            alt="Oracle Logo"
          />
          <img
            className="max-w-full hidden ml-5  md:block w-[55px] rolate-ball"
            src="/src/img/site/eye.svg"
            alt="Eye"
          />
        </h1>
      </Link>

      <nav id="nav-menu" className="flex justify-center items-center">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
