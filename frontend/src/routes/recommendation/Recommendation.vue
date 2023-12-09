<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import getNearbyPlaces, { type Place, type getNearbyPlacesBody } from '@/api/getNearbyPlaces'

const route = useRoute()
const router = useRouter()

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
</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else>
    <div class="text-primary">hello {{ places[0].displayName.text }}</div>
  </template>
</template>