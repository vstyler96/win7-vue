<script setup lang="ts">
  defineOptions({ name: 'WinTextbox' })

  const {
    type = 'text',
    readonly = false,
  } = defineProps<{
    /** Input type, or 'textarea' to render a textarea. */
    type?: string
    readonly?: boolean
  }>()

  const model = defineModel<string>({ required: true })
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    v-model="model"
    :readonly
  />
  <input
    v-else
    v-model="model"
    :readonly
    :type
  >
</template>
