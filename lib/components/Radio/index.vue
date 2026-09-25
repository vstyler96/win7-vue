<script setup lang="ts" generic="V extends string | number | boolean">
  import { uniqueId } from '../../utils/helpers'

  defineOptions({ name: 'WinRadio' })

  const {
    name,
    value,
    disabled = false,
    label = undefined,
  } = defineProps<{
    name: string
    value: V
    disabled?: boolean
    label?: string
  }>()

  const model = defineModel<V | null>({ default: null })

  const id = uniqueId('radio')
</script>

<template>
  <div>
    <input
      :id
      :checked="model === value"
      :disabled
      :name
      type="radio"
      :value
      @change="model = value"
    >
    <label :for="id">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
