<script setup lang="ts">
  defineOptions({ name: 'WinSlider' })

  const model = defineModel<string | number>({ default: 0 })
</script>

<template>
  <input
    v-model="model"
    type="range"
  >
</template>
