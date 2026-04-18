const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getWeatherData(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
  if (!response.ok) throw new Error('City not found')
  return response.json()
}

export async function getForecastData(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )
  if (!response.ok) throw new Error('Forecast not available')
  return response.json()
}

export async function getCityFromCoordinates(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  if (!response.ok) throw new Error('Location not found')
  const data = await response.json()
  return data.name
}
