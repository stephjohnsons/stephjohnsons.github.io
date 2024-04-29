import { months } from './month'

export const monthLookup = months.reduce((acc, obj) => {
  const key = Object.keys(obj)[0]
  acc[key] = obj[key]
  return acc
}, {})

const splitDateTime = (event) => {
  return event.split('T')
}

export const shortenMonth = (event) => {
  const date = splitDateTime(event)[0]
  return monthLookup[date.slice(5, 7)]
}

export const shortenDate = (event) => {
  const date = splitDateTime(event)[0]
  return date.slice(8, 10)
}

export const readableTime = (event) => {
  const timePart = splitDateTime(event)[1]
  return timePart.slice(0, 5)
}
