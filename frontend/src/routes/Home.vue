<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import FilterSection from '@/components/FilterSection.vue'
import RadiusSection from '@/components/RadiusSection.vue'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const appVer = localStorage.getItem('APP_VERSION')

  if (appVer !== "v3.1") {
    localStorage.clear()
    localStorage.setItem('APP_VERSION', 'v3.1')
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
  <div class="h-full w-full flex p-8 flex-col items-center justify-center gap-4">
    <RadiusSection />
    <FilterSection />
    <button
      class="h-48 mt-8 w-48 font-semibold p-6 rounded-full text-4xl bg-primary text-primary-foreground"
      @click="getLocation"
    >
      Find food!
    </button>
    <p class="text-center" v-if="errorState">
      Error getting location! Please enable location permissions and try again!
    </p>
  </div>
</template>
