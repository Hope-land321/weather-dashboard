import { useState } from 'react'

export default function SearchBar({ onSearch, onGeolocation }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a city..."
        className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
      />
      <button
        type="submit"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
      >
        🔍 Search
      </button>
      <button
        type="button"
        onClick={onGeolocation}
        className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-lg"
      >
        📍 Locate
      </button>
    </form>
  )
}
