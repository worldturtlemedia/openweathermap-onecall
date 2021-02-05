import { DataBlock } from "./datablock"

export interface DailyDataBlock extends DataBlock {
  /**
   * Sunrise time as a UTC Unix timestamp.
   */
  sunrise: number

  /**
   * Sunsise time as a UTC Unix timestamp.
   */
  sunset: number

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: TemperatureBlock

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: TemperatureDayBlock

  /**
   * Midday UV index.
   */
  uvi: number

  /**
   * Volume of rain for the day, measured in mm.
   */
  rain?: number

  /**
   * Volume of snow for the day, measured in mm.
   */
  snow?: number
}

export interface TemperatureDayBlock {
  /**
   * Morning temperature.
   */
  morn: number

  /**
   * Day temperature.
   */
  day: number

  /**
   * Evening temperature.
   */
  eve: number

  /**
   * Night temperature.
   */
  night: number
}

export interface TemperatureBlock extends TemperatureDayBlock {
  /**
   * Minimum daily temperature.
   */
  min: number

  /**
   * Maximum daily temperature.
   */
  max: number
}
