<script setup lang="ts">
  import { ref } from 'vue'
  import { uniqueId } from '../../utils/helpers'

  defineOptions({ name: 'WinSearchbox' })

  const {
    instant = false,
    placeholder = 'Search',
  } = defineProps<{
    instant?: boolean
    placeholder?: string
  }>()

  const emit = defineEmits<{ search: [value: string] }>()

  const id = `searchbox-${uniqueId()}`
  const searchValue = ref('')

  function onSearch() {
    emit('search', searchValue.value)
  }

  function onKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') onSearch()
  }
</script>

<template>
  <input
    v-if="instant"
    :id
    v-model="searchValue"
    :placeholder
    type="search"
    @keyup="onKeyup"
  >

  <div
    v-else
    class="searchbox"
  >
    <input
      v-model="searchValue"
      :placeholder
      type="search"
    >
    <button
      aria-label="search"
      @click="onSearch"
    />
  </div>
</template>
