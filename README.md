# OpenWeatherMap One Call - API Client

**WIP**

A Nodejs and Browser client for the new [OpenWeatherMap "One Call" API](https://openweathermap.org/api/one-call-api), written in TypeScript.

### TODO Badges

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

- This library is powered by [tsdx](https://tsdx.io/), and outputs UMD, CommonJS, and an ESM bundle.
- Supports OpenWeatherMap's new "one-call" API
  - Similar to what DarkSky's API was.
- Tree-shakeable! Keep those bundles small.
- Tested
- Generated library documentation

## Installation

```bash
yarn add openweathermap-onecall

# or

npm install openweathermap-onecall
```

## Getting started

You will need to obtain a API token from [OpenWeatherMap](https://openweathermap.org/price).

The free tier does give you access to the "one-call" endpoint.

## Usage

TODO

## License

```
MIT License

Copyright (c) 2020 Jordon de Hoog

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
