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
