import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";

export default function ViewALLRooms(){
    const [classrooms, setClassrooms] = useState([]);

    const fetchRooms = useCallback( async () => {
        try {
          // debugger;
          const response = await axiosInstance.get('/classrooms/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        });
          
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

      useEffect(() => {
        fetchRooms(); 
      }, [])

      const listRooms = classrooms.map(room => 
        <div>
            <p>
                <b>{`Name: ${room.name}`}</b>
            </p>

            <p>
                <b>{`Capacity: ${room.capacity} seats`}</b>
            </p>

            <p>
                <b>{`Floor: ${room.floor}`}</b>
            </p>
            <Link to={`/admin/room-form/edit/${room.id}`} className="btn">Edit</Link>
        </div>
        )
    return (
        <>
        {classrooms.length ? 
        <div>{listRooms}</div>
    :
    <div>No rooms</div>    }
        </>
    )
}