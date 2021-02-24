import { Alert } from "types"

/**
 * Objects representing the severe weather warnings issued for the requested location
 * by a governmental authority.
 *
 * @see https://darksky.net/dev/docs#response-alerts
 */
export interface DarkSkyAlert {
  /**
   * A detailed description of the alert.
   */
  description: string

  /**
   * The UNIX time at which the alert will expire.
   */
  expires: number

  /**
   * An array of strings representing the names of the regions covered by this weather alert.

   * Not received from OpenWeatherMap
   */
  regions?: string[]

  /**
   * The severity of the weather alert.
   *
   * Not received from OpenWeatherMap
   */
  severity?: undefined

  /**
   * The UNIX time at which the alert was issued.
   */
  time: number

  /**
   * A brief description of the alert.
   */
  title: string

  /**
   * An HTTP(S) URI that one may refer to for detailed information about the alert.
   *
   * Not received from OpenWeatherMap
   */
  url?: undefined
}

/**
 * Map a single Alert to DarkSky equivalent.
 *
 * @param alert OpenWeatherMap alert to map.
 * @returns DarkSky equivalent Alert data object.
 */
function mapAlert(alert: Alert): DarkSkyAlert {
  return {
    title: alert.event,
    description: alert.description,
    time: alert.start,
    expires: alert.end,
    regions: undefined,
    severity: undefined,
    url: undefined,
  }
}

/**
 * Map a given OpenWeatherMap object to the Dark Sky equivelent.
 *
 * @param alert OpenWeatherMap Alert data block.
 * @returns DarkSky equivelent Alert data block object.
 */
export function mapAlertsToDarkSky(alerts?: Alert[]): DarkSkyAlert[] {
  if (!alerts) return []

  return alerts.map(alert => mapAlert(alert))
}
