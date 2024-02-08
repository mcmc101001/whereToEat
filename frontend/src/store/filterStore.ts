import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'

export type CategoryLabel = 'Food' | 'Attractions'

export type Category = {
  displayName: CategoryLabel
  filters: FilterItem[]
}

export type FilterItem = {
  displayName: string
  selected: boolean
  apiName: string
}

export const useFilterStore = defineStore(
  'search-filters',
  () => {
    const foodItems = [
      { displayName: 'Bakery', selected: true, apiName: 'bakery' },
      { displayName: 'Chinese', selected: true, apiName: 'chinese_restaurant' },
      { displayName: 'French', selected: true, apiName: 'french_restaurant' },
      { displayName: 'Coffee', selected: true, apiName: 'coffee_shop' },
      { displayName: 'Italian', selected: true, apiName: 'italian_restaurant' },
      { displayName: 'Japanese', selected: true, apiName: 'japanese_restaurant' },
      { displayName: 'Korean', selected: true, apiName: 'korean_restaurant' },
      { displayName: 'Cafe', selected: true, apiName: 'cafe' },
      { displayName: 'Ice Cream', selected: true, apiName: 'ice_cream_shop' },
      { displayName: 'Vietnamese', selected: true, apiName: 'vietnamese_restaurant' },
      { displayName: 'Mexican', selected: true, apiName: 'mexican_restaurant' },
      { displayName: 'Thai', selected: true, apiName: 'thai_restaurant' }
    ].sort((a, b) => a.displayName.localeCompare(b.displayName))

    const attractionItems = [
      { displayName: 'Museum', selected: true, apiName: 'museum' },
      { displayName: 'Art Gallery', selected: true, apiName: 'art_gallery' },
      { displayName: 'Historical Landmark', selected: true, apiName: 'historical_landmark' },
      { displayName: 'Park', selected: true, apiName: 'park' },
      { displayName: 'Market', selected: true, apiName: 'market' },
      { displayName: 'Tourist Attraction', selected: true, apiName: 'tourist_attraction' }
    ].sort((a, b) => a.displayName.localeCompare(b.displayName))

    const categories: Ref<Category[]> = ref([
      { displayName: 'Food', filters: foodItems },
      {
        displayName: 'Attractions',
        filters: attractionItems
      }
    ])

    const selectedCategory: Ref<CategoryLabel> = ref('Food')

    const setSelectedCategory = (value: string | string[] | undefined) => {
      if (value === 'Food' || value === 'Attractions') {
        selectedCategory.value = value
        return
      }
    }

    const toggleFilter = (item: FilterItem) => {
      item.selected = !item.selected
    }

    const setAllFiltersTrue = (category: Category) => {
      category.filters.forEach((item) => {
        item.selected = true
      })
    }

    const setAllFiltersFalse = (category: Category) => {
      category.filters.forEach((item) => {
        item.selected = false
      })
    }

    const allFoodSelected = computed(() => {
      return categories.value
        .filter((category) => category.displayName === 'Food')[0]
        .filters.every((item) => item.selected)
    })

    const noneFoodSelected = computed(() => {
      return categories.value
        .filter((category) => category.displayName === 'Food')[0]
        .filters.every((item) => !item.selected)
    })

    const noneAttractionsSelected = computed(() => {
      return categories.value
        .filter((category) => category.displayName === 'Attractions')[0]
        .filters.every((item) => !item.selected)
    })

    return {
      categories,
      toggleFilter,
      selectedCategory,
      setAllFiltersTrue,
      setAllFiltersFalse,
      noneFoodSelected,
      allFoodSelected,
      noneAttractionsSelected,
      setSelectedCategory
    }
  },
  {
    persist: true
  }
)
