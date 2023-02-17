const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv

const { OpenWeatherMap } = require("../dist")

const apiKey = argv.key || argv.k
if (!apiKey) {
  throw new Error("You must provide an API key")
}

const latitude = argv.lat ?? -45.031162
const longitude = argv.lon ?? 168.662643
if (!latitude || !longitude) {
  throw new Error("You must provide a latitude and longitude")
}

const openWeatherMap = new OpenWeatherMap(apiKey)

async function getWeeklyForecast(lat, lon) {
  try {
    // You can pass options here to override the options set above
    const result = await openWeatherMap.week(lat, lon, { units: "metric" })
    return result
  } catch (error) {
    // If OpenWeatherMap API doesn't return a 'daily' data-block, then this function will throw
    console.log("Unable to get the weekly forecast for the chosen location")
    throw error
  }
}

getWeeklyForecast(latitude, longitude)
  .then(forecast => {
    console.log("Forecast")
    console.log(JSON.stringify(forecast, null, 2))
  })
  .catch(error => {
    console.error(error)
  })
