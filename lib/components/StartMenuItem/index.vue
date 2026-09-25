<script setup lang="ts">
  import { inject } from 'vue'
  import WinIcon from '../Icon/index.vue'
  import { useLinkTag } from '../../composables/link'
  import { StartMenuCloseKey } from '../StartMenu/context'

  defineOptions({ name: 'WinStartMenuItem' })

  const props = defineProps<{
    text?: string
    /** Built-in icon name or raw 24x24 SVG path. */
    icon?: string
    /** Image URL for the item icon (takes precedence over `icon`). */
    image?: string
    href?: string
    to?: string | object
  }>()

  const emit = defineEmits<{ click: [event: MouseEvent] }>()

  const close = inject(StartMenuCloseKey, undefined)
  const tag = useLinkTag(() => props)

  function onClick(event: MouseEvent) {
    emit('click', event)
    close?.()
  }
</script>

<template>
  <li
    class="start-menu-item"
    role="menuitem"
  >
    <component
      :is="tag.is"
      v-bind="tag.attrs"
      @click="onClick"
    >
      <slot name="icon">
        <img
          v-if="image"
          :src="image"
          alt=""
        >
        <WinIcon
          v-else-if="icon"
          :icon
        />
      </slot>
      <span><slot>{{ text }}</slot></span>
    </component>
  </li>
</template>
