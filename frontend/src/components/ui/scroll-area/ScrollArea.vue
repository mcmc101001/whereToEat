<script setup lang="ts">
import { type HTMLAttributes, computed, ref, onMounted } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport
} from 'radix-vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/lib/utils'
import { nextTick } from 'vue'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const showShadow = ref(true)
const mountComplete = ref(false)
const checkIfScrollableDivRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (checkIfScrollableDivRef.value === null) return
  const VH = window.innerHeight
  const MAX_HEIGHT = VH * 0.4 // max-h-[40vh]
  const div = checkIfScrollableDivRef.value
  if (div.clientHeight <= MAX_HEIGHT) {
    showShadow.value = false
  }
  console.log(div.clientHeight, MAX_HEIGHT)
  mountComplete.value = true
})

const handleScroll = (e: Event) => {
  if (e.target === null) return
  const element = e.target as HTMLElement
  const bottom = element.scrollHeight - element.scrollTop < element.clientHeight + 2 // 2px buffer
  console.log(element.scrollHeight, element.scrollTop, element.clientHeight, bottom)
  showShadow.value = !bottom
}
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport @scroll="handleScroll" class="h-full w-full rounded-[inherit]">
      <div ref="checkIfScrollableDivRef" class="absolute inset-0 w-full h-full" />
      <slot />
      <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-700"
        leave-active-class="transition duration-700"
      >
        <div
          v-if="showShadow && mountComplete"
          className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] to-45% pointer-events-none"
      /></Transition>
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
