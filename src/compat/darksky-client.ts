import { AxiosRequestConfig } from "axios"

import { openWeatherMapClient } from "../client"
import { RequestParams, ForecastRequest, TimeMachineRequest } from "../types"
import { mapResultToDarkSkyForecast } from "./darksky-forecast"
import {
  DarkSkyForecastRequest,
  DarkSkyTimeMachineRequest,
  mapDarkSkyRequest,
} from "./darksky-request"

/**
 * Create a DarkSky compatible [[OpenWeatherMapClient]].
 *
 * Note: Get your token from {@link https://openweathermap.org/full-price#current OpenWeatherMap}.
 *
 * @param apiToken Developer API token.
 * @param requestConfig Optional config to change the way axios makes the request.
 * @returns Client for interacting with the API.
 */
export function darkSkyCompatClient(
  apiToken: string,
  requestConfig: AxiosRequestConfig = {}
) {
  const onecallClient = openWeatherMapClient(apiToken, requestConfig)

  const mapRequest = (
    request: ForecastRequest | DarkSkyForecastRequest
  ): ForecastRequest => {
    const darkSky = request as DarkSkyForecastRequest
    if (darkSky.latitude || darkSky.longitude) return mapDarkSkyRequest(darkSky)

    return request as ForecastRequest
  }

  return {
    forecast: (
      request: ForecastRequest | DarkSkyForecastRequest,
      params: RequestParams = {}
    ) =>
      mapResultToDarkSkyForecast(
        onecallClient.forecast(mapRequest(request), params)
      ),
    timeMachine: (
      request: TimeMachineRequest | DarkSkyTimeMachineRequest,
      params: RequestParams = {}
    ) =>
      mapResultToDarkSkyForecast(
        onecallClient.timeMachine(
          mapRequest(request) as TimeMachineRequest,
          params
        )
      ),
  }
}
