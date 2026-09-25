<script setup lang="ts">
  import { Balloon } from 'win7-vue'
</script>

<template>
  <div class="component-row balloon-demos">
    <Balloon caption="Top tooltip" top />
    <Balloon caption="Bottom tooltip" bottom />
    <Balloon caption="Left tooltip" left />
    <Balloon caption="Right tooltip" right />
  </div>
</template>
