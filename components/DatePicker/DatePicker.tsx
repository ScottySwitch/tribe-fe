import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value?: Date;
  onChange: (e: Date) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const { value, onChange } = props;
  return (
    <ReactDatePicker
      dateFormat="dd/MM/yyyy"
      selected={value}
      onChange={onChange}
    />
  );
};

export default DatePicker;
