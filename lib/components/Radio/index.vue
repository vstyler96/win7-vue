<script setup lang="ts" generic="V extends string | number | boolean">
  import { computed } from 'vue'

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

  const id = computed(() => `${name}-${value}-radio`)

  function onChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      model.value = value
    }
  }
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
      @change="onChange"
    >
    <slot>
      <label :for="id">{{ label }}</label>
    </slot>
  </div>
</template>
