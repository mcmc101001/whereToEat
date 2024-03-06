import axios from 'axios'

const endpoint = import.meta.env.VITE_API_URL

export async function getImage(placeId: string, imgRef: string) {
  const response = await axios.get(`${endpoint}/picture?place_id=${placeId}&img_ref=${imgRef}`, {
    responseType: 'blob'
  })
  return response.data
}
