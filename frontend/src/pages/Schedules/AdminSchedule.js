import React, { useCallback, useEffect, useState } from "react";
import { ScheduleCell } from "../../components/ScheduleCell";
import { scheduleCells, collegePrograms, handleError } from "../../utils";
import "./Schedule.css";
import Select from "react-select";
import axiosInstance from "../../axios";

export default function AdminSchedule() {
  const [selectedProgram, setSelectedProgram] = useState(collegePrograms[0].id);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectedRooms, setSelectedRooms] = useState({});

  const [classrooms, setClassrooms] = useState([]);
  const [courses, setCourses] = useState([]);

  const [visibleCourses, setVisibleCourses] = useState([]);
  const [visibleRooms, setVisibleRooms] = useState([]);

  const [schedule, setSchedule] = useState({});


  const fetchRooms = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/classrooms/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      response.data.forEach((room) => {
        room.show = true;
      });
      setClassrooms(response.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const result = await axiosInstance.get("/courses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      result.data.forEach((course) => {
        course.show = true;
      });
      setCourses(result.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const visibleCourses = courses.filter(
      (course) =>
        course.program === selectedProgram &&
        course.year === selectedYear &&
        course.show === true,
    );

    const filteredRooms = classrooms.filter((room) => room.show === true);

    setVisibleCourses(visibleCourses);
    setVisibleRooms(filteredRooms);
  }, [courses,classrooms, selectedProgram, selectedYear]);

  // console.log(`Courses: ${JSON.stringify(selectedCourses, null, 2)}`);
  // console.log(`Rooms: ${JSON.stringify(selectedRooms, null, 2)}`);

  const handleCourseChange = (day, interval, courseId) => {
    const mapKey = `${day}-${interval}`;
    if (selectedCourses[selectedProgram]?.[selectedYear]?.[mapKey]) {
      selectedCourses[selectedProgram][selectedYear][mapKey].show = true;
    }

    const updatedVisibleCourses = visibleCourses.map((course) => {
      if(course.id === courseId){
        return {...course, show: false};
      }
      return course;
    })
    setVisibleCourses(updatedVisibleCourses);

    if(selectedRooms[selectedProgram]?.[selectedYear]?.[mapKey]){
      const roomId = selectedRooms[selectedProgram]?.[selectedYear]?.[mapKey].id;
      updateSchedule(day, interval, courseId, roomId)
    }
  };

  const handleClassroomChange = (day, interval, roomId) => {
    const mapKey = `${day}-${interval}`;

    if(selectedCourses[selectedProgram]?.[selectedYear]?.[mapKey]){
      const courseId = selectedCourses[selectedProgram]?.[selectedYear]?.[mapKey].id;
      updateSchedule(day, interval, courseId, roomId);
    }
  }

  const updateSchedule = (day, interval, courseId, roomId) => {
    const updatedSchedule = {...schedule};
    if(!updatedSchedule[day]) updatedSchedule[day]= {};
    if(!updatedSchedule[day][interval]) updatedSchedule[day][interval] = [];
    updatedSchedule[day][interval].push({
      courseId: courses.find((course) => course.id === courseId).id,
      teacherId: courses.find((course) => course.id === courseId).teacher.user.id,
      roomId: classrooms.find((room) => room.id === roomId ).id
    });

    setSchedule(updatedSchedule);
  }


  const handleRemoveCourseAndRoom = (day, interval) => {
    const mapKey = `${day}-${interval}`;
    const courseId = selectedCourses[selectedProgram][selectedYear][mapKey]?.id;
    const roomId = selectedRooms[selectedProgram][selectedYear][mapKey]?.id;

    if (courseId) {
      const updatedCourses = visibleCourses.map(course => 
        course.id === courseId ? { ...course, show: true } : course
      );
      setVisibleCourses(updatedCourses);
    }
    const newSelectedCourses = {
      ...selectedCourses,
      [selectedProgram]: {
        ...selectedCourses[selectedProgram],
        [selectedYear]: {
          ...selectedCourses[selectedProgram]?.[selectedYear],
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
          ...selectedRooms[selectedProgram]?.[selectedYear],
        },
      },
    };

    delete newSelectedRooms[selectedProgram][selectedYear][mapKey];
    setSelectedRooms(newSelectedRooms);

    removeFromSchedule(day, interval, courseId, roomId);
  };

  const removeFromSchedule = (day, interval, courseId, roomId) => {
    const updatedSchedule = {...schedule};

    if(updatedSchedule[day] && updatedSchedule[day][interval]){
      const index = updatedSchedule[day][interval].findIndex(item => item.courseId === courseId && item.roomId === roomId);

      if(index !== -1) {
        updatedSchedule[day][interval].splice(index, 1);
      }
    }
  }

  const postSchedule = async () => {
    try{
      const formattedSchedule = Object.entries(schedule).flatMap(([day, intervals]) => {
        return Object.entries(intervals).map(([interval, items]) => {
          return items.map(item => {
            return {
              day_of_week: day,
              time: interval,
              course: item.courseId,
              classroom: item.roomId
            };
          });
        }).flat();
      });
      console.log(formattedSchedule);

      const response = await axiosInstance.post('/schedules/', formattedSchedule, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      });
      if (response.status === 201) {
        console.log("Schedule created successfully");
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  const handleOverlappingSchedule = (schedule) => {
    for (let day in schedule){
      for (let interval in schedule[day]){
        const items = schedule[day][interval];

        if(items.length){
          const teacherConflict = items.some((item, index) =>
          items.slice(index + 1).some(otherItem => otherItem.teacherId === item.teacherId)
          );

          const roomConflict = items.some((item, index) =>
            items.slice(index + 1).some(otherItem => otherItem.roomId === item.roomId)
          );
          if(teacherConflict || roomConflict){
            return true;
          }
        }
      }
      
    }
    return false;
  }

  const overlapAlert = () => {
    alert('Overlapping detected! Please check selected data and modify accordingly.')
  }

  return (
    <div>
      <h2>Orar</h2>
      {/* Program Dropdown */}

      <Select
        styles={{
          menu: (baseStyles) => ({
            ...baseStyles.menu,
            whiteSpace: "normal",
            lineHeight: "1.2", 
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

          singleValue: (provided) => ({
            ...provided,
            wordWrap: "break-word",
            color: "#333",
          }),

          control: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            borderColor: isFocused ? "#3f87a6" : "#ccc",
            boxShadow: isFocused
              ? "0px 0px 5px rgba(63, 135, 166, 0.5)"
              : "none",
            "&:hover": {
              borderColor: isFocused ? "#3f87a6" : "#999",
            },
            width: 250,
          }),
        }}
        options={collegePrograms.map((program) => ({
          value: program.id,
          label: program.name,
        }))}
        value={{ value: selectedProgram, label: selectedProgram }}
        onChange={(selectedOption) => {
          setSelectedProgram(selectedOption.value);
          setSelectedYear(1);
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
            onClick={() => {
              setSelectedYear(year);
            }}
            className={
              selectedYear === year ? "year-button selected" : "year-button"
            }
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
                  {/* If course and room are selected for this interval */}
                  {selectedCourses[selectedProgram]?.[selectedYear]?.[
                    `${dayData.day}-${cell.interval}`
                  ] &&
                  selectedRooms[selectedProgram]?.[selectedYear]?.[
                    `${dayData.day}-${cell.interval}`
                  ] ? (
                    // Then show selected course and room data
                    <div>
                      <div>
                        {
                          selectedCourses[selectedProgram][selectedYear][
                            `${dayData.day}-${cell.interval}`
                          ].name
                        }
                      </div>
                      <div>
                        {`${
                          selectedCourses[selectedProgram][selectedYear][
                            `${dayData.day}-${cell.interval}`
                          ].teacher.user.first_name
                        } ${
                          selectedCourses[selectedProgram][selectedYear][
                            `${dayData.day}-${cell.interval}`
                          ].teacher.user.last_name
                        }`}
                      </div>
                      <div>
                        {
                          selectedRooms[selectedProgram][selectedYear][
                            `${dayData.day}-${cell.interval}`
                          ].name
                        }
                      </div>
                      <button
                        onClick={() => {
                          handleRemoveCourseAndRoom(
                            dayData.day,
                            cell.interval,
                          );
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    // Else show the dropdonw menus
                    <ScheduleCell
                      dayData={dayData}
                      cell={cell}
                      visibleCourses={visibleCourses}
                      rooms={visibleRooms}
                      selectedCourses={selectedCourses}
                      handleCourseChange={handleCourseChange}
                      handleClassroomChange ={handleClassroomChange}
                      setSelectedCourses={setSelectedCourses}
                      selectedRooms={selectedRooms}
                      setSelectedRooms={setSelectedRooms}
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
        <button
          onClick={
            !handleOverlappingSchedule(schedule) ? postSchedule : overlapAlert
          }
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
