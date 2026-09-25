<script setup lang="ts">
  import { Icon } from 'win7-vue'

  // Any 24x24 SVG path works too, e.g. from Material Design Icons.
  const star = 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z'
</script>

<template>
  <div>
    <Icon icon="monitor" size="24" />
    <Icon icon="monitor" size="48" />
    <Icon :icon="star" size="48" />
  </div>
</template>
