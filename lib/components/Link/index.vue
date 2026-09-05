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
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :href
    :to
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
