<script setup lang="ts">
  import { useIsMac } from '../../composables/theme'
  import { useLinkTag } from '../../composables/link'

  defineOptions({ name: 'WinButton' })

  const props = defineProps<{
    text?: string
    href?: string
    to?: string | object
    target?: string
  }>()

  const isMac = useIsMac()
  const tag = useLinkTag(() => props)
</script>

<template>
  <component
    :is="tag.is"
    v-bind="tag.attrs"
    :class="isMac && tag.is === 'button' ? 'btn' : undefined"
    :target
  >
    <slot name="prepend" />
    <slot>{{ text }}</slot>
    <slot name="append" />
  </component>
</template>
