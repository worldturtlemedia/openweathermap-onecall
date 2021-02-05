import { MinutelyDataBlock, WeatherIcon } from "../types"

/**
 * A Minutely only DataBlock.
 */
export interface DarkSkyMinutelyDataBlock {
  summary?: string
  icon?: WeatherIcon
  data: DarkSkyMinutelyDataPoint[]
}

/**
 * A DarkSky equivelent of a Minutely OpenWeatherMap DataBlock.
 *
 * See {@link MinutelyDataBlock} for more.
 */
export interface DarkSkyMinutelyDataPoint {
  /**
   * Time of the forecasted data, unix, UTC.
   *
   * Mapped from MinutelyDataBlock.dt
   */
  time: number

  /**
   * Precipitation volume, a number value measured in millimeters (mm).
   *
   * Mapped from MinutelyDataBlock.precipitation
   */
  precipIntensity: number
}

/**
 * Maps an OpenWeatherMap Minutely data block to a DarkSky compatible object.
 *
 * @param dataBlock OpenWeatherMap minutely data block.
 * @returns DarkSky equivelent Minutely Data Point.
 */
function mapMinutelyDataPoint(
  dataBlock: MinutelyDataBlock
): DarkSkyMinutelyDataPoint {
  return {
    time: dataBlock.dt,
    precipIntensity: dataBlock.precipitation,
  }
}

/**
 * Map an OpenWeatherMap minutely data block to a DarkSky comptible object.
 *
 * @param dataBlocks List of OpenWeatherMap minutely data points.
 * @returns DarkSky equivelent minutely data block.
 */
export function mapMinutelyToDarkSky(
  dataBlocks?: MinutelyDataBlock[]
): DarkSkyMinutelyDataBlock | undefined {
  if (!dataBlocks) return

  return {
    summary: undefined,
    icon: undefined,
    data: dataBlocks.map(block => mapMinutelyDataPoint(block)),
  }
}
