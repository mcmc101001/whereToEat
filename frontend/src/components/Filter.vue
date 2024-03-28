<script setup lang="ts">
import { type FilterItem, useFilterStore } from '@/store/filterStore'

const { toggleFilter } = useFilterStore()

defineProps<{
  filter: FilterItem
}>()
</script>

<template>
  <button
    class="flex bg-secondary text-md px-3 py-2 justify-center rounded-lg items-center border-2 relative"
    :class="filter.selected ? 'border-green-500' : 'border-secondary'"
    @click="toggleFilter(filter)"
  >
    <font-awesome-icon
      v-if="filter.selected"
      class="absolute top-auto right-2 text-green-500"
      icon="fa-solid fa-check"
    />
    <span>{{ filter.displayName }}</span>
  </button>
</template>
