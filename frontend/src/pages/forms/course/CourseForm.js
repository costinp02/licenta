import React from "react";
import "./CourseForm.css";
import axiosInstance from "../../../axios";

export default function CourseForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const courseData = {
        name: data.get("name"),
        course_type: data.get("course_type"),
        teacher: data.get("teacher_id"),
        credit_number: data.get("credit_number"),
        optional: data.get("optional"),
        program: data.get("program"),
        year: data.get("year"),
      };
      console.log(courseData);

      const access_token = localStorage.getItem("access_token");
      // debugger;
      const response = await axiosInstance.post(
        "/courses/create/",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      alert(`Course created succesfuly!`);
    } catch (error) {
      alert(`Something went wrong, check the data and try again.`);
      console.error("Error submitting form:", error.response.data);
    }
  };

  return (
    <>
      <h2>Add Course</h2>
      <div className="form-container-course">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Course Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="course_type">Course Type:</label>
            <select id="course_type" name="course_type">
              <option value="LECTURE">Lecture</option>
              <option value="SEMINAR">Seminar</option>
              <option value="LABORATORY">Laboratory</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="teacher_id">Teacher ID:</label>
            <input type="text" id="teacher_id" name="teacher_id" required />
          </div>
          <div className="form-group">
            <label htmlFor="credit_number">Credit Number:</label>
            <input
              type="text"
              id="credit_number"
              name="credit_number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="optional">Optional:</label>
            <select id="optional" name="optional">
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <select id="program" name="program">
              <option value="CS">Computer Science</option>
              <option value="MATH">Mathematics</option>
              <option value="CTI">CTI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input type="text" id="year" name="year" required />
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
    </>
  );
}

// function handleProgram (program) {
//     switch (program){
//         case:
//     }
// }
