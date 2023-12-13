<script setup lang="ts">
import { type FilterItem, useStore } from '@/store/store';
import Filter from '@/components/Filter.vue';

const { filterItems, resetFilters } = useStore();

</script>

<template>
  <Button class="w-full bg-secondary text-lg px-3 py-2 rounded-xl" @click="resetFilters">Select All</Button>
  <div class="grid grid-cols-2 gap-2 w-full">
    <Filter v-for="filter in filterItems" :filter="filter" :key="filter.displayName" />
  </div>
</template>