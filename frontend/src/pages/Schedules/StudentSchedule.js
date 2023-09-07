import React from "react";
import { scheduleCells } from "../../utils";
import "./Schedule.css";

export default function StudentSchedule() {
    const user = JSON.parse(localStorage.getItem("user_data"));

    const handleProgram = (user) => {
        if( user ) {
            switch (user.program){
                case "MATH":
                    return "Mathematics";
                case "CS":
                    return "Computer Science";
                case "CTI":
                    return "CTI";
                default:
                    break;
            }
            
        }
    }
    return (
        <>
            <div className="student-data">
                <label>{`${user.user.first_name} ${user.user.last_name}`}</label>
                <label>{handleProgram(user)}</label>
                <label>{`Year ${user.year}`}</label>
                <label>{`Group ${user.group}`}</label>
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