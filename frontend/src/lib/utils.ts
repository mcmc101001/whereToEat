import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import z from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidBody<T extends z.ZodTypeAny>(
  body: any,
  schema: T
): body is z.infer<typeof schema> {
  const { success } = schema.safeParse(body)
  return success
}

export function haversineDistance(lat1: number, lat2: number, lon1: number, lon2: number) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180
  lon2 = (lon2 * Math.PI) / 180
  lat1 = (lat1 * Math.PI) / 180
  lat2 = (lat2 * Math.PI) / 180

  // Haversine formula
  const dlon = lon2 - lon1
  const dlat = lat2 - lat1
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

  const c = 2 * Math.asin(Math.sqrt(a))

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371

  // calculate the result
  return c * r
}
