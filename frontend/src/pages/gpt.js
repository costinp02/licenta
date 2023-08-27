// ... (other imports and setup)
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


export default function GptSchedule() {
    // ... (other state and variables)
    let schedule_data = {
        current_program: "math",
        current_year: 1
    };

    const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].name);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [courses, setCourses] = useState(availableCourses);

    const filteredCourses = availableCourses.filter( (course) => 
        course.program === selectedProgram && course.year === selectedYear)

    const handleRemoveCourse = (day, interval) => {
        const courseKey = `${day}-${interval}`;
        setSelectedCourses((prevSelectedCourses) => {
            const newSelectedCourses = { ...prevSelectedCourses };
            delete newSelectedCourses[courseKey];
            return newSelectedCourses;
        });
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === selectedCourses[courseKey]
                ? { ...course, show: true }
                : course
            )
        );
    };

     const handleCourseChange = (day, interval, courseId) => {
        const courseKey = `${day}-${interval}`;
        if (courseId) {
          setSelectedCourses((prevSelectedCourses) => ({
            ...prevSelectedCourses,
            [courseKey]: courseId
          }));
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === courseId ? { ...course, show: false } : course
            )
          );
        } else {
          setSelectedCourses((prevSelectedCourses) => {
            const newSelectedCourses = { ...prevSelectedCourses };
            delete newSelectedCourses[courseKey];
            return newSelectedCourses;
          });
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === selectedCourses[courseKey]
                ? { ...course, show: true }
                : course
            )
          );
        }
      };

    return (
        <div>
            {/* ... (other JSX) */}

            <tbody>
                {scheduleCells.map((dayData) => (
                    <tr key={dayData.day}>
                        <td>{dayData.day}</td>
                        {dayData.cells.map((cell) => (
                            <td key={cell.interval}>
                                {/* Conditionally render based on selectedCourses */}
                                {selectedCourses[`${dayData.day}-${cell.interval}`] ? (
                                    <div>
                                        <div>
                                            Course: {selectedCourses[`${dayData.day}-${cell.interval}`].name}
                                        </div>
                                        <div>
                                            Instructor: {selectedCourses[`${dayData.day}-${cell.interval}`].instructor}
                                        </div>
                                        <div>
                                            Classroom: {selectedCourses[`${dayData.day}-${cell.interval}`].classroom}
                                        </div>
                                        <button onClick={() => handleRemoveCourse(dayData.day, cell.interval)}>
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <Select
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
                                        options={filteredCourses.map((course) => ({
                                            value: course.id,
                                            label: course.name,
                                        }))}
                                        onChange={(selectedOption) => {
                                            const course = availableCourses.find(course => course.id === selectedOption.value);
                                            handleCourseChange(dayData.day, cell.interval, selectedOption.value);
                                            setSelectedCourses((prevSelectedCourses) => ({
                                                ...prevSelectedCourses,
                                                [`${dayData.day}-${cell.interval}`]: course,
                                            }));
                                        }}
                                        menuPosition="fixed"
                                    />
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </div>
    );
}
