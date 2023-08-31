import React from "react";
import './CourseForm.css';

export default function CourseForm () {
    return (
        <>
            <div class="form-container">
                <h2>Add Course</h2>
                <form>
                    <div class="form-group">
                        <label for="name">Course Name:</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div class="form-group">
                        <label for="course_type">Course Type:</label>
                        <select id="course_type" name="course_type">
                            <option value="Lecture">Lecture</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Laboratory">Laboratory</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="teacher_id">Teacher ID:</label>
                        <input type="text" id="teacher_id" name="teacher_id" required/>
                    </div>
                    <div class="form-group">
                        <label for="credit_number">Credit Number:</label>
                        <input type="text" id="credit_number" name="credit_number" required/>
                    </div>
                    <div class="form-group">
                        <label for="optional">Optional:</label>
                        <select id="optional" name="optional">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
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
                    <button type="submit">Add Course</button>
                </form>
            </div>
        </>
    )
        
    
}