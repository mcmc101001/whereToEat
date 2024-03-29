<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import FilterSection from '@/components/FilterSection.vue'
import RadiusSection from '@/components/RadiusSection.vue'
import RatingFilter from '@/components/RatingFilter.vue'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const appVer = localStorage.getItem('APP_VERSION')

  if (appVer !== 'v3.2') {
    localStorage.clear()
    localStorage.setItem('APP_VERSION', 'v3.3')
    window.location.reload()
  }
})

const errorState = ref(false)

function showError() {
  errorState.value = true
}

function setPosition(position: GeolocationPosition) {
  router.push({
    name: 'Recommendation',
    query: { latitude: position.coords.latitude, longitude: position.coords.longitude }
  })
  errorState.value = false
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
  } else {
    showError()
  }
}
</script>

<template>
  <div class="h-full w-full flex p-8 flex-col items-center justify-center">
    <div class="flex mb-4 w-full gap-2">
      <RadiusSection />
      <RatingFilter />
    </div>
    <div class="w-full h-px bg-foreground" />
    <FilterSection />
    <button
      class="h-48 mt-8 w-48 font-semibold p-6 rounded-full text-4xl bg-primary text-primary-foreground"
      @click="getLocation"
    >
      Find!
    </button>
    <p class="text-center mt-4" v-if="errorState">
      Error getting location! Please enable location permissions and try again!
    </p>
  </div>
</template>
