<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const errorState = ref(false)

function showError() {
  errorState.value = true
}

function setPosition(position: GeolocationPosition) {
  router.push({ name: "Recommendation", query: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
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
  <button class="h-12 p-2 rounded-lg bg-primary text-primary-foreground" @click="getLocation">
    Get location
  </button>
  <p v-if="errorState">Error getting location! Please enable location permissions and try again!</p>
</template>
