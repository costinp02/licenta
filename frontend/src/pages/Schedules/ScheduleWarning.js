import { useCallback } from 'react';
import './ScheduleWarning.css'
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils';
import axiosInstance from '../../axios';

export default function ScheduleWarning () {
    const navigate = useNavigate()

    const deleteSchedule = useCallback(async () => {
        try{
            // eslint-disable-next-line
            const response = await axiosInstance.delete("schedules/reset", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

        } catch (error) {
            console.log(error)
            handleError(error);
        }
    }, [])

    const handleContinue = () => {
        deleteSchedule();
        navigate("/admin/schedule", {replace: true});
      };
    
      const handleCancel = () => {
        navigate("/admin", {replace: true});
      };

    return (
        <>
            <div className="container">
                <h2>Warning</h2>
                <p>Existing schedule data will be deleted. Do you wish to continue?</p>
                <div className='button-div'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleContinue}>Continue</button>
                </div>
                
            </div>
        </>
    )
}