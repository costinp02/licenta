// ... (other imports and setup)
import React, { useState } from "react";
import { ScheduleCell } from "../components/ScheduleCell";
import { dummyCourses as availableCourses, rooms, scheduleCells } from "../utils";
import "./Schedule.css";
import  Select from "react-select";

const collegePrograms = [
  { name: "Computer Science", minYear: 1, maxYear: 3 },
  { name: "Mathematics", minYear: 1, maxYear: 3 },
  { name: "CTI", minYear: 1, maxYear: 4 },
];

export default function Schedule() {

  const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].name,);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectedRooms, setSelectedRooms] = useState({});
  const [selectedCoursesByProgramAndYear, setSelectedCoursesByProgramAndYear] = useState({});


  const filteredCourses = availableCourses.filter((course) =>
      course.program === selectedProgram && course.year === selectedYear && course.show === true);
  const filteredRooms = rooms.filter((room) => room.show === true);
  
  
  const newHandleCourseChange = (day, interval, courseId) => {
    // debugger;
    const courseKey = `${day}-${interval}`;
    const newSelectedCourses = {
      ...selectedCoursesByProgramAndYear,
      [selectedProgram]: {
        ...selectedCoursesByProgramAndYear[selectedProgram],
        [selectedYear]: {
          ...selectedCoursesByProgramAndYear[selectedProgram]?.[selectedYear],
          [courseKey]: courseId,
        },
      },
    };
    filteredCourses.find(course => course.id === courseId).show = false;
    setSelectedCoursesByProgramAndYear(newSelectedCourses);
    
    
  }

  const handleRemoveCourseAndRoom = (day, interval) => {
    const courseKey = `${day}-${interval}`;
    const roomKey = `${day}-${interval}`;
    setSelectedCourses((prevSelectedCourses) => {
      const newSelectedCourses = { ...prevSelectedCourses };
      newSelectedCourses[courseKey].show = true;
      delete newSelectedCourses[courseKey];
      return newSelectedCourses;
    });
    setSelectedRooms((prevSelectedRooms) => {
      const newSelectedRooms = {...prevSelectedRooms};
      newSelectedRooms[roomKey].show = true;
      delete newSelectedRooms[roomKey];
      return newSelectedRooms
    });
  };

  const handleCourseChange = (day, interval, courseId) => {
    const courseKey = `${day}-${interval}`;
    if(selectedCourses[courseKey]){
      selectedCourses[courseKey].show = true;
    }

      setSelectedCourses(() => ({
        ...selectedCourses,
        [courseKey]: courseId,
      }));
      filteredCourses.find(course => course.id === courseId).show = false;
  };

  const handleRoomChange = (day, interval, roomId) => {
    const roomKey = `${day}-${interval}`;
      setSelectedRooms((prevSelectedRooms) => ({
        ...prevSelectedRooms,
        [roomKey]: roomId,
      }));
      rooms.find(room => room.id === roomId).show = false;
  };

  return (
    <div>
      <h2>Orar</h2>
      {/* Program Dropdown */}

      <Select
        styles={{
          menu: (baseStyles) => ({
            ...baseStyles.menu,
            whiteSpace: "normal", // Allow text to wrap within the option
            lineHeight: "1.2", // Adjust line height for better readability
            position: "absolute",
          }),

          option: (baseStyles) => ({
            ...baseStyles,
            whiteSpace: "normal", 
            lineHeight: "1.2", 
            backgroundColor: "#8C92AC",
          }),
          singleValue: (provided) => ({
            ...provided,
            wordWrap: "break-word", // Use 'break-word' to wrap long words
          }),
        }}

        options={collegePrograms.map((program) => ({
          value: program.name,
          label: program.name
        }))}

        value={{ value: selectedProgram, label: selectedProgram }}

        onChange={(selectedOption) => {
          setSelectedProgram(selectedOption.value); 
          setSelectedYear(1)
        }}
      />

      {/* Year Buttons */}
      <div>
        {Array.from(
          { length: selectedProgram === "CTI" ? 4 : 3 },
          (_, index) => index + 1,
        ).map((year) => (
          <button
            key={year}
            onClick={() => {setSelectedYear(year)}}
            className={selectedYear === year ? "selected" : ""}
          >
            Year {year}
          </button>
        ))}
      </div>

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
        {scheduleCells.map((dayData) => (
          <tr key={dayData.day}>
            <th>{dayData.day}</th>
            {dayData.cells.map((cell) => (
              <td key={cell.interval}>
                {/* Conditionally render based on selectedCourses */}
                {selectedCourses[`${dayData.day}-${cell.interval}`] && selectedRooms[`${dayData.day}-${cell.interval}`] ? (
                  <div>
                    <div>
                      {selectedCourses[`${dayData.day}-${cell.interval}`].name}
                    </div>
                    <div>
                      {
                        selectedCourses[`${dayData.day}-${cell.interval}`]
                          .teacherId
                      }
                    </div>
                    <div>
                      {
                        selectedRooms[`${dayData.day}-${cell.interval}`]
                          .name
                      }
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveCourseAndRoom(dayData.day, cell.interval)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <ScheduleCell
                      dayData={dayData}
                      cell={cell}
                      selectedCourses={selectedCourses}
                      setSelectedCourses={setSelectedCourses}
                      handleCourseChange={handleCourseChange}
                      filteredCourses={filteredCourses}
                      rooms={filteredRooms}
                      selectedRooms={selectedRooms}
                      setSelectedRooms={setSelectedRooms}
                      handleRoomChange={handleRoomChange}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      
    </div>
  );
}
