<script setup lang="ts">
  import { useThemeFamily } from '../../composables/theme'

  defineOptions({ name: 'WinButton' })

  const {
    text = undefined,
    href = undefined,
    target = undefined,
  } = defineProps<{
    text?: string
    href?: string
    target?: string
  }>()

  const family = useThemeFamily()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="family === 'mac' && !href ? 'btn' : undefined"
    :href
    :target
  >
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </component>
</template>
