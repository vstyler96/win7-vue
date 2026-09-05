<script setup lang="ts">
  import { useThemeFamily } from '../../composables/theme'

  defineOptions({ name: 'WinButton' })

  const {
    text = undefined,
    href = undefined,
    to = undefined,
    target = undefined,
  } = defineProps<{
    text?: string
    href?: string
    to?: string | object
    target?: string
  }>()

  const family = useThemeFamily()
</script>

<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :class="family === 'mac' && !href && !to ? 'btn' : undefined"
    :href
    :to
    :target
  >
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </component>
</template>
