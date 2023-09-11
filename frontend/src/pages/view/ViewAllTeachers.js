import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import './ViewData.css';

export default function ViewAllTeachers() {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/users/teachers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
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
  }, [fetchTeachers]);

  const listTeachers = teachers.map((teacher) => (
    <div key={teacher.user.id} className="container">
      <div className="div-container">
        <p className="p">
          <b className="text">{`Name: ${teacher.user.first_name} ${teacher.user.last_name}`}</b>
        </p>
        <Link to={`/admin/teacher-form/edit/${teacher.user.id}`} className="btn">
          Edit
        </Link>
      </div>
    </div>
  ));

  return (
    <>{teachers.length ? <div>{listTeachers}</div> : <div>No teachers</div>}</>
  );
}
