<script setup lang="ts">
  defineOptions({ name: 'WinCircularProgress' })

  const {
    animate = true,
    label = 'Loading',
  } = defineProps<{
    /** Upstream 'animate' class: spinning. Off renders the static frame. */
    animate?: boolean
    /** Accessible name. */
    label?: string
  }>()
</script>

<template>
  <!-- role="status", not "progressbar": every stylesheet styles [role=progressbar] as a bar. -->
  <span
    class="spinner"
    :class="{ animate }"
    role="status"
    :aria-label="label"
  />
</template>
