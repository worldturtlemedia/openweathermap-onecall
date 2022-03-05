import { TimeMachineDate, ForecastRequest } from "../types"

/**
 * A DarkSky request object.
 */
export interface DarkSkyForecastRequest {
  /**
   * The latitude of a location (in decimal degrees). Positive is north, negative is south.
   */
  latitude: number | string

  /**
   * The longitude of a location (in decimal degrees). Positive is east, negative is west.
   */
  longitude: number | string

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

export interface DarkSkyTimeMachineRequest extends DarkSkyForecastRequest {
  time: TimeMachineDate
}

/**
 * Map a DarkSky request object to a OpenWeatherMap request object.
 *
 * @internal
 * @param dataBlocks List of OpenWeatherMap minutely data points.
 * @returns DarkSky equivelent minutely data block.
 */
export function mapDarkSkyRequest(
  request: DarkSkyForecastRequest
): ForecastRequest {
  if (!request.latitude || !request.longitude) {
    throw Error("Missing `Request.latitude` or `Request.longitude`")
  }

  return {
    lat: request.latitude,
    lon: request.longitude,
    time: request.time,
  }
}
