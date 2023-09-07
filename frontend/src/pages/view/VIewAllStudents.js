import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import { handleProgram } from "../../utils";

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/users/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setStudents(response.data);
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
    fetchStudents();
  }, []);

  const listStudents = students.map((student) => (
    <div>
      <p>
        <b>{`Name: ${student.user.first_name}  ${student.user.last_name}`}</b>
      </p>

      <p>
        <b>{`Program: ${student.program}  `}</b>
      </p>

      <p>
        <b>{`Year: ${student.year}  `}</b>
      </p>
      <Link to={`/admin/student-form/edit/${student.user.id}`} className="btn">
        Edit
      </Link>
    </div>
  ));

  return (
    <>{students.length ? <div>{listStudents}</div> : <div>No students</div>}</>
  );
}
