<script setup lang="ts">
  defineOptions({ name: 'WinGroupbox' })

  const {
    title = undefined,
    label = undefined,
  } = defineProps<{
    title?: string
    label?: string
  }>()
</script>

<template>
  <fieldset>
    <legend v-if="title || label">{{ title || label }}</legend>
    <slot />
  </fieldset>
</template>
