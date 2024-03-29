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
    <DialogTrigger class="bg-secondary p-2 rounded-lg w-full">
      <template v-if="minimumRating[0] === 0">Any rating</template>
      <template v-else
        >Rated {{ minimumRating[0].toFixed(1) }}{{ minimumRating[0] !== 5 ? '+' : '' }}
        <font-awesome-icon class="text-sm" icon="fa-solid fa-star" />
      </template>
    </DialogTrigger>
    <DialogContent class="text-foreground">
      <DialogTitle>Rating Filter</DialogTitle>
      <DialogDescription> Filter by minimum rating </DialogDescription>
      <div class="flex flex-col items-center gap-4">
        <span class="text-xl font-bold"
          ><font-awesome-icon class="text-lg" icon="fa-solid fa-greater-than-equal" />
          {{ minimumRating[0].toFixed(1) }} / 5.0
        </span>
        <Slider :default-value="[1000]" :min="0" :max="5" v-model="minimumRating" :step="0.1" />
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
