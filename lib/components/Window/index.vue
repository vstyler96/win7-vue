<script setup lang="ts">
  import { computed, ref, useSlots } from 'vue'
  import useDraggable from '../../composables/draggable'
  import { useThemeFamily } from '../../composables/theme'
  import { uniqueId } from '../../utils/helpers'
  import type { CSSProperties } from 'vue'

  defineOptions({ name: 'WinWindow' })

  const TITLE_BAR_HEIGHT = 35
  const BASE_Z_INDEX = 900

  const {
    active = false,
    glass = true,
    title = 'Window',
    width = 'auto',
    color = '#4580c4',
    hasScrollbar = false,
    hasStatus = false,
    statusFields = [],
    minimizable = false,
    maximizable = false,
    closable = false,
    draggable = false,
    defaultX = 0,
    defaultY = 0,
    snapToEdges = false,
    snapThreshold = 20,
    constrainToViewport = true,
  } = defineProps<{
    active?: boolean
    /** Upstream 'glass' class (7.css Aero; inert on XP.css / 98.css themes). */
    glass?: boolean
    title?: string
    width?: string
    color?: string
    hasScrollbar?: boolean
    hasStatus?: boolean
    statusFields?: string[]
    minimizable?: boolean
    maximizable?: boolean
    closable?: boolean
    draggable?: boolean
    defaultX?: number | string
    defaultY?: number | string
    snapToEdges?: boolean
    snapThreshold?: number
    constrainToViewport?: boolean
  }>()

  const emit = defineEmits<{
    minimize: []
    maximize: []
    close: []
    dragStart: [position: { x: number, y: number }]
    dragEnd: [position: { x: number, y: number }]
    positionChange: [position: { x: number, y: number }]
    focus: []
  }>()

  const id = `window-${uniqueId()}`
  const windowRef = ref<HTMLElement | null>(null)
  const headerRef = ref<HTMLElement | null>(null)

  const family = useThemeFamily()

  const slots = useSlots()

  const {
    x,
    y,
    dragging,
    zIndex,
    setPosition,
    center,
    focus,
  } = useDraggable(
    windowRef,
    headerRef,
    {
      enabled: draggable,
      defaultX,
      defaultY,
      snapToEdges,
      snapThreshold,
      constrainToContainer: constrainToViewport,
    },
    {
      onDragStart: (posX, posY) => emit('dragStart', { x: posX, y: posY }),
      onDragEnd: (posX, posY) => emit('dragEnd', { x: posX, y: posY }),
      onPositionChange: (posX, posY) => emit('positionChange', { x: posX, y: posY }),
    },
  )

  const showStatusBar = computed(() => (hasStatus && statusFields.length > 0) || !!slots.status)

  // Drag behavior is JS-driven inline style; the look stays with the upstream theme.
  const windowStyle = computed<CSSProperties>(() => ({
    '--window-background-color': color,
    '--title-bar-height': `${TITLE_BAR_HEIGHT}px`,
    zIndex: draggable ? zIndex.value : BASE_Z_INDEX,
    ...(draggable
      ? {
          position: 'fixed',
          margin: 0,
          touchAction: 'none',
          top: `${y.value}px`,
          left: `${x.value}px`,
          userSelect: dragging.value ? 'none' : undefined,
        }
      : {}),
  }))

  const titleBarStyle = computed<CSSProperties | undefined>(() => (draggable
    ? {
        cursor: dragging.value ? 'grabbing' : 'grab',
        userSelect: 'none',
      }
    : undefined))

  function handleWindowClick() {
    if (draggable) {
      focus()
      emit('focus')
    }
  }

  defineExpose({
    setPosition,
    center,
    focus,
    getPosition: () => ({ x: x.value, y: y.value }),
  })
</script>

<template>
  <div
    :id
    ref="windowRef"
    class="window"
    :class="{ active, glass, draggable, dragging }"
    :style="windowStyle"
    @click="handleWindowClick"
  >
    <div
      ref="headerRef"
      :class="family === 'mac' ? (active ? 'title-bar' : 'inactive-title-bar') : 'title-bar'"
      :style="titleBarStyle"
    >
      <!-- system.css title bar: close + h1.title + resize -->
      <template v-if="family === 'mac'">
        <button
          v-if="closable"
          aria-label="Close"
          class="close"
          @click.stop="emit('close')"
        />
        <h1 class="title">{{ title }}</h1>
        <button
          v-if="maximizable"
          aria-label="Resize"
          class="resize"
          @click.stop="emit('maximize')"
        />
      </template>

      <template v-else>
        <div class="title-bar-text">{{ title }}</div>
        <div class="title-bar-controls">
          <button
            v-if="minimizable"
            aria-label="Minimize"
            @click.stop="emit('minimize')"
          />
          <button
            v-if="maximizable"
            aria-label="Maximize"
            @click.stop="emit('maximize')"
          />
          <button
            v-if="closable"
            aria-label="Close"
            @click.stop="emit('close')"
          />
        </div>
      </template>
    </div>

    <div
      v-if="family === 'mac'"
      class="separator"
    />

    <div
      :class="family === 'mac'
        ? 'window-pane'
        : ['window-body', 'has-space', { 'has-scrollbar': hasScrollbar }]"
      :style="{ width }"
    >
      <slot />
    </div>

    <div
      v-if="showStatusBar"
      class="status-bar"
    >
      <slot name="status">
        <p
          v-for="(field, index) in statusFields"
          :key="index"
          class="status-bar-field"
        >
          {{ field }}
        </p>
      </slot>
    </div>
  </div>
</template>
