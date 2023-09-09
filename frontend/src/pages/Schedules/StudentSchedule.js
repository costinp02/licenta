import React, { useCallback } from "react";
import { handleError, scheduleCells } from "../../utils";
import "./Schedule.css";
import { handleProgram } from "../../utils";
import axiosInstance from "../../axios";

export default function StudentSchedule() {
  const student = JSON.parse(localStorage.getItem("user_data"));

  const fetchSchedule = useCallback(async () => {
    try{
      const result = await axiosInstance.get("/schedules/",  {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
    } catch (error) {
      handleError(error);
    }
  })

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
              {dayData.cells.map((cell) => (
                <td key={cell.interval}>
                  <div>{cell.courses.name}</div>
                  <div>{cell.courses.teacher_name}</div>
                  <div>{cell.courses.course_type}</div>
                  <div>{cell.courses.room}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
