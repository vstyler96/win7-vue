<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'WinProgress' })

  const {
    variant = undefined,
    inert = false,
    transition = 300,
    indeterminate = false,
    progress = 0,
  } = defineProps<{
    /** Upstream state class: 'error' | 'paused' (7.css). */
    variant?: string
    /** Disables the upstream 'animate' class. */
    inert?: boolean
    /** Width transition duration in ms. */
    transition?: number | string
    indeterminate?: boolean
    /** 0-100, or a percentage string like '40%'. */
    progress?: number | string
  }>()

  const now = computed(() => parseFloat(String(progress)))

  const barStyle = computed(() => ({
    width: typeof progress === 'string' && progress.endsWith('%') ? progress : `${now.value}%`,
    transition: `width ${Number(transition) / 1000}s linear`,
  }))
</script>

<template>
  <div
    role="progressbar"
    :class="[variant, { marquee: indeterminate, animate: !inert }]"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
    :aria-valuenow="indeterminate ? undefined : now"
  >
    <div
      v-if="!indeterminate"
      :style="barStyle"
    />
  </div>
</template>
