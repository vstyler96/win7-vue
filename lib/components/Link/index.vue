<script setup lang="ts">
  import WinIcon from '../Icon/index.vue'

  defineOptions({ name: 'WinLink' })

  const {
    prependIcon = undefined,
    href = undefined,
    text = undefined,
    to = undefined,
    target = undefined,
  } = defineProps<{
    prependIcon?: string
    href?: string
    text?: string
    to?: string | object
    target?: string
  }>()
</script>

<template>
  <component
    :is="href || to ? 'a' : 'button'"
    :href
    :target
  >
    <WinIcon
      v-if="prependIcon"
      :icon="prependIcon"
      size="16"
    />
    <slot><span>{{ text }}</span></slot>
  </component>
</template>
