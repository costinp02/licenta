import React from "react";
import Select from "react-select";

export const ScheduleCell = ({ 
  dayData, 
  cell, 

  filteredCourses, 
  rooms,

  selectedCourses2,
  setSelectedCourses2,
  handleCourseChange2,

  selectedRooms2,
  setSelectedRooms2,
  handleRoomChange2,

  selectedProgram,
  selectedYear, 
}) => {
  return (
    <div>
      <Select
        placeholder="Select course"
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            fontSize: "16px",
          }),

          control: (provided) => ({
            ...provided,
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
          }),

          singleValue: (provided) => ({
            ...provided,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }),

          menu: (provided) => ({
            ...provided,
            position: "absolute",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            zIndex: 10,
            width: "100%",
            maxHeight: "400px",
            overflowY: "auto",
          }),

          option: (provided, { isFocused }) => ({
            ...provided,
            padding: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            backgroundColor: isFocused ? "#f5f5f5" : "transparent",
          }),
        }}

        options={filteredCourses.map((course) => ({
          value: course.id,
          label: course.name,
        }))}

        onChange={(selectedOption) => {
          const course = filteredCourses.find(
            (course) => course.id === selectedOption.value,
          );
          handleCourseChange2(dayData.day, cell.interval, selectedOption.value);
          
          setSelectedCourses2(() => ({
            ...selectedCourses2,
            [selectedProgram]: {
              ...selectedCourses2[selectedProgram],
              [selectedYear]: {
                ...selectedCourses2[selectedProgram]?.[selectedYear],
                [`${dayData.day}-${cell.interval}`]: course
              }
            }
            
          }))

          

          
        }}

        menuPosition="fixed"
        />

        <Select
          placeholder="Select room"
          styles={{
            menu: (baseStyles) => ({
              ...baseStyles,
              whiteSpace: "normal",
              lineHeight: "1.2",
              position: "absolute",
              width: "100%",
              fontSize: "16px",
            }),
  
            option: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              whiteSpace: "normal",
              lineHeight: "1.2",
              backgroundColor: isFocused ? "#f5f5f5" : "transparent",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }),
  
            singleValue: (provided) => ({
              ...provided,
              wordWrap: "break-word",
            }),
          }}

          options={rooms.map((room) => ({
            value: room.id,
            label: room.name,
          }))}

          onChange={(selectedOption) => {
            const room = rooms.find(
              (room) => room.id === selectedOption.value,
            );
            handleRoomChange2(dayData.day, cell.interval, selectedOption.value);

            setSelectedRooms2((prevSelectedRooms) => ({
              ...selectedRooms2,
              [selectedProgram]: {
                ...selectedRooms2[selectedProgram],
                [selectedYear]: {
                  ...selectedRooms2[selectedProgram]?.[selectedYear],
                  [`${dayData.day}-${cell.interval}`]: room
                }
              }
            }));
            
          }}

          menuPosition="fixed"
        />
    </div>
  );
};
