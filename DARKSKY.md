# DarkSky Compatibility

Since the DarkSky API service no longer accepts new developers, and will be shutting down their service soon. This library aims to also include an easy to use compatiblity layer.

If your codebase is already using DarkSky, you can easily swap it out for this library with a few extra steps.

## Info

First you should head on over to the [OpenWeatherMap docs](https://openweathermap.org/darksky-openweather), as they explain the compatiblity there.

**Note:** Not all of the response data is a 1:1 match to DarkSky, so some liberties were taken.

### Icons

We do provide OpenWeatherMap -> DarkSky icons, however not all of the icons match up. You can see how they map [here](https://github.com/worldturtlemedia/openweathermap-onecall/blob/master/src/compat/darksky-icons.ts).

We also include a the original icon along with the mapped icon.

## Usage

You can easily map the response of a OpenWeatherMap request to a DarkSky response.

Using a wrapper function:

```typescript
import { OpenWeatherMap, mapToDarkSkyForecast } from "owm-onecall-api"

const onecall = new OpenWeatherMap("token")

const response = await onecall.forecast(42, 42)
const darkSkyResponse = mapToDarkSkyForecast(response)

// Or as a single line
const response = await mapToDarkSkyForecast(onecall.forecast(42, 42))

console.log(response.currently.temp)
```

Creating a DarkSky compat client:

```typescript
import { openWeatherMapClient } from "owm-onecall-api"

const targetDate = new Date(1558000000 * 1000)
const response = await openWeatherMapClient("api-key").timeMachine(
  { lat: 42, lon: 24, time: targetDate },
  { units: Units.Metric }
)

console.log(response.currently.temp)
```

## Conclusion

Please look through the [type files](https://github.com/worldturtlemedia/openweathermap-onecall/tree/master/src/compat) to ensure the properties you need are mapped.

I did my best to ensure compatibility between the two services. But I am humans, and possibly make mistakes. So if you notice one please don't hesitate to open up a Pull Request.
