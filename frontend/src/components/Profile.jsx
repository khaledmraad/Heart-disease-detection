import React, { useState, useEffect } from "react";
import axios from "axios";
 
function Profile(props) {
 
    const [profileData, setProfileData] = useState(null)
     
    useEffect(() => {
        getUsers();
    }, []);
     
    const email = localStorage.getItem('email');
     
    function getUsers() { 
        axios({
          method: "GET",
          url:`http://localhost:5000/profile/${email}`, 
          headers: {
            Authorization: 'Bearer ' + props.token
          }
        })
        .then((response) => {
            console.log(response)
          const res =response.data
          res.access_token && props.setToken(res.access_token)
          setProfileData(({
            profile_name: res.name,
            profile_email: res.email}))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    }
     
    let imgs = [
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
    ];
 
 
  return (
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-50">
          <div className="col col-lg-12">
                <div className="card mb-3">
                 
                    {profileData && <div className="row g-0">
                   <h5>{profileData.profile_name}</h5>

                    <div className="col-md-8">
                        <div className="card-body p-4">
                            <h6>Your profile details:</h6>
                             
                            <div className="row pt-1">
                            <div className="col-6 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">{profileData.profile_email}</p>
                            </div>
                            <div className="col-6 mb-3">
                                <h6>Phone</h6>
                                <p className="text-muted">123 456 789</p>
                            </div>
                            </div>
                            
                        </div>
                    </div>    
 
                </div>
                }
            </div>
          </div>
        </div>
    </div>
  );
}
 
export default Profile;