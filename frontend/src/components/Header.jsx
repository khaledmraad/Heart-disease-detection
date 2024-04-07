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
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/">
                    <button>
                      Home
                    </button>
                  </Link>
                {!logged?
                    <Link to="/login">
                    <button>
                      Login
                    </button>
                  </Link>
                :<button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button>}
            </div>
          </div>
        </nav>
    )
}
 
export default Header;