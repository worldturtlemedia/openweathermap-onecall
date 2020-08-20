import { Exclude } from "./exclude"
import { Units } from "./unit"
import { Language } from "./language"

/**
 * Required parameters for making a request to OpenWeatherMap's "one-call" api endpoint.
 *
 * See {@link https://openweathermap.org/api/one-call-api#how | API Request} for more info.
 */
export interface OneCallRequest {
  /**
   * The latitude of a location (in decimal degrees). Positive is north, negative is south.
   */
  lat: number | string

  /**
   * The longitude of a location (in decimal degrees). Positive is east, negative is west.
   */
  lon: number | string

  /**
   * API key to access the OpenWeatherMap API.
   *
   * Obtained from {@link https://openweathermap.org/api | OpenWeatherMap API}.
   */
  appid: string
}

/**
 * Optional parameters to add to a forecast request.
 */
export interface OneCallRequestParams {
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
