<script setup lang="ts">
import { type FilterItem, useFilterStore } from '@/store/filterStore'

const { toggleFilter } = useFilterStore()

defineProps<{
  filter: FilterItem
}>()
</script>

<template>
  <div
    class="flex bg-secondary text-md px-3 py-2 justify-center rounded-lg items-center border-2"
    :class="filter.selected ? 'border-green-500' : 'border-secondary'"
    @click="toggleFilter(filter)"
  >
    <label>{{ filter.displayName }}</label>
  </div>
</template>
