import { DarkSkyCurrentDataPoint, mapCurrentToDarkSky } from "./darksky-current"
import {
  DarkSkyMinutelyDataBlock,
  mapMinutelyToDarkSky,
} from "./darksky-minutely"
import { DarkSkyHourlyDataBlock, mapHourlyToDarkSky } from "./darksky-hourly"
import { mapDailyToDarkSky, DarkSkyDailyDataBlock } from "./darksky-daily"
import { Forecast } from "../types"
import { DarkSkyAlert, mapAlertsToDarkSky } from "./darksky-alert"

/**
 * DarkSky Forecast response types.
 *
 * See {@link https://darksky.net/dev/docs#response-format DarkSky API Docs} for more.
 *
 * Missing DarkSky properties:
 * - alerts
 * - flags
 * - headers
 */
export interface DarkSkyForecast {
  /**
   * The requested latitude.
   *
   * Mapped from Forecast.lat
   */
  latitude: number

  /**
   * The requested longitude.
   *
   * Mapped from Forecast.lon
   */
  longitude: number

  /**
   * The IANA timezone name for the requested location.
   */
  timezone: string

  /**
   * A data point containing the current weather conditions at the requested location.
   */
  currently?: DarkSkyCurrentDataPoint

  /**
   * A data block containing the weather conditions minute-by-minute for the next hour.
   */
  minutely?: DarkSkyMinutelyDataBlock

  /**
   * A data block containing the weather conditions hour-by-hour for the next two days.
   */
  hourly?: DarkSkyHourlyDataBlock

  /**
   * A data block containing the weather conditions day-by-day for the next week.
   */
  daily?: DarkSkyDailyDataBlock

  /**
   * An alerts array, which, if present, contains any severe weather alerts pertinent to the requested location.
   */
  alerts?: DarkSkyAlert[]
}

/**
 * Forecast object with a required `currently` property.
 */
export interface DarkSkyCurrentForecast extends DarkSkyForecast {
  currently: DarkSkyCurrentDataPoint
}

/**
 * Forecast object with a required `daily` property.
 */
export interface DarkSkyWeekForecast extends DarkSkyForecast {
  daily: DarkSkyDailyDataBlock
}

/**
 * Forecast object with a required `hourly` property.
 */
export interface DarkSkyDayForecast extends DarkSkyForecast {
  hourly: DarkSkyHourlyDataBlock
}

/**
 * Forecast object with a required `minutely` property.
 */
export interface DarkSkyHourForecast extends DarkSkyForecast {
  minutely: DarkSkyMinutelyDataBlock
}

/**
 * Map an OpenWeatherMap Forecast result to a DarkSky equivelent object.
 *
 * @param forecast OpenWeatherMap forecast object.
 */
export function mapToDarkSkyForecast(forecast: Forecast): DarkSkyForecast {
  return {
    latitude: forecast.lat,
    longitude: forecast.lon,
    timezone: forecast.timezone,
    currently: mapCurrentToDarkSky(forecast.current),
    minutely: mapMinutelyToDarkSky(forecast.minutely),
    hourly: mapHourlyToDarkSky(forecast.hourly),
    daily: mapDailyToDarkSky(forecast.daily),
    alerts: mapAlertsToDarkSky(forecast.alerts),
  }
}

/**
 * Map an OpenWeatherMap Forecast promise to a DarkSky equivelent object.
 *
 * @param promise OpenWeatherMap forecast promise.
 */
export async function mapResultToDarkSkyForecast(promise: Promise<Forecast>) {
  const result = await promise
  return mapToDarkSkyForecast(result)
}
