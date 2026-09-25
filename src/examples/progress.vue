<script setup lang="ts">
  import { Progress } from 'win7-vue'
</script>

<template>
  <label>Determinate (65%):</label>
  <Progress :progress="65" />
  <label>Indeterminate:</label>
  <Progress indeterminate />
</template>
