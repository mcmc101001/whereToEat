<script setup lang="ts">
import { type FilterItem, useStore } from '@/store/store';

const { toggleFilter } = useStore();

defineProps<{
  filter: FilterItem;
}>();

</script>

<template>
  <div class="flex bg-secondary text-lg px-3 py-2 justify-center rounded-lg items-center gap-2 border-2" :class="filter.selected ? 'border-green-500' : 'border-secondary' " @click="toggleFilter(filter)">
    <label>{{ filter.displayName }}</label>
  </div>
</template>