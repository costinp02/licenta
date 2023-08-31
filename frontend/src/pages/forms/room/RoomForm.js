import React from "react";
import './RoomForm.css'

export default function RoomForm () {
    return (
        <>
            <div class="form-container">
                <h2>Add Room</h2>
                <form>
                    <div class="form-group">
                        <label for="name">Room Name:</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div class="form-group">
                        <label for="capacity">Capacity:</label>
                        <input type="text" id="capacity" name="capacity" required/>
                    </div>
                    <div class="form-group">
                        <label for="floor">Floor:</label>
                        <input type="text" id="floor" name="floor" required/>
                    </div>
                    <button type="submit">Add Room</button>
                </form>
            </div>
        </>
    )
}