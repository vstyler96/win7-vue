<script setup lang="ts">
  import { ref } from 'vue'
  import { Slider } from 'win7-vue'

  const value = ref(50)
</script>

<template>
  <Slider
    v-model="value"
    min="0"
    max="100"
  />
  <p>Value: {{ value }}</p>
</template>
