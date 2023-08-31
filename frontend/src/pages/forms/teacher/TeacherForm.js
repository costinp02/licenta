import React from "react";
import './TeacherForm.css';

export default function TeacherForm () {
    return (
        <>
            <div class="form-container">
                <h2>Add Teacher</h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" id="email" name="email" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div class="form-group">
                        <label for="first_name">First Name:</label>
                        <input type="text" id="first_name" name="first_name" required/>
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" required/>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" required/>
                    </div>
                    <button type="submit">Add Teacher</button>
                </form>
            </div>
        </>
    )
}