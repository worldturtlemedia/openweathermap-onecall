import {
  FullForecast,
  WeatherIcon,
  CurrentDataBlock,
  HourlyDataBlock,
  DailyDataBlock,
} from "../../../src/types/response"
import { DataBlock } from "../../../src/types/response/datablock"

const DATABLOCK: DataBlock = {
  dt: 1,
  temp: 1,
  feels_like: 1,
  pressure: 1,
  humidity: 1,
  dew_point: 1,
  clouds: 1,
  visibility: 1,
  wind_speed: 1,
  wind_gust: 1,
  wind_deg: 1,
  pop: 1,
  weather: {
    id: 1,
    main: "foo",
    description: "foo",
    icon: WeatherIcon.ClearSky,
  },
  rain: {
    "1h": 1,
  },
  snow: {
    "1h": 1,
  },
  uvi: 1,
}

export const onecall: FullForecast = {
  lat: 1,
  lon: 1,
  timezone: "foo",
  timezone_offset: 1,
  current: {
    ...(DATABLOCK as CurrentDataBlock),
    sunrise: 1,
    sunset: 1,
    temp: 1,
    feels_like: 1,
    uvi: 1,
  },
  minutely: [
    {
      dt: 1,
      precipitation: 1,
    },
  ],
  hourly: [
    {
      ...(DATABLOCK as HourlyDataBlock),
      temp: 1,
      feels_like: 1,
    },
  ],
  daily: [
    {
      ...(DATABLOCK as DailyDataBlock),
      sunrise: 1,
      sunset: 1,
      uvi: 1,
      rain: 1,
      snow: 1,
      temp: {
        morn: 1,
        day: 1,
        eve: 1,
        night: 1,
        max: 1,
        min: 1,
      },
      feels_like: {
        morn: 1,
        day: 1,
        eve: 1,
        night: 1,
      },
    },
  ],
}
