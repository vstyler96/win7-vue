<script setup lang="ts" generic="V">
  import { computed } from 'vue'

  defineOptions({ name: 'WinCheckbox' })

  const {
    disabled = false,
    name,
    label = undefined,
    value = undefined,
    trueValue = undefined,
    falseValue = undefined,
  } = defineProps<{
    disabled?: boolean
    name: string
    label?: string
    /** Checked value when no true-value is given. Defaults to `true`. */
    value?: V
    trueValue?: V
    falseValue?: V
  }>()

  const model = defineModel<V | V[] | boolean>({ default: false })

  const id = computed(() => `${name}-checkbox`)

  const checkValue = computed(() => (trueValue !== undefined ? trueValue : value !== undefined ? value : true))
  const uncheckValue = computed(() => (falseValue !== undefined ? falseValue : false))

  const checked = computed(() => Array.isArray(model.value)
    ? (model.value as V[]).includes(checkValue.value as V)
    : model.value === checkValue.value)

  function onChange() {
    if (disabled) return

    if (Array.isArray(model.value)) {
      model.value = checked.value
        ? (model.value as V[]).filter(v => v !== checkValue.value)
        : [...(model.value as V[]), checkValue.value as V]
      return
    }

    model.value = (checked.value ? uncheckValue.value : checkValue.value) as V | boolean
  }
</script>

<template>
  <div>
    <input
      :id
      :checked="checked"
      :disabled
      :name
      type="checkbox"
      @change="onChange"
    >
    <label :for="id">
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
</template>
