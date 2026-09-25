<script setup lang="ts">
  import { provide, ref } from 'vue'
  import WinMainMenuActions from '../MainMenuActions/index.vue'
  import { useDismiss } from '../../composables/dismiss'
  import { StartMenuCloseKey } from './context'

  defineOptions({ name: 'WinStartMenu' })

  const emit = defineEmits<{ mainAction: [] }>()

  /** Shared with `<StartButton v-model:open>`. */
  const open = defineModel<boolean>('open', { default: false })

  const menuRef = ref<HTMLElement | null>(null)

  // The orb toggles on its own click, so it must not count as "outside".
  useDismiss(open, { el: menuRef, ignore: '.start-button' })
  provide(StartMenuCloseKey, () => { open.value = false })
</script>

<template>
  <div
    ref="menuRef"
    class="start-menu"
    :hidden="!open"
  >
    <ul
      class="start-menu-items"
      role="menu"
    >
      <slot name="items" />
    </ul>

    <div class="start-menu-side">
      <slot name="picture" />

      <ul
        class="start-menu-starred"
        role="menu"
      >
        <slot name="starred-items" />
      </ul>

      <WinMainMenuActions
        v-if="$slots['main-action'] || $slots['actions-dropdown-items']"
        @main-action="emit('mainAction')"
      >
        <template
          v-if="$slots['main-action']"
          #main-action
        >
          <slot name="main-action" />
        </template>
        <template
          v-if="$slots['actions-dropdown']"
          #actions-dropdown
        >
          <slot name="actions-dropdown" />
        </template>
        <template
          v-if="$slots['actions-dropdown-items']"
          #actions-dropdown-items
        >
          <slot name="actions-dropdown-items" />
        </template>
      </WinMainMenuActions>
    </div>
  </div>
</template>
