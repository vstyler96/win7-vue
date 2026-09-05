<script setup lang="ts" generic="T extends Record<string, any>">
  defineOptions({ name: 'WinListbox' })

  const {
    options,
    itemValue = 'id',
    itemText = 'name',
  } = defineProps<{
    options: T[]
    itemValue?: keyof T & string
    itemText?: keyof T & string
  }>()

  const model = defineModel<string | number>({ required: true })
</script>

<template>
  <ul role="listbox">
    <li
      v-for="option in options"
      :key="option[itemValue]"
      role="option"
      :aria-selected="option[itemValue] === model || undefined"
      @click="model = option[itemValue]"
    >
      {{ option[itemText] }}
    </li>
  </ul>
</template>
