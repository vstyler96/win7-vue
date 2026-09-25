<script setup lang="ts">
  import WinWindow from '../Window/index.vue'
  import { useIsMac } from '../../composables/theme'
  import { useDismiss } from '../../composables/dismiss'

  // Unknown attrs (closable, draggable, color, has-status, status-fields…) go to the Window.
  defineOptions({ name: 'WinDialog', inheritAttrs: false })

  const Z_INDEX_DIALOG = 1000

  const {
    title = 'Dialog',
    message = '',
    width = '400px',
    persistent = false,
    cancelable = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    showActions = true,
  } = defineProps<{
    title?: string
    message?: string
    width?: string
    /** Never closes itself: Esc/backdrop are ignored and buttons only emit. */
    persistent?: boolean
    cancelable?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showActions?: boolean
  }>()

  const emit = defineEmits<(e: 'accept' | 'cancel' | 'close') => void>()

  const show = defineModel<boolean>({ default: false })

  const isMac = useIsMac()

  function dismiss(event: 'accept' | 'cancel' | 'close') {
    if (!persistent) show.value = false
    emit(event)
  }

  // Escape only; the backdrop handles outside clicks.
  useDismiss(show, { onDismiss: () => closeOnEscape && !persistent && dismiss('close') })
</script>

<template>
  <Teleport to="body">
    <!-- Overlay/backdrop have no upstream equivalent; behavior-only inline styles. -->
    <div
      v-if="show"
      :style="{
        position: 'fixed',
        inset: 0,
        zIndex: Z_INDEX_DIALOG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <div
        :style="{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(2px)',
        }"
        @click="closeOnBackdrop && !persistent && dismiss('close')"
      />

      <WinWindow
        v-bind="$attrs"
        active
        :constrain-to-viewport="false"
        :title
        :width
        style="position: relative; z-index: 1;"
        @close="dismiss('close')"
      >
        <slot>
          <p v-if="message">
            {{ message }}
          </p>
        </slot>

        <section
          v-if="showActions"
          style="display: flex; justify-content: flex-end; gap: 8px; padding-top: 1em;"
        >
          <button
            v-if="cancelable"
            :class="isMac ? 'btn' : undefined"
            @click="dismiss('cancel')"
          >
            Cancel
          </button>
          <button
            :class="isMac ? 'btn btn-default' : 'default'"
            @click="dismiss('accept')"
          >
            OK
          </button>
        </section>

        <template
          v-if="$slots.status"
          #status
        >
          <slot name="status" />
        </template>
      </WinWindow>
    </div>
  </Teleport>
</template>
