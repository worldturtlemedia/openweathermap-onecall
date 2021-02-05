/**
 * Accepted units for temperature supported my OpenWeatherMap.
 *
 * See {@link https://openweathermap.org/api/one-call-api#data Units Docs} for more info.
 */
export enum Units {
  /**
   * The default units are:
   *
   * Temperature - Kelvin
   * Wind speed - metre/sec
   */
  Default = "",

  /**
   * The metric units are:
   *
   * Temperature - Celcius
   * Wind speed - metre/sec
   */
  Metric = "metric",

  /**
   * The imperial units are:
   *
   * Temperature - Fahrenheit
   * Wind speed - miles/hour
   */
  Imperial = "imperial",
}
