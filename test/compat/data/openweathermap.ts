import { FullForecast, WeatherIcon } from "../../../src/types/response"

export const onecall: FullForecast = {
  lat: 42.9849,
  lon: -81.2453,
  timezone: "America/Nipigon",
  timezone_offset: -18000,
  current: {
    dt: 1614127427,
    sunrise: 1614082222,
    sunset: 1614121595,
    temp: 2.3,
    feels_like: -2.44,
    pressure: 1009,
    humidity: 75,
    dew_point: -1.47,
    uvi: 0,
    clouds: 20,
    visibility: 10000,
    wind_speed: 3.6,
    wind_deg: 240,
    wind_gust: 1,
    rain: {
      "1h": 0.12,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: WeatherIcon.FewClouds,
      },
    ],
  },
  minutely: [
    {
      dt: 1614127440,
      precipitation: 1,
    },
  ],
  hourly: [
    {
      dt: 1614150000,
      temp: -0.74,
      feels_like: -5.28,
      pressure: 1013,
      humidity: 97,
      dew_point: -1.19,
      uvi: 0,
      clouds: 100,
      visibility: 4604,
      wind_speed: 3.41,
      wind_deg: 211,
      wind_gust: 7.28,
      weather: [
        {
          id: 600,
          main: "Snow",
          description: "light snow",
          icon: WeatherIcon.Snow,
        },
      ],
      pop: 0.24,
      snow: {
        "1h": 0.12,
      },
    },
  ],
  daily: [
    {
      dt: 1614099600,
      sunrise: 1614082222,
      sunset: 1614121595,
      temp: {
        day: 1.36,
        min: -2.23,
        max: 2.3,
        night: 0.09,
        eve: 1.3,
        morn: 0.23,
      },
      feels_like: {
        day: -5.62,
        night: -5.28,
        eve: -5.13,
        morn: -6.51,
      },
      pressure: 1003,
      humidity: 99,
      dew_point: 1.25,
      wind_speed: 7.4,
      wind_deg: 282,
      weather: [
        {
          id: 601,
          main: "Snow",
          description: "snow",
          icon: WeatherIcon.Snow,
        },
      ],
      clouds: 100,
      pop: 1,
      snow: 4.83,
      uvi: 1.51,
    },
  ],
  alerts: [
    {
      sender_name: "NWS Tulsa (Eastern Oklahoma)",
      event: "Heat Advisory",
      start: 1597341600,
      end: 1597366800,
      description: "This is a sample alert",
    },
  ],
}
