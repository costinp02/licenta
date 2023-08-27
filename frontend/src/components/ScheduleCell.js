import React from "react";
import Select from "react-select";

export const ScheduleCell = ({ dayData, cell, selectedCourses, setSelectedCourses, selectRooms, setSelectedRooms, handleCourseChange, handleRoomChange, filteredCourses, rooms }) => {
  return (
    <div>
      <Select
        styles={{
          menu: (baseStyles) => ({
            ...baseStyles.menu,
            whiteSpace: "normal", // Allow text to wrap within the option
            lineHeight: "1.2", // Adjust line height for better readability
            position: "absolute",
          }),

          option: (baseStyles) => ({
            ...baseStyles,
            whiteSpace: "normal", 
            lineHeight: "1.2", 
            backgroundColor: "#8C92AC",
          }),
          singleValue: (provided) => ({
            ...provided,
            wordWrap: "break-word", // Use 'break-word' to wrap long words
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
          handleCourseChange(dayData.day, cell.interval, selectedOption.value,);
          setSelectedCourses((prevSelectedCourses) => ({
            ...prevSelectedCourses,
            [`${dayData.day}-${cell.interval}`]: course,
          }));
        }}

        menuPosition="fixed"
        />

        <Select
          styles={{
            menu: (baseStyles) => ({
              ...baseStyles.menu,
              whiteSpace: "normal", // Allow text to wrap within the option
              lineHeight: "1.2", // Adjust line height for better readability
              position: "absolute",
            }),

            option: (baseStyles) => ({
              ...baseStyles,
              whiteSpace: "normal", 
              lineHeight: "1.2", 
              backgroundColor: "#8C92AC",
            }),
            singleValue: (provided) => ({
              ...provided,
              wordWrap: "break-word", // Use 'break-word' to wrap long words
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
            handleRoomChange(dayData.day, cell.interval, selectedOption.value,);
            setSelectedRooms((prevSelectedRooms) => ({
              ...prevSelectedRooms,
              [`${dayData.day}-${cell.interval}`]: room,
            }));
          }}

          menuPosition="fixed"
        />
    </div>
  );
};
