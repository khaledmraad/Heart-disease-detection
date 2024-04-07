import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function Signup(props) {
      
    const [loginForm, setloginForm] = useState({
      userName:"",
      email: "",
      password: ""
    })
 
    const navigate = useNavigate();
     
    function btnSignUp(event) {
        axios({
            method: "POST",
            url:"http://localhost:5000/signup",
            data:{
              email: loginForm.email,
              password: loginForm.password,
              userName: loginForm.userName
             }
        })
        .then((response) => {
          console.log("output")
            console.log(response)
            props.setToken(response.data.access_token)
            alert("Successfully Signup");
            localStorage.setItem('email', loginForm.email)
            navigate('/profile');
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
                if (error.response.status === 401) {
                    alert("email already exist");
                }
            }
        })
 
        setloginForm(({
            userName:"",
            email: "",
            password: ""}))
 
        event.preventDefault()
    }
 
    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

     
    return (
    <div>
        <div className="container h-50">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-50">
             
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">SignUp here</p>
                  </div>
  
                  <div className="form-outline mb-4">
                    <input type="email" value={loginForm.userName} onChange={handleChange} text={loginForm.userName} name="userName" id="form3Example6" className="form-control form-control-lg" placeholder="Enter a user name" />
                    <label className="form-label" for="form3Example3">User Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" value={loginForm.email} onChange={handleChange} text={loginForm.email} name="email" id="form3Example6" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>
  
              
                  <div className="form-outline mb-3">
                    <input type="password" value={loginForm.password} onChange={handleChange} text={loginForm.password} name="password" id="form3Example5" className="form-control form-control-lg" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>

  
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={btnSignUp} >SignUp</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account <a href="/login" className="link-danger">Login</a></p>
                  </div>
  
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
   
}
export default Signup;