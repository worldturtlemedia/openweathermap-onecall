import mockAxios from "jest-mock-axios"

import {
  DarkSkyForecastRequest,
  mapDarkSkyRequest,
} from "../../src/compat/darksky-request"
import { darkSkyCompatClient, Units } from "../../src"
import { API_TIME_MACHINE } from "../../src/client"
import { onecall } from "./data/openweathermap"
import { darksky } from "./data/darksky"

describe("DarkSky Compat - Client", () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it("should create a new client object", () => {
    const client = darkSkyCompatClient("foo")
    expect(client.forecast).toBeInstanceOf(Function)
    expect(client.timeMachine).toBeInstanceOf(Function)
  })

  it("should create a client with custom axios options", () => {
    const client = darkSkyCompatClient("foo", { headers: { foo: "bar" } })
    client.forecast({ lat: 42, lon: 42 }).then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { foo: "bar" } })
    )
  })

  it("should create a url for timemachine request", () => {
    darkSkyCompatClient("foo")
      .timeMachine({ lat: 42, lon: 42, time: 123456 })
      .then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(API_TIME_MACHINE),
      {}
    )
  })

  it("should map DarkSky request to OWM Request", () => {
    darkSkyCompatClient("foo")
      .forecast({ latitude: 42, longitude: 24 })
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain("lat=42")
    expect(request.url).toContain("lon=24")
  })

  it("should apply the optional request params to forecast request", () => {
    darkSkyCompatClient("token").forecast(
      { latitude: 42, longitude: 24 },
      { units: Units.Imperial }
    )

    const url = mockAxios.lastReqGet().url
    expect(url).toContain("lon=24")
    expect(url).toContain(`units=${Units.Imperial}`)
  })

  it("should apply the optional request params to time machine request", () => {
    darkSkyCompatClient("token").timeMachine(
      { latitude: 42, longitude: 24, time: 123 },
      { units: Units.Imperial }
    )

    const url = mockAxios.lastReqGet().url
    expect(url).toContain("dt=123")
    expect(url).toContain(`units=${Units.Imperial}`)
  })

  it("should return the mapped response data", async () => {
    const promise = darkSkyCompatClient("token").timeMachine({
      latitude: 42,
      longitude: 24,
      time: 1,
    })

    mockAxios.mockResponse({ data: onecall })

    const result = await promise
    expect(result).toEqual(darksky)
  })

  it("should map a DarkSky request to OWM", () => {
    const data: DarkSkyForecastRequest = {
      latitude: 1,
      longitude: 2,
      time: 3,
    }

    const expected = {
      lat: 1,
      lon: 2,
      time: 3,
    }

    expect(mapDarkSkyRequest(data)).toEqual(expected)
  })

  it("should throw error on missing properties", () => {
    expect(() => mapDarkSkyRequest({ lat: 1 } as any)).toThrowError()
    expect(() => mapDarkSkyRequest({ lon: 1 } as any)).toThrowError()
  })
})
