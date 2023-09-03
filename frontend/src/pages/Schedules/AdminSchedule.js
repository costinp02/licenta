import React, { useCallback, useEffect, useState } from "react";
import { ScheduleCell } from "../../components/ScheduleCell";
import { rooms, scheduleCells, collegePrograms } from "../../utils";

import "./Schedule.css";
import  Select from "react-select";
import axiosInstance from "../../axios";


export default function AdminSchedule() {

  const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].id,);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectedRooms, setSelectedRooms] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  


  axiosInstance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
      return config;
    },
    error => {
      console.log('error');
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error) {
        console.log(` eroare ${error}`);
        // Handle token expiration here
      }
      return Promise.reject(error);
    }
  );  

  const fetchRooms = useCallback( async () => {
    try {
      // debugger;
      const response = await axiosInstance.get('/classrooms/', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    });
      

      response.data.forEach((room) => {room.show = true})
      // debugger;
      setClassrooms(response.data); 
      
      // console.log(classrooms);
    }catch(error){
      debugger;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        console.log("Error status:", status);
        console.log("Error message:", data.message);
        // Update state with the error message for displaying on the sign-in page
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error);
      }
    }
  }, []);

  const fetchCourses = useCallback( async () => {
    try{
      const result = await axiosInstance.get('/courses/');
      result.data.forEach((course) => {course.show = true});
      setCourses(result.data);
    } catch(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        console.log("Error status:", status);
        console.log("Error message:", data.message);
        // Update state with the error message for displaying on the sign-in page
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
    }
  }, [])

  useEffect(() => {
    fetchRooms(); 
  }, [])

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.program === selectedProgram &&
      course.year === selectedYear &&
      course.show === true
    );

    const filteredRooms = classrooms.filter((room) => room.show === true);
  
    // Update your state with filteredCourses
    setFilteredCourses(filteredCourses);
    setFilteredRooms(filteredRooms)
  }, [courses, selectedProgram, selectedYear]);
  

  console.log(`Courses: ${JSON.stringify(selectedCourses, null, 2)}`);
  console.log(`Rooms: ${JSON.stringify(selectedRooms, null, 2)}`);

 
  const handleCourseChange = (day, interval, courseId) => {
    // debugger;
    const courseKey = `${day}-${interval}`;
    if(selectedCourses[selectedProgram]?.[selectedYear]?.[courseKey]){
      selectedCourses[selectedProgram][selectedYear][courseKey].show = true;
    }

    filteredCourses.find(course => course.id === courseId).show = false;

  }

  const handleRoomChange = (day, interval, roomId) => {
    const roomKey = `${day}-${interval}`;
    if(selectedRooms[selectedProgram]?.[selectedYear]?.[roomKey]){
      selectedRooms[selectedProgram][selectedYear][roomKey].show = true;
    }
    // debugger;
    filteredRooms.find( room => room.id === roomId).show = false;
  }

  const handleRemoveCourseAndRoom2 = (day, interval) => {
    // debugger;
    const mapKey = `${day}-${interval}`;
    selectedCourses[selectedProgram][selectedYear][mapKey].show = true;
    selectedRooms[selectedProgram][selectedYear][mapKey].show = true;
    const newSelectedCourses = {
      ...selectedCourses,
      [selectedProgram]: {
        ...selectedCourses[selectedProgram],
        [selectedYear]: {
          ...selectedCourses[selectedProgram]?.[selectedYear]
        },
      },
    };
    
    delete newSelectedCourses[selectedProgram][selectedYear][mapKey];  
    setSelectedCourses(newSelectedCourses);
    
    const newSelectedRooms = {
      ...selectedRooms,
      [selectedProgram]: {
        ...selectedRooms[selectedProgram],
        [selectedYear]: {
          ...selectedRooms[selectedProgram]?.[selectedYear]
        },
      },
    };
    
    delete newSelectedRooms[selectedProgram][selectedYear][mapKey];
    setSelectedRooms(newSelectedRooms);
  }


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

          option: (baseStyles, { isFocused, isSelected }) => ({
            ...baseStyles,
            whiteSpace: "normal",
            lineHeight: "1.2",
            backgroundColor: isSelected
              ? "#3f87a6"
              : isFocused
                ? "#fff"
                : "#fff",
            color: isSelected ? "#fff" : "#333",
            cursor: "pointer",
          }),

          singleValue: provided => ({
              ...provided,
              wordWrap: "break-word",
              color: "#333",
            }),

            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              borderColor: isFocused ? "#3f87a6" : "#ccc",
              boxShadow: isFocused ? "0px 0px 5px rgba(63, 135, 166, 0.5)" : "none",
              "&:hover": {
                borderColor: isFocused ? "#3f87a6" : "#999",
              },
              width: 250,

            }),
        }}

        options={collegePrograms.map((program) => ({
          value: program.id,
          label: program.name
        }))}

        value={{ value: selectedProgram, label: selectedProgram }}

        onChange={(selectedOption) => {
          setSelectedProgram(selectedOption.value); 
          setSelectedYear(1)
        }}

        menuPosition="fixed"
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
            className={selectedYear === year ? "year-button selected" : "year-button"}
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
                {selectedCourses[selectedProgram]?.[selectedYear]?.[`${dayData.day}-${cell.interval}`] && 
                selectedRooms[selectedProgram]?.[selectedYear]?.[`${dayData.day}-${cell.interval}`] ? (
                  <div>
                    <div>
                      {selectedCourses[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`].name}
                    </div>
                    <div>
                      { 
                        `${selectedCourses[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`]
                        .teacher.user.first_name} ${selectedCourses[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`]
                        .teacher.user.last_name}`
                      }
                    </div>
                    <div>
                      {
                        selectedRooms[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`]
                          .name
                      }
                    </div>
                    <button
                      onClick={() =>{
                        handleRemoveCourseAndRoom2(dayData.day, cell.interval);
                      }
                        
                      }
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <ScheduleCell
                      dayData={dayData}
                      cell={cell}

                      filteredCourses={filteredCourses}
                      rooms={filteredRooms}

                      selectedCourses={selectedCourses}
                      handleCourseChange={handleCourseChange}
                      setSelectedCourses={setSelectedCourses}

                      selectedRooms={selectedRooms}
                      setSelectedRooms={setSelectedRooms}
                      handleRoomChange={handleRoomChange}

                      selectedProgram={selectedProgram}
                      selectedYear={selectedYear}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      <div>
        <button onClick={() => { debugger;console.log(`fetched rooms: ${JSON.stringify(classrooms)}`); console.log(`fetched courses: ${JSON.stringify(courses)}`)}}>Save changes</button>
      </div>
    </div>
  );
}
