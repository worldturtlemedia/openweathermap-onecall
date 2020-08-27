import { OpenWeatherMapBase } from "./base"
import { buildOpenWeatherMapRequest } from "./builder"
import {
  RequestParams,
  TimeMachineDate,
  CurrentForecast,
  WeekForecast,
  DayForecast,
  HourForecast,
} from "../types"
import { notFound } from "util/errors"

/**
 * A `class` based wrapper for a [[OpenWeatherMapClient]]
 *
 * Example usage:
 *
 * ```typescript
 * const openWeatherMap = new OpenWeatherMap("api-token")
 *
 * const current = async () => {
 *   const result = await openWeatherMap.current(42, -42, { units: Units.CA })
 *   // ... Handle result
 * }
 * ```
 *
 * Example chaining usage:
 *
 * ```typescript
 * const request = new OpenWeatherMap("api-token").builder()
 *     .units(Units.Metric)
 *     .excludeHourly()
 *     .excludeDaily()
 *     .excludeMinutely()
 *
 * async function getCurrentForecast(lat: number, long: number): CurrentDataBlock {
 *   const result = await request.execute()
 *   if (!result.current) {
 *     throw Error("Current can still be undefined if OpenWeatherMap doesn't return it")
 *   }
 *   return result.current
 * }
 * ```
 */
export class OpenWeatherMap extends OpenWeatherMapBase {
  /**
   * Create a OpenWeatherMap request using method chaining.
   *
   * See [[buildOpenWeatherMapRequest]] for more info.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   */
  builder(lat: number, lon: number, params?: RequestParams) {
    return buildOpenWeatherMapRequest(this.token, lat, lon).params(
      this.mergeParams(params)
    )
  }

  /**
   * Gets the current forecast.
   *
   * See {@link https://openweathermap.org/api/one-call-api#how OpenWeatherMap Docs} for more info.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Current forecast.
   */
  forecast(lat: number, lon: number, params?: RequestParams) {
    return this.client.forecast({ lat, lon }, this.mergeParams(params))
  }

  /**
   * Gets the forecast for a specified date.
   *
   * **Note:** The historical API has some stipulations:
   *
   * > Please note that in order to get historical data for the last five days, you need to make five API calls (one call for each day).
   *
   * See {@link https://openweathermap.org/api/one-call-api#history OpenWeatherMap Docs} for more.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param time Specific time to get the weather for.
   * @param params Optional query params for the request.
   * @returns Forecast for the specified date.
   */
  timeMachine(
    lat: number,
    lon: number,
    time: TimeMachineDate,
    params?: RequestParams
  ) {
    return this.client.timeMachine({ lat, lon, time }, this.mergeParams(params))
  }

  /**
   * Gets the current weather conditions, excluding all other datablocks.
   *
   * Helper function for setting `exclude=minutely,daily,hourly`
   *
   * * Note: Will throw an error if OpenWeatherMap doesn't return a `current` data block for the request.
   *
   * See {@link https://openweathermap.org/api/one-call-api#how OpenWeatherMap Docs} for more.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Current forecast conditions.
   * @throws HttpException if `CurrentForecast.current` doesn't exist.
   */
  async current(lat: number, lon: number, params?: RequestParams) {
    const result = await this.builder(lat, lon, params)
      .onlyCurrently()
      .execute()

    if (!result.current) throw notFound()

    return result as CurrentForecast
  }

  /**
   * Get the forecast for week, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,minutely,hourly`
   *
   * * Note: Will throw an error if OpenWeatherMap doesn't return a `daily` data block for the request.
   *
   * See {@link https://openweathermap.org/api/one-call-api#how OpenWeatherMap Docs} for more.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the week.
   * @throws HttpException if [[WeekForecast.daily]] doesn't exist.
   */
  async week(lat: number, lon: number, params?: RequestParams) {
    const result = await this.builder(lat, lon, params)
      .onlyDaily()
      .execute()

    if (!result.daily) throw notFound()

    return result as WeekForecast
  }

  /**
   * Get the forecast for day, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,daily,minutely`
   *
   * * Note: Will throw an error if OpenWeatherMap doesn't return a `hourly` data block for the request.
   *
   * See {@link https://openweathermap.org/api/one-call-api#how OpenWeatherMap Docs} for more.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the day.
   * @throws HttpException if [[DayForecast.hourly]] doesn't exist.
   */
  async day(lat: number, lon: number, params?: RequestParams) {
    const result = await this.builder(lat, lon, params)
      .onlyHourly()
      .execute()

    if (!result.hourly) throw notFound()

    return result as DayForecast
  }

  /**
   * Get the forecast for hour, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,daily,hourly`
   *
   * * Note: Will throw an error if OpenWeatherMap doesn't return a `Minutely` data block for the request.
   *
   * See {@link https://openweathermap.org/api/one-call-api#how OpenWeatherMap Docs} for more.
   *
   * @param lat The latitude of a location (in decimal degrees).
   * @param lon The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the hour.
   * @throws HttpException if [[HourForecast.Minutely]] doesn't exist.
   */
  async hour(lat: number, lon: number, params?: RequestParams) {
    const result = await this.builder(lat, lon, params)
      .onlyMinutely()
      .execute()

    if (!result.minutely) throw notFound()

    return result as HourForecast
  }

  /**
   * Merge the class [[RequestParams]] with the optional [[params]].
   *
   * @param params Optional [[RequestParams]] to merge.
   * @returns Merged [[RequestParams]] object.
   */
  private mergeParams(params?: RequestParams) {
    return { ...this.requestParams, ...(params ?? {}) }
  }
}
