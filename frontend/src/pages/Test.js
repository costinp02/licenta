import React, { Component } from 'react';
import axiosInstance from '../axios';
import './Test.css'
class Schedule extends Component {


  constructor(props) {
    super(props);
    this.state = {
      activities: [
        [{ name: 'Activitate 11', time: '9:00 - 10:00' }, { name: 'Activitate 12', time: '10:00 - 11:00' }, { name: 'Activitate 13', time: '11:00 - 12:00' }, { name: 'Activitate 14', time: '12:00 - 13:00' }, { name: 'Activitate 15', time: '13:00 - 14:00' }],
        [{ name: 'Activitate 21', time: '9:00 - 10:00' }, { name: 'Activitate 22', time: '10:00 - 11:00' }, { name: 'Activitate 23', time: '11:00 - 12:00' }, { name: 'Activitate 24', time: '12:00 - 13:00' }, { name: 'Activitate 25', time: '13:00 - 14:00' }],
        [{ name: 'Activitate 31', time: '9:00 - 10:00' }, { name: 'Activitate 32', time: '10:00 - 11:00' }, { name: 'Activitate 33', time: '11:00 - 12:00' }, { name: 'Activitate 34', time: '12:00 - 13:00' }, { name: 'Activitate 35', time: '13:00 - 14:00' }],
        [{ name: 'Activitate 41', time: '9:00 - 10:00' }, { name: 'Activitate 42', time: '10:00 - 11:00' }, { name: 'Activitate 43', time: '11:00 - 12:00' }, { name: 'Activitate 44', time: '12:00 - 13:00' }, { name: 'Activitate 45', time: '13:00 - 14:00' }],
      ],
    };
  }

 

  handleDragStart = (e, rowIndex, colIndex) => {
    e.dataTransfer.setData('rowIndex', rowIndex);
    e.dataTransfer.setData('colIndex', colIndex);
  };

  handleDrop = (e, rowIndex, colIndex) => {
    const sourceRowIndex = e.dataTransfer.getData('rowIndex');
    const sourceColIndex = e.dataTransfer.getData('colIndex');
    const { activities } = this.state;

    const draggedActivity = activities[sourceRowIndex][sourceColIndex];
    const targetActivity = activities[rowIndex][colIndex];

    if (draggedActivity !== targetActivity) {
      const updatedActivities = [...activities];
      updatedActivities[sourceRowIndex][sourceColIndex] = targetActivity;
      updatedActivities[rowIndex][colIndex] = draggedActivity;

      this.setState({
        activities: updatedActivities,
      });
    }
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  render() {
    axiosInstance
			.get(`users/teachers/`)
            .then((res) => {
               console.log(res.data) 
            });
    const { activities } = this.state;

    

    return (
      <div>
        <h2>Orar</h2>
        <table className="schedule">
          <tbody>
            {activities.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((activity, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="activity"
                    draggable={Boolean(activity.name)}
                    onDragStart={(e) => this.handleDragStart(e, rowIndex, colIndex)}
                    onDrop={(e) => this.handleDrop(e, rowIndex, colIndex)}
                    onDragOver={this.handleDragOver}
                  >
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{activity.name}</h5>
                        <p className="card-text">{activity.time}</p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Schedule;