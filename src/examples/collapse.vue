<script setup lang="ts">
  import { ref } from 'vue'
  import { Collapse } from 'win7-vue'

  const open = ref(false)
  const children = [
    { id: 1, title: 'Sub Item 1' },
    { id: 2, title: 'Sub Item 2' },
    { id: 3, title: 'Sub Item 3' },
  ]
</script>

<template>
  <Collapse
    v-model:open="open"
    title="Click to expand"
    :children
  />
  <Collapse title="Another section">
    <p>Custom content inside the collapse.</p>
  </Collapse>
</template>
