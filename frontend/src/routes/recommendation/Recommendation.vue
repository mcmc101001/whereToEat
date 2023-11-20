<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import { onMounted, ref } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})

</script>

<template>
  <Loader v-if="isLoading" />
  <template v-else></template>
</template>