<script setup lang="ts">
import { type RadiusItem, useRadiusStore } from '@/store/radiusStore'

const { setRadius } = useRadiusStore()

defineProps<{
  radiusItem: RadiusItem
}>()
</script>

<template>
  <button
    class="flex px-3 py-2 whitespace-nowrap overflow-clip justify-center rounded-lg items-center border-2"
    :class="radiusItem.selected ? 'border-green-600 bg-green-600' : 'bg-secondary border-secondary'"
    @click="setRadius(radiusItem)"
  >
    <span>{{ radiusItem.displayName }}</span>
  </button>
</template>
