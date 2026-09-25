<script setup lang="ts">
  import { ref } from 'vue'
  import { Checkbox } from 'win7-vue'

  const single = ref(false)
  const selected = ref<string[]>([])
</script>

<template>
  <Checkbox v-model="single" label="Single Checkbox" />
  <p>Value: {{ single }}</p>
  <hr />
  <Checkbox
    v-model="selected"
    name="options"
    label="Option A"
    value="a"
  />
  <Checkbox
    v-model="selected"
    name="options"
    label="Option B"
    value="b"
  />
  <Checkbox
    v-model="selected"
    name="options"
    label="Option C"
    value="c"
  />
  <p>Selected: {{ selected.join(', ') || 'None' }}</p>
</template>
