import axios from 'axios'
import z from 'zod'
import { isValidBody } from '@/lib/utils'

const endpoint = import.meta.env.VITE_API_URL

export interface getNearbyPlacesBody {
  lat: number
  long: number
}

const placeSchema = z.object({
  location: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  rating: z.number().optional(),
  displayName: z.object({
    text: z.string(),
    languageCode: z.string()
  })
})

export type Place = z.infer<typeof placeSchema>

export default async function getNearbyPlaces({ lat, long }: getNearbyPlacesBody) {
  const responseSchema = z.object({
    places: z.array(placeSchema)
  })

  const response = await axios.post(`${endpoint}/nearbyPlaces`, { latitude: lat, longitude: long })
  if (!isValidBody(response.data, responseSchema)) {
    throw new Error('Invalid response body')
  }
  return response.data.places
}
