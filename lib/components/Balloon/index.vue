<script setup lang="ts">
  defineOptions({ name: 'WinBalloon' })

  const {
    top = false,
    bottom = false,
    left = false,
    right = false,
    caption = undefined,
  } = defineProps<{
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
    caption?: string
  }>()
</script>

<template>
  <div
    role="tooltip"
    :class="{
      'is-top': top,
      'is-bottom': bottom,
      'is-left': left,
      'is-right': right,
    }"
  >
    <slot>{{ caption }}</slot>
  </div>
</template>
