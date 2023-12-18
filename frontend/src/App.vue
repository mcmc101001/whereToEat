<script setup lang="ts"></script>

<template>
  <main
    class="h-screen min-h-screen w-full bg-background text-foreground items-center justify-center flex flex-col"
  >
    <div class="max-w-3xl items-center flex flex-col h-full relative">
      <router-view />
    </div>
  </main>
</template>
