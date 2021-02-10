import mockAxios from "jest-mock-axios"

import { openWeatherMapClient, Exclude, Units, Language } from "../src"
import { API_TIME_MACHINE } from "../src/client"
import { parseTimeMachineDate } from "../src/util/misc"

describe("Client", () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it("should create a new client object", () => {
    const client = openWeatherMapClient("foo")
    expect(client.forecast).toBeInstanceOf(Function)
    expect(client.timeMachine).toBeInstanceOf(Function)
  })

  it("should create a client with custom axios options", () => {
    const client = openWeatherMapClient("foo", { headers: { foo: "bar" } })
    client.forecast({ lat: 42, lon: 42 }).then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { foo: "bar" } })
    )
  })

  it("should create a url for timemachine request", () => {
    openWeatherMapClient("foo")
      .timeMachine({ lat: 42, lon: 42, time: 123456 })
      .then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(API_TIME_MACHINE),
      {}
    )
  })

  it("should fail if no token supplied", async () => {
    await expect(
      openWeatherMapClient("").forecast({ lat: 42, lon: 42 })
    ).rejects.toThrowError()
  })

  it("should throw an error if latitude is not supplied", async () => {
    const client = openWeatherMapClient("token")
    await expect(client.forecast({ lon: 42 } as any)).rejects.toThrow()
  })

  it("should throw an error if longitude is not supplied", async () => {
    const client = openWeatherMapClient("token")
    await expect(client.forecast({ lat: 42 } as any)).rejects.toThrow()
  })

  it("should apply the optional request params", () => {
    openWeatherMapClient("token").forecast(
      { lat: 42, lon: 24 },
      {
        exclude: [Exclude.Daily, Exclude.Hourly],
        units: Units.Imperial,
        lang: Language.Basque,
      }
    )

    const url = mockAxios.lastReqGet().url
    expect(url).toContain("lat=42")
    expect(url).toContain("lon=24")
    expect(url).toContain(
      `exclude=${encodeURIComponent(`${Exclude.Daily},${Exclude.Hourly}`)}`
    )
    expect(url).toContain(`units=${Units.Imperial}`)
    expect(url).toContain(`lang=${Language.Basque}`)
  })

  it("should apply the optional request params to time machine request", () => {
    openWeatherMapClient("token").timeMachine(
      { lat: 42, lon: 24, time: 123 },
      { units: Units.Imperial }
    )

    const url = mockAxios.lastReqGet().url
    expect(url).toContain("dt=123")
    expect(url).toContain(`units=${Units.Imperial}`)
  })

  it("should filter out invalid params", () => {
    openWeatherMapClient("token").forecast(
      { lat: 42, lon: 24 },
      {
        exclude: undefined,
      }
    )

    const url = mockAxios.lastReqGet().url
    expect(url).not.toContain("exclude=")
  })

  it("should create a time machine url", () => {
    openWeatherMapClient("token").timeMachine({ lat: 42, lon: 24, time: 123 })

    expect(mockAxios.lastReqGet().url).toContain("dt=123")
  })

  it("should create a time machine url from a Date object", () => {
    const target = new Date()
    const expected = parseTimeMachineDate(target)

    openWeatherMapClient("token").timeMachine({
      lat: 42,
      lon: 24,
      time: target,
    })

    expect(mockAxios.lastReqGet().url).toContain(`dt=${expected}`)
  })

  it("should return the response data", async () => {
    const promise = openWeatherMapClient("token").forecast({
      lat: 42,
      lon: 24,
    })

    const response = { foo: "bar" }
    mockAxios.mockResponse({ data: response })

    const result = await promise
    expect(result).toEqual(response)
  })
})
