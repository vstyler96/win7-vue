<script setup lang="ts">
  import { ref } from 'vue'
  import { Textbox } from 'win7-vue'

  const text = ref('Hello World')
  const long = ref('This is a textarea')
</script>

<template>
  <div class="form-group">
    <label>Text Input:</label>
    <Textbox v-model="text" placeholder="Enter text..." />
  </div>
  <div class="form-group">
    <label>Textarea:</label>
    <Textbox v-model="long" type="textarea" />
  </div>
  <div class="form-group">
    <label>Readonly:</label>
    <Textbox v-model="text" readonly />
  </div>
</template>
