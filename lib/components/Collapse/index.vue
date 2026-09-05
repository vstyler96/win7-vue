<script lang="ts">
  export interface CollapseChild {
    id?: string | number
    title: string
    prependIcon?: string
    children?: CollapseChild[]
  }
</script>

<script setup lang="ts">
  import WinIcon from '../Icon/index.vue'
  import WinCollapse from './index.vue'
  import { uniqueId } from '../../utils/helpers'

  defineOptions({ name: 'WinCollapse' })

  const {
    title,
    prependIcon = undefined,
    children = [],
  } = defineProps<{
    title: string
    prependIcon?: string
    children?: CollapseChild[]
  }>()

  const open = defineModel<boolean>('open', { default: false })

  const id = `winui-collapse-${uniqueId()}`

  function onToggle(event: Event) {
    open.value = (event.target as HTMLDetailsElement).open
  }
</script>

<template>
  <details
    :id
    :open="open"
    @toggle="onToggle"
  >
    <summary>
      <slot name="title">
        <WinIcon
          v-if="prependIcon"
          :icon="prependIcon"
          size="16"
        />
        <span>{{ title }}</span>
      </slot>
    </summary>

    <slot>
      <ul v-if="children.length > 0">
        <li
          v-for="child in children"
          :key="child.id ?? child.title"
        >
          <WinCollapse
            v-if="child.children && child.children.length > 0"
            :title="child.title"
            :prepend-icon="child.prependIcon"
            :children="child.children"
          />
          <span v-else>{{ child.title }}</span>
        </li>
      </ul>
    </slot>
  </details>
</template>
