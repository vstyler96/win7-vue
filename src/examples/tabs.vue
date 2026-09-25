<script setup lang="ts">
  import { ref } from 'vue'
  import { Tabs } from 'win7-vue'

  const active = ref('general')
</script>

<template>
  <Tabs v-model="active" :tabs="{ general: 'General', advanced: 'Advanced', about: 'About' }">
    <template #general>
      <p>This is the General tab content.</p>
    </template>
    <template #advanced>
      <p>This is the Advanced tab content with more options.</p>
    </template>
    <template #about>
      <p>About this application. Version 1.0.0</p>
    </template>
  </Tabs>
</template>
