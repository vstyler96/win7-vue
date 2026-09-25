<script setup lang="ts">
  import { ref } from 'vue'
  import { Searchbox } from 'win7-vue'

  const last = ref('')
</script>

<template>
  <div class="component-row">
    <Searchbox placeholder="Search..." @search="last = $event" />
    <Searchbox
      instant
      placeholder="Instant search..."
      @search="last = $event"
    />
  </div>
  <p v-if="last">
    Last search: {{ last }}
  </p>
</template>
