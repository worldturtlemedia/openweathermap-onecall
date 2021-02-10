import { OpenWeatherMapBase, OpenWeatherMapOptions } from "./base"
import {
  ForecastRequest,
  RequestParams,
  TimeMachineDate,
  Units,
  Language,
  Exclude,
} from "../types"
import { EXCLUDE_ALL } from "../types/request/exclude"

/**
 * An implementation of [[OpenWeatherMapBase]] that allows for chaining method calls to customize the request.
 *
 * * Note: Should only be used via [[buildOpenWeatherMapRequest]] or `OpenWeatherMap.builder`.
 *
 * @private
 */
export class OpenWeatherMapBuilder extends OpenWeatherMapBase {
  /**
   * The request options.
   */
  private readonly request: ForecastRequest

  constructor(
    token: string,
    latitude: number,
    longitude: number,
    options?: OpenWeatherMapOptions
  ) {
    super(token, options)
    this.request = { lat: latitude, lon: longitude }
  }

  /**
   * Set multiple request query parameters at once using a RequestParams.
   *
   * **Warning**: This will **not** merge previously excluded data blocks. To add more
   * excluded data blocks call `OpenWeatherMapBuilder.exclude`
   *
   * @param params Params to override the current Query parameters.
   * @returns Chain
   */
  params(params?: RequestParams) {
    if (params) {
      this.requestParams = { ...this.requestParams, ...params }
    }

    return this
  }

  /**
   * Create a TimeMachine request instead of a current forecast.
   *
   * @param time Specific time to get the weather for.
   * @returns Chain
   */
  time(time: TimeMachineDate) {
    this.request.time = time
    return this
  }

  /**
   * Set the units for the response.
   *
   * @see RequestParams
   * @param units Units to use.
   * @returns Chain
   */
  units(units: Units) {
    this.requestParams.units = units
    return this
  }

  /**
   * Set the language for the response.
   *
   * @see RequestParams
   * @param language Language to use.
   * @returns Chain
   */
  language(language: Language) {
    this.requestParams.lang = language
    return this
  }

  /**
   * Exclude some number of data blocks from the API response.
   *
   * * Note: This will override any of the 'only' functions, ie `onlyCurrently`, etc.
   *
   * @see RequestParams
   * @param exclude List of datablocks to exclude from the response.
   */
  exclude(...exclude: Exclude[]) {
    const array = [...(this.requestParams.exclude || []), ...exclude]
    this.requestParams.exclude = [...new Set(array)]
    return this
  }

  /**
   * Shorthand for excluding all datablocks except for the Currently.
   *
   * @returns Chain
   */
  onlyCurrently() {
    this.requestParams.exclude = this.excludeAllBut(Exclude.Currently)
    return this
  }

  /**
   * Helper function for excluding the `currently` data block.
   *
   * @returns Chain
   */
  excludeCurrently() {
    this.addExlude(Exclude.Currently)
    return this
  }

  /**
   * Shorthand for excluding all datablocks except for the Minutely.
   *
   * @returns Chain
   */
  onlyMinutely() {
    this.requestParams.exclude = this.excludeAllBut(Exclude.Minutely)
    return this
  }

  /**
   * Helper function for excluding the `minutely` data block.
   *
   * @returns Chain
   */
  excludeMinutely() {
    this.addExlude(Exclude.Minutely)
    return this
  }

  /**
   * Shorthand for excluding all datablocks except for the Hourly.
   *
   * @returns Chain
   */
  onlyHourly() {
    this.requestParams.exclude = this.excludeAllBut(Exclude.Hourly)
    return this
  }

  /**
   * Helper function for excluding the `hourly` data block.
   *
   * @returns Chain
   */
  excludeHourly() {
    this.addExlude(Exclude.Hourly)
    return this
  }

  /**
   * Shorthand for excluding all datablocks except for the Daily.
   *
   * @returns Chain
   */
  onlyDaily() {
    this.requestParams.exclude = this.excludeAllBut(Exclude.Daily)
    return this
  }

  /**
   * Helper function for excluding the `daily` data block.
   *
   * @returns Chain
   */
  excludeDaily() {
    this.addExlude(Exclude.Daily)
    return this
  }

  /**
   * Execute the request and return the response wrapped in a promise.
   */
  execute() {
    const { lat, lon, time } = this.request

    return time
      ? this.client.timeMachine({ lat, lon, time }, this.requestParams)
      : this.client.forecast({ lat, lon }, this.requestParams)
  }

  /**
   * Takes the list of excluded datablocks and adds all the time ones except for [[include]].
   *
   * @param include Exclude all datablocks except for this one.
   */
  private excludeAllBut(include: Exclude): Exclude[] {
    return [
      ...(this.requestParams.exclude || []),
      ...EXCLUDE_ALL.filter(x => x !== include),
    ]
  }

  private addExlude(exclude: Exclude) {
    if (!this.requestParams.exclude) this.requestParams.exclude = []

    if (!this.requestParams.exclude.includes(exclude)) {
      this.requestParams.exclude.push(exclude)
    }
  }
}

/**
 * Conveience function for creating a Request Chain.
 *
 * Example usage:
 *
 * ```typescript
 * // Only get the hourly forecast, and extend it.
 * buildOpenWeatherMapRequest("api-token", 42, -42)
 *  .units(Units.Metric)
 *  .onlyHourly()
 *  .execute()
 * ```
 *
 * @param token OpenWeatherMap developer API token.
 * @param latitude The latitude of a location (in decimal degrees).
 * @param longitude The longitude of a location (in decimal degrees).
 * @param options Optional query params for the request.
 */
export function buildOpenWeatherMapRequest(
  token: string,
  latitude: number,
  longitude: number,
  options?: OpenWeatherMapOptions
) {
  return new OpenWeatherMapBuilder(token, latitude, longitude, options)
}
