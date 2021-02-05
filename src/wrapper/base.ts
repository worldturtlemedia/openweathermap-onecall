import { AxiosRequestConfig } from "axios"

import { RequestParams } from "../types"
import { OpenWeatherMapClient, openWeatherMapClient } from "../client"

/**
 * Options object for configuring an instance of [[OpenWeatherMapBase]].
 */
export interface OpenWeatherMapOptions extends RequestParams {
  /**
   * Optional config to change the way axios makes the request.
   */
  requestConfig?: AxiosRequestConfig
}

/**
 * Base class for creating a wrapper for OpenWeatherMaps one-call API.
 *
 * @internal
 */
export class OpenWeatherMapBase {
  /**
   * OpenWeatherMap developer API token.
   */
  protected readonly token: string

  /**
   * Client for interacting with the API.
   */
  protected readonly client: OpenWeatherMapClient

  /**
   * Optional request paramaters.
   */
  protected requestParams: RequestParams

  /**
   * Create the base class.
   *
   * @param token OpenWeatherMap developer API token.
   * @param requestConfig Optional config for Axios.
   * @param requestParams Optional request parameters.
   */
  constructor(
    token: string,
    { requestConfig, ...requestParams }: OpenWeatherMapOptions = {}
  ) {
    this.token = token
    this.client = openWeatherMapClient(token, requestConfig)
    this.requestParams = requestParams
  }
}
