# OpenWeatherMap One Call - API Client

A Nodejs and Browser client for the new [OpenWeatherMap "One Call" API](https://openweathermap.org/api/one-call-api), written in TypeScript.

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/worldturtlemedia/openweathermap-onecall/CI/master?label=release) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/worldturtlemedia/openweathermap-onecall/CI/master?label=next) [![codecov](https://codecov.io/gh/worldturtlemedia/openweathermap-onecall/branch/master/graph/badge.svg?token=GSXRH8UDT3)](https://codecov.io/gh/worldturtlemedia/openweathermap-onecall)

[![npm version](https://badge.fury.io/js/onecall-api.svg)](https://badge.fury.io/js/owm-onecall-api) ![GitHub](https://img.shields.io/github/license/worldturtlemedia/openweathermap-onecall.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/owm-onecall-api.svg)

![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/worldturtlemedia/openweathermap-onecall/latest/master?sort=semver) [![dependencies Status](https://david-dm.org/worldturtlemedia/openweathermap-onecall/status.svg)](https://david-dm.org/worldturtlemedia/openweathermap-onecall) [![devDependencies Status](https://david-dm.org/worldturtlemedia/openweathermap-onecall/dev-status.svg)](https://david-dm.org/worldturtlemedia/openweathermap-onecall?type=dev)

An API wrapper for OWM One Call API, usable in node and the browser. It pairs best when used in a TypeScript project, as you will get all the types from the API response. This library makes interacting with the OpenWeatherMap "One Call" API a little bit more friendly. It offers promises, request customization, and best of all response types.

If there are any features you would like, please feel free to open up an issue.

### Motivation

I am also the author of [DarkSky API Client](https://github.com/worldturtlemedia/darksky-api), and I was saddened when I heard that [DarkSky API](https://blog.darksky.net/) annouced it was being shut down after being acquired from Apple.

There was not really an similar "one-call" experience, so it looks like [OpenWeatherMap](https://openweathermap.org/api/one-call-api) saw an opportunity and took it. For right now this library will **only** support the "one-call" API. There are plenty other libraries on NPM that cover the rest of the APIs.

**Again**: This will _only_ support the one-call API (for now).

### Notes

- I did my best to correctly add types for all of the supported endpoints. However if you notice an incorrect payload type, or some missing properties, please open up an issue, or submit a pull request.
- For use in the browser, you will need a CORS proxy.

## Features

- This library is powered by [tsdx](https://tsdx.io/), and outputs ~~UMD~~, CommonJS, and an ESM bundle.
- Supports OpenWeatherMap's new "one-call" API
  - Similar to what DarkSky's API was.
- Tree-shakeable! Keep those bundles small.
- Tested
- Generated library documentation
- Easy integration into an existing codebase that uses [DarkSky](https://github.com/worldturtlemedia/darksky-api/edit/master/DARKSKY.md).

## TODO

- Configure UMD release
- Add ability to pass in a CORS anywhere proxy

## Installation

```bash
yarn add onecall-api

# or

npm install onecall-api
```

## Getting started

You will need to obtain a API token from [OpenWeatherMap](https://openweathermap.org/price).

The free tier does give you access to the "one-call" endpoint.

## Usage

Create an account on [OpenWeatherMap](https://openweathermap.org/api/one-call-api), then get your API token.

There are a couple ways to use this library.

### DarkSky Compatibility

For integrating this library with an existing codebase that used to use DarkSky, please see the [DarkSky - Compat](https://github.com/worldturtlemedia/darksky-api/edit/master/DARKSKY.md) document.

### TimeMachine request

Any request can be made into a TimeMachine request by passing `{ time: 'some-timestamp' }` into any function that accepts an optional `params` object.

The `time` property an be any of the following:

- Date object.
- A valid formatted date-string.
- UNIX timestamp.

Either be a UNIX timestamp or a string formatted as follows:

```typescript
// UNIX timestamp
{
  time: 1558575452
}

// Date string
// [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone].
{
  time: "2019-01-01T00:00:00+0400"
}
```

The library will try it's best to parse the Date string you pass in, so you don't _need_ to supply it in the above format. But for safety its probably best.

> Timezone should either be omitted (to refer to local time for the location being requested),
> `Z` (referring to GMT time), or +[HH][mm] or -[HH][mm] for an offset from GMT
> in hours and minutes.

## 1. OpenWeatherMapClient class

Get instance of the factory.

Use any of the OpenWeatherMapClient helper functions (see below).

```typescript
// Optional Default options
const options: OpenWeatherMapOptions = {
  // Optional
  // Anything set here can be overriden when making the request

  units: Units.Metric,
  lang: Language.FRENCH,
}

// Create the api wrapper class
const openWeatherMap = new OpenWeatherMap(KEY, options)

// Use the wrapper

/**
 * Will get the weekly forecast using a helper function, it excludes all of the datablocks except
 * for the `daily` one.  If you need more than that you can use `DarkSky.forecast` and pass in
 * an Exclude array.
 */
async function getWeeklyForecast(
  lat: number,
  lon: number
): Promise<WeekForecast> {
  try {
    // You can pass options here to override the options set above
    const result: WeekForecast = await openWeatherMap.week(lat, lon, {
      lang: Language.ENGLISH,
    })
    console.log(`Got forecast for ${result.lat}-${result.lon}`)
    return result
  } catch (error) {
    // If OpenWeatherMap API doesn't return a 'daily' data-block, then this function will throw
    console.log("Unable to get the weekly forecast for the chosen location")
  }
}

;(async () => {
  const forecast = await getWeeklyForecast(42, 24)

  console.log(`Forecast for tomorrow: ${forecast.daily.temp.max}`)
})()
```

## 2. Chaining

You can build a request by using method chaining and a builder pattern.

```typescript
// Using helper function
import { buildOpenWeatherMapRequest } from "darksky-api"

buildOpenWeatherMapRequest("api-key", 42, 24)
  .extendHourly()
  .onlyHourly()
  .execute()
  .then(console.log)
  .catch(console.log)

// Using the DarkSky class
new OpenWeatherMap("api-key")
  .builder(42, 24)
  .time("May 05 2019") // Library will try it's best to parse this date string
  .units(Units.UK)
  .execute()
  .then(console.log)
  .catch(console.log)
```

## 3. Manual OpenWeatherMap client

This library also exports a minimal OpenWeatherMap wrapper, where you can manually create the requests.

```typescript
import { openWeatherMapClient } from "owm-onecall-api"

const targetDate = new Date(1558000000 * 1000)

openWeatherMapClient("api-key")
  .timeMachine({ lat: 42, lon: 24, time: targetDate }, { units: Units.Metric })
  .then(console.log)
  .catch(console.log)
```

## OpenWeatherMap class helper methods

Optional settings when creating a new wrapper:

```typescript
export interface OpenWeatherMapOptions {
  /**
   * Return weather conditions in the requested units.
   */
  units?: Units

  /**
   * Return summary properties in the desired language.
   *
   * @default Language.ENGLISH
   */
  lang?: Language

  /**
   * Exclude some number of data blocks from the API response.
   */
  exclude?: Exclude[]

  /**
   * Optional config to change the way axios makes the request.
   */
  requestConfig?: AxiosRequestConfig
}
```

All helper methods require the location `lat: number, lon: number`, and can take an optional settings object.

If you need the forecast for a specific date and time, you can use OpenWeathMaps's TimeMachine functionality by passing a `time` property to each helper function, example:

```typescript
new OpenWeatherMap("api-key").week(42, 24, { time: "May 5 2018" })
```

## License

```text
MIT License

Copyright (c) 2021 Jordon de Hoog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
