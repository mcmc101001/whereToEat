<script setup lang="ts">
import { getImage } from '@/api/getImage';
import type { Place } from '@/api/getNearbyPlaces';
import { ref, onMounted } from 'vue';

const props = defineProps<{
  place: Place
}>()

const { location, rating, displayName, photos } = props.place

const { text } = displayName
const { latitude, longitude } = location
const { name } = photos[0]
const photoRef = name.split("/photos/")[1]

const stars = [1, 2, 3, 4, 5] as const

const ratingNumber = rating ?? 0

const pictureIsLoading = ref(true)

const url = ref("")

onMounted(async() => {
  const img = await getImage(photoRef)
  url.value = URL.createObjectURL(img)
  pictureIsLoading.value = false
})

</script>

<template>
  <div class="bg-primary text-primary-foreground p-4 rounded-xl flex flex-col" >
    <font-awesome-icon v-if="pictureIsLoading" class="text-5xl" icon="fa-solid fa-spinner" spin-pulse />
    <img v-else class="rounded-2xl" :src="url">
    <div class="font-semibold text-2xl flex items-center justify-center mt-2">{{ displayName.text }}</div>
    <div class="mt-4 flex flex-row items-center justify-center gap-x-px">
      <div v-for="star in stars" :key="star" class="text-2xl">
        <font-awesome-icon v-if="star <= ratingNumber" icon="fa-solid fa-star" class="text-primary-foregound outline-primary-foreground" />
        <font-awesome-icon v-else-if="star > ratingNumber && star - ratingNumber <= 0.5" icon="fa-solid fa-star-half-stroke"></font-awesome-icon>
        <font-awesome-icon v-else icon="fa-regular fa-star"></font-awesome-icon>
      </div>
    </div>
    <div class="mt-2 text-xl flex items-center font-semibold justify-center">{{ rating ? rating.toFixed(1) : "(-)" }}</div>
  </div>
</template>
