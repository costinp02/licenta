import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/room/RoomForm.css";
import axiosInstance from "../../axios";
import { handleError } from "../../utils";

export default function RoomEdit() {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const navigate = useNavigate();

  const fetchRoom = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`classrooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRoom(response.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateRoom = useCallback(async () => {
    try {
      await axiosInstance.put(`classrooms/${id}/update/`, room, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Data saved succesfully!");
    } catch (error) {
      handleError(error);
    }
  });

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleSaveChanges = async (e) => {
    debugger;
    e.preventDefault();
    await updateRoom();
  };

  const handleDeleteRoom = useCallback(async () => {
    try {
      await axiosInstance.delete(`classrooms/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Data deleted succesfuly!");
      navigate("/admin/rooms-view", { replace: true });
    } catch (error) {
      handleError(error);
    }
  }, [id, navigate]);

  return (
    <>
      <h2>Edit Room</h2>
      <div className="form-container-room">
        <form onSubmit={handleSaveChanges}>
          <div className="form-group">
            <label htmlFor="name">Room Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={room.name || ""}
              onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              required
              value={room.capacity || ""}
              onChange={(e) => setRoom({ ...room, capacity: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="floor">Floor:</label>
            {/* different logic so we can have floor=0 */}
            <input
              type="text"
              id="floor"
              name="floor"
              required
              value={
                room.floor !== undefined && room.floor !== null
                  ? room.floor
                  : ""
              }
              onChange={(e) => setRoom({ ...room, floor: e.target.value })}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDeleteRoom}>
            Delete Room
          </button>
        </form>
      </div>
    </>
  );
}
