<script setup lang="ts">
import { useRadiusStore } from '@/store/radiusStore'
import { storeToRefs } from 'pinia'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type RadiusItem = {
  radius: number
}

const radiusItems: RadiusItem[] = [
  { radius: 400 },
  { radius: 1000 },
  { radius: 2000 },
  { radius: 5000 }
]

const { selectedRadius } = storeToRefs(useRadiusStore())
const { setSelectedRadius } = useRadiusStore()
</script>

<!-- #EA580C -->
<template>
  <Dialog>
    <DialogTrigger class="relative overflow-hidden bg-secondary p-[1px] rounded-lg w-full">
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(hsl(var(--accent))_0%,hsl(var(--primary))_50%,hsl(var(--accent))_100%)]"
      />
      <span
        class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-secondary px-3 py-1 backdrop-blur-3xl"
      >
        &lt
        <template v-if="selectedRadius[0] < 1000"> {{ selectedRadius[0] }} m </template>
        <template v-else> {{ selectedRadius[0] / 1000 }} km </template>
        away
      </span>
    </DialogTrigger>
    <DialogContent class="text-foreground">
      <DialogTitle>Distance Filter</DialogTitle>
      <DialogDescription> Select maximum distance </DialogDescription>
      <div class="flex flex-col items-center gap-4">
        <span class="text-xl font-bold">
          &lt
          <template v-if="selectedRadius[0] < 1000"> {{ selectedRadius[0] }} m </template>
          <template v-else> {{ selectedRadius[0] / 1000 }} km </template>
          away
        </span>
        <Slider
          :default-value="[1000]"
          :min="100"
          :max="10000"
          v-model="selectedRadius"
          :step="100"
        />
        <div class="flex w-full justify-between gap-5">
          <button
            v-for="radiusItem in radiusItems"
            class="flex px-3 py-2 w-full whitespace-nowrap overflow-clip justify-center rounded-lg items-center border-2 bg-secondary border-secondary"
            @click="setSelectedRadius(radiusItem.radius)"
          >
            <span>{{ radiusItem.radius }}</span>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<!-- <button
  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Border Magic
  </span>
</button> -->
