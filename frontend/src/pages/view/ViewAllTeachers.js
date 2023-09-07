import React, { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../axios";

export default function ViewAllTeachers(){
    const [teachers, setTeachers] = useState([]);

    const fetchTeachers = useCallback (async () => {
        try{
            const response = await axiosInstance.get('/users/teachers', {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setTeachers(response.data);

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const { status, data } = error.response;
                console.log("Error status:", status);
                console.log("Error message:", data.message);
                // Update state with the error message for displaying on the sign-in page
              } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:", error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error:", error);
              }
        }
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [])

    const listTeachers = teachers.map(teacher => 
        <div>
            <p>
                <b>{`Name: ${teacher.user.first_name} ${teacher.user.last_name}`}</b>
            </p>
            <a href={`/admin/teacher-edit/${teacher.id}`} className="btn">Edit</a>
        </div>
    )

    return (
        <>
            {teachers.length ?
                <div>{listTeachers}</div>
                    : <div>No teachers</div>    
            }
        </>
    )
}