<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import getNearbyPlaces, { type Place, type getNearbyPlacesBody } from '@/api/getNearbyPlaces'
import Card from '@/components/Card.vue';
import { useFilterStore } from '@/store/filterStore';
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

let MAX_LOCATION_NUMBER: number

const getLocation = () => {
  const lat = route.query.latitude
  const long = route.query.longitude
  return { lat, long }
}

const isLoading = ref(true)

const { lat, long } = getLocation()

const latNumber = Number(lat)
const longNumber = Number(long)

if (Number.isNaN(latNumber) || Number.isNaN(longNumber)) {
  router.push({ name: 'Home' })
}

const { filterItems } = storeToRefs(useFilterStore())
const { allSelected } = useFilterStore()

const filters = allSelected ? ['restaurant'] : filterItems.value.filter((item) => item.selected).map((filterItem) => filterItem.apiName)

let places: Place[] = []
const placeIndex = ref(0)

onMounted(async() => {
  try {
    const body: getNearbyPlacesBody = {
      lat: latNumber,
      long: longNumber,
      filters: filters,
    }
    places = await getNearbyPlaces(body)   

    MAX_LOCATION_NUMBER = places.length
  } catch (e) {
    console.error(e)
    router.push({ name: 'Home' })
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
    <router-link :to="{ name: 'Home'}"><font-awesome-icon class="absolute top-5 left-5 w-6 h-6 opacity-50" icon="fa-solid fa-xmark" /></router-link>
    <div class="h-full w-full py-10 px-10 flex items-center justify-center flex-col gap-4">
      <div class="flex items-center justify-center flex-1">
        <div v-if="placeIndex === MAX_LOCATION_NUMBER" class="text-primary flex flex-col gap-4 text-2xl p-6 h-full w-full items-center justify-center text-center">
          <span>No more locations found! Try changing your filters!</span>
          <router-link to="/" class="bg-primary rounded-full p-5 text-primary-foreground">Go back</router-link>
        </div>
        <Card v-else :place="places[placeIndex]" :key="placeIndex" />  
      </div>
      <div class="flex items-center justify-center w-full gap-3">  
        <button :disabled="placeIndex == 0" @click="prevPlace" class="p-3 flex-1 flex text-xl items-center justify-center bg-primary rounded-full" 
        :class="placeIndex == 0 && 'opacity-50'">
          &lt; Previous
        </button>
        <button :disabled="placeIndex == MAX_LOCATION_NUMBER" @click="nextPlace" class="p-3 flex-1 flex text-xl items-center justify-center bg-primary 
        rounded-full" :class="placeIndex == MAX_LOCATION_NUMBER && 'opacity-50'">
          Next &gt;
        </button>
      </div> 
    </div>
  </template>
</template>