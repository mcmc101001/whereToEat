<script setup lang="ts">
import { type RadiusItem, useRadiusStore } from '@/store/radiusStore'

const { setRadius } = useRadiusStore()

defineProps<{
  radiusItem: RadiusItem
}>()
</script>

<template>
  <button
    class="flex bg-secondary text-md px-3 py-2 justify-center rounded-lg items-center border-2"
    :class="radiusItem.selected ? 'border-green-500' : 'border-secondary'"
    @click="setRadius(radiusItem)"
  >
    <span>{{ radiusItem.displayName }}</span>
  </button>
</template>
