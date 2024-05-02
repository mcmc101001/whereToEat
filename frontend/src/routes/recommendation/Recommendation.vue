<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getNearbyPlaces, { type Place, type getNearbyPlacesBody } from '@/api/getNearbyPlaces'
import Card from '@/components/Card.vue'
import { useFilterStore } from '@/store/filterStore'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRadiusStore } from '@/store/radiusStore'
import { useRatingFilterStore } from '@/store/ratingFilterStore'

const route = useRoute()
const router = useRouter()

let MAX_LOCATION_NUMBER: number

const getLocation = () => {
  const lat = route.query.latitude
  const long = route.query.longitude
  return { lat, long }
}

const isLoading = ref(true)
const errorState = ref(false)
const errorMessage = ref('')

const { lat, long } = getLocation()

const latNumber = Number(lat)
const longNumber = Number(long)

if (Number.isNaN(latNumber) || Number.isNaN(longNumber)) {
  router.push({ name: 'Home' })
}

const { categories, selectedCategory } = storeToRefs(useFilterStore())
const { allFoodSelected, noneFoodSelected } = useFilterStore()
const { selectedRadius } = useRadiusStore()

const filters = categories.value
  .filter((category) => category.displayName === selectedCategory.value)[0]
  .filters.filter((item) => item.selected)
  .map((filterItem) => filterItem.apiName)

const foodCategorySelected = selectedCategory.value === 'Food'
const attractionCategorySelected = selectedCategory.value === 'Attractions'

const { minimumRating } = storeToRefs(useRatingFilterStore())

if (foodCategorySelected && (allFoodSelected || noneFoodSelected)) {
  filters.push('restaurant')
}

let places: Place[] = []
const placeIndex = ref(0)
const isOnline = ref(true)

onMounted(async () => {
  if (!navigator.onLine) {
    isOnline.value = false
    errorState.value = true
    isLoading.value = false
    errorMessage.value = 'No internet connection, please refresh the page when you are online.'
    return
  }
  try {
    const body: getNearbyPlacesBody = {
      lat: latNumber,
      long: longNumber,
      filters: filters,
      radius: selectedRadius[0]
    }
    places = await getNearbyPlaces(body)

    if (minimumRating.value[0] > 0) {
      places = places.filter((place) => place.rating && place.rating >= minimumRating.value[0])
    }

    errorState.value = false

    MAX_LOCATION_NUMBER = places.length
  } catch (e) {
    errorState.value = true
    if (e instanceof Error) {
      errorMessage.value = e.message
    }
  }
  isLoading.value = false
})

function nextPlace() {
  const newPlaceValue = placeIndex.value + 1
  if (newPlaceValue >= MAX_LOCATION_NUMBER) {
    placeIndex.value = MAX_LOCATION_NUMBER - 1
  }
  placeIndex.value = newPlaceValue
}

function prevPlace() {
  const newPlaceValue = placeIndex.value - 1
  if (newPlaceValue < 0) {
    placeIndex.value = 0
  } else {
    placeIndex.value = newPlaceValue
  }
}
</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else>
    <router-link :to="{ name: 'Home' }"
      ><font-awesome-icon class="absolute top-5 left-5 w-6 h-6 opacity-50" icon="fa-solid fa-xmark"
    /></router-link>
    <div class="h-full w-full py-10 px-10 flex items-center justify-center flex-col gap-4">
      <div class="flex flex-col w-full items-center justify-center flex-1 relative">
        <Transition
          mode="out-in"
          enter-from-class="opacity-50"
          leave-from-class="opacity-100"
          leave-to-class="opacity-50"
          enter-active-class="transition duration-150"
          leave-active-class="transition duration-150"
        >
          <KeepAlive :max="MAX_LOCATION_NUMBER">
            <div
              v-if="placeIndex === MAX_LOCATION_NUMBER || errorState"
              class="text-primary flex flex-col gap-4 text-2xl p-6 h-full w-full items-center justify-center text-center"
            >
              <template v-if="errorState">
                <span> Something went wrong! Please try again later.</span>
                <span class="text-sm text-muted-foreground" v-if="errorMessage !== ''"
                  >Error: {{ errorMessage }}
                </span></template
              >
              <span v-else-if="MAX_LOCATION_NUMBER === 20"
                >Max locations reached! Try refining your filters!</span
              >
              <span v-else>No more locations found! Try modifying your filters!</span>
              <router-link to="/" class="bg-primary rounded-full p-5 text-primary-foreground"
                >Go back</router-link
              >
            </div>
            <Card
              v-else
              :place="places[placeIndex]"
              :current-lat="latNumber"
              :current-long="longNumber"
              :key="placeIndex"
            />
          </KeepAlive>
        </Transition>
      </div>
      <div class="flex items-center justify-center w-full gap-3">
        <button
          :disabled="placeIndex == 0 || errorState"
          @click="prevPlace"
          class="p-3 flex-1 flex text-xl items-center justify-center bg-primary rounded-full"
          :class="placeIndex == 0 && 'opacity-50'"
        >
          &lt; Previous
        </button>
        <button
          :disabled="placeIndex == MAX_LOCATION_NUMBER || errorState"
          @click="nextPlace"
          class="p-3 flex-1 flex text-xl items-center justify-center bg-primary rounded-full"
          :class="placeIndex == MAX_LOCATION_NUMBER && 'opacity-50'"
        >
          Next &gt;
        </button>
      </div>
    </div>
  </template>
</template>
