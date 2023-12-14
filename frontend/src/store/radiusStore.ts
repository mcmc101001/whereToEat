import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Ref } from 'vue'

export type RadiusItem = {
  displayName: string
  selected: boolean
  apiValue: number
}

export const useRadiusStore = defineStore('search-radius', () => {
  const radiusItems: Ref<RadiusItem[]> = ref([
    { displayName: '< 1km', selected: false, apiValue: 1000 },
    { displayName: '< 2km', selected: true, apiValue: 2000 },
    { displayName: '< 5km', selected: false, apiValue: 5000 }
  ])

  const setRadius = (selectedItem: RadiusItem) => {
    radiusItems.value.forEach((item) => {
      if (item === selectedItem) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
  }

  return { radiusItems, setRadius }
})
