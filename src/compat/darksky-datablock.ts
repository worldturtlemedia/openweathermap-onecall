/**
 * These types are used for mapping the OpenWeatherMap response values to DarkSky's API.
 *
 * You can read more about it from the {@link https://openweathermap.org/darksky-openweather#match documentation}.
 *
 * @packagedocumentation
 */

import { WeatherIcon } from "../types"
import { DataBlock, PrecipitationDataPoint } from "../types/response/datablock"
import { isNumber, isObject } from "../util/misc"
import { DarkSkyWeatherIcon, mapToDarkSkyWeatherIcon } from "./darksky-icons"

export const PRECIPITATION_RAIN = "rain"
export const PRECIPITATION_SNOW = "snow"

/**
 * A data block object represents the various weather phenomena occurring over a period of time.
 *
 * See {@link https://darksky.net/dev/docs#data-block-object DarkSky API docs} for more.
 */
export interface DarkSkyDataBlock {
  /**
   * A human-readable summary of this data block.
   */
  summary?: string

  /**
   * Weather condition icon id for mapping to DarkSky.
   */
  icon?: DarkSkyWeatherIcon

  /**
   * The original OpenWeatherMap condition icon id.
   *
   * See {@link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 Weather Condition Codes} for more info.
   */
  originalIcon?: WeatherIcon

  /**
   * An array of data points, ordered by time, which together describe the weather conditions
   * at the requested location over time.
   */
  data: DarkSkyDataPoint[]
}

export type PrecipitationType = "rain" | "snow"

/**
 * A data point object contains various properties, each representing the average
 * (unless otherwise specified) of a particular weather phenomenon occurring during
 * a period of time: an instant in the case of currently, a minute for minutely, an
 * hour for hourly, and a day for daily.
 *
 * See {@link https://darksky.net/dev/docs#data-point-object DarkSky API Docs} for more.
 */
export interface DarkSkyDataPoint {
  /**
   * Time of the forecasted data, unix, UTC.
   *
   * Mapped from DataBlock.dt
   */
  time: number

  /**
   * A human-readable summary of this data block.
   */
  summary: string

  /**
   * Weather condition icon id.
   */
  icon?: DarkSkyWeatherIcon

  /**
   * The original OpenWeatherMap condition icon id.
   *
   * See {@link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 Weather Condition Codes} for more info.
   */
  originalIcon: WeatherIcon

  /**
   * Forecasted temperature.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from DataBlock.temperature
   */
  temperature?: number

  /**
   * Temperature that accounts for the human perception of weather.
   *
   * Depending on the [[Units]] selected this value will change.
   *
   * [[Units]] – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   *
   * Mapped from DataBlock.feels_like
   */
  apparentTemperature?: number

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
   *
   * Mapped from DataBlock.dew_point
   */
  dewPoint: number

  /**
   * Cloudiness percent.
   *
   * Mapped from DataBlock.clouds
   */
  cloudCover: number

  /**
   * Average visibility measured in metres (m).
   */
  visibility?: number

  /**
   * Wind speed.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour
   *
   * Mapped from DataBlock.wind_speed
   */
  windSpeed: number

  /**
   * Wind gust.
   *
   * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   *
   * Mapped from DataBlock.wind_gust
   */
  windGust?: number

  /**
   * Wind direction in degrees (meteorological)
   *
   * Mapped from DataBlock.wind_deg
   */
  windBearing: number

  /**
   * Probability of precipitation.
   *
   * Mapped from DataBlock.pop
   */
  precipProbability?: number

  /**
   * The type of precipitation.
   *
   * Mapped from DataBlock.rain or DataBlock.snow
   */
  precipType?: PrecipitationType

  /**
   * Volume of precipitation for the last hour, measured in mm.
   *
   * Mapped from DataBlock.rain or DataBlock.snow
   */
  precipIntensity?: number

  /**
   * Midday UV index
   *
   * Mapped from DataBlock.uvi
   */
  uvIndex?: number
}

function parsePrecipitationType(
  block: DataBlock
): PrecipitationType | undefined {
  if (block.rain) return PRECIPITATION_RAIN
  else if (block.snow) return PRECIPITATION_SNOW

  return undefined
}

function parsePrecipitationIntensity(block: DataBlock): number | undefined {
  const precipitation = block.rain ?? block.snow

  if (isNumber(precipitation)) return precipitation as number
  else if (isObject(precipitation)) {
    const precipitationDataPoint = precipitation as PrecipitationDataPoint
    return precipitationDataPoint["1h"]
  }

  return undefined
}

/**
 * Extract the DarkSky equivelent precipitation values from an OpenWeatherMap DataBlock.
 *
 * @param block OpenWeatherMap data block.
 * @returns The DarkSky equivelent for precipitation and precipitation type.
 */
function mapBaseDarkSkyPrecipitation(block: DataBlock) {
  return {
    precipType: parsePrecipitationType(block),
    precipIntensity: parsePrecipitationIntensity(block),
  }
}

/**
 * Map a base level DataBlock to a base level DarkSkyDataPoint
 *
 * @param block DataBlock to convert to a DarkSky data point
 */
export function mapBaseDarkSkyDataPoint(block: DataBlock): DarkSkyDataPoint {
  const precipitation = mapBaseDarkSkyPrecipitation(block)

  const firstWeather = block.weather[0]

  return {
    time: block.dt,
    summary: firstWeather.description,
    icon: mapToDarkSkyWeatherIcon(firstWeather.icon),
    originalIcon: firstWeather.icon,
    pressure: block.pressure,
    humidity: block.humidity,
    dewPoint: block.dew_point,
    cloudCover: block.clouds,
    visibility: block.visibility,
    windSpeed: block.wind_speed,
    windBearing: block.wind_deg,
    windGust: block.wind_gust,
    precipProbability: block.pop,
    uvIndex: block.uvi,
    ...precipitation,
  }
}
