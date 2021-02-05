import * as library from "../src"

describe("exports", () => {
  it("should export library components", () => {
    expect(library.openWeatherMapClient).toBeDefined()
    expect(library.buildOpenWeatherMapRequest).toBeDefined()
    expect(library.OpenWeatherMap).toBeDefined()
  })
})
