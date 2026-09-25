<script setup lang="ts">
  import { ref } from 'vue'
  import { Dropdown } from 'win7-vue'

  const selected = ref<string | number | null>(null)
  const fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ]
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="fruits"
    placeholder="Select a fruit..."
  />
  <p>Selected id: {{ selected ?? 'None' }} ({{ typeof selected }})</p>
</template>
