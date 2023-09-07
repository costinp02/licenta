import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/room/RoomForm.css";
import axiosInstance from "../../axios";
import { handleError } from "../../utils";

export default function StudentEdit() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  const fetchStudent = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`users/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setStudent(response.data);
    } catch (error) {
      handleError(error);
    }
  }, [id]);

  const updateStudent = useCallback(async () => {
    try {
      await axiosInstance.put(`users/students/${id}/update/`, student, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Data saved succesfully!");
    } catch (error) {
      handleError(error);
    }
  }, [id, student]);

  const handleDeleteStudent = useCallback(
    async (e) => {
      try {
        await axiosInstance.delete(`users/students/${id}/delete/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        alert("Data deleted succesfuly!");
        navigate("/admin/students-view", { replace: true });
      } catch (error) {
        handleError(error);
      }
    },
    [id, navigate],
  );

  // eslint-disable-next-line
  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleSaveChanges = async (e) => {
    debugger;
    e.preventDefault();
    await updateStudent();
  };

  return (
    <>
      <h2>Add Student</h2>
      <div className="form-container-student">
        <form onSubmit={handleSaveChanges}>
          {/* <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" required value={student.user.username || ''} onChange={e => setStudent({...student, email: e.target.value})}/>
                    </div>  CHANGE WITH TEXT THAT ONLY SHOWS THE EMAIL*/}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={student.user?.password || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  user: { ...student.user, password: e.target.value },
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              value={student.user?.first_name || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  user: { ...student.user, first_name: e.target.value },
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              value={student.user?.last_name || ""}
              onChange={(e) =>
                setStudent({
                  ...student,
                  user: { ...student.user, last_name: e.target.value },
                })
              }
            />{" "}
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <select
              id="program"
              name="program"
              value={student.program || ""}
              onChange={(e) =>
                setStudent({ ...student, program: e.target.value })
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
              value={student.year || ""}
              onChange={(e) => setStudent({ ...student, year: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="group">Group:</label>
            <input
              type="text"
              id="group"
              name="group"
              required
              value={student.group || ""}
              onChange={(e) =>
                setStudent({ ...student, group: e.target.value })
              }
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDeleteStudent}>
            Delete Student
          </button>
        </form>
      </div>
    </>
  );
}
