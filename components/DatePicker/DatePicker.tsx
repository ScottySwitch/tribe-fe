import classNames from "classnames"
import Icon from "components/Icon/Icon"
import { format } from "date-fns"
import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import styles from "./DatePicker.module.scss"
interface DatePickerProps {
  value?: Date
  size?: string
  label?: string
  prefixIcon?: boolean
  suffixIcon?: boolean
  onChange: (e: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const { value, prefixIcon, suffixIcon, size, label, onChange } = props
  const datepickerClassNames = classNames(styles.date_picker_container, {
    [styles.small]: size === "small",
    [styles.large]: size === "large",
    [styles.label]: label,
  })
  return (
    <div className={datepickerClassNames}>
      {label && <label>{label}</label>}
      <div className={styles.input_field}>
        {prefixIcon && <Icon icon="calendar-2" />}
        <ReactDatePicker
          className={styles.date_picker}
          dateFormat="dd/MM/yyyy"
          selected={value}
          onChange={onChange}
          showPopperArrow={false}
          calendarClassName={styles.calendar}
        />
        {suffixIcon && <Icon icon="calendar-2" />}
      </div>
    </div>
  )
}

export default DatePicker
