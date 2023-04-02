import React from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-wrap flex-row gap-3">
          <li className="">
            <Link to="/">
              {/* Tarot */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/tarot.png"
                alt=""
              />
            </Link>
          </li>
          <li className="">
            <Link to="/store">
              {/* Tarot */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/shop.png"
                alt=""
              />
              {/* Store */}
            </Link>
          </li>
          {/* <li className="px-1">
            <Link to="/orderHistory">Order History</Link>
          </li> */}
          <li className="">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              {/* Logout */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/logout.png"
                alt=""
              />
            </a>
          </li>
          <li className="cart-li">
            {/* bg-fuchsia-50 md:bg-indigo-600 */}
            <Cart />
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-wrap gap-3">
          <li className="">
            <Link to="/">
              {/* Tarot */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/tarot.png"
                alt=""
              />
            </Link>
          </li>
          <li className="">
            <Link to="/store">
              {/* Store */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/shop.png"
                alt=""
              />
            </Link>
          </li>
          <li className="">
            <Link to="/signup">
              {/* Signup */}
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/signup.png"
                alt=""
              />
            </Link>
          </li>
          <li className="">
            <Link to="/login">
              <img
                className="max-w-full w-[30px] md:w-[53px]"
                src="/src/img/icons/login.png"
                alt=""
              />
              {/* Login */}
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex flex-wrap justify-between px-1 mb-5">
      <Link to="/">
        <h1 className="flex" aria-label="Oracle Logo">
          <img
            className="max-w-full mx-auto mb-0 w-[100px] md:w-[250px]"
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
