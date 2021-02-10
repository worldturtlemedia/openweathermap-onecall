import { mapToDarkSkyForecast } from "../../src"
import { mapMinutelyToDarkSky } from "../../src/compat/darksky-minutely"
import { mapHourlyToDarkSky } from "../../src/compat/darksky-hourly"
import { mapCurrentToDarkSky } from "../../src/compat/darksky-current"
import {
  mapBaseDarkSkyDataPoint,
  PRECIPITATION_SNOW,
} from "../../src/compat/darksky-datablock"

import { onecall } from "./data/openweathermap"
import { darksky } from "./data/darksky"
import { DataBlock } from "../../src/types/response/datablock"

describe("Darksky Compat", () => {
  it("Should export mapper function", () => {
    expect(mapToDarkSkyForecast).toBeInstanceOf(Function)
  })

  it("Should map openweathermap data to dark-sky", () => {
    const actual = mapToDarkSkyForecast(onecall)
    expect(actual).toEqual(darksky)
  })

  it("Should not map empty current data blocks", () => {
    expect(mapHourlyToDarkSky(undefined)).toBeUndefined()
  })

  it("Should not map empty minutely data blocks", () => {
    expect(mapMinutelyToDarkSky(undefined)).toBeUndefined()
  })

  it("Should not map empty hourly data blocks", () => {
    expect(mapCurrentToDarkSky(undefined)).toBeUndefined()
  })

  it("Should map precipitation type to snow if rain is not present", () => {
    const data: DataBlock = {
      ...onecall.current,
      rain: undefined,
      snow: 1,
    }

    const result = mapBaseDarkSkyDataPoint(data)
    expect(result.precipType).toEqual(PRECIPITATION_SNOW)
  })

  it("Should map precipitation type to undefined if not present", () => {
    const data: DataBlock = {
      ...onecall.current,
      rain: undefined,
      snow: undefined,
    }

    const result = mapBaseDarkSkyDataPoint(data)
    expect(result.precipType).toBeUndefined()
  })

  it("Should map precipitation intensity to undefined if not present", () => {
    const data: DataBlock = {
      ...onecall.current,
      rain: undefined,
      snow: undefined,
    }

    const result = mapBaseDarkSkyDataPoint(data)
    expect(result.precipIntensity).toBeUndefined()
  })

  it("Should map precipitation intensity snow if rain is not present", () => {
    const data: DataBlock = {
      ...onecall.current,
      rain: undefined,
      snow: 42,
    }

    const result = mapBaseDarkSkyDataPoint(data)
    expect(result.precipIntensity).toEqual(42)
  })
})
