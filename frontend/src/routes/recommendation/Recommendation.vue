<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import getNearbyPlaces, { type Place, type getNearbyPlacesBody } from '@/api/getNearbyPlaces'
import Card from '@/components/Card.vue';

const route = useRoute()
const router = useRouter()

const MAX_LOCATION_NUMBER = 20

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

let places: Place[] = []
const placeIndex = ref(0)

onMounted(async() => {
  try {
    const body: getNearbyPlacesBody = {
      lat: latNumber,
      long: longNumber
    }
    places = await getNearbyPlaces(body)
  } catch (e) {
    console.error(e)
    router.push({ name: 'Home' })
  }
  isLoading.value = false
})

function nextPlace() {
  const newPlaceValue = placeIndex.value + 1
  placeIndex.value = newPlaceValue >= MAX_LOCATION_NUMBER ? 0 : newPlaceValue
}

</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else>
    <div class="h-full w-full py-20 px-10 flex items-center justify-center flex-col gap-4">
      <div class="flex items-center justify-center flex-1">
        <Card :place="places[placeIndex]" :key="placeIndex" />  
      </div>    
      <button @click="nextPlace" class="p-3 flex text-2xl w-full items-center justify-center bg-primary rounded-full">
        Next >
      </button>
    </div>
  </template>
</template>