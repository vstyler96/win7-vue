<script setup lang="ts">
  import { useThemeFamily } from '../../composables/theme'

  defineOptions({ name: 'WinMenuBar' })

  const { canHover = false } = defineProps<{ canHover?: boolean }>()

  const family = useThemeFamily()
</script>

<template>
  <ul
    :role="family === 'mac' ? 'menu-bar' : 'menubar'"
    :class="{ 'can-hover': canHover }"
  >
    <slot />
  </ul>
</template>
