import { useState, useCallback } from 'react'
import { getCityFromCoordinates } from '../services/weatherAPI'

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState(null)
  const [error, setError] = useState('')

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return null
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const city = await getCityFromCoordinates(latitude, longitude)
            setCoordinates({ lat: latitude, lon: longitude, city })
            resolve({ lat: latitude, lon: longitude, city })
          } catch (err) {
            setError('Could not determine city')
            resolve(null)
          }
        },
        () => {
          setError('Permission denied')
          resolve(null)
        }
      )
    })
  }, [])

  return { getLocation, coordinates, error }
}
