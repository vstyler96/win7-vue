<script lang="ts">
  export interface MenuItemOption {
    as: 'checkbox' | 'radio'
    id: string
    name?: string
    nativeValue?: any
  }
</script>

<script setup lang="ts">
  import { computed, useSlots } from 'vue'
  import { useThemeFamily } from '../../composables/theme'

  defineOptions({ name: 'WinMenuItem' })

  const {
    option = undefined,
    value = undefined,
  } = defineProps<{
    option?: MenuItemOption
    value?: string | number | boolean
  }>()

  const model = defineModel<any>()

  const slots = useSlots()

  const family = useThemeFamily()

  const role = computed(() => (family.value === 'mac' ? 'menu-item' : 'menuitem'))

  const hasSubmenu = computed(() => {
    const nodes = slots.default?.({}) ?? []
    return nodes.some((node: any) => node.type?.name === 'WinMenu' || node.type === 'ul')
  })

  const isChecked = computed(() => {
    if (!option) return false

    if (option.as === 'radio') {
      return model.value === option.nativeValue
    }

    if (value !== undefined) {
      return model.value === value
    }
    if (Array.isArray(model.value)) {
      return model.value.includes(option.id)
    }
    return !!model.value
  })

  function handleOptionChange(event: Event) {
    if (!option) return

    event.stopPropagation()

    if (option.as === 'radio') {
      model.value = option.nativeValue
      return
    }

    if (value !== undefined) {
      model.value = isChecked.value ? undefined : value
      return
    }

    if (Array.isArray(model.value)) {
      model.value = isChecked.value
        ? model.value.filter((v: any) => v !== option.id)
        : [...model.value, option.id]
      return
    }

    model.value = !model.value
  }
</script>

<template>
  <li
    v-if="option"
    :role="role"
    tabindex="0"
  >
    <input
      :id="option.id"
      :checked="isChecked"
      :name="option.name || option.id"
      :type="option.as"
      :value="option.nativeValue ?? value"
      @change="handleOptionChange"
    >
    <label :for="option.id">
      <slot />
    </label>
  </li>

  <li
    v-else
    :role="role"
    tabindex="0"
    :aria-haspopup="hasSubmenu || undefined"
  >
    <slot />
  </li>
</template>
