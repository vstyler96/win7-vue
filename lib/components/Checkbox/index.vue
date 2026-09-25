<script setup lang="ts" generic="V">
  import { computed } from 'vue'
  import { toggleIn, uniqueId } from '../../utils/helpers'

  defineOptions({ name: 'WinCheckbox' })

  const {
    disabled = false,
    name = undefined,
    label = undefined,
    value = undefined,
    trueValue = undefined,
    falseValue = undefined,
  } = defineProps<{
    disabled?: boolean
    name?: string
    label?: string
    /** Checked value when no true-value is given. Defaults to `true`. */
    value?: V
    trueValue?: V
    falseValue?: V
  }>()

  const model = defineModel<V | V[] | boolean>({ default: false })

  const id = uniqueId('checkbox')

  const checkValue = computed(() => trueValue ?? value ?? true)

  const checked = computed(() => Array.isArray(model.value)
    ? model.value.includes(checkValue.value as V)
    : model.value === checkValue.value)

  function onChange() {
    if (Array.isArray(model.value)) {
      model.value = toggleIn(model.value, checkValue.value as V)
      return
    }
    model.value = checked.value ? (falseValue ?? false) : checkValue.value
  }
</script>

<template>
  <div>
    <input
      :id
      :checked
      :disabled
      :name
      type="checkbox"
      @change="onChange"
    >
    <label :for="id">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
