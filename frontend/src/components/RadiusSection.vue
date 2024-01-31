<script setup lang="ts">
import { useRadiusStore } from '@/store/radiusStore'
import Radius from '@/components/Radius.vue'
import { storeToRefs } from 'pinia'

const { radiusItems } = storeToRefs(useRadiusStore())
</script>

<template>
  <div class="grid grid-cols-4 mt-2 gap-2 w-full">
    <Radius
      v-for="radiusItem in radiusItems"
      :radiusItem="radiusItem"
      :key="radiusItem.displayName"
    />
  </div>
</template>
