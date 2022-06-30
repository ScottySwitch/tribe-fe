import { get } from "lodash"
import { IOption } from "type"

export const getIndex = (id, list) => {
  return list.findIndex((item) => item.id === id)
}

export const randomId = () => Math.floor(Math.random() * 10000000)

export const calcRateNumber = (reviews) => {
  // TODO: rateNumber not work on FE
  const reviewsData = get(reviews, "data")
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
