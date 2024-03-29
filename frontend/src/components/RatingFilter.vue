<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRatingFilterStore } from '@/store/ratingFilterStore'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const { minimumRating } = storeToRefs(useRatingFilterStore())
const { setMinimumRating } = useRatingFilterStore()

type RatingFilterItem = {
  minimumRating: number
}

const ratingFilters: RatingFilterItem[] = [
  { minimumRating: 0 },
  { minimumRating: 3.5 },
  { minimumRating: 4 },
  { minimumRating: 4.5 }
]
</script>

<template>
  <Dialog>
    <DialogTrigger class="relative overflow-hidden bg-secondary p-[1px] rounded-lg w-full">
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(hsl(var(--accent))_0%,hsl(var(--primary))_50%,hsl(var(--accent))_100%)]"
      />
      <span
        class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-secondary px-3 py-1 backdrop-blur-3xl"
      >
        <template v-if="minimumRating[0] === 0">Any rating</template>
        <template v-else
          ><span
            >Rated {{ minimumRating[0].toFixed(1) }}+
            <font-awesome-icon class="text-sm" icon="fa-solid fa-star"
          /></span>
        </template>
      </span>
    </DialogTrigger>
    <DialogContent class="text-foreground">
      <DialogTitle>Rating Filter</DialogTitle>
      <DialogDescription> Filter by minimum rating </DialogDescription>
      <div class="flex flex-col items-center gap-4">
        <span class="text-xl font-bold">
          {{ minimumRating[0].toFixed(1) }}
          <font-awesome-icon class="text-lg" icon="fa-solid fa-star" />
        </span>
        <Slider :default-value="[1000]" :min="0" :max="4.5" v-model="minimumRating" :step="0.1" />
        <div class="flex w-full justify-between gap-5">
          <button
            v-for="ratingFilter in ratingFilters"
            class="flex px-3 py-2 w-full whitespace-nowrap overflow-clip justify-center rounded-lg items-center border-2 bg-secondary border-secondary"
            @click="setMinimumRating(ratingFilter.minimumRating)"
          >
            <span>{{ ratingFilter.minimumRating }}</span>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
