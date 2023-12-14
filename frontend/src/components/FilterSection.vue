<script setup lang="ts">
import { useStore } from '@/store/store';
import Filter from '@/components/Filter.vue';
import { storeToRefs } from 'pinia';

const { resetFilters } = useStore();
const { filterItems, noneSelected } = storeToRefs(useStore());

</script>

<template>
  <button class="w-full bg-secondary text-lg px-3 py-2 rounded-xl" @click="resetFilters">Select All</button>
  <div class="grid grid-cols-2 mt-2 gap-2 w-full">
    <Filter v-for="filter in filterItems" :filter="filter" :key="filter.displayName" />
  </div>
  <div v-if="noneSelected" class="mt-2 text-center">Note: No filters selected means general places will be searched</div>
</template>