<script setup lang="ts">
  defineOptions({ name: 'WinMenu' })

  const { canHover = false } = defineProps<{ canHover?: boolean }>()
</script>

<template>
  <ul
    role="menu"
    :class="{ 'can-hover': canHover }"
  >
    <slot />
  </ul>
</template>
