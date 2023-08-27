import React, { useState } from "react";
import Select from 'react-select'
import {  scheduleCells } from "../utils";
import { dummyCourses as availableCourses } from "../utils";
import './Attempt2.css'

const collegePrograms = [
    { name: "Computer Science", minYear: 1, maxYear: 3 },
    { name: "Mathematics", minYear: 1, maxYear: 3 },
    { name: "CTI", minYear: 1, maxYear: 4 }
  ];

export default function NewSchedule() {
    let schedule_data = {
        current_program: "math",
        current_year: 1
    };

    const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].name);
    const [selectedYear, setSelectedYear] = useState(1);

    const filteredCourses = availableCourses.filter( (course) => 
        course.program === selectedProgram && course.year === selectedYear)
    // console.log(filteredCourses);

    return (
        <div>

            <h2>Orar</h2>

             {/* Program Dropdown */}
            <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
            >
                {collegePrograms.map((program) => (
                <option key={program.name} value={program.name}>
                    {program.name}
                </option>
                ))}
            </select>

            {/* Year Buttons */}
            <div>
                {Array.from({ length: selectedProgram === "CTI" ? 4 : 3 }, (_, index) => index + 1).map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={selectedYear === year ? "selected" : ""}
                    >
                        Year {year}
                    </button>
                ))}
            </div>
            
            {/* Schedule Table */}
            <table className="schedule">
                <thead>
                    <tr>
                        <th>Day/Interval</th>
                        <th>8:00-9:50</th>
                        <th>10:00-11:50</th>
                        <th>12:00-13:50</th>
                        <th>14:00-15:50</th>
                        <th>16:00-17:50</th>
                        <th>18:00-19:50</th>
                    </tr>
                </thead>

                <tbody>
                    {scheduleCells.map((dailySchedule) => (
                        <tr key={dailySchedule.day}>
                            <td>{dailySchedule.day}</td>
                            {dailySchedule.cells.map((scheduleCell) => (
                                <td key={scheduleCell.interval}>
                                    

                                    <Select
                                    defaultValue={{value: "default", label: "Select Course..."}} 
                                    styles={{
                                        
    
                                            menu: (baseStyles, state) =>({
                                                ...baseStyles.menu,
                                                whiteSpace: 'normal', // Allow text to wrap within the option
                                                lineHeight: '1.2',   // Adjust line height for better readability
                                                position: 'absolute',
                                                marginTop: '4px',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                            }),

                                            option: (baseStyles, state) => ({
                                                ...baseStyles,
                                                whiteSpace: 'normal', // Allow text to wrap within the option
                                                lineHeight: '1.2',   // Adjust line height for better readability
                                                backgroundColor: '#8C92AC'
                                            }),

                                            container: (baseStyles, state) => ({
                                                ...baseStyles,
                                                whiteSpace: 'normal', // Allow text to wrap within the option
                                                lineHeight: '1.2',   // Adjust line height for better readability
                                            }),
                                            singleValue: (provided, state) => ({
                                                ...provided,
                                                wordWrap: 'break-word', // Use 'break-word' to wrap long words
                                            }),
                                        
                                    }}
                                    options={filteredCourses.map(course => ({
                                        value: course.id,
                                        label: course.name
                                    }))}
                                    menuPosition="fixed"
                                    
                                    
                                    />

                                    

                                </td>
                        ))}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}