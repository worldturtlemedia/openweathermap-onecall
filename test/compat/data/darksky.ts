import {
  DarkSkyDataPoint,
  DarkSkyForecast,
  DarkSkyWeatherIcon,
} from "../../../src/compat"
import { WeatherIcon } from "../../../src/types"

const BASE_DATA_POINT: DarkSkyDataPoint = {
  time: 1,
  summary: "foo",
  precipType: "rain",
  precipIntensity: 1,
  icon: DarkSkyWeatherIcon.ClearDay,
  originalIcon: WeatherIcon.ClearSky,
  pressure: 1,
  humidity: 1,
  dewPoint: 1,
  cloudCover: 1,
  visibility: 1,
  windSpeed: 1,
  windBearing: 1,
  windGust: 1,
  precipProbability: 1,
  uvIndex: 1,
}

export const darksky: DarkSkyForecast = {
  latitude: 1,
  longitude: 1,
  timezone: "foo",
  currently: {
    ...BASE_DATA_POINT,
    sunriseTime: 1,
    sunsetTime: 1,
    temperature: 1,
    apparentTemperature: 1,
    uvIndex: 1,
  },
  minutely: {
    summary: undefined,
    icon: undefined,
    data: [
      {
        time: 1,
        precipIntensity: 1,
      },
    ],
  },
  hourly: {
    summary: "foo",
    icon: DarkSkyWeatherIcon.ClearDay,
    originalIcon: WeatherIcon.ClearSky,
    data: [
      {
        ...BASE_DATA_POINT,
        temperature: 1,
        apparentTemperature: 1,
      },
    ],
  },
  daily: {
    summary: "foo",
    icon: DarkSkyWeatherIcon.ClearDay,
    originalIcon: WeatherIcon.ClearSky,
    data: [
      {
        ...BASE_DATA_POINT,
        sunriseTime: 1,
        sunsetTime: 1,
        temperatureHigh: 1,
        temperatureLow: 1,
        temperatureMax: 1,
        temperatureMin: 1,
        apparentTemperatureHigh: 1,
        apparentTemperatureLow: 1,
        apparentTemperatureMax: 1,
        apparentTemperatureMin: 1,
        uvIndex: 1,
      },
    ],
  },
}
