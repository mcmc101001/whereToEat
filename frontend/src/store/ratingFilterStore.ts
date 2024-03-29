import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRatingFilterStore = defineStore(
  'rating-filter',
  () => {
    const minimumRating = ref([0])

    const setMinimumRating = (rating: number) => {
      minimumRating.value[0] = rating
    }

    return { minimumRating, setMinimumRating }
  },
  {
    persist: true
  }
)
