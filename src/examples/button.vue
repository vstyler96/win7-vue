<script setup lang="ts">
  import { Button } from 'win7-vue'
</script>

<template>
  <div class="component-row">
    <Button text="Default Button" />
    <Button text="Link Button" href="#" />
    <Button text="Router Button" to="/themes" />
  </div>
</template>
