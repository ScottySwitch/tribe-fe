import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Heading from "components/ListingHomePage/Heading/Heading"
import React, { useState } from "react"
import { randomId } from "utils"
import styles from "./OpeningHours.module.scss"

export interface IOpeningHour {
  id: string | number
  from?: string
  to?: string
}

export interface IOpenDay {
  name: string
  twentyFourHours: boolean
  openingHours: IOpeningHour[]
}

export type IOpeningHours = IOpenDay[]

const defaultOpenDays: IOpeningHours = [
  { name: "Monday", twentyFourHours: false, openingHours: [] },
  { name: "Tuesday", twentyFourHours: false, openingHours: [] },
  {
    name: "Wednesday",
    twentyFourHours: false,
    openingHours: [],
  },
  {
    name: "Thursday",
    twentyFourHours: false,
    openingHours: [],
  },
  { name: "Friday", twentyFourHours: false, openingHours: [] },
  {
    name: "Saturday",
    twentyFourHours: false,
    openingHours: [],
  },
  { name: "Sunday", twentyFourHours: false, openingHours: [] },
]

interface OpeningHoursProps {
  data: IOpeningHours
  onCancel?: () => void
  onSubmit: (openingHours: IOpeningHours) => void
}

const getIndex = (value, list) => {
  return Array.isArray(list)
    ? list.findIndex((item) => item.name === value || item.id === value)
    : -1
}

const OpeningHours = (props: OpeningHoursProps) => {
  const { data, onSubmit, onCancel } = props
  const [openingHours, setOpeningHours] = useState(data || defaultOpenDays)

  const handleCheckAllDay = (dayName: string, value: boolean) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openingHours]
    subOpeningHours[index].twentyFourHours = value
    setOpeningHours(subOpeningHours)
  }

  const handleAddNewHours = (dayName: string) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openingHours]
    subOpeningHours[index].openingHours.push({ id: randomId(), from: "", to: "" })
    setOpeningHours(subOpeningHours)
  }

  const handleRemoveHours = (dayName, id) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openingHours]
    subOpeningHours[index].openingHours = [...openingHours][index].openingHours.filter(
      (hours) => hours.id !== id
    )
    setOpeningHours(subOpeningHours)
  }

  const handleChangeHours = (dayName: string, id: string | number, type: string, value: string) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openingHours]
    const subOpenHours = [...openingHours][index].openingHours
    const hoursIndex = getIndex(id, subOpenHours)
    subOpeningHours[index].openingHours[hoursIndex][type] = value
    console.log(index, hoursIndex, type, value)
    setOpeningHours(subOpeningHours)
  }

  const handleSubmit = () => {
    onSubmit(openingHours)
  }

  return (
    <div className="sm:p-[30px] p-[10px]">
      {openingHours.map((day) => (
        <div key={day.name}>
          <Heading text={day.name} />
          {!day.twentyFourHours &&
            Array.isArray(day.openingHours) &&
            !!day.openingHours.length &&
            day.openingHours.map((time) => (
              <div key={time.id} className="flex items-center gap-3 my-3">
                <Input
                  value={time.from}
                  size="small"
                  type="time"
                  onChange={(e: any) =>
                    handleChangeHours(day.name, time.id, "from", e.target.value)
                  }
                />
                to
                <Input
                  value={time.to}
                  type="time"
                  size="small"
                  onChange={(e: any) => handleChangeHours(day.name, time.id, "to", e.target.value)}
                />
                <div
                  style={{ cursor: "pointer", fontSize: 11 }}
                  onClick={() => handleRemoveHours(day.name, time.id)}
                >
                  &#x2715;
                </div>
              </div>
            ))}
          {!day.twentyFourHours && (
            <Button
              variant="secondary"
              text="Add opening hours"
              size="small"
              width="fit-content"
              className="mt-3"
              onClick={() => handleAddNewHours(day.name)}
            />
          )}
          <br />
          <Checkbox
            id={day.name}
            label="Open 24 hours"
            checked={day.twentyFourHours}
            onChange={(e: any) => handleCheckAllDay(day.name, e.target.checked)}
          />
          <Break />
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <Button variant="secondary-no-outlined" text="Cancel" width={100} onClick={onCancel} />
        <Button text="Continue" width={150} onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default OpeningHours
