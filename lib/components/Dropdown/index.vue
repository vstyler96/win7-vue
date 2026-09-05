<script setup lang="ts" generic="T extends Record<string, any>">
  defineOptions({ name: 'WinDropdown' })

  const {
    options = [],
    placeholder = undefined,
    itemValue = 'id',
    itemTitle = 'name',
  } = defineProps<{
    options?: T[]
    placeholder?: string
    itemValue?: keyof T & string
    itemTitle?: keyof T & string
  }>()

  const model = defineModel<string | number | null>({ default: null })

  function onChange(event: Event) {
    model.value = (event.target as HTMLSelectElement).value
  }
</script>

<template>
  <select
    :value="model"
    @change="onChange"
  >
    <slot name="placeholder">
      <option
        v-if="placeholder"
        disabled
        selected
        :value="undefined"
      >
        {{ placeholder }}
      </option>
    </slot>

    <slot name="options">
      <option
        v-for="option in options"
        :key="option[itemValue]"
        :disabled="option.disabled"
        :selected="model === option[itemValue]"
        :value="option[itemValue]"
      >
        {{ option[itemTitle] }}
      </option>
    </slot>
  </select>
</template>
