import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import { useWeather } from './hooks/useWeather'
import { useGeolocation } from './hooks/useGeolocation'

function App() {
  const [city, setCity] = useState('London')
  const { weather, forecast, loading, error, fetchWeather } = useWeather()
  const { getLocation } = useGeolocation()

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (searchCity) => {
    setCity(searchCity)
    fetchWeather(searchCity)
  }

  const handleGeolocation = async () => {
    const coords = await getLocation()
    if (coords) {
      fetchWeather(coords.city)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🌤️ Weather Dashboard
          </h1>
          <p className="text-blue-100">Real-time weather forecasts for your city</p>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          onGeolocation={handleGeolocation}
        />

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 shadow-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-white text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="mt-4">Loading weather data...</p>
            </div>
          </div>
        )}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App
