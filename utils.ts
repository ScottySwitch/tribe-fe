import { get } from "lodash"

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

export const calcSetPhoneNumber = (e) => {
  let phoneNumber = ''
  if (e.input[0] == 0 ) {
    phoneNumber = e.select.value + e.input.substr(1, e.input.length - 1)
  }
  else {
    phoneNumber = e.select.value + e.input
  }
  return phoneNumber
}