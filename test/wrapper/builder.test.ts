import mockAxios from "jest-mock-axios"

import {
  buildOpenWeatherMapRequest,
  Exclude,
  Language,
  RequestParams,
  Units,
} from "../../src"
import { API_TIME_MACHINE } from "../../src/client"
import { EXCLUDE_ALL } from "../../src/types/request/exclude"

describe("OpenWeatherMap builder", () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it("Should merge parameters", () => {
    const params: RequestParams = {
      lang: Language.Albanian,
    }

    buildOpenWeatherMapRequest("token", 42, 42)
      .units(Units.Metric)
      .params(params)
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(`units=${Units.Metric}`)
    expect(request.url).toContain(`lang=${Language.Albanian}`)
  })

  it("Should do nothing if given empty params", () => {
    const builder = buildOpenWeatherMapRequest("token", 42, 42)
    expect(builder.params()).toEqual(builder)
    expect(builder.params({})).toEqual(builder)
  })

  it("Should create a time machine request", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .time(new Date())
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(API_TIME_MACHINE)
  })

  it("Should add units to request", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .units(Units.Imperial)
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Units.Imperial)
  })

  it("Should add language to request", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .language(Language.Albanian)
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Language.Albanian)
  })

  it("Should exclude certain data blocks", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .exclude(Exclude.Currently, Exclude.Daily)
      .exclude(Exclude.Hourly)
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Exclude.Currently)
    expect(request.url).toContain(Exclude.Daily)
    expect(request.url).toContain(Exclude.Hourly)
  })

  it("Should exclude all except 'currently'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .onlyCurrently()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    EXCLUDE_ALL.filter(x => x !== Exclude.Currently).forEach(exclude => {
      expect(request.url).toContain(exclude)
    })
  })

  it("Should exclude 'currently'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .excludeCurrently()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Exclude.Currently)
  })

  it("Should exclude all except 'minutely'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .onlyMinutely()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    EXCLUDE_ALL.filter(x => x !== Exclude.Minutely).forEach(exclude => {
      expect(request.url).toContain(exclude)
    })
  })

  it("Should exclude 'minutely'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .excludeMinutely()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Exclude.Minutely)
  })

  it("Should exclude all except 'hourly'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .onlyHourly()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    EXCLUDE_ALL.filter(x => x !== Exclude.Hourly).forEach(exclude => {
      expect(request.url).toContain(exclude)
    })
  })

  it("Should exclude 'hourly'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .excludeHourly()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Exclude.Hourly)
  })

  it("Should exclude all except 'daily'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .onlyDaily()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    EXCLUDE_ALL.filter(x => x !== Exclude.Daily).forEach(exclude => {
      expect(request.url).toContain(exclude)
    })
  })

  it("Should exclude 'daily'", () => {
    buildOpenWeatherMapRequest("token", 42, 42)
      .excludeDaily()
      .execute()
      .then(jest.fn())

    const request = mockAxios.lastReqGet()
    expect(request.url).toContain(Exclude.Daily)
  })

  it("Should not repetadily exclude data-blocks", () => {
    const chain: any = buildOpenWeatherMapRequest("token", 42, 42)
      .excludeDaily()
      .excludeDaily()

    const params: RequestParams = chain.requestParams
    expect(params.exclude).toEqual([Exclude.Daily])
  })
})
