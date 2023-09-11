import React, { useCallback } from "react";
import "./AdminDashboard.css";
import { handleError } from "../../utils";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const fetchSchedules = useCallback(async () => {
    try{
      const response = await axiosInstance.get("/schedules", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;

    } catch (error) {
      handleError(error);
    }
  }, [])

  const handleCreateSchedule = useCallback( async (e) => {
    e.preventDefault();
    const schedules = await fetchSchedules();
    if (schedules && schedules.length > 0 ){ 
      navigate("/admin/schedule-warning");
    } else {
      navigate("/admin/schedule");
    }
  }, [fetchSchedules, navigate])
  return (
    <>
      <div className="admin-home-container">
        <h2 className="admin-title">Admin Home</h2>
        <div className="admin-buttons admin-buttons-half">
          <div className="admin-buttons-column">
            <a className="admin-button" href="/admin/student-form">
              Add Student
            </a>
            <a className="admin-button" href="/admin/teacher-form">
              Add Teacher
            </a>
            <a className="admin-button" href="/admin/course-form">
              Add Course
            </a>
            <a className="admin-button" href="/admin/room-form">
              Add Room
            </a>
          </div>
          <div className="admin-buttons-column">
            <a className="admin-button" href="/admin/students-view">
              Edit Student
            </a>
            <a className="admin-button" href="/admin/teachers-view">
              Edit Teacher
            </a>
            <a className="admin-button" href="/admin/courses-view">
              Edit Course
            </a>
            <a className="admin-button" href="/admin/rooms-view">
              Edit Room
            </a>
          </div>
        </div>
        <div className="last-button">
        {/* eslint-disable-next-line */}
          <a className="admin-button view-schedule" onClick={handleCreateSchedule}>
            Create Schedule
          </a>
        </div>
      </div>
    </>
  );
}
