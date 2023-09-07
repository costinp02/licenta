import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/room/RoomForm.css";
import axiosInstance from "../../axios";
import { handleError } from "../../utils";

export default function TeacherEdit() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({});
    const navigate = useNavigate();
  
    const fetchTeacher = useCallback(async () => {
      try {
        const response = await axiosInstance.get(`users/teachers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setTeacher(response.data);
      } catch (error) {
        handleError(error);
      }
    }, [id]);
  
    const updateTeacher = useCallback(async () => {
      try {
        await axiosInstance.put(`users/teachers/${id}/update/`, teacher, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        alert("Data saved succesfully!");
      } catch (error) {
        handleError(error);
      }
    }, [id, teacher]);
  
    const handleDeleteTeacher = useCallback(
      async (e) => {
        try {
          await axiosInstance.delete(`users/teachers/${id}/delete/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          alert("Data deleted succesfuly!");
          navigate("/admin/teachers-view", { replace: true });
        } catch (error) {
          handleError(error);
        }
      },
      [id, navigate],
    );
  
    // eslint-disable-next-line
    useEffect(() => {
      fetchTeacher();
    }, [fetchTeacher]);
  
    const handleSaveChanges = async (e) => {
      debugger;
      e.preventDefault();
      await updateTeacher();
    };
  
    return (
      <>
        <h2>Edit teacher</h2>
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
                value={teacher.user?.password || ""}
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    user: { ...teacher.user, password: e.target.value },
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
                value={teacher.user?.first_name || ""}
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    user: { ...teacher.user, first_name: e.target.value },
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
                value={teacher.user?.last_name || ""}
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    user: { ...teacher.user, last_name: e.target.value },
                  })
                }
              />{" "}
            </div>
            
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleDeleteTeacher}>
              Delete Teacher
            </button>
          </form>
        </div>
      </>
    );
  }
  