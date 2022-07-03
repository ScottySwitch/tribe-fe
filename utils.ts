import { get } from "lodash"
import { IOption } from "type"
import moment from "moment"
import parseISO from "date-fns/parseISO"

export const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id)
}

export const randomId = () => Math.floor(Math.random() * 10000000)

export const calcRateNumber = (reviewsData) => {
  let rateNumber = 0
  if (reviewsData.length > 0) {
    let sum = 0
    reviewsData.map((review) => {
      sum += get(review, "attributes.rating") || 0
    })
    rateNumber = Math.ceil(sum / reviewsData.length)
  } else {
    rateNumber = 0
  }
  return rateNumber
}

export const removeZeroInPhoneNumber = (e) => {
  let phoneNumber = ""
  if (e.input[0] == 0) {
    phoneNumber = e.select.value + e.input.substr(1, e.input.length - 1)
  } else {
    phoneNumber = e.select.value + e.input
  }
  return phoneNumber
}

export const formatSelectInputValue = (e: string, selectOptions: IOption[]) => {
  if (!e) {
    return
  }
  const phoneCodeValueList = Object.values(selectOptions.map((item) => item.value))
  const codeOptionIndex = phoneCodeValueList.findIndex((code) => e.includes(code))
  const selectValue = selectOptions[codeOptionIndex]?.value
  const inputValue = e.substring(selectValue?.length)
  return { select: selectOptions[codeOptionIndex], input: inputValue }
}

export const calcDistanceFromNow = (time) => {
  const timeCalcDistance = parseISO(moment(time).format("YYYY-MM-DD HH:mm:ss"))
  let diff_in_minutes = moment().diff(moment(timeCalcDistance), 'minutes')
  let diff_in_hours = Math.floor(diff_in_minutes / 60); 
  let diff_in_days = Math.floor(diff_in_minutes / 1440);
  if ( diff_in_hours < diff_in_minutes/60 ) {
    diff_in_hours = diff_in_hours + 1;
  }
  if (diff_in_days < diff_in_minutes / 1440 ) {
    diff_in_days = diff_in_days + 1;
  }
  if ( diff_in_minutes == 0 ) {
    return (
      'few second ago'
    )
  }
  else if ( diff_in_minutes < 60 && diff_in_minutes == 1 ) {
    return (
      '1 minute ago'
    )
  }
  else if ( diff_in_minutes < 60 && diff_in_minutes != 1 ) {
    return (
      `${diff_in_minutes} minutes ago`
    )
  }
  else if ( diff_in_hours < 24 && diff_in_hours == 1 ) {
    return (
      '1 hour ago'
    )
  }
  else if ( diff_in_hours < 24 && diff_in_hours != 1 ) {
    return (
      `${diff_in_hours} hours ago`
    )
  }
  else if ( diff_in_days == 1 ) {
    return (
      '1 day ago'
    )
  }
  else {
    return (
      `${diff_in_days} days ago`
    )
  }
}
