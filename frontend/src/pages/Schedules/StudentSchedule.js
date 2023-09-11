import React, { useCallback, useEffect, useState } from "react";
import { handleError, scheduleCells } from "../../utils";
import "./Schedule.css";
import { handleProgram } from "../../utils";
import axiosInstance from "../../axios";

export default function StudentSchedule() {
  const student = JSON.parse(localStorage.getItem("user_data"));
  const [studentSchedule, setStudentSchedule] = useState([]);

  const fetchSchedule = useCallback(async () => {
    try{
      const result = await axiosInstance.get("/schedules/view",  {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        } 
      })
      let schedules = result.data.filter((schedule) => 
        schedule.course.program === student.program &&
        schedule.course.year === student.year)
        setStudentSchedule(schedules);
        console.log(studentSchedule);
    } catch (error) {
      handleError(error);
    }
  }, [studentSchedule, setStudentSchedule, student])


  useEffect(() =>{
    fetchSchedule();
// eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="student-data">
        <label>{`${student.user.first_name} ${student.user.last_name}`}</label>
        <label>{handleProgram(student.program)}</label>
        <label>{`Year ${student.year}`}</label>
        <label>{`Group ${student.group}`}</label>
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
              {dayData.cells.map((cell) => {
                const matchingSchedule = studentSchedule.find(
                  (schedule) => 
                    schedule.day_of_week === dayData.day && 
                    schedule.time === cell.interval
                );

                return (
                  <td key={cell.interval}>
                    {matchingSchedule ? (
                      <>
                        <div>{matchingSchedule.course.name}</div>
                        <div>{`${matchingSchedule.course.teacher.user.first_name} 
                          ${matchingSchedule.course.teacher.user.last_name}`}</div> 
                        <div>{matchingSchedule.course.course_type}</div>
                        <div>{matchingSchedule.classroom.name}</div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
