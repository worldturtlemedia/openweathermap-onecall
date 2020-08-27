import { Exclude } from "./exclude"
import { Units } from "./unit"
import { Language } from "./language"

/**
 * Date to convert to a Unix timestamp for making time-machine requests.
 */
export type TimeMachineDate = number | Date

/**
 * Required parameters for making a request to OpenWeatherMap's "one-call" api endpoint.
 *
 * See {@link https://openweathermap.org/api/one-call-api#how | API Request} for more info.
 */
export interface ForecastRequest {
  /**
   * The latitude of a location (in decimal degrees). Positive is north, negative is south.
   */
  lat: number | string

  /**
   * The longitude of a location (in decimal degrees). Positive is east, negative is west.
   */
  lon: number | string

  /**
   * Specific date to get weather for.
   *
   * Can be any of the following:
   * * Date object.
   * * A valid formatted date-string.
   * * UNIX timestamp.
   *
   * Either be a UNIX timestamp or a Date object.
   */
  time?: TimeMachineDate
}

/**
 * Required parameters for making a TimeMachine request.
 *
 * See {@link https://openweathermap.org/api/one-call-api#history OpenWeatherMap} for more.
 */
export interface TimeMachineRequest extends ForecastRequest {
  time: TimeMachineDate
}

/**
 * Optional parameters to add to a forecast request.
 */
export interface RequestParams {
  /**
   * Exclude some number of data blocks from the API response. This is useful for
   * reducing latency and saving cache space.
   */
  exclude?: Exclude[]

  /**
   * Return weather conditions in the requested units.
   */
  units?: Units

  /**
   * Return summary properties in the desired language.
   */
  lang?: Language
}
