<script setup lang="ts">
  import { ref } from 'vue'
  import { Listbox } from 'win7-vue'

  const selected = ref<string | number>(1)
  const items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
  ]
</script>

<template>
  <Listbox v-model="selected" :options="items" />
  <p>Selected ID: {{ selected }}</p>
</template>
