<script setup lang="ts">
  import { CircularProgress } from 'win7-vue'
</script>

<template>
  <CircularProgress />
  <CircularProgress :animate="false" label="Idle" />
</template>
