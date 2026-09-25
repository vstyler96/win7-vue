<script setup lang="ts">
  import { ref } from 'vue'
  import { Radio } from 'win7-vue'

  const selected = ref('option1')
</script>

<template>
  <Radio
    v-model="selected"
    name="radio-group"
    value="option1"
    label="Option 1"
  />
  <Radio
    v-model="selected"
    name="radio-group"
    value="option2"
    label="Option 2"
  />
  <Radio
    v-model="selected"
    name="radio-group"
    value="option3"
    label="Option 3"
  />
  <p>Selected: {{ selected }}</p>
</template>
