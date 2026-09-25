<script setup lang="ts">
  defineOptions({ name: 'WinStartButton' })

  const { label = 'Start' } = defineProps<{
    /** Accessible name of the orb. */
    label?: string
  }>()

  /** Shared with `<StartMenu v-model:open>`. */
  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <button
    class="start-button"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-label="label"
    @click="open = !open"
  >
    <slot />
  </button>
</template>
