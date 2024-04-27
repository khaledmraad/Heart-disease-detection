import React, { } from 'react';
import './App.css';
   
import {BrowserRouter, Routes, Route} from 'react-router-dom';
 
import Login from './components/Login'
import Header from './components/Header'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Home from './components/Home';
import useToken from './components/useToken'
 
function App() {
     
    const { token, removeToken, setToken } = useToken();
     
    return (
             
          <BrowserRouter>
            <Header token={removeToken}/>
            <Routes>
              <Route exact path="/" element={<Home/>}>
                  </Route>
                  </Routes>
            {!token && token!=="" &&token!== undefined?  
            <>
            <Routes>
                  <Route exact path="/login" element={<Login setToken={setToken}/>}>
                  </Route>
                  <Route exact path="/register" element={<Signup setToken={setToken}/>}></Route>
                </Routes>
            </>
            :(
              <>
                <Routes>
                  <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
                </Routes>
              </>
            )}
          </BrowserRouter>
    );
}
     
export default App;