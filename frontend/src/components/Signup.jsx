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
        <div className="flex justify-center w-full  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-7xl max-h-max">
<div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')"}}>
</div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>

        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
        </p>

        


        <form>


                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Log Into Your Account</p>
                  </div>
  
                  <div className="form-outline mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="form3Example3">User Name</label>
                  <input type="text" value={loginForm.userName} onChange={handleChange} text={loginForm.userName} name="userName" id="form3Example6" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter a user name" />

                  
                  </div>
  
              
                  <div className="form-outline mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="form3Example3">Email address</label>
                  <input type="email" value={loginForm.email} onChange={handleChange} text={loginForm.email} name="email" id="form3Example6" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter a valid email address" />

                  </div>

                  <div className="form-outline mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="form3Example4">Password</label>
                  <input type="password" value={loginForm.password} onChange={handleChange} text={loginForm.password} name="password" id="form3Example5" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter password" />
                  </div>

  
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" onClick={btnSignUp} >SignUp</button>
                  </div>
  
                </form>


       

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" href="/Login" >or log in</a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
    </div>
</div>
    </div>
  );
   
}
export default Signup;