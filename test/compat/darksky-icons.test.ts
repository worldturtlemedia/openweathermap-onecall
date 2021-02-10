import {
  DarkSkyWeatherIcon,
  mapToDarkSkyWeatherIcon,
} from "../../src/compat/darksky-icons"
import { WeatherIcon } from "../../src/types/response"

describe("Darksky Compat - Icons", () => {
  it("Should map all icons", () => {
    expect(m(WeatherIcon.ClearSky)).toEqual(DarkSkyWeatherIcon.ClearDay)

    expect(m(WeatherIcon.ClearSkyNight)).toEqual(DarkSkyWeatherIcon.ClearNight)

    expect(m(WeatherIcon.FewClouds)).toEqual(DarkSkyWeatherIcon.Cloudy)
    expect(m(WeatherIcon.FewCloudsNight)).toEqual(DarkSkyWeatherIcon.Cloudy)

    expect(m(WeatherIcon.ScatteredClouds)).toEqual(
      DarkSkyWeatherIcon.PartlyCloudyDay
    )
    expect(m(WeatherIcon.BrokenClouds)).toEqual(
      DarkSkyWeatherIcon.PartlyCloudyDay
    )

    expect(m(WeatherIcon.ScatteredCloudsNight)).toEqual(
      DarkSkyWeatherIcon.PartlyCloudyNight
    )
    expect(m(WeatherIcon.BrokenCloudsNight)).toEqual(
      DarkSkyWeatherIcon.PartlyCloudyNight
    )

    expect(m(WeatherIcon.ShowerRain)).toEqual(DarkSkyWeatherIcon.Rain)
    expect(m(WeatherIcon.ShowerRainNight)).toEqual(DarkSkyWeatherIcon.Rain)
    expect(m(WeatherIcon.Rain)).toEqual(DarkSkyWeatherIcon.Rain)
    expect(m(WeatherIcon.RainNight)).toEqual(DarkSkyWeatherIcon.Rain)

    expect(m(WeatherIcon.Snow)).toEqual(DarkSkyWeatherIcon.Snow)
    expect(m(WeatherIcon.SnowNight)).toEqual(DarkSkyWeatherIcon.Snow)

    expect(m(WeatherIcon.Thunderstorm)).toEqual(DarkSkyWeatherIcon.Thunderstorm)
    expect(m(WeatherIcon.ThunderstormNight)).toEqual(
      DarkSkyWeatherIcon.Thunderstorm
    )

    expect(m(WeatherIcon.Mist)).toEqual(DarkSkyWeatherIcon.Fog)
    expect(m(WeatherIcon.MistNight)).toEqual(DarkSkyWeatherIcon.Fog)

    expect(m("foobar" as any)).toBeUndefined()
  })
})

const m = (icon: WeatherIcon) => mapToDarkSkyWeatherIcon(icon)
