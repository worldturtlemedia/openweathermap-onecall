import mockAxios from "jest-mock-axios"

import {
  Exclude,
  Forecast,
  Language,
  OpenWeatherMap,
  RequestParams,
  Units,
} from "../../src"
import { API_TIME_MACHINE } from "../../src/client"
import { parseTimeMachineDate } from "../../src/util/misc"

const BASE_RESPONSE: Forecast = {
  lat: 42,
  lon: 42,
  timezone: "",
  timezone_offset: 0,
}

describe("OpenWeatherMap class", () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it("Should construct a OpenWeatherMap instance", () => {
    const instance = new OpenWeatherMap("foo")
    expect(instance.forecast).toBeInstanceOf(Function)
  })

  it("Should construct a OpenWeatherMap instance with axios params", () => {
    new OpenWeatherMap("foo", { requestConfig: { headers: { foo: "bar" } } })
      .forecast(42, 42)
      .then(jest.fn())

    expect(mockAxios.get).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { foo: "bar" } })
    )
  })

  it("Should construct a OpenWeatherMap instance with optional params", () => {
    const instance: any = new OpenWeatherMap("foo", { units: Units.Default })
    const params: RequestParams = instance.requestParams

    expect(params.units).toEqual(Units.Default)
  })

  it("Should perform a forecast request", () => {
    const wrapper = new OpenWeatherMap("foo")
    wrapper.forecast(42, 42).then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("lat=42&lon=42"),
      expect.any(Object)
    )
  })

  it("Should perform a forecast request with optional parameters", () => {
    const wrapper = new OpenWeatherMap("foo")
    wrapper.forecast(42, 42, { units: Units.Metric }).then(jest.fn())

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(`units=${Units.Metric}`),
      expect.any(Object)
    )
  })

  it("Should perform a timemachine request", () => {
    const wrapper = new OpenWeatherMap("foo")
    wrapper.timeMachine(42, 42, 42).then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(API_TIME_MACHINE)
    expect(request.url).toContain("dt=42")
  })

  it("Should perform a timemachine request with date object", () => {
    const wrapper = new OpenWeatherMap("foo")
    const date = new Date()
    const expectedTimestamp = parseTimeMachineDate(date)
    wrapper.timeMachine(42, 42, date).then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(API_TIME_MACHINE)
    expect(request.url).toContain(`dt=${expectedTimestamp}`)
  })

  it("Should perform a timemachine requiest with additional params", () => {
    new OpenWeatherMap("foo")
      .timeMachine(42, 42, new Date(), { lang: Language.Afrikaans })
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(API_TIME_MACHINE)
    expect(request.url).toContain(`lang=${Language.Afrikaans}`)
  })

  it("Should create a 'currently' request", () => {
    const response = {
      ...BASE_RESPONSE,
      current: {
        dt: 2,
      },
    }

    new OpenWeatherMap("foo").current(42, 42).then(jest.fn())
    const request = mockAxios.lastReqGet()
    mockAxios.mockResponse({ data: response })

    expect(request.url).toContain("exclude=")
    expect(request.url).not.toContain(Exclude.Currently)
  })

  it("Should throw if 'currently' request does not contain data", async () => {
    const promise = new OpenWeatherMap("foo").current(42, 42)
    mockAxios.mockResponse({ data: {} })

    await expect(promise).rejects.toThrow()
  })

  it("Should create a 'week' request", () => {
    const response = {
      ...BASE_RESPONSE,
      daily: {
        dt: 2,
      },
    }

    new OpenWeatherMap("foo").week(42, 42).then(jest.fn())
    const request = mockAxios.lastReqGet()
    mockAxios.mockResponse({ data: response })

    expect(request.url).toContain("exclude=")
    expect(request.url).not.toContain(Exclude.Daily)
  })

  it("Should throw if 'week' request does not contain data", async () => {
    const promise = new OpenWeatherMap("foo").week(42, 42)
    mockAxios.mockResponse({ data: {} })

    await expect(promise).rejects.toThrow()
  })

  it("Should create a 'day' request", () => {
    const response = {
      ...BASE_RESPONSE,
      hourly: {
        dt: 2,
      },
    }

    new OpenWeatherMap("foo").day(42, 42).then(jest.fn())
    const request = mockAxios.lastReqGet()
    mockAxios.mockResponse({ data: response })

    expect(request.url).toContain("exclude=")
    expect(request.url).not.toContain(Exclude.Hourly)
  })

  it("Should throw if 'day' request does not contain data", async () => {
    const promise = new OpenWeatherMap("foo").day(42, 42)
    mockAxios.mockResponse({ data: {} })

    await expect(promise).rejects.toThrow()
  })

  it("Should create a 'hourly' request", () => {
    const response = {
      ...BASE_RESPONSE,
      minutely: {
        dt: 2,
      },
    }

    new OpenWeatherMap("foo").hour(42, 42).then(jest.fn())
    const request = mockAxios.lastReqGet()
    mockAxios.mockResponse({ data: response })

    expect(request.url).toContain("exclude=")
    expect(request.url).not.toContain(Exclude.Minutely)
  })

  it("Should throw if 'hourly' request does not contain data", async () => {
    const promise = new OpenWeatherMap("foo").hour(42, 42)
    mockAxios.mockResponse({ data: {} })

    await expect(promise).rejects.toThrow()
  })
})
