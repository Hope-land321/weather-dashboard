import { useState, useCallback } from 'react'
import { getWeatherData, getForecastData } from '../services/weatherAPI'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = useCallback(async (city) => {
    setLoading(true)
    setError('')

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(city),
        getForecastData(city),
      ])

      setWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }, [])

  return { weather, forecast, loading, error, fetchWeather }
}
