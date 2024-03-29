import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRatingFilterStore = defineStore(
  'rating-filter',
  () => {
    const minimumRating = ref([0])

    const setMinimumRating = (rating: number) => {
      if (rating < 0) {
        minimumRating.value[0] = 0
      }
      if (rating > 4.5) {
        minimumRating.value[0] = 4.5
      }
      minimumRating.value[0] = rating
    }

    return { minimumRating, setMinimumRating }
  },
  {
    persist: true
  }
)
