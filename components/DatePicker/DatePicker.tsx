import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <ReactDatePicker
      dateFormat="dd/MM/yyyy"
      selected={selectedDate}
      onChange={(date: any) => setSelectedDate(date)}
    />
  );
};

export default DatePicker;
