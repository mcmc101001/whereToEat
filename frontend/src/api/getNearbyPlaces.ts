import axios from 'axios'
import z from 'zod'
import { isValidBody } from '@/lib/utils'

const endpoint = import.meta.env.VITE_API_URL

export interface getNearbyPlacesBody {
  lat: number
  long: number
  filters: string[]
  radius: number
}

const placeSchema = z.object({
  location: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  rating: z.number().optional(),
  displayName: z.object({
    text: z.string(),
    languageCode: z.string().optional()
  }),
  photos: z
    .array(
      z.object({
        name: z.string(),
        widthPx: z.number(),
        heightPx: z.number(),
        authorAttributions: z.array(
          z
            .object({
              displayName: z.string().optional(),
              uri: z.string().optional(),
              photoUri: z.string().optional()
            })
            .optional()
        )
      })
    )
    .optional()
})

export type Place = z.infer<typeof placeSchema>

export default async function getNearbyPlaces({ lat, long, filters, radius }: getNearbyPlacesBody) {
  const responseSchema = z.object({
    places: z.array(placeSchema)
  })

  const response = await axios.post(`${endpoint}/nearbyPlaces`, {
    latitude: lat,
    longitude: long,
    filters: filters,
    radius: radius
  })
  if (response.status == 200 && JSON.stringify(response.data) === '{}') {
    return []
  }
  if (!isValidBody(response.data, responseSchema)) {
    console.log(response.data)
    throw new Error('Invalid response body')
  }
  return response.data.places
}
