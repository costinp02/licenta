import React from "react"
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="admin-home-container">
        <h2 className="admin-title">Admin Home</h2>
        <div className="admin-buttons admin-buttons-half">
            <div className="admin-buttons-column">
                <a className="admin-button" href="/admin/student-form">Add Student</a>
                <a className="admin-button" href="/admin/teacher-form">Add Teacher</a>
                <a className="admin-button" href="/admin/course-form">Add Course</a>
                <a className="admin-button" href="/admin/room-form">Add Room</a>
            </div>
            <div className="admin-buttons-column">
                <a className="admin-button" href="edit_student.html">Edit Student</a>
                <a className="admin-button" href="edit_teacher.html">Edit Teacher</a>
                <a className="admin-button" href="edit_course.html">Edit Course</a>
                <a className="admin-button" href="edit_room.html">Edit Room</a>
            </div>
        </div>
        <div className="last-button">
            <a className="admin-button view-schedule" href="/admin/schedule" >View Schedule</a>
        </div>
    </div>
    </>
  );
}

