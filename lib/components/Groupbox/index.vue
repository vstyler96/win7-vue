<script setup lang="ts">
  defineOptions({ name: 'WinGroupbox' })

  const { title = undefined } = defineProps<{ title?: string }>()
</script>

<template>
  <fieldset>
    <legend v-if="title">
      {{ title }}
    </legend>
    <slot />
  </fieldset>
</template>
