<script setup lang="ts">
import { useFilterStore, type Category } from '@/store/filterStore'
import Filter from '@/components/Filter.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const { setAllFiltersTrue, setAllFiltersFalse, setSelectedCategory } = useFilterStore()
const { categories, noneFoodSelected, selectedCategory, noneAttractionsSelected } = storeToRefs(useFilterStore())

const toggleAllFiltersOn = ref(true)

const toggleFunction = (category: Category) => {
  if (toggleAllFiltersOn.value) {
    setAllFiltersTrue(category)
  } else {
    setAllFiltersFalse(category)
  }
  toggleAllFiltersOn.value = !toggleAllFiltersOn.value
}

</script>

<template>
  <div class="w-full">
    <Accordion :model-value="categories.filter((category) => category.displayName === selectedCategory)[0].displayName" @update:model-value="setSelectedCategory" type="single">
      <AccordionItem v-for="category in categories" :category="category" :key="category.displayName" :value="category.displayName">
        <AccordionTrigger :class="(category.displayName === selectedCategory) && 'text-green-500'">{{ category.displayName }}</AccordionTrigger>
        <AccordionContent>
          <div class="w-full flex flex-col gap-2">
            <div class="grid grid-cols-2 gap-2 w-full">
              <Filter v-for="filter in category.filters" :filter="filter" :key="filter.displayName" />
            </div>
            <button class="w-full bg-secondary text-md px-3 py-2 rounded-xl" @click="toggleFunction(category)">
              {{ toggleAllFiltersOn ? 'Select All' : 'Deselect All'}}
            </button>
          </div>
          <div v-if="noneFoodSelected && selectedCategory==='Food'" class="mt-2 text-center">
            Note: No filters selected means general food places will be searched
          </div>
          <div v-if="noneAttractionsSelected && selectedCategory === 'Attractions'" class="mt-2 text-center">
              Note: No filters selected means general points of interest will be searched
            </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
    
</template>
