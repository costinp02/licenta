import React from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
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
          <a className="admin-button view-schedule" href="/admin/schedule">
            View Schedule
          </a>
        </div>
      </div>
    </>
  );
}
