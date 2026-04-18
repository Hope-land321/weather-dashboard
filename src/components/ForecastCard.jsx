export default function ForecastCard({ forecast }) {
  const getUniqueDays = () => {
    const days = new Map()
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if (!days.has(date)) {
        days.set(date, item)
      }
    })
    return Array.from(days.values()).slice(0, 5)
  }

  const getWeatherEmoji = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('clear')) return '☀️'
    if (desc.includes('snow')) return '❄️'
    return '🌤️'
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8">
      <h3 className="text-2xl font-bold mb-6">📅 5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {getUniqueDays().map((day, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105"
          >
            <p className="font-semibold text-gray-700 mb-2">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p className="text-3xl mb-2">
              {getWeatherEmoji(day.weather[0].description)}
            </p>
            <p className="text-2xl font-bold text-gray-800 mb-1">
              {Math.round(day.main.temp)}°C
            </p>
            <p className="text-sm text-gray-600 capitalize mb-2">
              {day.weather[0].description}
            </p>
            <p className="text-xs text-gray-500">💧 {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
