import React, { useCallback, useEffect, useState } from "react";
import { handleError, scheduleCells } from "../../utils";
import axiosInstance from "../../axios";
import "./Schedule.css";

export default function TeacherSchedule() {
  const teacher = JSON.parse(localStorage.getItem("user_data"));
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  const fetchSchedule = useCallback(async () => {
    try{
      const result = await axiosInstance.get("/schedules/view",  {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        } 
      })
      let schedules = result.data.filter((schedule) =>
      schedule.course.teacher.user.id === teacher.user.id)
      setTeacherSchedule(schedules);
      console.log(teacherSchedule);
    } catch (error){
      handleError(error);
    }
  }, [teacherSchedule, teacher])

  useEffect(() => {
    fetchSchedule()
// eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="teacher-data">
        <h4>{`${teacher.user.first_name} ${teacher.user.last_name}`}</h4>
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
                const matchingSchedule = teacherSchedule.find(
                  (schedule) => 
                    schedule.day_of_week === dayData.day && 
                    schedule.time === cell.interval
                );

                return (
                  <td key={cell.interval}>
                    {matchingSchedule ? (
                      <>
                        <div>{matchingSchedule.course.name}</div>
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
