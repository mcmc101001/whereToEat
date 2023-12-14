<script setup lang="ts">
import { useFilterStore } from '@/store/filterStore'
import Filter from '@/components/Filter.vue'
import { storeToRefs } from 'pinia'

const { resetFilters } = useFilterStore()
const { filterItems, noneSelected } = storeToRefs(useFilterStore())
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="grid grid-cols-2 gap-2 w-full">
      <Filter v-for="filter in filterItems" :filter="filter" :key="filter.displayName" />
    </div>
    <button class="w-full bg-secondary text-md px-3 py-2 rounded-xl" @click="resetFilters">
      Select All
    </button>
  </div>
  <div v-if="noneSelected" class="mt-2 text-center">
    Note: No filters selected means general places will be searched instead of food
  </div>
</template>
