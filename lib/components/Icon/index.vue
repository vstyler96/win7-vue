<script lang="ts">
  const icons: Record<string, string> = {
    monitor: 'M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z',
  }
</script>

<script setup lang="ts">
  defineOptions({ name: 'WinIcon' })

  const {
    icon,
    size = 24,
  } = defineProps<{
    icon: string
    size?: string | number
  }>()
</script>

<template>
  <span>
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :width="`${size}px`"
      :height="`${size}px`"
    >
      <path
        :d="icons[icon]"
        fill="currentColor"
      />
    </svg>
  </span>
</template>
