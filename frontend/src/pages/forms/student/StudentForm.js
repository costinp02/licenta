import React from "react";
import "./StudentForm.css";
import axiosInstance from "../../../axios";

export default function StudentForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const studentData = {
        program: data.get("program"),
        year: data.get("year"),
        group: data.get("group"),
        user: {
          username: data.get("email"),
          password: data.get("password"),
          first_name: data.get("first_name"),
          last_name: data.get("last_name"),
          role: "STUDENT",
        },
      };

      const access_token = localStorage.getItem("access_token");
      // eslint-disable-next-line
      const response = await axiosInstance.post(
        "/users/students/",
        studentData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      alert(`Student created succesfuly!`);
    } catch (error) {
      alert(`Something went wrong, check the data and try again.`);
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <h2>Add Student</h2>
      <div className="form-container-student">
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
          <div className="form-group">
            <label htmlFor="group">Group:</label>
            <input type="text" id="group" name="group" required />
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
    </>
  );
}
