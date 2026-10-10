<script setup lang="ts">
  defineOptions({ name: 'WinStartButton' })

  const {
    label = 'Start',
    variant = undefined,
  } = defineProps<{
    /** Accessible name of the orb. */
    label?: string
    /** Alternative look, rendered as `.is-<variant>` (e.g. 'vista' on 7.css). */
    variant?: string
  }>()

  /** Shared with `<StartMenu v-model:open>`. */
  const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <button
    class="start-button"
    :class="variant && `is-${variant}`"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-label="label"
    @click="open = !open"
  >
    <slot />
  </button>
</template>
