<script lang="ts">
  export interface MenuItemOption {
    as: 'checkbox' | 'radio'
    id: string
    name?: string
  }
</script>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useIsMac } from '../../composables/theme'
  import { toggleIn } from '../../utils/helpers'

  defineOptions({ name: 'WinMenuItem' })

  const {
    option = undefined,
    value = undefined,
  } = defineProps<{
    /** Renders the item as a checkbox/radio menu option. */
    option?: MenuItemOption
    /** Radio: the value it selects. Checkbox: the value it toggles (defaults to option.id in array models). */
    value?: string | number | boolean
  }>()

  const model = defineModel<unknown>()

  const isMac = useIsMac()

  const checkValue = computed(() => value ?? option?.id)

  const isChecked = computed(() => {
    if (!option) return false
    if (Array.isArray(model.value)) return model.value.includes(checkValue.value)
    if (option.as === 'radio' || value !== undefined) return model.value === value
    return !!model.value
  })

  function onChange() {
    if (!option) return
    if (option.as === 'radio') model.value = value
    else if (Array.isArray(model.value)) model.value = toggleIn(model.value, checkValue.value)
    else if (value !== undefined) model.value = isChecked.value ? undefined : value
    else model.value = !model.value
  }
</script>

<template>
  <li
    :role="isMac ? 'menu-item' : 'menuitem'"
    tabindex="0"
    :aria-haspopup="$slots.submenu ? true : undefined"
  >
    <template v-if="option">
      <input
        :id="option.id"
        :checked="isChecked"
        :name="option.name ?? option.id"
        :type="option.as"
        :value
        @change.stop="onChange"
      >
      <label :for="option.id">
        <slot />
      </label>
    </template>
    <slot v-else />
    <slot name="submenu" />
  </li>
</template>
