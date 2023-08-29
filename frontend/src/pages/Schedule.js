// ... (other imports and setup)
import React, { useCallback, useState } from "react";
import { ScheduleCell } from "../components/ScheduleCell";
import { dummyCourses as availableCourses, rooms, scheduleCells } from "../utils";
import "./Schedule.css";
import  Select from "react-select";
import axiosInstance from "../axios";

const collegePrograms = [
  { name: "Computer Science", minYear: 1, maxYear: 3 },
  { name: "Mathematics", minYear: 1, maxYear: 3 },
  { name: "CTI", minYear: 1, maxYear: 4 },
];

export default function Schedule() {

  const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].name,);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCourses2, setSelectedCourses2] = useState({});
  const [selectedRooms2, setSelectedRooms2] = useState({});
  const [classrooms, setClassrooms] = useState([])
  
  const addShowField = () => {
    const newArray = classrooms.map(obj => ({
      ...obj,
      show: true
    }));
    setClassrooms(newArray);
  };

  axiosInstance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
      return config;
    },
    error => {
      console.log(error);
    }
  )

    

  const fetchRooms = useCallback( async () => {
    try {
      const result = await axiosInstance.get('/classrooms/');
      setClassrooms(result.data); 
      
      console.log(classrooms);
    }catch(error){
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
  });


  

  // console.log(JSON.stringify(selectedCourses2));
  console.log(`Courses: ${JSON.stringify(selectedCourses2, null, 2)}`);
  console.log(`Rooms: ${JSON.stringify(selectedRooms2, null, 2)}`);


  const filteredCourses = availableCourses.filter((course) =>
      course.program === selectedProgram && course.year === selectedYear && course.show === true);
  const filteredRooms = rooms.filter((room) => room.show === true);
  
  
  const newHandleCourseChange = (day, interval, courseId) => {
    // debugger;
    const courseKey = `${day}-${interval}`;
    if(selectedCourses2[selectedProgram]?.[selectedYear]?.[courseKey]){
      selectedCourses2[selectedProgram][selectedYear][courseKey].show = true;
    }

    filteredCourses.find(course => course.id === courseId).show = false;

  }

  const newHandleRoomChange = (day, interval, roomId) => {
    const roomKey = `${day}-${interval}`;
    if(selectedRooms2[selectedProgram]?.[selectedYear]?.[roomKey]){
      selectedRooms2[selectedProgram][selectedYear][roomKey].show = true;
    }
    // const newSelectedRooms = {
    //   ...selectedRooms2,
    //   [selectedProgram]: {
    //     ...selectedCourses2[selectedProgram],
    //     [selectedYear]: {
    //       ...selectedCourses2[selectedProgram]?.[selectedYear],
    //       [roomKey]: roomId,
    //     }
    //   }
    // };
    filteredRooms.find( room => room.id === roomId).show = false;
    // setSelectedRooms2(newSelectedRooms);
  }

  const handleRemoveCourseAndRoom2 = (day, interval) => {
    // debugger;
    const mapKey = `${day}-${interval}`;
    selectedCourses2[selectedProgram][selectedYear][mapKey].show = true;
    selectedRooms2[selectedProgram][selectedYear][mapKey].show = true;
    const newSelectedCourses = {
      ...selectedCourses2,
      [selectedProgram]: {
        ...selectedCourses2[selectedProgram],
        [selectedYear]: {
          ...selectedCourses2[selectedProgram]?.[selectedYear]
        },
      },
    };
    
    delete newSelectedCourses[selectedProgram][selectedYear][mapKey];  
    setSelectedCourses2(newSelectedCourses);
    
    const newSelectedRooms = {
      ...selectedRooms2,
      [selectedProgram]: {
        ...selectedRooms2[selectedProgram],
        [selectedYear]: {
          ...selectedRooms2[selectedProgram]?.[selectedYear]
        },
      },
    };
    
    delete newSelectedRooms[selectedProgram][selectedYear][mapKey];
    setSelectedRooms2(newSelectedRooms);
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
          value: program.name,
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
                {/* Conditionally render based on selectedCourses */}
                {selectedCourses2[selectedProgram]?.[selectedYear]?.[`${dayData.day}-${cell.interval}`] && selectedRooms2[selectedProgram]?.[selectedYear]?.[`${dayData.day}-${cell.interval}`] ? (
                  <div>
                    <div>
                      {selectedCourses2[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`].name}
                    </div>
                    <div>
                      {
                        selectedCourses2[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`]
                          .teacherId
                      }
                    </div>
                    <div>
                      {
                        selectedRooms2[selectedProgram][selectedYear][`${dayData.day}-${cell.interval}`]
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

                      selectedCourses2={selectedCourses2}
                      handleCourseChange2={newHandleCourseChange}
                      setSelectedCourses2={setSelectedCourses2}

                      selectedRooms2={selectedRooms2}
                      setSelectedRooms2={setSelectedRooms2}
                      handleRoomChange2={newHandleRoomChange}

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
        <button onClick={() => {fetchRooms(); addShowField();}}>Save changes</button>
      </div>
    </div>
  );
}


// selectedCourses[`${dayData.day}-${cell.interval}`] && selectedRooms[`${dayData.day}-${cell.interval}`]