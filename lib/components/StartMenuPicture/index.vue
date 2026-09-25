<script setup lang="ts">
  defineOptions({ name: 'WinStartMenuPicture' })

  const {
    src,
    alt = '',
  } = defineProps<{
    src: string
    /** e.g. the user's name; empty marks it decorative. */
    alt?: string
  }>()
</script>

<template>
  <img
    class="start-menu-picture"
    :src
    :alt
  >
</template>
