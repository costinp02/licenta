import React from "react";
import './RoomForm.css'
import axiosInstance from "../../../axios";

export default function RoomForm () {
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const roomData = {
                name: data.get("name"),
                capacity: data.get("capacity"),
                floor: data.get("floor")
            }
            console.log(roomData);
            const access_token = localStorage.getItem('access_token');
            const response = await axiosInstance.post('/classrooms/', roomData, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            alert(`Classroom created succesfuly!`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h2>Add Room</h2>
            <div className="form-container-room">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Room Name:</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacity:</label>
                        <input type="text" id="capacity" name="capacity" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="floor">Floor:</label>
                        <input type="text" id="floor" name="floor" required/>
                    </div>
                    <button type="submit">Add Room</button>
                </form>
            </div>
        </>
    )
}