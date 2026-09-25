<script setup lang="ts">
  defineOptions({ name: 'WinSearchbox' })

  const {
    instant = false,
    placeholder = 'Search',
  } = defineProps<{
    /** Plain search field that emits `search` on every keystroke (no button). */
    instant?: boolean
    placeholder?: string
  }>()

  const emit = defineEmits<{ search: [value: string] }>()

  const model = defineModel<string>({ default: '' })
</script>

<template>
  <input
    v-if="instant"
    v-model="model"
    :placeholder
    type="search"
    @input="emit('search', model)"
  >

  <div
    v-else
    class="searchbox"
  >
    <input
      v-model="model"
      :placeholder
      type="search"
      @keyup.enter="emit('search', model)"
    >
    <button
      aria-label="search"
      @click="emit('search', model)"
    />
  </div>
</template>
