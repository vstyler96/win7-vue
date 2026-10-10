<script setup lang="ts">
  // A live example: the theme's desktop wallpaper with one themed window on it, inside the
  // docs shell's bordered example box. Everything inside is styled by the active theme only.
  import { Window, useTheme } from 'win7-vue'
  import { themeBackground } from '../catalog'

  const { title } = defineProps<{ title: string }>()
  const theme = useTheme()
</script>

<template>
  <div
    class="docs-example"
    :style="{ background: themeBackground(theme.name.value) }"
  >
    <Window
      :title
      active
    >
      <slot />
    </Window>
  </div>
</template>
