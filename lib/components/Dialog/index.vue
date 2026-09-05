<script setup lang="ts">
  import { onUnmounted, watch } from 'vue'
  import WinWindow from '../Window/index.vue'
  import { useThemeFamily } from '../../composables/theme'

  defineOptions({ name: 'WinDialog' })

  const Z_INDEX_DIALOG = 1000

  const {
    title = 'Dialog',
    message = '',
    width = '400px',
    color = '#4580c4',
    hasStatus = false,
    statusFields = [],
    permanent = false,
    persistent = false,
    cancelable = true,
    closable = false,
    draggable = false,
    closeOnBackdrop = true,
    closeOnEscape = true,
    showActions = true,
  } = defineProps<{
    title?: string
    message?: string
    width?: string
    color?: string
    hasStatus?: boolean
    statusFields?: string[]
    permanent?: boolean
    persistent?: boolean
    cancelable?: boolean
    closable?: boolean
    draggable?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showActions?: boolean
  }>()

  const emit = defineEmits<{
    accept: []
    cancel: []
    close: []
  }>()

  const show = defineModel<boolean>({ default: false })

  const family = useThemeFamily()

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && closeOnEscape && !permanent && !persistent) {
      show.value = false
      emit('close')
    }
  }

  watch(show, isOpen => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, { immediate: true })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  function onAccept() {
    if (!persistent) show.value = false
    emit('accept')
  }

  function onCancel() {
    if (!persistent) show.value = false
    emit('cancel')
  }

  function onClose() {
    if (permanent) return
    if (!persistent) show.value = false
    emit('close')
  }

  function onBackdropClick() {
    if (closeOnBackdrop && !permanent && !persistent) onClose()
  }
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
        @click="onBackdropClick"
      />

      <WinWindow
        active
        :closable
        :color
        :default-x="0"
        :default-y="0"
        :constrain-to-viewport="false"
        :draggable
        :has-status
        :status-fields
        :title
        :width
        style="position: relative; z-index: 1;"
        @close="onClose"
      >
        <slot>
          <p v-if="message">{{ message }}</p>
        </slot>

        <section
          v-if="showActions"
          style="display: flex; justify-content: flex-end; gap: 8px; padding-top: 1em;"
        >
          <button
            v-if="cancelable"
            :class="family === 'mac' ? 'btn' : undefined"
            @click="onCancel"
          >
            Cancel
          </button>
          <button
            :class="family === 'mac' ? 'btn btn-default' : 'default'"
            @click="onAccept"
          >
            OK
          </button>
        </section>

        <template
          v-if="hasStatus && $slots.status"
          #status
        >
          <slot name="status" />
        </template>
      </WinWindow>
    </div>
  </Teleport>
</template>
