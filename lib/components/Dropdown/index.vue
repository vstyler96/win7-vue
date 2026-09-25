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

  // DOM values are strings; map back to the option's own value so numeric ids stay numbers.
  function onChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value
    model.value = options.find(o => String(o[itemValue]) === raw)?.[itemValue] ?? raw
  }
</script>

<template>
  <select
    :value="model ?? ''"
    @change="onChange"
  >
    <slot name="placeholder">
      <option
        v-if="placeholder"
        disabled
        value=""
      >
        {{ placeholder }}
      </option>
    </slot>

    <slot name="options">
      <option
        v-for="option in options"
        :key="option[itemValue]"
        :disabled="option.disabled"
        :value="option[itemValue]"
      >
        {{ option[itemTitle] }}
      </option>
    </slot>
  </select>
</template>
