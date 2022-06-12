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
  onChange: (e: Date) => void
}

const DatePicker = (props: DatePickerProps) => {
  const { value, size, onChange } = props
  const datepickerClassNames = classNames(styles.date_picker_container, {
    [styles.small]: size === "small",
    [styles.large]: size === "large",
  })
  return (
    <div className={datepickerClassNames}>
      <Icon icon="calendar-2" />
      <ReactDatePicker
        className={styles.date_picker}
        dateFormat="dd/MM/yyyy"
        selected={value}
        onChange={onChange}
        showPopperArrow={false}
        calendarClassName={styles.calendar}
      />
    </div>
  )
}

export default DatePicker
