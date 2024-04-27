import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile(props) {
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({
        age: '',
        sex: '1',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '0',
        restecg: '',
        thalach: '',
        exang: '0',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: '2'
    });

    useEffect(() => {
        getUsers();
    }, []);

    const email = localStorage.getItem('email');

    function getUsers() {
        axios({
            method: "GET",
            url: `http://localhost:5000/profile/${email}`,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            setProfileData({
                profile_name: res.name,
                profile_email: res.email
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            console.log("the response")
            console.log(response.data);
            alert((parseInt(response.data["prediction"])==1 ? "ur have high probability of heart disease" : "ur good"))
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col col-lg-12">
                    <div className="card mb-3">
                        {profileData && (
                            <div className="row g-0">
                                <h5>username: {profileData.profile_name}</h5>
                                <h5>email: {profileData.profile_email}</h5>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="age">Age:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="age" name="age" value={formData.age} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="sex">Sex:</label>
                                <select className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="sex" name="sex" value={formData.sex} onChange={handleInputChange} required>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <br/>
                            
                            <div className="form-group">
                                <label htmlFor="cp">Chest Pain Type:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="cp" name="cp" value={formData.cp} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="trestbps">Resting Blood Pressure (mm Hg):</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="chol">Serum Cholesterol (mg/dL):</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="chol" name="chol" value={formData.chol} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="fbs">Fasting Blood Sugar (> 120 mg/dL):</label>
                                <select className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fbs" name="fbs" value={formData.fbs} onChange={handleInputChange} required>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="restecg">Resting Electrocardiographic Results:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="restecg" name="restecg" value={formData.restecg} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="thalach">Maximum Heart Rate Achieved:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="thalach" name="thalach" value={formData.thalach} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="exang">Exercise Induced Angina:</label>
                                <select className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="exang" name="exang" value={formData.exang} onChange={handleInputChange} required>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="oldpeak">ST Depression Induced by Exercise Relative to Rest:</label>
                                <input type="number" step="0.01" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="slope">Slope of the Peak Exercise ST Segment:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="slope" name="slope" value={formData.slope} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="ca">Number of Major Vessels (0-3) Colored by Flourosopy:</label>
                                <input type="number" className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="ca" name="ca" value={formData.ca} onChange={handleInputChange} required/>
                            </div>
                            <br/>

                            <div className="form-group">
                                <label htmlFor="thal">Thalassemia:</label>
                                <select className="block p-4  border border-gray-300 rounded-lg text-base dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="thal" name="thal" value={formData.thal} onChange={handleInputChange} required>
                                    <option value="2">Normal</option>
                                    <option value="3">Fixed Defect</option>
                                    <option value="4">Reversible Defect</option>
                                </select>
                            </div>
                            <br/>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Predict </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
