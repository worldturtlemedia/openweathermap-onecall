import { WeatherBlock } from "./weather"

/**
 * Precipitation data point.
 */
export interface PrecipitationDataPoint {
  /**
   * Precipitation volumn for the last hour, measured in millimeters (mm).
   */
  "1h": number
}

/**
 * @internal
 *
 * Base datablock interface
 */
export interface DataBlock {
  /**
   * Time of the forecasted data, unix, UTC.
   */
  dt: number

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: any

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: any

  /**
   * Atmospheric temperature on the sea level, measured in hectopascal (hPa).
   */
  pressure: number

  /**
   * Humidity percentage.
   */
  humidity: number

  /**
   *  Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  dew_point: number

  /**
   * Cloudiness percent.
   */
  clouds: number

  /**
   * Average visibility measured in metres (m).
   */
  visibility: number

  /**
   * Wind speed.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour
   */
  wind_speed: number

  /**
   * Wind gust.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   */
  wind_gust?: number

  /**
   * Wind direction in degrees (meteorological)
   */
  wind_deg: number

  /**
   * Probability of precipitation.
   */
  pop: number

  /**
   * Volume of rain for the last hour, measured in mm.
   */
  rain?: any

  /**
   * Volume of snow for the last hour, measured in mm.
   */
  snow?: any

  /**
   * A block of user-facing weather information.
   */
  weather: WeatherBlock
}
