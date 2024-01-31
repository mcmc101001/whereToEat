import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type FilterItem = {
  displayName: string
  selected: boolean
  apiName: string
}

export const useFilterStore = defineStore(
  'search-filters',
  () => {
    const filterItems = ref(
      [
        { displayName: 'Bakery', selected: true, apiName: 'bakery' },
        { displayName: 'Chinese', selected: true, apiName: 'chinese_restaurant' },
        { displayName: 'French', selected: true, apiName: 'french_restaurant' },
        { displayName: 'Indian', selected: true, apiName: 'indian_restaurant' },
        { displayName: 'Italian', selected: true, apiName: 'italian_restaurant' },
        { displayName: 'Japanese', selected: true, apiName: 'japanese_restaurant' },
        { displayName: 'Korean', selected: true, apiName: 'korean_restaurant' },
        { displayName: 'Cafe', selected: true, apiName: 'cafe' },
        { displayName: 'Ice Cream', selected: true, apiName: 'ice_cream_shop' },
        { displayName: 'Vietnamese', selected: true, apiName: 'vietnamese_restaurant' }
      ].sort((a, b) => a.displayName.localeCompare(b.displayName))
    )

    const toggleFilter = (item: FilterItem) => {
      item.selected = !item.selected
    }

    const resetFilters = () => {
      filterItems.value.forEach((item) => {
        item.selected = true
      })
    }

    const allSelected = computed(() => {
      return filterItems.value.every((item) => item.selected)
    })

    const noneSelected = computed(() => {
      return filterItems.value.every((item) => !item.selected)
    })

    return { filterItems, toggleFilter, resetFilters, allSelected, noneSelected }
  },
  {
    persist: false
  }
)
