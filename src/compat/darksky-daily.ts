import {
  DarkSkyDataPoint,
  DarkSkyDataBlock,
  mapBaseDarkSkyDataPoint,
} from "./darksky-datablock"
import { DailyDataBlock } from "../types"
import { mapToDarkSkyWeatherIcon } from "./darksky-icons"

/**
 * A DarkSky equivelent Daily DataBlock.
 *
 * See {@link DarkSkyDataBlock}
 */
export interface DarkSkyDailyDataBlock extends DarkSkyDataBlock {
  data: DarkSkyDailyDataPoint[]
}

/**
 * A DarkSky equivelent of a Daily OpenWeatherMap DataBlock.
 *
 * See {@link DailyDataBlock} for more.
 */
export interface DarkSkyDailyDataPoint extends DarkSkyDataPoint {
  /**
   * Sunrise time as a UTC Unix timestamp.
   *
   * Mapped from DailyDataBlock.sunrise
   */
  sunriseTime: number

  /**
   * Sunrise time as a UTC Unix timestamp.
   *
   * Mapped from DailyDataBlock.sunrise
   */
  sunsetTime: number

  /**
   * The daytime high temperature.
   *
   * Mapped from DailyDataBlock.temp.day
   */
  temperatureHigh: number

  /**
   * The overnight low temperature.
   *
   * Mapped from DailyDataBlock.temp.night
   */
  temperatureLow: number

  /**
   * The daytime high apparent temperature.
   *
   * Mapped from DailyDataBlock.feels_like.day
   */
  apparentTemperatureHigh: number

  /**
   * The overnight low apparent temperature.
   *
   * Mapped from DailyDataBlock.feels_like.night
   */
  apparentTemperatureLow: number

  /**
   * The maximum temperature during a given date.
   *
   * Mapped from DailyDataBlock.temp.max
   */
  temperatureMax: number

  /**
   * The minimum temperature during a given date.
   *
   * Mapped from DailyDataBlock.temp.min
   */
  temperatureMin: number

  /**
   * The apparent maximum temperature during a given date.
   *
   * Mapped from DailyDataBlock.feels_like.max
   */
  apparentTemperatureMax: number

  /**
   * The apparent minimum temperature during a given date.
   *
   * Mapped from DailyDataBlock.feels_like.min
   */
  apparentTemperatureMin: number

  /**
   * Midday UV index
   *
   * Mapped from DailyDataBlock.uvi
   */
  uvIndex: number

  /**
   * Probability of precipitation.
   *
   * Mapped from DataBlock.pop
   */
  precipProbability: number
}

function mapDailyDataPoint(dataBlock: DailyDataBlock): DarkSkyDailyDataPoint {
  const baseDataPoint = mapBaseDarkSkyDataPoint(dataBlock)

  const feelsLikeValues = Object.values(dataBlock.feels_like)
  const apparentTemperatureMax = Math.max(...feelsLikeValues)
  const apparentTemperatureMin = Math.min(...feelsLikeValues)

  return {
    ...baseDataPoint,
    sunriseTime: dataBlock.sunrise,
    sunsetTime: dataBlock.sunset,
    temperatureHigh: dataBlock.temp.day,
    temperatureLow: dataBlock.temp.night,
    temperatureMax: dataBlock.temp.max,
    temperatureMin: dataBlock.temp.min,
    apparentTemperatureHigh: dataBlock.feels_like.day,
    apparentTemperatureLow: dataBlock.feels_like.night,
    apparentTemperatureMax,
    apparentTemperatureMin,
    uvIndex: dataBlock.uvi,
    precipProbability: dataBlock.pop,
  }
}

/**
 * Map a given OpenWeatherMap object to the Dark Sky equivelent.
 *
 * @param dataBlock OpenWeatherMap Daily data block.
 * @returns DarkSky equivelent Daily data block object.
 */
export function mapDailyToDarkSky(
  blocks: DailyDataBlock[] = []
): DarkSkyDailyDataBlock | undefined {
  const weather = blocks[0]?.weather[0]
  if (!weather) return

  return {
    summary: weather.description,
    icon: mapToDarkSkyWeatherIcon(weather.icon),
    originalIcon: weather.icon,
    data: blocks.map(daily => mapDailyDataPoint(daily)),
  }
}
