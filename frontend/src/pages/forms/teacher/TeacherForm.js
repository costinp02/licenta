import React from "react";
import './TeacherForm.css';
import axiosInstance from "../../../axios";

export default function TeacherForm () {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const teacherData = {
                phone: data.get("phone"),
                user: {
                    username: data.get("email"),
                    password: data.get("password"),  
                    first_name: data.get("first_name"),
                    last_name: data.get("last_name"),
                    role: "TEACHER"  
                },
                
            };

            const access_token = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/users/teachers/', teacherData, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            alert(`Teacher created succesfuly!`);
        } catch (error) {
            alert(`Something went wrong, check the data and try again.`);
            console.error("Error submitting form:", error);
        }
    }

    return (
        <>
            <h2>Add Teacher</h2>
            <div className="form-container-teacher">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" id="first_name" name="first_name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" required />
                    </div>
                    <button type="submit" >Add Teacher</button>
                </form>
            </div>
        </>
    )
}