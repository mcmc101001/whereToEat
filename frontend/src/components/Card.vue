<script setup lang="ts">
import { getImage } from '@/api/getImage'
import type { Place } from '@/api/getNearbyPlaces'
import { ref, onMounted } from 'vue'
import { haversineDistance } from '@/lib/utils'

const props = defineProps<{
  currentLat: number
  currentLong: number
  place: Place
}>()

const { id, location, rating, displayName, photos } = props.place

const { latitude, longitude } = location

const distance = haversineDistance(latitude, props.currentLat, longitude, props.currentLong)

const name = photos ? photos[0].name : null
const photoRef = name ? name.split('/photos/')[1] : null

const stars = [1, 2, 3, 4, 5] as const

const ratingNumber = rating ?? 0

const pictureIsLoading = ref(true)

const url = ref('')

onMounted(async () => {
  if (!photoRef) {
    pictureIsLoading.value = false
    return
  }
  const img = await getImage(photoRef)
  url.value = URL.createObjectURL(img)
  pictureIsLoading.value = false
})
</script>

<template>
  <div class="bg-primary w-full text-primary-foreground p-4 rounded-[2rem] flex flex-col">
    <div class="flex justify-between mb-2 items-center">
      <div>
        <font-awesome-icon class="mr-[6px]" icon="fa-solid fa-location-crosshairs" />
        <span>{{ distance.toFixed(2) }} km</span>
      </div>
      <a
        target="_blank"
        :href="`https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}&query_place_id=${id}`"
      >
        <button class="text-sm rounded-full bg-secondary px-3 py-1">
          GMaps
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" /></button
      ></a>
    </div>
    <font-awesome-icon
      v-if="pictureIsLoading"
      class="text-5xl"
      icon="fa-solid fa-spinner"
      spin-pulse
    />
    <img v-else class="rounded-2xl max-h-80" :src="photos ? url : 'fallback.jpg'" />
    <div class="font-semibold text-2xl flex items-center justify-center mt-2 text-center">
      {{ displayName.text }}
    </div>
    <div class="mt-2 flex flex-row items-center justify-center gap-x-px">
      <div v-for="star in stars" :key="star" class="text-2xl">
        <font-awesome-icon
          v-if="star <= ratingNumber"
          icon="fa-solid fa-star"
          class="text-primary-foregound outline-primary-foreground"
        />
        <font-awesome-icon
          v-else-if="star > ratingNumber && star - ratingNumber <= 0.5"
          icon="fa-solid fa-star-half-stroke"
        ></font-awesome-icon>
        <font-awesome-icon v-else icon="fa-regular fa-star"></font-awesome-icon>
      </div>
    </div>
    <div class="mt-1 text-xl flex items-center font-semibold justify-center">
      {{ rating ? rating.toFixed(1) : '(-)' }}
    </div>
  </div>
</template>
