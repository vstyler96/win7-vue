<script setup lang="ts">
  import { ref, watch } from 'vue'

  defineOptions({ name: 'WinTaskBar' })

  const {
    clock = false,
    showDesktop = false,
  } = defineProps<{
    /** Live HH:MM clock at the end of the tray. */
    clock?: boolean
    /** Thin "Show desktop" button at the far edge. */
    showDesktop?: boolean
  }>()

  const emit = defineEmits<{ showDesktop: [] }>()

  const now = ref(new Date())

  watch(() => clock, (enabled, _, onCleanup) => {
    if (!enabled) return
    now.value = new Date()
    const timer = setInterval(() => { now.value = new Date() }, 30_000)
    onCleanup(() => clearInterval(timer))
  }, { immediate: true })
</script>

<template>
  <div
    class="taskbar"
    role="toolbar"
    aria-label="Taskbar"
  >
    <slot name="start" />

    <div class="taskbar-items">
      <slot />
    </div>

    <div
      v-if="$slots.tray || clock"
      class="taskbar-tray"
    >
      <slot name="tray" />
      <time
        v-if="clock"
        class="taskbar-clock"
        :datetime="now.toISOString()"
      >
        {{ now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </time>
    </div>

    <button
      v-if="showDesktop"
      class="taskbar-show-desktop"
      aria-label="Show desktop"
      @click="emit('showDesktop')"
    />
  </div>
</template>
