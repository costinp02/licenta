import React, { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../axios";

export default function ViewAllCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCourses(response.data);
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
    fetchCourses();
  }, []);

  const listCourses = courses.map((course) => (
    <div>
      <p>
        <b>{`Name: ${course.name}`}</b>
      </p>

      <p>
        <b>{`Program: ${course.program}`}</b>
      </p>

      <p>
        <b>{`Teacher: ${course.teacher.user.first_name} ${course.teacher.user.last_name}`}</b>
      </p>

      <p>
        <b>{`Year: ${course.year}`}</b>
      </p>
      <a href={`/admin/course-edit/${course.id}`} className="btn">
        Edit
      </a>
    </div>
  ));

  return (
    <>{courses.length ? <div>{listCourses}</div> : <div>No courses</div>}</>
  );
}
