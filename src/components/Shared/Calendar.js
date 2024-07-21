import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styling for react-calendar

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate || new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Select Date</h2>
      <Calendar
        value={date}
        onChange={handleDateChange}
        className="react-calendar"
      />
    </div>
  );
};

export default CalendarComponent;
