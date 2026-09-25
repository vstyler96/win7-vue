<script setup lang="ts">
  import { ref } from 'vue'
  import { useDismiss } from '../../composables/dismiss'
  import { uniqueId } from '../../utils/helpers'

  defineOptions({ name: 'WinMainMenuActions' })

  const emit = defineEmits<{ mainAction: [] }>()

  /** Whether the actions dropdown is open. */
  const open = defineModel<boolean>('open', { default: false })

  const rootRef = ref<HTMLElement | null>(null)
  const dropdownId = uniqueId('start-menu-actions')

  useDismiss(open, { el: rootRef })
</script>

<template>
  <div
    ref="rootRef"
    class="start-menu-actions"
  >
    <button
      class="start-menu-main-action"
      @click="emit('mainAction')"
    >
      <slot name="main-action">
        Shut down
      </slot>
    </button>

    <template v-if="$slots['actions-dropdown-items']">
      <button
        class="start-menu-actions-toggle"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="dropdownId"
        aria-label="More options"
        @click="open = !open"
      >
        <slot name="actions-dropdown">
          ▸
        </slot>
      </button>

      <!-- Choosing an entry closes the dropdown. -->
      <ul
        :id="dropdownId"
        class="start-menu-actions-dropdown"
        role="menu"
        :hidden="!open"
        @click="open = false"
      >
        <slot name="actions-dropdown-items" />
      </ul>
    </template>
  </div>
</template>
