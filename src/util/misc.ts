import isDate from "date-fns/isDate"

import { TimeMachineDate } from "../types"

/**
 * Check if value is a number, or if a string can be parsed into a number.
 *
 * @param value Value to check.
 * @returns `true` if it is a valid number.
 */
export function isNumber(value: any): boolean {
  const num = parseFloat(value)
  return !isNaN(num) && isFinite(num)
}

/**
 * Check if a value is an object.
 *
 * @param value Variable to check if it is an object.
 * @returns `true` if value is an object.
 */
export function isObject(value: any): boolean {
  return typeof value === "object" && value != null
}

/**
 * Convert a [[TimeMachineDate]] into a Unix timestamp value that OpenWeatherMap accepts.
 *
 * @param time The TimeMachineDate value to be converted into a Unix timestamp.
 * @returns `undefined` if the property is not set, and a Unix timestamp if defined.
 * @throws Error if [[time]] is not a number or a [[Date]] object.
 */
export function parseTimeMachineDate(
  time?: TimeMachineDate
): number | undefined {
  if (!time) return undefined
  else if (isNumber(time)) return time as number
  else if (isDate(time)) return (time as Date).getTime() / 1000
  else throw new Error("Could not parse Unix timestamp from 'time' property!")
}
