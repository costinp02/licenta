import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/course/CourseForm.css";
import axiosInstance from "../../axios";
import { handleError } from "../../utils";

export default function CourseEdit() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

  const fetchCourse = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCourse(response.data);
    } catch (error) {
      handleError(error);
    }
  }, [id]);

  const updateCourse = useCallback(async () => {
    try {
      await axiosInstance.put(`courses/${id}/update/`, course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Data saved succesfully!");
    } catch (error) {
      handleError(error);
    }
  }, [id, course]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleSaveChanges = async (e) => {
    debugger;
    e.preventDefault();
    await updateCourse();
  };

  const handleDeleteCourse = useCallback(async () => {
    try {
      await axiosInstance.delete(`courses/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Data deleted succesfuly!");
      navigate("/admin/courses-view", { replace: true });
    } catch (error) {
      handleError(error);
    }
  }, [id, navigate]);

  return (
    <>
      <h2>Add Course</h2>
      <div className="form-container-course">
        <form onSubmit={handleSaveChanges}>
          <div className="form-group">
            <label htmlFor="name">Course Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={course.name || ""}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="course_type">Course Type:</label>
            <select
              id="course_type"
              name="course_type"
              value={course.course_type}
              onChange={(e) =>
                setCourse({ ...course, course_type: e.target.value })
              }
            >
              <option value="LECTURE">Lecture</option>
              <option value="SEMINAR">Seminar</option>
              <option value="LABORATORY">Laboratory</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="teacher_id">Teacher ID:</label>
            <input
              type="text"
              id="teacher_id"
              name="teacher_id"
              required
              value={course.teacher || ""}
              onChange={(e) =>
                setCourse((prev) => ({
                  ...prev,
                  teacher: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="credit_number">Credit Number:</label>
            <input
              type="text"
              id="credit_number"
              name="credit_number"
              required
              value={course.credit_number || ""}
              onChange={(e) =>
                setCourse({ ...course, credit_number: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="optional">Optional:</label>
            <select
              id="optional"
              name="optional"
              required
              value={course.optional}
              onChange={(e) =>
                setCourse({ ...course, optional: e.target.value })
              }
            >
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <select
              id="program"
              name="program"
              required
              value={course.program}
              onChange={(e) =>
                setCourse({ ...course, program: e.target.value })
              }
            >
              <option value="CS">Computer Science</option>
              <option value="MATH">Mathematics</option>
              <option value="CTI">CTI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              name="year"
              required
              value={course.year || ""}
              onChange={(e) => setCourse({ ...course, year: e.target.value })}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDeleteCourse}>
            Delete Course
          </button>
        </form>
      </div>
    </>
  );
}
