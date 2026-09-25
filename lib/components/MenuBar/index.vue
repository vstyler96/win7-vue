<script setup lang="ts">
  import { useIsMac } from '../../composables/theme'

  defineOptions({ name: 'WinMenuBar' })

  const { canHover = false } = defineProps<{ canHover?: boolean }>()

  const isMac = useIsMac()
</script>

<template>
  <ul
    :role="isMac ? 'menu-bar' : 'menubar'"
    :class="{ 'can-hover': canHover }"
  >
    <slot />
  </ul>
</template>
