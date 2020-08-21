import { DarkSkyDataPoint, mapBaseDarkSkyDataPoint } from "./darksky-datablock"
import { CurrentDataBlock } from "../types"

/**
 * A DarkSky equivelent of a Current OpenWeatherMap DataBlock.
 *
 * See {@link CurrentDataBlock} for more.
 */
export interface DarkSkyCurrentDataPoint extends DarkSkyDataPoint {
  /**
   * Sunrise time as a UTC Unix timestamp.
   *
   * Mapped from CurrentDataBlock.sunrise
   */
  sunriseTime: number

  /**
   * Sunrise time as a UTC Unix timestamp.
   *
   * Mapped from CurrentDataBlock.sunrise
   */
  sunsetTime: number

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from CurrentDataBlock.temp
   */
  temperature: number

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from CurrentDataBlock.feels_like
   */
  apparentTemperature: number

  /**
   * Midday UV index
   *
   * Mapped from CurrentDataBlock.uvi
   */
  uvIndex: number
}

/**
 * Map a given OpenWeatherMap object to the Dark Sky equivelent.
 *
 * @param dataBlock OpenWeatherMap Current data block.
 * @returns DarkSky equivelent Current data block object.
 */
export function mapCurrentToDarkSky(
  dataBlock?: CurrentDataBlock
): DarkSkyCurrentDataPoint | undefined {
  if (!dataBlock) return

  const baseDataPoint = mapBaseDarkSkyDataPoint(dataBlock)

  return {
    ...baseDataPoint,
    sunriseTime: dataBlock.sunrise,
    sunsetTime: dataBlock.sunset,
    temperature: dataBlock.temp,
    apparentTemperature: dataBlock.feels_like,
    uvIndex: dataBlock.uvi,
  }
}
