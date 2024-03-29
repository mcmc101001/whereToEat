import { defineStore } from 'pinia'
import { ref } from 'vue'

export type RadiusItem = {
  displayName: string
  selected: boolean
  apiValue: number
}

export const useRadiusStore = defineStore(
  'search-radius',
  () => {
    const selectedRadius = ref([1000])

    const setSelectedRadius = (radius: number) => {
      if (radius < 100) {
        selectedRadius.value[0] = 100
      }
      if (radius > 10000) {
        selectedRadius.value[0] = 10000
      }
      selectedRadius.value[0] = radius
    }

    return { selectedRadius, setSelectedRadius }
  },
  {
    persist: true
  }
)
