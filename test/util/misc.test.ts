import { isNumber, isObject, parseTimeMachineDate } from "../../src/util/misc"

describe("Misc", () => {
  describe("isNumber", () => {
    it("should be true if it is a valid number", () => {
      expect(isNumber(42)).toBeTruthy()
      expect(isNumber(-42)).toBeTruthy()
      expect(isNumber(42.24)).toBeTruthy()
      expect(isNumber(-42.24)).toBeTruthy()
      expect(isNumber(2222222 * 1000)).toBeTruthy()
    })

    it("should parse a number string", () => {
      expect(isNumber("42")).toBeTruthy()
    })

    it("should be false if passed an invalid number string", () => {
      expect(isNumber("foo")).toBeFalsy()
      expect(isNumber("")).toBeFalsy()
    })
  })

  describe("isObject", () => {
    it("should be true if is an object", () => {
      expect(isObject({ foo: "bar" })).toBeTruthy()
      expect(isObject(null)).toBeFalsy()
      expect(isObject(undefined)).toBeFalsy()
      expect(isObject(["foo", "bar"])).toBeFalsy()
    })
  })

  describe("parseTimeMachineDate", () => {
    it("should handle an undefined time", () => {
      expect(parseTimeMachineDate(undefined)).toBeUndefined()
    })

    it("should handle a UNIX timestamp", () => {
      const expected = 2222222 * 1000
      const actual = parseTimeMachineDate(2222222 * 1000)

      expect(actual).toEqual(expected)
    })

    it("should throw error on unaccepted input", () => {
      expect(() => parseTimeMachineDate({} as any)).toThrowError()
    })

    it("should handle a date object", () => {
      const time = new Date()
      const expected = time.getTime() / 1000
      const actual = parseTimeMachineDate(time)

      expect(actual).toEqual(expected)
    })
  })
})
