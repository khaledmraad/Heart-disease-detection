import React, { } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

 
function Header(props) {
 
    const navigate = useNavigate();
     
    function logMeOut() {
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logout",
            logMeOut   })
        .then((response) => {
            props.token()
            localStorage.removeItem('email')
            navigate("/");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }
     
    const logged = localStorage.getItem('email');
     
    return(
      <div>
      <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="https://flowbite.com" className="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
              </a>
              <div className="flex items-center lg:order-2">
                  {!logged?
                    <Link to="/login">
                                      <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">LogIn</a>

                  </Link>
                :<a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={logMeOut}>LogOut</a>
                  }
              </div>
              <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                  <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                      <li>
                          <a className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page" href="/">Home</a>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                      </li>
                      <li>
                          <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  </header>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
                {!logged?
                    <Link to="/login">
                    <button>
                      Login
                    </button>
                  </Link>
                :<button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button>}
            </div>
            </div>
    )
}
 
export default Header;