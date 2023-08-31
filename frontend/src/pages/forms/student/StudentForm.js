import React from "react";
import './StudentForm.css'

export default function StudentForm () {
    return (
        <>
            <div class="form-container">
                <h2>Add Student</h2>
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
                    <div class="form-group">
                        <label for="program">Program:</label>
                        <select id="program" name="program">
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="CTI">CTI</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="year">Year:</label>
                        <input type="text" id="year" name="year" required/>
                    </div>
                    <div class="form-group">
                        <label for="group">Group:</label>
                        <input type="text" id="group" name="group" required/>
                    </div>
                    <button type="submit">Add Student</button>
                </form>
            </div>
        </>
    )
}