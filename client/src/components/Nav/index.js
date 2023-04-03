import React, { useEffect } from 'react';
import Auth from '../../utils/auth';
import Cart from '../Cart';
import { Link } from 'react-router-dom';

function Nav() {


  useEffect(() => {

    const butInstall = document.getElementById('buttonInstall');
    //hide the button first
    //butInstall.classList.toggle('hidden', true);
    
    // Logic for installing the PWA
    // TODO: Add an event handler to the `beforeinstallprompt` event
    window.addEventListener('beforeinstallprompt', async (event) => {
    
        // Store the triggered events
        window.deferredPrompt = event;
    
        // Remove the hidden class from the button.
        //show install button if the app is not installed
        butInstall.classList.toggle('hidden', false);
    
      console.log ('beforeinstallprompt');
    });
    
    
    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
      
      const promptEvent = window.deferredPrompt;
    
      if (!promptEvent) {
       return;
      }
    
      
      // Show prompt
      promptEvent.prompt();
    
      // Reset the deferred prompt variable, it can only be used once.
      window.deferredPrompt = null;
      
      butInstall.classList.toggle('hidden', true);
    });
    
    // TODO: Add an handler for the `appinstalled` event
    
    
    window.addEventListener('appinstalled', (event) => {
        // Clear prompt
        window.deferredPrompt = null;
    
        butInstall.classList.toggle('hidden', true);
    }); 
      
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
      butInstall.classList.toggle('hidden', true);
    }

  }, []);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-wrap flex-row gap-3">
          <li className="">
   
          {/* Install */}
          <div className="group flex relative">
            <div className="installBtn" id="buttonInstall" role="button">Install</div>
          </div>

        </li>
                  
          <li className="">
            <Link to="/">
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/tarot.png"
                  alt="Tarot Game"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Tarot
                </span>
              </div>
              {/* Tarot */}
            </Link>
          </li>
          <li className="">
            <Link to="/store">
              {/* Store */}
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/shop.png"
                  alt="Store"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Shop
                </span>
              </div>
            </Link>
          </li>
          {/* <li className="px-1">
            <Link to="/orderHistory">Order History</Link>
          </li> */}
          <li className="">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/logout.png"
                  alt="Logout"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Logout
                </span>
              </div>
              {/* Logout */}
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
   
            {/* Install */}
            <div className="group flex relative">
              <div className="installBtn" id="buttonInstall" role="button">Install</div>
            </div>
      
          </li>
          <li className="">
            <Link to="/">
              {/* Tarot */}
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/tarot.png"
                  alt="Tarot Game"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Tarot
                </span>
              </div>
            </Link>
          </li>
          <li className="">
            <Link to="/store">
              {/* Store */}

              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/shop.png"
                  alt="Shop"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Shop
                </span>
              </div>
            </Link>
          </li>
          <li className="">
            <Link to="/signup">
              {/* Signup */}
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/signup.png"
                  alt="Sign Up"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Sign Up
                </span>
              </div>
            </Link>
          </li>
          <li className="">
            <Link to="/login">
              <div className="group flex relative">
                <img
                  className="max-w-full w-[30px] md:w-[53px]"
                  src="/src/img/icons/login.png"
                  alt="Login"
                />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                  Login
                </span>
              </div>

              {/* Login */}
            </Link>
          </li>
          <li className="cart-li">
            {/* bg-fuchsia-50 md:bg-indigo-600 */}
            <Cart />
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
