import axios, { AxiosRequestConfig } from "axios"

import { OneCallRequestParams, OneCallRequest, Forecast } from "./types"
import { isNumber } from "./util/misc"
import { badRequest } from "./util/errors"

/**
 * Base url for the OpenWeatherMap API.
 *
 * See {@link https://openweathermap.org/api/one-call-api One Call API} for more info.
 *
 * @internal
 */
export const API_BASE = "https://api.openweathermap.org/data/2.5/onecall"

/**
 * Basic client definintion for interacting with the OpenWeatherMap OneCall API.
 */
export interface OpenWeatherMapClient {
  /**
   * Make a Forecast request.
   *
   * See {@link https://openweathermap.org/api/one-call-api One Call API} for more info.
   * @param request Required Forecast request parameters.
   * @param optionalParams Optional query params to add to the request.
   */
  forecast: <R extends Forecast>(
    request: OneCallRequest,
    optionalParams?: OneCallRequestParams
  ) => Promise<R>
}

/**
 * Default implementation of ClientFactory for making authorized requests to the DarkSky API.
 *
 * Note: Get your token from {@link https://darksky.net/dev/account OpenWeatherMap}.
 *
 * @param apiToken Developer API token.
 * @param requestConfig Optional config to change the way axios makes the request.
 * @returns Client for interacting with the API.
 */
export function openWeatherMapClient(
  apiToken: string,
  requestConfig: AxiosRequestConfig = {}
): OpenWeatherMapClient {
  return {
    forecast: (request: OneCallRequest, params: OneCallRequestParams = {}) =>
      doRequest(apiToken, request, params, requestConfig),
  }
}

/**
 * Make an API request using all of the required and optional parameters.
 *
 * @internal
 * @typeparam R Type of response that extends Forecast.
 * @param apiToken Devloper access key for OpenWeatherMap API.
 * @param request Required Forecast request parameters.
 * @param optionalParams Optional query params to add to the request.
 * @param requestConfig Optional config to change the way axios makes the request.
 * @returns Forecast response with the HTTP headers.
 */
async function doRequest<R extends Forecast>(
  apiToken: string,
  request: OneCallRequest,
  optionalParams: OneCallRequestParams,
  requestConfig: AxiosRequestConfig
): Promise<R> {
  const url = createAPIUrl(apiToken, request, optionalParams)
  const result = await axios.get<R>(url, requestConfig)
  return result.data
}

/**
 * Create the URL for the request which includes the api token, location, and any option parameters.
 *
 * @internal
 * @param apiToken Devloper access key for OpenWeatherMap API.
 * @param lat Target latitude location for the weather request.
 * @param lon Target longitude location for the weather request.
 * @param optionalParams Optional request parameters.
 * @returns URL string for making the request.
 */
function createAPIUrl(
  apiToken: string,
  { lat, lon }: OneCallRequest,
  optionalParams: OneCallRequestParams
): string {
  if (!apiToken) {
    throw badRequest("API Token is required!")
  }

  if (!isNumber(lat) || !isNumber(lon)) {
    throw badRequest("Latitude and Longitude need to be a valid number!")
  }

  const queryParams = createQueryParams(apiToken, { lat, lon }, optionalParams)
  return `${API_BASE}${queryParams}`
}

/**
 * Takes a params object and converts it to an HTTP query parameters string.
 *
 * ```typescript
 * const apiToken = "2khkg3k2mn32vbn"
 * const request: OneCallRequest = { lat: 42, lon: 42 }
 * const params: OneCallRequestParams = { exclude: ['hourly', 'daily'], lang: 'en' }
 *
 * const query: string = createQueryParams(apiToken, request, params)
 * // query = '?appid=2khkg3k2mn32vbn&lat=42&lon=42exclude=hourly,daily&lang=en'
 * ```
 *
 * @internal
 * @param apiToken Access token for the OpenWeatherMap API.
 * @param request Required Forecast request parameters.
 * @param optionalParams Params object to convert into Query parameters.
 * @returns A query parameter string.
 */
function createQueryParams(
  apiToken: string,
  request: OneCallRequest,
  optionalParams: OneCallRequestParams
) {
  const obj = { appid: apiToken, ...request, ...optionalParams } as any

  // Filter out any invalid values, such as nulls and undefined, and expand arrays.
  const params = Object.keys(obj)
    .filter(key => typeof obj[key] !== "undefined" && obj[key] !== null)
    .filter(key => (Array.isArray(obj[key]) ? obj[key].length : true))
    .map(key => {
      const value = Array.isArray(obj[key])
        ? obj[key].join(",")
        : (obj[key] as string)
      return `${key}=${encodeURIComponent(value)}`
    })
    .join("&")

  return `?${params}`
}