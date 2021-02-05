import { WeatherIcon } from "../types/response"

/**
 * Represent the available weather icon codes available for DarkSky.
 *
 * Used as an interop between existing codebases that use DarkSky. However you really should stick to OpenWeatherMaps WeatherIcons, as you'll be able to access an icon.
 */
export enum DarkSkyWeatherIcon {
  ClearDay = "clear-day",
  ClearNight = "clear-night",
  Rain = "rain",
  Snow = "snow",
  Sleet = "sleet",
  Wind = "wind",
  Fog = "fog",
  Cloudy = "cloudy",
  PartlyCloudyDay = "partly-cloudy-day",
  PartlyCloudyNight = "partly-cloudy-night",
  Thunderstorm = "thunderstorm",
}

/**
 * Map an OpenWeatherMap icon id to a DarkSky Weather icon value.
 *
 * *Note:* There is not a direct 1:1 match, as DarkSky is missing some of the icons.
 *
 * @param icon OpenWeatherMap icon id
 * @returns The equivelent icon id for DarkSky's API.
 */
export function mapToDarkSkyWeatherIcon(
  icon: WeatherIcon
): DarkSkyWeatherIcon | undefined {
  switch (icon) {
    case WeatherIcon.ClearSky:
      return DarkSkyWeatherIcon.ClearDay
    case WeatherIcon.ClearSkyNight:
      return DarkSkyWeatherIcon.ClearNight
    case WeatherIcon.FewClouds:
    case WeatherIcon.FewCloudsNight:
      return DarkSkyWeatherIcon.Cloudy
    case WeatherIcon.ScatteredClouds:
    case WeatherIcon.BrokenClouds:
      return DarkSkyWeatherIcon.PartlyCloudyDay
    case WeatherIcon.ScatteredCloudsNight:
    case WeatherIcon.BrokenCloudsNight:
      return DarkSkyWeatherIcon.PartlyCloudyNight
    case WeatherIcon.ShowerRain:
    case WeatherIcon.ShowerRainNight:
    case WeatherIcon.Rain:
    case WeatherIcon.RainNight:
      return DarkSkyWeatherIcon.Rain
    case WeatherIcon.Snow:
    case WeatherIcon.SnowNight:
      return DarkSkyWeatherIcon.Snow
    case WeatherIcon.Thunderstorm:
    case WeatherIcon.ThunderstormNight:
      return DarkSkyWeatherIcon.Thunderstorm
    case WeatherIcon.Mist:
    case WeatherIcon.MistNight:
      return DarkSkyWeatherIcon.Fog
    default:
      return undefined
  }
}
