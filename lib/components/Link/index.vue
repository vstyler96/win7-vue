<script setup lang="ts">
  import WinIcon from '../Icon/index.vue'
  import { useLinkTag } from '../../composables/link'

  defineOptions({ name: 'WinLink' })

  const props = defineProps<{
    prependIcon?: string
    href?: string
    text?: string
    to?: string | object
    target?: string
  }>()

  const tag = useLinkTag(() => props)
</script>

<template>
  <component
    :is="tag.is"
    v-bind="tag.attrs"
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
