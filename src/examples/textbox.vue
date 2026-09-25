<script setup lang="ts">
  import { ref } from 'vue'
  import { Textbox } from 'win7-vue'

  const text = ref('Hello World')
  const long = ref('This is a textarea')
</script>

<template>
  <div>
    <label>Text Input:</label>
    <Textbox v-model="text" placeholder="Enter text..." />
  </div>
  <div>
    <label>Textarea:</label>
    <Textbox v-model="long" type="textarea" />
  </div>
  <div>
    <label>Readonly:</label>
    <Textbox v-model="text" readonly />
  </div>
</template>
