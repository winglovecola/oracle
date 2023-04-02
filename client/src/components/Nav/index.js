import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-col md:flex-row gap-3">
          <li className="px-1">
            <Link to="/tarot" className="p-3">
              Tarot
            </Link>
          </li>
          <li className="px-1">
            <Link to="/store">Store</Link>
          </li>
          <li className="px-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
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
        <ul className="flex flex-col md:flex-row gap-3">
          <li className="px-1">
            <Link to="/tarot" className="p-3">
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


/*   <h1 className="mb-5 md:mb-0" aria-label="Oracle Logo">
  <Link to="/">
    <img
      className="max-w-full w-[250px]"
      src="/src/img/site/oracle.svg"
      alt="Oracle Logo"
    />
  </Link>
  {}
</h1>

<nav
  id="nav-menu"
  className="bg-purple-900 flex items-center justify-center">
  {showNavigation()}
</nav> */

  return (
    <header className="flex flex-col md:flex-row justify-between px-1 mb-5">

      <h1 className="mb-5 md:mb-0" aria-label="Oracle Logo">
        <Link to="/" className="flex">
          <img
            className="max-w-full w-[250px] mr-4"
            src="/src/img/site/oracle.svg"
            alt="Oracle Logo"
          />
          <img
            className="max-w-full w-[55px] rolate-ball"
            src="/src/img/site/eye.svg"
            alt="Eye"
          />
        </Link>
        {/* <span aria-readonly="true"> Oracle</span> */}
      </h1>


      <nav
        id="nav-menu"
        className="bg-purple-900 flex items-center justify-center test">
        {showNavigation()}
      </nav>

    </header>
  );
}

export default Nav;
