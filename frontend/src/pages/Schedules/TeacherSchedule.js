import React from "react";
import { scheduleCells } from "../../utils";
import "./Schedule.css";

export default function TeacherSchedule() {

    
    return (
        <>
            <div className="teacher-data">
                <h4>User name</h4>
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
                                    <div>hello</div>
                                </td>
                            ))}
                            </tr>
                            
                        ))}
                    </tbody>
            </table>
        </>

        
    )
}