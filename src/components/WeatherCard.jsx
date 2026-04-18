export default function WeatherCard({ weather }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain')) return '🌧️'
    if (desc.includes('cloud')) return '☁️'
    if (desc.includes('clear')) return '☀️'
    if (desc.includes('snow')) return '❄️'
    return '🌤️'
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center">
          <div className="text-6xl mb-4">
            {getWeatherIcon(weather.weather[0].description)}
          </div>
          <h2 className="text-3xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-5xl font-bold text-blue-600 mt-4">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-gray-600 capitalize text-lg mt-2">
            {weather.weather[0].description}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="💧 Humidity" value={`${weather.main.humidity}%`} />
          <DetailItem label="💨 Wind Speed" value={`${weather.wind.speed} m/s`} />
          <DetailItem label="🔵 Pressure" value={`${weather.main.pressure} hPa`} />
          <DetailItem label="👁️ Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
          <DetailItem label="☁️ Cloudiness" value={`${weather.clouds.all}%`} />
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}
