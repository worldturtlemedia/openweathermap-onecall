import { DailyDataBlock } from "../../src"
import { mapDailyToDarkSky } from "../../src/compat/darksky-daily"

import { onecall } from "./data/openweathermap"

describe("Darksky Compat - Daily", () => {
  it("Should do nothing if there is no data", () => {
    expect(mapDailyToDarkSky([])).toBeUndefined()
    expect(mapDailyToDarkSky()).toBeUndefined()
  })

  it("Should get the max temperature", () => {
    const data: DailyDataBlock = {
      ...onecall.daily[0],
      feels_like: {
        morn: 1,
        day: 2,
        eve: 3,
        night: 4,
      },
    }

    const result = mapDailyToDarkSky([data])!.data[0]
    expect(result.apparentTemperatureMax).toEqual(4)
    expect(result.apparentTemperatureMin).toEqual(1)
  })
})
