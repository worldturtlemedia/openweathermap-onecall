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
  temp: {
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

    /**
     * Minimum daily temperature.
     */
    min: number

    /**
     * Maximum daily temperature.
     */
    max: number
  }

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feels_like: {
    /**
     * Morning apparent temperature.
     */
    morn: number

    /**
     * Day apparent temperature.
     */
    day: number

    /**
     * Evening apparent temperature.
     */
    eve: number

    /**
     * Night apparent temperature.
     */
    night: number
  }

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
