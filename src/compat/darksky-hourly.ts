import {
  DarkSkyDataPoint,
  DarkSkyDataBlock,
  mapBaseDarkSkyDataPoint,
} from "./darksky-datablock"
import { HourlyDataBlock } from "../types"
import { mapToDarkSkyWeatherIcon } from "./darksky-icons"

/**
 * A DarkSky equivelent DataBlock.
 *
 * See {@link DarkSkyDataBlock}
 */
export interface DarkSkyHourlyDataBlock extends DarkSkyDataBlock {
  data: DarkSkyHourlyDataPoint[]
}

/**
 * A DarkSky equivelent of a Hourly OpenWeatherMap DataBlock.
 *
 * See {@link HourlyDataBlock} for more.
 */
export interface DarkSkyHourlyDataPoint extends DarkSkyDataPoint {
  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from DarkSkyDataPoint.temp
   */
  temperature: number

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from HourlyDataBlock.feels_like
   */
  apparentTemperature: number

  /**
   * Probability of precipitation.
   *
   * Mapped from DataBlock.pop
   */
  precipProbability: number

  /**
   * Average visibility measured in metres (m).
   */
  visibility: number
}

function mapHourlyDataPoint(
  dataBlock: HourlyDataBlock
): DarkSkyHourlyDataPoint {
  const baseDataPoint = mapBaseDarkSkyDataPoint(dataBlock)

  return {
    ...baseDataPoint,
    temperature: dataBlock.temp,
    apparentTemperature: dataBlock.feels_like,
    precipProbability: dataBlock.pop,
    visibility: dataBlock.visibility,
  }
}

/**
 * Map the OpenWeatherMap HourlyDataBlock to a DarkSky equivelent object.
 *
 * @param blocks List of OpenWeatherMap hourly data blocks.
 * @returns `undefined` if [[blocks]] is empty.
 */
export function mapHourlyToDarkSky(
  blocks: HourlyDataBlock[] = []
): DarkSkyHourlyDataBlock | undefined {
  const weather = blocks[0]?.weather[0]
  if (!weather) return

  return {
    summary: weather.description,
    icon: mapToDarkSkyWeatherIcon(weather.icon),
    originalIcon: weather.icon,
    data: blocks.map(hourly => mapHourlyDataPoint(hourly)),
  }
}
